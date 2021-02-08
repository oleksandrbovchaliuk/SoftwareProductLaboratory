import React, { useMemo } from 'react'
import clsx from 'clsx'

import { Link as DomLink, LinkProps as DomLinkProps } from 'react-router-dom'

interface Props extends DomLinkProps {
  disabled?: boolean
}

const Link: React.FC<Props> = ({ disabled, ...props }) => {
  const LinkNode = useMemo<React.FC<DomLinkProps>>(
    () => (disabled ? (props: DomLinkProps) => <span {...props} /> : DomLink),
    [disabled]
  )

  return (
    <LinkNode
      {...props}
      className={clsx(props.className, disabled && 'disabled')}
    />
  )
}

export default Link
