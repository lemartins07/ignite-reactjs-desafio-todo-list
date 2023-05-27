import './global.css'
import { CreateButton } from './components/CreateButton'
import { Tasks } from './components/Tasks'
import { TasksType } from './types/tasks'

import Logo from './assets/rocket.svg'

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import styles from './App.module.css'

function App() {
  const [tasks, setTasks] = useState<TasksType[]>([])
  const [inputTask, setInputTask] = useState('')
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const [tasksCreated, setTasksCreated] = useState(0)

  const updateCounters = useCallback(() => {
    setTasksCreated(tasks.length)
    let tasCompletedCouter = 0

    tasks.forEach((task) => {
      if (task.status) {
        tasCompletedCouter++
        setTasksCompleted(tasCompletedCouter)
      } else {
        setTasksCompleted(tasCompletedCouter)
      }
    })
  }, [tasks])

  useEffect(() => {
    updateCounters()
  }, [updateCounters])

  function addNewTask(event: FormEvent) {
    event.preventDefault()
    if (inputTask !== '') {
      const newTask: TasksType = {
        id: tasks.length + 1,
        text: inputTask,
        status: false,
      }
      setTasks([...tasks, newTask])
      setInputTask('')
      setTasksCreated(() => tasksCreated + 1)
    }
  }

  function hanldeInputTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setInputTask(event.target.value)
  }

  function deleteTasks(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    updateCounters()
  }

  function statusChange(id: number) {
    const task = tasks.find((task) => id === task.id)

    if (task) {
      const newtask = {
        ...task,
        status: !task?.status,
      }

      const tasksWithOutThisId = tasks.filter((task) => task.id !== id)

      function sortIds(a: TasksType, b: TasksType) {
        return a.id - b.id
      }

      setTasks([...tasksWithOutThisId, newtask].sort(sortIds))
      updateCounters()
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <img src={Logo} className={styles.logoImg} alt="Logo" />
          <span className={styles.logoTextBlue}>to</span>
          <span className={styles.logoTextPurple}>do</span>
        </div>
      </header>
      <main>
        <div className="container">
          <form className={styles.tasksForm} onSubmit={addNewTask}>
            <input
              className={styles.tasksInput}
              name="task"
              placeholder="Adicione uma nova tarefa"
              onChange={hanldeInputTaskChange}
              value={inputTask}
            />
            <CreateButton />
          </form>
          <Tasks
            tasks={tasks}
            deleteTasks={deleteTasks}
            statusChange={statusChange}
            tasksCompleted={tasksCompleted}
            tasksCreated={tasksCreated}
          />
        </div>
      </main>
    </>
  )
}

export default App
