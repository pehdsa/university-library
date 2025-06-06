import React from "react";
import { BookCard } from "./BookCard";

interface BookListProps {
  title: string;
  books: BookProps[];
  containerClassName?: string;
}

export function BookList({ title, books, containerClassName }: BookListProps) {
  if (books.length < 2) {
    return;
  }

  return (
    <section className={containerClassName}>
      <h2 className="font-semibold text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
}
