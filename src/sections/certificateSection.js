/**
 * certificate section
 * 
 * @2019/03/02
 */

import React from 'react';

import styles from '../style/profile.module.css'


export default class CertificateSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    };
  };

  componentWillMount() {

  }

  render() {
    return (
      <>
        <h3 className={styles.secTitle}>Certificates</h3>
        <hr/>
        <p>todo...</p> 
      </>
    )
  }
  

}