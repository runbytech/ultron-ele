/**
 * category template to show each category .md data
 * and the tutorials in this category
 * 
 * @2019/02/21
 * 
 * add responsive layout support
 * @2019/05/30
 */
import React from 'react'
import { Link, graphql, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlurBannerImage from '../components/blurBanner'
import TutorialItem from '../components/tutorialItem'
import FeaturesPanel from '../components/featuresPanel'
import { groupTutorials, } from '../utils/helper'

import styles from '../style/category.module.css'
import useMedia480 from '../hooks/useMedia480'



const LinkableTI = ({mobile, t, i, fm}) => {

  // BAD STRUCTURE IN LOOP CAUSE ERROR IN BROWSER 
  // @2019/06/01 
  // return (
  //   <Link to={t.slug} style={{textDecoration: 'none'}}>
  //     <TI t={t} i={i} fm={fm}/>
  //   </Link>
  // )

  if(!mobile) return (
    <TutorialItem
      slug={t.slug}
      coverImg={t.cover}
      date={t.date}
      title={t.tutori}
      tags={t.tags}
      excerpt={t.sections[0].node.excerpt}
      category={fm.category}
    />
  )

  return (
    <TutorialItem
      onClick={()=>navigate(t.slug)}
      slug={t.slug}
      coverImg={t.cover}
      date={t.date}
      title={t.tutori}
      tags={t.tags}
      excerpt={t.sections[0].node.excerpt}
      category={fm.category}
    />
  )

}

const CategoryPage = ({location, data, pageContxt}) => {

  const {frontmatter:fm, html:intro} = data.catdef
  const tutorials = data.tutorials?data.tutorials.edges:null
  const grouptuts = tutorials?groupTutorials(tutorials):null
  const mobile = useMedia480()

  return (
    <Layout>
      <SEO title={fm.category} />
      {mobile &&
        <Link to="/" className={styles.backBtn}>
          &lt;&nbsp;HOME
        </Link>
      }
      {!mobile &&
        <BlurBannerImage src={fm.cover.childImageSharp.fluid.src}>
          <h2 className={styles.category}>
            {fm.category}
          </h2>
          <div className={styles.tags}>
            {fm.tags && 
              fm.tags.map((t,i) => 
                <span className={styles.tag} key={i}>{t}</span>
              )
            }
          </div>
        </BlurBannerImage>
      }

      <div className={styles.twoColumn}>
        {/** left column */}
        <div className={styles.leftColumn}>
          {/** intro text */}
          <h3 className={`${styles.sectionHead} sec-hd-pad`}>
            {mobile?fm.category:'Brief Intro'}
          </h3>
          <div 
            className={styles.sectionIntro} 
            dangerouslySetInnerHTML={{ __html: intro }} 
            />

          {/** course list */}
          <h3 className={`${styles.sectionHead} sec-hd-pad`}>
            {`Courses in ${fm.category}`}
          </h3>
          <div className={styles.tutolist}>
            {grouptuts &&
              grouptuts.map(
                (t,i) => 
                  <LinkableTI 
                    key={t.slug}
                    mobile={mobile}
                    t={t}
                    i={i}
                    fm={fm}
                  />
              )
            }
          </div>
          <div className={styles.sectionIntro} >
            {(!grouptuts || !grouptuts.length) &&
              <p>
                No tutorials in this category yet, use generator to create one by running: <br/>
                <code>$ npm run generate</code><br/>
                And move down arrow key to select `T-utorial-generate`, press Enter to start tutorial generating dialog.<br/><br/>
                More instructions about this in <Link to="/userguide">User Guide</Link>
              </p>
            }
          </div>
        </div>
        {/** right column */}
        <div className={`${styles.rightColumn} visible`}>
          <FeaturesPanel features={fm}/>
        </div>
      </div>
    
    </Layout>
  )
}

export default CategoryPage

// accept parameter from pageContext
export const pageQuery = graphql`
  query PageByCategory($slug: String!) {

    # category definition in index.md
    catdef: markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        category
        date(formatString: "MMMM DD, YYYY")
        tags
        difficulty
        audience
        prerequisites
        uwillearn
        cover {
          childImageSharp {
            fluid(maxWidth: 345){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    # tutorials in this category
    tutorials: allMarkdownRemark(
      filter: {
        fields: {slug: {regex: $slug}},
        frontmatter: {tutorial: {ne: null}}
      },
      sort: { fields: [frontmatter___date], order: DESC }
    ){
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {slug}
          frontmatter {
            cover {
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "MMMM DD, YYYY")
            title
            tutorial
            tags
          }
        }
      }
    }


  }
`
