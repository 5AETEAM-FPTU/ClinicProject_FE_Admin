const demoEnpoints = {
    GET_AMOUNT_OF_QUESTION: ''
}
const authEndpoint = {
    SIGN_IN: "/auth/login/admin",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-access-token",
}

const adminEndpoint = {
    GET_STAFF_TYPE: "/enums/getAllDoctorStaffTypes",
    ADD_STAFF: "/doctor/adding",
    GET_ALL_DOCTOR: "/admin/getAllDoctor",
}

export { demoEnpoints, authEndpoint, adminEndpoint };