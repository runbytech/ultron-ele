/**
 * @2019/02/21
 */
import React from 'react';

import look from '../style/blurBanr.module.css'

export default class BlurBannerImage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {load: false}
    this.drawImg = this.drawImg.bind(this)
  }

  drawImg() {
    // this check is a MUST! or cause multiple render @2019/02/04
    if(this.state.load) return

    const ctx = this.canvas.getContext('2d')
    
    ctx.drawImage(this.img, 0, 0, 600, 100, 0, 0, 1200, 200)
  }

  componentDidMount() {
    const {src} = this.props

    this.img = new Image()
    this.img.src = src
    if (this.img.complete) this.drawImg()
    else this.img.onload = this.drawImg
  }

  render() {
    const { children}  = this.props
  
    return (
      <div className={look.topImgBanner} >
        <canvas className={look.bannerCanvas}
          ref={canvas => this.canvas = canvas}/>
        <div className={look.childrenLayer}>
          {children}
        </div>
      </div>
    )
  }
}