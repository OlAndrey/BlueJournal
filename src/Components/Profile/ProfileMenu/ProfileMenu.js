import React from "react";
import { Link } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = (props) =>{
    return (
        <ul className="profile-menu">
            <li className="profile__item">
                <Link to="/home" className="profile__link">
                    Home
                </Link>
            </li>
            <li className="profile__item">
                <Link to="/profile" className="profile__link">
                    About
                </Link>
            </li>
            <li className="profile__item">
                <Link to="#" className="profile__link">
                    Photos
                </Link>
            </li>
            <li className="profile__item">
                <Link to="#" className="profile__link">
                    Likes
                </Link>
            </li>
            <li className="profile__item">
                <Link to="#" className="profile__link">
                    Posts
                </Link>
            </li>
        </ul>
    )
}

export default ProfileMenu;