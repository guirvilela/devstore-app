'use client'

import { Skeleton } from '@/app/components/skeleton'
import { Suspense } from 'react'
import { CurrenctSearch } from './current-search'

export default function SearchLoading() {
  return (
    <div className='flex flex-col gap-4'>
      <Suspense>
        <CurrenctSearch />
      </Suspense>

      <div className='grid grid-cols-3 gap-6'>
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
        <Skeleton className='h-[400px]' />
      </div>
    </div>
  )
}
