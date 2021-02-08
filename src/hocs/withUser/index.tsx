import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ConnectedProps, connect } from 'react-redux'
import { compose } from 'redux'

export type WithUserUpdate = <Params = {}>(
  user: User | null,
  route: RouteComponentProps<Params>
) => void

const withUser = (update?: WithUserUpdate) => <
  Props extends RouteComponentProps = RouteComponentProps
>(
  Component: React.ComponentType<Props>
): React.FC<Props> => {
  const mapStateToProps = (state: ReduxState) => ({ user: state.user.user })

  const connector = connect(mapStateToProps)

  type WrappedProps = Props & ConnectedProps<typeof connector>

  const WithUser: React.FC<WrappedProps> = (props: WrappedProps) => {
    useEffect(() => {
      update?.(props.user, { ...props })
    }, [
      props.user,
      props.history,
      props.location,
      props.match,
      props.staticContext,
    ])
    return <Component {...props} />
  }

  const Wrapper = compose<React.FC<Props>>(connector)(WithUser)

  return Wrapper
}

export default withUser
