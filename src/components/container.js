import React from "react"
import containerStyles from "../style/container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)