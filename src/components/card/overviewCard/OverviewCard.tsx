import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../../redux/actions/loader/loaderActions';
import Styles from './overview.module.scss';

export default function OverviewCard({ abandoned }: { abandoned: number }) {

	return (
		<div className={Styles.container}>
			<div>
				<span>Abandoned transactions</span>
				<h2>
					{abandoned} transactions were abandoned transactions in the last 7
					days
				</h2>
			</div>
		</div>
	);
}
