import { contactEndpoints } from "@/settings/endpoints";
import { formServiceBaseApi } from "../formServiceBase";

const contactService = formServiceBaseApi.injectEndpoints({
    endpoints: (build) => ({
        getContactById: build.query<any, string>({
            query: (id) => ({
                url: contactEndpoints.GET_CONTACT_BY_ID.replace('{:id}', id),
                method: 'GET',
                flashError: true,
            }),
        }),
        updateContact: build.mutation<any, { id: string, status: number }>({
            query: (data) => ({
                url: contactEndpoints.UPDATE_CONTACT,
                method: 'PATCH',
                body: data,
                flashError: true,
            }),
        }),
        createNewContact: build.mutation<any, { fullname: string, emailOrPhone: string, content: string, gender: number, age: number }>({
            query: (data) => ({
                url: contactEndpoints.CREATE_CONTACT,
                method: 'POST',
                body: {
                    ...data,
                    status: 1
                },
                flashError: true,
            }),
        }),
        getAllContact: build.query<any, { page: number, limit: number, search: string }>({
            query: (param) => ({
                url: contactEndpoints.GET_ALLCONTACT + `?search=${param.search}&page=${param.page}&limit=${param.limit}`,
                method: 'GET',
                flashError: true,
            }),
        }),
        deleteContact: build.mutation<any, string>({
            query: (id) => ({
                url: contactEndpoints.DELETE_CONTACT.replace('{:id}', id),
                method: 'DELETE',
                flashError: true,
            }),
        }),
    }),
})

export const {
    useGetContactByIdQuery,
    useUpdateContactMutation,
    useGetAllContactQuery,
    useDeleteContactMutation,
} = contactService