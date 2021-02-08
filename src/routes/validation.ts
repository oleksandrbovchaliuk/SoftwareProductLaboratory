import withUser, { WithUserUpdate } from '@hocs/withUser'

import links from '@routes/links'

import { UserType } from '@typings/enums/User'

const authedUpdate: WithUserUpdate = (user, { history }) => {
  if (!user) {
    history.replace(links.login())
  }
}

const notAuthedUpdate: WithUserUpdate = (user, { history }) => {
  if (user) {
    history.replace(links.home())
  }
}

const isStudentUpdate: WithUserUpdate = (user, { history }) => {
  if (!user) {
    history.replace(links.login())
  } else if (user.type !== UserType.student) {
    history.replace(links.home())
  }
}

const isAdminUpdate: WithUserUpdate = (user, { history }) => {
  if (!user) {
    history.replace(links.login())
  } else if (user.type !== UserType.admin) {
    history.replace(links.home())
  }
}

export const authed = withUser(authedUpdate)

export const notAuthed = withUser(notAuthedUpdate)

export const isStudent = withUser(isStudentUpdate)

export const isAdmin = withUser(isAdminUpdate)

export default {
  authed,
  notAuthed,
  isStudent,
  isAdmin,
}
