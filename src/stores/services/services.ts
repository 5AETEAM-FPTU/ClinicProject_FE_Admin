'use client'
import { medicineEndpoints, serviceEndpoints } from '@/settings/endpoints'
import { baseApi } from './base'

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllServices: build.query<
            any,
            {
                pageIndex: string
                pageSize: string
                key: string
            }
        >({
            query: (params) => ({
                url: serviceEndpoints.GET_ALL_SERVICES,
                params,
                flashError: true,
                method: 'GET',
            }),
        }),
        createNewService: build.mutation<
            any,
            {
                code: string
                name: string
                description: string
                price: string
                group: string
            }
        >({
            query: (body) => ({
                url: serviceEndpoints.CREATE_SERVICE,
                body: body,
                flashError: true,
                method: 'POST',
            }),
        }),
        deleteService: build.mutation<any, { id: string }>({
            query: (body) => ({
                url: serviceEndpoints.DELETE_SERVICE.replace('{:id}', body.id),
                body: body,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        getServiceById: build.query<any, { id: string }>({
            query: (body) => ({
                url: serviceEndpoints.GET_SERVICE_BY_ID.replace(
                    '{:id}',
                    body.id,
                ),
                flashError: true,
                method: 'GET',
            }),
        }),
        updateServiceById: build.mutation<
            any,
            {
                id: string
                code: string
                name: string
                description: string
                price: string
                group: string
            }
        >({
            query: (body) => ({
                url: serviceEndpoints.UPDATE_SERVICE_BY_ID.replace(
                    '{:id}',
                    body.id,
                ),
                body: {
                    code: body.code,
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    group: body.group,
                },
                flashError: true,
                method: 'PATCH',
            }),
        }),
    }),
})

export const {
    useGetAllServicesQuery,
    useCreateNewServiceMutation,
    useDeleteServiceMutation,
    useGetServiceByIdQuery,
    useUpdateServiceByIdMutation,
} = servicesApi
