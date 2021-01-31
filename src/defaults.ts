import { Settings, BoxesLayout, Sample } from './types'

export const settings: Settings = {
  processInterval: 1,
  preProcessData: false,
  channel: 'brightness',
  samples: {
    1: { sampleType: 'sample', id: '1', isEnabled: true },
    2: { sampleType: 'sample', id: '2', isEnabled: true },
    3: { sampleType: 'sample', id: '3', isEnabled: true },
    4: { sampleType: 'sample', id: '4', isEnabled: true },
    5: { sampleType: 'sample', id: '5', isEnabled: true },
    6: { sampleType: 'sample', id: '6', isEnabled: true },
    7: { sampleType: 'sample', id: '7', isEnabled: true },
    8: { sampleType: 'sample', id: '8', isEnabled: true },
  },
}

export const boxesLayout: BoxesLayout = {
  offsetX: 0,
  offsetY: 35,
  spacing: 0,
  height: 30,
  width: 100 / Object.keys(settings.samples).length,
}

export const colorMap: Record<Sample['sampleType'], string> = {
  positive: 'cyan',
  negative: 'yellow',
  sample: 'magenta',
} as const
