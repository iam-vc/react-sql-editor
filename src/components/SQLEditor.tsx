"use client";

import { useState } from "react";
import { SQLInput } from "@/components/SQLInput";
import { QueryHistory } from "@/components/QueryHistory";
import { QueryResultTable } from "@/components/QueryResultTable";
import { useQueryHistory } from "@/hooks/useQueryHistory";
import { fetchMockData, mockColumns } from "@/data/mockData";

const DEFAULT_QUERY = "SELECT * FROM users";

const SqlEditor = () => {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [isLoading, setIsLoading] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null);
  const { history, addQuery } = useQueryHistory();

  const sanitizeQuery = (query: string): string => {
    // Basic sanitization to prevent XSS and SQL injection
    return query
      .replace(/--/g, "") // Remove SQL comments
      .replace(/;/g, "") // Remove query terminators
      .replace(/['"]/g, "") // Remove quotes
      .replace(/<script.*?>.*?<\/script>/gi, ""); // Remove script tags
  };

  const runQuery = async () => {
    setCurrentData(null);
    setIsLoading(true);
    try {
      addQuery(sanitizeQuery(query));
      const data = await fetchMockData();
      setCurrentData(data);
    } catch (error) {
      // Handle error appropriately to display to the user
      console.error("Error running query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col flex-grow p-4 space-y-4">
        {/* SQL Input */}
        <section className="bg-white shadow-md rounded-lg p-4">
          <SQLInput value={query} onChange={setQuery} onRun={runQuery} />
        </section>

        {/* Query Result Table */}
        <section
          className="flex-1 bg-white shadow-md rounded-lg p-4 overflow-auto"
          style={{ color: "#000", backgroundColor: "#fff" }}
        >
          {isLoading && <div className="text-gray-700">Loading...</div>}
          {!isLoading && !currentData &&
            <div className="text-gray-700">No results to display</div> }
          { currentData && <QueryResultTable data={currentData} columns={mockColumns} /> }
        </section>
      </div>

      {/* Query History */}
      <aside
        className="bg-white shadow-md border-l border-gray-300 p-4 overflow-y-auto lg:w-72 w-full lg:h-auto h-64"
      >
        <QueryHistory history={history} onSelect={setQuery} />
      </aside>
    </div>
  );
};

export default SqlEditor;