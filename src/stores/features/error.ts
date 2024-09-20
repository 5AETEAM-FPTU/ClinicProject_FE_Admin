import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { set } from 'lodash';

const errorsDefault = {
    '401': {
        desc: 'Phiên đăng nhập hết hạn',
    },
    'EMAIL_DOCTOR_EXITS': {
        desc: 'Email đã tồn tại',
    },
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Tính năng đang bảo trì',
    '503': 'Service Unavailable',
}

export interface IError {
    statusCode: number;
    appCode: string;
    desc: string;
    time?: number;
    isShow?: boolean;
}

const initialState: IError = {
    statusCode: 0,
    appCode: '',
    desc: '',
    time: 1500,
    isShow: false,
}
const slice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        handleError(state, action: PayloadAction<IError>) {
            state.statusCode = action.payload.statusCode;
            state.appCode = action.payload.appCode || '';
            state.desc = action.payload.desc || '';
            state.time = action.payload.time || 1500;
            state.isShow = true;
            setTimeout(() => {
                state.isShow = false;
            }, state.time);
        }
    },
})

export const {
    handleError
} = slice.actions

export default slice.reducer
