import Styles from './overview.module.scss';

export default function OverviewCard({ abandoned, event }: { abandoned: number; event: string }) {

	return (
		<div className={Styles.container}>
			<div>
				<span>Abandoned transactions</span>
				<h2>
					{abandoned} transaction(s) were abandoned transaction(s) {event === 'Today' ? '' : 'in'} {event?.toLowerCase()}
				</h2>
			</div>
		</div>
	);
}
