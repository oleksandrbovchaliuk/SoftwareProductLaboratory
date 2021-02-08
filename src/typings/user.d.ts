type UserType = import('./enums/User').UserType

interface UserModel {
  id: ID
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string
  type: UserType
}

type User = Omit<UserModel, 'password'>
type UserSignup = Omit<UserModel, 'id'>
