import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  message: string;
  status: "error" | "warning" | "success" | null;
}

const initialState: IModal = {
  message: "",
  status: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, action) {
      state.message = action.payload.message;
      state.status = action.payload.status;
    }
  },
});

export default modalSlice.reducer
export const {setModal} = modalSlice.actions