import React from 'react';
import AsideMenu from '../AsideMenu/AsideMenu';
import './CentralBlock.css';

const CentralBlock = (props) => {
  return (
    <section className="main">
        <div className="container">
            <div className="main__body">
                <div className="main__menu">
                    <div className="main__about">
                        <div className="main__photo">
                            <img src="#" alt="profile" />
                        </div>
                        <div className="main__me">
                            <div className="main__name">
                                Name
                            </div>
                        </div>
                    </div>
                    <AsideMenu />
                </div>
            </div>
        </div>
    </section>
  );
}

export default CentralBlock;
