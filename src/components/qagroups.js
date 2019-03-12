/**
 * just a array of qanwsers to check if completed all
 * 
 * @2019/03/01
 */
import React, { Component } from 'react'

import QAnwsers from './qanwsers'


export default class Qagroups extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       completed: false
    }
    this.selectHandler = this.selectHandler.bind(this)
  }

  componentWillMount() {// update state before render
    const { qaset, } = this.props
    let anwsered = false
    qaset.map(qa => {if(typeof qa.sidx !== 'undefined') anwsered = true})
    if(anwsered) this.setState({completed: true})
  }
  
  selectHandler() {
    const { qaset, done } = this.props
    const ans = []
    if(!done) return // no definition no handling

    qaset.map(qa => {
      // save each selected item index of statement option
      // selected property is assigned in QAnwsers while anwserChooser
      qa.group.map((g,i) => {if(g.selected) ans.push(i)})
    })
    
    if(this.state.completed) return // only dispatch once
    
    // check completion by select count
    if(ans.length == qaset.length) {
      this.setState({completed: true})
      done()
    }
  }

  render() {

    const { qaset, done } = this.props

    return (
      <>
      {qaset &&
        qaset.map(
          (qa,i) => 
            (
              <QAnwsers 
                key={i} 
                seq={i+1} 
                qas={qa.group} 
                blind={true}
                select={this.selectHandler}
                sidx={qa.sidx}
                />
            )
        )
      } 
      </>
    )
  }
}
