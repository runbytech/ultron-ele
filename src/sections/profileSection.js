/**
 * profile section in user center
 * 
 * @2019/02/27, created
 * @2019/03/08, add fullname for certificate use.
 * 
 */
import React from 'react';
import Button from '../components/button'
import { saveUser, getUser } from '../utils/cache'

import styles from '../style/profile.module.css'

export default class ProfileSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      title:    'My Profile',
      name:     '',
      email:    '',
      fullname: ''
    }
    this.saveUser              = this.saveUser.bind(this)
    this.changeNameHandler     = this.changeNameHandler.bind(this)
    this.changeEmailHandler    = this.changeEmailHandler.bind(this)
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this)
  }

  componentDidMount() {
    let user = getUser()
    if(!user) return //FIXME: null check in build mode @2019/04/24

    this.setState({
      title: 'Welcome',
      name : user.userName,
      email: user.userEmail,
      fullname: user.fullName?user.fullName:''
    })
  }

  componentDidUpdate() {
    
  }

  changeNameHandler(e) {
    this.setState({name: e.currentTarget.value})
  }

  changeEmailHandler(e) {
    this.setState({email: e.currentTarget.value})
  }

  changeFullNameHandler(e) {
    this.setState({fullname: e.currentTarget.value})
  }

  saveUser() {
    if(this.state.name && this.state.email && this.state.fullname){
      saveUser(this.state.name, this.state.email, this.state.fullname)
      alert('Saved!')
    }else{
      alert('Fill in form first!')
    }
  }

  render() {
    return (
      <div>
        <h3 className={styles.secTitle}>{this.state.title}</h3>
        <hr/>
        <div className={styles.inputGroup}>
          <h4 className={styles.fieldTitle}>Name</h4>
          <input name="name" type="text" className={styles.formControl}
            onChange={this.changeNameHandler} value={this.state.name}/>
        </div>
        <div className={styles.inputGroup}>
          <h4 className={styles.fieldTitle}>Email</h4>
          <input name="email" type="text" className={styles.formControl}
            onChange={this.changeEmailHandler} value={this.state.email}/>
        </div>
        <div className={styles.inputGroup}>
          <h4 className={styles.fieldTitle}>FullName(certificate use)</h4>
          <input name="fullname" type="text" className={styles.formControl}
            onChange={this.changeFullNameHandler} value={this.state.fullname}/>
        </div>
        <div className={styles.btnRow}>
          <Button onClick={this.saveUser} >Save</Button>
        </div>          
      </div>
    )
  }
  

}
