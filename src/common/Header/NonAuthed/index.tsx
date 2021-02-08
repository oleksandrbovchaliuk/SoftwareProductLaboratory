import React from 'react'
import { ReactSVG } from 'react-svg'
import clsx from 'clsx'

import Link from '@components/Link'

import links from '@routes/links'

import Logo from '@assets/logo_wide_white.svg'

import styles from './styles.module.scss'

const NonAuthedHeader: React.FC = () => (
  <header className={clsx('fullwidth', styles['header'])}>
    <Link to={links.login()} title="Home">
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Google_Lens_-_new_logo.png/600px-Google_Lens_-_new_logo.png' className={clsx(styles['logo'])}/>
    </Link>
  </header>
)

export default NonAuthedHeader
