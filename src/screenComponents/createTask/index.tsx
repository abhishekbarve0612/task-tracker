import type React from 'react'

import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { FaArrowLeft, FaTag, FaCalendar } from 'react-icons/fa'
import { Form } from '@/components'
import { categories, priorities } from '@/lib/constants'
import type { Task } from '@/lib/types'
import styles from './createTask.module.css'
import type { TaskFormData } from '../taskForm'

export function CreateTaskScreen() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [task, setTask] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.title.trim()) return

    setIsSubmitting(true)

    // Simulate a brief loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newTask: Task = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description,
      completed: false,
      priority: task.priority,
      category: task.category,
      createdAt: new Date(),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }

    // Get existing tasks from localStorage
    const existingTasks = localStorage.getItem('zen-tasks')
    const tasks = existingTasks ? JSON.parse(existingTasks) : []

    // Add new task to the beginning of the array
    const updatedTasks = [newTask, ...tasks]

    // Save to localStorage
    localStorage.setItem('zen-tasks', JSON.stringify(updatedTasks))

    // Navigate back to main screen
    router.navigate({ to: '/' })
  }

  const handleCancel = () => {
    router.navigate({ to: '/' })
  }

  const getCategoryColor = (category: string) => {
    return categories.find((cat) => cat.value === category)?.color || 'slate'
  }

  const getPriorityColor = (priority: string) => {
    return priorities.find((p) => p.value === priority)?.color || 'slate'
  }

  const selectedCategory = categories.find((cat) => cat.value === task.category)
  const selectedPriority = priorities.find((p) => p.value === task.priority)

  return (
    <div className={styles.createTaskContainer}>
      <button onClick={handleCancel} className={styles.backButton}>
        <FaArrowLeft className={styles.backIcon} />
        Back to Tasks
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>Create New Task</h1>
        <p className={styles.subtitle}>Take a moment to mindfully plan your next step</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroupLarge}>
          <Form.Label htmlFor="title" className={styles.label}>
            Task Title
          </Form.Label>
          <Form.Input
            id="title"
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="What would you like to accomplish?"
            className={`${styles.input} ${styles.titleInput}`}
            required
            autoFocus
          />
          <p className={styles.hint}>Give your task a clear, actionable title</p>
        </div>

        <div className={styles.formGroupLarge}>
          <Form.Label htmlFor="description" className={styles.label}>
            Description
          </Form.Label>
          <Form.Textarea
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Add any additional details, context, or notes that will help you complete this task..."
            className={styles.textarea}
          />
          <p className={styles.hint}>Optional: Add context or break down the task into steps</p>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <Form.Label htmlFor="category" className={styles.label}>
              Category
            </Form.Label>
            <div className={styles.selectWrapper}>
              <Form.Select
                value={task.category}
                onValueChange={(value) => setTask({ ...task, category: value })}
              >
                <Form.Select.Trigger>
                  <Form.Select.Value />
                </Form.Select.Trigger>
                <Form.Select.Content>
                  {categories.map((category) => (
                    <Form.Select.Item key={category.value} value={category.value}>
                      {category.label}
                    </Form.Select.Item>
                  ))}
                </Form.Select.Content>
              </Form.Select>
            </div>
            {selectedCategory && (
              <div className={`${styles.categoryBadge} ${styles[getCategoryColor(task.category)]}`}>
                <FaTag style={{ width: '12px', height: '12px' }} />
                {selectedCategory.label}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <Form.Label htmlFor="priority" className={styles.label}>
              Priority
            </Form.Label>
            <div className={styles.selectWrapper}>
              <Form.Select
                value={task.priority}
                onValueChange={(value) =>
                  setTask({ ...task, priority: value as 'low' | 'medium' | 'high' })
                }
              >
                <Form.Select.Trigger>
                  <Form.Select.Value />
                </Form.Select.Trigger>
                <Form.Select.Content>
                  {priorities.map((priority) => (
                    <Form.Select.Item key={priority.value} value={priority.value}>
                      {priority.label}
                    </Form.Select.Item>
                  ))}
                </Form.Select.Content>
              </Form.Select>
            </div>
            {selectedPriority && (
              <div
                className={`${styles.priorityIndicator} ${styles[getPriorityColor(task.priority)]}`}
              >
                {selectedPriority.label}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dueDate" className={styles.label}>
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className={styles.input}
            min={new Date().toISOString().split('T')[0]}
          />
          <p className={styles.hint}>Optional: Set a deadline to stay on track</p>
          {task.dueDate && (
            <div className={`${styles.categoryBadge} ${styles.stone}`}>
              <FaCalendar style={{ width: '12px', height: '12px' }} />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.createButton}
            disabled={!task.title.trim() || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
