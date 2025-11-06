import React, { useState, useEffect } from 'react';
import Card from '../../../shared-elements/card/Card';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { Business } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'; // If using shared Select, keep your import too!
import { CardGrid, SearchBar, Skeleton } from '../../../shared-elements';

const businessUnits = [
    {
        name: 'Christ University',
        info: 'Affiliated | Kengeri',
        tags: ['Headquarter'],
        status: 'Active',
        dot: true
    },
    {
        name: 'Christ University',
        info: 'Branch | Bannerghatta',
        tags: [],
        status: 'Active'
    },
    {
        name: 'New Generation School',
        info: 'Partner | Electronic City',
        tags: [],
        status: 'Active'
    },
    {
        name: 'Green Park Higher Seco...',
        info: 'Partner | Jayanagar',
        tags: [],
        status: 'Active'
    },
    {
        name: 'Cambridge Infotech...',
        info: 'Constituent | Kalyan Nagar',
        tags: [],
        status: 'Active'
    }
];

const StatusTag = ({ text }) => (
    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200 ml-2">
        {text}
    </span>
);
const LabelTag = ({ text }) => (
    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-pink-100 text-pink-600 border border-pink-200 ml-2">
        {text}
    </span>
);



const Lms = () => {
  const [filter, setFilter] = useState("academicAdmin");
  const [searchBusinessUnit, setSearchBusinessUnit] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate 2 second loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fafbfc]">
      <div className="pt-5 px-6 md:px-10">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          {/* Left: Title/subtitle */}
          <div>
            <div className="text-[20px] font-semibold text-gray-800">Learning Management System</div>
            <div className="text-[11px] text-gray-500">Manage all your Subjects</div>
          </div>

          {/* Right: Filter, Search */}
          <div className="flex items-center gap-4 flex-1 md:flex-none">
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                id="bu-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  borderRadius: "9999px",
                  color: "#AF22C6",
                  border: "1px solid rgba(175, 34, 198, 0.5)",
                  background: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(175, 34, 198, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(175, 34, 198, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(175, 34, 198, 0.5)",
                  },
                }}
              >
                <MenuItem value="academicAdmin">Academic Admin</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
              </Select>
            </FormControl>

            <div className="flex-1 min-w-[180px] max-w-[300px]">
              <SearchBar
                value={searchBusinessUnit}
                onChange={(e) => setSearchBusinessUnit(e.target.value)}
                placeholder="Search by Business unit..."
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <CardGrid cols={1} mdCols={2} lgCols={3} gap={4}>
          {loading ? (
            // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="border">
                <div className="p-4">
                  <Skeleton variant="rectangular" width="60%" height={20} className="mb-3" />
                  <Skeleton variant="rectangular" width="80%" height={16} className="mb-2" />
                  <Skeleton variant="rectangular" width="100%" height={16} />
                </div>
              </Card>
            ))
          ) : (
            businessUnits.map((unit, idx) => (
              <Card key={idx} className="border">
                <div className="flex flex-row items-center justify-end gap-3">
                  {unit.tags && unit.tags.map((tag, i) => (
                    <LabelTag key={i} text={tag} />
                  ))}
                  <StatusTag text={unit.status} />
                </div>
                <div className="mr-3 flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Business className="text-purple-600" size={28} />
                  </div>
                  <div className="flex-1 pr-3">
                    <div className="flex items-center">
                      <span className="font-medium text-[15px] text-gray-900">
                        {unit.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{unit.info}</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardGrid>
      </div>
    </div>
  );
};


export default Lms;