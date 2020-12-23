import React from "react";
import {Choose} from "../views/Home";

const navBarAction = () => {
    const nav = document.getElementById("open-side-panel")
    if(nav) {
        nav.style.width = "60vw";
    }
}

const closeNavBar = () => {
    const nav = document.getElementById("open-side-panel")
    if(nav) {
        nav.style.width = "0";
    }
}


const Navbar = () => {
    return(
        <div className="bg-y-2 py-2 px-4">
            <div id="open-side-panel" className="sidepanel bg-y-2" role="openfirst">
                <a  href="#" className="closebtn" onClick={closeNavBar}>×</a >
                <div className="col-lg-8 mx-auto mt-5">
                    <Choose />
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <span onClick={navBarAction} style={{cursor: 'pointer'}}> ☰ </span>
                <span className="logo"> Toko Pokemon </span>
            </div>
        </div>
    )
}

export default Navbar
