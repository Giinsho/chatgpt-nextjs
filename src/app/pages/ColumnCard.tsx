import React from "react";

function ColumnCard({ column }: { column: Column }) {
  type Row = {
    id: string;
    question: string;
  };

  type Column = {
    id: string;
    title: string;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="flex items-center justify-center w-12 h-12 mb-2">
          {column.icon}
        </div>
        <h2 className="">{column.title}</h2>
      </div>

      {column.rows.map((row) => (
        <p key={row.id} className="infoText">
          {row.question}
        </p>
      ))}
    </div>
  );
}
export default ColumnCard;
