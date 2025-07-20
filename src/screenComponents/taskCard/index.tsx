import { Card, Form, Badge, Button, Dropdown } from '@/components'
import type { Task } from '@/lib/types'
import { categories, priorities } from '@/lib/constants'
import styles from './taskCard.module.css'
import { FaEllipsis, FaTag, FaTrash } from 'react-icons/fa6'
import { FaCalendar, FaEdit } from 'react-icons/fa'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const getCategoryColor = (category: string) => {
    return categories.find((cat) => cat.value === category)?.color || 'slate'
  }

  const getPriorityColor = (priority: string) => {
    return priorities.find((p) => p.value === priority)?.color || 'slate'
  }

  return (
    <Card className={`${styles.taskCard} ${task.completed ? styles.taskCardCompleted : ''}`}>
      <Card.Content>
        <div className={styles.taskContent}>
          <Form.Checkbox checked={task.completed} onCheckedChange={() => onToggle(task.id)} />

          <div className={styles.taskMain}>
            <div className={styles.taskHeader}>
              <div className={styles.taskInfo}>
                <h3
                  className={`${styles.taskTitle} ${task.completed ? styles.taskTitleCompleted : ''}`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    className={`${styles.taskDescription} ${task.completed ? styles.taskDescriptionCompleted : ''}`}
                  >
                    {task.description}
                  </p>
                )}
              </div>

              <Dropdown onOpen={() => onToggle(task.id)}>
                <Dropdown.Button>
                  <Button variant={Button.Variants.icon}>
                    <FaEllipsis />
                  </Button>
                </Dropdown.Button>
                <Dropdown.Dropdown>
                  <Dropdown.Item onClick={() => onEdit(task)}>
                    <FaEdit className={styles.itemIcon} />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item isDestructive onClick={() => onDelete(task.id)}>
                    <FaTrash className={styles.itemIcon} />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Dropdown>
              </Dropdown>
            </div>

            <div className={styles.taskMeta}>
              <Badge color={Badge.COLORS[getCategoryColor(task.category)]}>
                <FaTag style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                {categories.find((cat) => cat.value === task.category)?.label}
              </Badge>

              <Badge color={Badge.COLORS[getPriorityColor(task.priority)]}>
                {priorities.find((p) => p.value === task.priority)?.label}
              </Badge>

              {task.dueDate && (
                <Badge color="stone">
                  <FaCalendar style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                  {task.dueDate.toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
