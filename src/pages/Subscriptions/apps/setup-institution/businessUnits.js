import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Card, Button, Select, CardGrid } from "../../../../shared-elements";

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

export default function BusinessUnits() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState("all");
  const handleClick = (i) => {
    if (i == 1) {
      navigate("business-unit/affiliation")
    }
  }
  return (
    <div className="h-full p-6">
      {/* Header */}
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
          <h1 className="text-xl font-semibold">Setup Institution</h1>
        </div>

        <div className="flex items-center gap-6">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: "all", label: "All Business Units" },
              { value: "own", label: "Own" },
              { value: "affiliated", label: "Affiliated" },
              { value: "partner", label: "Partner" },
              { value: "constituent", label: "Constituent" },
            ]}
            className="!min-w-[180px]"
            SelectProps={{ size: "small" }}
          />

          <Button
            onClick={() => navigate("/apps/setup-institution/create-business-unit")}
            variant="addButton"
            size="medium"
            className="!w-full"
          >
            <AddIcon fontSize="small" />
            Business Unit
          </Button>
        </div>
      </div>

      {/* Cards */}
      <Card className="!shadow-none">
        <h1 className="text-xl font-semibold pb-4">Business units</h1>

        <CardGrid cols={1} mdCols={2} lgCols={3} gap={6}>
          {businessUnits.map((unit) => (
            <Card
              key={unit.id}
              onClick={() => handleClick(unit.id)}
              className="border !shadow-none hover:!shadow-md transition cursor-pointer"
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

                {/* Top row: name + status + tag */}
                <div className="flex justify-between items-start">
                  {/* Left side: logo + name + type */}
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <BusinessIcon className="text-purple-600" fontSize="small" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{unit.name}</h2>
                      <p className="text-sm text-gray-500">{unit.type}</p>
                    </div>
                  </div>

                  {/* Right side: tag + status */}

                </div>
              </div>
            </Card>

          ))}
        </CardGrid>
      </Card>
    </div>
  );
}
