/**
 * QAnwsers component
 * @2019/02/12,24
 * 
 * 02/26: add blind answering mode
 * 
 */
import React from 'react';

import styles from '../style/qanwsers.module.css'
import yesimg from '../images/yes_green.png'

/**
 * 
 * @param {*} s: sequence, q: question, a: true/false, t: through text line
 * b: blind mode, used in quiz which doesnt give user right/error hint
 * h: selected status, while click on each answer
 */
const Answer = ({s, q, a, t, b, h}) => (
  <>
    {a && !b?
      (<img className={styles.checkedImg} src={yesimg} alt="checkbox"/>):
      (h?<img className={styles.checkedImg} src={yesimg} alt="checkbox"/>:
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
  </>
)


export default class QAnwsers extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      results: [false, false, false, false],
      through: [false, false, false, false],
      selected: [false, false, false, false]
    };
    this.anwserChooser = this.anwserChooser.bind(this)
  };

  anwserChooser (i) {
    const { qas, done, blind } = this.props

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
  }

  render() {
    const { seq, qas, done, blind } = this.props

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
                h={this.state.selected[0]}
                b={!!blind}
              />
            </div>
            <div className={styles.answer} onClick={()=>this.anwserChooser(1)}>
              <Answer 
                s="B" q={qas[1].q} 
                a={this.state.results[1]}
                t={this.state.through[1]}
                h={this.state.selected[1]}
                b={!!blind}
              />
            </div>
          </div>
          <div className={styles.answerRow}>
            <div className={styles.answer} onClick={()=>this.anwserChooser(2)}>
              <Answer 
                s="C" q={qas[2].q} 
                a={this.state.results[2]}
                t={this.state.through[2]}
                h={this.state.selected[2]}
                b={!!blind}
              />
            </div>
            <div className={styles.answer} onClick={()=>this.anwserChooser(3)}>
              <Answer 
                s="D" q={qas[3].q} 
                a={this.state.results[3]}
                t={this.state.through[3]}
                h={this.state.selected[3]}
                b={!!blind}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

}
  