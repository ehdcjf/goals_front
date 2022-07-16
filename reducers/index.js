import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";

import goal from "./goal";

// const rootReducer = combineReducers({
//     index: (state = {}, action) => {
//         switch (action.type) {
//             case HYDRATE:
//                 return{
//                     ...state,
//                     ...action.payload
//                 }
//             default:
//                 return state
//         }
//     },
//     user,filter,mint,explore,mylist
// })

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.user) nextState.user = state.user;
      return nextState;
    default: {
      const combineReducer = combineReducers({
        user,
        goal,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
