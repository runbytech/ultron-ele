/**
 * Button component with custom style
 * @2019/02/12
 * 
 * Usage:
 * styles = {background="#127CC9", borderRadius="18px", padding="8px 24px"}
 * 
 */
import React from 'react'

import { Link } from 'gatsby'
// default style
import look from '../style/button.module.css'
import theme from '../style/theme.module.css'


export default ({to, styles, children, onClick}) => {
  if(to){
    return   (<Link to={to} className={look.link}>
              {children && 
                <span 
                  className={look.bigBtn+` ${theme.ultronBGColor}`} 
                  style={styles}>
                  {children}
                </span>
              }
             </Link>)
  }else{
    return (<button type="button" onClick={onClick} 
              className={look.btn+` ${theme.ultronBGColor}`} style={styles}>
              {children}
            </button>)
  }
}