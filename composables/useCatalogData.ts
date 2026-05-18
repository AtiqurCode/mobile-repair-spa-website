import type { Component } from 'vue'
import {
  BatteryCharging,
  Camera,
  Droplets,
  Fingerprint,
  Layers,
  Mic2,
  Smartphone,
  Speaker,
  Usb,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-vue-next'
import { accessories as staticAccessories, type Accessory, type AccessoryBrand } from '~/composables/useAccessories'
import { services as staticServices, type Service } from '~/composables/useServices'

type ApiEnvelope<T> = { data: T }

type ApiServiceRow = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  eta: string
  warranty: string
  tags: string[]
  image: string
  category: string
}

type ApiAccessoryRow = {
  id: number
  uuid: string
  name: string
  brand: string
  brand_slug: string
  deviceLineId: string
  versionId: string
  category: string
  price: number
  image: string
  blurb: string
}

function iconForServiceName(name: string): Component {
  const n = name.toLowerCase()
  if (n.includes('battery')) return BatteryCharging
  if (n.includes('screen') || n.includes('glass') || n.includes('protector')) return Wrench
  if (n.includes('charging') || n.includes('port') || n.includes('usb')) return Zap
  if (n.includes('camera')) return Camera
  if (n.includes('speaker') || n.includes('earpiece') || n.includes('microphone')) return Speaker
  if (n.includes('water') || n.includes('liquid')) return Droplets
  if (n.includes('wifi') || n.includes('wi-fi') || n.includes('signal')) return Wifi
  if (n.includes('face id') || n.includes('touch id') || n.includes('fingerprint')) return Fingerprint
  if (n.includes('back glass') || n.includes('housing')) return Smartphone
  if (n.includes('mic')) return Mic2
  if (n.includes('sim') || n.includes('tray')) return Layers
  if (n.includes('data') || n.includes('recovery')) return Usb
  return Wrench
}

function mapService(row: ApiServiceRow): Service {
  return {
    id: row.id,
    category: row.category,
    tags: row.tags,
    icon: iconForServiceName(row.name),
    name: row.name,
    description: row.description,
    price: row.price,
    eta: row.eta,
    warranty: row.warranty,
    image: row.image,
  }
}

function mapAccessory(row: ApiAccessoryRow): Accessory {
  const brand = row.brand as AccessoryBrand
  return {
    id: row.id,
    uuid: row.uuid,
    name: row.name,
    brand,
    deviceLineId: row.deviceLineId,
    versionId: row.versionId,
    category: row.category,
    price: row.price,
    image: row.image,
    blurb: row.blurb,
  }
}

/**
 * Shared catalog state: when `NUXT_PUBLIC_RAPIFIX_API_URL` is set, `refresh()` loads
 * `/services` and `/accessories` from Laravel; otherwise the bundled static arrays are used.
 */
export function useCatalogData() {
  const services = useState<Service[]>('rapidfix:catalog-services', () => [...staticServices])
  const accessories = useState<Accessory[]>('rapidfix:catalog-accessories', () => [...staticAccessories])
  const loaded = useState('rapidfix:catalog-loaded', () => false)

  async function refresh(): Promise<void> {
    const config = useRuntimeConfig()
    const base = (config.public.rapidfixApiUrl as string | undefined)?.replace(/\/$/, '')
    if (!base) {
      loaded.value = true

      return
    }

    const [svcRes, accRes] = await Promise.all([
      $fetch<ApiEnvelope<ApiServiceRow[]>>(`${base}/services`),
      $fetch<ApiEnvelope<ApiAccessoryRow[]>>(`${base}/accessories`),
    ])

    services.value = svcRes.data.map(mapService)
    accessories.value = accRes.data.map(mapAccessory)
    loaded.value = true
  }

  return { services, accessories, loaded, refresh }
}
