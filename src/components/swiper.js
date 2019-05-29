/**
 * category gallery use swiper component in mobile screen
 * 
 * @2019/05/28,29
 */
import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import ReactSwipe from 'react-swipe'

import Container from "./container"
import btnStyles from '../style/button.module.css'
import styles from '../style/gallery.module.css'



const Swiper = ({data}) => {

  const categories = data.edges
  // dynamic assign
  let reactSwipeEl = null

  return (
    <div style={{position:'relative'}}>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true }}
        ref={el => (reactSwipeEl = el)}
      >
      {
        categories.map(
          (cat, i) => 
            <div key={i} style={{height: `200px`, backgroundColor: `#333`}}>
              <Link 
                to={cat.node.fields.slug} className={styles.darkenLink} 
                style={{height:"100%", overflow: "hidden"}}
              >
                <Image 
                  fluid={cat.node.frontmatter.cover.childImageSharp.fluid} 
                  style={{height: "100%"}}/>
                <h4 className={styles.subCategoryTitle}>
                  {cat.node.frontmatter.category}
                </h4>
              </Link>
            </div>
        )
      }
      </ReactSwipe>
      <button 
        onClick={() => reactSwipeEl.prev()}
        style={{position:'absolute', left:'10px', top:'80px'}}
        className={btnStyles.transParentBtn}>
        &lt;&lt;
      </button>
      <button 
        onClick={() => reactSwipeEl.next()} 
        style={{position:'absolute', right:'10px', top:'80px'}}
        className={btnStyles.transParentBtn}>
        &gt;&gt;
      </button>
    </div>
  )  

}

export default Swiper
