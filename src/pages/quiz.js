import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import QAnwsers from '../components/qanwsers'

import styles from '../style/quiz.module.css'


const QuizPage = () => (
  <Layout>
    <SEO title="Page Quiz" />

    <h3 className={styles.qzEnter}>LETS SEE HOW MUCH YOUVE LEARNED ABOUT:</h3>
    <h1 >Data Science fundamentals</h1>
    <p className={styles.qzGuide}>
      Here will present `10` questions which cover the necessary concepts and principles for the topic, if you rightly answered them beyond or equal 80% you will achieve a `Excellent` grade, if you successfully completed 60% ~ 80% you will get a `Qualified` grade, if your correct answers amount is below 6 then you failed this quiz, so, go back to review the tutorial and try again. Once you earned a `Qualified` or `Excellent` grade, you will reward a downloadable certificate with `YOUR` name. 
    </p>
    <p>Are you ready? -- open dialog input username</p>
    <div className={styles.qzBtnRow}>
      <Button to="/" styles={{background: '#127CC9', marginRight: '100px',}}>
        Hmm...not now
      </Button>
      <Button to="/" >Yes, Start</Button>
    </div>
    <hr/>
    <div className={styles.qzQanwsers}>
      <div className={styles.qagroup}>
        <QAnwsers seq="1" qas={[
          {q:'what',a:false}, {q:'when',a:false}, {q:'where',a:false}, {q:'why',a:false}
        ]}/>
      </div>
      <div className={styles.qagroup}>
        <QAnwsers seq="2" qas={[
          {q:'what',a:false}, {q:'when',a:false}, {q:'where',a:false}, {q:'why',a:false}
        ]}/>
      </div>
      <div className={styles.qagroup}>
        <QAnwsers seq="3" qas={[
          {q:'what',a:false}, {q:'when',a:false}, {q:'where',a:false}, {q:'why',a:false}
        ]}/>
      </div>
      <div className={styles.qagroup}>
        <QAnwsers seq="4" qas={[
          {q:'what',a:false}, {q:'when',a:false}, {q:'where',a:false}, {q:'why',a:false}
        ]}/>
      </div>
      
    </div>

    <div className={styles.endQzRow}>
      <Button to="/profile" styles={{borderRadius: '20px', padding: '9px 24px'}}>
        Done, to check results
      </Button>
    </div>
    
  </Layout>
)

export default QuizPage
