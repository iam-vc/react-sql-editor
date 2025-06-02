"use client";

import { useState, useEffect } from "react";

export const useQueryHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("queryHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const addQuery = (query: string) => {
    if (!query.trim()) return;
    const newHistory = [query, ...history.filter((q) => q !== query)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("queryHistory", JSON.stringify(newHistory));
  };

  return { history, addQuery };
};