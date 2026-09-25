"use client";

interface Props {
  page: number;

  totalPages: number;

  setPage: (page: number) => void;
}

export default function CandidatePagination({
  page,

  totalPages,

  setPage,
}: Props) {
  return (
    <div
      className="
mt-6
flex
items-center
justify-between
"
    >
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="
rounded-xl
border
px-4
py-2
disabled:opacity-40
"
      >
        Previous
      </button>

      <p
        className="
text-sm
text-slate-500
"
      >
        Page {page} of {totalPages}
      </p>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="
rounded-xl
border
px-4
py-2
disabled:opacity-40
"
      >
        Next
      </button>
    </div>
  );
}
