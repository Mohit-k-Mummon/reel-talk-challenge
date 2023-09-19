import React, { useState } from 'react';
import Image from 'next/image';
import styles from './top-genres.module.css';
import Buttons from '@/components/shared/Buttons';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import Genre from '@/components/TopGenresPage/Genre';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '@/lib/firebase';
const db = getFirestore(app);

const initialGenres = [
	{ name: 'Action 🔫', selected: false, id: 'g1' },
	{ name: 'Adventure 🪂', selected: false, id: 'g2' },
	{ name: 'Animation ✏️', selected: false, id: 'g3' },
	{ name: 'Biography 📚', selected: false, id: 'g4' },
	{ name: 'Comedy 😂', selected: false, id: 'g5' },
	{ name: 'Crime 🕵️‍♂️', selected: false, id: 'g6' },
	{ name: 'Documentary 📽️', selected: false, id: 'g7' },
	{ name: 'Drama 🎭', selected: false, id: 'g8' },
	{ name: 'Family 👨‍👩‍👧‍👦', selected: false, id: 'g9' },
	{ name: 'Fantasy 🦄', selected: false, id: 'g10' },
	{ name: 'History 📜', selected: false, id: 'g11' },
	{ name: 'Horror 🧟‍♂️', selected: false, id: 'g12' },
	{ name: 'Mystery 🔎', selected: false, id: 'g13' },
	{ name: 'Reality-TV 🌎', selected: false, id: 'g14' },
	{ name: 'Romance 💘', selected: false, id: 'g15' },
	{ name: 'Sci-Fi 👽', selected: false, id: 'g16' },
	{ name: 'Sport 🏈', selected: false, id: 'g17' },
	{ name: 'Thriller 😱', selected: false, id: 'g18' },
	{ name: 'War ⚔️', selected: false, id: 'g19' },
	{ name: 'Western 🤠', selected: false, id: 'g20' },
	{ name: 'Adult 🔞', selected: false, id: 'g21' },
	{ name: 'Film-Noir 🎞️', selected: false, id: 'g22' },
	{ name: 'Game-Show 🎲', selected: false, id: 'g23' },
	{ name: 'Music 🎧', selected: false, id: 'g24' },
	{ name: 'Musical 🎶', selected: false, id: 'g25' },
	{ name: 'News 📰', selected: false, id: 'g26' },
	{ name: 'Talk-Show 🗣️', selected: false, id: 'g27' },
	{ name: 'Short ⌛', selected: false, id: 'g28' },
];

const SelectGenresPage = () => {
	const router = useRouter();
	const [profileChanged, setProfileChanged] = useState(false);
	const [showAllGenres, setshowAllGenres] = useState(20);
	const [genres, setGenres] =
		useState<{ name: string; selected: boolean; id: string }[]>(initialGenres);

	const totalSelected = genres.reduce((accumulator, currentValue) => {
		if (currentValue.selected) {
			return accumulator + 1;
		}
		return accumulator;
	}, 0);

	const toggleSelectedGenre = (newVal: boolean, index: number) => {
		if (totalSelected < 3 || !newVal) {
			setGenres(prevState => {
				let newState = [...prevState];
				newState[index].selected = newVal;
				return newState;
			});
			setProfileChanged(true);
		} else {
			toast.error('Oops! Select just 3 genres.');
		}
	};

	function onShowAllGenresToggle() {
		setshowAllGenres(prevState => {
			if (prevState === 20) {
				return 28;
			} else return 20;
		});
	}

	async function onPageSubmit() {
		const topThreeGenres = genres
			.filter(genre => genre.selected === true)
			.map(genre => genre.name);
		const docRef = doc(db, '/users/bE2RmKF1qni2Y58Df2GM');
		try {
			await setDoc(
				docRef,
				{
					top3Genres: topThreeGenres,
				},
				{ merge: true }
			);
			router.push('/onboarding/top-movies');
		} catch (error) {
			toast.error('Oops! Something went wrong');
		}
	}
	return (
		<section className={styles.container}>
			{/* ProgressBar */}
			<div className={styles.progress}>
				<Image src={'/progress-4-6.png'} fill alt='' />
			</div>
			{/* Header */}
			<header className={styles.header}>
				<h1>Select your top 3 genres for movies and TV</h1>
			</header>

			{/* Select */}
			<div data-aos='zoom-in-up' className={styles.genres}>
				{genres.slice(0, showAllGenres).map((genre, index) => (
					<Genre
						key={genre.id}
						title={genre.name}
						selected={genre.selected}
						index={index}
						onSelect={toggleSelectedGenre}
					/>
				))}
			</div>
			<div className={styles['show-container']}>
				<button className={styles['show-more']} onClick={onShowAllGenresToggle}>
					{showAllGenres === 20 ? 'Show more' : 'Show less'}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='13'
						height='6'
						viewBox='0 0 13 6'
						fill='none'
						className={`${styles.chevron} ${
							showAllGenres === 28 ? styles['chevron-active'] : ''
						}`}
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M0.777478 0.46967C1.14745 0.176776 1.74729 0.176776 2.11726 0.46967L6.5 3.93934L10.8827 0.46967C11.2527 0.176776 11.8526 0.176776 12.2225 0.46967C12.5925 0.762563 12.5925 1.23744 12.2225 1.53033L7.16989 5.53033C6.79992 5.82322 6.20008 5.82322 5.83011 5.53033L0.777478 1.53033C0.407508 1.23744 0.407508 0.762563 0.777478 0.46967Z'
							fill='white'
							fillOpacity='0.6'
						/>
					</svg>
				</button>
			</div>

			<Buttons
				required
				prevPage={'/onboarding/birthday'}
				nextPage={'/onboarding/top-movies'}
				onPageSubmit={onPageSubmit}
				profileChanged={profileChanged && totalSelected === 3}
			/>
		</section>
	);
};

export default SelectGenresPage;
