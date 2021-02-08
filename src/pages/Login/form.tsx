import React from 'react'
import { useFormik } from 'formik'

import Input from '@components/Input'
import Button from '@components/Button'

import Values from './values'

import styles from './styles.module.scss'

interface Props {
  onSubmit: (values: Values) => void
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const {
    values: { email, password },
    handleChange,
    handleSubmit,
  } = useFormik<Values>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  })

  return (
    <form onSubmit={handleSubmit} className={styles['default-form']}>
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
      <Button type="submit">{'Логін'}</Button>
      <p className={styles['default-form-label']}>
        Новий користувач? <a href="/signup">Створити акаунт</a>
      </p>
    </form>
  )
}

export default Form
