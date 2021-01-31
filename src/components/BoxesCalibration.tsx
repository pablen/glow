import React from 'react'

import { BoxesLayout, Sample } from '../types'
import ScrollableLayout from './ScrollableLayout'
import styles from './BoxesCalibration.module.css'
import button from './Button.module.css'
import Video from './Video'

type Props = {
  initialLayout: BoxesLayout
  onCancel(): void
  samples: Sample[]
  onSave(boxesLayout: BoxesLayout): void
}

const BoxesCalibration = React.forwardRef(
  (
    { initialLayout, onCancel, samples, onSave }: Props,
    ref: React.ForwardedRef<HTMLVideoElement>
  ) => {
    const [layout, setLayout] = React.useState({
      ...initialLayout,
      width: 100 / samples.length,
    })

    const handleSubmit = React.useCallback(
      (event) => {
        event.preventDefault()
        onSave(layout)
      },
      [onSave, layout]
    )

    return (
      <ScrollableLayout
        header={<Video boxesLayout={layout} samples={samples} ref={ref} />}
        footer={
          <button
            className={button.primary}
            form="file-calibration"
            type="submit"
          >
            Start Assay
          </button>
        }
      >
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          id="file-calibration"
        >
          <p className={styles.message}>
            Adjust the rectangles to include the area that contains the samples.
          </p>

          <label className={styles.label}>
            X offset
            <input
              className={styles.rangeInput}
              onChange={(event) =>
                setLayout((l) => ({
                  ...l,
                  offsetX: event.target.valueAsNumber,
                }))
              }
              value={layout.offsetX}
              type="range"
              step={0.1}
              min="0"
              max="100"
              id="offsetX"
            />
          </label>

          <label className={styles.label}>
            Y offset
            <input
              className={styles.rangeInput}
              onChange={(event) =>
                setLayout((l) => ({
                  ...l,
                  offsetY: event.target.valueAsNumber,
                }))
              }
              value={layout.offsetY}
              type="range"
              step={0.1}
              min="0"
              max="100"
              id="offsetY"
            />
          </label>

          <label className={styles.label}>
            Spacing
            <input
              className={styles.rangeInput}
              onChange={(event) =>
                setLayout((l) => ({
                  ...l,
                  spacing: event.target.valueAsNumber,
                }))
              }
              value={layout.spacing}
              type="range"
              step={0.1}
              min="0"
              max="50"
              id="spacing"
            />
          </label>

          <label className={styles.label}>
            Width
            <input
              className={styles.rangeInput}
              onChange={(event) =>
                setLayout((l) => ({ ...l, width: event.target.valueAsNumber }))
              }
              value={layout.width}
              type="range"
              step={0.1}
              min="1"
              max={100 / samples.length}
              id="width"
            />
          </label>

          <label className={styles.label}>
            Height
            <input
              className={styles.rangeInput}
              onChange={(event) =>
                setLayout((l) => ({ ...l, height: event.target.valueAsNumber }))
              }
              value={layout.height}
              type="range"
              min="1"
              max="100"
              id="height"
            />
          </label>
        </form>
      </ScrollableLayout>
    )
  }
)

export default BoxesCalibration
