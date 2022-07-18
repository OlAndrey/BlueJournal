import React, { useContext } from "react";
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
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth); 
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [postsData, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )

    if(loading){
        return <PreLoader />
    }

    if(params.param){
        var selectPost = postsData.filter((val) => val.path === "post/" + params.param)[0];
        return <Post {...selectPost} post={true} myId={user.uid} users={users}  />
    }
    
    let userData = getUserByID(users, user.uid)
    let posts = postsData
        .filter((val) => userData.Follow.includes(val.userId))
        .sort((a,b) => b.postId - a.postId)
        .map((item, i) => <Post key={i} {...item} myId={user.uid} users={users} />)

    return(
        <div className="home__posts">
            {posts}
        </div>
    )
}

export default Posts;