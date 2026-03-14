export type DeviceType = 'iphone' | 'samsung' | 'pixel'

type RepairItem = {
  name: string
  description: string
  eta: string
  price: number
  warranty: string
  includes: string[]
  idealFor: string
}

export const deviceLabels: Record<DeviceType, string> = {
  iphone: 'iPhone',
  samsung: 'Samsung',
  pixel: 'Google Pixel'
}

export const pricingTable: Record<DeviceType, RepairItem[]> = {
  iphone: [
    {
      name: 'Screen Replacement',
      description: 'Restore touch accuracy and vivid display quality.',
      eta: '45-60 min',
      price: 129,
      warranty: '12 months',
      includes: ['Premium OLED/LCD part', 'Touch calibration', 'Free screen protector install'],
      idealFor: 'Cracked glass, flicker, dead pixels'
    },
    {
      name: 'Battery Swap',
      description: 'Get all-day power with a fresh high-health battery.',
      eta: '30-45 min',
      price: 89,
      warranty: '12 months',
      includes: ['Battery health diagnostics', 'Safe adhesive replacement', 'Post-repair power test'],
      idealFor: 'Fast drain, random shutdowns'
    },
    {
      name: 'Water Damage Recovery',
      description: 'Deep-clean internal corrosion and recover critical functions.',
      eta: '2-4 hrs',
      price: 149,
      warranty: '90 days',
      includes: ['Multi-point diagnostics', 'Board-level cleaning', 'Data-safety handling'],
      idealFor: 'Liquid exposure, charging and speaker issues'
    }
  ],
  samsung: [
    {
      name: 'Screen Replacement',
      description: 'Replace damaged AMOLED/LCD panels with precision fitting.',
      eta: '60-90 min',
      price: 139,
      warranty: '12 months',
      includes: ['High-grade display module', 'Touch and brightness tuning', 'Frame seal inspection'],
      idealFor: 'Broken display, touch ghosting'
    },
    {
      name: 'Battery Swap',
      description: 'Improve runtime and stabilize charging behavior.',
      eta: '40-60 min',
      price: 95,
      warranty: '12 months',
      includes: ['Battery cycle analysis', 'Safe replacement process', 'Rapid charge verification'],
      idealFor: 'Overheating, battery drop-offs'
    },
    {
      name: 'Water Damage Recovery',
      description: 'Component-level cleaning and recovery workflow for liquid incidents.',
      eta: '2-4 hrs',
      price: 159,
      warranty: '90 days',
      includes: ['Corrosion treatment', 'Ultrasonic board clean', 'Function-by-function report'],
      idealFor: 'No audio, camera fog, boot loops'
    }
  ],
  pixel: [
    {
      name: 'Screen Replacement',
      description: 'Bring back smooth scrolling and crystal-clear visuals.',
      eta: '60-90 min',
      price: 149,
      warranty: '12 months',
      includes: ['Pixel-ready display assembly', 'Sensor recalibration', 'Display quality check'],
      idealFor: 'Cracks, display artifacts, unresponsive touch'
    },
    {
      name: 'Battery Swap',
      description: 'New battery cell optimized for Pixel power management.',
      eta: '35-50 min',
      price: 99,
      warranty: '12 months',
      includes: ['Battery health baseline', 'Thermal test', 'Charging cycle validation'],
      idealFor: 'Reduced standby life, sudden power off'
    },
    {
      name: 'Water Damage Recovery',
      description: 'Priority rescue process to reduce moisture-related failures.',
      eta: '2-4 hrs',
      price: 169,
      warranty: '90 days',
      includes: ['Moisture extraction service', 'Mainboard treatment', 'Stability test before delivery'],
      idealFor: 'Splash/immersion damage symptoms'
    }
  ]
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)