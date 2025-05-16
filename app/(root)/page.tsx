import Image from "next/image";
import { BookOverview } from "@/components/BookOverview";
import { BookList } from "@/components/BookList";
import { sampleBooks } from "@/app/constants"

export default function Home() {
  return (
    <>
      <BookOverview { ...sampleBooks[0] } />
      <BookList title="Latest Books" books={ sampleBooks } containerClassName="mt-28" />    
    </>
  );
}
