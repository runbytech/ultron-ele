/**
 * static category template for tutorials
 * @2019/02/04
 */

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlurBannerImage from '../components/blurBanner'
import TutorialItem from '../components/tutorialItem'
import FeaturesPanel from '../components/featuresPanel'

import styles from '../style/category.module.css'


// function BackGround({children}){
//   return <div className={styles.topImgBanner}>{children}</div>
// }


const CategoryPage = ({location}) => (
  <Layout>
    <SEO title="Page category" />
    
    <BlurBannerImage src={location.state.imgPath}>
      <h3 className={styles.category}>{location.state.title}</h3>
      <div className={styles.tags}>
        <span className={styles.tag}>Analysis</span>
        <span className={styles.tag}>Algorthm</span>
        <span className={styles.tag}>Abstract</span>
      </div>
    </BlurBannerImage>

    <div className={styles.twoColumn}>
      {/** left column */}
      <div className={styles.leftColumn}>
        {/** intro text */}
        <h3 className={styles.sectionHead}>Category Intro</h3>
        <p className={styles.sectionIntro}>
          Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from data in various forms, both structured and unstructured, similar to data mining.
        </p>

        {/** course list */}
        <h3 className={styles.sectionHead}>Courses in this category</h3>
        <div className={styles.tutolist}>
          <TutorialItem 
            coverImg="/img/arts_green_200.png"
            title="Machine learning"
            excerpt="Machine learning (ML) is the scientific study of algorithms and statistical models that computer systems use to effectively perform a specific task without using explicit instructions, relying on models and inference instead...."
            />
          <TutorialItem 
            coverImg="/img/arts_orange_200.png"
            title="Data mining"
            excerpt="Data mining is the process of discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems..."
            />
          <TutorialItem 
            coverImg="/img/arts_pink_200.png"
            title="Big data"
            excerpt="Big data refers to data sets that are too large or complex for traditional data-processing application software to adequately deal with. "
            />
        </div>
      </div>
      {/** right column */}
      <div className={styles.rightColumn}>
        <FeaturesPanel />
      </div>
    </div>
    
  </Layout>
)

export default CategoryPage
