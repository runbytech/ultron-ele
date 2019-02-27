/**
 * tutorial steps vertical line
 * 
 * @2019/02/25
 */

 import React from 'react';
 
 import { Link, graphql } from 'gatsby'

 import tstyle from '../style/timeline.module.css'

 
 const Step = ({title, subtitle, slug}) => (
  <li><Link to={slug} style={{textDecoration: 'none'}}>
    <p className={tstyle.greyP}>
      <strong className={tstyle.library}>{title}</strong>
      <br/>
      {subtitle}
    </p></Link>
  </li> 
)

const TutStepLine = ({sections}) => (
  <ul className={tstyle.timeline}>
    {
      sections &&
        sections.map((s, i)=>(
          <Step key={i}
            title={s.node.frontmatter.title}
            subtitle={s.node.frontmatter.date}
            slug={s.node.fields.slug}
          />
        ))
    }
  </ul>
)

export default TutStepLine