import React from "react";
import { MainLayout } from "./layouts/main"
import { AuthLayout } from './layouts/auth'
import { RegForm } from "./components/Auth/Registration/RegistrationForm";
import { AuthForm } from "./components/Auth/Authorization/AuthorizationForm";
import { RoomList } from "./components/Rooms/Rooms";

export const routes = [
        {
        path: '/auth',
        component: AuthLayout,
        routes: [
            {
                exact:true,
                path: '/auth',
                component: AuthForm
            },
            {

                path: '/auth/login',
                component: AuthForm
            },
            {
                path: '/auth/reg',
                component: RegForm
            }
        ]

    },
    {
        path: '*',
        component: MainLayout,
        routes: [
            {
                path: '/rooms',
                component: RoomList
            },
            {
                path: '/',
                component: RoomList
            }
        ]
    }

]