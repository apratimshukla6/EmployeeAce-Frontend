import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Tooltip, Grid, Button, Typography, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Badge, AppBar, Toolbar, Card, CardContent, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import ScoreIcon from '@mui/icons-material/Score';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import EmployeeDialog from './EmployeeDialog';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql/operations';

/**
 * Employee management component displaying a list of employees with options to sort, search, and manage (add/edit/delete) employee records.
 */
function Employees() {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [deleteEmployee, { error: deleteError }] = useMutation(DELETE_EMPLOYEE);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const filteredEmployees = useMemo(() => {
    const allEmployees = data?.getAllEmployees || [];
    return search.length > 0
      ? allEmployees.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
      : allEmployees;
  }, [data, search]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    if (!filteredEmployees) return [];
    
    // Create a shallow copy of the filteredEmployees array before sorting
    let sortableItems = [...filteredEmployees];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [filteredEmployees, sortConfig.key, sortConfig.direction]);
  

  const handleOpen = (employee) => {
    setCurrentEmployee(employee);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCurrentEmployee(null);
    refetch();
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee({ variables: { id: deleteId } });
      setConfirmOpen(false);
      setDeleteId(null);
      refetch();
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  const openDeleteConfirm = (id) => {
    setConfirmOpen(true);
    setDeleteId(id);
  };

  const handleCreateNew = () => {
    setCurrentEmployee(null);
    setOpenDialog(true);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const scoreBadge = (score) => {
    if (score >= 100) {
      return <Badge badgeContent="100" color="success" />;
    } else if (score >= 25) {
      return <Badge badgeContent={score.toFixed(2)} color="warning" />;
    } else {
      return <Badge badgeContent={score.toFixed(2)} color="error" />;
    }
  };

  const calculateMedianScore = (scores) => {
    if (scores.length === 0){
      return 0
    }
    const sortedScores = scores.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedScores.length / 2);
    
    if (sortedScores.length % 2 === 0) {
      return (sortedScores[middleIndex - 1] + sortedScores[middleIndex]) / 2;
    } else {
      return sortedScores[middleIndex];
    }
  };

  const totalRecords = filteredEmployees.length;
  const scores = filteredEmployees.map(emp => emp.performanceScore);
  const medianScore = calculateMedianScore(scores);
  const averageScore = filteredEmployees.reduce((acc, curr) => acc + curr.performanceScore, 0) / totalRecords || 0;


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (deleteError) return <p>Error occurred during deletion: {deleteError.message}</p>;

  return (
    <div>
      <AppBar position="sticky" color="default" sx={{ backgroundColor: '#424242' }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center" sx={{ padding: 2 }}>
            <Grid item xs={12} sm={4} container justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Typography variant="h6" sx={{ ml: 1, cursor: 'pointer' }} onClick={() => window.location.reload()}>
                  EmployeeAce
                </Typography>
            </Grid>

            <Grid item xs={12} sm={4} container justifyContent="center">
              <TextField
                fullWidth
                label="Search by Employee Name"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
              />
            </Grid>

            <Grid item xs={12} sm={4} container justifyContent={{ xs: 'center', sm: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={handleCreateNew} sx={{ mr: { sm: 0 } }}>
                Create Employee
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} justifyContent="center" sx={{ padding: 2, backgroundColor: '#333' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ display: 'flex', backgroundColor: '#424242', color: 'common.white' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5">
              Total Records
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {totalRecords}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <PeopleIcon fontSize="large" />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ display: 'flex', backgroundColor: '#424242', color: 'common.white' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5">
              Average Score
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {averageScore.toFixed(2)}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <ScoreIcon fontSize="large" />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ display: 'flex', backgroundColor: '#424242', color: 'common.white' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5">
              Median Score
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {medianScore.toFixed(2)}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <EqualizerIcon fontSize="large" />
          </Box>
        </Card>
      </Grid>
    </Grid>
      
      <TableContainer component={Paper} sx={{ marginTop: 2, marginX: 'auto', maxWidth: 'calc(100% - 48px)' }}>
        <Table sx={{ minWidth: 'auto' }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#333' }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell onClick={() => handleSort('name')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                Employee Name <ImportExportIcon fontSize="small" style={{ marginLeft: '8px' }} />
              </TableCell>
              <TableCell align="right">Metric 1</TableCell>
              <TableCell align="right">Metric 2</TableCell>
              <TableCell align="right">Metric 3</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.08)" } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {employee.name}
                  <VerifiedUserIcon sx={{ ml: 1, color: '#1976d2', fontSize: 18, borderRadius: '50%', border: '1px solid #1976d2', padding: '2px' }} />
                </div>
                </TableCell>
                <TableCell align="right" sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.performanceMetrics.metric1}</TableCell>
                <TableCell align="right" sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.performanceMetrics.metric2}</TableCell>
                <TableCell align="right" sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.performanceMetrics.metric3}</TableCell>
                <TableCell align="right">{scoreBadge(employee.performanceScore)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpen(employee)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => openDeleteConfirm(employee.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EmployeeDialog open={openDialog} handleClose={handleClose} employee={currentEmployee} />
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this employee? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">Cancel</Button>
            <Button onClick={handleDelete} color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
}

export default Employees;