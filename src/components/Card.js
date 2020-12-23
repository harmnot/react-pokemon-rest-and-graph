import React, {useEffect, useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import {DELETE_MY_POKE, FAILED_DELETE} from "../reducers/mainReducer";
import {MainContext} from "../contexs/mainContext";
import {url} from "../api/internal";

const Card = ({name, types, source, keyC, id}) => {
    const {dispatch} = useContext(MainContext)
    const history = useHistory()
    const [countOwned, setOwned] = useState(0)

    const goToDetail = () => !id ? null : history.push("/detail/"+id)

    useEffect(() => {
        const getOwned = async () => {
            const getData = await fetch(`${url}/pokemons/${id}`)
            if(getData.status === 200) {
                const {result} = await getData.json()
                setOwned(result.owned.length)
            }
        }
        if(id) {
            getOwned()
        }
    }, [id])

    const deletePoke = async () => {
        const getData = await fetch(`${url}/pokex/${keyC}`, {method: "DELETE"})
        if (getData.status === 200) {
            dispatch({type: DELETE_MY_POKE, payload: {_id: keyC}})
        } else {
            dispatch({type: FAILED_DELETE, payload: "failed to delete"})
        }
    }

    return (
        <>
            <div className="d-flex flex-row justify-content-between box shadow p-3 mb-1 ro" onClick={goToDetail}>
                { !id &&  <div className="del" onClick={() => deletePoke()}> X </div> }
                <div className="my-auto">
                    <img src={source} alt={`${name}#pic`} width="128" />
                </div>
                <div className="d-flex py-1 px-2 flex-column justify-content-center">
                    <div className="item-box">
                        <a> {name} </a>
                    </div>
                    <div className="d-flex flex-row">
                        {types.map((v, index)=> {
                           return <img src={`/images/${v}.png`} width="20" key={index} alt={v}/>
                        })}
                    </div>
                    {id &&
                    <div className="">
                        owned: {countOwned}
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Card
