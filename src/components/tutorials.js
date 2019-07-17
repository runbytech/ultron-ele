/**
 * the latest tutorials in homepage
 * @2019/02/01
 * 
 * add responsive layout support
 * @2019/05/30
 */
import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import styles from '../style/tutorials.module.css'
import tstyle from '../style/timeline.module.css'
import { groupTutorials, } from '../utils/helper'


// Default to point to the first section of the tutorial
const TutHeadCard = ({cover, tutorial, path, date}) => (
  <div className={styles.tutHeadCard}>
    <Link to={path} style={{textDecoration: `none`, display: `block`}}>
      <Image fluid={cover.childImageSharp.fluid}/>
      <div className={styles.tutHeadFooter}>
        <h3 className={`${styles.tutHeadTitle} tut-head-resp`}>
          {tutorial}
        </h3>
        <p className={styles.tutHeadDate}>{date}</p>
      </div>
    </Link>
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

  return (<ul className={tstyle.timeline}>
          {sections && 
            sections.map(
              node => 
                <Step 
                  key={node.node.fields.slug}
                  title={node.node.frontmatter.title}
                  subtitle={node.node.frontmatter.date}
                />
            )}
         </ul>)
}

// latest ten tutorials @2019/05/29
export const TutorialList = ({data}) => {
  const groups = groupTutorials(data.edges)
  
  return (
    <div style={{display:'flex', minHeight:'400px', flexDirection:'column', marginTop: '10px'}}>
      {
        groups.map(
          (o, i) => 
            <TutHeadCard key={i} 
              cover={o.cover}
              tutorial={o.tutori}
              path={o.slug}
              date={o.date}
            />
        )
      }  
    </div>
  )
}


// latest 4 tutorials
const Tutorials = ({data}) => { 
  
  const fourBlank = Array(4).fill(false)
  const groups = groupTutorials(data.edges)

  const fourLatest = groups.slice(0, 4)
  fourLatest.map((e,i) => fourBlank[i] = e)

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
                date={o.date}
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