import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "../utils/types";

type BoardsState = {
  boards: {
    boards: Array<BoardType>
  }
}

export const BoardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: []
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload.boards;
    },
  }
});

export const { setBoards } = BoardsSlice.actions;

export const getBoards = (state: BoardsState) => state.boards.boards;

export default BoardsSlice.reducer;