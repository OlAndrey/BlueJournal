import React, { useContext, useEffect, useState } from "react";
import "./Posts.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import Post from "../Post/Post";
import PreLoader from "../PreLoader/PreLoader";
import { useParams } from "react-router-dom";

const Posts = (props) =>{
    let params = useParams();
    const {firestore} = useContext(Context);
    const [postsData, setPostsData] = useState([]);
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

    if(params.param){
        var selectPost = postsData.filter((val) => val.id === params.param)[0];
        return <Post {...selectPost} post={true}/>
    }

    let posts = postsData
        .sort((a,b) => b.postId - a.postId)
        .map((item, i) => <Post  key={i} {...item} />)

    return(
        <div className="home__posts">
            {posts}
        </div>
    )
}

export default Posts;