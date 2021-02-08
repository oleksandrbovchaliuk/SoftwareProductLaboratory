import React, { useMemo } from 'react'

import Link from '@components/Link'

import styles from './styles.module.scss'

interface Props {
  task: Task
  canRedirect?: boolean
  mark?: number
}

const TaskCard: React.FC<Props> = ({ task, canRedirect = false, mark }) => {
  
  console.log(task);
  
  
  const bottomNode = useMemo(
    () =>
      canRedirect ? task.title.indexOf('Тема') != -1 ? null : (
        <Link to={`tasks/${task.id}`} className={styles['task-card-btn-link']}>
          {'Виконати'}
        </Link>
      ) : mark !== undefined ? (
        <p className={styles['mark']}>{`Ваша оцінка: ${mark}`}</p>
      ) : null,
    [mark]
  )
  return (
    <div className={styles['task-card-wrapper']}>
      <div className={styles['task-card-body']}>
        <p className={styles['task-card-title']}>{task.title}</p>
        <p className={styles['task-card-desc']}>{task.description}</p>
      </div>
      <div className={styles['bottom']}>{bottomNode}</div>
    </div>
  )
}

export default TaskCard
