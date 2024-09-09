import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
    if (authError) {
      console.error('Error signing up:', authError)
      return
    }

    if (authData.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          username: email.split('@')[0] || `user_${authData.user.id.substring(0, 8)}`,
          display_name: authData.user.user_metadata.full_name || null,
          avatar_url: authData.user.user_metadata.avatar_url || null,
        })

      if (insertError) {
        console.error('Error creating user record:', insertError)
      } else {
        console.log('User signed up and record created successfully')
        router.push('/')
      }
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.error(error)
    router.push('/')
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleSignIn}>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}