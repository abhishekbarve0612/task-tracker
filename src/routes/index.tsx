import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/screenComponents/dashboard'
import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Zen Tasks</h1>
          <p className={styles.subtitle}>A mindful approach to productivity</p>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}
