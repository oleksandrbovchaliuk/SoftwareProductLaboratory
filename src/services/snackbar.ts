import { SnackbarVariant } from '@components/Snackbar'
import { ShowSnackbar } from '@hocs/withSnackbar/snackbar'

import { noact } from './utils'

class SnackbarService {
  static showSnackbar: ShowSnackbar = noact

  static info = (message: string) =>
    SnackbarService.showSnackbar({ message, variant: SnackbarVariant.info })
  static error = (message: string) =>
    SnackbarService.showSnackbar({ message, variant: SnackbarVariant.error })
  static warning = (message: string) =>
    SnackbarService.showSnackbar({ message, variant: SnackbarVariant.warning })
  static success = (message: string) =>
    SnackbarService.showSnackbar({ message, variant: SnackbarVariant.success })
}

export default SnackbarService
