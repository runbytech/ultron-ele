/**
 * certificate section
 * 
 * @2019/03/02
 */

import React from 'react';
import Konva from 'konva'

import styles from '../style/profile.module.css'


export default class CertificateSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    this.stage = null
    this.saveCertificate = this.saveCertificate.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    const stageW = 640
    const stageH = 450
    this.stage = new Konva.Stage({
      container: 'certiCntnr',
      width: stageW,
      height: stageH
    })

    const imageObj = new Image()
    const that = this
    // load template image file...
    imageObj.onload = function(e) {
      let certiImage = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: stageW,
        height: stageH
      })
      let imageLayer = new Konva.Layer()
      imageLayer.add(certiImage)
    
      that.drawAll(imageLayer)
    }
    imageObj.src = '/img/certemplateA_from_dreamstime.com_s.png'
  }

  drawAll(imglayer) {
    const msgTxt = new Konva.Text({
      x: 240, y: 200,
      fontFamily: 'Calibri',
      fontSize: 20,
      text: 'Robin w li',
      fill: 'black'
    })

    imglayer.add(msgTxt)
    this.stage.add(imglayer) // put to the BOTTOM
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