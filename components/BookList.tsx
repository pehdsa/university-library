import React from 'react'
import { sampleBooksProps } from "@/app/constants"

interface BookOverviewProps {
    title: string;
    books: sampleBooksProps[]
    containerClassName?: string;
}

export function BookList({ title, books, containerClassName }: BookOverviewProps) {
  return (
    <section>
        <h2 className='font-semibold text-4xl text-light-100'>Popular Books</h2>
    </section>
  )
}