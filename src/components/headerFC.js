/**
 * header component FunCtion use hook
 * NO responsive layout support, and
 * NOT in use for useEffect not convenient to listen event
 * 
 * @2019/05/23
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import avatar from '../images/avatar.png'
import styles from '../style/header.module.css'

import { getUser } from '../utils/cache'
import * as minibus from '../utils/minibus'


const ListLink = props => (
  <li className={`nav-menu-item ${props.active?'active':''}`}>
    <Link to={props.to} className={styles.menuLink} >
      {props.children}
    </Link>
  </li>
)
// fixed version of link for N-ormal height @2019/01/29
const NLink = props => (
  <Link to={props.to} style={{textDecoration: `none`, lineHeight: .9}} >
    {props.children}
  </Link>
)

const Header = props => {

  const { siteTitle, siteLogo, menus } = props

  const [name, setName] = useState(null)
  const [path, setPath] = useState(null)

  const pathChangeHandler = pathObj => {
    setPath(pathObj.path)
  }
  
  useEffect(() => {
    let user = getUser()
    if(user) setName(user.userName)
  })

  useEffect(() => {
    // console.log('add listener....', new Date().getTime())
    minibus.addEventListener(minibus.EVT_LOCATION_CHANGE, pathChangeHandler)
    return () => {
      minibus.removeEventListener(minibus.EVT_LOCATION_CHANGE, pathChangeHandler)
    }
  })

  return (
    <div className={styles.headerFixed}>
      <div className={styles.headerBar}>
        {/** left logo */}
        {siteTitle && siteLogo ?
          (<NLink to="/" >
            <img src={siteLogo} alt="Logo" className={styles.siteLogo}/>
          </NLink>):
          (<h1 style={{ margin: 0, display: `block` }}>
            <Link to="/" className={styles.siteTitle+` ultron-txt-color`}>
              {siteTitle}
            </Link>
          </h1>)
        }
        {/** right menu */}
        <div className={styles.rightMenu} >
          <ul style={{ listStyle: `none`, display: `flex`, marginBottom: 0, }}>
            {
              menus &&
              menus.map(
                (m, i) => <ListLink 
                            to={m.url} 
                            key={i} 
                            active={m.url==path}
                            >
                            {m.name}
                          </ListLink>
              )
            }
          </ul>
          <div className={styles.avatarImg}>
            <NLink to="/profile">
              {name?
                <span>
                  {name.substr(0,1).toUpperCase()}
                </span>:
                <img src={avatar} alt="avatar"/>
              }
            </NLink>
          </div>
        </div>
        
      </div>
    </div>
  )

}

export default Header