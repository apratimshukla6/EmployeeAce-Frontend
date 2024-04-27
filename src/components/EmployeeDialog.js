import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../graphql/operations';

/**
 * A modal dialog component for creating or updating employee information.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.open - Controls the visibility of the dialog.
 * @param {Function} props.handleClose - Function to close the dialog.
 * @param {object|null} props.employee - The employee object for editing, null when creating a new one.
 */
function EmployeeDialog({ open, handleClose, employee }) {
    const [name, setName] = useState('');
    const [metric1, setMetric1] = useState('');
    const [metric2, setMetric2] = useState('');
    const [metric3, setMetric3] = useState('');

    // Effect to populate fields when an employee is provided for editing.
    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setMetric1(employee.performanceMetrics.metric1);
            setMetric2(employee.performanceMetrics.metric2);
            setMetric3(employee.performanceMetrics.metric3);
        } else {
            setName('');
            setMetric1('');
            setMetric2('');
            setMetric3('');
        }
    }, [employee]);

    const [createEmployee, { error: createError }] = useMutation(CREATE_EMPLOYEE);
    const [updateEmployee, { error: updateError }] = useMutation(UPDATE_EMPLOYEE);

    // Function to handle save action with error handling
    const handleSave = async () => {
        const performanceMetrics = { metric1, metric2, metric3 };
        try {
            if (employee) {
                await updateEmployee({ variables: { id: employee.id, performanceMetrics } });
            } else {
                await createEmployee({ variables: { name, performanceMetrics } });
            }
            handleClose();
        } catch (error) {
            console.error("Error saving employee data:", error);
        }
    };

    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>{employee ? 'Edit Employee' : 'Create New Employee'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Employee Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="metric1"
                    label="Metric 1"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={metric1}
                    onChange={(e) => setMetric1(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="metric2"
                    label="Metric 2"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={metric2}
                    onChange={(e) => setMetric2(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="metric3"
                    label="Metric 3"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={metric3}
                    onChange={(e) => setMetric3(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeDialog;