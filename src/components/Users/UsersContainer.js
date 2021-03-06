import React from 'react';
import { connect } from 'react-redux';
import {
  followUser,
  unfollowUser,
  getUsers,
} from '../../redux/reducers/users-reducer';
import Users from './Users';
import DefaultLoader from '../common/loaders/DefaultLoader';
import { compose } from 'redux';
// import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {
  getUsersSelector,
  getPageSize,
  getTotalPages,
  getCurrentPage,
  getIsFetching,
  getIsFollowing,
} from '../../redux/selectors/users-selectors';

/**
 * Now there are 2 container components and 1 functional
 * First container component's purpose is to connect React with Redux Store
 * Second container component's purpose is to make API requests and give props to Users functional component

 * Before there were 3 files: UsersContainer -> UsersContainer2 (Class component) -> Users (Functional component)

 * mapDispatchToProps trick:
 * instead of making a wrapper function that dispatches action,
 * we can just create an object with action creators and pass it as second parameter
 * to connect function. It will do the logic itself.
 * 
 */

// Second container component
class UsersContainer extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      const { currentPage, pageSize, getUsers } = this.props;
      getUsers(currentPage, pageSize);
    }
  }

  onPageChange = (page) => {
    const { getUsers, pageSize } = this.props;
    getUsers(page, pageSize);
  };

  render() {
    if (this.props.isFetching) {
      return <DefaultLoader />;
    }

    return (
      <Users
        currentPage={this.props.currentPage}
        pageSize={this.props.pageSize}
        totalPages={this.props.totalPages}
        users={this.props.users}
        onPageChange={this.onPageChange}
        followUser={this.props.followUser}
        unfollowUser={this.props.unfollowUser}
        isFollowing={this.props.isFollowing}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalPages: getTotalPages(state),
    totalUsersCount: getTotalPages(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowing: getIsFollowing(state),
  };
};

// First container component

export default compose(
  connect(mapStateToProps, {
    getUsers,
    followUser,
    unfollowUser,
  })
  // withAuthRedirect
)(UsersContainer);
