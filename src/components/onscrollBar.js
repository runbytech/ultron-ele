/**
 * add horizontal progress bar to indicate the read progress
 * Using lifecycle method in component
 * 
 * twitter: @lwz75121
 * @2019/06/21
 */
import React from 'react';

export default class OnscrollBar extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       percent: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollToElement)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollToElement)
  }

  handleScrollToElement = event => {
    let windowHt = window.innerHeight
    let scrollTop = document.documentElement.scrollTop
    let totalHeight = document.body.scrollHeight
    this.setState({percent: 100*scrollTop/(totalHeight-windowHt)})
  }
  
  render() {

    const { top, background, className } = this.props

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
      width: `${this.state.percent}%`,
      background: background?background:'#0957FF',
      height: '3px',
    }

    return (
      <div style={barWrappperStyle}>
        {className?
          <div className={className} style={{width:this.state.percent+'%'}}/>:
          <div style={progressBarStyle}/>
        }
      </div>
    )
  }

}
