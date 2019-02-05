/**
 * @2019/02/01
 */
import React from 'react'
import { Link } from 'gatsby'

import styles from '../style/tutorials.module.css'
import tstyle from '../style/timeline.module.css'

const TutHeadCard = ({image}) => (
  <div className={styles.tutHeadCard}>
    <img className={styles.tutHeadImg} src={image} alt=''/>
    <div className={styles.tutHeadFooter}>
      <p className={styles.tutHeadTitle}>
        _this is tutorials title...may be has a longer title and must wrap to second line...
      </p>
    </div>
  </div>
)

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
  </ul>
)

const Tutorials = () => (
  <div className={styles.tutorialsColumn}>
    {/** 1st column */}
    <div className={styles.column}>
      
      <TutHeadCard image="/img/chamuditha-dilhan-1335612-unsplash-278x120.png" />
      <TutStepLine />
    </div>
    {/** 2cd column */}
    <div className={styles.column}>
      
      <TutHeadCard image="/img/dose-juice-1184457-278x120.png" />
      <TutStepLine />
    </div>
    {/** 3rd column */}
    <div className={styles.column}>
      
      <TutHeadCard image="/img/bence-balla-schottner-1332731-270x120.png" />
      <TutStepLine />
    </div>
    {/** 4rt column */}
    <div className={styles.column}>
      
      <TutHeadCard image="/img/martin-sanchez-253914-278x120.png" />
      <TutStepLine />
    </div>
    {/** end of column */}
  </div>
)

export default Tutorials