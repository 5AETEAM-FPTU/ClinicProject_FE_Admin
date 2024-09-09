'use client'
import constants from '@/settings/constants'
import { Button } from 'antd'
import { setCookie } from 'cookies-next'
import {useRouter } from 'next/navigation'
import React from 'react'

function SignInModule() {
    const router = useRouter();
    const handleSignInFakely =  () => {
         setCookie(constants.ACCESS_TOKEN, "ANY_TOKENS", {maxAge: 3600, path: "/"});
         router.push("/");
    }

    return (
        <div className='w-full h-screen flex-col gap-2 flex justify-center items-center'>
            THIS IS SIGN IN PAGE
            <Button onClick={handleSignInFakely}>SIGN IN</Button>
        </div>
    )
}

export default SignInModule
