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
  type Component,
} from 'lucide-vue-next'

// ── Types ─────────────────────────────────────────────────────────────────────

export type Service = {
  id: number
  category: string
  tags: string[]
  icon: Component
  name: string
  description: string
  price: number
  eta: string
  warranty: string
  image: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const services: Service[] = [
  // ── iPhone ────────────────────────────────────────────────
  {
    id: 1,
    category: 'iPhone',
    tags: ['Screen Repair', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: Wrench,
    name: 'iPhone Screen Replacement',
    description: 'OLED and LCD screen replacements with factory-calibrated touch and True Tone support for all modern iPhone models.',
    price: 79,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    category: 'iPhone',
    tags: ['Battery Replacement', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: BatteryCharging,
    name: 'iPhone Battery Replacement',
    description: 'Restore all-day battery life with a health-certified replacement cell. Compatible with iPhone 11 through iPhone 15 series.',
    price: 49,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    category: 'iPhone',
    tags: ['Charging Fix', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: Zap,
    name: 'iPhone Charging Port Fix',
    description: 'Resolve slow charging, loose cable connection, and intermittent charging on Lightning and USB-C iPhones.',
    price: 59,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    category: 'iPhone',
    tags: ['Camera Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Camera,
    name: 'iPhone Camera Repair',
    description: 'Fix blurry, non-focusing, or black front and rear camera modules. Includes lens glass and OIS calibration.',
    price: 89,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    category: 'iPhone',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Speaker,
    name: 'iPhone Speaker / Earpiece Repair',
    description: 'Repair muffled, crackling, or completely silent speakers and earpieces. We also fix microphone issues.',
    price: 55,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    category: 'iPhone',
    tags: ['Hardware Fix', 'Same-Day Service', 'Warranty Included'],
    icon: Smartphone,
    name: 'iPhone Back Glass Repair',
    description: 'Replace cracked or shattered rear glass on iPhone 8 through iPhone 15 Pro Max with colour-matched OEM glass panels.',
    price: 69,
    eta: '45–75 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    category: 'iPhone',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Fingerprint,
    name: 'Face ID / Touch ID Repair',
    description: 'Restore broken Face ID sensors or unresponsive Touch ID home buttons. Genuine Apple-compatible components used throughout.',
    price: 95,
    eta: '60–90 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    category: 'iPhone',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Layers,
    name: 'iPhone Screen Protector Fitting',
    description: 'Professional dust-free application of tempered glass or ceramic screen protectors with edge-to-edge alignment.',
    price: 15,
    eta: '10–15 min',
    warranty: '3 months',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=900&q=80',
  },
  // ── Samsung ───────────────────────────────────────────────
  {
    id: 9,
    category: 'Samsung',
    tags: ['Screen Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Wrench,
    name: 'Samsung Screen Replacement',
    description: 'Genuine AMOLED screen replacements for Galaxy S and A series phones. Maintains fingerprint-on-display functionality.',
    price: 89,
    eta: '60–90 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    category: 'Samsung',
    tags: ['Battery Replacement', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: BatteryCharging,
    name: 'Samsung Battery Replacement',
    description: 'Replace degraded batteries on Galaxy S, A, and Note series phones to restore full-day performance.',
    price: 45,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    category: 'Samsung',
    tags: ['Charging Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Usb,
    name: 'Samsung Charging Port Repair',
    description: 'Fix USB-C charging port damage, bent pins, and debris blockage on all Samsung Galaxy models.',
    price: 55,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    category: 'Samsung',
    tags: ['Camera Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Camera,
    name: 'Samsung Camera Repair',
    description: 'Fix cracked camera lenses, blurry shots, and autofocus failures on Galaxy S23, S24, and A-series devices.',
    price: 75,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 13,
    category: 'Samsung',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Speaker,
    name: 'Samsung Speaker Repair',
    description: 'Restore distorted, quiet, or completely silent speakers on Samsung Galaxy phones including foldables.',
    price: 50,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 14,
    category: 'Samsung',
    tags: ['Hardware Fix', 'Warranty Included'],
    icon: Smartphone,
    name: 'Samsung Back Cover Replacement',
    description: 'Replace cracked or scratched back covers on Galaxy S and A series with OEM glass or polycarbonate panels.',
    price: 55,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
  },
  // ── Google Pixel ──────────────────────────────────────────
  {
    id: 15,
    category: 'Google Pixel',
    tags: ['Screen Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Wrench,
    name: 'Pixel Screen Replacement',
    description: 'Factory-grade OLED screen replacements for Google Pixel 6, 7, 8, and 9 series with full touch calibration.',
    price: 95,
    eta: '60–90 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 16,
    category: 'Google Pixel',
    tags: ['Battery Replacement', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: BatteryCharging,
    name: 'Pixel Battery Replacement',
    description: 'Restore Pixel battery life with a certified replacement. Fix overheating, rapid drain, and unexpected shutdowns.',
    price: 59,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 17,
    category: 'Google Pixel',
    tags: ['Charging Fix', 'Quick Service', 'Warranty Included'],
    icon: Zap,
    name: 'Pixel Charging Port Repair',
    description: 'Fix USB-C port faults on Pixel 6, 7, 8, and 9 — including slow charging, no charging, and loose connector issues.',
    price: 60,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 18,
    category: 'Google Pixel',
    tags: ['Camera Repair', 'Warranty Included'],
    icon: Camera,
    name: 'Pixel Camera Repair',
    description: 'Restore full camera functionality on Pixel 6a, 7 Pro, 8 Pro — including Night Sight, astrophotography, and video stabilisation.',
    price: 85,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1587840171670-8b850147754e?auto=format&fit=crop&w=900&q=80',
  },
  // ── General ───────────────────────────────────────────────
  {
    id: 19,
    category: 'General',
    tags: ['Water Damage', 'Hardware Fix'],
    icon: Droplets,
    name: 'Water Damage Treatment',
    description: 'Emergency ultrasonic cleaning and corrosion removal for liquid-damaged phones. Best chance of recovery when treated early.',
    price: 70,
    eta: '1–2 hours',
    warranty: '90 days',
    image: 'https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 20,
    category: 'General',
    tags: ['Hardware Fix', 'Warranty Included'],
    icon: Wifi,
    name: 'Wi-Fi / Bluetooth Antenna Repair',
    description: 'Fix weak or absent Wi-Fi and Bluetooth signal caused by damaged antenna flex cables or logic board connections.',
    price: 65,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 21,
    category: 'General',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Mic2,
    name: 'Microphone Repair',
    description: 'Fix muffled calls, voice note issues, and voice assistant recognition failures caused by mic damage.',
    price: 50,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 22,
    category: 'General',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Wrench,
    name: 'Power / Volume Button Repair',
    description: 'Fix stuck, unresponsive, or physically broken power and volume buttons on any smartphone model.',
    price: 40,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 23,
    category: 'General',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Layers,
    name: 'SIM / MicroSD Tray Repair',
    description: 'Replace bent, broken, or missing SIM card and microSD trays to restore reliable connectivity and storage.',
    price: 25,
    eta: '15–20 min',
    warranty: '6 months',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 24,
    category: 'General',
    tags: ['Screen Repair', 'Quick Service', 'Warranty Included'],
    icon: Layers,
    name: 'Screen Protector Installation',
    description: 'Professional dust-free fitting of tempered glass or privacy screen protectors for all major phone models.',
    price: 12,
    eta: '10–15 min',
    warranty: '3 months',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=900&q=80',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

export const serviceCategories = ['All Categories', 'iPhone', 'Samsung', 'Google Pixel', 'General'] as const

export const popularTags = [
  'Screen Repair',
  'Battery Replacement',
  'Quick Service',
  'Water Damage',
  'Charging Fix',
  'Camera Repair',
  'Speaker Fix',
  'Hardware Fix',
  'Same-Day Service',
  'Warranty Included',
] as const

export function formatPrice(n: number) {
  return `$${n.toFixed(0)}`
}

/** Maps catalog category → /book "Phone brand" select value */
export function mapCategoryToBookingBrand(category: string): string {
  if (category === 'iPhone' || category === 'Samsung' || category === 'Google Pixel') return category
  return 'Other / Mixed'
}

/** Maps catalog service name → /book "Service needed" select value */
export function mapServiceNameToBookingService(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('water damage')) return 'Water Damage Treatment'
  if (n.includes('screen protector')) return 'Other'
  if (n.includes('screen') && n.includes('replacement')) return 'Screen Replacement'
  if (n.includes('battery')) return 'Battery Replacement'
  if (n.includes('charging port')) return 'Charging Port Repair'
  if (n.includes('camera')) return 'Camera Repair'
  if (n.includes('microphone') || n.includes('speaker') || n.includes('earpiece')) return 'Speaker / Microphone Repair'
  if (n.includes('wi-fi') || n.includes('bluetooth')) return 'Wi-Fi / Bluetooth Repair'
  if (n.includes('back glass') || n.includes('back cover')) return 'Back Glass / Housing'
  if (n.includes('face id') || n.includes('touch id')) return 'Other'
  if (n.includes('power') && n.includes('volume')) return 'Other'
  if (n.includes('sim') || n.includes('microsd')) return 'Other'
  return 'Diagnostic / Not Sure'
}

export function bookingQueryForService(service: Service) {
  return {
    brand: mapCategoryToBookingBrand(service.category),
    service: mapServiceNameToBookingService(service.name),
    detail: service.name,
  }
}
