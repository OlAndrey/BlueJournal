import { HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE } from "./utils/consts";
import LogInContainer from './Components/LogIn/LoginContainer';
import CentralBlock from './Components/CentralBlock/CentralBlock';
import Posts from "./Components/Posts/Posts";
import HomePage from "./Components/HomePage/Home";


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
    }
]