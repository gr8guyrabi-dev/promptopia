"use client"

import { useEffect, useState } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-15 prompt_layout">
            {
                data.map(post => (
                    <PromptCard 
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                ))
            }
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null)

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleTagClick = (tag) => {
        setSearchText(tag)
    }

    useEffect(() => {
        if (searchTimeout) clearTimeout(searchTimeout)
        const regex = new RegExp(searchText, 'i')

        //debounce method
        setSearchTimeout(
            setTimeout(() => {
                const filteredPosts = posts.filter(post => 
                    regex.test(post.creator.name) ||
                    regex.test(post.creator.email) ||
                    regex.test(post.prompt) ||
                    regex.test(post.tag) 
                )
                setFilteredPosts(filteredPosts)
            }, 500)
        )
    }, [searchText])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])
    
    let data = posts
    if (searchText) {
        data = filteredPosts
    }

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="Search for a tag or a username" 
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList 
                data={data}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed