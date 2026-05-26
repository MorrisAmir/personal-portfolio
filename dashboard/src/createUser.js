// One-time script to create the admin user via Firebase Auth (email/password)
// Usage (in browser while dev server running):
//    await import('/src/createUser.js').then(m => m.createUserOneTime())
// After success, delete this file for security.

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

export async function createUserOneTime(){
  const email = 'morris@portfolio.com'
  const password = 'Morris@2025'
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log('User created:', userCredential.user)
    return userCredential
  }catch(err){
    console.error('Failed to create user:', err)
    throw err
  }
}
