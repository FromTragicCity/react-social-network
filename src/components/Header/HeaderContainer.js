import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getUserAuthData, logout } from '../../redux/reducers/auth-reducer';

class HeaderComponent extends React.Component {
  render() {
    return (
      <Header
        name={this.props.name}
        isAuth={this.props.isAuth}
        logout={this.props.logout}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  name: auth.login,
  isAuth: auth.isAuth,
});

export default connect(mapStateToProps, { getUserAuthData, logout })(
  HeaderComponent
);
