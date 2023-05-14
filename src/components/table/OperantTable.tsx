import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TablePagination,
	Table,
	TableBody,
	TableCell,
} from "@mui/material";

const useStyles = makeStyles({
	root: {
		width: "100%",
		borderRadius: "20px"
	},
	container: {
		maxHeight: "70vh",
		maxWidth: "100%",
	},
});

export default function OperantTable({
	columns,
	rows,
	totalRows,
	changePage,
	initLimit,
	limit,
	noHeader,
	reset = false,
}: {
	columns: any[];
	rows: any[];
	totalRows: number;
	limit: (rowsPerPage: number) => void;
	initLimit?: number;
	changePage: (pageNumber: number) => void;
	noHeader?: boolean;
	reset?: boolean;
}) {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(initLimit || 10);
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
		if (reset === true) {
			setPage(0);
			setRowsPerPage(10);
			changePage(1);
			setRowsPerPage(10);
			limit(10);
		}
	}, [reset]);

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

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label='sticky table'>
					{noHeader ?? (
						<TableHead>
							<TableRow style={{
								padding: "15px 0px !important",
								borderBottom: "none !important",

							}}>
								{columns.map((column, index) => (
									<TableCell

										key={index}
										align={column.align}
										style={{
											fontFamily: 'Avenir bold',
											fontStyle: "normal",
											fontWeight: 500,
											fontSize: "14px !important",
											lineHeight: "19px",
											letterSpacing: "0.0024px",
											color: "#333333",
											background: "#F4F6F8",

											minWidth: column.minWidth
										}}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
					)}
					<TableBody>
						{rows.map((row, index) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map((column, secondIndex) => {
										const value = row[column.id];
										return (
											<TableCell key={secondIndex} align={column.align} sx={{

												'&:first-child': {
													paddingLeft: "38px",
												},
												'&:last-child': {
													paddingRight: "38px"

												},

												// padding: "16.5px 39px"
											}}>
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
				style={{ paddingLeft: "16px", }}

			/>
		</Paper>
	);
}
