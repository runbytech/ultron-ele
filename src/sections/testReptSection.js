/**
 * quiz result table to list:
 * tutorial, time consume, level, complete time, action(delete)
 * @2019/03/02
 */

 import React from 'react';

 import { getUser, getUserQuizs } from '../utils/cache'
 
 import styles from '../style/profile.module.css'


 export default class TestReptSection extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    };
  };

  componentWillMount() {

  }

  componentDidMount() {

  }
  
  render() {
    let user = getUser()
    const quizs = getUserQuizs(user.userName)
    console.log(quizs)

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
            {quizs &&
              quizs.map((q,i) => 
                <tr key={i}>
                  <td>{q.title}</td>
                  <td>{Math.floor(q.duration/1000)}s</td>
                  <td>{q.level}</td>
                  <td>{(q.completion).split('T')[0]}</td>
                  <td>
                    <button className={styles.delBtn}>Delete</button>
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