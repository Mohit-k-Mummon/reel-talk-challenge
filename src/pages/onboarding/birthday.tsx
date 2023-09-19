import React, { useState } from 'react';
import styles from './birthday.module.css';
import Image from 'next/image';
import Buttons from '@/components/shared/Buttons';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { getFirestore, setDoc, doc, Timestamp } from 'firebase/firestore';
import app from '@/lib/firebase';
const db = getFirestore(app);

const USER_ID = 'bE2RmKF1qni2Y58Df2GM';

const AddBirthday = () => {
	const router = useRouter();

	const [monthValue, setMonthValue] = useState('');
	const [dayValue, setDayValue] = useState('');
	const [yearValue, setYearValue] = useState('');
	const [yearIsValid, setYearIsValid] = useState(true);

	// Boolean value determine if the form is valid before moving on
	const inputsValid =
		monthValue !== '' && dayValue !== '' && yearValue.length === 4 && yearIsValid;

	function onMonthChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const input = e.target;
		const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

		// Check if the numericValue is empty or within the valid range (1-12)
		if (
			numericValue === '' ||
			(parseInt(numericValue, 10) >= 1 && parseInt(numericValue, 10) <= 12)
		) {
			setMonthValue(numericValue);
		}

		// Update the input field with the cleaned value
		input.value = numericValue;
	}

	function onDayChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const input = e.target;
		const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

		// Parse the numericValue as an integer
		const dayNumber = parseInt(numericValue, 10);

		// Check if the numericValue is empty or within the valid range (1-31)
		if (numericValue === '' || (dayNumber >= 1 && dayNumber <= 31)) {
			setDayValue(numericValue);
		}

		// Update the input field with the cleaned value
		input.value = numericValue;
	}

	function onYearChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const input = e.target.value.replace(/[^0-9]/g, '');
		const regex = /^(19[0-9]{2}|20[0-1][0-9]|202[0-3])$/;

		setYearValue(input);

		if (input.length > 3) {
			if (regex.test(input)) {
				setYearIsValid(true);
			} else {
				setYearIsValid(false);
			}
		}
	}

	// When user uses backspace on year Input it remove the error message
	function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Backspace') {
			setYearIsValid(true);
		}
	}

	async function onPageSubmit() {
		const birthday = new Date(+yearValue, +monthValue - 1, +dayValue);
		const docRef = doc(db, 'users', USER_ID);
		try {
			await setDoc(
				docRef,
				{
					birthday: Timestamp.fromDate(birthday),
				},
				{ merge: true }
			);

			router.push('/onboarding/top-genres');
		} catch (error) {
			toast.error('Server error. Please try again later');
		}
	}

	return (
		<section className={styles.container}>
			<div className={styles.progress}>
				<Image src={'/progress-3-6.png'} fill alt='' />
			</div>
			<div className={styles.birthday}>
				<div data-aos='fade-right' className={styles.prompt}>
					<div className={styles['prompt-container']}>
						<h1>Please provide your date of birth 🎂</h1>
						<p>
							Date of birth will allow us to tailor age-appropriate content and will
							not be shared with any third parties.
						</p>
					</div>
					<div className={styles['input-container']}>
						<div className={styles['input-group']}>
							<label htmlFor='month'>Month</label>
							<input
								onChange={onMonthChangeHandler}
								value={monthValue}
								type='text'
								placeholder='MM'
								aria-label='Month'
								name='monthValue'
							/>
						</div>
						<div className={styles['input-group']}>
							<label htmlFor='day'>Day</label>
							<input
								type='text'
								name='dayValue'
								onChange={onDayChangeHandler}
								value={dayValue}
								placeholder='DD'
								aria-label='Day'
							/>
						</div>
						<div className={styles['input-group']}>
							<label htmlFor='year'>Year</label>
							<input
								type='text'
								placeholder='YYYY'
								onChange={onYearChangeHandler}
								value={yearValue}
								maxLength={4}
								onKeyDown={onKeyDownHandler}
								aria-label='Year'
								aria-describedby='year-error'
								aria-invalid={!yearIsValid}
							/>
							{!yearIsValid ? (
								<p id='year-error' className={styles.error}>
									Invalid Year
								</p>
							) : null}
						</div>
					</div>
				</div>
				<div data-aos='fade-left' className={styles['image-container']}>
					<Image src={'/movies.webp'} fill alt=''></Image>
				</div>
			</div>
			<Buttons
				onPageSubmit={onPageSubmit}
				required
				nextPage={'/onboarding/top-genres'}
				prevPage={'/onboarding/profile-info'}
				profileChanged={inputsValid}
			/>
		</section>
	);
};

export default AddBirthday;
