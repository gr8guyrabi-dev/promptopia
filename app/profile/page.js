"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = () => {

    const [userPosts, setUserPosts] = useState([])
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`)
            const data = await response.json()
            setUserPosts(data)
        }
        if (session?.user?.id) {
            fetchUserPosts()
        }
    }, [])
    

    const handleEditClick = (post_id) => {
        router.push(`/update-prompt?prompt_id=${post_id.toString()}`)
        console.log('hello')
    }

    const handleDeleteClick = async (post_id) => {
        const confirmStatus = confirm('Are you sure you want to delete this prompt?')
        
        if (!confirmStatus) return
        try {
            const response = await fetch(`/api/prompt/${post_id.toString()}`, { 
                method: 'DELETE',
            })
            
            if (!response.ok) router.push(`/profile`)

            const filteredPosts = userPosts.filter(post => post._id !== post_id)
            setUserPosts(filteredPosts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={userPosts}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
        />
    )
}

export default UserProfile