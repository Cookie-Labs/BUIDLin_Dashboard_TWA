interface TableRowData {
  [key: string]: any;
}

interface TableProps {
  questions: string[];
  data: TableRowData[];
}

const Table: React.FC<TableProps> = ({ questions, data }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto overflow-hidden border border-[0.5rem] border-solid border-gray10">
          <thead>
            <tr>
              <th className="border border-[0.3rem] border-solid border-gray10 bg-secondary px-4 py-2 text-[1.2rem] font-bold text-white">
                #
              </th>
              {questions.map((question, index) => (
                <th
                  key={index}
                  className="whitespace-pre-line border border-[0.3rem] border-solid border-gray10 bg-secondary px-4 py-2 text-[1.2rem] font-bold leading-5 text-white"
                >
                  {question}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-[0.3rem] border-solid border-gray10 odd:bg-gray14 even:bg-gray12"
              >
                <td className="border border-[0.3rem] border-solid border-gray10 bg-secondary px-4 py-2 text-[1.1rem] font-bold">
                  {rowIndex + 1}
                </td>
                {questions.map((question, questionIndex) => (
                  <td
                    key={questionIndex}
                    className="whitespace-pre-line border border-solid border-gray10 px-4 py-2 text-[1.1rem] font-regular leading-5"
                  >
                    {Array.isArray(row[question])
                      ? row[question].join('\n\n')
                      : row[question]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
