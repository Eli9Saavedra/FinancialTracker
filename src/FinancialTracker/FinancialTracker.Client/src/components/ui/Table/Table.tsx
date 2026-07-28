
interface TableProps {
    columns: string[];
    children: React.ReactNode;
    emptyMessage?: string;
    isEmpty: boolean;
}
function Table({ columns, children, emptyMessage, isEmpty }: TableProps) {
  return (
      <div>
          <table>
              <thead>
                  <tr>
                      {columns.map(col => (
                          <th key={col}>{col}</th>
                      ))}
                  </tr>
              </thead>
              <tbody>
                  {isEmpty ? (
                      <tr>
                          <td colSpan={columns.length}>
                              {emptyMessage ?? 'No data available'}
                          </td>
                      </tr>
                  ) : (
                      children
                  )}
              </tbody>
          </table>
      </div>
  );
}

export default Table;