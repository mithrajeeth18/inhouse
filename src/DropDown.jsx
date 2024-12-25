import React, { useState } from "react";

const DynamicDropdowns = ({ data }) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setSelectedBranch("");
    setSelectedDivision("");
    setSelectedBatch("");
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setSelectedDivision("");
    setSelectedBatch("");
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    setSelectedBatch("");
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  return (
    <div>
      {/* Semesters Dropdown */}
      <div>
        <label>Semester:</label>
        <select value={selectedSemester} onChange={handleSemesterChange}>
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
        <div>
          <label>Branch:</label>
          <select value={selectedBranch} onChange={handleBranchChange}>
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
        <div>
          <label>Division:</label>
          <select value={selectedDivision} onChange={handleDivisionChange}>
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
        <div>
          <label>Batch:</label>
          <select value={selectedBatch} onChange={handleBatchChange}>
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
