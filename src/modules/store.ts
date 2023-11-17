import { configureStore } from "@reduxjs/toolkit";

import BoardsSlice from "./BoardsSlice";

export default configureStore({
  reducer: {
    boards: BoardsSlice,
  }
});