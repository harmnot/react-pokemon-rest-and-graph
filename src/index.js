import React from 'react';
import ReactDOM from 'react-dom';
import "popper.js"
import "jquery/src/jquery";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MainProvider} from "./contexs/mainContext";
import {BrowserRouter} from "react-router-dom";
import {client} from "./api/graphClient";
import {ApolloProvider} from "@apollo/client";

ReactDOM.render(
    <React.StrictMode>
        <MainProvider>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ApolloProvider>
        </MainProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
