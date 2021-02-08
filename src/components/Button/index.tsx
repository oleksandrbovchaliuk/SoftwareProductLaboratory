import React from 'react'
import clsx from 'clsx'
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
} from '@material-ui/core'

import styles from './styles.module.scss'

type Props = MaterialButtonProps

const Button: React.FC<Props> = (props) => {
  return (
    <MaterialButton
      {...props}
      className={clsx(styles['material-button'], props.className)}
    />
  )
}

export default Button
