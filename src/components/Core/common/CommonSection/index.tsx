'use client'
import React from 'react'
import CommonTitle from '../CommonTitle'
import { cn } from '@/lib/utils'

type TProps = {
    title?: string | null
    subtile?: string | null
    tailCustomStyle?: string 
}

function CommonSection({
    title,
    subtile,
    tailCustomStyle
}: TProps) {
    const gradientDirectionsMap: Record<string, string> = {
        Top: 'to bottom',
        Botom: 'to top',
        Left: 'to right',
        Right: 'to left',
    };
    return (
        <div
            className={cn(
                'h-fit w-[1440px] max-w-[1440px] px-[80px] py-[60px]',
                tailCustomStyle
            )}
          
        >
            <CommonTitle title={title} subtile={subtile} />
        </div>
    )
}

export default CommonSection
