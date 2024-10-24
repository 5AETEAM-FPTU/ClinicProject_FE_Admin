import { userEndpoints } from "@/settings/endpoints"
import { formServiceBaseApi } from "../formServiceBase"
import { baseApi } from "../base"

interface Doctor {
    fullName: string;
    email: string;
    phoneNumber: string;
    genderId: string;
    dob: string; 
    address: string;
    specialtyIds: string[];
    positionId: string;
    role: string;
}

const contactService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllDoctors: build.query<any, { pageIndex: string, pageSize: string, keyword: string }>({
            query: (param) => ({
                url: userEndpoints.GET_DOCTORS,
                method: 'GET',
                params: {
                    pageIndex: param.pageIndex,
                    pageSize: param.pageSize,
                    keyword: param.keyword
                },
                flashError: true,
            }),
        }),
        addDoctor: build.mutation<any, Doctor>({
            query: (doctorBody) => ({
                url: userEndpoints.ADD_DOCTOR,
                method: 'POST',
                body: doctorBody,
                flashError: true,
            }),
        }),
        removeDoctor: build.mutation<any, { doctorId: string }>({
            query: (param) => ({
                url: userEndpoints.REMOVE_DOCTOR.replace('{doctorId}', param.doctorId),
                method: 'DELETE',
                flashError: true,
            }),
        }),
        getAllPatients: build.query<any, { pageIndex: string, pageSize: string}>({
            query: (param) => ({
                url: userEndpoints.GET_PATIENTS,
                method: 'GET',
                params: {
                    pageIndex: param.pageIndex,
                    pageSize: param.pageSize,
                    // keyword: param.keyword
                },
                flashError: true,
            }),
        }),
    }),
})

export const {
    useGetAllDoctorsQuery,
    useAddDoctorMutation,
    useRemoveDoctorMutation,
    useGetAllPatientsQuery
} = contactService