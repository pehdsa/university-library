"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

interface BorrowBookProps {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

export const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility,
}: BorrowBookProps) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!borrowingEligibility.isEligible) {
      toast.error(borrowingEligibility.message, {
        description: "Please check your eligibility to borrow this book.",
      });
      return;
    }
    setBorrowing(true);

    try {
      const response = await borrowBook({ bookId, userId });
      if (!response.success) {
        toast.error(response.error, {
          description: "Failed to borrow the book.",
        });
        return;
      }

      toast.success("Book borrowed successfully!", {
        description: "You can now view your borrowed books.",
      });

      router.push("/my-profile");
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Error", {
        description: "An error occurred while borrowing the book.",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {" "}
        {borrowing ? "Borrowing" : "Borrow book"}{" "}
      </p>
    </Button>
  );
};
