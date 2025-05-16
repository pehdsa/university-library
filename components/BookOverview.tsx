import React from 'react'
import { sampleBooksProps } from "@/app/constants"

export function BookOverview({ author, available_copies ,color,cover,description,genre,rating,title, total_copies }: sampleBooksProps ) {
  return (
    <section className='book-overview'>
        <div className='flex flex-1 flex-col gap-5'>
            <h1>A long button title</h1>
        </div>
    </section>
  )
}