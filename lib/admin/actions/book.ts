"use server";

import { db } from "@/db";
import { books } from "@/db/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      message: "Book created successfully",
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating book",
    };
  }
};
