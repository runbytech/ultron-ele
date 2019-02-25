/**
 * @2019/02/02
 */
import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Gallery from '../components/gallery'
import Tutorials from '../components/tutorials'
import {saveCategory} from '../utils/cache'

const IndexPage = ({data}) => { 

  const { categories, tutorials } = data
  
  console.log(categories);
  // console.log(tutorials)

  // TODO: Need to cache something like category and its slug?
  categories.frontmatter.categories.map(
    c => {
      console.log(c)
      saveCategory(c.path, c.name, c.cover)
    }
  )
  
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `elms`, `elearning`]} />
      
      <h3 style={{paddingTop: `1.45rem`}}>Topics and Skills</h3>
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
    # this is obsolete @2019/02/20
    # categories: file(relativePath: { regex: "/index-gallery/" }) {
    #   childDataYaml {
    #     categories {
    #       name
    #       path
    #       cover
    #     }
    #   }
    # }
    # query content/category/categories.md
    categories: markdownRemark(fields: { slug: { eq: "/categories/" } }) {
      frontmatter {
        categories {
          cover {
            childImageSharp {
              fluid(maxWidth: 345){
                ...GatsbyImageSharpFluid
              }
            }
          }
          path
          name
        }
      }
    }
    # query latest tutorials files
    tutorials: allMarkdownRemark(
      filter: {frontmatter: {title: {ne: ""}, tutorial: {ne: null}}},
      sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              cover {
                childImageSharp {
                  fluid(maxWidth: 250, maxHeight: 100){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              tutorial
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }


  }
`
