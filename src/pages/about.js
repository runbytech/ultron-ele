import React from "react"
import { Link, graphql } from 'gatsby'


import Layout from '../components/layout'
import Container from "../components/container"

const About = ({data}) => (
  <Layout>
    <Container>
      <h1 style={{paddingTop: `1.45rem`}}>Hi this is about page</h1>
      <p>Welcome to <span style={{color: '#0000FF', fontSize: '18px'}}>{data.site.siteMetadata.title}</span></p>
      <Link to="/">Go back to the homepage</Link>
    </Container>
  </Layout>
)

export default About

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

// export default () => (
//   <div style={{ color: `teal` }}>
//     <h1>About Gatsby</h1>
//     <p>Such wow. Very React.</p>
//   </div>
// )