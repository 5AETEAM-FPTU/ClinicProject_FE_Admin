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

export {
    demoEnpoints,
    authEndpoint,
    serviceEndpoints,
    adminEndpoint,
    medicineEndpoints,
}
