import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import avatar from '../images/avatar.png'
import styles from '../style/header.module.css'

const ListLink = props => (
  <li style={{ display: `inline-block`, margin: `1em 1em`}}>
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
  <div
    className="header"
    style={{
      background: `#FFF`,
      marginBottom: `1.45rem`,
      borderBottom: `1px solid #CCC`,
      position: `fixed`,
      zIndex: 3000,
      width: `100%`,
    }}
  >
    <div
      style={{
        minHeight: `60px`,
        margin: `0 auto`,
        padding: `0 10px`,
        display: `flex`,
        justifyContent: `space-between`
      }}
    >
    {siteTitle && siteLogo ?
      (<NLink to="/" >
        <img src={siteLogo} alt="Logo" style={{width:200, height:60, marginBottom:0}}/>
      </NLink>):
      (<h1 style={{ margin: 0, display: `block` }}>
        <Link
          to="/"
          style={{
            color: `#47BA47`,
            textDecoration: `none`,
            display: `block`,
            margin: `.2em 0`
          }}>{siteTitle}
        </Link>
      </h1>)
    }
      
      <div className={styles.rightMenu} >
        <ul style={{ listStyle: `none`, display: `block`, marginBottom: 0, }}>
          <ListLink to="/pandas/">Pandas</ListLink>
          <ListLink to="/users/">Users</ListLink>
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
