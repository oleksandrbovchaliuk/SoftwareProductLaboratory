import React from 'react'
import { useFormik } from 'formik'

import Input from '@components/Input'
import Button from '@components/Button'

import { UserType } from '@typings/enums/User'

import Values from './values'

import styles from './styles.module.scss'

interface Props {
  onSubmit: (values: Values) => void
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const {
    values: { firstName, lastName, email, password },
    handleChange,
    handleSubmit,
  } = useFormik<Values>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: '',
      type: UserType.student,
    },
    onSubmit,
  })

  return (
    <form onSubmit={handleSubmit} className={styles['default-form']}>
      <Input
        name="firstName"
        value={firstName}
        onChange={handleChange}
        label="Ім'я"
      />
      <Input
        name="lastName"
        value={lastName}
        onChange={handleChange}
        label="Прізвище"
      />
      <Input
        name="email"
        value={email}
        onChange={handleChange}
        type="email"
        label="Пошта"
      />
      <Input
        name="password"
        value={password}
        onChange={handleChange}
        type="password"
        label="Пароль"
      />
      <Button type="submit">{'Зареєструватись'}</Button>
      <p className={styles['default-form-label']}>
        Маєте акаунт? <a href="/login">Логін</a>
      </p>
    </form>
  )
}

export default Form
