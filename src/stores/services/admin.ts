'use client'
import { baseApi } from "./base";
import { adminEndpoint } from "@/settings/endpoints";

export const adminApis = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createStaff: build.mutation<any, { fullName: string, email: string, doctorStaffId: string, phoneNumber: string, gender: string, dob: string, address: string, specialty: string, position: string }>({
            query: (params) => ({
                url: adminEndpoint.ADD_STAFF,
                body: params,
                flashError: true,
                method: 'POST',
            }),
            extraOptions: { skipAuth: false }
        }),
        getStaffType: build.query<any, void>({
            query: () => ({
                url: adminEndpoint.GET_STAFF_TYPE,
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false }
        }),
        getAllDoctor: build.query<any, { page: number }>({
            query: (params) => ({
                url: `${adminEndpoint.GET_ALL_DOCTOR}?pageIndex=${params.page}`,
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false }
        }),
        getStaticInformation: build.query<any, void>({
            query: () => ({
                url: adminEndpoint.GET_STATIC_INFORMATION,
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false }
        }),
    })
})

export const {
    useGetStaffTypeQuery,
    useCreateStaffMutation,
    useGetAllDoctorQuery,
    useGetStaticInformationQuery
} = adminApis;