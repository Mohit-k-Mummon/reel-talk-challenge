import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from './profile-info.module.css';

import Buttons from '@/components/shared/Buttons';
import app from '@/lib/firebase';
import { getFirestore, doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';

const USER_ID = 'bE2RmKF1qni2Y58Df2GM'; // Constant for uid
const db = getFirestore(app);

const ProfileInfoPage: React.FC = () => {
	const router = useRouter();

	// Firebase
	useEffect(() => {
		async function fetchUserData() {
			const docRef = doc(db, 'users', USER_ID);
			const snapshot = await getDoc(docRef);
			const userData = snapshot.data();
			setUserData(userData);
			setUsername(userData?.username);
			setLocation(userData?.location);
		}
		fetchUserData();
	}, []);

	async function onPageSubmit() {
		const docRef = doc(db, 'users', USER_ID);
		const bio = bioInputRef.current?.value;
		try {
			if (username !== '' && location !== '') {
				await setDoc(
					docRef,
					{
						username: username,
						bio: bio,
						location: location,
					},
					{ merge: true }
				);
				setProfileChanged(false);
				router.push('/onboarding/birthday');
			} else {
			}
		} catch (error) {
			toast.error('Oops something went wrong :(');
		}
	}

	type UserData = {
		bio: string;
		location: string;
		uid: string;
		username: string;
	};

	// State
	const [userData, setUserData] = useState<DocumentData | UserData>();
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [isEditingLocation, setIsEditingLocation] = useState(false);
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [profileChanged, setProfileChanged] = useState(false);

	// Refs
	const locationInputRef = useRef<HTMLInputElement | null>(null);
	const usernameInputRef = useRef<HTMLInputElement | null>(null);
	const bioInputRef = useRef<HTMLTextAreaElement | null>(null);

	// Functions for handling input focus
	const focusLocationInput = () => {
		if (locationInputRef.current) {
			locationInputRef.current.focus();
		}
	};

	const focusUsernameInput = () => {
		if (usernameInputRef.current) {
			usernameInputRef.current.focus();
		}
	};

	// Toggle editing
	const toggleLocationEditing = () => {
		setIsEditingLocation(!isEditingLocation);
	};

	const toggleUsernameEditing = () => {
		setIsEditingUsername(!isEditingUsername);
	};

	// Handle form submissions
	const locationChangeSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newLocation = locationInputRef.current!.value.trim();
		if (newLocation) {
			setLocation(newLocation);
			setUserData(prevState => {
				let newState = prevState;
				newState!.location = newLocation;
				return newState;
			});
			setProfileChanged(true);
		}
		setIsEditingLocation(false);
	};

	const usernameChangeSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newUsername = usernameInputRef.current!.value.trim();
		if (newUsername) {
			setUsername(newUsername);
			setUserData(prevState => {
				let newState = prevState;
				newState!.username = newUsername;
				return newState;
			});
			setProfileChanged(true);
		}
		setIsEditingUsername(false);
	};

	function bioChangeHandler() {
		setProfileChanged(true);
	}

	// Function to handle input focus
	useEffect(() => {
		if (isEditingLocation) {
			focusLocationInput();
		}
		if (isEditingUsername) {
			focusUsernameInput();
		}
	}, [isEditingLocation, isEditingUsername]);

	return (
		<section className={styles.container}>
			{/* ProgressBar */}
			<div className={styles.progress}>
				<Image src={'/progress-2-6.png'} fill alt='' />
			</div>

			<header className={styles.header}>
				<h1>Customize your profile</h1>
				<p>
					Personalizing your profile will enable us to suggest like-minded users and
					nearby communities for exciting watch parties and movie premiere gatherings.
				</p>
			</header>

			{/* Profile Section */}
			<div data-aos='fade-down' className={styles.profile}>
				<div className={styles['profile-container']}>
					<div className={styles['avatar']}>
						<p>K</p>
						<Image
							className={styles['plus-icon']}
							height={24}
							width={24}
							src='/plus.png'
							alt='plus icon'
						/>
					</div>
					<div className={styles['name-location']}>
						<div className={styles['username-container']}>
							{!isEditingUsername ? (
								<p className={styles.username}>{userData?.username}</p>
							) : (
								<form
									onSubmit={usernameChangeSubmit}
									className={styles['location-input-container']}
								>
									<input
										className={styles['location-input']}
										ref={usernameInputRef}
										type='text'
										placeholder='Enter a username'
									/>
									<button className={styles['submit-icon-container']}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='#000'
											className={styles['submit-icon']}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</button>
								</form>
							)}

							<Image
								className={styles['edit-icon']}
								src={'/edit.png'}
								height={12}
								width={12}
								alt=''
								onClick={toggleUsernameEditing}
							></Image>
						</div>
						<div className={styles['location-container']}>
							{!isEditingLocation ? (
								<Image
									className={styles['pin-icon']}
									src={'/pin.webp'}
									height={24}
									width={24}
									alt=''
								></Image>
							) : null}
							{!isEditingLocation ? (
								<p className={styles.location}>{userData?.location}</p>
							) : (
								<form
									onSubmit={locationChangeSubmit}
									className={styles['location-input-container']}
								>
									<input
										className={styles['location-input']}
										ref={locationInputRef}
										type='text'
										placeholder='e.g Seattle, WA'
									/>
									<button className={styles['submit-icon-container']}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='#000'
											className={styles['submit-icon']}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</button>
								</form>
							)}
							<Image
								className={styles['edit-icon']}
								src={'/edit.png'}
								height={12}
								width={12}
								alt=''
								onClick={toggleLocationEditing}
							></Image>
						</div>
					</div>
				</div>
				<textarea
					name='bio'
					id='bio'
					ref={bioInputRef}
					className={styles.bio}
					placeholder="I'm a huge horror movie buff that favors MCU or DC any day. I also love Crime shows and my favorite hero is Spiderman ..."
					maxLength={255}
					defaultValue={userData?.bio}
					onChange={bioChangeHandler}
				></textarea>
			</div>

			{/* Buttons */}
			<Buttons
				profileChanged={profileChanged}
				onPageSubmit={onPageSubmit}
				nextPage={'/onboarding/birthday'}
				prevPage={'/'}
			/>
		</section>
	);
};

export default ProfileInfoPage;
