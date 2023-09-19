import React from 'react';
import styles from './Buttons.module.css';
import Link from 'next/link';

// Define the props for the Buttons component
type ComponentProps = {
	profileChanged?: boolean; // An optional boolean flag indicating whether the profile has changed
	onPageSubmit: () => void; // A required function to handle page submission
	required?: boolean; // An optional boolean flag indicating if the page data is required
	nextPage: string; // A required string representing the URL of the next page
	prevPage: string; // A required string representing the URL of the previous page
	lastStep?: boolean;
};

const Buttons = ({
	profileChanged,
	onPageSubmit,
	required = false,
	nextPage,
	prevPage,
	lastStep = false,
}: ComponentProps) => {
	return (
		<div className={styles.container}>
			<Link href={prevPage} className={styles.clear}>
				Back
			</Link>
			{!required ? (
				profileChanged ? (
					<button onClick={onPageSubmit} className={styles.next}>
						{lastStep ? 'Done' : 'Next'}
					</button>
				) : (
					<Link href={nextPage} className={styles.clear}>
						Skip
					</Link>
				)
			) : profileChanged ? (
				<button onClick={onPageSubmit} className={styles.next}>
					Next
				</button>
			) : (
				<button className={styles.disabled}>{lastStep ? 'Done' : 'Next'}</button>
			)}
		</div>
	);
};

export default Buttons;
