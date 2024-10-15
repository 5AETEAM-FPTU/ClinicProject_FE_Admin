'use client'
import { medicineEndpoints } from '@/settings/endpoints'
import { baseApi } from './base'

export const medicineApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllMedicines: build.query<
            any,
            {
                pageIndex: string
                pageSize: string
                medicineName?: string
                medicineTypeId?: string
                medicineGroupId?: string
            }
        >({
            query: (params) => {
                let url = `${medicineEndpoints.GET_ALL_MEDICINE}?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
                if (params.medicineName && params.medicineName.trim()) {
                    url += `&medicineName=${params.medicineName}`
                }
                if (params.medicineTypeId && params.medicineTypeId.trim()) {
                    url += `&medicineTypeId=${params.medicineTypeId}`
                }
                if (params.medicineGroupId && params.medicineGroupId.trim()) {
                    url += `&medicineGroupId=${params.medicineGroupId}`
                }
                return {
                    url: url,
                    flashError: true,
                    method: 'GET',
                }
            },
        }),
        getAllMedicineType: build.query<any, void>({
            query: () => ({
                url: medicineEndpoints.GET_ALL_MEDICINE_TYPE,
                flashError: true,
                method: 'GET',
            }),
        }),
        getAllMedicineGroup: build.query<any, void>({
            query: () => ({
                url: medicineEndpoints.GET_ALL_MEDICINE_GROUP,
                flashError: true,
                method: 'GET',
            }),
        }),
        updateMedicine: build.mutation<
            any,
            {
                medicineId: string
                medicineName: string
                manufacture: string
                medicineGroupId: string
                ingredient: string
                medicineTypeId: string
            }
        >({
            query: (body) => ({
                url: medicineEndpoints.UPDATE_MEDICINE.replace(
                    '{:id}',
                    body.medicineId,
                ),
                body: {
                    medicineName: body.medicineName,
                    manufacture: body.manufacture,
                    medicineGroupId: body.medicineGroupId,
                    ingredient: body.ingredient,
                    medicineTypeId: body.medicineTypeId,
                },
                flashError: true,
                method: 'PATCH',
            }),
        }),
        updateMedicineType: build.mutation<
            any,
            {
                medicineTypeId: string
                name: string
                constant: string
            }
        >({
            query: (body) => ({
                url: medicineEndpoints.UPDATE_MEDICINE_TYPE.replace(
                    '{:id}',
                    body.medicineTypeId,
                ),
                body: {
                    name: body.name,
                    constant: body.constant,
                },
                flashError: true,
                method: 'PATCH',
            }),
        }),
        updateMedicineGroup: build.mutation<
            any,
            {
                medicineGroupId: string
                name: string
                constant: string
            }
        >({
            query: (body) => ({
                url: medicineEndpoints.UPDATE_MEDICINE_GROUP.replace(
                    '{:id}',
                    body.medicineGroupId,
                ),
                body: body,
                flashError: true,
                method: 'PATCH',
            }),
        }),
        deleteMedicine: build.mutation<any, { id: string }>({
            query: (body) => ({
                url: medicineEndpoints.DELETE_MEDICINE.replace(
                    '{:id}',
                    body.id,
                ),
                body: body,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        deleteMedicineType: build.mutation<any, { medicineTypeId: string }>({
            query: (body) => ({
                url: medicineEndpoints.DELETE_MEDICINE_TYPE.replace(
                    '{:id}',
                    body.medicineTypeId,
                ),
                flashError: true,
                method: 'DELETE',
            }),
        }),
        deleteMedicineGroup: build.mutation<
            any,
            {
                medicineGroupId: string
            }
        >({
            query: (body) => ({
                url: medicineEndpoints.DELETE_MEDICINE_GROUP.replace(
                    '{:id}',
                    body.medicineGroupId,
                ),
                body: body,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        createNewMedicine: build.mutation<any, any>({
            query: (body) => ({
                url: medicineEndpoints.CREATE_MEDICINE,
                body: body,
                flashError: true,
                method: 'POST',
            }),
        }),
        createNewMedicineType: build.mutation<any, any>({
            query: (body) => ({
                url: medicineEndpoints.CREATE_MEDICINE_TYPE,
                body: body,
                flashError: true,
                method: 'POST',
            }),
        }),
        createNewMedicineGroup: build.mutation<any, any>({
            query: (body) => ({
                url: medicineEndpoints.CREATE_MEDICINE_GROUP,
                body: body,
                flashError: true,
                method: 'POST',
            }),
        }),
        getMedicineById: build.query<any, string>({
            query: (id) => ({
                url: medicineEndpoints.GET_MEDICINE_BY_ID,
                params: { medicineId: id },
                flashError: true,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetAllMedicinesQuery,
    useDeleteMedicineGroupMutation,
    useDeleteMedicineMutation,
    useDeleteMedicineTypeMutation,
    useGetAllMedicineGroupQuery,
    useGetAllMedicineTypeQuery,
    useUpdateMedicineGroupMutation,
    useUpdateMedicineMutation,
    useUpdateMedicineTypeMutation,
    useCreateNewMedicineMutation,
    useCreateNewMedicineTypeMutation,
    useCreateNewMedicineGroupMutation,
    useGetMedicineByIdQuery,
} = medicineApi
