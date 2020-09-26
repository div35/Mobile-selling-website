import React, { Component } from "react";
import classes from "./navbar.module.css";
import Logo from "./../../Images/logo.png"
class Navbar extends Component {
    render() {
        return (
            <div>
                <div className={classes.Top_navbar}>
                    <div className={classes.Logo}>
                        <img src={Logo} alt="Logo"></img>
                    </div>
                    <div className={classes.Search}>
                        <input type="text" className={classes.Search_bar} placeholder="   Search Here"></input>
                        <button type="Submit" className={classes.Search_button}>Search</button>
                    </div>
                    <ul className={classes.Account_section}>
                        <li className={classes.Li}><div className={classes.Myaccount}>My Account</div></li>
                        <li className={classes.Li}><div className={classes.Login}>Login / Signup</div></li>
                    </ul>
                </div>
                <div className={classes.Bottom_navbar}>
                    <div className={classes.Home}>Home</div>
                    <button className={classes.Mobile}>Mobiles</button>
                    <div className={classes.dropdown}>
                        <div className={classes.dropdown_content}>Mi</div>
                        <div className={classes.dropdown_content}>Poco</div>
                        <div className={classes.dropdown_content}>Realme</div>
                        <div className={classes.dropdown_content}>Oppo</div>
                        <div className={classes.dropdown_content}>Vivo</div>
                        <div className={classes.dropdown_content}>Oneplus</div>
                    </div>
                    <div className={classes.AboutUs}>About Us</div>
                    <div className={classes.ContactUs}>Contact Us</div>
                </div>
            </div>
        )
    }
}

export default Navbar;