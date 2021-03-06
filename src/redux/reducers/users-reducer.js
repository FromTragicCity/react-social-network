import { usersAPI } from '../../api/api';

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const GET_TOTAL_PAGES_COUNT = 'GET_TOTAL_PAGES_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const IS_FOLLOWING = 'IS_FOLLOWING';

const initialState = {
  users: [],
  totalUsersCount: 0,
  totalPages: 0,
  pageSize: 4,
  currentPage: 1,
  isFetching: false,
  isFollowing: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_USER: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: true,
            };
          }
          return user;
        }),
      };
    }

    case UNFOLLOW_USER: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: false,
            };
          }
          return user;
        }),
      };
    }

    case SET_USERS: {
      return {
        ...state,
        users: [...action.users],
      };
    }

    case GET_TOTAL_PAGES_COUNT: {
      return {
        ...state,
        totalPages: action.count,
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.page,
      };
    }

    case TOGGLE_FETCHING: {
      return {
        ...state,
        isFetching: action.value,
      };
    }

    case IS_FOLLOWING: {
      return {
        ...state,
        isFollowing: action.value
          ? [...state.isFollowing, action.id]
          : state.isFollowing.filter((id) => id !== action.id),
      };
    }

    default:
      return state;
  }
};

// Action creators
export const follow = (userId) => ({ type: FOLLOW_USER, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW_USER, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setTotal = (count) => ({
  type: GET_TOTAL_PAGES_COUNT,
  count,
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  page,
});
export const toggleFetching = (value) => ({
  type: TOGGLE_FETCHING,
  value,
});
export const setIsFollowing = (id, value) => ({
  type: IS_FOLLOWING,
  id,
  value,
});

// Thunks
export const getUsers = (currentPage, pageSize) => (dispatch) => {
  dispatch(toggleFetching(true));

  usersAPI.getUsers(currentPage, pageSize).then(({ data, total }) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleFetching(false));
    dispatch(setTotal(total));
    dispatch(setUsers(data));
  });
};

export const followUser = (user) => (dispatch) => {
  dispatch(setIsFollowing(user.id, true));
  usersAPI
    .followUser(user.id, {
      ...user,
      followed: true,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(follow(user.id));
      }
      dispatch(setIsFollowing(user.id, false));
    });
};

export const unfollowUser = (user) => (dispatch) => {
  dispatch(setIsFollowing(user.id, true));
  usersAPI
    .unfollowUser(user.id, {
      ...user,
      followed: false,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(unfollow(user.id));
      }
      dispatch(setIsFollowing(user.id, false));
    });
};

export default usersReducer;
