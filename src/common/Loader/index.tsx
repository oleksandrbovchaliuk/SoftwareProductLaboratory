import React from 'react'
import { CircularProgress } from '@material-ui/core'

import Modal from '@components/Modal'

import styles from './styles.module.scss'

interface Props {
  loading?: boolean
}

const Loader: React.FC<Props> = ({ loading = true }) => {
  return (
    <Modal
      open={loading}
      coverScreen={true}
      wrapperClassName={styles['loader-container']}
    >
      <CircularProgress className={styles['loader']} />
    </Modal>
  )
}

export default Loader
