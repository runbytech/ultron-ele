import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
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
      <>
        <Header 
          siteTitle={data.site.siteMetadata.title} 
          siteLogo={data.site.siteMetadata.logoImg} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1200,
            padding: `0px 1rem 1rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer
            style={{
              margin: `4em auto`,
              textAlign: `center`
            }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://runbytech.co">Runbytech</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
