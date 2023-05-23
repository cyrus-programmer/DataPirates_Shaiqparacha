import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <section style={{backgroundColor: '#000000'}} className='pb-3'>
            <h1 style={{color: '#ffffff'}} className='text-center fs-6'>&copy;  SOFTEC E-Commerce| {(new Date()).getFullYear()}</h1>
            <h2 style={{color: '#ffffff'}} className='text-center fs-6'>&copy;  A Gaming Products Store| {(new Date()).getFullYear()}</h2>

        </section>
    );
};

export default Footer;