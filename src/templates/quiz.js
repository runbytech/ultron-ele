/**
 * quiz template to display test.md in each tutorial
 * @2019/02/25
 */

import React from 'react'
import { graphql, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import Qagroups from '../components/qagroups'
import { getUser, saveLearningTrack, saveUserQuiz, getQuiz } from '../utils/cache'
import { scrollTo } from '../utils/helper'

import styles from '../style/quiz.module.css'


export default class QuizPage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       showQuiz: false,
       showDone:false,
       startTime: 0
    }
    // this.openQuiz = this.openQuiz.bind(this)
    // this.checkQuizRpt = this.checkQuizRpt.bind(this)
    // this.quizDone = this.quizDone.bind(this)
  }

  // Each Appearance...
  componentWillMount() {// update state before render
    let user = getUser()
    if(!user) return //FIXME: null check in build mode @2019/04/24

    const pageslug = this.props.pageContext.slug
    const saved = getQuiz(user.userName, pageslug)
    if(saved) this.setState({showQuiz: true, showDone: true})
    // FIXME: clear previous answers while quiz deleted
    // @2019/03/11
    if(!saved) this.resetQuiz()
  }

  resetQuiz() {
    this.setState({// close quiz
      showQuiz: false, showDone:false, startTime: 0
    })
  }

  openQuiz = () => {
    const { data, pageContext} = this.props
    const pageslug = pageContext.slug
    let user = getUser()
    if(user){
      this.setState({showQuiz:true})
      const saved = getQuiz(user.userName, pageslug)
      if(saved) return // do not open repeatedly

      this.saveTrack('quiz')
      this.setState({startTime: new Date().getTime()}) // remember start to calculate duration
    }else{
      console.log('NO USER...to navigate profile')
      navigate('/profile')
    }
  }

  saveTrack(status) {
    const { data, pageContext} = this.props
    const pageslug = pageContext.slug
    const { frontmatter:fm } = data.quiz
    const { category } = data.catdef.frontmatter
    const date = new Date().toISOString()
    saveLearningTrack(pageslug, fm.for, category, date, status)
  }

  checkQuizRpt = () => {
    navigate('/profile', {state: {section: 'testrept'}})
  }

  quizDone = () => {
    this.setState({showDone:true})

    const ans = []
    this.qaset.map(qa => {
      // save each selected item index of statement option
      qa.group.map((g,i) => {
        if(g.selected) ans.push(i)
        return
      })
      return
    })
    let user = getUser()
    const pageslug = this.props.pageContext.slug
    const saved = getQuiz(user.userName, pageslug)
    if(saved) return // do not save repeatedly
    
    // only save once for each quiz by one user
    const { data, pageContext} = this.props
    const { frontmatter:fm } = data.quiz
    const level = this.calculateLevel()
    const now = new Date()
    const duration = now - this.state.startTime
    
    saveUserQuiz(
      fm.for, 
      pageslug, 
      user.userName, 
      ans, 
      level,
      duration,
      now.toISOString()
    )
    
    this.saveTrack('complete')
  }

  calculateLevel() {
    let right = 0
    let size = this.qaset.length
    this.qaset.map(qa => {
      // save each selected item index of statement option
      qa.group.map((g,i) => {
        if(g.selected && g.a) right ++
        return
      })
      return
    })
    if(right >= Math.floor(size*0.8)) return 'Excellent'
    if(right >= Math.floor(size*0.6) && right < Math.floor(size*0.8)) return 'Qualified'
    if(right < Math.floor(size*0.6)) return 'Failed'
  }

  componentDidUpdate() {
    // scroll page to show questions
    // document.documentElement.scrollTop += 200
    let origHight = document.documentElement.scrollTop
    scrollTo(document.documentElement, origHight+300, 200)
  }

  // check if quiz already done, then add sidx property to each group
  resetSelected() {
    // FIXME: clear previous selected if closed @2019/03/11
    if(!this.state.showQuiz){
      this.qaset.map(qa => delete qa.sidx)
    }

    let user = getUser()
    if(!user) return //FIXME: null check in build mode @2019/04/24
    
    const pageslug = this.props.pageContext.slug
    const saved = getQuiz(user.userName, pageslug)
    if(!saved) return // do not reset not saved
  
    // which item was selected
    this.qaset.map((qa,n) => qa.sidx = saved.ans[n])
  }


  render() {
    const { data, pageContext } = this.props
    const { frontmatter:fm } = data.quiz
    const { edges:tutorial } = data.sections
    // NOTE: save qaset to component level here 
    // for other function retrieving
    this.qaset = fm.qaset

    const quizLength= this.qaset.length
    const firstSection = tutorial[0].node.fields.slug
    const quizFor = tutorial[0].node.frontmatter.tutorial
    // FIXME: cache quiz for value later track save @2019/06/03
    if(!fm.for) fm.for = quizFor
    
    const excellent = Math.floor(this.qaset.length*0.8)
    const qualified = Math.floor(this.qaset.length*0.6)
    const failed    = Math.floor(this.qaset.length*0.6)-1
    // show original checked result
    // by assign sidex to each group
    this.resetSelected()

    return (
      <Layout >
        <SEO title={`Quiz for: ${fm.for||quizFor}`} />

        <h3 className={styles.qzEnter}>LETS SEE HOW MUCH YOUVE LEARNED ABOUT:</h3>
        <h1 style={{padding:'0 10px', margin:'20px 10px'}}>{fm.for || quizFor}</h1>
        <p className={styles.qzGuide}>
           Here will present <strong>{quizLength}</strong> questions which cover the necessary concepts and principles for the tutorial. Once you earned a `Qualified` or `Excellent` grade, you will reward a downloadable certificate with `YOUR` name. 
           <br/>
           See test rules described in belowing table. 
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Right</th><th>Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{excellent}+</td>
              <td>Excellent</td>
              
            </tr>
            <tr>
              <td>{qualified}~</td>
              <td>Qualified</td>
              
            </tr>
            <tr>
              <td>~{failed}</td>
              <td>Failed</td>
              
            </tr>
          </tbody>
        </table>
        <p style={{paddingLeft:'12px'}}>Are you ready? -- open dialog input username</p>
        <div className={styles.qzBtnRow}>
          <Button to={firstSection} style={{background: '#127CC9', marginRight: '100px',}}>
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
                <Qagroups 
                  qaset={this.qaset}
                  done={this.quizDone}
                  />
              </div>
            </div>
            {this.state.showDone &&
              <div className={styles.endQzRow}>
                <Button style={{borderRadius: '20px', padding: '9px 24px'}}
                  onClick={this.checkQuizRpt}>
                  Done, to check results
                </Button>
              </div>
            }
          </>
        }
              
      </Layout>
    )
  };
  

}


// accept parameter from pageContext
export const pageQuery = graphql`
  query PageByQuiz($slug: String!, $tutpath: String!, $catpath: String!) {
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
    # used in going back tutorial review
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
              tutorial
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
    

  }
`
