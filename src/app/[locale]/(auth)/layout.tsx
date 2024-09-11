import constants from '@/settings/constants'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'


function AuthRootLayout({ children }: { children: React.ReactNode }) {

    // const _accessToken = getCookie(constants.ACCESS_TOKEN, {cookies})

    // if(_accessToken) {
    //     redirect("/");
    // }
    
    return (
        <div>
            <h1 className='text-center'>AUTHEN LAYOUT</h1>
            {children}
        </div>
    )
}

export default AuthRootLayout
