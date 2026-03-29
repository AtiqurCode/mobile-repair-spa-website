import { randomBytes } from 'node:crypto'

interface BookingBody {
  name?: string
  phone?: string
  email?: string
  service?: string
  deviceBrand?: string
  deviceModel?: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const body = (await readBody(event)) as BookingBody

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const email = String(body.email ?? '').trim()
  const service = String(body.service ?? '').trim()
  const deviceBrand = String(body.deviceBrand ?? '').trim()
  const deviceModel = String(body.deviceModel ?? '').trim()
  const preferredDate = String(body.preferredDate ?? '').trim()
  const preferredTime = String(body.preferredTime ?? '').trim()
  const notes = String(body.notes ?? '').trim()

  if (!name || !phone || !email || !service) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const reference = `RF-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`

  const payload = {
    reference,
    name,
    phone,
    email,
    service,
    deviceBrand,
    deviceModel,
    preferredDate,
    preferredTime,
    notes,
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
    console.log('[booking]', reference, name, phone, email, service)
  }

  return { ok: true as const, reference }
})
