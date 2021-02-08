import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { LinkProps } from 'react-router-dom'

import userActions from '@redux/user/actions'
import useBindedAction from '@hooks/useBindedAction'

import AuthedHeader from './Authed'
import NonAuthedHeader from './NonAuthed'

interface Props {
  links?: LinkProps[]
}

const Header: React.FC<Props> = ({ links }) => {
  const logout = useBindedAction(userActions.logout)
  const user = useSelector<ReduxState, User | null>((state) => state.user.user)

  const headerNode = useMemo(
    () =>
      user ? (
        <AuthedHeader links={links} user={user} logout={logout} />
      ) : (
        <NonAuthedHeader />
      ),
    [user, logout]
  )

  return headerNode
}

export default Header
