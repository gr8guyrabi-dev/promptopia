import React from 'react'

import PromptCard from './PromptCard'

const Profile = ({ name, desc, userData, handleEditClick, handleDeleteClick, }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {name} Profile
                </span>
            </h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-15 prompt_layout">
                {
                    userData?.prompts?.map(post => {
                        post = {
                            ...post,
                            creator: {
                                _id: userData._id,
                                username: userData.username,
                                email: userData.email,
                                image: userData.image,
                            }
                        }
                        return (
                            <PromptCard 
                                key={post._id}
                                post={post}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            />
                        )}
                    )
                }
            </div>
        </section>
    )
}

export default Profile