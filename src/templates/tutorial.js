/**
 * tutorial section template to show each tutorial section .md data,
 * multipal sections in one directory consists of a tutorial
 * 
 * @2019/02/21
 */
import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Confetti from 'react-confetti'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import QAnwsers from '../components/qanwsers'
import TutStepLine from '../components/tutStepLine'
import { scrollTo, } from '../utils/helper'
import { getUser, saveLearningTrack, getLearningTrack} from '../utils/cache'

import styles from '../style/tutorial.module.css'
import theme from '../style/theme.module.css'


export default class TutorialPage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       showBonus: false
    }
    this.anwserDone = this.anwserDone.bind(this)
  }

  componentDidMount() {
    this.saveTrack('start')
    console.log('record learning start...');
  }

  // rerender completed
  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    scrollTo(this.leftel, this.leftel.scrollHeight, 900)
  }

  anwserDone() {
    this.setState({showBonus:true})
    this.saveTrack('unlock')
    console.log('record learging unlock...')
  }

  saveTrack(status) {
    const { data, pageContext} = this.props
    const pageslug = pageContext.slug
    const fm = data.tsec.frontmatter
    const { category } = data.catdef.frontmatter
    const date = new Date().toISOString()
    saveLearningTrack(pageslug, fm.title, category, date, status)
  }

  render() {

    const {location, data, pageContext} = this.props
    const fm = data.tsec.frontmatter
    const { edges:sections } = data.sections
    const { category } = data.catdef.frontmatter

    const pageslug = pageContext.slug
    const quizPath = pageContext.quizpath
    const pathname = location.pathname // the same as pageContext.slug
    const catepath = pathname.split('/').slice(0,3).join('/')
    
    // console.log(pageContext)
    // console.log(catdef)
    // console.log(data.quiz);

    let n = 0
    let next = null
    
    sections.map((s,i) => {
      if(s.node.fields.slug === pageslug) n = i
    })

    if(n+1<sections.length) next = sections[n+1]
    // console.log(next);

    return (
      <Layout nofoot={true} fullwidth={true}>
        <SEO title={fm.title} />
      
        {/** <h1 style={{paddingTop: `1.45rem`}}>_this is tutorial page...</h1> */}
        <div className={styles.lrcolumn}>
          {/** left content */}
          <div className={styles.leftContent} ref={el => { this.leftel = el; }}>

            <h3 className={styles.breadcrumb}>
              <Link to={catepath} >{category}</Link> / 
            </h3>

            <h2 className={styles.tutTitle}>{fm.title}</h2>
            <h3 className={styles.tutAuthor}>{fm.author} @{fm.date}</h3>
            <hr/>
            <blockquote className={styles.introBlock}>
              {fm.emphasis}
            </blockquote>

            <div 
              className={styles.tutContent}
              dangerouslySetInnerHTML={{ __html: data.tsec.html }} 
            />
            {/** other reads */}
            <div className={styles.othereads}>
              <h3>Extends Reads</h3>
              <ul>
                {fm.othereads &&
                  fm.othereads.map(
                    (r,i) => 
                      <li key={i}>
                        <a href={r.url} target="_blank" rel="noopener noreferrer">
                          {r.name}
                        </a>
                      </li>
                  )}
              </ul>
            </div>
            {/** mini game to unlock next section */}
            {fm.ulocknext?
              (
                <div className={styles.unlockgame}>
                  <div className={styles.topline}>
                    <div className={styles.line}><span></span></div>
                    <div className={styles.unlockTitle+` ${theme.greenColor}`}>
                      UNLOCK THE NEW KNOWLEDGE
                    </div>
                    <div className={styles.line}><span></span></div>
                  </div>
                  
                  <QAnwsers qas={fm.ulocknext} done={this.anwserDone}/>

                  {/** success bonus */}
                  {this.state.showBonus?
                    (<div className={styles.confetti}>
                      <Confetti numberOfPieces={200} width='860' height='120' 
                        confettiSource={{x: 0, y: 0, w: 1200, h:0}}/>
                      <span className={styles.welldone}>Well done, you unlocked the next step!</span>
                    </div>):false
                  }
                </div>
              ):false
            }
            {/** next step */}
            {this.state.showBonus?
              (
                <div className={styles.nextstepSection}>
                  <div className={styles.leftTitle}>
                    <div className={styles.next}>NEXT STEP</div>
                    <h3>{
                      next &&
                        next.node.frontmatter.title
                    }</h3>
                    <div className={styles.description}>
                      {
                        next &&
                          next.node.frontmatter.emphasis
                      }
                    </div>
                  </div>
                  <div className={styles.rightBtn}>
                    <Button to={next.node.fields.slug} >GO NEXT</Button>
                  </div>
                </div>
              ):false
            }
            {/** end of left content */}
          </div>
          {/** right side panel */}
          <div className={styles.rightContent}>
            <div className={styles.headerImg}>
              <Image 
                fluid={fm.cover.childImageSharp.fluid} 
              />
              <h3 className={styles.titleBG}>
                {fm.tutorial}
              </h3>
            </div>
            <div className={styles.stepLineCntr}>
              <TutStepLine sections={sections}/>
              <div className={styles.gradientBox}></div>
            </div>
            <div className={styles.endTutBtnSection}>
              {data.quiz &&
                <Button to={quizPath} styles={{borderRadius: '18px', padding: '8px 24px'}}>
                  TAKE QUIZ
                </Button> 
              }
            </div>
            {/** end of right panel */}
          </div>
        </div>
        
      </Layout>
    )
  }
  

}



// accept parameter from pageContext
export const pageQuery = graphql`
  query PageByTutorial(
    $slug: String!, 
    $tutpath: String!, 
    $catpath: String!,
    $quizpath:String!,
  ) {

    # query section by slug
    tsec: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        author
        title
        tutorial
        date(formatString: "MMMM DD, YYYY")
        emphasis
        othereads {
          name
          url
        }
        ulocknext {
          q
          a
        }
        cover {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 120) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    # query all the sections of this tutorial
    sections: allMarkdownRemark(
      filter: {
        fields: {slug: {regex: $tutpath}}, 
        frontmatter: {tutorial: {ne: null}}
      }, 
      sort: {fields: [frontmatter___date], order: ASC}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              emphasis
              date(formatString: "MMMM DD, YYYY")
              title
            }
          }
        }
    }

    # Query current category index.md 
    catdef: markdownRemark(fields: { slug: { eq: $catpath } }) {
      frontmatter {
        category
      }
    }
   
    # Query quiz content: test.md
    quiz: markdownRemark(fields: { slug: { eq: $quizpath } }) {
      frontmatter {
        for
      }
    }

  }
`
