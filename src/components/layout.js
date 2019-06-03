/**
 * Never try to transform this into a react component !!!
 * Keep it simple
 * 
 * @2019/02/27
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
// import Header from './headerFC'
import Footer from './footer'
import styles from '../style/layout.module.css'

const Layout = ({ children, nofoot, fullwidth, onClick }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            logoImg
            menus {
              name
              url
            }
          }
        }
      }
    `}
    render={data => (
      <div className={styles.background}>
        <Header 
          siteTitle={data.site.siteMetadata.title} 
          siteLogo={data.site.siteMetadata.logoImg} 
          menus={data.site.siteMetadata.menus}
          />
        <div 
          className={!!fullwidth? styles.fullWidth:styles.layout}
          onClick={onClick}>
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
