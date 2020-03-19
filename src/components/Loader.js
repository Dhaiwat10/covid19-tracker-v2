import React from "react"
import styles from "./Loader.module.css"

export default () => (
  <div style={{ height: "100vh", textAlign: "center" }}>
    <div className={styles.loader}></div>
  </div>
)
