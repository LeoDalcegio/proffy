import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const  PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact?: boolean;
    }> = ({ component: Component, ...props }) => {

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

    return (

        <Route
            {...props}
            render={ () => signed
                ? <Component {...props} />
                : <Redirect to='/' /> 
            }
        />
    )
}

export default PrivateRoute;
