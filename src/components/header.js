import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import avatar from '../images/avatar.png'
import styles from '../style/header.module.css'


const ListLink = props => (
  <li className={styles.menuItem}>
    <Link to={props.to} style={{textDecoration: `none`, lineHeight: .9 }} >
      {props.children}
    </Link>
  </li>
)
// fixed version of link for N-ormal height @2019/01/29
const NLink = props => (
  <Link to={props.to} style={{lineHeight: .9}} >
    {props.children}
  </Link>
)

const Header = ({ siteTitle, siteLogo }) => (
  <div className={styles.headerFixed}>
    <div className={styles.headerBar}>
      {/** left logo */}
      {siteTitle && siteLogo ?
        (<NLink to="/" >
          <img src={siteLogo} alt="Logo" className={styles.siteLogo}/>
        </NLink>):
        (<h1 style={{ margin: 0, display: `block` }}>
          <Link to="/" className={styles.siteTitle}>
            {siteTitle}
          </Link>
        </h1>)
      }
      {/** right menu */}
      <div className={styles.rightMenu} >
        <ul style={{ listStyle: `none`, display: `block`, marginBottom: 0, }}>
          <ListLink to="/pandas/">Use Guide</ListLink>
          <ListLink to="/roadmap/">Roadmap</ListLink>
          <ListLink to="/users/">Widgets Store</ListLink>
          <ListLink to="/about/">About</ListLink>
        </ul>
        <div className={styles.avatarImg}>
          <NLink to="/profile">
            <img src={avatar} alt="avatar"/>
          </NLink>
        </div>
      </div>
      
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
