import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LayersIcon from "@mui/icons-material/Layers";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Program_Icon from '../../../../assets/img/program_img.png';
import { Card, Button, CardGrid } from '../../../../shared-elements';
import {
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const programs = [
    {
        id: "PRO1025",
        title: "Artificial Intelligence",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1026",
        title: "Computer Science",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1027",
        title: "Civil",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1028",
        title: "Mechanical",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1029",
        title: "Marine",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1030",
        title: "Information Technology",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1031",
        title: "Fashion Technology",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1032",
        title: "Bio Technology",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
    {
        id: "PRO1033",
        title: "Aeronautical",
        degree: "Bachelor of Engineering | UG",
        years: "4 yrs",
        terms: "08 Terms",
        batches: "04 Batches",
    },
];

export default function ProgramsPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = React.useState("all");

    const handleClick = (i) => {
        console.log(i);

        // if (i == "PRO1025") {
        navigate("/apps/program/details/info");
        // }
    }
    return (
        <div className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/apps")}
                        className="h-9 w-9 grid place-items-center rounded-md bg-white shadow border border-gray-200 hover:bg-gray-50"
                        aria-label="Go back"
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </button>
                    <div>
                        <h1 className="text-xl font-semibold">Academic Setup</h1>
                        <div className="text-[11px]">Manage all activities related to academics</div>

                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                        <Select
                            id="bu-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Programs</MenuItem>
                            <MenuItem value="PG">PG Programs</MenuItem>
                            <MenuItem value="UG">UG Programs</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        onClick={() => navigate("/apps/program/launch-new-program")}
                        variant="addButton"
                        size="medium"
                    // className="inline-flex items-center gap-2"
                    >
                        <AddIcon fontSize="small" />
                        New Program
                    </Button>
                </div>
            </div>
            <Card className="!shadow-none">

                {/* Header */}
                <div className="flex justify-start items-center mb-6 mt-3">
                    <h2 className="text-xl font-semibold">Programs</h2>

                </div>

                {/* Grid */}
                <CardGrid cols={1} mdCols={2} lgCols={3} gap={5}>
                    {programs.map((program) => (
                        <Card
                            key={program.id}
                            className="border hover:shadow-md transition cursor-pointer"
                            onClick={() => handleClick(program.id)}
                        >
                            <div className="">
                                {/* Top Row */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <img src={Program_Icon} alt="Program" className="h-10" />
                                        <div>
                                            <h3 className="font-semibold">{program.title}</h3>
                                            <p className="text-gray-500 text-sm">{program.degree}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-600 font-medium border border-blue-200">
                                        {program.id}
                                    </span>
                                </div>

                                {/* Footer Stats */}
                                <div className="flex justify-start gap-3 text-gray-600 text-sm mt-2 ml-12">
                                    <div className="flex items-center gap-1">
                                        <AccessTimeIcon fontSize="small" className="text-blue-500" />
                                        {program.years}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <LayersIcon fontSize="small" className="text-purple-500" />
                                        {program.terms}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GroupsIcon fontSize="small" className="text-pink-500" />
                                        {program.batches}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardGrid>
            </Card>
        </div >
    );
}
