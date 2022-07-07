import React from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import HomeHeader from "./HomeHeader/HomeHeader";
import Post from "../Post/Post";

const HomePage = (props) => {
    return (
        <div className="main__home home">
            <HomeHeader />
            <NewPost />
            <div className="home__posts">
                <Post />
            </div>
        </div>
    )
}

export default HomePage;