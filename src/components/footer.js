import React from 'react'
import { Link } from 'gatsby'
import github from '../images/github56.png'
import twitter from '../images/twitter56.png'

const Footer = () => (
  <footer
    style={{
      margin: `4em auto`,
      textAlign: `center`
    }}>
    <span>
      © {new Date().getFullYear()}, Present by{` `}<a href="https://runbytech.co">Runbytech</a>
    </span>
    <div 
      style={{
        marginTop: `25px`,
      }}>
      <Link to="/" style={{margin:`10px`}}>
        <img src={github} style={{width:`32px`, height:`32px`}}/>
      </Link>
      <Link to="/" style={{margin:`10px`}}>
        <img src={twitter} style={{width:`32px`, height:`32px`}}/>
      </Link>
    </div>
  </footer>
)

export default Footer