import { HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE, PROFILE_ROUTE } from "./utils/consts";
import LogInContainer from './Components/LogIn/LoginContainer';
import CentralBlock from './Components/CentralBlock/CentralBlock';
import Posts from "./Components/Posts/Posts";
import HomePage from "./Components/HomePage/Home";
import Profile from "./Components/Profile/Profile";


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
        path: PROFILE_ROUTE,
        component: <Profile />
    }
]