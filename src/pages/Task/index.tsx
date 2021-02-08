import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'

import { getId, isId } from '@services/id'
import links from '@routes/links'

import tasksActions from '@redux/tasks/actions'
import useBindedActions from '@hooks/useBindedActions'
import SnackbarService from '@services/snackbar'

import View from './view'
import DiagramWrapper from './DiagramWrapper'

interface PageParams {
  id: string
}

type Props = RouteComponentProps<PageParams>

const Task: React.FC<Props> = ({ match: { params }, history: { replace } }) => {
  const id = useMemo(() => getId(params.id), [params.id])

  const { select: selectTask, addSolution } = useBindedActions({
    select: tasksActions.select,
    addSolution: tasksActions.addSolution,
  })

  const task = useSelector<ReduxState, Task | null>(
    (state) => state.tasks.currentTask
  )

  const isLoading = useSelector<ReduxState, boolean>(
    (state) => state.tasks.isLoading
  )

  useEffect(() => {
    if (!isId(id)) {
      replace(links.home())
    }
  }, [replace, id])

  useEffect(() => {
    selectTask(id, undefined, () => replace(links.tasks()))
  }, [id, replace])

  const history = useHistory();

  const goBack = () => {
    history.push('/tasks')
}

  const linkNodes = useRef<NodeLink[]>(null)

  const onSubmit = useCallback(() => {
    if (!!task && !!linkNodes.current) {
      addSolution(linkNodes.current, task.id, ({ mark }) => {
        SnackbarService.success(`Завдання виконано з оцінкою ${mark}`)
        replace(links.tasks())
      })
    }
  }, [addSolution, task, linkNodes])

  const child = useMemo(
    () =>
      task ? (
        <DiagramWrapper nodeDataArray={task.blocks} links={linkNodes} />
      ) : null,
    [task, linkNodes]
  )

  return (
    <View isLoading={isLoading} task={task} onSubmit={onSubmit} goBack={goBack}>
      {child}
    </View>
  )
}

export default Task
