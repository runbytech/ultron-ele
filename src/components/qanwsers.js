/**
 * QAnwsers component
 * @2019/02/12
 * 
 */
import React from 'react';

import styles from '../style/qanwsers.module.css'
import yesimg from '../images/yes_green.png'

export default ({seq}) => (
  <>
    <h2 className={styles.whichTrue}>{seq && `${seq}.`} Which of these statements is true?</h2>
    <div className={styles.answers}>
      <div className={styles.answerRow}>
        <div className={styles.answer}>
          <span className={styles.greyCircle}></span>
          A. Organizations can win without using data science
        </div>
        <div className={styles.answer}>
          <span className={styles.greyCircle}></span>
          B. Data science can predict the future
        </div>
      </div>
      <div className={styles.answerRow}>
        <div className={styles.answer}>
          <span className={styles.greyCircle}></span>
          C. Pareto principle is a top-down modeling method
        </div>
        <div className={styles.answer}>
          <img className={styles.checkedImg} src={yesimg} alt="checkbox"/>
          D. Data Science is the discipline of extracting knowledge from the data landscape
        </div>
      </div>
    </div>
  </>
)