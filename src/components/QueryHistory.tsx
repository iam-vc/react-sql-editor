"use client";

type Props = {
  history: string[];
  onSelect: (query: string) => void;
};

export const QueryHistory = ({ history, onSelect }: Props) => (
  <>
    <h2 className="font-bold mb-2 text-black">Query History</h2>
    {history?.length === 0 ? (
      <p className="text-sm text-gray-500">No recent queries</p>
    ) : (
      history.map((query, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(query)}
          className="block text-sm text-blue-600 hover:underline mb-4 text-left"
        >
          {query}
        </button>
      ))
    )}
  </>
);