import React from 'react'

import styles from './ScrollableLayout.module.css'

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

function ScrollableLayout({ children, header, footer }: Props) {
  return (
    <div className={styles.container}>
      {header && <div className={styles.header}>{header}</div>}

      <div className={styles.main}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

export default ScrollableLayout
