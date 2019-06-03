/**
 * QAnwsers component
 * @2019/02/12,24
 * 
 * add blind answering mode
 * @02/26
 * 
 * add responsive layout support
 * @05/31
 * 
 */
import React from 'react';

import styles from '../style/qanwsers.module.css'
import yesimg from '../images/yes_green.png'

import { useMedia4804Comp } from '../hooks/useMedia480'

/**
 * 
 * @param {*} s: sequence, q: question, 
 * b: blind mode, used in quiz which doesnt give user right/error hint
 * h: selected status, while click on each answer
 * a: true/false,
 * t: through text line
 */
const Answer = ({s, q, a, t, b, h}) => {
  
  return (<>
    {!b &&
      (a?
        <img 
          className={styles.checkedImg+` ultron-border`} 
          src={yesimg} alt="checkbox"
          />:
        <span className={styles.greyCircle}></span>)
    } 
    {b &&
      (h?
        <img 
          className={styles.checkedImg+` ultron-border`} 
          src={yesimg} alt="checkbox"
          />:
        <span className={styles.greyCircle}></span>)
    }
    
    {t && !b?
      (
        <span className={styles.outer}>
          <span className={styles.wrong}>{s}. {q}</span>
        </span>
      ):
      (<span className={styles.wrong}>{s}. {q}</span>)
    }
  </>)
}


export default class QAnwsers extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      results : Array(4).fill(false),
      through : Array(4).fill(false),
      selected: Array(4).fill(false)
    };
    this.anwserChooser = this.anwserChooser.bind(this)
  };

  componentWillMount() {
    const { qas, started, sidx } = this.props
    
    // blind mode use sidx
    if(typeof(sidx) !== 'undefined'){
      let origs = this.state.selected
      origs[sidx] = true // reset selected status by index
      this.setState({selected: origs})
    }else{
      this.setState({selected: Array(4).fill(false)}) // reset to unselected
      qas.map(qa => delete qa.selected) // FIXME: clear previous selected
    }

    // this property only used in none blind mode
    if(!started) return // if the section not unlocked
    
    let index = 0 // which is right
    qas.map((q,i) => { if(q.a) index = i })
    let results = this.state.results
    results[index] = true
    this.setState({results}) // reset the right statement

    let through = Array(4).fill(true)
    through[index] = false
    this.setState({through}) // reset text through appearance
  }


  anwserChooser (i) {
    const { qas, done, blind, select, started } = this.props
    // this property only used in none blind mode
    if(started) return // if the tutorial unlocked, do nothing

    let selected = Array(4).fill(false) // reset select
    selected[i] = true
    this.setState({selected})
    
    if(qas[i].a) {// clicked on the right answer
      let results = this.state.results
      results[i] = true
      this.setState({results})
      if(done) done() // callback
    }else{
      let through = this.state.through
      through[i] = true
      this.setState({through})
    }

    // save selected value to qas
    if(blind){
      qas.map(q => q.selected = false)
      qas[i].selected = true
    }

    // notify outside one anwser selectd
    if(select) select()
  }

  render() {
    const { seq, qas, done, blind } = this.props
    const mobile = useMedia4804Comp()

    return (
      <>
        <h2 className={styles.whichTrue}>{seq && `${seq}.`} Which of these statements is true?</h2>
        <div>
          <div className={styles.answerRow}>
            {
              ['A','B','C','D'].map(
                (s,i)=> 
                    <div className={`${styles.answer} anwser-resp`} 
                          onClick={()=>this.anwserChooser(i)}
                          key={i}>
                      <Answer 
                        s={s} q={qas[i].q} 
                        a={this.state.results[i]}
                        t={this.state.through[i]}
                        h={this.state.selected[i]}
                        b={!!blind}
                      />
                    </div>
              )
            }
          </div>
        </div>
      </>
    )
  }

}
  