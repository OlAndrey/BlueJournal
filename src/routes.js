import { Suspense, lazy } from "react";
import { DIALOGS_ROUTE, DIALOG_ROUTE, FRIENDS_ROUTE, HOME_ROUTE, LIKES_ROUTE, LOGIN_ROUTE, MY_POSTS_ROUTE, NEW_DIALOG_ROUTE, POST_ROUTE, PROFILE_ME_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from "./utils/consts";
import LogInContainer from './Components/LogIn/LoginContainer';
import Posts from "./Components/Posts/Posts";
import HomePage from "./Components/HomePage/Home";
import ProfileMe from "./Components/Profile/ProfileMe";
import ProfileOther from "./Components/Profile/ProfileOther";
import Dialog from "./Components/Dialog/index";
import Dialogs from "./Components/Dialogs/Dialogs";
import Friends from "./Components/Users/Friends";
import NewDialog from "./Components/NewDialog/NewDialog";
import MyPosts from "./Components/MyPosts/MyPosts";
import PreLoader from "./Components/PreLoader/PreLoader";

const Likes = lazy(() => import("./Components/Likes/Likes"))
const Users = lazy(() => import("./Components/Users/Users"))


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <LogInContainer />
    }
]

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        component: <HomePage /> 
    },
    {
        path: POST_ROUTE,
        component: <Posts />
    },
    {
        path: PROFILE_ME_ROUTE,
        component: <ProfileMe />
    },
    {
        path: PROFILE_ROUTE,
        component: <ProfileOther />
    },
    {
        path: USERS_ROUTE,
        component: <Suspense fallback={<PreLoader />}><Users /></Suspense>
    },
    {
        path: FRIENDS_ROUTE,
        component: <Friends />
    },
    {
        path: DIALOGS_ROUTE,
        component: <Dialogs />
    },
    {
        path: DIALOG_ROUTE,
        component: <Dialog />
    },
    {
        path: NEW_DIALOG_ROUTE,
        component: <NewDialog />
    },
    {
        path: LIKES_ROUTE,
        component: <Suspense fallback={<PreLoader />}><Likes /></Suspense>
    },
    {
        path: MY_POSTS_ROUTE,
        component: <MyPosts />
    }
]