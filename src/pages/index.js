/**
 * @2019/02/02
 */
import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Gallery from '../components/gallery'
import Tutorials from '../components/tutorials'

const IndexPage = ({data}) => { 

  const { categories, tutorials } = data

  // console.log(categories);
  // console.log(tutorials)
  
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `elms`, `elearning`]} />
      
      <h3 style={{marginTop: `1.45rem`}}>Topics and Skills</h3>
      {/** category galery */}
      <Gallery data={categories} />
      {/** latest tutorials */}
      <h3>Start your journey</h3>
      <Tutorials data={tutorials} />

    </Layout>
  )
}

export default IndexPage


export const IndexQuery = graphql`
  query IndexQuery {
    
    categories: file(relativePath: { regex: "/index-gallery/" }) {
      childDataYaml {
        categories {
          name
          path
          cover
        }
      }
    }

    tutorials: allMarkdownRemark(
      filter: {frontmatter: {title: {ne: ""}, tutorial: {ne: null}}},
      sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tutorial
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }


  }
`
