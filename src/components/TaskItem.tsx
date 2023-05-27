import styles from './TaskItem.module.css'
import { Checkbox } from './Checkbox'
import { Trash } from 'phosphor-react'
import { TasksType } from '../types/tasks'

type TaskItemProps = {
  task: TasksType
}

type TasksFunctions = {
  deleteTasks: (id: number) => void
  statusChange: (id: number) => void
}

export function Taskitem({
  task,
  deleteTasks,
  statusChange,
}: TaskItemProps & TasksFunctions) {
  const tasksContentClasses = task.status
    ? `${styles.tasksItemContent} ${styles.completed}`
    : styles.tasksItemContent

  function handleIsCompleted(id: number) {
    statusChange(id)
  }

  function handleDelete(id: number) {
    deleteTasks(id)
  }

  return (
    <li key={task.id} className={styles.tasksItem}>
      <Checkbox handleIsCompleted={handleIsCompleted} id={task.id} />
      <p className={tasksContentClasses}>{task.text}</p>
      <button className="deleteButton" onClick={() => handleDelete(task.id)}>
        <Trash />
      </button>
    </li>
  )
}
