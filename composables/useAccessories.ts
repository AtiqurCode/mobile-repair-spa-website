export type AccessoryBrand = 'Apple' | 'Samsung' | 'Google' | 'Universal'

export type DeviceVersion = { id: string; label: string }

export type DeviceLine = {
  id: string
  label: string
  versions: DeviceVersion[]
}

/** Brand → device lines → specific model versions */
export const accessoryDeviceCatalog: Record<AccessoryBrand, DeviceLine[]> = {
  Apple: [
    {
      id: 'iphone-16',
      label: 'iPhone 16 series',
      versions: [
        { id: 'iphone-16', label: 'iPhone 16' },
        { id: 'iphone-16-plus', label: 'iPhone 16 Plus' },
        { id: 'iphone-16-pro', label: 'iPhone 16 Pro' },
        { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max' },
      ],
    },
    {
      id: 'iphone-15',
      label: 'iPhone 15 series',
      versions: [
        { id: 'iphone-15', label: 'iPhone 15' },
        { id: 'iphone-15-plus', label: 'iPhone 15 Plus' },
        { id: 'iphone-15-pro', label: 'iPhone 15 Pro' },
        { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max' },
      ],
    },
    {
      id: 'iphone-14',
      label: 'iPhone 14 series',
      versions: [
        { id: 'iphone-14', label: 'iPhone 14' },
        { id: 'iphone-14-plus', label: 'iPhone 14 Plus' },
        { id: 'iphone-14-pro', label: 'iPhone 14 Pro' },
        { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
      ],
    },
    {
      id: 'iphone-13',
      label: 'iPhone 13 series',
      versions: [
        { id: 'iphone-13', label: 'iPhone 13' },
        { id: 'iphone-13-mini', label: 'iPhone 13 mini' },
        { id: 'iphone-13-pro', label: 'iPhone 13 Pro' },
        { id: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max' },
      ],
    },
  ],
  Samsung: [
    {
      id: 'galaxy-s24',
      label: 'Galaxy S24 series',
      versions: [
        { id: 's24', label: 'Galaxy S24' },
        { id: 's24-plus', label: 'Galaxy S24+' },
        { id: 's24-ultra', label: 'Galaxy S24 Ultra' },
      ],
    },
    {
      id: 'galaxy-s23',
      label: 'Galaxy S23 series',
      versions: [
        { id: 's23', label: 'Galaxy S23' },
        { id: 's23-plus', label: 'Galaxy S23+' },
        { id: 's23-ultra', label: 'Galaxy S23 Ultra' },
      ],
    },
    {
      id: 'galaxy-a',
      label: 'Galaxy A series',
      versions: [
        { id: 'a54', label: 'Galaxy A54' },
        { id: 'a55', label: 'Galaxy A55' },
        { id: 'a35', label: 'Galaxy A35' },
      ],
    },
  ],
  Google: [
    {
      id: 'pixel-9',
      label: 'Pixel 9 series',
      versions: [
        { id: 'pixel-9', label: 'Pixel 9' },
        { id: 'pixel-9-pro', label: 'Pixel 9 Pro' },
        { id: 'pixel-9-pro-xl', label: 'Pixel 9 Pro XL' },
      ],
    },
    {
      id: 'pixel-8',
      label: 'Pixel 8 series',
      versions: [
        { id: 'pixel-8', label: 'Pixel 8' },
        { id: 'pixel-8-pro', label: 'Pixel 8 Pro' },
      ],
    },
    {
      id: 'pixel-7',
      label: 'Pixel 7 series',
      versions: [
        { id: 'pixel-7', label: 'Pixel 7' },
        { id: 'pixel-7-pro', label: 'Pixel 7 Pro' },
      ],
    },
  ],
  Universal: [
    {
      id: 'all-phones',
      label: 'All smartphones',
      versions: [{ id: 'all', label: 'All models' }],
    },
  ],
}

export const accessoryBrandList: AccessoryBrand[] = ['Apple', 'Samsung', 'Google', 'Universal']

export type Accessory = {
  id: number
  uuid: string
  name: string
  brand: AccessoryBrand
  deviceLineId: string
  /** 'all-line' = any version in that line; else matches DeviceVersion.id */
  versionId: string
  category: string
  price: number
  image: string
  blurb: string
}

export const accessories: Accessory[] = [
  // Apple — iPhone 15
  {
    id: 1,
    uuid: 'acc-0001',
    name: 'Ceramic Shield Glass — iPhone 15 Pro',
    brand: 'Apple',
    deviceLineId: 'iphone-15',
    versionId: 'iphone-15-pro',
    category: 'Screen protector',
    price: 28,
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=800&q=80',
    blurb: 'Edge-to-edge tempered glass with oleophobic coating.',
  },
  {
    id: 2,
    uuid: 'acc-0002',
    name: 'MagSafe Silicone Case — iPhone 15 series',
    brand: 'Apple',
    deviceLineId: 'iphone-15',
    versionId: 'all-line',
    category: 'Case',
    price: 45,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    blurb: 'Pick your exact model at checkout — all 15 variants supported.',
  },
  {
    id: 3,
    uuid: 'acc-0003',
    name: 'USB-C Fast Charge Cable (1m)',
    brand: 'Apple',
    deviceLineId: 'iphone-15',
    versionId: 'all-line',
    category: 'Charging',
    price: 22,
    image: 'https://images.unsplash.com/photo-1612810436531-1bddf2b13e0d?auto=format&fit=crop&w=800&q=80',
    blurb: 'PD 60W, braided — works with iPhone 15 & iPad.',
  },
  {
    id: 4,
    uuid: 'acc-0004',
    name: 'Privacy Glass — iPhone 15 Pro Max',
    brand: 'Apple',
    deviceLineId: 'iphone-15',
    versionId: 'iphone-15-pro-max',
    category: 'Screen protector',
    price: 34,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80',
    blurb: 'Narrow viewing angle; face-ID compatible.',
  },
  // Apple — iPhone 16
  {
    id: 5,
    uuid: 'acc-0005',
    name: 'Clear MagSafe Case — iPhone 16 Pro',
    brand: 'Apple',
    deviceLineId: 'iphone-16',
    versionId: 'iphone-16-pro',
    category: 'Case',
    price: 49,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    blurb: 'Anti-yellowing TPU + magnet array.',
  },
  {
    id: 6,
    uuid: 'acc-0006',
    name: 'Camera Lens Protector Set — iPhone 16 series',
    brand: 'Apple',
    deviceLineId: 'iphone-16',
    versionId: 'all-line',
    category: 'Camera',
    price: 18,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    blurb: 'Sapphire-coated rings per model.',
  },
  // Samsung
  {
    id: 7,
    uuid: 'acc-0007',
    name: 'S24 Ultra S Pen (replacement)',
    brand: 'Samsung',
    deviceLineId: 'galaxy-s24',
    versionId: 's24-ultra',
    category: 'Stylus',
    price: 39,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    blurb: 'Official-fit pressure levels & Bluetooth remote.',
  },
  {
    id: 8,
    uuid: 'acc-0008',
    name: 'Galaxy S24+ Armoured Case',
    brand: 'Samsung',
    deviceLineId: 'galaxy-s24',
    versionId: 's24-plus',
    category: 'Case',
    price: 42,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    blurb: 'MIL-STD drop rating; raised lip.',
  },
  {
    id: 9,
    uuid: 'acc-0009',
    name: '45W USB-C PD Wall Adapter',
    brand: 'Samsung',
    deviceLineId: 'galaxy-s24',
    versionId: 'all-line',
    category: 'Charging',
    price: 35,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    blurb: 'PPS support for S23/S24 series.',
  },
  {
    id: 10,
    uuid: 'acc-0010',
    name: 'Galaxy A55 Wallet Case',
    brand: 'Samsung',
    deviceLineId: 'galaxy-a',
    versionId: 'a55',
    category: 'Case',
    price: 29,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    blurb: 'RFID-safe card slots & stand.',
  },
  // Google
  {
    id: 11,
    uuid: 'acc-0011',
    name: 'Pixel 9 Pro Fabric Case',
    brand: 'Google',
    deviceLineId: 'pixel-9',
    versionId: 'pixel-9-pro',
    category: 'Case',
    price: 38,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    blurb: 'Recycled knit — exact cutouts for camera bar.',
  },
  {
    id: 12,
    uuid: 'acc-0012',
    name: 'Pixel 8 Screen Protector (2-pack)',
    brand: 'Google',
    deviceLineId: 'pixel-8',
    versionId: 'all-line',
    category: 'Screen protector',
    price: 24,
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=800&q=80',
    blurb: 'Ultrasonic fingerprint compatible.',
  },
  {
    id: 13,
    uuid: 'acc-0013',
    name: '30W USB-C Charger — Pixel',
    brand: 'Google',
    deviceLineId: 'pixel-9',
    versionId: 'all-line',
    category: 'Charging',
    price: 28,
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=800&q=80',
    blurb: 'Google PD profile; compact fold pins.',
  },
  // Universal
  {
    id: 14,
    uuid: 'acc-0014',
    name: 'Universal 20W USB-C + Lightning Kit',
    brand: 'Universal',
    deviceLineId: 'all-phones',
    versionId: 'all',
    category: 'Charging',
    price: 32,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    blurb: 'Travel-ready — MFi + USB-IF certified tips.',
  },
  {
    id: 15,
    uuid: 'acc-0015',
    name: 'Adjustable Desk Phone Stand',
    brand: 'Universal',
    deviceLineId: 'all-phones',
    versionId: 'all',
    category: 'Stand',
    price: 19,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    blurb: 'Aluminium; fits phones up to 7" unfolded.',
  },
]

export function formatAccessoryPrice(n: number) {
  return `$${n.toFixed(0)}`
}

export function lineLabel(lineId: string): string {
  const lines = Object.values(accessoryDeviceCatalog).flat()
  return lines.find((l) => l.id === lineId)?.label ?? lineId
}

export function versionLabel(lineId: string, versionId: string): string {
  const lines = Object.values(accessoryDeviceCatalog).flat()
  const line = lines.find((l) => l.id === lineId)
  return line?.versions.find((v) => v.id === versionId)?.label ?? versionId
}

export function accessoryFitsLabel(a: Accessory): string {
  if (a.versionId === 'all') return 'All models'
  if (a.versionId === 'all-line') return lineLabel(a.deviceLineId)
  return versionLabel(a.deviceLineId, a.versionId)
}

export function filterAccessories(
  list: Accessory[],
  opts: { brand: string; line: string; version: string },
): Accessory[] {
  const { brand, line, version } = opts
  return list.filter((a) => {
    if (brand && brand !== 'all') {
      if (brand === 'Universal') {
        if (a.brand !== 'Universal') return false
      } else {
        const okBrand = a.brand === 'Universal' || a.brand === brand
        if (!okBrand) return false
      }
    }
    if (line) {
      if (a.deviceLineId !== line) return false
    }
    if (version) {
      const fitsAnyInLine = a.versionId === 'all-line' || a.versionId === 'all'
      const fitsExact = a.versionId === version
      if (!fitsAnyInLine && !fitsExact) return false
    }
    return true
  })
}

/** Map repair service category → accessory brand filter */
export function serviceCategoryToAccessoryBrand(category: string): AccessoryBrand {
  if (category === 'iPhone') return 'Apple'
  if (category === 'Samsung') return 'Samsung'
  if (category === 'Google Pixel') return 'Google'
  return 'Universal'
}

/**
 * Best-effort parse from catalog service title → device line + version ids for URL prefill.
 */
export function inferDeviceFiltersFromServiceName(
  serviceName: string,
  brand: AccessoryBrand,
): { line?: string; version?: string } {
  const n = serviceName.toLowerCase()

  if (brand === 'Apple') {
    const gen = n.match(/iphone\s+(1[3-6])(?:\s+|$)/i)
    const num = gen?.[1]
    if (num === '16') {
      if (n.includes('pro max')) return { line: 'iphone-16', version: 'iphone-16-pro-max' }
      if (n.includes('pro')) return { line: 'iphone-16', version: 'iphone-16-pro' }
      if (n.includes('plus')) return { line: 'iphone-16', version: 'iphone-16-plus' }
      return { line: 'iphone-16', version: 'iphone-16' }
    }
    if (num === '15') {
      if (n.includes('pro max')) return { line: 'iphone-15', version: 'iphone-15-pro-max' }
      if (n.includes('pro')) return { line: 'iphone-15', version: 'iphone-15-pro' }
      if (n.includes('plus')) return { line: 'iphone-15', version: 'iphone-15-plus' }
      return { line: 'iphone-15', version: 'iphone-15' }
    }
    if (num === '14') {
      if (n.includes('pro max')) return { line: 'iphone-14', version: 'iphone-14-pro-max' }
      if (n.includes('pro')) return { line: 'iphone-14', version: 'iphone-14-pro' }
      if (n.includes('plus')) return { line: 'iphone-14', version: 'iphone-14-plus' }
      return { line: 'iphone-14', version: 'iphone-14' }
    }
    if (num === '13') {
      if (n.includes('pro max')) return { line: 'iphone-13', version: 'iphone-13-pro-max' }
      if (n.includes('pro')) return { line: 'iphone-13', version: 'iphone-13-pro' }
      if (n.includes('mini')) return { line: 'iphone-13', version: 'iphone-13-mini' }
      return { line: 'iphone-13', version: 'iphone-13' }
    }
    return { line: 'iphone-15' }
  }

  if (brand === 'Samsung') {
    if (n.includes('s24')) {
      if (n.includes('ultra')) return { line: 'galaxy-s24', version: 's24-ultra' }
      if (n.includes('s24') && !n.includes('ultra') && !n.includes('plus')) return { line: 'galaxy-s24', version: 's24' }
      if (n.includes('plus')) return { line: 'galaxy-s24', version: 's24-plus' }
      return { line: 'galaxy-s24' }
    }
    if (n.includes('s23')) {
      if (n.includes('ultra')) return { line: 'galaxy-s23', version: 's23-ultra' }
      if (n.includes('plus')) return { line: 'galaxy-s23', version: 's23-plus' }
      return { line: 'galaxy-s23', version: 's23' }
    }
    if (n.includes('a54')) return { line: 'galaxy-a', version: 'a54' }
    if (n.includes('a55')) return { line: 'galaxy-a', version: 'a55' }
    if (n.includes('a35')) return { line: 'galaxy-a', version: 'a35' }
    return { line: 'galaxy-s24' }
  }

  if (brand === 'Google') {
    if (n.includes('pixel 9') || n.includes('pixel9')) {
      if (n.includes('pro xl') || n.includes('pro max')) return { line: 'pixel-9', version: 'pixel-9-pro-xl' }
      if (n.includes('pro')) return { line: 'pixel-9', version: 'pixel-9-pro' }
      return { line: 'pixel-9', version: 'pixel-9' }
    }
    if (n.includes('pixel 8')) {
      if (n.includes('pro')) return { line: 'pixel-8', version: 'pixel-8-pro' }
      return { line: 'pixel-8', version: 'pixel-8' }
    }
    if (n.includes('pixel 7')) {
      if (n.includes('pro')) return { line: 'pixel-7', version: 'pixel-7-pro' }
      return { line: 'pixel-7', version: 'pixel-7' }
    }
    if (n.includes('pixel 6')) return { line: 'pixel-8', version: 'pixel-8' }
    return { line: 'pixel-9' }
  }

  return {}
}

export function accessoriesQueryFromService(category: string, serviceName: string): Record<string, string> {
  const brand = serviceCategoryToAccessoryBrand(category)
  const q: Record<string, string> = { brand }
  const { line, version } = inferDeviceFiltersFromServiceName(serviceName, brand)
  if (line) q.line = line
  if (version) q.version = version
  q.fromService = serviceName
  return q
}
