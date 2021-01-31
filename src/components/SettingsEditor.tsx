import React from 'react'

import ScrollableLayout from './ScrollableLayout'
import { Settings } from '../types'
import SampleField from './SampleField'
import styles from './SettingsEditor.module.css'
import button from './Button.module.css'

type Props = {
  initialSettings: Settings
  onCancel(): void
  onSave(settings: Settings): void
}

function SettingsEditor({ initialSettings, onCancel, onSave }: Props) {
  const [channel, setChannel] = React.useState(initialSettings.channel)

  const [processInterval, setProcessInterval] = React.useState<number | ''>(
    initialSettings.processInterval
  )

  const [preProcessData, setPreProcessData] = React.useState(
    initialSettings.preProcessData
  )

  const [samples, setSamples] = React.useState(initialSettings.samples)

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault()
      if (typeof processInterval !== 'number') return
      onSave({ preProcessData, processInterval, channel, samples })
    },
    [onSave, preProcessData, channel, processInterval, samples]
  )

  // Require at least one sample enabled
  const canSubmit =
    Object.values(samples).filter(({ isEnabled }) => isEnabled).length > 0

  return (
    <ScrollableLayout
      footer={
        <button
          className={button.primary}
          disabled={!canSubmit}
          form="settings"
          type="submit"
        >
          Continue
        </button>
      }
    >
      <form id="settings" className={styles.container} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <span className={styles.logo}>Logo</span>
          <button onClick={onCancel} type="button" className={styles.cancelBtn}>
            Cancel
          </button>
        </header>

        <main className={styles.main}>
          <p className={styles.message}>
            Configure your samples setup. You can optionally provide a name for
            each sample.
          </p>

          {Object.values(samples).map((sample) => (
            <SampleField
              onNameChange={(newName) =>
                setSamples((s) => ({
                  ...s,
                  [sample.id]: { ...s[sample.id], customName: newName },
                }))
              }
              onTypeChange={(newType) =>
                setSamples((s) => ({
                  ...s,
                  [sample.id]: { ...s[sample.id], sampleType: newType },
                }))
              }
              onToggle={(isEnabled) =>
                setSamples((s) => ({
                  ...s,
                  [sample.id]: { ...s[sample.id], isEnabled },
                }))
              }
              customName={sample.customName}
              sampleType={sample.sampleType}
              isEnabled={sample.isEnabled}
              key={sample.id}
              id={sample.id}
            />
          ))}

          <section
            aria-labelledby="advanced-settings-title"
            className={styles.advanced}
          >
            <h2 id="advanced-settings-title" className={styles.advancedTitle}>
              Advanced Settings
            </h2>

            <label htmlFor="channel" className={styles.label}>
              Channel
            </label>
            <select
              className={styles.select}
              onChange={(e) =>
                setChannel(e.target.value as Settings['channel'])
              }
              value={channel}
              name="channel"
              id="channel"
            >
              <option value="brightness">Brightness (HSV)</option>
              <option value="intensity">Intensity (GRAY)</option>
              <option value="red">Red (RGB)</option>
              <option value="green">Green (RGB)</option>
              <option value="blue">Blue (RGB)</option>
            </select>

            <label className={styles.spacing}>
              Sense every{' '}
              <input
                className={styles.numberInput}
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  setProcessInterval(Number.isNaN(value) ? '' : value)
                }}
                required
                value={processInterval}
                name="processInterval"
                type="number"
                size={4}
                step={0.1}
                min={0.5}
                max={999}
              />{' '}
              {processInterval > 1 ? 'seconds' : 'second'}
            </label>

            <label className={styles.spacing}>
              <span className={styles.checkboxContainer}>
                <input
                  className={styles.checkbox}
                  onChange={(e) => setPreProcessData(e.target.checked)}
                  checked={preProcessData}
                  type="checkbox"
                  name="preProcessData"
                  id="preProcessData"
                />{' '}
                Pre-process data
              </span>
            </label>
          </section>
        </main>
      </form>
    </ScrollableLayout>
  )
}

export default SettingsEditor
