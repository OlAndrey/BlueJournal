import { DIALOGS_ROUTE, DIALOG_ROUTE, FRIENDS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE, PROFILE_ME_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from "./utils/consts";
import LogInContainer from './Components/LogIn/LoginContainer';
import CentralBlock from './Components/CentralBlock/CentralBlock';
import Posts from "./Components/Posts/Posts";
import HomePage from "./Components/HomePage/Home";
import ProfileMe from "./Components/Profile/ProfileMe";
import ProfileOther from "./Components/Profile/ProfileOther";
import Users from "./Components/Users/Users";
import Dialog from "./Components/Dialog/index";
import Dialogs from "./Components/Dialogs/Dialogs";
import Friends from "./Components/Users/Friends";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <LogInContainer />
    }
]

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        component: <CentralBlock element={<HomePage />} />
    },
    {
        path: POST_ROUTE,
        component: <CentralBlock element={<Posts />} />
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
        component: <CentralBlock element={<Users />} />
    },
    {
        path: FRIENDS_ROUTE,
        component: <CentralBlock element={<Friends />} />
    },
    {
        path: DIALOGS_ROUTE,
        component: <CentralBlock element={<Dialogs />} />
    },
    {
        path: DIALOG_ROUTE,
        component: <CentralBlock element={<Dialog />} />
    }
]