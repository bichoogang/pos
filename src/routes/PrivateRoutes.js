import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import Addproduct from 'components/products/Addproduct';
import Products from 'components/products/Products';
import Invoice from 'components/products/Invoice';
import Employees from 'components/Employee/Employees';
import Customers from 'components/Employee/Customers';
import Order from 'components/products/Order';
import Category from 'components/products/Category';
import Login from 'Register/Login';
import Cuscategory from 'components/products/Cuscategory';
import Dashboardmain from 'components/products/Dashboardmain';
import Dash from './dashboard'

const DashboardComponent = lazy(() => import('../components/products/Products'));

function PrivateRoutes({loguser}) {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={Dashboardmain} />
                {/* <Route exact path={SLUGS.overviewTwo} render={() => <div>overviewTwo</div>} />
                <Route exact path={SLUGS.overviewThree} render={() => <div>overviewThree</div>} />
                <Route exact path={SLUGS.overview} render={() => <div>overview</div>} />
                <Route exact path={SLUGS.tickets} render={() => <div>tickets</div>} />
                <Route exact path={SLUGS.ideasTwo} render={() => <div>ideasTwo</div>} />
                <Route exact path={SLUGS.ideasThree} render={() => <div>ideasThree</div>} />
                <Route exact path={SLUGS.ideas} render={() => <div>ideas</div>} />
                <Route exact path={SLUGS.contacts} render={() => <div>contacts</div>} />
                <Route exact path={SLUGS.agents} render={() => <div>agents</div>} />
                <Route exact path={SLUGS.articles} render={() => <div>articles</div>} />
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Route exact path={SLUGS.subscription} render={() => <div>subscription</div> } /> */}
                <Route exact path={SLUGS.addproduct}  render={() => <Addproduct loguser={loguser}/>} />
                <Route exact path={SLUGS.product} render={() => <Products/>} />
                <Route exact path={SLUGS.invoice} render={() => <Invoice/>} />
                
                {
                    loguser?.role==="admin"?
                
                <Route exact path={SLUGS.employee} render={() => <Employees/>} />:null}
                <Route exact path={SLUGS.customers} render={() => <Customers/>} />
                <Route exact path={SLUGS.orders} render={() => <Order/>} />
                <Route exact path={SLUGS.category} render={() => <Category/>} />
                <Route exact path={SLUGS.cuscategory} render={() => <Cuscategory/>} />
                <Route exact path="/test" render={() => <Dash/>} />

                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
