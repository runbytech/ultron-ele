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

// TODO, default to point to the first section of the tutorial
const TutHeadCard = ({cover, tutorial, path}) => (
  <div className={styles.tutHeadCard}>
    <Image fluid={cover.childImageSharp.fluid}/>
    <div className={styles.tutHeadFooter}>
      <Link to="/tutorial" style={{textDecoration: `none`, display: `block`}}>
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


const groupTutorials = edges => {
  // console.log(edges)
  let tutorialTitles = []
  let tutorialDict = {}
  let title
  edges.forEach(edge => {
    title = edge.node.frontmatter.tutorial
    if(!tutorialTitles.includes(title)) { // check exist
      tutorialTitles.push(title)
      tutorialDict[title] = [edge]
    }else{
      tutorialDict[title].splice(0, 0, edge) // insert to first
    }
  })

  let groups = []
  tutorialTitles.forEach(title => 
    groups.push({
      cover   : tutorialDict[title][0].node.frontmatter.cover,
      tutori  : title, 
      sections: tutorialDict[title]
    }))

  return groups
}

// latest 4 tutorials
const Tutorials = ({data}) => { 
  
  const fourBlank = Array(4).fill(false)
  const groups = groupTutorials(data.edges)
  const fourLatest = groups.slice(0, 3)
  fourLatest.map((e,i) => fourBlank[i] = e)  
  console.log(fourBlank)

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