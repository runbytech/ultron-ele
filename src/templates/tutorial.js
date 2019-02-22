/**
 * tutorial section template to show each tutorial section .md data
 * 
 * @2019/02/21
 */
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const TutorialPage = ({data, pageContext}) => {

  return (
    <Layout>
      <SEO title="page for tutorial" />
    
      <h1 style={{paddingTop: `1.45rem`}}>_this is tutorial page...</h1>

    </Layout>
  )
}

export default TutorialPage

// accept parameter from pageContext
export const pageQuery = graphql`
  query PageByTutorial($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
