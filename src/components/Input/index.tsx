import React from 'react'
import {
  TextField as MaterialInput,
  TextFieldProps as MaterialInputProps,
  withStyles,
} from '@material-ui/core'

import styles from './styles.module.scss'

type Props = MaterialInputProps

const StyledMaterialInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#05386b',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#05386b',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#05386b',
      },
      '&:hover fieldset': {
        borderColor: '#05386b',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#05386b',
      },
    },
  },
})(MaterialInput)

const Input: React.FC<Props> = (props) => {
  return <StyledMaterialInput {...props} className={styles['material-input']} />
}

export default Input
