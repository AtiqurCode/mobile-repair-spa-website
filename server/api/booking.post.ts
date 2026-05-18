import { randomBytes } from 'node:crypto'

interface BookingBody {
  name?: string
  phone?: string
  email?: string
  /** @deprecated legacy string label; prefer service_id */
  service?: string
  service_id?: number
  deviceBrand?: string
  deviceModel?: string
  address?: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
  /** Legacy: accessory display names */
  accessories?: string[]
  /** Laravel: accessory UUIDs */
  accessory_uuids?: string[]
}

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const body = (await readBody(event)) as BookingBody

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const email = String(body.email ?? '').trim()
  const address = String(body.address ?? '').trim()
  const deviceBrand = String(body.deviceBrand ?? '').trim()
  const deviceModel = String(body.deviceModel ?? '').trim()
  const preferredDate = String(body.preferredDate ?? '').trim()
  const preferredTime = String(body.preferredTime ?? '').trim()
  const notes = String(body.notes ?? '').trim()
  const serviceId = typeof body.service_id === 'number' ? body.service_id : undefined
  const accessoryUuids = Array.isArray(body.accessory_uuids)
    ? body.accessory_uuids.map((s) => String(s ?? '').trim()).filter(Boolean)
    : []

  if (!name || !phone || !address) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const config = useRuntimeConfig()
  const apiBase = String(config.public.rapidfixApiUrl ?? '')
    .trim()
    .replace(/\/$/, '')

  if (apiBase) {
    if (serviceId == null) {
      throw createError({ statusCode: 400, statusMessage: 'service_id is required when using RapidFix API' })
    }

    const res = await $fetch<{ data: { reference: string; estimated_total?: number } }>(
      `${apiBase}/appointments`,
      {
        method: 'POST',
        body: {
          name,
          phone,
          email: email || null,
          address,
          device_brand: deviceBrand || null,
          device_model: deviceModel || null,
          service_id: serviceId,
          preferred_date: preferredDate || null,
          preferred_time: preferredTime || null,
          notes: notes || null,
          accessory_uuids: accessoryUuids,
        },
      },
    )

    const webhook = config.bookingWebhookUrl
    if (webhook) {
      try {
        await $fetch(webhook, {
          method: 'POST',
          body: {
            reference: res.data.reference,
            name,
            phone,
            email,
            service_id: serviceId,
            deviceBrand,
            deviceModel,
            address,
            preferredDate,
            preferredTime,
            notes,
            accessory_uuids: accessoryUuids,
            submittedAt: new Date().toISOString(),
          },
        })
      } catch (e) {
        console.error('[booking] webhook error', e)
      }
    }

    return {
      ok: true as const,
      reference: res.data.reference,
      estimated_total: res.data.estimated_total,
    }
  }

  const service = String(body.service ?? '').trim()
  const accessories = Array.isArray(body.accessories)
    ? body.accessories.map((s) => String(s ?? '').trim()).filter(Boolean)
    : []

  if (!service) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const reference = `RF-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`

  const payload = {
    reference,
    name,
    phone,
    service,
    deviceBrand,
    deviceModel,
    address,
    preferredDate,
    preferredTime,
    notes,
    accessories,
    submittedAt: new Date().toISOString(),
  }

  const webhook = config.bookingWebhookUrl
  if (webhook) {
    try {
      await $fetch(webhook, { method: 'POST', body: payload })
    } catch (e) {
      console.error('[booking] webhook error', e)
    }
  } else {
    console.log('[booking]', reference, name, phone, service)
  }

  return { ok: true as const, reference }
})
