import React from 'react';
import ReactDOM from 'react-dom';
// Router
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// Container Components
import { App, Home, Login, Register, Wall} from 'containers';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';


import inventoryList from './components/inventory/inventoryList';
import financeList from './components/finance/financeList';
import memberList from './components/member/MemberList';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <Route path="wall/:username" component={Wall}/>
                
                <Route path = "/inventoryList/:clubid" component = {inventoryList}/>

                <Route path = "/memberList/:clubid" component = {memberList}/>
                <Route path = "/financeList/:clubid" component = {financeList}/>
            </Route>
        </Router>
    </Provider>, rootElement
);