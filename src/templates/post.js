import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import '../style/post.page.css'


const PandasPage = ({data, pageContext}) => (
  <Layout>
    <SEO title={data.markdownRemark.frontmatter.title} />
    <article>
      <Image 
        fluid={data.markdownRemark.frontmatter.cover.childImageSharp.fluid} 
        />
      <h1 style={{paddingTop: `1.45rem`}} className="title">
       {data.markdownRemark.frontmatter.title}
      </h1>
      <p className="date">
        Created at: {data.markdownRemark.frontmatter.date}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} 
        className="content"/>
    </article>
  </Layout>
)

export default PandasPage

// accept parameter from pageContext
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        cover {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

