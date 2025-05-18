"use server";

import { db } from "@/db";
import { books, borrowRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, params.bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book not available",
      };
    }

    const dueDate = dayjs().add(7, "days").toDate().toDateString();

    const record = await db
      .insert(borrowRecords)
      .values({
        userId: params.userId,
        bookId: params.bookId,
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db
      .update(books)
      .set({
        availableCopies: book[0].availableCopies - 1,
      })
      .where(eq(books.id, params.bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.error("Error borrowing book:", error);
    return {
      success: false,
      error: "Error borrowing book",
    };
  }
};
