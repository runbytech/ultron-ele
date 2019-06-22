/**
 * Add horizontal progress bar to indicate the read progress
 * Using hook in function component
 * 
 * twitter: @lwz75121
 * @2019/06/21
 */
import React, { useState, useEffect } from 'react'


const OnscrollBar = ({ top, background, className }) => {

  const [percent, setPercent] = useState(0)

  const barWrappperStyle = {
    position: 'fixed',
    top: top?top:'100px',
    left: 0,
    right: 0,
    height: '5px',
    zIndex: 1000,
  }

  const progressBarStyle = {
    maxWidth: '100%',
    width: `${percent}%`,
    background: background?background:'#0957FF',
    height: '3px',
  }

  const handleScrollToElement = event => {
    let windowHt = window.innerHeight
    let scrollTop = document.documentElement.scrollTop
    let totalHeight = document.body.scrollHeight
    setPercent(100*scrollTop/(totalHeight-windowHt))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollToElement)
    return () => {
      window.removeEventListener('scroll', handleScrollToElement)
    }
  })

  return (
    <div style={barWrappperStyle}>
      {className?
        <div className={className} style={{width:percent+'%'}}/>:
        <div style={progressBarStyle}/>
      }
    </div>
  )

}

export default OnscrollBar