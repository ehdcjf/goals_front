const initialState = {
  isLoading: false,
  isError: false,
  isAlien: false,
  action: "",
  conditions: [],
  totalSize: null,
};

export const RESET_CONDITION_MESSAGE_REQUEST =
  "RESET_CONDITION_MESSAGE_REQUEST";

export const CONDITION_INIT_REQUEST = "CONDITION_INIT_REQUEST";
export const CONDITION_INIT_SUCCESS = "CONDITION_INIT_SUCCESS";
export const CONDITION_INIT_ERROR = "CONDITION_INIT_ERROR";

export const CONDITION_FETCH_REQUEST = "CONDITION_FETCH_REQUEST";
export const CONDITION_FETCH_SUCCESS = "CONDITION_FETCH_SUCCESS";
export const CONDITION_FETCH_ERROR = "CONDITION_FETCH_ERROR";

export const CONDITION_ADD_REQUEST = "CONDITION_ADD_REQUEST";
export const CONDITION_ADD_SUCCESS = "CONDITION_ADD_SUCCESS";
export const CONDITION_ADD_ERROR = "CONDITION_ADD_ERROR";

export const CONDITION_UPDATE_REQUEST = "CONDITION_UPDATE_REQUEST";
export const CONDITION_UPDATE_SUCCESS = "CONDITION_UPDATE_SUCCESS";
export const CONDITION_UPDATE_ERROR = "CONDITION_UPDATE_ERROR";

export const CONDITION_DELETE_REQUEST = "CONDITION_DELETE_REQUEST";
export const CONDITION_DELETE_SUCCESS = "CONDITION_DELETE_SUCCESS";
export const CONDITION_DELETE_ERROR = "CONDITION_DELETE_ERROR";

export const ResetConditionMessageRequest = () => {
  return {
    type: RESET_CONDITION_MESSAGE_REQUEST,
  };
};

export const ConditionInitRequest = (data) => {
  return {
    type: CONDITION_INIT_REQUEST,
    data,
  };
};

export const ConditionFetchRequest = (data) => {
  return {
    type: CONDITION_FETCH_REQUEST,
    data,
  };
};

export const ConditionAddRequest = (data) => {
  return {
    type: CONDITION_ADD_REQUEST,
    data,
  };
};

export const ConditionUpdateRequest = (data) => {
  return {
    type: CONDITION_UPDATE_REQUEST,
    data,
  };
};

export const ConditionDeleteRequest = (data) => {
  return {
    type: CONDITION_DELETE_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CONDITION_MESSAGE_REQUEST: {
      return {
        ...state,
        isError: false,
        action: "",
      };
    }

    case CONDITION_ADD_REQUEST: {
      return { ...state, isLoading: true, action: "create" };
    }

    case CONDITION_ADD_SUCCESS: {
      const conditions = [...state.conditions];
      conditions.unshift({ ...action.data, new: true });
      return {
        ...state,
        conditions: conditions,
        isLoading: false,
        // totalSize: totalSize + 1,
      };
    }

    case CONDITION_ADD_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case CONDITION_UPDATE_REQUEST: {
      return { ...state, isLoading: true, action: "update" };
    }

    case CONDITION_UPDATE_SUCCESS: {
      const conditions = [...state.conditions];
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].conditionId == action.data.condition.conditionId) {
          conditions[i] = { ...conditions[i], ...action.data.condition };
          break;
        }
      }

      return {
        ...state,
        conditions: conditions,
        isLoading: false,
      };
    }

    case CONDITION_UPDATE_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case CONDITION_INIT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CONDITION_INIT_SUCCESS: {
      return {
        ...state,
        conditions: [...state.conditions, ...action.data.list],
        tags: action.data.tag,
        totalSize: action.data.totalSize,
        isLoading: false,
      };
    }

    case CONDITION_INIT_ERROR: {
      return {
        ...state,
        isError: true,

        isLoading: false,
      };
    }

    case CONDITION_FETCH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CONDITION_FETCH_SUCCESS: {
      return {
        ...state,
        conditions: [...action.data.list],
        totalSize: action.data.totalSize,
        isLoading: false,
      };
    }

    case CONDITION_FETCH_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
        isAlien: true,
      };
    }

    case CONDITION_DELETE_REQUEST: {
      return { ...state, isLoading: true, action: "delete" };
    }

    case CONDITION_DELETE_SUCCESS: {
      const conditionId = action.data.conditionId;
      const conditions = [...state.conditions].filter(
        (v) => v.conditionId != conditionId
      );
      return {
        ...state,
        conditions: conditions,
        isLoading: false,
      };
    }

    case CONDITION_DELETE_ERROR: {
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
