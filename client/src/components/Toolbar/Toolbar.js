import React from 'react';
import Logo from '../Logo/Logo';
import './Toolbar.css'
import Nav from '../Nav/Nav';
import DropMenuToggle from '../Nav/DropMenuToggle/DropMenuToggle';



const toolbar=(props) => (
    <header className="Toolbar">
        <div className="LogoTitle">
            <Logo /> 
            <p className='MainTitle'>My Wardrobe</p>
        </div>
        <div className="DesktopOnly">
           <Nav isAuthenticated={props.isAuth}/>
        </div>
        <DropMenuToggle clicked={props.dropMenuClicked} />    
    </header>
);



export default toolbar;
