'use clients'
import { cn } from '@/lib/utils'
import React from 'react'

type TProps = {
    title?: string | null
    subtile?: string | null
}

function CommonTitle({ title, subtile }: TProps) {
    return (
        <div className={cn('flex w-full flex-col items-center justify-center')}>
            <h1 className={cn('text-[46px] font-bold text-secondaryDarker')}>
                {title ? title.toUpperCase() : ''}
            </h1>
            <p className={cn('font-[500]')}>{subtile}</p>
        </div>
    )
}

export default CommonTitle
