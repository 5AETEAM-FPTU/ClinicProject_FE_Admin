'use client'
import React from 'react'
import CommonTitle from '../CommonTitle'
import { cn } from '@/lib/utils'

type TProps = {
    title?: string | null
    subtile?: string | null
    tailCustomStyle?: string
    children?: React.ReactNode
}

function CommonSection({ title, subtile, tailCustomStyle, children }: TProps) {
    return (
        <div className={cn("w-full h-fit  flex  py-[60px] justify-center", tailCustomStyle)}>
            <div
                className={cn(
                    'h-fit w-[1440px] max-w-[1440px] px-[80px]',
                )}
            >
                <CommonTitle title={title} subtile={subtile} />
                <div className="mt-[40px]">{children}</div>
            </div>
        </div>
    )
}

export default CommonSection
