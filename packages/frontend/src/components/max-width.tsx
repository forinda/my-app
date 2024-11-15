import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode
    className?: string

} & React.HTMLAttributes<HTMLDivElement>
export default function MaxWidth({ children, className, ...props }: Props) {
    return (
        <div
            className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
            {...props}
        >
            {children}
        </div>
    )
}
