import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import '../style/layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            logoImg
          }
        }
      }
    `}
    render={data => (
      <div style={{backgroundColor: `#F5F5F5`}}>
        <Header 
          siteTitle={data.site.siteMetadata.title} 
          siteLogo={data.site.siteMetadata.logoImg} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1100,
            padding: `3.5rem 0rem 1rem`,
          }}
        >
          {children}
          <Footer />
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
