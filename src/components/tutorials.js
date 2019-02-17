/**
 * @2019/02/01
 */
import React from 'react'
import { Link } from 'gatsby'

import styles from '../style/tutorials.module.css'
import tstyle from '../style/timeline.module.css'

const TutHeadCard = ({image, tutorial, path}) => (
  <div className={styles.tutHeadCard}>
    <img className={styles.tutHeadImg} src={image} alt=''/>
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
  console.log(sections);

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
    groups.push({tutori: title, sections: tutorialDict[title]}))

  return groups
}

const Tutorials = ({data}) => { 
  
  const groups = groupTutorials(data.edges)
  console.log(groups)

  return (
    <div className={styles.tutorialsColumn}>
      {/** 1st column */}
      <div className={styles.column}>
        
        {groups[0] && 
          (<>
            <TutHeadCard 
            image="/img/chamuditha-dilhan-1335612-unsplash-278x120.png"
            tutorial={groups[0].tutori}
            />
            <TutStepLine sections={groups[0].sections} />
           </>)
        }

      </div>
      {/** 2cd column */}
      <div className={styles.column}>
        
        {groups[1] && 
          (<>
            <TutHeadCard 
            image="/img/dose-juice-1184457-278x120.png"
            tutorial={groups[1].tutori}
            />
            <TutStepLine sections={groups[1].sections} />
           </>)
        }

      </div>
      {/** 3rd column */}
      <div className={styles.column}>
        
        <TutHeadCard image="/img/bence-balla-schottner-1332731-270x120.png" />
        <TutStepLine />
      </div>
      {/** 4rt column */}
      <div className={styles.column}>
        
        <TutHeadCard image="/img/martin-sanchez-253914-278x120.png" />
        <TutStepLine />
      </div>
      {/** end of column */}
    </div>
  )
}

export default Tutorials