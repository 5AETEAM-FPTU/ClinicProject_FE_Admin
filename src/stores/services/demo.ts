'use client'
import { demoEnpoints } from "@/settings/endpoints";
import { baseApi } from "./base";

export const demoApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestions: build.query<any, {amount:number}>({
            query: (params) => ({
                url: demoEnpoints.GET_AMOUNT_OF_QUESTION,
                params: params,
                flashError: true,
                method: 'GET',
                
            }) ,
            extraOptions: {skipAuth: true}
        }),

        //todo mutation instead of query for some solution using endpoint with method POST PATCH, DELETE etc. 
        //todo more info https://redux-toolkit.js.org/rtk-query/usage/mutations
    }), 
})

export const {
    useGetQuestionsQuery
} = demoApi;