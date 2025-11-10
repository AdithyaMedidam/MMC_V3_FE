import React, { useState } from "react";
import { Switch } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import UpdateProgram from "./updateProgram";
import { Card, Button, Tabs, ContentLayout } from '../../../../shared-elements';

export default function ProgramInfo() {
    const [tab, setTab] = useState(0);
    const [active, setActive] = useState(true);
    const [edit, setEdit] = useState(false);

    const handleTabChange = (newValue) => {
        setTab(newValue);
    };

    const tabItems = [
        { label: "Program Info", value: 0 },
        { label: "Criteria", value: 1 },
    ];
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('AAA');


        // if (i == "PRO1025") {
        // navigate("/apps/program/term");
        // }
    }
    const handleClick1 = () => {
        console.log('AAA');
setEdit(true);

        // if (i == "PRO1025") {
        // navigate("/apps/program/business-unit");
        // }
    }
    const handleClose = () => {
        setEdit(false);
    }

    return (
        <div className="h-full">
          {!edit ? (
            <div className="p-6">
              <h2 className="text-[20px] font-semibold mb-4 border-b pb-2">General</h2>
      
              {/* Tabs + Actions */}
              <ContentLayout>
                <div className="flex justify-between items-center border-b pb-0">
                  <Tabs
                    tabs={tabItems}
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="#A3650F"
                    className="flex-1"
                  />
      
                  <div className="flex items-center gap-2">
                    {/* Active Toggle */}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={active}
                        onChange={() => setActive(!active)}
                        color="success"
                        size="small"
                      />
                      <span
                        className={`font-medium text-xs ${
                          active ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
      
                    {/* Actions */}
                    <Button
                      variant="transparent"
                      size="small"
                      onClick={handleClick1}
                    >
                      <EditIcon fontSize="small" />
                      <span className="font-medium text-[12px] uppercase">Edit</span>
                    </Button>
                    <Button
                      variant="transparent"
                      size="small"
                      className="!text-red-600 !p-0"
                      onClick={handleClick}
                    >
                      <DeleteIcon fontSize="small" />
                      <span className="font-medium text-[12px] uppercase">Delete</span>
                    </Button>
                  </div>
                </div>
      
                {/* Program Info Card */}
                {tab === 0 && (
                  <Card className="mt-6 !shadow-none border lg:w-2/3">
                    <div className="">
                      <p className="text-xs text-gray-500 mb-6">
                        Created on 12/01/2025 by{" "}
                        <span className="font-medium">Chiran Kumar.V</span>
                      </p>
      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 text-sm">
                        <div>
                          <p className="text-gray-500">Program</p>
                          <p className="text-pink-600 font-medium">
                            Artificial Intelligence
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">4 years</p>
                        </div>
                        <div>
                          <p className="text-gray-500">No of Terms</p>
                          <p className="font-medium">08</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Affiliation</p>
                          <p className="font-medium">AICTE</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Department</p>
                          <p className="font-medium">Computer Science</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Degree</p>
                          <p className="font-medium">Bachelor of Engineering</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Degree Type</p>
                          <p className="font-medium">UG</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
      
                {/* Criteria Tab Content */}
                {tab === 1 && (
                  <div className="mt-6 text-gray-500 text-sm">
                    <Card className="mt-6 !shadow-none border lg:w-1/3 md:w-3/5">
                      <div className="">
                        <p className="text-xs text-gray-500 mb-6">
                          Created on 12/02/2025 by{" "}
                          <span className="font-medium">Chetan kumar.V</span>
                        </p>
      
                        {/* Criteria Grid */}
                        <div className="grid grid-cols-2 gap-y-6 text-sm">
                          <div>
                            <p className="text-gray-500">Min. Credits</p>
                            <p className="font-semibold text-purple-600">140</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Credits</p>
                            <p className="font-semibold text-orange-600">200</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Min. Arrears Allowed</p>
                            <p className="font-semibold text-pink-600">12</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Min. Attendance %</p>
                            <p className="font-semibold text-purple-700">75</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </ContentLayout>
            </div>
          ) : (
            <UpdateProgram onClose={handleClose}/>
          )}
        </div>
      );
      
}
