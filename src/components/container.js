import React from "react"
import containerStyles from "../style/container.module.css"

export default ({ children, onClick, style }) => (
  <div 
    className={containerStyles.container}
    onClick={onClick}
    style={style}
    >
    {children}
  </div>
)