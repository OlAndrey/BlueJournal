import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { Context } from "../..";
import Post from "../Post/Post";
import PreLoader from "../PreLoader/PreLoader";

const Likes = () => {
    const {firestore} = useContext(Context);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth); 
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [postsData, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )
    const [resultPosts, setResultPosts] = useState([]);

    useEffect(() => {
        if(postsData)
           setResultPosts(postsData.filter((val) => val.whoLikes.includes(user.uid))) 
    }, [postsData])

    if(loading) 
        return <PreLoader /> 

    return (
        <div className="home__posts w-100">
            {
            resultPosts.length
                ?resultPosts
                    .sort((a,b) => b.postId - a.postId)
                    .map((item, i) => <Post key={i} {...item} myId={user.uid} users={users} />)
                :<div className="h-75 d-flex justify-content-center">
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <h3>You don't have likes posts!</h3>
                        <Link to={"../users"} className="btn btn-primary text-center">See posts</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Likes;