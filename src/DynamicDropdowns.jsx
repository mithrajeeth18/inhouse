import React, { useState } from "react";

const DynamicDropdowns = ({ data, onSelectionChange }) => {
  const [selections, setSelections] = useState({});
  const [keys, setKeys] = useState(Object.keys(data)); // Dynamically determine keys (semesters, branches, etc.)

  const handleSelectionChange = (key, value) => {
    const updatedSelections = { ...selections, [key]: value };

    // Remove all dependent keys after the current selection
    const currentKeyIndex = keys.indexOf(key);
    keys.slice(currentKeyIndex + 1).forEach((dependentKey) => {
      delete updatedSelections[dependentKey];
    });

    setSelections(updatedSelections);
    onSelectionChange(updatedSelections);
  };

  const getOptions = (key) => {
    if (!keys.length) return [];
    const currentKeyIndex = keys.indexOf(key);

    if (currentKeyIndex === 0) {
      // Root level key (e.g., "semesters")
      return Array.isArray(data[key]) ? data[key] : Object.keys(data[key]);
    }

    // Traverse the hierarchy using previously selected values
    let options = data;
    for (let i = 0; i < currentKeyIndex; i++) {
      const prevKey = keys[i];
      const selectedValue = selections[prevKey];
      if (options && selectedValue) {
        options = options[selectedValue];
      } else {
        return [];
      }
    }

    // Return options based on the current key
    return Array.isArray(options) ? options : Object.keys(options);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      {keys.map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">
            {`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
          </label>
          <select
            value={selections[key] || ""}
            onChange={(e) => handleSelectionChange(key, e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!getOptions(key).length} // Disable if no options are available
          >
            <option value="">Select {key}</option>
            {getOptions(key).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default DynamicDropdowns;
