import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Button, Form, Dialog } from '@/components'
import TaskForm, { TaskFormData } from '@/screenComponents/taskForm'
import { TaskCard } from '@/screenComponents/taskCard'
import type { Task } from '@/lib/types'
import { categories, categoriesMap } from '@/lib/constants'
import styles from './dashboard.module.css'
import { EmptyState } from '@/screenComponents/emptyState'
import { useRouter } from '@tanstack/react-router'
import { FaCheckCircle, FaSearch } from 'react-icons/fa'

function Dashboard() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriesMap.all)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: '',
  })

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('zen-tasks')
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }))
      setTasks(parsedTasks)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('zen-tasks', JSON.stringify(tasks))
  }, [tasks])

  const navigateToCreateTask = () => {
    router.navigate({ to: '/create' })
  }

  const updateTask = () => {
    if (!editingTask || !newTask.title.trim()) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              category: newTask.category,
              dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
            }
          : task
      )
    )

    setEditingTask(null)
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: '',
    })
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const startEditing = (task: Task) => {
    setEditingTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
    })
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <>
      {/* Progress indicator */}
      {totalCount > 0 && (
        <div className={styles.progress}>
          <FaCheckCircle className={styles.progressIcon} />
          <span>
            {completedCount} of {totalCount} completed
          </span>
        </div>
      )}

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Form.Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<FaSearch className={styles.inlineIcon} />}
          />
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.selectWrapper}>
            <Form.Select
              value={categoriesMap[selectedCategory]}
              onValueChange={setSelectedCategory}
            >
              <Form.Select.Trigger>
                <Form.Select.Value placeholder="All" value={categoriesMap[selectedCategory]} />
              </Form.Select.Trigger>
              <Form.Select.Content>
                <Form.Select.Item value="all">All</Form.Select.Item>
                {categories.map((category) => (
                  <Form.Select.Item key={category.value} value={category.value}>
                    {category.label}
                  </Form.Select.Item>
                ))}
              </Form.Select.Content>
            </Form.Select>
          </div>

          <Button onClick={navigateToCreateTask} className={styles.newTaskButton}>
            <FaPlus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            New Task
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className={styles.tasksList}>
        {filteredTasks.length === 0 ? (
          <EmptyState hasNoTasks={tasks.length === 0} onCreateTask={navigateToCreateTask} />
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={startEditing}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog id="edit-task">
        <Dialog.Content id="edit-task">
          <Dialog.Header id="edit-task">
            <Dialog.Title id="edit-task">Edit Task</Dialog.Title>
          </Dialog.Header>
          <TaskForm
            task={newTask}
            setTask={(task) => setNewTask(task as TaskFormData)}
            onSubmit={updateTask}
            onCancel={() => setEditingTask(null)}
            submitLabel="Update Task"
          />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export default Dashboard
