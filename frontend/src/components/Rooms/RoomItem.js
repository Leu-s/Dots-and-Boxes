import React from "react";

export default function RoomItem({room, index}) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{room.title}</td>
            <td>{room.uuid}</td>
            <td>
                <button type="button" className="btn btn-outline-success">Join</button></td>
        </tr>
    )
}


