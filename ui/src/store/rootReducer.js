import { combineReducers } from "redux";
import { tourReducer } from "./tourStore/tourReducer";
import { singleTourReducer } from "./tourStore/singleTourReducer";
import { loginReducer } from "./loginStore/loginReducer";
import { getCurrentUserReducer } from "./currentUserStore/currentUserReducer";
import { userSettingReducer } from "./userSettingStore/userSettingReducer";
import { updatedPasswordReducer } from "./updatePasswordStore/updatePasswordReducer";
import { bookedTourReducer } from "./bookingStore/bookingTourReducer";
import { signupReducer } from "./signupStore/singupReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  tours: tourReducer,
  tour: singleTourReducer,
  user: loginReducer,
  currentUser: getCurrentUserReducer,
  updatedUser: userSettingReducer,
  updatedPasswordUser: updatedPasswordReducer,
  bookedTour: bookedTourReducer,
  signup: signupReducer,
});

export default rootReducer;
