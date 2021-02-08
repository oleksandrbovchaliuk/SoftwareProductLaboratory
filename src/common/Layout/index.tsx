import React, { useMemo } from 'react'
import clsx from 'clsx'

import Header from '@common/Header'
import Loader from '@common/Loader'

interface Props {
  children?: React.ReactNode
  header?: React.ReactNode
  noHeader?: boolean
  loader?: React.ReactNode
  showLoader?: boolean
  className?: string
  contentClassName?: string
}

const Layout: React.FC<Props> = ({
  children,
  header,
  noHeader = false,
  loader,
  showLoader = false,
  className,
  contentClassName,
}) => {
  const headerNode = useMemo(() => (noHeader ? null : header || <Header />), [
    header,
    noHeader,
  ])

  const loaderNode = useMemo(() => (showLoader ? loader || <Loader /> : null), [
    loader,
    showLoader,
  ])

  return (
    <div className={clsx('page', className)}>
      {headerNode}
      <div className={clsx('page-content', contentClassName)}>{children}</div>
      {loaderNode}
    </div>
  )
}

export default Layout
