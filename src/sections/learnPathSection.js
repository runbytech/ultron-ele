/**
 * learning path section
 * 
 * @2019/02/28
 */

import React, { Component } from 'react'
import Konva from 'konva'

import { getUser, getLearningTracks} from '../utils/cache'

import styles from '../style/profile.module.css'

export default class LearningPathSection extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    this.colorDict = {
      start   : '#47BA47',
      unlock  : '#EEC900',
      quiz    : '#EE7942',
      complete: '#EE0000'
    }
    this.stage       = null
    this.msgTxt      = null
    this.msgTxtCtnr  = null
    this.redrawLayer = null
    this.hitTestPots = []
  }

  componentDidMount() {
    let origTracks = getLearningTracks()

    const tracks = [].concat(origTracks)
      // concat(origTracks).concat(origTracks).concat(origTracks).concat(origTracks)
    while(tracks.length>17){
      tracks.pop()
    }
    if(!tracks) return

    this.stage = new Konva.Stage({
      container: 'konvaLPctnr',
      width: 780,
      height: 435
    });

    var layer = new Konva.Layer()
    this.redrawLayer = new Konva.Layer()
    this.drawLearningPath(tracks, layer)
    // add legend layer
    var legend= new Konva.Layer()
    this.drawLegend(legend)
    this.stage.add(legend)

    this.msgTxt = new Konva.Text({
      x: 0,
      y: 0,
      fontFamily: 'Calibri',
      fontSize: 20,
      text: '',
      fill: 'black'
    });

    this.msgTxtCtnr = new Konva.Rect({
      x: 0,
      y: 0,
      width: 92,
      height: 24,
      stroke: '#666',
      strokeWidth: 1,
      cornerRadius: 4,
      fill: '#F0FFFF'
    });
    this.msgTxtCtnr.visible(false)
    this.msgTxtCtnr.shadowBlur(4)
    this.msgTxtCtnr.shadowOffset({x:-2,y:-2})
    
    this.addMoveEventListener()

    // add the layer to the stage
    this.redrawLayer.add(this.msgTxtCtnr)
    this.redrawLayer.add(this.msgTxt)
    this.stage.add(layer)
    this.stage.add(this.redrawLayer) // put to the top
  }

  addMoveEventListener() {
    this.stage.on('mousemove', ()=>{
      var mpos = this.stage.getPointerPosition()
      var hitResult = this.checkHitResult()
      if(hitResult){
        this.writeMessage(hitResult.title?hitResult.title:' ? ', {x:(mpos.x+10),y:(mpos.y+10)})
      }else{
        this.writeMessage('move me', {x:(mpos.x+10),y:(mpos.y+10)})
      }
        
      if(mpos.y<20 || mpos.y>415 || mpos.x<20 || mpos.x>760){
        this.msgTxtCtnr.remove()
        this.msgTxt.remove()
      }else{
        if(!this.redrawLayer.hasChildren()){
          this.redrawLayer.add(this.msgTxtCtnr)
          this.redrawLayer.add(this.msgTxt)
        }
      }
      
    })
  }

  checkHitResult() {
    var result = null
    var mpos = this.stage.getPointerPosition()
    this.hitTestPots.map(rc => {
      if(mpos.x < rc.rect.bx && mpos.x > rc.rect.tx 
          && mpos.y < rc.rect.by && mpos.y > rc.rect.ty) result = rc
    })
    return result
  }

  writeMessage(message, position) {
    // mouse postion
    var mpos = this.stage.getPointerPosition()
    
    this.msgTxt.text(message) // render text first to get width

    let txtLeng = this.msgTxt.getTextWidth()
    let fixPosx = mpos.x>600?(mpos.x-txtLeng):(mpos.x+10)
    this.msgTxt.position({x:fixPosx, y:position.y})

    this.msgTxtCtnr.width(this.msgTxt.getTextWidth()+2)
    this.msgTxtCtnr.position({x:fixPosx, y:position.y})
    this.msgTxtCtnr.visible(true)

    this.redrawLayer.draw() // rerender lastly
  }

  drawLearningPath(tracks, layer, w, h) {
    var lEndX = 0
    var lEndY = 0
    var offsetX = 80
    var offsetY = 80
    
    if(tracks && !tracks.length) return

    tracks.map((t, i) => {
      if(!t) return

      var color    = this.colorDict[t.status]
      var distance = 120
      var cStartX  = (i===0)?lEndX+offsetX:lEndX
      var cStartY  = (i===0)?lEndY+offsetY:lEndY
      
      // circle
      var circle = new Konva.Circle({
        x: cStartX,
        y: cStartY,
        radius: 10,
        fill: color,
        stroke: 'black',
        strokeWidth: 2,
      });
      // put this circle hit area into array for later detect
      this.hitTestPots.push({
        rect: {tx:cStartX-10, ty:cStartY-10, bx:cStartX+10, by:cStartY+10}, 
        title: t.title
      })
      // save the last end point
      lEndX = parseInt((i+1)/6)%2?(cStartX - distance):(cStartX + distance)
      lEndY = cStartY
      // the 6th point line, reset end x/y
      if(i>0 && (i+1)%6===0){//get line down in the n 6th point
        // console.log('draw down line ...')
        lEndX = cStartX
        lEndY = cStartY + distance
      }
      // line
      var line = new Konva.Line({
        points: [cStartX, cStartY, lEndX, lEndY],
        stroke: 'black',
        strokeWidth: 2,
      });

      var arc = new Konva.Arc({
        x: cStartX,
        y: cStartY,
        innerRadius: 4,
        outerRadius: 6,
        angle: 90,
        fill: 'white',
      });

      var vline = new Konva.Line({
        points: [cStartX, cStartY, cStartX, (i%2)?cStartY-30:cStartY+30],
        stroke: 'black',
        strokeWidth: 2,
      });

      var dateTxt = new Konva.Text({
        x: cStartX-40,
        y: (i%2)?cStartY-50:cStartY+34,
        // text: ''+i,
        text: t.date.split('T')[0],
        fontSize: 14,
        fontFamily: 'Calibri',
        fill: 'black'
      });

      var roundRect = new Konva.Rect({
        x: cStartX-46,
        y: (i%2)?cStartY-54:cStartY+30,
        width: 92,
        height: 24,
        stroke: '#666',
        strokeWidth: 1,
        cornerRadius: 4
      });

      layer.add(vline);
      layer.add(line);
      layer.add(circle);
      layer.add(arc);
      layer.add(dateTxt);
      layer.add(roundRect);
    })

  }

  drawLegend(layer) {

    var startCle = new Konva.Circle({
      x: 680,
      y: 340,
      radius: 6,
      fill: '#47BA47',
      stroke: 'black',
      strokeWidth: 2
    });
    layer.add(startCle)

    var startTxt = new Konva.Text({
      x: 700,
      y: 334,
      text: 'Start',
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: 'green'
    });
    layer.add(startTxt)

    var unlockCle = new Konva.Circle({
      x: 680,
      y: 360,
      radius: 6,
      fill: '#EEC900',
      stroke: 'black',
      strokeWidth: 2
    });
    layer.add(unlockCle)

    var unlockTxt = new Konva.Text({
      x: 700,
      y: 354,
      text: 'Unlock',
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: '#EEC900'
    });
    layer.add(unlockTxt)

    var quizCle = new Konva.Circle({
      x: 680,
      y: 380,
      radius: 6,
      fill: '#EE7942',
      stroke: 'black',
      strokeWidth: 2
    });
    layer.add(quizCle)
  
    var quizTxt = new Konva.Text({
      x: 700,
      y: 374,
      text: 'Quiz',
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: '#EE7942'
    });
    layer.add(quizTxt)

    var completeCle = new Konva.Circle({
      x: 680,
      y: 400,
      radius: 6,
      fill: '#EE0000',
      stroke: 'black',
      strokeWidth: 2
    });
    layer.add(completeCle)
  
    var completeTxt = new Konva.Text({
      x: 700,
      y: 394,
      text: 'Complete',
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: '#EE0000'
    });
    layer.add(completeTxt)
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className={styles.learnPathStage}>
        <h3 className={styles.secTitle}>Learning Path</h3>
        <hr/>
        <div className={styles.konvaLPctnr} id="konvaLPctnr"></div>
      </div>
    )
  }
}
