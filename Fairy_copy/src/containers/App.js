import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { searchRequest } from 'actions/search';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUserSearch = this.handleUserSearch.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000);

                //EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }
    
    handleUserSearch(username){
        return this.props.searchRequest(username)
    }

    componentDidMount() {
        //get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        //get loginData from cookie
        let loginData = getCookie('key');
        console.log("==========loginData TEST ========\n");
        console.log(loginData);

        //if loginData is undefined, do nothing
        if (typeof loginData === "undefined") return;

        //decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        console.log("==========loginData TEST2 ========\n");
        console.log(loginData);
        //==========loginData TEST ========
//eyJpc0xvZ2dlZEluIjp0cnVlLCJ1c2VybmFtZSI6Im1keSJ9
//==========loginData TEST2 ========
//Object { isLoggedIn: true, username: "mdy" }
//Object { isLoggedIn: true, onLogout: handleLogout(), onSearch: handleUserSearch(), usernames: [], onClose: onClose() }

        //if not logged in, do nothing
        if (!loginData.isLoggedIn) return;

        //page refreshed & has a session in cookie,
        //check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                console.log("statusrequest status\n");
                console.log(this.props.status);
                //if session is not valid

                //{ "valid": true, "isLoggedIn": true "currentUser": "audgp","currentjob": "임원",  "currentClubid": "창업동아리"

                if (!this.props.status.valid) {//false
                    //logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                

                }

                console.log("not logout the session\n");
                console.log(this.props.searchStatus);//Object { status: "INIT", usernames: [] }
                console.log("not logout the session\n");
                console.log(this.props.searchStatus.usernames);//Array []
                console.log("not logout the session\n");

            }
        );
    }

    render() {
        /** Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth ? undefined : <Header 
                                        isLoggedIn={this.props.status.isLoggedIn} 
                                        onLogout={this.handleLogout} 
                                        onSearch={this.handleUserSearch}
                                        username={this.props.status.currentUser}
                                        job = {this.props.status.currentjob}
                                        clubid={this.props.status.currentClubid}
                                        job2 = {this.props.status.currentjob2}
                                        clubid2={this.props.status.currentClubid2}/>}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        searchStatus: state.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        searchRequest: (username) => {
            return dispatch(searchRequest(username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
