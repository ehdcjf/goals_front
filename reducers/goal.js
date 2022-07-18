const initialState = {
  isLoading: false,
  isError: false,
  isAlien: false,
  action: "",
  error: {
    code: null,
    message: null,
  },
  tags: { tag: [], owner: null },
  goals: [],
  totalSize: null,
};

export const MESSATE_DELETE_REQUEST = "MESSATE_DELETE_REQUEST";

export const GOAL_INIT_REQUEST = "GOAL_INIT_REQUEST";
export const GOAL_INIT_SUCCESS = "GOAL_INIT_SUCCESS";
export const GOAL_INIT_ERROR = "GOAL_INIT_ERROR";

export const GOAL_FETCH_REQUEST = "GOAL_FETCH_REQUEST";
export const GOAL_FETCH_SUCCESS = "GOAL_FETCH_SUCCESS";
export const GOAL_FETCH_ERROR = "GOAL_FETCH_ERROR";

export const GOAL_ADD_REQUEST = "GOAL_ADD_REQUEST";
export const GOAL_ADD_SUCCESS = "GOAL_ADD_SUCCESS";
export const GOAL_ADD_ERROR = "GOAL_ADD_ERROR";

export const GOAL_UPDATE_REQUEST = "GOAL_UPDATE_REQUEST";
export const GOAL_UPDATE_SUCCESS = "GOAL_UPDATE_SUCCESS";
export const GOAL_UPDATE_ERROR = "GOAL_UPDATE_ERROR";

export const GOAL_DELETE_REQUEST = "GOAL_DELETE_REQUEST";
export const GOAL_DELETE_SUCCESS = "GOAL_DELETE_SUCCESS";
export const GOAL_DELETE_ERROR = "GOAL_DELETE_ERROR";

export const DeleteMessageRequest = () => {
  return {
    type: MESSATE_DELETE_REQUEST,
  };
};

export const GoalInitRequest = (data) => {
  return {
    type: GOAL_INIT_REQUEST,
    data,
  };
};

export const GoalFetchRequest = (data) => {
  return {
    type: GOAL_FETCH_REQUEST,
    data,
  };
};

export const GoalAddRequest = (data) => {
  return {
    type: GOAL_ADD_REQUEST,
    data,
  };
};

export const GoalUpdateRequest = (data) => {
  return {
    type: GOAL_UPDATE_REQUEST,
    data,
  };
};

export const GoalDeleteRequest = (data) => {
  return {
    type: GOAL_DELETE_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSATE_DELETE_REQUEST: {
      return {
        ...state,
        isError: false,
        action: "",
      };
    }

    case GOAL_ADD_REQUEST: {
      return { ...state, isLoading: true, action: "create" };
    }

    case GOAL_ADD_SUCCESS: {
      const goals = [...state.goals];
      goals.unshift({ ...action.data, new: true });
      goals.pop();
      return {
        ...state,
        goals: goals,
        isLoading: false,
      };
    }

    case GOAL_ADD_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case GOAL_UPDATE_REQUEST: {
      return { ...state, isLoading: true, action: "update" };
    }

    case GOAL_UPDATE_SUCCESS: {
      const goals = [...state.goals];
      for (let i = 0; i < goals.length; i++) {
        if (goals[i].goalId == action.data.goal.goalId) {
          goals[i] = { ...goals[i], ...action.data.goal };
          break;
        }
      }

      return {
        ...state,
        goals: goals,
        isLoading: false,
      };
    }

    case GOAL_UPDATE_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case GOAL_INIT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GOAL_INIT_SUCCESS: {
      return {
        ...state,
        goals: [...state.goals, ...action.data.list],
        tags: action.data.tag,
        totalSize: action.data.totalSize,
        isLoading: false,
      };
    }

    case GOAL_INIT_ERROR: {
      return {
        ...state,
        isError: true,
        isAlien: true,
        isLoading: false,
      };
    }

    case GOAL_FETCH_REQUEST: {
      return {
        ...state,
        searchData: { ...action.data.searchData },
        isLoading: true,
      };
    }

    case GOAL_FETCH_SUCCESS: {
      return {
        ...state,
        goals: [...action.data.list],
        totalSize: action.data.totalSize,
        isLoading: false,
      };
    }

    case GOAL_FETCH_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case GOAL_DELETE_REQUEST: {
      return { ...state, isLoading: true, action: "delete" };
    }

    case GOAL_DELETE_SUCCESS: {
      const goalId = action.data.goalId;
      const goals = [...state.goals].filter((v) => v.goalId != goalId);
      return {
        ...state,
        goals: goals,
        isLoading: false,
      };
    }

    case GOAL_DELETE_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
