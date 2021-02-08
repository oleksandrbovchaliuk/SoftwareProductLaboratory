import React, { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

import useRoot from '@hooks/useRoot'
import usePrevious from '@hooks/usePrevious'

import styles from './styles.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode
  open?: boolean
  onRequestClose?: (ev: MouseEvent) => void
  coverScreen?: boolean
  wrapperClassName?: string
}

const modalRoot = document.getElementById('modal-root')

const Modal: React.FC<Props> = ({
  children,
  open,
  onRequestClose,
  coverScreen = true,
  wrapperClassName,
  className,
  ...props
}) => {
  const element = useRoot(modalRoot, 'div')

  const prevWrapperClassName = usePrevious(wrapperClassName)

  useEffect(() => {
    if (!element.classList.contains(styles['modal-container'])) {
      element.classList.add(styles['modal-container'])
    }
    const toRemove = prevWrapperClassName?.split(' ')
    if (toRemove) {
      element.classList.remove(...toRemove)
    }
    const toAdd = wrapperClassName?.split(' ')
    if (toAdd) {
      element.classList.add(...toAdd)
    }
  }, [element, wrapperClassName])

  useEffect(() => {
    if (open) {
      element.classList.remove(styles['modal-container-close'])
      element.classList.add(styles['modal-container-open'])
    } else {
      element.classList.remove(styles['modal-container-open'])
      element.classList.add(styles['modal-container-close'])
    }
  }, [open])

  useEffect(() => {
    if (coverScreen) {
      element.classList.add(styles['modal-container-cover-screen'])
    } else {
      element.classList.remove(styles['modal-container-cover-screen'])
    }
  }, [coverScreen])

  useEffect(() => {
    if (onRequestClose) {
      const click = (ev: MouseEvent) => {
        if (ev.target === element) {
          onRequestClose(ev)
        }
      }
      element.addEventListener('click', click)
      return () => element.removeEventListener('click', click)
    }
  }, [element, onRequestClose])

  const child = useMemo(
    () => (
      <div {...props} className={clsx(styles['modal'], className)}>
        {children}
      </div>
    ),
    [children, className, props]
  )

  return createPortal(child, element)
}

export default Modal
