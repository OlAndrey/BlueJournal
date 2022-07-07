import React from "react";
import "./HomeHeader.css"

const HomeHeader = (props) => {
    return (
        <div className="home__header">
            <div className="home__image">
                <img src="#" alt="Home image" />
            </div>
            <div className="home__menu">
                <div className="home__menu-item">
                    <button type="button">
                        Like
                    </button>
                    <button type="button">
                        Follow
                    </button>
                    <button type="button">
                        Share
                    </button>
                    <button type="button">
                        More
                    </button>
                </div>
                <div className="home__menu-item">
                    <button type="button">
                        Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;