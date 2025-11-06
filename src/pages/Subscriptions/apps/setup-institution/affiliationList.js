import React, { useState, useEffect } from "react";
import {
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon
} from "@mui/icons-material";
import AffiliationForm from "./affiliationForm";
import UpdateAffiliationForm from "./updateAffliationForm";
import { Button, Table, SearchBar } from "../../../../shared-elements";
export default function AffiliationList() {
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true); // Temporary loading state
    const [data, setData] = useState([]); // State to hold data
    
    const handleOpen = (row) => { setSelected(row); };
    const handleBack = () => setSelected(null);
    
    const affiliationData = [
        {
            id: "AF1234",
            type: "Provisional",
            govBody: "UGC",
            refNo: "UGC00101",
            accBody: "NBA",
            renewal: "12/06/2027",
            score: "A+",
            programs: "10+",
            status: "Active",
        },
        {
            id: "AF1234",
            type: "Conditional",
            govBody: "AICTE",
            refNo: "UGC00101",
            accBody: "NAAC",
            renewal: "12/06/2027",
            score: "A+",
            programs: "10+",
            status: "Inactive",
        },
        {
            id: "AF1234",
            type: "Permanent",
            govBody: "CBSE",
            refNo: "UGC00101",
            accBody: "NBA",
            renewal: "12/06/2027",
            score: "A",
            programs: "10+",
            status: "Active",
        },
        {
            id: "AF1234",
            type: "Renewal Based",
            govBody: "STATE",
            refNo: "UGC00101",
            accBody: "NAAC",
            renewal: "12/06/2027",
            score: "A+",
            programs: "10+",
            status: "Active",
        },
    ];
    const [formVisible, setFormVisible] = useState(false);
    const [formMode, setFormMode] = useState("create"); // "create" | "update"
    const [editingData, setEditingData] = useState(null);

    // Temporary: Simulate data fetching delay to see skeleton
    useEffect(() => {
        const timer = setTimeout(() => {
            setData(affiliationData);
            setLoading(false);
        }, 2000); // 2 second delay to see skeleton

        return () => clearTimeout(timer);
    }, []);

    const createAffilication = () => {
        setFormMode("create");
        setEditingData(null);
        setFormVisible(true);
    };

    const handleEdit = (row) => {
        setFormMode("update");
        setEditingData(row);
        setFormVisible(true);
        setSelected(null); // Close the detail view when opening edit form
    };

    return (
        <div className="h-full">
            {!formVisible ? (
                !selected ? (
                    <div className="p-6">
                        {/* Header with title and search/button */}
                        <div className="flex items-center justify-between mb-6 pb-3 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Affiliation List
                            </h2>

                            <div className="flex items-center gap-4">
                                <SearchBar
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Search"
                                />
                                <Button
                                    variant="addButton"
                                    size="medium"
                                    // className="bg-fuchsia-600 hover:bg-fuchsia-700 inline-flex items-center gap-2"
                                    onClick={createAffilication}
                                >
                                    <AddIcon fontSize="small" />
                                    Affiliation
                                </Button>
                            </div>
                        </div>

                        {/* Table */}
                        <Table
                            columns={[
                                { key: "id", label: "AFF.ID" },
                                { key: "type", label: "AFF.TYPE" },
                                { key: "govBody", label: "GOV.BODY" },
                                { key: "refNo", label: "AFF.REF.NO" },
                                { key: "accBody", label: "ACC.BODY" },
                                { key: "renewal", label: "RENEWAL" },
                                { key: "score", label: "ACC.SCORE" },
                                { key: "programs", label: "PRG.AFFLIATED" },
                                {
                                    key: "status",
                                    label: "STATUS",
                                    render: (value, row) => (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    value === "Active"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            ></div>
                                            {value}
                                        </div>
                                    ),
                                },
                            ]}
                            data={data}
                            loading={loading}
                            loadingRows={4}
                            onRowClick={handleOpen}
                        />
                    </div>
                ) : (
                    <div className="py-6 px-4">
                        {/* Top bar */}
                        <div className="flex items-center justify-between pb-3 border-b">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBack}
                                    className=" flex items-center gap-2"
                                >
                                    <ArrowBackIcon fontSize="small" />
                                    <span className="text-[16px] font-semibold">Affiliation Info</span>
                                </button>
                            </div>
                            <Button
                                variant="outline"
                                size="small"
                                className="!text-blue-600 normal-case !border-0 hover:!bg-transparent"
                                onClick={() => handleEdit(selected)}
                            >
                                <EditIcon fontSize="small" className="mr-1" />
                                <span className="font-medium text-xs text-blue-600">Edit</span>
                            </Button>
                        </div>

                        {/* Details grid */}
                        <div className="p-5">
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-4 text-xs pt-4 p-2">
                                <div>
                                    <div className="text-gray-500">Affiliation Id</div>
                                    <div className="font-medium">{selected.id}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Affiliation Type</div>
                                    <div className="font-medium">{selected.type}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Governing Body</div>
                                    <div className="font-medium">
                                        University Grants Commission
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Aff.Reference no</div>
                                    <div className="font-medium">UGC00101</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Accreditation Body</div>
                                    <div className="font-medium">{selected.accBody}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Accreditation Score</div>
                                    <div className="font-medium">{selected.score}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Start Date</div>
                                    <div className="font-medium">22/03/2025</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">End Date</div>
                                    <div className="font-medium">22/03/2026</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Renewal Date</div>
                                    <div className="font-medium">22/03/2026</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Status</div>
                                    <div className="font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                                        Active
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="p-2">
                                <div className="text-xs text-gray-600 mb-3">
                                    Programs Affiliated
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 text-xs">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i}>
                                            <div className="text-gray-500">Program {i + 1}</div>
                                            <div>B.E Computer Science and Engg</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                formMode === "update" ? (
                    <UpdateAffiliationForm 
                        onClose={() => {
                            setFormVisible(false);
                            setEditingData(null);
                            setFormMode("create");
                        }} 
                        initialData={editingData}
                    />
                ) : (
                    <AffiliationForm 
                        onClose={() => {
                            setFormVisible(false);
                            setEditingData(null);
                            setFormMode("create");
                        }} 
                    />
                )
            )}
        </div>
    );
}