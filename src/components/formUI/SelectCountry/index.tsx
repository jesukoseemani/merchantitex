import React, { useEffect } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const SelectWrapperCountry = ({ name, options, ...otherProps }: any) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt: any) => {
		const { value } = evt.target;
		setFieldValue(name, value);
	};

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		variant: 'outlined',
		fullWidth: true,
		onChange: handleChange,
	};

	if (meta && meta.touched && meta.error) {
		configSelect.error = true;
		configSelect.helperText = meta.error;
	}

	return (
		<TextField {...configSelect}>
			{options?.map((item: any, i: any) => {
				return (
					<MenuItem key={i} value={item.bankcode}>
						{/* {options[item]} */}
						{item.bankname}
					</MenuItem>
				);
			})}
		</TextField>
	);
};

export default SelectWrapperCountry;
