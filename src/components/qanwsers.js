/**
 * QAnwsers component
 * @2019/02/12,24
 * 
 */
import React from 'react';

import styles from '../style/qanwsers.module.css'
import yesimg from '../images/yes_green.png'

/**
 * 
 * @param {*} s: sequence, q: question, a: true/false, t: through 
 */
const Answer = ({s, q, a, t}) => (
  <>
    {a?
      (<img className={styles.checkedImg} src={yesimg} alt="checkbox"/>):
      (<span className={styles.greyCircle}></span>)
    }
    {t?
      (
        <span className={styles.outer}>
          <span className={styles.wrong}>{s}. {q}</span>
        </span>
      ):
      (<span className={styles.wrong}>{s}. {q}</span>)
    }
  </>
)


export default class QAnwsers extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      results: [false, false, false, false],
      through: [false, false, false, false]
    };
    this.anwserChooser = this.anwserChooser.bind(this)
  };

  anwserChooser (i) {
    const { qas, done } = this.props
    
    if(qas[i].a) {// clicked on the right answer
      let results = this.state.results
      results[i] = true
      this.setState({results})
      done() // callback
    }else{
      let through = this.state.through
      through[i] = true
      this.setState({through})
    }
  }

  render() {
    const { seq, qas, done } = this.props

    return (
      <>
        <h2 className={styles.whichTrue}>{seq && `${seq}.`} Which of these statements is true?</h2>
        <div className={styles.answers}>
          <div className={styles.answerRow}>
            <div className={styles.answer} onClick={()=>this.anwserChooser(0)}>
              <Answer 
                s="A" q={qas[0].q} 
                a={this.state.results[0]}
                t={this.state.through[0]}
              />
            </div>
            <div className={styles.answer} onClick={()=>this.anwserChooser(1)}>
              <Answer 
                s="A" q={qas[1].q} 
                a={this.state.results[1]}
                t={this.state.through[1]}
              />
            </div>
          </div>
          <div className={styles.answerRow}>
            <div className={styles.answer} onClick={()=>this.anwserChooser(2)}>
              <Answer 
                s="A" q={qas[2].q} 
                a={this.state.results[2]}
                t={this.state.through[2]}
              />
            </div>
            <div className={styles.answer} onClick={()=>this.anwserChooser(3)}>
              <Answer 
                s="A" q={qas[3].q} 
                a={this.state.results[3]}
                t={this.state.through[3]}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

}
  