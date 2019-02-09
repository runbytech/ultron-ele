import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import '../style/global.css'
import '../style/theme.module.css'
import styles from '../style/layout.module.css'

const Layout = ({ children, nofoot, fullwidth }) => (
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
      <div className={styles.background}>
        <Header 
          siteTitle={data.site.siteMetadata.title} 
          siteLogo={data.site.siteMetadata.logoImg} />
        <div className={!!fullwidth? styles.fullWidth:styles.layout}>
          {children}
          {!nofoot && <Footer />}
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
