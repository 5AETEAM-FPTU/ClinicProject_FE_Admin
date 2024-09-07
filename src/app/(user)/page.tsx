'use client'
import { Button } from '@nextui-org/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

function DefaultPage() {
    const router = useRouter();
    return (
        <div className='w-full h-screen flex-col gap-2 flex justify-center items-center'>
            <h1>DEFAULT PAGE</h1>
            <Button color='primary'onClick={() => router.push('/demo')} >Go to Demo Page</Button>
        </div>
    )
}

export default DefaultPage
