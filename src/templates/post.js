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
import * as minibus from '../utils/minibus'
import { useMedia4804Comp } from '../hooks/useMedia480'
// import OnscrollBar from'../components/onscrollBar'
import OnscrollBar from'../components/onscrollBarFC'



export default class PostPage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      sidePanelDisplay: false,
      hasAnchors: false,  // no anchors naviation in post page
      mobile: false, // add mobile screen check @2019/05/31
    };
    this.scrollListener = this.scrollListener.bind(this)
  };

  componentWillMount() {
    const { data,} = this.props
    const anchors = data.markdownRemark.frontmatter.anchors
    if(anchors) this.setState({hasAnchors:true})

    const mobile = useMedia4804Comp()
    if(mobile) this.setState({mobile:true})
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
    // remove window scroll event listening
    if(this.scrollEvtRegistered)
      window.removeEventListener('scroll', this.scrollListener);
  }

  removePopupMenu = () => {
    if(this.state.mobile)
      return minibus.dispatch(minibus.EVT_POST_CLICK)
  }


  render() {

    const {data, pageContext, location} = this.props
    const fm = data.markdownRemark.frontmatter
    
    let anchors = data.markdownRemark.frontmatter.anchors
    // force to remove side panel in mobile screen @2019/05/31
    if(this.state.mobile) anchors = null

    return (
      <Layout fullwidth={true} nofoot={anchors}>
        <SEO title={fm.title} />
        <OnscrollBar top="63px" className="hori-progressbar"/>
        <div className="post" onClick={this.removePopupMenu}>
          <article>
            <Image 
              style={{height:'200px'}}
              fluid={fm.cover.childImageSharp.fluid} 
              />
            <h1 style={{paddingTop: `1.45rem`}} className="title resp">
              {fm.title}
            </h1>
            <p className="date resp">
              Created at: {fm.date}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} 
              className={`content resp ${this.state.sidePanelDisplay?'with-panel':''}`}
            />
          </article>

          {this.state.sidePanelDisplay && anchors &&
            <div className="side-panel" >
              <ul className="fixed">
                { 
                  anchors.map((a,i) => 
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

