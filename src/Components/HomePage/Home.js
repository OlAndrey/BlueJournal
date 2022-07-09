import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import HomeHeader from "./HomeHeader/HomeHeader";
import Post from "../Post/Post";
import { Context } from "../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import PreLoader from "../PreLoader/PreLoader";


const HomePage = (props) => {
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

    let date = postsData
        .map((item, i) => <Post key={i} {...item} />)
        .sort((a,b) => b.props.postId - a.props.postId)
 
    return (
        <div className="main__home home">
            {/* <HomeHeader />
            <NewPost /> */}
            <div className="home__posts">
                {date[0]}
            </div>
        </div>
    )
}

export default HomePage;