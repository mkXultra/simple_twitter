import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

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
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('posts')
      .insert({ content, user_id: supabase.auth.user()?.id })
    if (error) console.error(error)
    else {
      setContent('')
      fetchPosts()
    }
  }

  return (
    <div>
      <form onSubmit={handlePost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.content}</div>
        ))}
      </div>
    </div>
  )
}