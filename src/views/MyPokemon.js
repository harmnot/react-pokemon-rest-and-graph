import React, {useEffect, useContext, useState} from "react";
import {MainContext} from "../contexs/mainContext";
import {FETCH_MY_POKEMONS} from "../reducers/mainReducer";
import {url} from "../api/internal";
import {useQuery, gql} from "@apollo/client";
import {useParams} from "react-router-dom";
import Card from "../components/Card";

const FIND_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon (
            name:$name
        ){
            types{
                type {
                    name
                }
            }
        }
    }
`

const MyPokemon = ({name, source, pokeID, keyC}) => {
    const {error, data} = useQuery(FIND_POKEMON, {
        variables: {name: String(pokeID)}
    })

    return (
        <>
            {error &&
            <div className="center-t">
                <span> Something went wrong </span>
            </div>
            }
            {data &&
            <div className="m-2">
                <Card source={source} name={name} keyC={keyC} types={data.pokemon.types.map(val => val.type.name)}/>
            </div>
            }
        </>
    )
}

export default function MyListPokemon() {
    const [loading, setLoading] = useState(false)
    const {state, dispatch} = useContext(MainContext)
    const {email} = useParams()

    useEffect(() => {
        const fetchMine = async () => {
            setLoading(true)
            const callApi = await fetch(`${url}/user/detail?email=${email}`)
            const getData = await callApi.json()
            if (callApi.status > 399) {
                dispatch({type: FETCH_MY_POKEMONS, payload: undefined})
            } else {
                dispatch({type: FETCH_MY_POKEMONS, payload: getData.result})
            }
            setLoading(false)
        }
        fetchMine()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="d-flex justify-content-center my-3">
            {
                loading &&
                <div className="center-t">
                    <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {
                state.mine === undefined &&
                <img src={"../images/notfound.jpg"} alt="empty=poke" className="img-fluid"/>
            }
            {
                (state.mine && state.mine.pokex.length === 0 && !loading) &&
                <div className="d-flex flex-column">
                    <div className="col-5 mx-auto">
                        <img src={"../images/empty.png"} alt="empty=poke" className="img-fluid"/>
                    </div>
                    <div className="mx-auto py-2 my-1">
                        <h4> {email} Empty Pokex</h4>
                    </div>
                </div>
            }
            {
                (state.mine && state.mine.pokex.length > 0 && !loading) &&
                <div>
                    <div className="text-center mb-3">
                        <h3> {email} </h3>
                        {state.failedDelete !== "" && <small className="text-danger">{state.failedDelete}</small>}
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {
                            state.mine.pokex.map((val, index) => {
                                return <MyPokemon key={index} name={val.nickname} keyC={val._id}
                                                  pokeID={val.pokemon.pokeID}
                                                  source={val.pokemon.image}/>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}
