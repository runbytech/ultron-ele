/**
 * tutorial detail static page
 * @2019/02/06,08-09,
 */
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import QAnwsers from '../components/qanwsers'

import styles from '../style/tutorial.module.css'
import theme from '../style/theme.module.css'
import tstyle from '../style/timeline.module.css'

import Confetti from 'react-confetti'


const Step = ({title, subtitle}) => (
  <li>
    <p className={tstyle.greyP}>
      <strong className={tstyle.library}>{title}</strong>
      <br/>
      {subtitle}
    </p>
  </li> 
)

const TutStepLine = () => (
  <ul className={tstyle.timeline}>
    <Step title="January 2019" subtitle="v1 Launch" />
    <Step title="February 2019" subtitle="v2 Launch" />
    <Step title="March 2019" subtitle="v3 Launch" />
    <Step title="April 2019" subtitle="v4 Launch" />
    <Step title="May 2019" subtitle="v3 Launch" />
    <Step title="June 2019" subtitle="v4 Launch" />
  </ul>
)

const TutorialPage = () => (
  <Layout nofoot={true} fullwidth={true}>
    <SEO title="Tutorial Details" />
    
    <div className={styles.lrcolumn}>
      {/** left content */}
      <div className={styles.leftContent}>

        <h3 className={styles.breadcrumb}>
          <Link to="/category" >Data Science</Link> / 
        </h3>

        <h2 className={styles.tutTitle}>What is Data Science?</h2>
        <h3 className={styles.tutAuthor}>Intricity101 @20160711</h3>
        <hr/>
        <blockquote className={styles.introBlock}>
          Data Science doesn't have to be such a mystical practice. Watch our latest video that pieces apart the aspects of Data Science, including Intricity's Customer Scoring as a Service offering.
        </blockquote>
        <div className={styles.videoCntr}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/L7CdHnuR4pE" frameBorder="0" allowFullScreen title="whats data science"></iframe>
        </div>
        <div className={styles.tutContent} >

          <p>Delivering information is not just about orderly distribution for the masses. Organizations need to maintain their competitive edge by making new discoveries. </p>
          
          <p>Data Science is the discipline of extracting knowledge from the data landscape. This realm of discovery has a completely different set of requirements from the standard data-to-information life-cycle. What this often means is confusion on how to work with data. Intricity brings a best of breed framework for building harmony between Data Science and Business Intelligence. </p>
          
          <p>This at times requires both a cultural shift as well as a better understanding of the interplay of how the data landscape comes together. </p>

          <p>The Data Science and Machine Learning teams not only need unstructured access to data, they also need the ability to experiment with external data sets. Unlike aggregate analytics, often Data Science teams are attempting to model reality by iterating through raw situations, the more successful these teams are, the better they are at predicting the future and optimizing inputs. </p>
          
          <p>Intricitys Data Moat Strategy is a springboard to help the organization develop a data landscape that produces a defensible position in the machine learning marketplace, and makes the most of the organizations data assets. </p>
        
        </div>
        <div className={styles.othereads}>
          <h3>Extends Reads</h3>
          <ul>
            <li>
              <a href="http://www.intricity.com/customer-data-science/" target="_blank" rel="noopener noreferrer">
                Data Science Whitepaper
              </a>
            </li>
            <li>
              <a href="http://www.intricity.com/intricity101" target="_blank" rel="noopener noreferrer">
                Intricitys Talk With a Specialist Page
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.unlockgame}>
          <div className={styles.topline}>
            <div className={styles.line}><span></span></div>
            <div className={styles.unlockTitle+` ${theme.greenColor}`}>
              UNLOCK THE NEW KNOWLEDGE
            </div>
            <div className={styles.line}><span></span></div>
          </div>
          
          <QAnwsers />

          {/** success bonus */}
          <div className={styles.confetti}>
            <Confetti numberOfPieces={200} width='860' height='120' 
              confettiSource={{x: 0, y: 0, w: 1200, h:0}}/>
            <span className={styles.welldone+` ${theme.ultronTxtColor}`}>
              Well done, you unlocked the next step!
            </span>
          </div>
        </div>
        {/** next step */}
        <div className={styles.nextstepSection}>
          <div className={styles.leftTitle}>
            <div className={styles.next}>NEXT STEP</div>
            <h3>Data Modeling basics</h3>
            <div className={styles.description}>
              In this step you will be familiar with some data models and learn how to use them... 
            </div>
          </div>
          <div className={styles.rightBtn}>
            <Button to="/" >GO NEXT</Button>
          </div>
        </div>
      </div>
      {/** right side panel */}
      <div className={styles.rightContent}>
        <div className={styles.headerImg}>
          <img src="/img/chamuditha-dilhan-1335612-unsplash-278x120.png" 
            alt="header"/>
          <h3 className={styles.titleBG}>
            Data Science Fundamentals...may be longer title need wrap! 
          </h3>
        </div>
        <div className={styles.stepLineCntr}>
          <TutStepLine />
          <div className={styles.gradientBox}></div>
        </div>
        <div className={styles.endTutBtnSection}>
          <Button to="/quiz" styles={{borderRadius: '18px', padding: '8px 24px'}}>
            TAKE QUIZ
          </Button>
        </div>
      </div>
    </div>

  </Layout>
)

export default TutorialPage
