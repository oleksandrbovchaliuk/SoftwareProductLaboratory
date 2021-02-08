import React, { useMemo } from 'react'
import { LinkProps } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import clsx from 'clsx' 
import Link from '@components/Link'

import links from '@routes/links'
import defaultLinks from './links'
import { UserType, UserTypeLabel } from '@typings/enums/User'

import Logo from '@assets/logo_wide.svg'
import Avatar from '@assets/default-avatar.png'

import styles from './styles.module.scss'

interface Props {
  links?: LinkProps[]
  user: User
  logout: () => void
}

const AuthedHeader: React.FC<Props> = ({
  links: headerLinks = defaultLinks,
  user,
  logout,
}) => {
  const { firstName, lastName, type } = user
  const avatar = user.avatar || Avatar

  const userRole = UserTypeLabel[type] || UserTypeLabel[UserType.student]
  const siteLinks = useMemo(
    () =>
      headerLinks.map(({ className, children, ...link }, index) => {
        const pathName = `/${window.location.pathname.split('/')[1]}` || '/'
        return (
          <li key={`${link.to}-${index}`} className={styles['link-item']}>
            <Link
              {...link}
              className={clsx(
                'link',
                className,
                styles['link'],
                link.to &&
                  typeof link.to === 'string' &&
                  link.to.startsWith(pathName) &&
                  styles['active-link']
              )}
            >
              {children}
            </Link>
          </li>
        )
      }),
    [window.location.pathname, headerLinks]
  )

  return (
    <header className={clsx('fullwidth', styles['header'])}>
      <div className={styles['left']}>
        <div className={styles['logo-container']}>
          <Link to={links.home()} title="Home" className={styles['logo-link']}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Google_Lens_-_new_logo.png/600px-Google_Lens_-_new_logo.png' className={clsx(styles['logo'])}/>
          </Link>
        </div>
      </div>
      <ul className={styles['links-container']}>{siteLinks}</ul>
      <div className={styles['user-container']}>
        <div className={styles['user']}>
          <div className={styles['user-info']}>
            <p className={styles['user-name']}>{`${firstName} ${lastName}`}</p>
            <p className={styles['user-role']}>{userRole}</p>
          </div>
          <button className={styles['avatar-button']}>
            <img src={avatar} className={styles['avatar']} />
          </button>
          <button onClick={() => logout()} className={styles['logout-button']}>
            Вийти
          </button>
        </div>
      </div>
    </header>
  )
}

export default AuthedHeader
