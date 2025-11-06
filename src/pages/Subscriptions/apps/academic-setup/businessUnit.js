import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from "@mui/icons-material/Add";
import { Card, Button, Select, CardGrid, Dialog } from '../../../../shared-elements';


const BusinessUnitsPage = () => {
    const businessUnits = [
        {
            id: 1,
            name: "Christ University",
            type: "Affiliated | Kengeri",
            status: "Active",
            tag: "Headquarter",
        },
        {
            id: 2,
            name: "Christ University",
            type: "Branch | Bannerghatta",
            status: "Active",
        },
        {
            id: 3,
            name: "New Generation School",
            type: "Partner | Electronic City",
            status: "Active",
        },
        {
            id: 4,
            name: "Green Park Higher Secondary",
            type: "Partner | Jayanagar",
            status: "Active",
        },
        {
            id: 5,
            name: "Cambridge Infotech",
            type: "Constituent | Kalyan Nagar",
            status: "Active",
        },
    ];

    const [open, setOpen] = useState(false);
    const [businessUnit, setBusinessUnit] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAssign = () => {
        console.log("Assigned:", businessUnit);
        handleClose();
    };
    return (
        <div className="h-full p-6">
            {/* <Card className="rounded-lg bg-white p-8 shadow-md"> */}
            <div className='flex flex-row justify-between items-center pb-4 border-b'>
                <h1 className="text-xl font-semibold">Business Units</h1>
                <Button
                    onClick={handleOpen}
                    variant="addButton"
                    size="medium"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 inline-flex items-center gap-2"
                >
                    <BusinessIcon fontSize="small" />
                    Assign New
                </Button>
            </div>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                maxWidth="xs" 
                fullWidth
                title={
                    <span className="flex items-center gap-2">
                        <BusinessIcon fontSize="small" /> Assign New Business Unit
                    </span>
                }
                actions={
                    <>
                        <Button
                            onClick={handleAssign}
                            variant="orange"
                            size="medium"
                        >
                            ASSIGN
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="cancel"
                            size="medium"
                            className="px-4"
                        >
                            CANCEL
                        </Button>
                    </>
                }
            >
                <Select
                    label="Select Business unit"
                    value={businessUnit}
                    onChange={e => setBusinessUnit(e.target.value)}
                    options={[
                        { value: "Christ University, Branch name", label: "Christ University, Branch name" },
                        { value: "Other University", label: "Other University" }
                    ]}
                    className="!mb-0"
                />
            </Dialog>

            <CardGrid cols={1} mdCols={2} lgCols={3} gap={6} className="mt-5">
                {businessUnits.map((unit) => (
                    <Card
                        key={unit.id}
                        className="border shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                        <div className="space-y-1">
                            <div className="flex flex-row justify-end items-end">
                                <div className="flex items-end gap-2">
                                    {unit.tag && (
                                        <span className="text-xs px-2 py-1 rounded bg-pink-100 text-pink-600 font-medium">
                                            {unit.tag}
                                        </span>
                                    )}
                                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                                        {unit.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <BusinessIcon className="text-purple-600" fontSize="small" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg">{unit.name}</h2>
                                        <p className="text-sm text-gray-500">{unit.type}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardGrid>
            {/* </Card> */}
        </div>
    );
};

export default BusinessUnitsPage;