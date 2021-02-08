import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import useBindedAction from '@hooks/useBindedAction'
import userActions from '@redux/user/actions'

import View from './view'
import Values from './values'

type Props = RouteComponentProps

const Signup: React.FC<Props> = () => {
  const signup = useBindedAction(userActions.signup)
  const isLoading = useSelector<ReduxState, boolean>(
    (state) => state.user.isLoading
  )

  const onSubmit = useCallback(({ ...newUser }: Values) => signup(newUser), [
    signup,
  ])

  return <View onSubmit={onSubmit} isLoading={isLoading} />
}

export default Signup
