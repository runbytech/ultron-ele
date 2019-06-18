/**
 * quiz result table to list:
 * tutorial, time consume, level, complete time, action(delete)
 * @2019/03/02
 * 
 * add not quiz notice
 * @2019/06/03
 */

 import React from 'react';

 import { getUser, getUserQuizs, deleteQuiz } from '../utils/cache'
 
 import styles from '../style/profile.module.css'


 export default class TestReptSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      quizs: [] 
    };
    this.deleteQuiz = this.deleteQuiz.bind(this)
  };

  componentWillMount() {
    let user = getUser()
    if(!user) return //FIXME: null check in build mode @2019/04/24

    const quizs = getUserQuizs(user.userName)
    this.setState({quizs})
  }

  deleteQuiz(slug) {
    let user = getUser()
    if(!user) return //FIXME: null check in build mode @2019/04/24

    deleteQuiz(user.userName, slug)
    const quizs = getUserQuizs(user.userName)
    this.setState({quizs})
  }
  
  render() {
    
    return (
      <>
        <h3 className={styles.secTitle}>Test Reports</h3>
        <hr/>
        <table style={{background:'#FFF'}}>
          <thead >
            <tr>
              <th style={{paddingLeft:'10px'}}>Tutorial</th>
              <th>Consumption</th>
              <th>Level</th>
              <th>Completion</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.quizs &&
              this.state.quizs.map((q,i) => 
                <tr key={i}>
                  <td style={{paddingLeft:'10px'}}>{q.title}</td>
                  <td>{Math.floor(q.duration/1000)}s</td>
                  <td>{q.level}</td>
                  <td>{(q.completion).split('T')[0]}</td>
                  <td>
                    <button 
                      className={styles.delBtn}
                      onClick={()=> this.deleteQuiz(q.slug)}
                    >Delete</button>
                  </td>
                </tr>
              )
            }
            {!this.state.quizs && 
              <tr>
                <td colSpan="2" style={{paddingLeft:'10px'}}>
                  No quiz you took! 
                </td>
              </tr>
            }
          </tbody>
        </table>
      </>
    )
  }

 }