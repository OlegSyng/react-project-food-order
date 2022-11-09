import React from "react";

import imageHead from '../../assets/coffee.jpg';
import cssClasses from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <>
            <header className={cssClasses.header}>
                <h1>CoffeeDrone</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={cssClasses['main-image']}>
                <img src={imageHead} alt="A 3 coffee machine handles" />
            </div>
        </>
    )
}

export default Header;