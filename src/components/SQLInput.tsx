"use client";

import Editor from "@monaco-editor/react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onRun: () => void;
};

export const SQLInput = ({ value, onChange, onRun }: Props) => {
  return (
    <div className="w-3/4 p-2">
      <div className="h-40 border rounded overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="sql"
          value={value}
          onChange={(val) => onChange(val || "")}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </div>
      <button
        onClick={onRun}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
      >
        Run Query
      </button>
    </div>
  );
};
