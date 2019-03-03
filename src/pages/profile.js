/**
 * user sections, switch menu to display
 */
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'
import ProfileSection from '../sections/profileSection'
import LearningPathSection from '../sections/learningPath'
import TestReptSection from '../sections/testReptSection'
import CertificateSection from '../sections/certificateSection'

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
    <p>todo...</p>
  </>
)


class ProfilePageRC extends React.Component {

    constructor(props) {
      super(props)
    
      this.state = {section: 'profile'}; // initial state
      this.changeSection = this.changeSection.bind(this)
    }

    componentWillMount() {
      const { location } = this.props
      
      const section = location.state.section
      if(section) this.changeSection(section)
    }

    changeSection(type) {
      this.setState({section: type})
    }

    render() {
      const {section} = this.state 
      console.log('current section: ', section)

      return (
        <Layout>
          <SEO title="Profile" />
          
          <div className={styles.leftRightSection} >
      
            <div className={styles.leftPanel}>
              <div className={styles.pcntr} >Personal Center</div>
              <div className={section==='profile'?styles.pcntrHilt:styles.pcntrNml}
                onClick={()=>this.changeSection('profile')}>Profile
              </div>
              <div className={section==='learningPath'?styles.pcntrHilt:styles.pcntrNml}
                onClick={()=>this.changeSection('learningPath')}>Learning Path
              </div>
              <div className={section==='testrept'?styles.pcntrHilt:styles.pcntrNml}
                onClick={()=>this.changeSection('testrept')}>Test Reports
              </div>
              <div className={section==='certificates'?styles.pcntrHilt:styles.pcntrNml}
                onClick={()=>this.changeSection('certificates')}>Certificates
              </div>
              <div className={section==='favorites'?styles.pcntrHilt:styles.pcntrNml}
                onClick={()=>this.changeSection('favorites')}>Favorites
              </div>
              <div className={section==='settings'?styles.pcntrHilt:styles.pcntrNml}
                onClick={()=>this.changeSection('settings')}>Settings
              </div>
            </div>
            
            <div className={styles.rightPanel}>
              {section==='profile' && <ProfileSection/> }
              {section==='learningPath' && <LearningPathSection/> }
              {section==='testrept' && <TestReptSection/> }
              {section==='certificates' && <CertificateSection/> }
              {section==='favorites' && <FavoritesSection/> }
              {section==='settings' && <SettingsSection/> }
            </div>
      
          </div>
        </Layout>
    
      )
    };
       
}

export default ProfilePageRC
