import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [showEmojis, setShowEmojis] = useState(false) // 状態を追加

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setPosts(data)
    const user = await supabase.auth.getUser()
    console.log("user",user)
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.error('User not authenticated')
      return
    }
    const { data, error } = await supabase
      .from('posts')
      .insert({ content, user_id: user.id })
    if (error) console.error(error)
    else {
      setContent('')
      fetchPosts()
    }
  }

  const handleClear = () => {
    setContent('')
  }

  const toggleEmojiPicker = () => {
    setShowEmojis(!showEmojis)
  }

  const insertEmoji = (emoji: string) => {
    setContent(content + emoji)
    setShowEmojis(false)
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <button onClick={toggleEmojiPicker} className={`${styles.button} ${styles.emojiButton}`}>😊</button>
        {showEmojis && (
          <div className={styles.emojiPicker}>
            <button onClick={() => insertEmoji('😀')}>😀</button>
            <button onClick={() => insertEmoji('😂')}>😂</button>
            <button onClick={() => insertEmoji('😍')}>😍</button>
            <button onClick={() => insertEmoji('👍')}>👍</button>
          </div>
        )}
        <form onSubmit={handlePost} className={styles.form}>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
          />
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Post</button>
          <button type="button" onClick={handleClear} className={`${styles.button} ${styles.clearButton}`}>Clear</button>
        </form>
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>{post.content}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}