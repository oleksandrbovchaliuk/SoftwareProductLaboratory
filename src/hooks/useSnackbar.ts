import { useContext } from 'react'
import { ShowSnackbar } from '@hocs/withSnackbar/snackbar'
import { SnackbarContext } from '@hocs/withSnackbar'

const useSnackbar = (): ShowSnackbar => {
  const showSnackbar = useContext(SnackbarContext)
  return showSnackbar
}

export default useSnackbar
