/**
 * User template to display team members info
 * 
 * @2019/04/17
 */
import React  from "react"

import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import Container from '../components/container'
import SEO from '../components/seo'
import * as minibus from '../utils/minibus'
import useMedia480 from '../hooks/useMedia480'
import styles from '../style/user-css-modules.module.css'


const User = props => (
  <div className={styles.user}>
    <Image 
      fluid={props.avatar.childImageSharp.fluid}
      className={styles.avatar}
      />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

const UsersPage = ({location, data, pageContxt}) => {
  
  const {html, frontmatter:fm } = data.markdownRemark
  const mobile = useMedia480()
  const pageClickHandler = () => {
    if(mobile) minibus.dispatch(minibus.EVT_POST_CLICK)
  }

  return (
    <Layout>
      <SEO title={fm.title} />
      <Container 
        onClick={pageClickHandler}
        style={{padding:'10px'}}
        >
        <h1 style={{paddingTop: `1.45rem`}}>{fm.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {fm.users.map((u, i)=>
          <User key={i}
            username={u.username}
            avatar={u.avatar}
            excerpt={u.excerpt}
            />
          )
        }
      </Container>
    </Layout>
  )
}

export default UsersPage

// accept parameter from pageContext
export const pageQuery = graphql`
  query PageByUser($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        users {
          username
          avatar {
            childImageSharp {
              fluid(maxWidth: 200, maxHeight: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
