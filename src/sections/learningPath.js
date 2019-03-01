/**
 * learning path section
 * 
 * @2019/02/28
 */

import React, { Component } from 'react'

import { getUser, getLearningTrack} from '../utils/cache'

import styles from '../style/profile.module.css'


export default class LearningPathSection extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  componentDidMount() {
    const tracks = getLearningTrack()
    console.log(tracks)
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <h3 className={styles.secTitle}>Learning Path</h3>
        <hr/>
        
        <p>to draw the learning track with react konva</p>
      </div>
    )
  }
}
