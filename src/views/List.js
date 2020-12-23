import React from "react";
import P from "../api/Api";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";

class List extends React.Component {
    state = {
        data: [],
        hasMore: true,
        limitTYpe: 20,
        perPage: 0,
        page: 1
    };

    componentDidMount() {
       this.fetchMoreData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.type !== this.props.match.params.type) {
            this.refresh()
        }
    }

    refresh = () => {
        this.setD()
        this.fetchMoreData()
        this.checkRender()
    }


    setD = () => {
        if(this.props.match.params.type !== "pokemon") {
            this.setState({data: []})
            this.setState({page: 0})
        } else {
            this.fetchMoreData()
            this.setState({data: []})
            this.fetchMoreData()
        }
        this.setState({data: []})
        this.setState({limitTYpe: 20})
        this.setState({perPage: 0})
    }

    getAll = async () => {
        let poke;
        const interval = {
            offset: this.state.page,
            limit: 40
        }
        if(this.props.match.params.type === "pokemon") {
            poke = await P.getPokemonsList(interval)
            if(poke["results"].length === 0) {
                this.setState({ hasMore: false });
            }
            return poke.results.map(resp => resp.url)
        } else {
            poke = await P.getTypeByName(this.props.match.params.type)
            return poke.pokemon.map(v => v.pokemon.url )
        }
    }

    fetchMoreData = async () =>  {
        try {
            const pokes = await this.getAll()
            const respondPokes = await Promise.all(pokes.map(url => fetch(url).then(final => final.json())))
            const result = []
            for(const value of respondPokes) {
                const img = "https://www.clipartmax.com/png/middle/129-1298368_ref-pokeball-transparent-background.png"
                result.push(
                    {
                        id: value["id"],
                        name: value["name"],
                        pic: value["sprites"]["front_default"] ? value["sprites"]["front_default"] : img ,
                        types: value["types"].map(arrType => arrType["type"]["name"])
                    }
                )
            }
            if(this.props.match.params.type !== "pokemon") {
                const slice = result.slice(this.state.perPage, this.state.limitTYpe)
                this.setState({data: [...this.state.data, ...slice]})
                // eslint-disable-next-line
                this.setState({perPage: this.state.limitTYpe++})
                this.setState({limitTYpe: this.state.perPage+ this.state.limitTYpe})
            } else {
                this.setState(prev => {
                    return {
                        page: prev.page += 1 + 20
                    }
                })
                this.setState({data: [...this.state.data, ...result]})
            }
        } catch (err) {
            this.setState({data: "error"})
        }
    }

    title = () => {
        if(this.props.match.params.type === "pokemon") {
            return (
                <h3 className="my-5 text-center"> List all Pokemon </h3>
            )
        } else {
            return (
                <h3 className="my-5 text-center"> List all Pokemon type of {this.props.match.params.type} </h3>
            )
        }
    }

    Items = () => {
        return (
            <div className="d-flex flex-row flex-wrap justify-content-center card-list">
                {this.state.data.map((value, index) => (
                    <div key={index} className="">
                        <Card
                            name={value.name}
                            source={!value.pic ? `no-poke-1.jpg` : value.pic}
                            types={value.types}
                            keyC={index}
                            id={value.id}
                        />
                    </div>
                ))}
            </div>
        )
    }

    checkRender = () => {
        if(this.state.data === "error") {
            return (
                <>
                    <div className="center-t">
                        <span> something error</span>
                    </div>
                </>
            )
        } else if (this.state.data.length === 0) {
            return (
                <>
                    <div className="center-t">
                        <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </>
            )
        } else {
            if(this.props.match.params.type === "pokemon") {
                return (
                    <div id="list-poke">
                        <InfiniteScroll
                            dataLength={this.state.data.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={
                                <div style={{ textAlign: "center" }}>
                                    <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            endMessage={
                                <div style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </div>
                            }
                        >
                            {this.Items()}
                        </InfiniteScroll>
                    </div>
                )
            } else {
                return (
                    <div id="list-poke">
                        <InfiniteScroll
                            dataLength={this.state.data.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                       >
                            {this.Items()}
                        </InfiniteScroll>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <>
                <Route exact path={`/all/:type`}>
                    {this.title()}
                    {this.checkRender()}
                </Route>
            </>
        )
    }
}

export default List
