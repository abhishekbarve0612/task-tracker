import { Card, Button } from '@/components'
import { FaCircle } from 'react-icons/fa6'
import styles from './emptyState.module.css'

interface EmptyStateProps {
  hasNoTasks: boolean
  onCreateTask: () => void
}

export function EmptyState({ hasNoTasks, onCreateTask }: EmptyStateProps) {
  return (
    <Card>
      <Card.Content className={styles.emptyState}>
        <div>
          <FaCircle className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>
            {hasNoTasks ? 'No tasks yet' : 'No tasks match your search'}
          </p>
          <p className={styles.emptyDescription}>
            {hasNoTasks ? 'Create your first task to get started' : 'Try adjusting your filters'}
          </p>
          {hasNoTasks && (
            <div style={{ marginTop: '24px' }}>
              <Button onClick={onCreateTask} className={styles.newTaskButton}>
                Create Your First Task
              </Button>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  )
}
