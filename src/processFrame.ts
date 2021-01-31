import { DataPoint, Settings, BoxesLayout } from './types'

type Args = {
  boxesLayout: BoxesLayout
  settings: Settings
  video: HTMLVideoElement
  cv: any
}

function processFrame({
  boxesLayout,
  settings,
  video,
  cv,
}: Args): Promise<DataPoint> {
  console.log({ boxesLayout, settings, video, cv })
  // TODO: zakito's magic

  return Promise.resolve('new data point')
}

export default processFrame
