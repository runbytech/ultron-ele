/**
 * category gallery in homepage which points to each category
 * 
 * @2019/01/31, first create
 * @2019/03/04, use new index.md data from each category
 */
import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import styles from '../style/gallery.module.css'


const CategoryCard = ({cover, url, isMain, title, type}) => (
  <Link to={url} className={styles.darkenLink} 
    style={{height: isMain?"328px":"150px", overflow: "hidden"}}
    >
    <Image fluid={cover.childImageSharp.fluid} style={{height: "100%"}}/>
    <h4 className={isMain?styles.mainCategoryTitle:styles.subCategoryTitle}>{title}</h4>
  </Link>
)

const Gallery = ({data}) => {

  let ctgs = [] // for gallery use
  let tempCates = data.edges
  tempCates.map((cat,i) => {// find the head
    if(cat.node.frontmatter.ishead) ctgs.push(cat)
  })
  tempCates.map((cat,i) => {// find the other
    if(!cat.node.frontmatter.ishead) ctgs.push(cat)
  })
 
  // TODO: @2019/03/04
  // 1. USE loop to declare ui; 
  // 2. extend to none fixed size category card;
  return (
      <div className={styles.gallery}>
        {/** 1st column is main card */}
        <div className={styles.cateColumn}>
          {ctgs[0] && 
              <CategoryCard 
                isMain={true} 
                url={ctgs[0].node.fields.slug} 
                cover={ctgs[0].node.frontmatter.cover}
                title={ctgs[0].node.frontmatter.category}/>
          }
        </div>
        {/** 2st column */}
        <div className={styles.cateColumn}>
          <div className={styles.cateColumnRowTop}>
            {ctgs[1] && 
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[1].node.fields.slug}
                  cover={ctgs[1].node.frontmatter.cover}
                  title={ctgs[1].node.frontmatter.category} type="ds"/>
            }
          </div>
          <div className={styles.cateColumnRow}>
            {ctgs[2] &&
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[2].node.fields.slug}
                  cover={ctgs[2].node.frontmatter.cover}
                  title={ctgs[2].node.frontmatter.category} type="ds"/>
            }
          </div>
        </div>
        {/** 3rd column*/}
        <div className={styles.cateColumn}>
          <div className={styles.cateColumnRowTop}>
            {ctgs[3] &&
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[3].node.fields.slug}
                  cover={ctgs[3].node.frontmatter.cover}
                  title={ctgs[3].node.frontmatter.category} type="ds"/>
            }
          </div>
          <div className={styles.cateColumnRow}>
            {ctgs[4] &&
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[4].node.fields.slug}
                  cover={ctgs[4].node.frontmatter.cover}
                  title={ctgs[4].node.frontmatter.category} type="ds"/>
            }
          </div>
        </div>
      </div>
  )
}

export default Gallery

