/**
 * profile section in user center
 * 
 * @2019/02/27
 */
import React from 'react';
import Button from '../components/button'
import { saveUser, getUser } from '../utils/cache'

import styles from '../style/profile.module.css'

export default class ProfileSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      title: 'My Profile',
      name: '',
      email:''
    }
    this.saveUser = this.saveUser.bind(this)
    this.changeNameHandler = this.changeNameHandler.bind(this)
    this.changeEmailHandler= this.changeEmailHandler.bind(this)
  }

  componentDidMount() {
    let user = getUser()
    console.log(user)
    if(user){
      this.setState({
        title: 'Welcome',
        name : user.userName,
        email: user.userEmail
      })
    }
  }

  componentDidUpdate() {
    console.log('updated!')
  }

  changeNameHandler(e) {
    this.setState({name: e.currentTarget.value})
  }

  changeEmailHandler(e) {
    this.setState({email: e.currentTarget.value})
  }

  saveUser() {
    if(this.state.name && this.state.email){
      saveUser(this.state.name, this.state.email)
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
        <div className={styles.btnRow}>
          <Button onClick={this.saveUser} >Save</Button>
        </div>          
      </div>
    )
  }
  

}
