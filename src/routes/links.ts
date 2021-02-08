import paths from '@routes/paths'

export const hash = (hash = '') => `#${hash}`

export const home = () => paths.home
export const login = () => paths.login
export const signup = () => paths.signup

export const tasks = () => paths.tasks
export const task = (id: ID) => paths.task.replace(':id', String(id))

const links = {
  hash,

  home,
  login,
  signup,

  tasks,
  task,
}

export default links
