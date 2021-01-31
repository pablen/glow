import { useOpenCv } from 'opencv-react'
import React from 'react'

import BoxesCalibration from './components/BoxesCalibration'
import SettingsEditor from './components/SettingsEditor'
import SourceSelector from './components/SourceSelector'
import * as defaults from './defaults'
import RunningAssay from './components/RunningAssay'
import processFrame from './processFrame'
import * as types from './types'
import Results from './components/Results'
import Video from './components/Video'
import Chart from './components/Chart'

type State = {
  boxesLayout: types.BoxesLayout | null
  chartData: types.DataPoint[]
  settings: types.Settings | null
  results: types.Results | null
  source: types.Source | null
}

type Action =
  | { type: 'boxes layout updated'; payload: types.BoxesLayout }
  | { type: 'new data processed'; payload: types.DataPoint }
  | { type: 'settings updated'; payload: State['settings'] }
  | { type: 'source selected'; payload: State['source'] }
  | { type: 'reset requested' }
  | { type: 'assay finished' } // TBD

const initialState: State = {
  boxesLayout: null,
  chartData: [],
  settings: null,
  results: null,
  source: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'source selected':
      return { ...state, source: action.payload }

    case 'settings updated':
      return { ...state, settings: action.payload }

    case 'boxes layout updated':
      return { ...state, boxesLayout: action.payload }

    case 'new data processed': {
      return { ...state, chartData: [...state.chartData, action.payload] }
    }

    case 'assay finished': {
      return { ...state, results: 'results mock' } // TODO
    }

    case 'reset requested':
      return initialState
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { cv } = useOpenCv()

  // Stop camera video capture when stream is removed from state
  const stream =
    state.source?.type === 'camera' ? state.source.stream : undefined
  React.useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop())
    }
  }, [stream])

  const videoElement = React.useRef<HTMLVideoElement>(null)

  const videoSrc =
    state.source?.type === 'file'
      ? state.source.url
      : state.source?.type === 'camera'
      ? state.source.stream!
      : null

  // TODO: I don't like this
  React.useEffect(() => {
    if (!videoElement.current || !videoSrc) return
    if (videoSrc instanceof MediaStream) {
      videoElement.current.srcObject = videoSrc
      videoElement.current.src = ''
    }
    if (typeof videoSrc === 'string') {
      videoElement.current.srcObject = null
      videoElement.current.src = videoSrc
    }
    videoElement.current.play()
  }, [videoSrc, state.boxesLayout, state.settings])

  if (state.source === null) {
    return (
      <SourceSelector
        onSourceSelected={(source) => {
          dispatch({ type: 'source selected', payload: source })
        }}
      />
    )
  }

  if (state.settings === null) {
    return (
      <SettingsEditor
        initialSettings={defaults.settings}
        onCancel={() => {
          dispatch({ type: 'source selected', payload: null })
        }}
        onSave={(newSettings) => {
          dispatch({ type: 'settings updated', payload: newSettings })
        }}
      />
    )
  }

  const enabledSamples = Object.values(state.settings.samples).filter(
    ({ isEnabled }) => isEnabled
  )

  if (state.boxesLayout === null) {
    return (
      <BoxesCalibration
        initialLayout={defaults.boxesLayout}
        onCancel={() => {
          dispatch({ type: 'settings updated', payload: null })
        }}
        onSave={(newBoxesLayout) => {
          dispatch({ type: 'boxes layout updated', payload: newBoxesLayout })
        }}
        samples={enabledSamples}
        ref={videoElement}
      />
    )
  }

  if (state.results === null) {
    return (
      <RunningAssay
        onInterval={() => {
          processFrame({
            boxesLayout: state.boxesLayout!,
            settings: state.settings!,
            video: videoElement.current!,
            cv,
          }).then((newData) => {
            dispatch({ type: 'new data processed', payload: newData })
          })
        }}
        onComplete={() => {
          dispatch({ type: 'assay finished' })
        }}
        settings={state.settings}
        video={
          <Video
            boxesLayout={state.boxesLayout}
            samples={enabledSamples}
            ref={videoElement}
          />
        }
        chart={<Chart data={state.chartData} />}
      />
    )
  }

  return (
    <Results
      onReset={() => {
        dispatch({ type: 'reset requested' })
      }}
      chart={<Chart data={state.chartData} />}
    />
  )
}

export default App
