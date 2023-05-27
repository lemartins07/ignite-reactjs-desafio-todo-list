import Clipboard from '../assets/clipboard.png'

import styles from './Tasks.module.css'
import { TasksType } from '../types/tasks'
import { Taskitem } from './TaskItem'

interface TasksProps {
  tasks: TasksType[]
}

type TasksAux = {
  deleteTasks: (id: number) => void
  statusChange: (id: number) => void
  tasksCompleted: number
  tasksCreated: number
}

export function Tasks({
  tasks,
  deleteTasks,
  statusChange,
  tasksCompleted,
  tasksCreated,
}: TasksProps & TasksAux) {
  const isTasksNotEmpty = tasks.length !== 0
  const tasksCompletedFormated =
    tasksCompleted !== 0 ? `${tasksCompleted} de ${tasksCreated}` : 0
  return (
    <div className={styles.tasksContainer}>
      <div className={styles.tasksHeader}>
        <span className={styles.tasksCreated}>
          <strong>Tarefas criadas</strong>
          <span className={styles.tasksCounter}>{tasksCreated}</span>
        </span>
        <span className={styles.tasksCompleted}>
          <strong>Tarefas concluídas</strong>
          <span className={styles.tasksCounter}>{tasksCompletedFormated}</span>
        </span>
      </div>

      <div className={styles.tasksData}>
        {isTasksNotEmpty ? (
          <ul className={styles.tasksList}>
            {tasks.map((task) => (
              <Taskitem
                key={task.id}
                task={task}
                deleteTasks={deleteTasks}
                statusChange={statusChange}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.tasksNoData}>
            <img src={Clipboard} alt="Clipboard" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </div>
    </div>
  )
}
