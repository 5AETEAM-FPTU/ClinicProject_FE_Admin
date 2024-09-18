'use client'
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
    })
})

export const { useRequestLoginMutation, useRequestLogoutMutation } = authApis;