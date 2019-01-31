import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const PandasPage = ({data, pageContext}) => (
  <Layout>
    <SEO title="Page Pandas" />
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <p>Create at: {data.markdownRemark.frontmatter.date}</p>
    
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)


export default PandasPage

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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

