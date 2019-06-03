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
import { reorderforCateHead } from '../utils/helper'


const navBtnStyle = {
  position:'absolute', top:'80px', padding:'10px', fontSize:'18px'
}

const Swiper = ({data}) => {

  // dynamic assign
  let reactSwipeEl = null
  const categories = reorderforCateHead(data.edges)
  
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
        style={{left:'10px', ...navBtnStyle}}
        className={btnStyles.transParentBtn}>
        &lt;&lt;
      </button>
      <button 
        onClick={() => reactSwipeEl.next()} 
        style={{right:'10px', ...navBtnStyle}}
        className={btnStyles.transParentBtn}>
        &gt;&gt;
      </button>
    </div>
  )  

}

export default Swiper
