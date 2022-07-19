import React, { useContext } from "react";
import { Route, Routes , Navigate } from "react-router-dom";
import { Context } from "../../index";
import { privateRoutes, publicRoutes } from "../../routes";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";

const AppRouter = (props) => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        user ?
        (
            <Routes >
                {privateRoutes.map(({path, component}) => 
                    <Route path={path} key={12345} element={component} exact={true} />
                )}
                <Route path="/*" key={12346} element={<Navigate to={HOME_ROUTE} replace={true} />} />
            </Routes >
        )
        :
        (
            <Routes >
                {publicRoutes.map(({path, component}) => 
                    <Route path={path} key={12347}  element={component} exact={true} />
                )}
                <Route path="/*" key={12348} element={<Navigate to={LOGIN_ROUTE} replace={true} />} />
            </Routes >
        )
    )
}

export default AppRouter;