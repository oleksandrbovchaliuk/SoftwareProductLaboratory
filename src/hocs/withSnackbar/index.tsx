/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react'
import { SnackbarCloseReason } from '@material-ui/core'

import Snackbar from '@components/Snackbar'

import SnackbarContext from './context'
import { ShowSnackbar, SnackbarData } from './snackbar'

import SnackbarService from '@services/snackbar'
import { noact } from '@services/utils'

const withSnackbar = <Props extends object = object>(
  Component: React.ComponentType<Props>
): React.FC<Props> => (props) => {
  const [snackbarData, setSnackbarData] = useState<SnackbarData | undefined>()
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(
    (
      event: React.SyntheticEvent<unknown, Event>,
      reason: SnackbarCloseReason
    ) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    },
    []
  )

  const showSnackbar: ShowSnackbar = useCallback((snackbarData) => {
    if (snackbarData.message) {
      setSnackbarData(snackbarData)
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    SnackbarService.showSnackbar = showSnackbar
    return () => {
      SnackbarService.showSnackbar = noact
    }
  }, [showSnackbar])

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      <Component {...props} showSnackbar={showSnackbar} />
      <Snackbar
        open={open}
        onClose={handleClose}
        variant={snackbarData?.variant}
        message={snackbarData?.message}
      />
    </SnackbarContext.Provider>
  )
}

export { default as SnackbarContext } from './context'

export default withSnackbar
