import React from "react";
import "./Home.css";
import NewPost from "../NewPost/NewPost";
import HomeHeader from "./HomeHeader/HomeHeader";
import { Route, Routes } from "react-router-dom";
import Posts from "../Posts/Posts";


const HomePage = (props) => {
    return (
        <div className="main__home home">
            <Routes>
            <Route path="/home/*" element={[<HomeHeader key={23465587} />, <NewPost key={23465588} />]} exact />
            </Routes>
            <div className="home__posts">
                <Routes>
                    <Route path="/home/*" element={<Posts />} exact/>
                    <Route path="/post/:param" element={<Posts />} />
                </Routes>
            </div>
        </div>
    )
}

export default HomePage;