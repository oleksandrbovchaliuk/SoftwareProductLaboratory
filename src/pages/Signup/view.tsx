import React from 'react'

import Layout from '@common/Layout'

import Values from './values'
import Form from './form'

interface Props {
  onSubmit: (values: Values) => void
  isLoading?: boolean
}

const View: React.FC<Props> = ({ onSubmit, isLoading }) => (
  <Layout showLoader={isLoading}>
    <Form onSubmit={onSubmit} />
  </Layout>
)

export default View
