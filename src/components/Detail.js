import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import P from "../api/Api"
import {Badge} from "../views/Home";
import {url} from "../api/internal";

export const Detail = props => {
    const [data, setData] = useState(null)
    const [nickname, emailUser] = [useRef(""), useRef("")]
    const [failToCatch, setFailToCatch] = useState(true)
    const [isCatch, setCatch] = useState(false)
    const [errorSave, setErrorSave] = useState("")
    const [hideCatchButton, setHideCatchButton] = useState(false)
    const [goingToSave, setGoingToSave] = useState(false)
    const [isGoingToCatch, setGoingToCatch] = useState(false)
    const history = useHistory();
    const emailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const endpointCreatePokex = `${url}/pokex/createpokex`

    const fetchDetail = async () => await P.getPokemonByName(+props.match.params.id)
    const handleClick = i => history.push(`/${i}`)

    const defineClassCatch = isCatch ? "d-flex flex-column justify-content-center mx-auto" :"d-flex flex-column justify-content-center mx-auto showTr"

    const randomToCatch = () => {
        const conditions = [true, false, true, true, false, false]
        const random = Math.floor(Math.random() * conditions.length)
        return conditions[random]
    }

    const catchThis = () => {
        setHideCatchButton(true)
        setGoingToCatch(true)
        const gotPokemon = randomToCatch()
        const dateNow = new Date().getDay();
        const setThisTimeOut = 6000 + dateNow + +props.match.params.id;
        setTimeout(() => {
            if (gotPokemon) {
                setCatch(true)
            } else {
                setFailToCatch(false)
            }
            setGoingToCatch(false)
        }, setThisTimeOut)

    }

    const savePokex = async () => {
        setGoingToSave(true)
        const [email, givenName] = [emailUser.current.value, nickname.current.value]
        if (givenName.trim() === "") {
            setErrorSave("required valid nickname")
        } else if (!emailRgx.test(email) || email.trim() === "") {
            setErrorSave("invalid email address")
        } else {
            setErrorSave("")
            const reqBody = {
                "nickname": givenName,
                "email": email,
                "idPokemon": +props.match.params.id,
                "image": data["pic"]
            }
            const hitApi = await fetch(endpointCreatePokex, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(reqBody)
            })
            if (hitApi.status > 399) {
                setErrorSave("something went wrong")
            } else {
                history.push(`/my-pokemon/${email}`)
            }
        }
        setGoingToSave(false)
    }

    useEffect(() => {
        const fetchMoreDetail = async () => {
            try {
                const resp = await fetchDetail()
                const img = "https://www.clipartmax.com/png/middle/129-1298368_ref-pokeball-transparent-background.png"
                const stats = []
                for (const data of resp["stats"]) {
                    stats.push({
                        name: data["stat"]["name"],
                        base_stat: data["base_stat"],
                        effort: data["effort"]
                    })
                }
                setData(
                    {
                        name: resp["name"],
                        height: resp["height"],
                        weight: resp["weight"],
                        stats: stats,
                        abilities: resp["abilities"].map(v => v["ability"]["name"]),
                        moves: resp["moves"].map(v => v["move"]["name"]),
                        pic: resp["sprites"]["front_default"] ? resp["sprites"]["front_default"] : img,
                        types: resp["types"].map(arrType => arrType["type"]["name"])
                    }
                )
            } catch (err) {
                setData('error')
            }
        }
        fetchMoreDetail()
        // eslint-disable-next-line
    }, [])

    const renderChild = (name, key) => {
        return (
            <div className="pl-2 mt-2 text-left">
                <div className="col-1">
                    <b> {name} </b>
                </div>
                {
                    (data[key] && data[key].length > 0) &&
                    <div className="pl-2 row mx-auto">
                        {data[key].map((value, index) => {
                            return (
                                <span key={index} className="badge badge-pill badge-light my-1">{value}</span>
                            )
                        })}
                    </div>
                }
                {
                    (!data[key] || data[key].length === 0) &&
                    <div className="pl-2 row mx-auto"> - </div>
                }
            </div>
        )
    }

    return (
        <>
            {data === "error" &&
            <div className="center-t">
                something went wrong
            </div>}
            {!data &&
            <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>}
            {(data && data !== "error") &&
            <div className="">
                <div className="container">
                    <button type="button" className="btn btn-warning mt-5 ml-3" onClick={history.goBack}>Back</button>
                </div>
                <div className="d-flex my-5 justify-content-center mx-auto">
                    <div className="d-flex flex-column w-100">
                        {(!isGoingToCatch && failToCatch) && <div className="p-2 mx-auto ">
                            <h2 style={{fontWeight: "700"}}> {data["name"]}</h2>
                        </div>}
                        <div className={defineClassCatch}>
                            {(!isGoingToCatch && !isCatch && failToCatch) &&
                            <div className="p-2 mx-auto">
                                <img src={data["pic"]} alt="pokemon.png" width="300"/>
                            </div>}
                            {(!isGoingToCatch && !isCatch && !failToCatch) &&
                            <div className="text-center">
                                <div className="p-2 mx-auto">
                                    <img src="/images/caat.jpg" alt="meow.jpg" width="300"/>
                                </div>
                                <div>
                                    <h4> Sorry {data["name"]} failed to catch </h4>
                                </div>
                                <div className="mb-4">
                                    <button type="button" className="btn btn-outline-dark"
                                            onClick={() => history.push("/all/pokemon")}>Browse All Pokemon
                                    </button>
                                </div>
                            </div>}
                            {(isGoingToCatch && !isCatch) &&
                            <div className="p-2 mx-auto">
                                <img src="/images/pokball11.gif" alt="pokeball gif" width="400"/>
                            </div>}
                            {(!isGoingToCatch && isCatch) &&
                            <div className="mb-4 p-3 d-flex flex-column flex-wrap">
                                <div className="p-2 mx-auto">
                                    <img src={data["pic"]} alt="failed-to-catch.png" width="300"/>
                                </div>
                                <div className="p-1">
                                    <h4> Horeeyyy... you got it</h4>
                                    <p> save <b>{data["name"]}</b> to your bag list, give the Nickname and save
                                        to your email</p>
                                </div>
                                {errorSave !== "" &&
                                <div className="px-1">
                                    <small className="text-danger">{errorSave}</small>
                                </div>}
                                <div className="p-1">
                                    <input ref={nickname} className="form-control form-control-lg" type="text"
                                           pattern="[A-Za-z]" placeholder="Input Nickname"/>
                                </div>
                                <div className="p-1">
                                    <input ref={emailUser} className="form-control form-control-lg" type="email"
                                           placeholder="Pokemon Bag Email"/>
                                </div>
                                <div className="mb-5 p-2">
                                    {!goingToSave &&
                                    <button type="button" className="btn btn-primary" onClick={savePokex}>Save to
                                        bag</button>}
                                    {goingToSave &&
                                    <button className="btn btn-primary" type="button">
                                        <span className="spinner-border spinner-border-sm mr-1" role="status"
                                              aria-hidden="true"/>
                                        Save to bag
                                    </button>}
                                </div>
                            </div>}
                            {!hideCatchButton &&
                            <div className="p-2 mx-auto mb-3">
                                <button type="button" className="btn btn-dark mt-5 ml-3" onClick={catchThis}>
                                    Catch me
                                </button>
                            </div>}
                        </div>
                        <div className="p-2 container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="table-responsive-sm">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Stat</th>
                                                <th scope="col">Base Stat</th>
                                                <th scope="col">Effort</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.stats.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td> {value.name}</td>
                                                        <td> {value.base_stat} xp</td>
                                                        <td> {value.effort}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row mx-auto text-center">
                                        <div className="col-2">
                                            <b> Height </b>
                                        </div>
                                        <div className="col-4">
                                            {data.height} cm
                                        </div>
                                        <div className="col-2">
                                            <b> Weight </b>
                                        </div>
                                        <div className="col-4">
                                            {data.weight} kg
                                        </div>
                                        <div className="col-12">
                                            {data.types.map((value, index) => {
                                                return (
                                                    <div className="my-2 p-2" key={index}>
                                                        <Badge
                                                            name={value}
                                                            src={`/images/${value}.png`}
                                                            color={'rgba(254, 207, 45, 0.9)'}
                                                            click={handleClick}
                                                            route={`all/${value}`}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {renderChild('Abilities', 'abilities')}
                                        {renderChild('Moves', 'moves')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
