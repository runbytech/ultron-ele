import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Button from '../components/button'

import styles from '../style/profile.module.css'


const ProfileSection = () => (
  <>
    <h3 className={styles.secTitle}>My Profile</h3>
    <hr/>
    <div className={styles.inputGroup}>
      <h4 className={styles.fieldTitle}>Name</h4>
      <input name="name" type="text" className={styles.formControl} />
    </div>
    <div className={styles.inputGroup}>
      <h4 className={styles.fieldTitle}>Email</h4>
      <input name="email" type="text" className={styles.formControl} />
    </div>
    <div className={styles.btnRow}>
      <Button onClick={()=>{console.log('save the user...')}} >Save</Button>
    </div>
  </>
)

const LearningPathSection = () => (
  <>
    <h3 className={styles.secTitle}>Learning Path</h3>
    <hr/>
  </>
)

const TestReptSection = () => (
  <>
    <h3 className={styles.secTitle}>Test Reports</h3>
    <hr/>
  </>
)
const CertificateSection = () => (
  <>
    <h3 className={styles.secTitle}>Certificates</h3>
    <hr/>
  </>
)
const FavoritesSection = () => (
  <>
    <h3 className={styles.secTitle}>Favorites</h3>
    <hr/>
  </>
)
const SettingsSection = () => (
  <>
    <h3 className={styles.secTitle}>Settings</h3>
    <hr/>
  </>
)


class ProfilePageRC extends React.Component {

    constructor(props) {
      super(props)
    
      this.state = {section: 'profile'}; // initial state
      this.changeSection = this.changeSection.bind(this)
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
