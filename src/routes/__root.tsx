import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import styles from './index.module.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>Zen Tasks</h1>
            <p className={styles.subtitle}>A mindful approach to productivity</p>
          </div>

          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
