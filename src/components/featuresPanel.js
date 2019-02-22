/**
 * @2019/02/21
 */
import React from 'react';

import look from '../style/feapnl.module.css';

const FeaturesPanel = ({features}) => (
  <div className={look.featuresPanel}>
    <div className={look.seprateItem}>
      <span className={look.alignRight}>Difficulty:</span>
      <span>{features.difficulty}</span>
    </div>
    <div className={look.seprateItem}>
      <span className={look.alignRight}>Audience:</span>
      <span>{features.audience}</span>
    </div>
    <div className={look.seprateItem}>
      <span className={look.alignRight}>Prerequisites:</span>
      <ul>
        {features.prerequisites &&
          features.prerequisites.map(
            (p,i)=> <li key={i}>{p}</li>
          )
        }
      </ul>
    </div>
    <div className={look.seprateItem}>
      <span className={look.alignRight}>Uwill learn:</span>
      <ul>
        {
          features.uwillearn &&
            features.uwillearn.map(
              (l,i)=> <li key={i}>{l}</li>
            )
        }
      </ul>
    </div>
  </div>
)

export default FeaturesPanel