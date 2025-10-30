"use client";

import { Autocomplete, TextField } from "@mui/material";

import "./autocomplete.scss"; // Import the styles for the autocomplete component

export type OptionType = {
  label: string;
  value: string;
};

interface AutocompleteClientProps {
  options: Array<OptionType>;
  label?: string;
}

export default function AutocompleteClient({
  options,
  label,
}: AutocompleteClientProps) {
  return (
    <Autocomplete
      freeSolo
      disablePortal
      size="small"
      options={options}
      sx={{ width: "100%", m: "10px 0" }}
      renderInput={(params) => (
        <TextField {...params} label={label || "Search"} />
      )}
      className="global-search-autocomplete"
    />
  );
}
