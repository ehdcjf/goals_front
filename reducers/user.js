const initalState = {
  loading: false,
  IsLogin: false,
  user: {
    id: null,
    name: null,
  },
  token: null,
};

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const USER_LOGOUT = "USER_LOGOUT";

export const USER_JOIN_REQUEST = "USER_JOIN_REQUEST";
export const USER_JOIN_SUCCESS = "USER_JOIN_SUCCESS";
export const USER_JOIN_ERROR = "USER_JOIN_ERROR";

export const SELLER_APPLY = "SELLER_APPLY";
export const SELLER_APPLY_SUCCESS = "SELLER_APPLY_SUCCESS";
export const SELLER_APPLY_ERROR = "SELLER_APPLY_ERROR";

export const PROFILE_UPDATE = "PROFILE_UPDATE";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_UPDATE_ERROR = "PROFILE_UPDATE_ERROR";

export const UserUpdate_REQUEST = (data) => {
  return {
    type: PROFILE_UPDATE,
    data,
  };
};

export const Seller_Apply_Request = (data) => {
  return {
    type: SELLER_APPLY,
    data,
  };
};

export const UserLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const User_Join_Check = (data) => {
  return {
    type: USER_JOIN_CHECK,
    data,
  };
};

export const UserLoginRequest = (data) => {
  return {
    type: USER_LOGIN_REQUEST,
    data,
  };
};

export const UserJoinRequest = (data) => {
  return {
    type: USER_JOIN_REQUEST,
    data,
  };
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        IsLogin: true,
        loading: false,
        user: action.data.user,
        token: action.data.token,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        user: {
          id: null,
          name: null,
        },
      };

    case USER_JOIN_REQUEST:
      return {
        ...state,
      };

    case USER_JOIN_SUCCESS:
      return {
        ...state,
        IsLogin: true,
        loading: false,
        user: action.data.user,
        token: action.data.token,
      };

    case USER_JOIN_ERROR:
      return {
        ...state,
        loading: false,
      };

    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        IsLogin: false,
        user: {
          id: null,
          name: null,
        },
        token: null,
      };

    case SELLER_APPLY:
      return {
        ...state,
        loading: true,
      };
    case SELLER_APPLY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SELLER_APPLY_ERROR:
      return {
        ...state,
        loading: false,
      };

    case PROFILE_UPDATE:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
