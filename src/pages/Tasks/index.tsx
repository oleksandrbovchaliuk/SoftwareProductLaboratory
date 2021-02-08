import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import useBindedActions from '@hooks/useBindedActions'
import tasksActions from '@redux/tasks/actions'

import View from './view'

type Props = RouteComponentProps

const Tasks: React.FC<Props> = () => {
  const { loadTasks, loadTaskResults, selectTask } = useBindedActions({
    loadTasks: tasksActions.load,
    loadTaskResults: tasksActions.loadResults,
    selectTask: tasksActions.select,
  })

  const isLoading = useSelector<ReduxState, boolean>(
    (state) => state.tasks.isLoading
  )
  const user = useSelector<ReduxState, User | null>((state) => state.user.user)

  const tasks = useSelector<ReduxState, Task[]>((state) => state.tasks.tasks)
  const taskResults = useSelector<ReduxState, TaskResult[]>(
    (state) => state.tasks.results
  )

  useEffect(() => {
    loadTasks()
    loadTaskResults()
    selectTask()
  }, [])

  return (
    <View
      isLoading={isLoading}
      tasks={tasks}
      user={user}
      taskResults={taskResults}
    />
  )
}

export default Tasks
