import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { Card, Button, Select, Input, CardGrid, ContentLayout } from "../../../../shared-elements";


export default function AffiliationForm({ onClose }) {
    // React Hook Form setup
    const { 
        control, 
        handleSubmit: handleFormSubmit, 
        formState: { errors, isValid } 
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            affiliationId: "",
            affiliationType: "",
            govBody: "",
            referenceNo: "",
            accBody: "",
            accScore: "",
            startDate: null,
            endDate: null,
            renewalDate: null,
            programs: [{ value: "" }]
        }
    });

    // Check if form is valid
    const isFormValid = isValid && Object.keys(errors).length === 0;

    // Handle dynamic programs array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "programs"
    });

    // Form submission handler
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // TODO: Add your API call here
        // onClose();
    };

    const addProgram = () => append({ value: "" });
    const removeProgram = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const programOptions = [
        "B.E Computer Science and Engg",
        "B.E Information Technology",
        "B.E Mechanical Engineering",
        "B.E Civil Engineering"
    ];

    const types = ["Provisional", "Conditional", "Permanent", "Renewal Based"];
    const bodies = ["University Grants Commission", "AICTE", "STATE", "CBSE"];
    const accBodies = ["NBA", "NAAC", "NIRF"];
    const scores = ["A+", "A", "B+"];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h2 className="text-base font-semibold">Add New Affiliation</h2>
                <div className="flex items-center gap-3">
                    <Button variant="cancel" size="small" className="" onClick={onClose}>Cancel</Button>
                    <Button 
                        variant="primary" 
                        size="small" 
                        className="min-w-[80px] !uppercase" 
                        onClick={handleFormSubmit(onSubmit)}
                        disabled={!isFormValid}
                    >
                        Add
                    </Button>
                </div>
            </div>

            <ContentLayout className="mt-4">
                <div className="">
                    <CardGrid cols={1} mdCols={3} gap={6}>
                        {/* Affiliation ID */}
                        <div>
                            <Controller
                                name="affiliationId"
                                control={control}
                                rules={{ 
                                    required: "Affiliation ID is required" 
                                }}
                                render={({ field }) => (
                                    <Input
                                        label="Affiliation ID"
                                        placeholder="Enter here"
                                        required
                                        {...field}
                                        error={errors.affiliationId?.message}
                                        className="!mb-0"
                                    />
                                )}
                            />
                        </div>
                        {/* Affiliation Type */}
                        <div>
                            <Controller
                                name="affiliationType"
                                control={control}
                                rules={{ 
                                    required: "Affiliation Type is required" 
                                }}
                                render={({ field }) => (
                                    <Select
                                        label="Affiliation Type"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        options={[
                                            { value: "", label: "Select" },
                                            ...types.map(x => ({ value: x, label: x }))
                                        ]}
                                        error={errors.affiliationType?.message}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                )}
                            />
                        </div>
                        {/* Government Body */}
                        <div>
                            <Controller
                                name="govBody"
                                control={control}
                                rules={{ 
                                    required: "Government Body is required" 
                                }}
                                render={({ field }) => (
                                    <Select
                                        label="Government Body"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        options={[
                                            { value: "", label: "Select" },
                                            ...bodies.map(x => ({ value: x, label: x }))
                                        ]}
                                        error={errors.govBody?.message}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                )}
                            />
                        </div>

                        {/* Reference No */}
                        <div>
                            <Controller
                                name="referenceNo"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Reference No"
                                        placeholder="Enter here"
                                        {...field}
                                        className="!mb-0"
                                    />
                                )}
                            />
                        </div>
                        {/* Accreditation Body */}
                        <div>
                            <Controller
                                name="accBody"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Accreditation Body"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        options={[
                                            { value: "", label: "Select" },
                                            ...accBodies.map(x => ({ value: x, label: x }))
                                        ]}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                )}
                            />
                        </div>
                        {/* Accreditation Score */}
                        <div>
                            <Controller
                                name="accScore"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Accreditation Score"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        options={[
                                            { value: "", label: "Select" },
                                            ...scores.map(x => ({ value: x, label: x }))
                                        ]}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                )}
                            />
                        </div>

                        {/* Start Date */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* Start Date */}
                            <div>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    rules={{ 
                                        required: "Start Date is required" 
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <label className="input-label text-[11px] text-gray-500 mb-1 block">
                                                Start Date <span className="required">*</span>
                                            </label>
                                            <DatePicker
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(newValue) => field.onChange(newValue ? newValue.toDate() : null)}
                                                format="DD-MM-YYYY"
                                                slots={{ openPickerIcon: CalendarTodayIcon }}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        fullWidth: true,
                                                        error: !!errors.startDate,
                                                        helperText: errors.startDate?.message,
                                                    },
                                                    openPickerButton: { color: 'black' },
                                                }}
                                            />
                                        </>
                                    )}
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    rules={{ 
                                        required: "End Date is required" 
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <label className="input-label text-[11px] text-gray-500 mb-1 block">
                                                End Date <span className="required">*</span>
                                            </label>
                                            <DatePicker
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(newValue) => field.onChange(newValue ? newValue.toDate() : null)}
                                                format="DD-MM-YYYY"
                                                slots={{ openPickerIcon: CalendarTodayIcon }}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        fullWidth: true,
                                                        error: !!errors.endDate,
                                                        helperText: errors.endDate?.message,
                                                    },
                                                }}
                                            />
                                        </>
                                    )}
                                />
                            </div>

                            {/* Renewal Date */}
                            <div>
                                <Controller
                                    name="renewalDate"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <label className="input-label text-[11px] text-gray-500 mb-1 block">Renewal Date</label>
                                            <DatePicker
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(newValue) => field.onChange(newValue ? newValue.toDate() : null)}
                                                format="DD-MM-YYYY"
                                                slots={{ openPickerIcon: CalendarTodayIcon }}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        fullWidth: true,
                                                    },
                                                }}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                        </LocalizationProvider>

                    </CardGrid>

                    {/* Programs Affiliated */}
                    <div className="mt-6">
                        <div className="text-[14px] text-gray-500 mb-2">Programs Affiliated <span className="required">*</span></div>
                        {fields.map((field, idx) => (
                            <div key={field.id} className="grid grid-cols-[1fr_auto] md:w-1/2 items-center gap-2 mb-2">
                                <div>
                                    <Controller
                                        name={`programs.${idx}.value`}
                                        control={control}
                                        rules={{ 
                                            required: "Please select a program",
                                            validate: (value) => {
                                                if (!value || value === "" || value === null || value === undefined) {
                                                    return "Please select a program";
                                                }
                                                return true;
                                            }
                                        }}
                                        render={({ field: programField }) => (
                                            <Select
                                                label={`Program ${idx + 1}`}
                                                value={programField.value}
                                                onChange={(e) => programField.onChange(e.target.value)}
                                                options={[
                                                    { value: "", label: "Select" },
                                                    ...programOptions.map(x => ({ value: x, label: x }))
                                                ]}
                                                error={errors.programs?.[idx]?.value?.message}
                                                className="!mb-0"
                                                SelectProps={{ size: "small" }}
                                            />
                                        )}
                                    />
                                </div>
                                <IconButton 
                                    aria-label="delete" 
                                    color="error" 
                                    onClick={() => removeProgram(idx)} 
                                    disabled={fields.length === 1}
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </div>
                        ))}
                        <Button 
                            variant="outline" 
                            size="small" 
                            onClick={addProgram} 
                            className="normal-case !rounded-full mt-1"
                        >
                            + Program
                        </Button>
                    </div>
                </div>
            </ContentLayout>
        </div>
    );
}
