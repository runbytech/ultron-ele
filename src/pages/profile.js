import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const ProfilePage = () => (
  <Layout>
    <SEO title="Profile" />
    <h1 style={{marginTop: `1.45rem`}}>Hi from the profile page</h1>
    <p>Welcome to page profile</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ProfilePage
