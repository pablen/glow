import React from 'react'

import { Source } from '../types'
import styles from './SourceSelector.module.css'
import button from './Button.module.css'

type Props = {
  onSourceSelected(source: Source): void
}

function SourceSelector({ onSourceSelected }: Props) {
  const handleFileSelect = React.useCallback(
    (event) => {
      if (event.target.files === null) return
      const url = window.URL.createObjectURL(event.target.files[0])
      onSourceSelected({ type: 'file', url })
    },
    [onSourceSelected]
  )

  const handleCameraSelect = React.useCallback(() => {
    if (!navigator.mediaDevices) return
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: 'environment' } })
      .then((stream) => {
        onSourceSelected({ type: 'camera', stream })
      })
      .catch((error) => {
        alert(error.name + ': ' + error.message)
      })
  }, [onSourceSelected])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.logo}>Logo</span>
      </header>

      <main className={styles.main}>
        <p className={styles.label}>Select the source</p>

        <div className={styles.spacer}>
          <input
            onChange={handleFileSelect}
            hidden
            accept="video/mp4,video/x-m4v,video/*"
            type="file"
            id="file-upload-btn"
          />
          <label htmlFor="file-upload-btn" className={button.base}>
            File
          </label>
        </div>
        <div className={styles.spacer}>
          <button
            className={button.base}
            disabled={!navigator.mediaDevices}
            onClick={handleCameraSelect}
            type="button"
          >
            Camera
          </button>
        </div>
      </main>
    </div>
  )
}

export default React.memo(SourceSelector)
