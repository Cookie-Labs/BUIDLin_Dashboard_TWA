interface TableRowData {
  [key: string]: any;
}

interface TableProps {
  questions: string[];
  data: TableRowData[];
}

const Table: React.FC<TableProps> = ({ questions, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="border-slate-500 min-w-full table-auto border-collapse border">
        <thead>
          <tr>
            <th className="border border-solid px-4 py-2">Index</th>
            {questions.map((question, index) => (
              <th key={index} className="border border-solid px-4 py-2">
                {question}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray10">
              <td className="border border-solid px-4 py-2">{rowIndex + 1}</td>
              {questions.map((question, questionIndex) => (
                <td
                  key={questionIndex}
                  className="border border-solid px-4 py-2"
                >
                  {JSON.stringify(row[question])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
