import React, {useRef, useState} from "react"
import {useHistory} from "react-router-dom"
import {url} from "../api/internal";

export const InputFindEmail = () => {
    const [errorSearch, setErrorSearch] = useState("")
    const history = useHistory()
    const searchEmail = useRef("")

    const findEmail = async () => {
        try {
            const email = searchEmail.current.value
            const rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!rgx.test(email)) {
                setErrorSearch("invalid email address")
            } else {
                const callApi = await fetch(`${url}/user/detail?email=${email}`)
                if (callApi.status > 399) {
                    setErrorSearch("can't found any email")
                } else {
                    const nav = document.getElementById("open-side-panel")
                    if(nav) {
                        nav.style.width = "0";
                    }
                    setErrorSearch("")
                    history.push(`/my-pokemon/${email}`)
                }
            }
        } catch (err) {
            setErrorSearch("something went wrong")
        }
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center mx-auto">
                <div>
                    {errorSearch !== "" &&
                    <small className="text-danger"> {errorSearch}</small>
                    }
                    <input className="form-control form-control-lg" type="text" ref={searchEmail}
                           placeholder="input email"/>
                </div>
                <div className="mx-auto py-2">
                    <button type="button" className="btn btn-light" onClick={() => findEmail()}>search</button>
                </div>
            </div>
        </>
    )
}
