import React from "react";
import { db } from "@/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const book = await db.select().from(books).where(eq(books.id, id)).limit(1);
  if (book.length === 0) {
    redirect("/admin/books");
  }

  console.log(book[0], "book");

  return <div>{id}</div>;
};

export default BookPage;
