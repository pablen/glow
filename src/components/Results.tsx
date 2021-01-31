import React from 'react'

import styles from './Results.module.css'
import button from './Button.module.css'

type Props = {
  onReset(): void
  chart: React.ReactNode
}

function Results({ onReset, chart }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>{chart}</div>

      <button type="button" onClick={onReset} className={button.base}>
        Restart
      </button>
    </div>
  )
}

export default Results
