import React from "react";
import {Link} from 'react-router';
import Http from './helpers/Http';
import {connect} from 'react-redux'
import {logout} from './Actions'

class Header extends React.Component {

    logout(e) {
        Http.logout();
        this.props.dispatch(logout());
        this.props.router.push('/login');
    }

    render() {
        return (
            <div className="wrap">
                <nav id="w1" className="navbar-inverse navbar-fixed-top navbar" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#w1-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span></button>
                            <Link className="navbar-brand" to="/">Мобильная лаборатория</Link></div>
                        <div id="w1-collapse" className="collapse navbar-collapse">
                            <ul id="w2" className="navbar-nav navbar-right nav">
                                {this.props.authenticated ?
                                    (<li><a className="active" onClick={this.logout.bind(this)}>{this.props.user.first_name} Выйти</a></li>)
                                    :
                                    (<li><Link to='/login' activeClassName='active'>Войти</Link></li>)
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            authenticated: store.mainMenu.auth,
            user: store.mainMenu.user
        }
    }
)(Header);