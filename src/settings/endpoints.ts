const demoEnpoints = {
    GET_AMOUNT_OF_QUESTION: '',
}
const authEndpoint = {
    SIGN_IN: '/auth/login/admin',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-access-token',
}

const adminEndpoint = {
    GET_STAFF_TYPE: '/enums/getAllDoctorStaffTypes',
    ADD_STAFF: '/doctor/adding',
    GET_ALL_DOCTOR: '/admin/getAllDoctor',
}

const medicineEndpoints = {
    GET_ALL_MEDICINE: '/admin/medicine/all',
    GET_ALL_MEDICINE_TYPE: '/admin/medicineType/all',
    GET_ALL_MEDICINE_GROUP: '/admin/medicineGroup/all',
    GET_MEDICINE_BY_ID: '/admin/medicine',

    CREATE_MEDICINE: '/admin/medicine/create',
    CREATE_MEDICINE_TYPE: '/admin/medicineType/create',
    CREATE_MEDICINE_GROUP: '/admin/medicineGroup/create',

    DELETE_MEDICINE: '/admin/medicine/remove/{:id}',
    DELETE_MEDICINE_TYPE: '/admin/medicineType/remove/{:id}',
    DELETE_MEDICINE_GROUP: '/admin/medicineGroup/remove/{:id}',

    UPDATE_MEDICINE: '/admin/medicine/update/{:id}',
    UPDATE_MEDICINE_TYPE: '/admin/medicineType/update/{:id}',
    UPDATE_MEDICINE_GROUP: '/admin/medicineGroup/update/{:id}',
}

const serviceEndpoints = {
    GET_ALL_SERVICES: '/services/all',
    CREATE_SERVICE: '/services/create',
    DELETE_SERVICE: '/services/remove/{:id}',
    GET_SERVICE_BY_ID: '/services/detail/{:id}',
    UPDATE_SERVICE_BY_ID: '/services/update/{:id}',
}

const blogEndpoints = {
    GET_ALL_CATEGORY: '/api/category/get',
    GET_ALL_ACTIVE_CATEGORY: '/api/category/get-active',
    CREATE_CATEGORY: '/api/category/create',
    DELETE_CATEGORY: '/api/category/delete/{:id}',
    UPDATE_CATEGORY: '/api/category/update',
    GET_ALL_POST: '/api/post/get',
    GET_ALL_ACTIVE_POST: '/api/post/get-active',
    CREATE_POST: '/api/post/create',
    DELETE_POST: '/api/post/delete/{:id}',
    UPDATE_POST: '/api/post/update',
    GET_POST_BY_SLUG: '/api/post/get/{:slug}',
    GET_POST_BY_ID: '/api/post/getById/{:id}',
}

const contactEndpoints = {
    CREATE_CONTACT: '/api/contact/create',
    UPDATE_CONTACT: '/api/contact/update',
    GET_ALLCONTACT: '/api/contact/get',
    DELETE_CONTACT: '/api/contact/delete/{:id}',
    GET_CONTACT_BY_ID: '/api/contact/get/{:id}',
}

const userEndpoints = {
    GET_DOCTORS: '/admin/doctors/all',
    ADD_DOCTOR: '/doctor/adding',
    REMOVE_DOCTOR: '/admin/doctor/{doctorId}',
}

const enumEndpoints = {
    GET_SPECIALTY: '/enum/getAllSpecialty',
    GET_RETREATMENT_TYPE: '/enum/getAllRetreatmentType',
    GET_POSITION: '/enum/getAllPosition',
    GET_GENDER: '/enum/getAllGender',
    GET_APPOINTMENT_STATUS: '/enum/getAllAppointmentStatus',
}


export {
    demoEnpoints,
    authEndpoint,
    serviceEndpoints,
    adminEndpoint,
    medicineEndpoints,
    blogEndpoints,
    contactEndpoints,
    userEndpoints,
    enumEndpoints
}
