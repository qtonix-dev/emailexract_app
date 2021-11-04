import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import {ProtectedRouteUser} from './auth/auth'


import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'semantic-ui-css/semantic.min.css'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './scss/main.scss';

import {ProtectedRouteUser} from './auth/auth'

import Home from './pages/Home'
import EmailVerifier from './pages/EmailVerifier'
import EmailFinder from './pages/EmailFinder'

import Bulks from './pages/bulks/Bulks'
import BulkDomain from './pages/bulks/domain/BulkDomain'
import BulkDomainCreate from './pages/bulks/domain/BulkDomainCreate'
import BulkDomainView from './pages/bulks/domain/BulkDomainView'

import BulkDomainCreateNew from './pages/bulks/domain/BulkDomainCreateNew'



import AccountHome from './pages/account/AccountHome'
import AccountSubscription from './pages/account/AccountSubscription'
import AccountSubscriptionOne from './pages/account/AccountSubscriptionOne'
import AccountSubscriptionTwo from './pages/account/AccountSubscriptionTwo'





import AccountBilling from './pages/account/AccountBilling'
import AccountUsage from './pages/account/usage/AccountUsage'


import UsageDomainSearch from './pages/account/usage/UsageDomainSearch'
import UsageEmailFinder from './pages/account/usage/UsageEmailFinder'
import UsageEmailVerification from './pages/account/usage/UsageEmailVerification'
import UsageBulkDomainExtract from './pages/account/usage/UsageBulkDomainExtract'





import LoginCheck from './pages/LoginCheck'
import EmailVerification from './pages/EmailVerification'

import PlanActivatedSuccess from './pages/PlanActivatedSuccess'
import PlanActivationFailed from './pages/PlanActivationFailed'


export default function App() {
  return (
    <>
      
      <Router>
          <Switch>
            <ProtectedRouteUser exact path='/' component={Home} />
            <ProtectedRouteUser exact path='/verify' component={EmailVerifier} />
            <Route exact path='/verifyemail' component={EmailVerification} />

            

            <ProtectedRouteUser exact path='/bulks' component={Bulks} />
            <ProtectedRouteUser exact path='/bulks/domainextract' component={BulkDomain} />
            <ProtectedRouteUser exact path='/bulks/domainextract/new(newversion)' component={BulkDomainCreateNew} />

            <ProtectedRouteUser exact path='/bulks/domainextract/new' component={BulkDomainCreate} />


            

            <ProtectedRouteUser exact path='/bulks/domainextract/view/:id' component={BulkDomainView} />


            
            

            <ProtectedRouteUser exact path='/finder' component={EmailFinder} />

            <ProtectedRouteUser exact path='/account' component={AccountHome} />
            <ProtectedRouteUser exact path='/account/subscription' component={AccountSubscription} />
            <ProtectedRouteUser exact path='/account/subscription/view' component={AccountSubscriptionOne} />
            <ProtectedRouteUser exact path='/account/subscription/pay/61519ea638decb4661519ea638/:packageid/:userid/61519ea638decb46c8473a8061519ea638decb46c8473a80/638decb46c8473a80615' component={AccountSubscriptionTwo} />


            
            

            <ProtectedRouteUser exact path='/account/billing' component={AccountBilling} />
            <Route exact path='/account/usage' component={AccountUsage} />

            <Route exact path='/account/usage/domainsearch' component={UsageDomainSearch} />
            <Route exact path='/account/usage/emailfinder' component={UsageEmailFinder} />
            <Route exact path='/account/usage/emailverification' component={UsageEmailVerification} />
            <Route exact path='/account/usage/bulkdomainextract' component={UsageBulkDomainExtract} />

            

            


            

            <Route exact path='/securelogincheck/:userid/:loginid' component={LoginCheck} />


            <Route exact path='/ea638decb4661519ea638decb46c8473a8061519ea638decb46c84/61519ea638decb46c8473/638decb46c8473a8061519ea638decb/:uuid/38decb46c8473/638decb46c8473a8061519ea6' component={PlanActivatedSuccess} />
            <Route exact path='/paymentfailed' component={PlanActivationFailed} />

            


          </Switch>
          <ToastContainer />
      </Router>
    </>
  )
}
