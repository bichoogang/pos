import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'Register/Login';
import SLUGS from 'resources/slugs';

function PublicRoutes() {
    return (
        <Switch>
            <Route path={SLUGS.login} render={() => <Login/>} />
            <Route path={SLUGS.signup} render={() => <div>signup</div>} />
            <Route path={SLUGS.forgotPassword} render={() => <div>forgotPassword</div>} />
            <Redirect to={SLUGS.login} />
        </Switch>
    );
}

export default PublicRoutes;
