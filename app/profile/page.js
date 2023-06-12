"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = () => {

    const [userData, setUserData] = useState([])
    const { data: session } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`/api/users/${searchParams.get('creator_id') || session?.user?.id}/posts`)

            if (!response.ok) router.push('/')
            
            const data = await response.json()
            setUserData(data[0])
        }
        if (session?.user?.id || searchParams.get('creator_id')) {
            fetchUserData()
        }
    }, [])

    const handleEditClick = (post_id) => {
        router.push(`/update-prompt?prompt_id=${post_id.toString()}`)
    }

    const handleDeleteClick = async (post_id) => {
        const confirmStatus = confirm('Are you sure you want to delete this prompt?')

        if (!confirmStatus) return
        try {
            const response = await fetch(`/api/prompt/${post_id.toString()}`, { 
                method: 'DELETE',
            })
            
            if (!response.ok) router.push(`/profile`)

            const filteredPosts = userData.filter(post => post._id !== post_id)
            setUserData(filteredPosts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Profile
            name={session?.user.id === userData._id ? "My" : userData.username}
            desc="Welcome to your personalized profile page"
            userData={userData}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
        />
    )
}

export default UserProfile