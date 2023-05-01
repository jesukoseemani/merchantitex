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
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
const useStyles = makeStyles({
	root: {
		width: '100%',
		borderRadius: "20px",
		marginTop: "10px"

	},
	container: {
		maxHeight: '70vh',
		maxWidth: '100%',
		borderRadius: "20px 20px 0px 0px"
	},

	noRecord: {
		display: 'flex',
		justifyContent: 'center',
		padding: '20px',
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
	const LoaderSelector = useSelector((state) => state.loader);
	const { LoaderOpened } = LoaderSelector;
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
						<TableRow style={{
							padding: "15px 0px !important",

						}}>
							{columns.map((column, index) => (
								<TableCell
									key={index}
									align={column.align}
									style={{

										background: "#eee",
										paddingLeft: column.paddingLeft,
										paddingRight: column.paddingRight,

										minWidth: column.minWidth, maxWidth: column.maxWidth
									}}
								>
									<h2>

										{column.label}
									</h2>
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
											<TableCell key={secondIndex} align={column.align}
												sx={{

													'&:first-child': {
														paddingLeft: "38px",
													},
													'&:last-child': {
														paddingRight: "38px"

													},

													// padding: "16.5px 39px"
												}}
												style={{ maxWidth: column.maxWidth, }}>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				{!LoaderOpened && (!rows || !rows?.length) ? <div className={classes.noRecord}>
					No record found
				</div> : null}
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions}
				count={totalRows}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				style={{ paddingLeft: "18px" }}
			/>
		</Paper >
	);
}
