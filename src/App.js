import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Detail} from "./components/Detail";
import List from "./views/List";
import {Home} from "./views/Home";
import MyListPokemon from "./views/MyPokemon";
import Navbar from "./components/Navbar";
import {useLocation} from "react-router-dom"

function App() {
    const {pathname} = useLocation()
    return (
        <div className="App">
            { pathname !== "/" && <Navbar/> }
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/all/:type" component={List}/>
                <Route path="/detail/:id" component={Detail}/>
                <Route path="/my-pokemon/:email" component={MyListPokemon}/>
            </Switch>
        </div>
    );
}

export default App;
