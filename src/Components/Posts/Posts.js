import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import Post from "../Post/Post";
import PreLoader from "../PreLoader/PreLoader";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserByID } from "../../utils/getter";

const Posts = (props) => {
    let params = useParams();
    const {firestore} = useContext(Context);
    const [postsData, setPostsData] = useState([]);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth); 
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [post, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )
    
    useEffect(() => {
        let postsRef = firestore.collection('post')
        postsRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setPostsData(data)
            });
    }, [post])

    if(loading){
        return <PreLoader />
    }

    if(props.user){
        return postsData
            .filter((val) => val.userId === props.user.uid)
            .sort((a,b) => b.postId - a.postId)
            .map((item, i) => <Post key={i} {...item} user={props.user} logo={props.logo} />)
    }

    if(params.param){
        var selectPost = postsData.filter((val) => val.id === params.param)[0];
        return <Post {...selectPost} post={true} users={users}  />
    }
    let userData = getUserByID(users, user.uid)
    let posts = postsData
        .filter((val) => userData.Follow.includes(val.userId))
        .sort((a,b) => b.postId - a.postId)
        .map((item, i) => <Post  key={i} {...item} myId={user.uid} users={users} />)

    return(
        <div className="home__posts">
            {posts}
        </div>
    )
}

export default Posts;