import { authed, isStudent, notAuthed } from './validation'

import Home from '@pages/Home'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import NotFound from '@pages/NotFound'
import Tasks from '@pages/Tasks'
import Task from '@pages/Task'

const pages = {
  Home: authed(Home),
  Login: notAuthed(Login),
  Signup: notAuthed(Signup),

  Tasks: authed(Tasks),
  Task: isStudent(Task),

  NotFound,
}

export default pages
