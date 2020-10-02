import * as React from 'react';
import { useTable } from 'react-table';
import { connect } from 'react-redux';
import { fetchTournament, Tournament } from '../../store/tournament';
import { State } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const _Table = (props: TableProps) => {
  const { tournament, fetchTournament } = props;
  React.useEffect(() => {
    fetchTournament('3a6202c0-78c4-4f2f-8f29-bb68a311fa65');
  });

  const data = tournament.entrants
    ? tournament.entrants.map((entrant) => ({
        name: entrant.name,
        block: entrant.block,
      }))
    : [];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Block',
        accessor: 'block',
      },
    ],
    []
  );
  //@ts-ignore
  const tableInstance = useTable({ data, columns });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: State) => ({
  tournament: state.tournament,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<Tournament, undefined, Action>
) => ({
  fetchTournament: (tournamentId: string) =>
    dispatch(fetchTournament(tournamentId)),
});

export const Table = connect(mapStateToProps, mapDispatchToProps)(_Table);

interface TableProps {
  tournament: Tournament;
  fetchTournament: (tournamentId: string) => Promise<void>;
}
