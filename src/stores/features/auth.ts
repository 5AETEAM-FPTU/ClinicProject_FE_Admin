import { createSlice } from "@reduxjs/toolkit";
import { constants } from "@/settings";;
import webStorageClient from "@/utils/webStorageClient";
import { authApis } from "@/stores/services/auth";
export interface IAuth {
  user: {
    email: string;
    avatarUrl: string | null;
    fullName: string | null;
  };
}
const initialState: IAuth = {
  user: {
    email: "",
    avatarUrl: null,
    fullName: null
  }
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //todo adding reducers
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApis.endpoints.requestLogin.matchFulfilled, (state, action) => {
      const data = action.payload.body;
      state.user.email = data.user.email;
      state.user.avatarUrl = data.user.avatarUrl;
      state.user.fullName = data.user.fullName;
      webStorageClient.setToken(data.accessToken);
      webStorageClient.setRefreshToken(data.refreshToken);
    })
      .addMatcher(authApis.endpoints.requestLogout.matchFulfilled, (state) => {
        webStorageClient.remove(constants.ACCESS_TOKEN);
        webStorageClient.remove(constants.REFRESH_TOKEN);
      })
  },
});
export const {
  //todo add reducer in need
} = slice.actions;
export default slice.reducer;
