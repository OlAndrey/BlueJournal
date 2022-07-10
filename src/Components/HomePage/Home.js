import React from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import HomeHeader from "./HomeHeader/HomeHeader";
import Posts from "../Posts/Posts";


const HomePage = (props) => {
    return (
        <div className="main__home home">
            <HomeHeader />
            <NewPost />
            <Posts />
        </div>
    )
}

export default HomePage;