import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import authReducer from "./reducers/authReducer";
import classroomReducer from "./reducers/classroomReducer";
import joinedClassroomReducer from "./reducers/joinedClassroomReducer";
import actionReducer from "./reducers/actionReducer";
import materialReducer from "./reducers/materialReducer";
import disucssionReducer from "./reducers/discussionReducer";
import answerReducer from "./reducers/answerReducer";
import assignmentReducer from "./reducers/assignmentReducer";
import studentReducer from "./reducers/studentReducer";
import optionReducer from "./reducers/optionReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function () {
  const reducer = combineReducers({
    auth: authReducer,
    created: classroomReducer,
    joined: joinedClassroomReducer,
    action: actionReducer,
    material: materialReducer,
    discussions: disucssionReducer,
    answers: answerReducer,
    assignments: assignmentReducer,
    students: studentReducer,
    option: optionReducer,
  });
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
