'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname } from 'next/navigation';

const PaginationComp = ({
  page,
  totalPageCount,
}: {
  page: number;
  totalPageCount: number;
}) => {
  const pathname = usePathname();

  if (totalPageCount === 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2 rounded-lg mr-4">
          <PaginationPrevious
            href={`${pathname}?page=${page - 1}`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
            className={`body-medium text-dark200_light800 ${
              page === 1 ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Prev
          </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className="bg-primary-500 rounded-md">
          <PaginationLink
            href="#"
            aria-disabled={true}
            className="body-semibold text-light-900 pointer-events-none"
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2 rounded-lg ml-4">
          <PaginationNext
            href={`${pathname}?page=${page + 1}`}
            aria-disabled={page === totalPageCount}
            tabIndex={page === totalPageCount ? -1 : undefined}
            className={`body-medium text-dark200_light800 ${
              page === totalPageCount ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationComp;
