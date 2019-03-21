import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const RoadmapPage = () => (
  <Layout>
    <SEO title="Page Roadmap" />
    
    <h1 style={{paddingTop: `1.45rem`}}>RoadmapPage</h1>
    <p>Welcome to RoadmapPage</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default RoadmapPage
