import React, { useContext } from "react";

import useAuth from "../hooks/useAuth";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <div>
                Loading
                {"  "}
                ...
            </div>
        );
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
