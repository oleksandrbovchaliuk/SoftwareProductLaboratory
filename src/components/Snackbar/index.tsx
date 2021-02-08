import React, { useCallback } from 'react'
import MaterialSnackbar, {
  SnackbarCloseReason,
} from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import clsx from 'clsx'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import SnackbarVariant from './variant'
import SnackbarIcon from './icon'

import styles from './styles.module.scss'

interface Props {
  open?: boolean
  onClose?: (
    event: React.SyntheticEvent<unknown, Event>,
    reason: SnackbarCloseReason
  ) => void
  message?: string
  variant?: SnackbarVariant
  className?: string
}

const Snackbar: React.FC<Props> = ({
  open = false,
  onClose,
  message,
  className,
  variant = SnackbarVariant.info,
  ...props
}) => {
  const Icon = SnackbarIcon[variant]

  const onCloseClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      onClose?.(event, 'timeout'),
    []
  )

  return (
    <MaterialSnackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={onClose}
      className={styles['snackbar']}
    >
      <SnackbarContent
        className={clsx(styles['variant'], styles[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={styles['message']}>
            <Icon className={clsx(styles['icon'], styles['icon-variant'])} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={styles['close']}
            onClick={onCloseClick}
          >
            <CloseIcon className={styles['icon']} />
          </IconButton>,
        ]}
        {...props}
      />
    </MaterialSnackbar>
  )
}

export { default as SnackbarIcon } from './icon'
export { default as SnackbarVariant } from './variant'

export default Snackbar
