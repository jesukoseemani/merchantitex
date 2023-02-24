import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TablePagination,
	Table,
	TableBody,
	TableCell,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		width: '100%',
		borderRadius: "20px"
	},
	container: {
		maxHeight: '70vh',
		maxWidth: '100%',
		borderRadius: "20px"
	}
});

export default function CustomClickTable({
	columns,
	rows,
	totalRows,
	changePage,
	limit,
	clickable,
	link,
	identifier,
	rowsData
}: {
	columns: any[];
	rows: any[];
	totalRows: number;
	limit: (rowsPerPage: number) => void;
	changePage: (pageNumber: number) => void;
	clickable?: boolean;
	link?: string;
	identifier?: any;
	rowsData?: any;
}) {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([]);
	// made table and pagination dynamic so that any other component can call and use it
	useEffect(() => {
		let number: number = 0;
		const storeArr: number[] = [];
		while (number < totalRows) {
			number += 5;
			if (number < totalRows) storeArr.push(number);
		}
		setRowsPerPageOptions(storeArr);
	}, [totalRows]);

	useEffect(() => {
		changePage(page + 1);
		limit(rowsPerPage);
	}, [page, rowsPerPage]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
		changePage(newPage + 1);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		limit(+event.target.value);
		setPage(0);
	};

	const history = useHistory();

	const handleClick = (row: any) => {
		const val = row[identifier]?.props?.children;

		if (clickable && val) {
			const rowData = rowsData.find((dataItem: any) => dataItem[identifier] === row[identifier]?.props?.children);

			const stringifiedRow = JSON.stringify(rowData);

			history.push({
				pathname: `${link}/${val}`,
				state: { rowData: stringifiedRow }
			})
		}
		return;
	}

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell
									key={index}
									align={column.align}
									style={{
										fontFamily: 'Avenir',
										fontStyle: "normal",
										fontWeight: 500,
										fontSize: "14px",
										lineHeight: "19px",
										letterSpacing: "0.0024px",
										color: "#333333",
										background: "#F4F6F8",

										minWidth: column.minWidth, maxWidth: column.maxWidth
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => {
							return (
								<TableRow
									hover role='checkbox' tabIndex={-1} key={index}
									onClick={() => handleClick(row)}
								>
									{columns.map((column, secondIndex) => {
										const value = row[column.id];
										return (
											<TableCell key={secondIndex} align={column.align} style={{ maxWidth: column.maxWidth }}>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions}
				count={totalRows}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
