interface TableRowData {
  [key: string]: any;
}

interface TableProps {
  questions: string[];
  participants: TableRowData[];
}

const Table: React.FC<TableProps> = ({ questions, participants }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto overflow-hidden border border-[0.4rem] border-solid border-gray10">
        <thead>
          <tr>
            <th className="border border-[0.2rem] border-solid border-gray10 bg-secondary px-4 py-2 text-center text-[1.2rem] font-bold text-white">
              #
            </th>
            {questions.map((question, index) => (
              <th
                key={index}
                className="whitespace-nowrap border border-[0.2rem] border-solid border-gray10 bg-secondary px-4 py-2 text-left text-[1.2rem] font-bold leading-5 text-white"
              >
                {question}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participants.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-gray12 even:bg-gray14">
              <td className="border border-[0.2rem] border-solid border-gray10 bg-secondary px-4 py-2 text-center text-[1.1rem] font-bold">
                {rowIndex + 1}
              </td>
              {questions.map((question, questionIndex) => (
                <td
                  key={questionIndex}
                  className="whitespace-nowrap border border-[0.1rem] border-solid border-gray10 px-4 py-2 text-left text-[1.1rem] font-regular leading-5"
                >
                  {questionIndex === 0 ? (
                    row[question] ? (
                      <span className="text-attendanceAttend">Participated</span>
                    ) : (
                      <span className="text-attendanceAbsent">Not yet</span>
                    )
                  ) : Array.isArray(row[question]) ? (
                    row[question].join('   ||   ')
                  ) : (
                    row[question]
                  )}
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
