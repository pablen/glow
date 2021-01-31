import React from 'react'

import { BoxesLayout, Sample } from '../types'
import { colorMap } from '../defaults'
import styles from './Video.module.css'

type Props = {
  boxesLayout: BoxesLayout
  samples: Sample[]
}

const Video = React.forwardRef(
  (
    { samples, boxesLayout }: Props,
    ref: React.ForwardedRef<HTMLVideoElement>
  ) => {
    return (
      <div className={styles.container}>
        <video
          disablePictureInPicture
          playsInline
          className={styles.player}
          onEnded={() => console.log('video ended')}
          // controls
          muted
          ref={ref}
        />
        <svg className={styles.svg}>
          {samples.map((sample, i) => {
            const x =
              boxesLayout.spacing * i +
              boxesLayout.width * i +
              boxesLayout.offsetX
            return (
              <g key={sample.id}>
                <text
                  className={styles.boxLabel}
                  fontSize={`${4 * (100 / samples.length)}%`}
                  fill={colorMap[sample.sampleType]}
                  x={`${x}%`}
                  y={`${boxesLayout.offsetY - 3}%`}
                >
                  {sample.customName || `Sample ${sample.id}`}
                </text>
                <rect
                  className={styles.box}
                  stroke={colorMap[sample.sampleType]}
                  height={`${boxesLayout.height}%`}
                  width={`${boxesLayout.width}%`}
                  x={`${x}%`}
                  y={`${boxesLayout.offsetY}%`}
                />
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
)

export default Video
