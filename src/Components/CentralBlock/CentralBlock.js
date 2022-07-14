import React, { useContext, useState } from 'react';
import AsideMenu from '../AsideMenu/AsideMenu';
import './CentralBlock.css';
import { Context } from '../../index';
import PreLoader from '../PreLoader/PreLoader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, ref } from "firebase/storage";

const CentralBlock = (props) => {
    const {auth, database} = useContext(Context);
    const [user, loading] = useAuthState(auth);
    const [logooUrl, setLogoUrl] = useState(null);
    getDownloadURL(ref(database, `images/logo/${user.uid}`))
        .then((url) => {setLogoUrl(url)})
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
                                <img className="img-thumbnail" src={logooUrl ?logooUrl :user.photoURL} alt="profile" />
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
