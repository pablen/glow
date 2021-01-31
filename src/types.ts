export type Source =
  | { type: 'camera'; stream?: MediaStream }
  | { type: 'file'; url: string }

export type Settings = {
  processInterval: number
  preProcessData: boolean
  channel: 'brightness' | 'intensity' | 'red' | 'green' | 'blue'
  samples: Record<Sample['id'], Sample>
}

export type Sample = {
  customName?: string
  sampleType: 'positive' | 'negative' | 'sample'
  isEnabled: boolean
  id: string
}

export type BoxesLayout = {
  offsetX: number
  offsetY: number
  spacing: number
  height: number
  width: number
}

export type DataPoint = any // TBD

export type Results = any // TBD
