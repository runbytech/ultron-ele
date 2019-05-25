/**
 * navigation menu page template with side panel
 * render the .md file directly under content directory
 * 
 * @2019/04/15
 */
import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import '../style/post.page.css'


export default class PostPage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       sidePanelDisplay: false,
       hasAnchors: false  // no anchors naviation in post page
    };
    this.scrollListener = this.scrollListener.bind(this)
  };

  componentWillMount() {
    const { data,} = this.props
    const anchors = data.markdownRemark.frontmatter.anchors
    if(anchors) this.setState({hasAnchors:true})
  }

  scrollListener(evt) {
    let scrolled = document.documentElement.scrollTop
    if(scrolled > 200){
      if(!this.state.sidePanelDisplay)
        this.setState({sidePanelDisplay:true})
    }else{
      if(this.state.sidePanelDisplay)
        this.setState({sidePanelDisplay:false})
    }
  }
  
  componentDidMount() {
    const {data, pageContext, location} = this.props

    if(!this.state.hasAnchors) return
    // add window scroll event listening
    window.addEventListener('scroll', this.scrollListener);
    this.scrollEvtRegistered = true
  }

  componentWillUnmount() {
    // console.log('post will unmount...')
    // remove window scroll event listening
    if(this.scrollEvtRegistered)
      window.removeEventListener('scroll', this.scrollListener);
  }

  render() {

    const {data, pageContext, location} = this.props
    const anchors = data.markdownRemark.frontmatter.anchors

    return (
      <Layout fullwidth={true} nofoot={anchors}>
        <SEO title={data.markdownRemark.frontmatter.title} />
        <div className="post" >
          <article>
            <Image 
              fluid={data.markdownRemark.frontmatter.cover.childImageSharp.fluid} 
              />
            <h1 style={{paddingTop: `1.45rem`}} className="title">
            {data.markdownRemark.frontmatter.title}
            </h1>
            <p className="date">
              Created at: {data.markdownRemark.frontmatter.date}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} 
              className={`content ${this.state.sidePanelDisplay?'with-panel':''}`}/>
          </article>

          {this.state.sidePanelDisplay && anchors &&
            <div className="side-panel" >
              <ul className="fixed">
                { anchors.map((a,i) => 
                    <li key={i}><a href={a.goto} >{a.name}</a></li>
                  )
                }
              </ul>
            </div>
          }
        </div>        
    </Layout>
    )
  };

}

// accept parameter from pageContext
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        cover {
          childImageSharp {
            fluid(maxWidth: 1280, maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        anchors {
          name
          goto
        }
      }
    }
  }
`

