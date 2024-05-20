'use client';

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"

interface CountryFilterProps {
    label: string, 
    selectedValue: string, 
    handleChange: (event: SelectChangeEvent<string>) => void,
    options: string[]
}

function CountryFilter({label, selectedValue, handleChange, options}: CountryFilterProps) {
    const inputId = `country-filter-${label.replaceAll(' ', '-').toLowerCase()}`;

    return (
        <FormControl fullWidth sx={{minWidth: '10em'}}>
            <InputLabel id={inputId}>{label}</InputLabel>
            <Select
                labelId={inputId} id={inputId+'-select'}
                value={selectedValue}
                label={label}
                onChange={handleChange}
            >
                {options.map(option => (
                    <MenuItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.substring(1).toLowerCase()}</MenuItem>
                ))}
            </Select>
        </FormControl>        
    )
}

export default CountryFilter