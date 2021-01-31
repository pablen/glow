import React from 'react'

import { Sample } from '../types'
import styles from './SampleField.module.css'

type Props = Sample & {
  onTypeChange(newType: Sample['sampleType']): void
  onNameChange(newName: string): void
  onToggle(isEnabled: boolean): void
}

function SampleField({
  onTypeChange,
  onNameChange,
  sampleType,
  customName,
  isEnabled,
  onToggle,
  id,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label className={styles.toggle} aria-disabled={!isEnabled}>
          <input
            className={styles.checkbox}
            onChange={(event) => onToggle(event.target.checked)}
            checked={isEnabled}
            type="checkbox"
          />
          Sample {id}
        </label>

        <div className={styles.toggles}>
          <button
            aria-pressed={sampleType === 'positive'}
            disabled={!isEnabled}
            onClick={() => onTypeChange('positive')}
            type="button"
          >
            Positive
          </button>
          <button
            aria-pressed={sampleType === 'negative'}
            disabled={!isEnabled}
            onClick={() => onTypeChange('negative')}
            type="button"
          >
            Negative
          </button>
          <button
            aria-pressed={sampleType === 'sample'}
            disabled={!isEnabled}
            onClick={() => onTypeChange('sample')}
            type="button"
          >
            Sample
          </button>
        </div>
      </div>

      <div className={styles.textContainer}>
        <input
          autoCapitalize="none"
          data-lpignore="true"
          autoComplete="off"
          autoCorrect="false"
          placeholder="Your entry"
          aria-label={`Sample ${id} custom name`}
          spellCheck="false"
          className={styles.textField}
          onChange={(event) => onNameChange(event.target.value)}
          disabled={!isEnabled}
          value={customName || ''}
          type="text"
        />
      </div>
    </div>
  )
}

export default SampleField
