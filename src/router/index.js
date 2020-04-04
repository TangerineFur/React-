import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from '../views/login/Login'
import DashBoard from '../views/dashboard/DashBoard'

const Router = () =>(
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={DashBoard}></Route>
        </Switch>
    </BrowserRouter>
)
    
export default Router