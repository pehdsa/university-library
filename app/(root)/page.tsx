import Image from "next/image";
import { BookOverview } from "@/components/BookOverview";
import { BookList } from "@/components/BookList";
// import { sampleBooks } from "@/app/constants";
import { auth } from "@/auth";
import { db } from "@/db";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as BookProps[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
