'use client'
import { request } from "http";
import { baseApi } from "./base";
import { authEndpoint } from "@/settings/endpoints";

export const authApis = baseApi.injectEndpoints({
    endpoints: (build) => ({
        requestLogin: build.mutation<any, { username: string, password: string, isRemember: boolean }>({
            query: (params) => ({
                url: authEndpoint.SIGN_IN,
                body: {
                    username: params.username,
                    password: params.password,
                    isRemember: params.isRemember
                },
                flashError: true,
                method: 'POST',
            }),
            extraOptions: { skipAuth: true }
        }),
        requestLogout: build.mutation<any, void>({
            query: () => ({
                url: authEndpoint.LOGOUT,
                flashError: true,
                method: 'POST',
            }),
            extraOptions: { skipAuth: false }
        }),
        requestRefreshToken: build.mutation<any, { refreshToken: string }>({
            query: (params) => ({
                url: authEndpoint.REFRESH_TOKEN,
                body: {
                    refreshToken: params.refreshToken
                },
                flashError: true,
                method: 'POST',
            }),
            extraOptions: { skipAuth: true }
        }),
    })
})

export const { useRequestLoginMutation, useRequestLogoutMutation, useRequestRefreshTokenMutation } = authApis;