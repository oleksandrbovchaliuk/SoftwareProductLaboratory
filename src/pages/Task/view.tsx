import React from 'react'

import Button from '@components/Button'

import Layout from '@common/Layout'

import styles from './styles.module.scss'

interface Props {
  isLoading?: boolean
  task: Task | null
  onSubmit: Callback
  children?: React.ReactNode
  goBack?:()=>void
}

const View: React.FC<Props> = ({ isLoading, onSubmit, task, children, goBack }) => (
  <Layout
    showLoader={isLoading}
    className={styles['page']}
    contentClassName={styles['page-content']}
  >
    <h2 className={styles['title']}>{task?.title}</h2>
    <h6 className={styles['description']}>{task?.description}</h6>
    {children} 
    <Button onClick={onSubmit} style={{ marginBottom: 10, backgroundColor: '#28A745', width: '20%', marginLeft: '40%' }}>{'Здати роботу'}</Button>
    <Button onClick={goBack} style={{ backgroundColor: '#DC3545', color: 'white', width: '20%', marginLeft: '40%' }}>{'Повернутись у меню'}</Button>
  </Layout>
)

export default View
