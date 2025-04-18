import React from 'react'
import { Route, Redirect } from "react-router-dom";


export default function ProtectedRoute({ component: Component, ...rest }) {
    const isAuthenticated = JSON.parse(localStorage.getItem("auth"));

    return (
        <Route {...rest} render={(props) =>
            isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
        />
    )
}
