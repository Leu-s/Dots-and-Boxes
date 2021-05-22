import React from "react";
import { Link } from "react-router-dom"
import styles from "./Menu.module.scss"

export const Menu = () => {
    return (
        <div className={styles.container}>

            <p><Link to="/">Main</Link></p>

            <p><Link to="/auth/login">Authorization</Link></p>

            <p><Link to="/auth/reg">Registration</Link></p>

        </div>
    )

}






