'use client'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import webStorageClient from '@/utils/webStorageClient'
import React, { useEffect } from 'react'
import { isJwtExpired, isNeedToRefresh } from '../../../../lib/utils'
import { useRequestRefreshTokenMutation } from '@/stores/services/auth'
import { setLoaded, setLoading } from '@/stores/features/loading'
import { useRouter } from 'next/navigation'
import { message } from 'antd'

function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [requestFreshToken, { isLoading }] = useRequestRefreshTokenMutation();
    const dispatch = useAppDispatch()
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
        if (accessToken && isNeedToRefresh(accessToken) && refreshToken && !isLoading) {
            handleRefreshToken(refreshToken);
        } else if (accessToken && isJwtExpired(accessToken) && !isLoading) {
            webStorageClient.remove(constants.ACCESS_TOKEN);
            webStorageClient.remove(constants.REFRESH_TOKEN);
            message.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
            router.push('/sign-in');
            webStorageClient.removeAll();
        }
    }, []);

    return <>{children}</>
}

export default AuthProvider
