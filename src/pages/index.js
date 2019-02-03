import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Gallery from '../components/gallery'
import Tutorials from '../components/tutorials'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `elms`, `elearning`]} />
    <h3>Topics and Skills</h3>
    {/** category galery */}
    <Gallery />

    <h3>Start your journey</h3>
    <Tutorials />

    
    {/** <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
