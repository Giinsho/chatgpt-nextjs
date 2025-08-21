import React from "react";

type Row = {
  id: string;
  question: string;
};

type Column = {
  id: string;
  title: string;
  icon?: React.ReactNode; // opcjonalne pole dla ikony
  rows: Row[];            // tablica wierszy
};

function ColumnCard({ column }: { column: Column }) {
  return (
    <div className=" sm:flex-row">
      <div className="flex flex-col  items-center justify-center ">
        <div className="flex items-center justify-center w-12 h-12 mb-2">
          {column.icon}
        </div>
        <h2>{column.title}</h2>
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
