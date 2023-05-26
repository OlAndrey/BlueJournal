import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import { getUserByID } from "../../utils/getter";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import PreLoader from "../PreLoader/PreLoader";

const MyPosts = () =>{
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [postsData, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )

    if(loading)
        return <PreLoader />

    let me = getUserByID(users, user.uid)
    let myPosts = postsData
                .filter((val) => val.userId === me.uid)
                .sort((a,b) => b.postId - a.postId)
    return (
        <div  className="main__home">
            <NewPost />
            {myPosts.length
                ?myPosts.map((item, i) => <Post key={i} {...item} myId={me.uid} user={me} />)
                :<h3 className="text-center m-4">You don't have posts!</h3>
            }
        </div>
    )
}

export default MyPosts;