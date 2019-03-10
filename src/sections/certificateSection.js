/**
 * certificate section
 * 
 * @2019/03/02
 */

import React from 'react';
import Konva from 'konva'
import { getUser } from '../utils/cache'
import styles from '../style/profile.module.css'


export default class CertificateSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      userFullName: '',
    }
    this.stage = null
    this.saveCertificate = this.saveCertificate.bind(this)
  }

  componentWillMount() {
    const { signiture } = this.props
    // console.log(signiture)
    let user = getUser()
    let userFullName = user.fullName?user.fullName:'User Unknown'
    this.setState({userFullName})

  }

  // Permanent Marker
  // Pinyon Script
  // Bitter Bold
  resetCanvasTextFont(fontName) {
    // TRICKY: create custom font context for canvas
    // @2019/03/09
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.font = 'normal 20px '+fontName;
    ctx.measureText('Some test text;');
  }

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
    this.drawAllText(textLayer)
  }

  drawAllText(textLayer) {
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
    const dateStr = new Date().toLocaleDateString()
    const dateTxt = new Konva.Text({
      x: 140, y: 364,
      fontFamily: 'Bitter Bold',
      fontSize: 14,
      text: dateStr,
      fill: '#333',
    })
    const courseName = 'Business Essence'
    const courseTxt = new Konva.Text({
      x: 320, y: 264,
      fontFamily: 'Bitter Bold',
      fontSize: 24,
      text: courseName,
      fill: 'black',
    })
    courseTxt.offsetX(courseTxt.width() / 2)
    
    const achievemTxt = new Konva.TextPath({
      x: 10, y: 280,
      fill: 'white',
      fontSize: 16,
      fontStyle: 'bold',
      fontFamily: 'Arial',
      text: 'EXCELLENT',
      // text: 'QUALIFIED',
      data: 'M284 72 C 280 30, 340 30, 336 72'
    })
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

  render() {
    return (
      <>
        <h3 className={styles.secTitle}>Certificates</h3>
        <hr/>
        <div className={styles.certiSectRow}>
          <div className={styles.certiCtnr}>
            <div id="certiCntnr" className={styles.certCanvas}></div>
            <button className={styles.exportBtn}
              onClick={this.saveCertificate}>Save</button>
          </div>
          <div className={styles.certiThumnails}>
            <div>
              <img src="/img/certhumbnail.png" alt="certhumbnail"/>
            </div>
            <div>
              <img src="/img/certhumbnail.png" alt="certhumbnail"/>
            </div>
            <div>
              <img src="/img/certhumbnail.png" alt="certhumbnail"/>
            </div>
            <div>
              <img src="/img/certhumbnail.png" alt="certhumbnail"/>
            </div>
            <div>
              <img src="/img/certhumbnail.png" alt="certhumbnail"/>
            </div>
          </div>
        </div>
      </>
    )
  }
  

}