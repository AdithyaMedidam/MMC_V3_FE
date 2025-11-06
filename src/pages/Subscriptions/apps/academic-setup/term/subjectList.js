import React, { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import Sub_Icon from '../../../../../assets/img/sub_img.png';
import { useNavigate } from "react-router-dom";
import { Card, CardGrid, SearchBar, Select, Button, Input, Dialog } from "../../../../../shared-elements";

export default function SubjectList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [regularFilter, setRegularFilter] = useState("Regular");
    const [thesisFilter, setThesisFilter] = useState("Thesis");

    // Filter options
    const regularFilterOptions = [
        { value: "Regular", label: "Regular" },
        { value: "All", label: "All" }
    ];

    const thesisFilterOptions = [
        { value: "Thesis", label: "Thesis" },
        { value: "All", label: "All" }
    ];

    const subjectTypeOptions = [
        { value: "Theory", label: "Theory" },
        { value: "Lab", label: "Lab" }
    ];

    const subjectCategoryOptions = [
        { value: "Regular", label: "Regular" },
        { value: "Core", label: "Core" },
        { value: "Elective", label: "Elective" }
    ];

    // dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [subjectType, setSubjectType] = useState("Theory");
    const [subjectCategory, setSubjectCategory] = useState("Regular");

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);
    const handleAddSubject = () => {
        // TODO: wire to API later
        // simple close for now
        setIsDialogOpen(false);
    };
    const navigate = useNavigate();

    const subjects = [
        {
            id: 1,
            title: "Introduction to Computer Pro...",
            code: "PH2151",
            type: "Theory",
            category: "Core",
            status: "Active"
        },
        {
            id: 2,
            title: "Engineering Physics",
            code: "PH2151",
            type: "Theory",
            category: "Core",
            status: "Active"
        },
        {
            id: 3,
            title: "Introduction to Computer Pro...",
            code: "PH3151",
            type: "Lab",
            category: "Regular",
            status: "Active"
        },
        {
            id: 4,
            title: "Engineering Chemistry",
            code: "CH1315",
            type: "Lab",
            category: "Elective",
            status: "Active"
        },
        {
            id: 5,
            title: "Matrices and Calculus",
            code: "MA1315",
            type: "Theory",
            category: "Core",
            status: "Active"
        },
        {
            id: 6,
            title: "Environmental Science",
            code: "PH0151",
            type: "Theory",
            category: "Regular",
            status: "Active"
        }
    ];

    return (
        <div className="p-6 h-full">
            {/* Header */}
            {/* <div className="flex items-center justify-between mb-6 pb-4 border-b"> */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Subject List</h2>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="bg-white"
                    />

                    {/* Filters */}
                    <Select
                        value={regularFilter}
                        onChange={(e) => setRegularFilter(e.target.value)}
                        options={regularFilterOptions}
                        className="min-w-[120px]"
                        SelectProps={{ className: "custom-select-field" }}
                    />

                    <Select
                        value={thesisFilter}
                        onChange={(e) => setThesisFilter(e.target.value)}
                        options={thesisFilterOptions}
                        className="min-w-[120px]"
                        SelectProps={{ className: "custom-select-field" }}
                    />

                    {/* New Subject Button */}
                    <Button
                        variant="addButton"
                        size="medium"
                        className="min-w-fit"
                        onClick={handleOpenDialog}
                    >
                        <AddIcon fontSize="small" />
                        New Subject
                    </Button>
                </div>
            </div>

            {/* Subject Cards Grid */}
            <CardGrid cols={1} mdCols={2} lgCols={3} gap={6}>
                {subjects.map((subject) => (
                    <Card key={subject.id} className="shadow-none border cursor-pointer" onClick={() => navigate(`/apps/program/details/term/subject/subject-info`)}>
                        <div className="">
                            <div className="flex items-start justify-end">
                                {/* Status */}
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                                    {subject.status}
                                </span>
                            </div>
                            <div className="flex items-start justify-start gap-4">
                                <img src={Sub_Icon} alt="Program" className="h-10 mt-2" />
                                <div>
                                    {/* Subject Title */}
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                        {subject.title}
                                    </h3>

                                    {/* Subject Details */}
                                    <div className="flex flex-row gap-4">
                                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                                            {subject.code}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                                                {subject.type}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded bg-pink-100 text-pink-600 font-medium">
                                                {subject.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardGrid>

            {/* Add New Subject Dialog */}
            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                title="Add New Subject"
                subtitle="Term 01"
                maxWidth="sm"
                actions={
                    <>
                        <Button
                            onClick={handleAddSubject}
                            variant="orange"
                            size="small"
                            className="uppercase min-w-[80px]"
                            
                        >
                            ADD
                        </Button>
                        <Button onClick={handleCloseDialog} variant="cancel" size="small" className="normal-case text-gray-600 border-gray-300">CANCEL</Button>
                    </>
                }
            >
                <div className="">
                    <div>
                        <Input
                            label="Subject Name"
                            placeholder="Engineering Graphics"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Input
                                label="Subject Code"
                                placeholder="EG1315"
                                value={subjectCode}
                                onChange={(e) => setSubjectCode(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Select
                                label="Subject Type"
                                value={subjectType}
                                onChange={(e) => setSubjectType(e.target.value)}
                                options={subjectTypeOptions}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Select
                                label="Subject Category"
                                value={subjectCategory}
                                onChange={(e) => setSubjectCategory(e.target.value)}
                                options={subjectCategoryOptions}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
