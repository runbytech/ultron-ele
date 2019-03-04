/**
 * quiz result table to list:
 * tutorial, time consume, level, complete time, action(delete)
 * @2019/03/02
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
    const quizs = getUserQuizs(user.userName)
    
    this.setState({quizs})
  }

  componentDidMount() {

  }

  deleteQuiz(slug) {
    let user = getUser()
    deleteQuiz(user.userName, slug)
    const quizs = getUserQuizs(user.userName)
    this.setState({quizs})
  }
  
  render() {
    

    return (
      <>
        <h3 className={styles.secTitle}>Test Reports</h3>
        <hr/>
        <table >
          <thead >
            <tr>
              <th>Tutorial</th>
              <th>Consumption</th>
              <th>Level</th>
              <th>Completion</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.quizs &&
              this.state.quizs.map(q => 
                <tr key={q.slug}>
                  <td>{q.title}</td>
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
          </tbody>
        </table>
      </>
    )
  }

 }