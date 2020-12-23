import React from "react";
import {types} from "../type";
import {useHistory, useLocation} from "react-router-dom";
import {InputFindEmail} from "../components/StandaloneForm";

const Home = () => {
    return(
        <>
            <div className="row m-0">
                < MainCover />
                < MainChoose />
            </div>
        </>
    )
}

const MainCover = () => {
    return (
        <div className="col-lg-6 v-100">
            <div className="center-t">
                <Cover />
            </div>
        </div>
    )
}

const MainChoose = () => {
    return (
        <div className="col-lg-6 v-100 bg-y">
            <div className="col-lg-8 mx-auto mt-5">
                <Choose />
            </div>
        </div>
    )
}

const Cover = () => {
    return(
        <div className="column text-center">
            <div className="d-flex flex-column">
                <span id="head"> TOKO </span>
                <span id="child"> POKEMON</span>
            </div>
            <div className="">
                <video id="pokemonVideoPlayer" playsInline loop autoPlay height="350">
                    <source src="/video/pika.mp4" type="video/mp4"/>
                </video>
            </div>
        </div>
    )
}

const Choose = () => {
    const history = useHistory();
    const location = useLocation()
    const renderType = () => {
        return types.map((value, index) => (
            <div className="col-sm-6 col-lg-6 my-2" key={index}>
                <Badge
                    name={value.name}
                    color={value.color}
                    src={`/images/${value.name}.png`}
                    click={handleClick}
                    route={`all/${value.name}`}/>
            </div>
         ))
    }

    const handleClick = (i) => {
      history.push(`/${i}`)
    }

    const homePageButton = () => {
        if(location.pathname !== "/") {
            return (
                <>
                    <h5> Homepage </h5>
                    <div className="col-xs-12 mx-auto mt-2 mb-4">
                        <Badge name="Homepage" color="#709B7F" src={""} click={handleClick} route=""/>
                    </div>
                </>
            )
        }
    }

    return(
        <div className="d-flex flex-column">
            <div className="d-flex flex-column my-3">
                <InputFindEmail />
                {homePageButton()}
                <h5> All Pokemon </h5>
                <div className="col-xs-12 mx-auto mt-2 mb-4">
                    <Badge name="Browse Pokemon" color="#614051" src={""} click={handleClick} route="all/pokemon"/>
                </div>
                <h5> Pokemon by Type </h5>
                <div className="d-flex flex-row flex-wrap">
                    {renderType()}
                </div>
            </div>
        </div>
    )
}

const Badge = ({name, color, src, click, route}) => {
    const isImage = () => {
        if (src.endsWith(".png")) {
            return <img className="symbol" src={src} alt="type icon"/>
        } else {
            return <span className="symbol" style={{color: '#000000'}}>&#9783;</span>
        }
    }
    const to = route => {
        const sideBar = document.getElementById("open-side-panel")
        if(sideBar) {
            sideBar.style.width = "0"
        }
        click(route)
    }
    return (
        <div className="type" style={{backgroundColor: color, color: 'white'}} onClick={()=>to(route)}>
            {isImage()}
            <span> {name}</span>
        </div>
    )
}


export { Home, MainChoose, Choose, Badge }
