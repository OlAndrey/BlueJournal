import React from 'react';
import AsideMenu from '../AsideMenu/AsideMenu';
import HomePage from '../HomePage/Home';
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
                <HomePage />
            </div>
        </div>
    </section>
  );
}

export default CentralBlock;
