/**
 * category template to show each category .md data
 * and the tutorials in this category
 * 
 * @2019/02/21
 */
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlurBannerImage from '../components/blurBanner'
import TutorialItem from '../components/tutorialItem'
import FeaturesPanel from '../components/featuresPanel'

import styles from '../style/category.module.css'



const groupTutorials = edges => {
  // console.log(edges)
  let tutorialTitles = []
  let tutorialDict = {}
  let title
  edges.forEach(edge => {
    title = edge.node.frontmatter.tutorial
    if(!tutorialTitles.includes(title)) { // check exist
      tutorialTitles.push(title)
      tutorialDict[title] = [edge]
    }else{
      tutorialDict[title].splice(0, 0, edge) // insert to first
    }
  })

  let groups = []
  tutorialTitles.forEach(title => 
    groups.push({
      slug    : tutorialDict[title][0].node.fields.slug,
      date    : tutorialDict[title][0].node.frontmatter.date,
      cover   : tutorialDict[title][0].node.frontmatter.cover,
      tags    : tutorialDict[title][0].node.frontmatter.tags,
      tutori  : title, 
      sections: tutorialDict[title]
    }))

  return groups
}


const CategoryPage = ({location, data, pageContxt}) => {

  const {frontmatter:fm, html:intro} = data.catdef
  const tutorials = data.tutorials.edges
  const grouptuts = groupTutorials(tutorials)

  console.log(fm)
  console.log(tutorials);
  console.log(grouptuts)

  return (
    <Layout>
      <SEO title={fm.category} />
      
      <BlurBannerImage src={location.state.imgPath}>
        <h2 className={styles.category}>{location.state.title}</h2>
        <div className={styles.tags}>
          {fm.tags && 
            fm.tags.map((t,i) => 
              <span className={styles.tag} key={i}>{t}</span>
            )
          }
        </div>
      </BlurBannerImage>

      <div className={styles.twoColumn}>
        {/** left column */}
        <div className={styles.leftColumn}>
          {/** intro text */}
          <h3 className={styles.sectionHead}>Brief Intro</h3>
          <div 
            className={styles.sectionIntro} 
            dangerouslySetInnerHTML={{ __html: intro }} 
            />

          {/** course list */}
          <h3 className={styles.sectionHead}>Courses in this category</h3>
          <div className={styles.tutolist}>
            {grouptuts &&
              grouptuts.map(
                (t,i) => 
                  <TutorialItem key={i}
                    slug={t.slug}
                    coverImg={t.cover}
                    date={t.date}
                    title={t.tutori}
                    tags={t.tags}
                    excerpt={t.sections[0].node.excerpt}
                  />
              )
            }
          </div>
        </div>
        {/** right column */}
        <div className={styles.rightColumn}>
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
      id
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
      }
    }

    # TODO: tutorials in this category
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
