/**
 * tutorial steps vertical line
 * 
 * @2019/02/25
 * @2019/03/03, add color change when started
 * 
 */

 import React from 'react';
 
 import { Link, graphql } from 'gatsby'

 import tstyle from '../style/timeline.module.css'

 
 const Step = ({title, subtitle, slug, started}) => (
  <li><Link to={slug} style={{textDecoration: 'none'}}>
    <p className={tstyle.greyP}>
      <strong className={started? tstyle.started:tstyle.library}>
        {title}
      </strong>
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
            started={s.started}
          />
        ))
    }
  </ul>
)

export default TutStepLine