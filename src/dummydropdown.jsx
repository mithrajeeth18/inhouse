import React, { useState } from "react";

const DynamicDropdowns = ({ data, onSelectionChange }) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);
    setSelectedBranch("");
    setSelectedDivision("");
    setSelectedBatch("");

    // Trigger the callback with the new values
    onSelectionChange({ semester, branch: "", division: "", batch: "" });
  };

  const handleBranchChange = (e) => {
    const branch = e.target.value;
    setSelectedBranch(branch);
    setSelectedDivision("");
    setSelectedBatch("");

    // Trigger the callback with the new values
    onSelectionChange({
      semester: selectedSemester,
      branch,
      division: "",
      batch: "",
    });
  };

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setSelectedBatch("");

    // Trigger the callback with the new values
    onSelectionChange({
      semester: selectedSemester,
      branch: selectedBranch,
      division,
      batch: "",
    });
  };

  const handleBatchChange = (e) => {
    const batch = e.target.value;
    setSelectedBatch(batch);

    // Trigger the callback with the new values
    onSelectionChange({
      semester: selectedSemester,
      branch: selectedBranch,
      division: selectedDivision,
      batch,
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      {/* Semesters Dropdown */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-2">Semester:</label>
        <select
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Semester</option>
          {data.semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>

      {/* Branches Dropdown */}
      {selectedSemester && (
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Branch:</label>
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            {data.branches[selectedSemester]?.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Divisions Dropdown */}
      {selectedBranch && (
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Division:</label>
          <select
            value={selectedDivision}
            onChange={handleDivisionChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Division</option>
            {data.divisions[selectedSemester]?.[selectedBranch]?.map(
              (division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {/* Batches Dropdown */}
      {selectedDivision && (
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Batch:</label>
          <select
            value={selectedBatch}
            onChange={handleBatchChange}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Batch</option>
            {data.batches[selectedSemester]?.[selectedBranch]?.[
              selectedDivision
            ]?.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DynamicDropdowns;
