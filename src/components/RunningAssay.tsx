import { useOpenCv } from 'opencv-react'
import React from 'react'

import { Settings } from '../types'
import styles from './RunningAssay.module.css'
import button from './Button.module.css'

type Props = {
  onComplete(): void
  onInterval(): void
  settings: Settings
  video: React.ReactNode
  chart: React.ReactNode
}

function RunningAssay({
  onInterval,
  onComplete,
  settings,
  video,
  chart,
}: Props) {
  const { loaded: isOpenCvLoaded } = useOpenCv()

  React.useEffect(() => {
    const timer = window.setInterval(
      onInterval,
      settings.processInterval * 1000
    )
    return () => {
      if (timer) window.clearInterval(timer)
    }
  }, [settings.processInterval, onInterval])

  return isOpenCvLoaded ? (
    <div className={styles.container}>
      {video}
      {chart}

      <div className={styles.actions}>
        <button type="button" onClick={onComplete} className={button.base}>
          Finish
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.loading}>
      <p>Loading OpenCV</p>
      <progress />
    </div>
  )
}

export default RunningAssay
