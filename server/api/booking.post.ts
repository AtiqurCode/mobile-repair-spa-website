import { randomBytes } from 'node:crypto'

interface BookingBody {
  name?: string
  phone?: string
  service?: string
  deviceBrand?: string
  deviceModel?: string
  address?: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
  accessories?: string[]
}

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const body = (await readBody(event)) as BookingBody

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const service = String(body.service ?? '').trim()
  const deviceBrand = String(body.deviceBrand ?? '').trim()
  const deviceModel = String(body.deviceModel ?? '').trim()
  const address = String(body.address ?? '').trim()
  const preferredDate = String(body.preferredDate ?? '').trim()
  const preferredTime = String(body.preferredTime ?? '').trim()
  const notes = String(body.notes ?? '').trim()
  const accessories = Array.isArray(body.accessories)
    ? body.accessories.map((s) => String(s ?? '').trim()).filter(Boolean)
    : []

  if (!name || !phone || !service || !address) {
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

  const config = useRuntimeConfig()
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
