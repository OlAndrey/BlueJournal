import React, { useContext } from 'react';
import AsideMenu from '../AsideMenu/AsideMenu';
import './CentralBlock.css';
import { Context } from '../../index';
import PreLoader from '../PreLoader/PreLoader';
import { useAuthState } from 'react-firebase-hooks/auth';

const CentralBlock = (props) => {
    const {auth} = useContext(Context);
    const [user, loading] = useAuthState(auth);
    if(loading){
        return <PreLoader />
    }
    return (
        <section className="main">
            <div className="container">
                <div className="main__body">
                    <div className="main__menu">
                        <div className="main__about">
                            <div className="main__photo">
                                <img src={user.photoURL} alt="profile" />
                            </div>
                            <div className="main__me">
                                <div className="main__name">
                                    {user.displayName}
                                </div>
                            </div>
                        </div>
                        <AsideMenu />
                    </div>
                    {props.element }
                </div>
            </div>
        </section>
    );
}

export default CentralBlock;
