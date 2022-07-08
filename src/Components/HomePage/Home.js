import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import HomeHeader from "./HomeHeader/HomeHeader";
import Post from "../Post/Post";
import { Context } from "../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import 'firebase/compat/database';
import 'firebase/compat/app';
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
                setPostsData(data);
            });
    }, [post])

    function writeNewPost(date) {
        if(!date.iLiked){
            firestore.collection('post').doc(date.id).update({
                likesCount: date.likesCount + 1,
                iLiked: true
            })
        }else{
            firestore.collection('post').doc(date.id).update({
                likesCount: date.likesCount - 1,
                iLiked: false
            })
        }
    }

    if(loading){
        return <PreLoader />
    }

    let date = postsData.map((item, i) => <Post key={i} {...item} func={writeNewPost} />).reverse()

    return (
        <div className="main__home home">
            <HomeHeader />
            <NewPost />
            <div className="home__posts">
                {date}
            </div>
        </div>
    )
}

export default HomePage;