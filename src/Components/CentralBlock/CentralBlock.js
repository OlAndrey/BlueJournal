import React, { useContext, useEffect } from 'react';
import AsideMenu from '../AsideMenu/AsideMenu';
import './CentralBlock.css';
import { Context } from '../../index';
import PreLoader from '../PreLoader/PreLoader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getUserByID } from '../../utils/getter';
import { avatarURL } from '../../images/imagesURL';
import { useLocation } from 'react-router-dom';
import { updateLastOnlineDate } from '../../API/userApi';

const CentralBlock = (props) => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users, loading ] = useCollectionData(
        firestore.collection('users')
    )
    const location = useLocation();

    useEffect(() => {
        if(me?.path){
            updateLastOnlineDate(me.path)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    if(loading){
        return <PreLoader />
    }
    var me = getUserByID(users, user.uid)
    return (
        <section className="main">
            <div className="container">
                <div className="main__body">
                    <div className="main__menu">
                        <div className="main__about">
                            <div className="main__photo">
                                <img className="img-thumbnail" src={me?.photoURL ?me.photoURL :avatarURL} alt="profile" />
                            </div>
                            <div className="main__me">
                                <div className="main__name">
                                    {me?.displayName ? me.displayName : "---- ----"}
                                </div>
                            </div>
                        </div>
                        <AsideMenu />
                    </div>
                    {props.children }
                </div>
            </div>
        </section>
    );
}

export default CentralBlock;
