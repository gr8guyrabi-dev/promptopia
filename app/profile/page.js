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
    

    const handleEditClick = async (post) => {
        router.push(`/update-prompt?prompt_id=${post._id}`)
        console.log('hello')
    }

    const handleDeleteClick = async (post_id) => {
        console.log('hello')
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