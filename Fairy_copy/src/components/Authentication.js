import React from 'react';
import { Link } from 'react-router';
import { throws } from 'assert';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            clubid:"",
            job:"",
            name:"",
            clubid2:"",
            job2:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
         let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);

    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if (!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;
        let ci = this.state.clubid;
        let jb = this.state.job;
        let nm = this.state.name;
        let jb2 = this.state.job2;
        let ci2 = this.state.clubid2;

        this.props.onRegister(id, pw,ci,jb,nm,ci2,jb2).then(
            (result) => {
                if (!result) {
                    this.setState({
                        username: '',
                        password: '',
                        clubid:'',
                        job:'',
                        name:'',
                        clubid2:'',
                        job2:''
                    });
                }else{
                    this.setState({
                        username:id,
                        password:pw,
                        clubid:ci,
                        job:jb,
                        name:nm,
                        clubid2:ci2,
                        job2:jb2
                    })
                }
            }
        );
    }

    handleKeyPress(e) {
        if (e.charCode == 13) {
            if (this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render() {

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.username}
                        className="validate" />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        value={this.state.password}
                        className="validate" />
                </div>
            </div>
        );

        const loginView = (
            <div>

                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn"
                            onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>

                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                        <div>
                            

                            <div className="input-field col s12 username">
                                <label>id</label>
                                <input
                                    name="username"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    className="validate" />
                            </div>


                            <div className="input-field col s12">
                                <label>Password</label>
                                <input
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                value={this.state.password}
                                className="validate" />
                            </div>
                            
                            
                             <div className="input-field col s12 username">
                                <label>name</label>
                                <input
                                    name="name"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    className="validate" />
                            </div>

                             <div className="input-field col s12 username">
                                <label>clubid1</label>
                                <input
                                    name="clubid"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.clubid}
                                    className="validate" />
                            </div>


                             <div className="input-field col s12 username">
                                <label>job1</label>
                                <input
                                    name="job"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.job}
                                    className="validate" />
                            </div>

                              <div className="input-field col s12 username">
                                <label>clubid2</label>
                                <input
                                    name="clubid2"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.clubid2}
                                    className="validate" />
                            </div>


                             <div className="input-field col s12 username">
                                <label>job2</label>
                                <input
                                    name="job2"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.job2}
                                    className="validate" />
                            </div>


                        </div>
                    <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">동방FAIRY</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView}
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
}

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw,clubid,job,name,clubid2,job2) => { console.error("register function not defined"); }
};

export default Authentication;