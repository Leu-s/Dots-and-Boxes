import React from "react";
import { Link } from "react-router-dom";


export const RegAuthLinks = () => {
    return (
        <div>
            <p><Link to="reg">Sing in</Link> | <Link to="login">Log in</Link></p>
        </div>
    )
}

