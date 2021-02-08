enum UserType {
  student = 'student',
  admin = 'admin',
}

const UserTypeLabel = {
  [UserType.admin]: 'Admin',
  [UserType.student]: 'Student',
}

export { UserType, UserTypeLabel }
