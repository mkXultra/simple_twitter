import React from 'react'
import styles from '../styles/Sidebar.module.css'
import { FaHome, FaUser, FaCog } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>サイドバー</h2>
      <ul>
        <li><FaHome /> ホーム</li>
        <li><FaUser /> プロフィール</li>
        <li><FaCog /> 設定</li>
      </ul>
    </div>
  )
}

export default Sidebar