import { createContext } from 'react'

import { ShowSnackbar } from './snackbar'

import { noact } from '@services/utils'

const SnackbarContext = createContext<ShowSnackbar>(noact)

export default SnackbarContext
