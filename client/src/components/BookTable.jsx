import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { Chip, Rating } from '@mui/material';
// import { STATUS_COLORS } from '../constants.js';

export default function BookTable({ books, loading, onEdit, onDelete }) {
  // Column definitions. accessorKey must match a field name from the API.
  const columns = useMemo(
    () => [
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'author', header: 'Author' },
      {
        accessorKey: 'status',
        header: 'Status',
        // TODO: use Cell to render a colored <Chip> instead of plain text
        // Cell: ({ cell }) => <Chip label={cell.getValue()} ... />
      },
      // TODO: Date Added column (format the date so it's easy to read)
      // TODO: Rating column (render read-only stars)
      // TODO: Notes column
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: books,
    state: { isLoading: loading },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit(row.original)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => onDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
}
