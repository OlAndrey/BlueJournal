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
                    My profile
                </Link>
            </li>
            <li className="profile__item">
                <Link to="/users" className="profile__link">
                    Users
                </Link>
            </li>
            <li className="profile__item">
                <Link to="/likes" className="profile__link">
                    Likes
                </Link>
            </li>
            <li className="profile__item">
                <Link to="/my-post" className="profile__link">
                    My posts
                </Link>
            </li>
        </ul>
    )
}

export default ProfileMenu;