import React from 'react';
import gameheadset from '../../../images/hero/gameheadset.jpg';
import gamecontroller from '../../../images/hero/gamecontroller.jpg';
import earphone from '../../../images/hero/earphone.jpg';
// import products from '../../../data/products.json';

const Hero = () => {


    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">

            <div className="carousel-inner">
                
                <div className="carousel-item active" data-bs-interval="1000">
                    <h2 style={{ fontSize: '24px', color: '#212529', fontWeight: '700' }} className='text-center my-3'>Wireless Headset</h2>
                    <img src={gameheadset} width={500} className="d-block img-fluid mx-auto" alt="gameheadset" />
                    <h3 style={{ fontSize: '18px', color: '#212529' }} className='text-center fw-bold my-3'>Price: 22000 $</h3>
                </div>

                <div className="carousel-item" data-bs-interval="2000">
                    <h2 style={{ fontSize: '24px', color: '#212529', fontWeight: '700' }} className='text-center my-3'>Controller</h2>
                    <img src={gamecontroller} width={500} className="d-block img-fluid mx-auto" alt="gamecontroller" />
                    <h3 style={{ fontSize: '18px', color: '#212529' }} className='text-center fw-bold my-3'>Price: 33000 $</h3>
                </div>

                <div className="carousel-item" data-bs-interval="2000">
                    <h2 style={{ fontSize: '24px', color: '#212529', fontWeight: '700' }} className='text-center my-3'>Apple Airpods Pro</h2>
                    <img src={earphone} width={500} className="d-block img-fluid mx-auto" alt="smartwatch" />
                    <h3 style={{ fontSize: '18px', color: '#212529' }} className='text-center fw-bold my-3'>Price: 16000 $</h3>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Hero;