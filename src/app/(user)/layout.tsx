import constants from '@/settings/constants';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

function UserRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, {cookies});

    if (!_accessToken_Cookie) {
        redirect("/sign-in");
    } 

    return (
        <div>
            <h1 className='text-center'>USER LAYOUT</h1>
            {children}
        </div>
    )
}

export default UserRootLayout
