'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
// import { IUserInfo, updateUserInfo } from '@/stores/features/auth'
import webStorageClient from '@/utils/webStorageClient'
import React, { useEffect } from 'react'
import RingLoaderComponent from '@/components/Core/common/RingLoader'
import { isJwtExpired, isNeedToRefresh } from './utils'
import { useRequestRefreshTokenMutation } from '@/stores/services/auth'
import { setLoaded, setLoading } from '@/stores/features/loading'
import { useRouter } from 'next/navigation'
function UserProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [requestFreshToken] = useRequestRefreshTokenMutation();
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.loading.isLoading);
    const handleRefreshToken = async (token: string) => {
        dispatch(setLoading());
        const result = await requestFreshToken({ refreshToken: token });
        dispatch(setLoaded());
        if (result.error) {
            console.log(result.error);
        }
    }

    useEffect(() => {
        // handle refresh token
        const accessToken = webStorageClient.getToken();
        const refreshToken = webStorageClient.getRefreshToken();
        if (accessToken && isNeedToRefresh(accessToken) && refreshToken) {
            handleRefreshToken(refreshToken);
        } else if (accessToken && isJwtExpired(accessToken)) {
            webStorageClient.remove(constants.ACCESS_TOKEN);
            webStorageClient.remove(constants.REFRESH_TOKEN);
            dispatch(setLoaded());
            router.push('/sign-in');
        }
    }, []);

    useEffect(() => {
        // const avatar = webStorageClient.get(constants.USER_AVATAR)
        // const fullName = webStorageClient.get(constants.USER_FULLNAME)
        // const email = webStorageClient.get(constants.EMAIL)
        // const updateValue: IUserInfo = {
        //     email: email,
        //     avatarUrl: avatar,
        //     fullName: fullName,
        //     role: null,
        // }
        // dispatch(updateUserInfo(updateValue));
    }, [])

    return <div>
        {loading && <RingLoaderComponent />}
        <div className={loading ? 'pointer-events-none' : ''}>{children}</div>
    </div>
}

export default UserProvider
