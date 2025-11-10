import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon } from "@mui/icons-material";
import { IconButton, Switch } from "@mui/material";
import { Button, Select, Input, Table, SearchBar, Card, CardGrid, ContentLayout } from "../../../../shared-elements";

const rows = [
    { dept: "Computer Science", type: "Academic", programs: "03", staffs: "25", hod: "Prof.George Thomas.T" },
    { dept: "Mechanical", type: "Academic", programs: "03", staffs: "25", hod: "Prof.George Thomas.T" },
    { dept: "Accounts", type: "Non-Academic", programs: "-", staffs: "-", hod: "-" },
    { dept: "Electrical Communication", type: "Academic", programs: "03", staffs: "25", hod: "Prof.George Thomas.T" },
];

export default function DepartmentList() {
    const [editingIndex, setEditingIndex] = useState(null);
    const [data, setData] = useState(rows);
    const [draft, setDraft] = useState({ dept: "", type: "Academic", programs: "", staffs: "", hod: "" });
    const [showAddForm, setShowAddForm] = useState(false);
    const [toggleValue, setToggleValue] = useState(false);

    // React Hook Form setup for Add Department Form
    const { 
        control: addFormControl, 
        handleSubmit: handleAddFormSubmit, 
        formState: { errors: addFormErrors, isValid: isAddFormValid },
        reset: resetAddForm
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            departments: [{ name: "", type: "Academic" }]
        }
    });

    // Check if add form is valid
    const isAddFormValidated = isAddFormValid && Object.keys(addFormErrors).length === 0;

    // Handle dynamic departments array
    const { fields: departmentFields, append: appendDepartment, remove: removeDepartment } = useFieldArray({
        control: addFormControl,
        name: "departments"
    });

    const startEdit = (i) => {
        setEditingIndex(i);
        setDraft(data[i]);
    };
    const cancelEdit = () => setEditingIndex(null);
    const commitEdit = (i) => {
        const copy = [...data];
        copy[i] = draft;
        setData(copy);
        setEditingIndex(null);
    };

    const addDepartment = () => {
        appendDepartment({ name: "", type: "Academic" });
    };

    const removeDepartmentItem = (index) => {
        if (departmentFields.length > 1) {
            removeDepartment(index);
        }
    };

    // Form submission handler
    const onSubmitDepartments = (formData) => {
        const newRows = formData.departments.map(dept => ({
            dept: dept.name,
            type: dept.type,
            programs: "03",
            staffs: "25",
            hod: "Prof.George Thomas.T"
        }));
        setData([...data, ...newRows]);
        resetAddForm({
            departments: [{ name: "", type: "Academic" }]
        });
        setShowAddForm(false);
    };

    return (
        <div className="p-6 h-full">
            {!showAddForm ? (
                <>
                    {/* Heading row */}
                    <div className="mb-6 flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-gray-800">Department List</h2>
                            <Switch
                                checked={toggleValue}
                                onChange={(e) => setToggleValue(e.target.checked)}
                                sx={{
                                    transform: 'scale(0.8)',
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#9333ea', // purple-600
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#9333ea', // purple-600
                                    },
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <SearchBar
                                placeholder="Search"
                            />
                            <Button
                                variant="addButton"
                                size="medium"
                                onClick={() => setShowAddForm(true)}
                            >
                                <AddIcon fontSize="small" />
                                Department
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <Table
                        columns={[
                            {
                                key: "dept",
                                label: "DEPARTMENT",
                                render: (value, row, index) => (
                                    editingIndex === index ? (
                                        <Input
                                            value={draft.dept}
                                            onChange={(e) => setDraft({ ...draft, dept: e.target.value })}
                                            className="!mb-0 "
                                        />
                                    ) : (
                                        value
                                    )
                                ),
                                cellClassName: (value, row, index) => editingIndex === index ? '' : 'py-3'
                            },
                            {
                                key: "type",
                                label: "TYPE",
                                render: (value, row, index) => (
                                    editingIndex === index ? (
                                        <Select
                                            value={draft.type}
                                            onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                                            options={[
                                                { value: "Academic", label: "Academic" },
                                                { value: "Non-Academic", label: "Non-Academic" }
                                            ]}
                                            className="!mb-0 !w-full"
                                            SelectProps={{ size: "small" }}
                                        />
                                    ) : (
                                        <span className={`text-sm ${value === "Academic" ? "text-pink-600" : "text-yellow-600"}`}>{value}</span>
                                    )
                                ),
                                cellClassName: (value, row, index) => editingIndex === index ? '' : 'py-3'
                            },
                            { key: "programs", label: "TOTAL PROGRAMS" },
                            { key: "staffs", label: "TOTAL STAFFS" },
                            { key: "hod", label: "HOD" },
                            {
                                key: "actions",
                                label: "ACTIONS",
                                render: (value, row, index) => (
                                    <div className="flex items-center gap-3 text-gray-500">
                                        {editingIndex === index ? (
                                            <>
                                                <button
                                                    className="grid h-6 w-6 place-items-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                                                    title="Apply"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        commitEdit(index);
                                                    }}
                                                >
                                                    <CheckIcon fontSize="small" />
                                                </button>
                                                <button 
                                                    className="hover:text-gray-600 text-xs" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cancelEdit();
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    className="hover:text-blue-600 text-sky-500" 
                                                    title="Update" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        startEdit(index);
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </button>
                                                <button 
                                                    className="hover:text-rose-600 text-red-500" 
                                                    title="Delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )
                            }
                        ]}
                        data={data}
                        striped={true}
                        headerBgColor="#f3f4f6"
                        hoverable={false}
                        onRowClick={null}
                    />
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-6 border-b pb-3">
                        <h2 className="text-base font-semibold">Add New Department</h2>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="cancel"
                                className=""
                                onClick={() => {
                                    resetAddForm({
                                        departments: [{ name: "", type: "Academic" }]
                                    });
                                    setShowAddForm(false);
                                }}
                                size="small"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="!uppercase min-w-[80px]"
                                onClick={handleAddFormSubmit(onSubmitDepartments)}
                                disabled={!isAddFormValidated}
                                size="small"
                            >
                                Add
                            </Button>
                        </div>
                    </div>

                    <ContentLayout className="mt-4">
                        {/* Form Array */}
                        <div className="space-y-4">
                            {departmentFields.map((field, index) => (
                                <CardGrid key={field.id} cols={1} mdCols={3} gap={6} className="items-end">
                                    <div>
                                        <Controller
                                            name={`departments.${index}.name`}
                                            control={addFormControl}
                                            rules={{ 
                                                required: "Department Name is required",
                                                validate: (value) => {
                                                    if (!value || value.trim() === "") {
                                                        return "Department Name is required";
                                                    }
                                                    return true;
                                                }
                                            }}
                                            render={({ field: nameField }) => (
                                                <Input
                                                    label="Department Name"
                                                    placeholder="Enter here"
                                                    required
                                                    {...nameField}
                                                    error={addFormErrors.departments?.[index]?.name?.message}
                                                    className="!mb-0"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={`departments.${index}.type`}
                                            control={addFormControl}
                                            rules={{ 
                                                required: "Department Type is required"
                                            }}
                                            render={({ field: typeField }) => (
                                                <Select
                                                    label="Department Type"
                                                    value={typeField.value}
                                                    onChange={(e) => typeField.onChange(e.target.value)}
                                                    options={[
                                                        { value: "Academic", label: "Academic" },
                                                        { value: "Non-Academic", label: "Non-Academic" }
                                                    ]}
                                                    error={addFormErrors.departments?.[index]?.type?.message}
                                                    className="!mb-0"
                                                    SelectProps={{ size: "small" }}
                                                    required
                                                />
                                            )}
                                        />
                                    </div>
                                    {departmentFields.length > 1 && (
                                        <div className="flex justify-start">
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => removeDepartmentItem(index)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    )}
                                </CardGrid>
                            ))}
                        </div>

                        <div className="mt-6">
                            <Button 
                                variant="outline" 
                                size="small"
                                className="!rounded-full"
                                onClick={addDepartment}
                            >
                                <AddIcon fontSize="inherit" />
                                Department
                            </Button>
                        </div>
                    </ContentLayout>
                </>
            )}
        </div>
    );
}
