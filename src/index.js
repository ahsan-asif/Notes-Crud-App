import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import {BrowserRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import Login from "./components/Login";
import Header from "./routes/HeaderFooter";
import LoadingComponent from "./components/LoadingComponent";
import AuthenticatedComponent from "./components/AuthenticatedComponent";
import DetailNote from './components/DetailNote';
import EditNote from './components/EditNote';
//create redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoadingComponent>
        <div>
          <Switch>
            <Route path='/login' component={Login} exact={true} />
            {/* <Redirect from='/login' to='/' /> */}
            <AuthenticatedComponent>
              <Header />
              <Route path='/:id/edit' component={EditNote} exact={true} />
              <Route path='/:id' component={DetailNote} exact={true} />
              <Route path='/' component={App} exact={true} />
              
            </AuthenticatedComponent>
          </Switch>
        </div>
      </LoadingComponent>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
