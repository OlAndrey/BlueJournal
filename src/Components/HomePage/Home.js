import React, { useContext } from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import HomeHeader from "./HomeHeader/HomeHeader";
import Post from "../Post/Post";
import { Context } from "../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from 'firebase/compat/app';
import PreLoader from "../PreLoader/PreLoader";

const HomePage = (props) => {
    const {firestore} = useContext(Context);
    const [post, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )

    if(loading){
        return <PreLoader />
    }

    let date = post.map((item, i) => <Post key={i} 
        createdAt={item.createdAt.toDate()} 
        postText={item.postText}
        likesCount={item.likesCount}
        comentCount={item.comentCount}
        returnCount={item.returnCount} />)

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