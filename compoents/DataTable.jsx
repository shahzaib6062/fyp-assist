import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';

export default function DataTable(props) {
  const { dataDb } = props;
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'AgNumber', headerName: 'Ag Number', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  {
    dataDb.map((data) => (
      <Link key={data.name} href="/home">
        const rows = [{{ id: 1, fullName: data.name, AgNumber: data.AgNumber }},
        ];
      </Link>
    ));
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
