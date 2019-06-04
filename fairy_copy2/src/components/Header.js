import React from 'react';
import { Link } from 'react-router';

import { Search} from 'components';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            search : false
        }

        this.toggleSearch = this.toggleSearch.bind(this);
    }

    toggleSearch(){
        this.setState({
            search: !this.state.search
        });        
    }  


    
    render() {

        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        const view = (
            <li>{this.props.username}님 {this.props.clubid}  {this.props.job} {this.props.clubid2} {this.props.job2}</li>
        );

        

        const invent = (
             <li><Link to={`/inventoryList/${this.props.clubid}`}>  물품 관리</Link></li>
        );

        const invent2 = (
             <li><Link to={`/inventoryList/${this.props.clubid2}`}>  물품 관리</Link></li>
        );

        const fin = (
             <li><Link to={`/financeList/${this.props.clubid}`}> 자금 관리</Link></li>
        );

        const fin2 = (
             <li><Link to={`/financeList/${this.props.clubid2}`}>  자금 관리</Link></li>
        );

        const mem = (
             <li><Link to={`/memberList/${this.props.clubid}`}>  동아리원 관리</Link></li>
        );

        const mem2 = (
             <li><Link to={`/memberList/${this.props.clubid2}`}>  동아리원 관리</Link></li>
        );


        const searchView = <Search onClose = {this.toggleSearch}
                                   onSearch = {this.props.onSearch}
                                   usernames = {this.props.usernames}/>;

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo left">동방FAIRY</Link>

                        <div className="right">
                            
                            <ul>
                                {this.props.isLoggedIn ? view : undefined}
                                
                                {(this.props.job == 'A') || (this.props.job == 'SS')? invent : undefined }
                                {(this.props.job2 == 'A') || (this.props.job2 == 'SS')? invent2 : undefined }
                                
                                {(this.props.job == 'A') || (this.props.job == 'SS') ? fin : undefined }
                                {(this.props.job2 == 'A') || (this.props.job2 == 'SS')? fin2 : undefined }

                                {(this.props.job == 'A') || (this.props.job == 'SS')? mem : undefined }
                                {(this.props.job2 == 'A') || (this.props.job2 == 'SS')? mem2 : undefined }
                                {this.props.isLoggedIn ? logoutButton : loginButton}
                                
                            
                            </ul>
                        </div>
                    </div>
                </nav>
                    <ReactCSSTransitionGroup 
                        transitionName="search" 
                        transitionEnterTimeout={300} 
                        transitionLeaveTimeout={300}>
                        {this.state.search ? searchView : undefined}
                    </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Header.PropTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    username: React.PropTypes.array,
    job : React.PropTypes.string,
    clubid : React.PropTypes.string
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined"); },
    onClose: () => { console.error("onClose function not defined"); },
    onSearch: () => { console.error("onSearch function not defined"); },
    username: [],
    job:'',
    clubid:''
};

export default Header;
