/**
 * the latest tutorials in homepage
 * 
 * @2019/02/01
 */
import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import styles from '../style/tutorials.module.css'
import tstyle from '../style/timeline.module.css'
import { groupTutorials, } from '../utils/helper'


// TODO, default to point to the first section of the tutorial
const TutHeadCard = ({cover, tutorial, path}) => (
  <div className={styles.tutHeadCard}>
    <Image fluid={cover.childImageSharp.fluid}/>
    <div className={styles.tutHeadFooter}>
      <Link to={path} style={{textDecoration: `none`, display: `block`}}>
        <h3 className={styles.tutHeadTitle}>
          {tutorial}
        </h3>
      </Link>
    </div>
  </div>
)

const Step = ({title, subtitle}) => (
  <li>
    <p className={tstyle.greyP}>
      <strong className={tstyle.library}>{title}</strong>
      <br/>
      {subtitle}
    </p>
  </li> 
)

const TutStepLine = ({sections}) => {
  // console.log(sections);

  return <ul className={tstyle.timeline}>
          {sections && 
            sections.map(
              node => 
                <Step 
                  key={node.node.fields.slug}
                  title={node.node.frontmatter.title}
                  subtitle={node.node.frontmatter.date}
                  />
            )}
         </ul>
}


// latest 4 tutorials
const Tutorials = ({data}) => { 
  
  const fourBlank = Array(4).fill(false)
  const groups = groupTutorials(data.edges)
  const fourLatest = groups.slice(0, 3)
  fourLatest.map((e,i) => fourBlank[i] = e)  
  // console.log(fourBlank)

  return (
    <div className={styles.tutorialsColumn}>
      {fourBlank.map(
        (o, i) => 
        <div className={styles.column} key={i}>
          {o && 
            (<>
              <TutHeadCard
                cover={o.cover}
                tutorial={o.tutori}
                path={o.slug}
              />
              <TutStepLine sections={o.sections} />
            </>)
          }
        </div>
      )}
    </div>
  )
}

export default Tutorials