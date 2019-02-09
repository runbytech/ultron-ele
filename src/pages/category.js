/**
 * category for tutorials
 * @2019/02/04
 */

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import styles from '../style/category.module.css'


function BackGround({children}){
  return <div className={styles.topImgBanner}>{children}</div>
}


// const BlurBannerImage 
class BlurBannerImage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {load: false}
    this.drawImg = this.drawImg.bind(this)
  }

  drawImg() {
    // this check is a MUST! or cause multiple render @2019/02/04
    if(this.state.load) return

    const ctx = this.canvas.getContext('2d')
    
    ctx.drawImage(this.img, 0, 0, 600, 100, 0, 0, 1200, 200)
  }

  componentDidMount() {
    const {src} = this.props

    this.img = new Image()
    this.img.src = src
    if (this.img.complete) this.drawImg()  
    else this.img.onload = this.drawImg
  }

  render() {
    const {src, children} = this.props
  
    return (
      <div className={styles.topImgBanner} >
        <canvas className={styles.bannerCanvas}
          ref={canvas => this.canvas = canvas}/>
        <div className={styles.childrenLayer}>
          {children}
        </div>
      </div>
    )
  }
}

const TutorialItem = ({coverImg, title, excerpt, date, slug}) => (
  <div className={styles.tutoitem}>
    <div className={styles.leftImage}>
      <img src={coverImg} className={styles.tutoCover}/>
      <div className={styles.coverOnBotm}></div>
      <div className={styles.coverText}>2019-02-05</div>
    </div>
    <div className={styles.rightIntro}>
      <h4 className={styles.tutoTitle}>{title}</h4>
      <p className={styles.excerpt}>
        {excerpt}
      </p>
      <div className={styles.tutoFooter}>
        <div className={styles.tutoFooterTags}>
          <span className={styles.tutoTag}>tagA</span>
          <span className={styles.tutoTag}>tagB</span>
          <span className={styles.tutoTag}>tagC</span>
        </div>
        <div className={styles.tutoFooterMore}>
          <Link to="/tutorial">Learn More...</Link>
        </div>
      </div>
    </div>
  </div>
)

const FeaturesPanel = ({}) => (
  <div className={styles.featuresPanel}>
    <div className={styles.seprateItem}>
      <span className={styles.alignRight}>Difficulty:</span>
      <span>Medium</span>
    </div>
    <div className={styles.seprateItem}>
      <span className={styles.alignRight}>Audience:</span>
      <span>students</span>
    </div>
    <div className={styles.seprateItem}>
      <span className={styles.alignRight}>Prerequisites:</span>
      <ul>
        <li>Mathematics</li>
        <li>Statistics</li>
        <li>Perserverance</li>
        <li>Curiosity</li>
      </ul>
    </div>
    <div className={styles.seprateItem+` last`}>
      <span className={styles.alignRight}>Youwill learn:</span>
      <ul>
        <li>Many Buzzwords</li>
        <li>Business analytics</li>
        <li>Predictive modeling</li>
        <li>Data processing</li>
      </ul>
    </div>       
  </div>
)

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
