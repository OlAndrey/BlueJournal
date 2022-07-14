import React from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import Posts from "../Posts/Posts";


const HomePage = (props) => {
    return (
        <div className="main__home">
            <NewPost />
            <Posts />
        </div>
    )
}

export default HomePage;