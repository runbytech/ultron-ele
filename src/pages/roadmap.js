import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const RoadmapPage = () => (
  <Layout>
    <SEO title="Page RoadmapPage" />
    
    <h1 style={{marginTop: `1.45rem`}}>Hi from the RoadmapPage</h1>
    <p>Welcome to RoadmapPage</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default RoadmapPage
