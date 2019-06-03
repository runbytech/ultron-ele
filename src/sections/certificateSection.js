/**
 * certificate section
 * 
 * @2019/03/02
 */

import React from 'react';
import Konva from 'konva'
import { getUser, getUserQuizs } from '../utils/cache'
import styles from '../style/profile.module.css'


export default class CertificateSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      userFullName: '',
      certs: [0]
    }
    this.stage = null
    this.saveCertificate   = this.saveCertificate.bind(this)
    this.switchCertificate = this.switchCertificate.bind(this)
    this.drawAllText       = this.drawAllText.bind(this)
  }

  componentWillMount() {
    const { signiture } = this.props
    // console.log('signiture:', signiture)
    let user = getUser()
    if(!user) return //FIXME: null check in build mode @2019/04/24

    let userFullName = user.fullName?user.fullName:'User Unknown'
    this.setState({userFullName})

    const quizs = getUserQuizs(user.userName)
    if(!quizs || (quizs && !quizs.length)) return
    this.setState({certs: quizs})
  }

  /**
   * TRICKY: create custom font context for canvas
   * @param {*} fontName, Permanent Marker|Bitter Bold|Pinyon Script
   * @2019/03/09
   */ 
  resetCanvasTextFont(fontName) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.font = 'normal 20px '+fontName;
    ctx.measureText('Some test text;');
  }

  /**
   * Konva drawing start here is a must!
   * @2019/03/11
   */
  componentDidMount() {
    const stageW = 640
    const stageH = 450
    this.stage = new Konva.Stage({
      container: 'certiCntnr',
      width: stageW,
      height: stageH
    })
    // certificat template image
    const imageObj = new Image()
    // load template image file...
    const imageLayer = new Konva.Layer()
    const textLayer = new Konva.Layer()
    imageObj.onload = function(e) {
      let certiImage = new Konva.Image({
        x: 0, y: 0,
        image: imageObj,
        width: stageW, height: stageH
      })
      imageLayer.add(certiImage)
      imageLayer.draw()
    }
    imageObj.src = '/img/certemplateA_from_dreamstime.com_s.png'
    this.stage.add(imageLayer)
    this.stage.add(textLayer)
    // start to redraw cert texts....
    const firstCt = this.state.certs[0]
    if(!firstCt) return console.log('no certificate yet...');
    
    // console.log(firstCt)
    this.drawAllText(
      textLayer, 
      firstCt.title, 
      firstCt.level, 
      new Date(firstCt.completion)
    )
    // save the layer for later use
    this.textLayer = textLayer
  }


  drawAllText(textLayer, courseName, achievement, dateObj) {
    textLayer.destroyChildren()// clear first

    const textpath = new Konva.TextPath({
      x: 0,
      y: 0,
      fill: '#7D9EC0',
      fontSize: 14,
      fontFamily: 'Arial',
      text: 'ULTRONELE',
      data: 'M280 40 C 290 22, 340 22, 360 40'
    })
    const userName = this.state.userFullName
    const userTxt = new Konva.Text({
      x: 280, y: 196,
      fontFamily: 'Bitter Bold',
      fontSize: 24,
      fontStyle: 'bold',
      text: userName,
      fill: 'black',
    })
    const { signiture } = this.props
    const sigitureTxt = new Konva.Text({
      x: 446, y: 356,
      fontFamily: 'Permanent Marker',
      fontSize: 20,
      fontStyle: 'bold',
      text: signiture?signiture:'Unknown',
      fill: 'black',
    })
    const dateStr = dateObj?dateObj.toLocaleDateString():'-/-/-'
    const dateTxt = new Konva.Text({
      x: 140, y: 364,
      fontFamily: 'Bitter Bold',
      fontSize: 14,
      text: dateStr,
      fill: '#333',
    })
    // const courseName = 'Business Essence'
    const courseTxt = new Konva.Text({
      x: 320, y: 264,
      fontFamily: 'Bitter Bold',
      fontSize: courseName.length>40?16:22,
      text: courseName?courseName:'NO COURSE COMPLETED',
      fill: 'black',
    })
    courseTxt.offsetX(courseTxt.width() / 2)
    
    const achievemTxt = new Konva.TextPath({
      x: 10, y: 306,
      fill: '#EEE',
      fontSize: 14,
      fontStyle: 'bold',
      fontFamily: 'Arial',
      text: achievement,
      // text: 'qualified',
      data: 'M288 44 C 284 72, 342 72, 340 30'
    })

    const qore = new Konva.Text({
      x: 310, y: 324,
      fontFamily: 'Bitter Bold',
      fontSize: 30,
      text: achievement?achievement[0]:'-',
      fill: 'white',
    })
    textLayer.add(qore)
    textLayer.add(achievemTxt)
    textLayer.add(courseTxt)
    textLayer.add(dateTxt)
    textLayer.add(sigitureTxt)
    textLayer.add(textpath)
    textLayer.add(userTxt)
    textLayer.draw()

    setTimeout(()=>{
      const cmplStr = "Has successfully completed the training course of"
      const completionTxt = new Konva.Text({
        x: 180, y: 230,
        fontFamily: 'Pinyon Script',
        fontSize: 16,
        text: cmplStr,
        fill: '#333',
      })
      textLayer.add(completionTxt)
      textLayer.draw()
    }, 100)
    this.resetCanvasTextFont('Pinyon Script')
  }
  
  saveCertificate() {
    let dataURL = this.stage.toDataURL({ pixelRatio: 2 });
    require("downloadjs")(dataURL, "certificate.png", "image/png");
  }

  switchCertificate(slug) {
    let target = null
    this.state.certs.map(c => {
      if(c.slug === slug) target = c
      return
    })
    // console.log('to switch certificate by:', target)
    if(!target) return this.drawAllText(this.textLayer)
  
    this.drawAllText(
      this.textLayer,
      target.title,
      target.level, 
      target.completion?new Date(target.completion):undefined
    )
  }

  render() {
    return (
      <>
        <h3 className={styles.secTitle}>Certificates</h3>
        <hr/>
        <div className={styles.certiSectRow}>
          <div className={styles.certiCtnr}>
            <div id="certiCntnr" className={styles.certCanvas}></div>
            <button className={styles.blueBtn}
              onClick={this.saveCertificate}>Save</button>
          </div>
          <div className={`${styles.certiThumnails} visible`}>
            {this.state.certs.map((c,i) => 
              <div key={i} onClick={()=>this.switchCertificate(c.slug)}>
                <img src="/img/certhumbnail.png" alt="certhumbnail"/>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
  

}