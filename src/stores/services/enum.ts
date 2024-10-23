import { enumEndpoints } from "@/settings/endpoints"
import { baseApi } from "./base"

export const enumApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSpecicalties: build.query<any,any>({
            query: () => ({
                url: enumEndpoints.GET_SPECIALTY,
                method: 'GET',
                flashError: true,
            })
        }),
        getAllPosition: build.query<any,any>({
            query: () => ({
                url: enumEndpoints.GET_POSITION,
                method: 'GET',
                flashError: true,
            })
        }),
        getAllRetreatmentType: build.query<any,any>({
            query: () => ({
                url: enumEndpoints.GET_RETREATMENT_TYPE,
                method: 'GET',
                flashError: true,
            })
        }),
        getAllGender: build.query<any,any>({
            query: () => ({
                url: enumEndpoints.GET_GENDER,
                method: 'GET',
                flashError: true,
            })
        }),
        getAllAppointmentStatus: build.query<any,any>({
            query: () => ({
                url: enumEndpoints.GET_APPOINTMENT_STATUS,
                method: 'GET',
                flashError: true,
            })
        }),
    })
})

export const {
    useGetAllSpecicaltiesQuery,
    useGetAllPositionQuery,
    useGetAllRetreatmentTypeQuery,
    useGetAllGenderQuery,
    useGetAllAppointmentStatusQuery
} = enumApi;