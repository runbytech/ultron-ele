/**
 * quiz template to display test.md in each tutorial
 * @2019/02/25
 */

import React from 'react'
import { Link, graphql, navigateTo } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import QAnwsers from '../components/qanwsers'
import { getUser } from '../utils/cache'

import styles from '../style/quiz.module.css'


export default class QuizPage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       showQuiz: false
    }
    this.openQuiz = this.openQuiz.bind(this)
  }

  openQuiz() {
    let user = getUser()
    if(user){
      this.setState({showQuiz:true})
    }else{
      console.log('NO USER...to navigate profile')
      navigateTo('/profile')
    }
  }

  componentDidUpdate() {
    // console.log('updated!')
    document.documentElement.scrollTop = 630 // scroll page to show questions
    // window.scrollTo(0,630) // or, use this method
  }

  render() {

    const { data, pageContext } = this.props
    const { frontmatter:fm } = data.quiz
    const { edges:tutorial } = data.sections
    const qaset = fm.qaset
    const quizLength= qaset.length
    const firstSection = tutorial[0].node.fields.slug
    const excellent = Math.floor(qaset.length*0.8)
    const qualified = Math.floor(qaset.length*0.6)
    const failed    = Math.floor(qaset.length*0.6)-1
    
    console.log(qaset)

    return (
      <Layout >
        <SEO title={`Quiz for: ${fm.for}`} />

        <h3 className={styles.qzEnter}>LETS SEE HOW MUCH YOUVE LEARNED ABOUT:</h3>
        <h1 >{fm.for}</h1>
        <p className={styles.qzGuide}>
           Here will present <strong>{quizLength}</strong> questions which cover the necessary concepts and principles for the tutorial.
           <br/>
           Once you earned a `Qualified` or `Excellent` grade, you will reward a downloadable certificate with `YOUR` name. 
           <br/>
           See test rules described in belowing table. 
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Right</th><th>Level</th><th>Badge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{excellent}+</td>
              <td>Excellent</td>
              <td></td>
            </tr>
            <tr>
              <td>{qualified}~</td>
              <td>Qualified</td>
              <td></td>
            </tr>
            <tr>
              <td>~{failed}</td>
              <td>Failed</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p>Are you ready? -- open dialog input username</p>
        <div className={styles.qzBtnRow}>
          <Button to={firstSection} styles={{background: '#127CC9', marginRight: '100px',}}>
            Hmm...not now
          </Button>
          <Button onClick={this.openQuiz} >Yes, Start</Button>
        </div>
        <hr/>
        {/** Questions zone */}
        {this.state.showQuiz &&
          <>
            <div className={styles.qzQanwsers}>
              <div className={styles.qagroup}>
                {qaset &&
                  qaset.map(
                    (qa,i) => 
                      (<QAnwsers key={i} seq={i+1} qas={qa.group} blind={true}/>)
                  )
                }
              </div>
            </div>
            <div className={styles.endQzRow}>
              <Button to="/profile" styles={{borderRadius: '20px', padding: '9px 24px'}}>
                Done, to check results
              </Button>
            </div>
          </>
        }
              
      </Layout>
    )
  };
  

}



// accept parameter from pageContext
export const pageQuery = graphql`
  query QuizBySlug($slug: String!, $tutpath: String!) {
    # query test.md
    quiz: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        for
        date(formatString: "MMMM DD, YYYY")
        qaset {
          group {
            q
            a
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
          }
        }
    }

  }
`
