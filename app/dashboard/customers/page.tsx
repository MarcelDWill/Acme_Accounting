import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};

interface PageProps {
  searchParams?: Record<string, string | undefined>; // Fix searchParams typing
}

export default async function Page({ searchParams }: PageProps) {
  // Ensure searchParams is always an object, not a promise
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch filtered customers
  const customers = await fetchFilteredCustomers(query) || [];

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Customers..." />
      </div>

      {/* Render Customers Table */}
      <CustomersTable customers={customers} />

      {/* Pagination Controls */}
      <div className="mt-5 flex w-full justify-center gap-4">
        <a
          href={`?query=${query}&page=${currentPage - 1}`}
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Previous
        </a>
        <span className="p-2">Page {currentPage}</span>
        <a
          href={`?query=${query}&page=${currentPage + 1}`}
          className={`px-4 py-2 bg-gray-200 rounded ${customers.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Next
        </a>
      </div>
    </div>
  );
}
