/**
 * user sections, switch menu to display
 */
import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import ProfileSection from '../sections/profileSection'
import LearningPathSection from '../sections/learnPathSection'
import TestReptSection from '../sections/testReptSection'
import CertificateSection from '../sections/certificateSection'
import { useMedia4804Comp } from '../hooks/useMedia480'
import * as minibus from '../utils/minibus'

import styles from '../style/profile.module.css'


const FavoritesSection = () => (
  <>
    <h3 className={styles.secTitle}>Favorites</h3>
    <hr/>
    <p>pending...</p>
  </>
)
const SettingsSection = () => (
  <>
    <h3 className={styles.secTitle}>Settings</h3>
    <hr/>
    <p>TODO:</p>
    <ul>
      <li>cache data management</li>
      <li>certificate template setting</li>
      <li>logout</li>
      <li>may be more</li>
    </ul>
  </>
)

const SectionItemMenu = ({name, label, section, callback}) => (
  <div className={section===name?
    `${styles.pcntrHilt} ultron-left-border`:styles.pcntrNml}
    onClick={()=>callback(name)}>{label}
  </div>
)

const sections = [
  {name:'profile', label:'Profile'},
  {name:'learningPath', label:'Learning Path'},
  {name:'testrept', label:'Test Reports'},
  {name:'certificates', label:'Certificates'},
  {name:'favorites', label:'Favorites'},
  {name:'settings', label:'Settings'},
]


class ProfilePageRC extends React.Component {

    constructor(props) {
      super(props)
    
      // this.state = {section: 'certificates'}; // initial state
      this.state = {
        section: 'profile',
        mobile: false, // add mobile screen check @2019/06/03
      }; // initial state
      this.changeSection = this.changeSection.bind(this)
    }

    componentWillMount() {
      const { location, data } = this.props
      const section = location.state?location.state.section:null
      if(section) this.changeSection(section)
      
      const mobile = useMedia4804Comp()
      if(mobile) this.setState({mobile:true})
    }

    changeSection(type) {
      this.setState({section: type})
    }


    render() {
      const { location, data } = this.props
      const { section } = this.state
      const pageClickHandler = () => {
        if(this.state.mobile) 
          minibus.dispatch(minibus.EVT_POST_CLICK)
      }

      return (
        <Layout onClick={pageClickHandler}>
          <SEO title="Profile" />
          
          <div className={`${styles.leftRightSection} left-right-resp`} >
      
            <div className={`${styles.leftPanel} visible`}>
              <div className={styles.pcntr} >Personal Center</div>
              {sections.map((s, i) => 
                    <SectionItemMenu key={i} 
                      name={s.name} label={s.label} section={section}
                      callback={this.changeSection}/>
              )}
            </div>

            <div className={`${styles.subModuleMenu} mob-flex`}>
              {sections.map((s, i) => 
                    <SectionItemMenu key={i} 
                      name={s.name} label={s.label} section={section}
                      callback={this.changeSection}/>
              )}            
            </div>
            
            <div className={`${styles.rightPanel} right-pnl-resp`}>
              {section===sections[0].name && <ProfileSection/> }
              {section===sections[1].name && <LearningPathSection/> }
              {section===sections[2].name && <TestReptSection/> }
              {section===sections[3].name && 
                <CertificateSection signiture={data.site.siteMetadata.signiture}/> }
              {section===sections[4].name && <FavoritesSection/> }
              {section===sections[5].name && <SettingsSection/> }
            </div>
      
          </div>
        </Layout>
    
      )
    };
       
}

export default ProfilePageRC

export const profileQuery = graphql`
  query siteQuery {
    site {
      siteMetadata {
        signiture
      }
    }
  }
`