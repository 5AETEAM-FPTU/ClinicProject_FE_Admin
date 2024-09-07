import { createSlice } from "@reduxjs/toolkit";
import { constants } from "@/settings";;
import webStorageClient from "@/utils/webStorageClient";
import { authApis } from "@/stores/services/auth";

export interface IAuth {
  //todo
}
const initialState: IAuth = {

};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //todo adding reducers
  },
  extraReducers: (builder) => {
    //todo builder here
  },
});
export const {
  //todo add reducer in need
} = slice.actions;
export default slice.reducer;
