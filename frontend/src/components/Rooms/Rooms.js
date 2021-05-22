import React, { useState, useEffect } from "react";
import RoomItem from "./RoomItem";


export function RoomList(props) {
    let rooms = [];
    fetch("http://localhost:5000/api/rooms")
            .then(response => response.json())
            .then(
                (result) => {
                    rooms = result.rooms;
                },
                (error) => {
                    console.log(error);
                }
            );

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                <th>#</th>
                <th>Title</th>
                <th>ID</th>
                <th>Join to</th>
                </thead>
                <tbody>
                 { rooms.map((room, index) => {
                return <RoomItem room={room} key={room.uuid} index={index} />
            })}
                </tbody>

            </table>

        </div>
    )

}



