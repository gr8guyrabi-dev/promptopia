"use client"

import Form from '@components/Form'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'


const UpdatePrompt = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    const searchParams = useSearchParams()
    const prompt_id = searchParams.get('prompt_id')
    
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${prompt_id}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                 tag: data.tag
            })
        }
        
        if (prompt_id) getPromptDetails()
       
    }, [prompt_id])
    
    if (!session || session?.user._id !== post.creator) router.push('/')


    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${prompt_id}`, { 
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (!request.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            handleSubmit={updatePrompt}
            submitting={submitting}
        />
    )
}

export default UpdatePrompt