import React from 'react'
import styles from '../styles/Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>サイドバー</h2>
      <ul>
        <li>ホーム</li>
        <li>プロフィール</li>
        <li>設定</li>
      </ul>
    </div>
  )
}

export default Sidebar