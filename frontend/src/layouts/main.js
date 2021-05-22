import React, { useEffect } from "react";
import { Menu } from "../components/Menu/Menu";
import {renderRoutes} from "react-router-config";

export class MainLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            rooms: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/rooms")
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        rooms: result.rooms
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, rooms } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if  (!isLoaded) {
            setTimeout(() => {}, 5000)
            return <div>Loading...</div>
        } else {
            return (
            <div>
                <header>
                    <div><h1>Dots And Boxes</h1></div>
                    <Menu />
                </header>
                <main>
                    <div>
                        {renderRoutes(this.props.route.routes, {rooms})}
                    </div>
                </main>
            </div>
        );
        }
    }
}
