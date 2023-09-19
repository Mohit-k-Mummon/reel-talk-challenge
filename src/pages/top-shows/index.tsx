import React, { useState } from 'react';
import styles from './TopShowsPage.module.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '@/lib/firebase';
import Image from 'next/image';
import Buttons from '@/components/Home/Buttons';
import Movie from '@/components/TopMoviesPage/Movie';
import Selection from '@/components/TopMoviesPage/Selection';

const db = getFirestore(app);

const dummyShows = [
	{
		id: 1,
		selected: false,
		title: 'Breaking Bad',
		releaseYear: '2008-2013',
		poster: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg',
	},
	{
		id: 2,
		selected: false,
		title: 'Band of Brothers',
		releaseYear: 2001,
		poster: 'https://m.media-amazon.com/images/M/MV5BMTI3ODc2ODc0M15BMl5BanBnXkFtZTYwMjgzNjc3._V1_FMjpg_UX1000_.jpg',
	},
	{
		id: 3,
		selected: false,
		title: 'Chernobyl',
		releaseYear: 2019,
		poster: 'https://m.media-amazon.com/images/M/MV5BMmI2OTMxZTUtMTM5OS00MGNiLWFhNGMtYzJiODUwYjRmODA5XkEyXkFqcGdeQXVyMTM0NTc2NDgw._V1_.jpg',
	},
	{
		id: 4,
		selected: false,
		title: 'The Wire',
		releaseYear: '2002-2008',
		poster: 'https://m.media-amazon.com/images/M/MV5BZmY5ZDMxODEtNWIwOS00NjdkLTkyMjktNWRjMDhmYjJjN2RmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_QL75_UX190_CR0,2,190,281_.jpg',
	},
	{
		id: 5,
		selected: false,
		title: 'The Sopranos',
		releaseYear: '1997-2007',
		poster: 'https://m.media-amazon.com/images/M/MV5BNmU3MjkzZWQtOTk1Ni00OTNiLWJhMmMtNmEyN2JjZjUzZDUyXkEyXkFqcGdeQXVyNDIyNjA2MTk@._V1_FMjpg_UX1000_.jpg',
	},
	{
		id: 6,
		selected: false,
		title: 'Game of Thrones',
		releaseYear: '2011-2017',
		poster: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
	},
	{
		id: 7,
		selected: false,
		title: 'Sherlock',
		releaseYear: '2010-2017',
		poster: 'https://m.media-amazon.com/images/M/MV5BMWEzNTFlMTQtMzhjOS00MzQ1LWJjNjgtY2RhMjFhYjQwYjIzXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg',
	},
	{
		id: 8,
		selected: false,
		title: 'The Office',
		releaseYear: '2005-2017',
		poster: 'https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg',
	},
	{
		id: 9,
		selected: false,
		title: 'Planet Earth II',
		releaseYear: '2016',
		poster: 'https://m.media-amazon.com/images/M/MV5BMGZmYmQ5NGQtNWQ1MC00NWZlLTg0MjYtYjJjMzQ5ODgxYzRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
	},
	{
		id: 10,
		selected: false,
		title: 'Planet Earth',
		releaseYear: '2006-2023',
		poster: 'https://m.media-amazon.com/images/M/MV5BMzMyYjg0MGMtMTlkMy00OGFiLWFiNTYtYmFmZWNmMDFlMzkwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
	},
	{
		id: 11,
		selected: false,
		title: 'Avatar: The Last Airbender',
		releaseYear: '2005-2008',
		poster: 'https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_FMjpg_UX1000_.jpg',
	},
	{
		id: 12,
		selected: false,
		title: 'Blue Planet II',
		releaseYear: 2017,
		poster: 'https://m.media-amazon.com/images/M/MV5BNDZiNDllMTAtOTgxZi00NzNiLWFhNzUtOGUwZWZjZGNjZTMyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
	},
	{
		id: 13,
		selected: false,
		title: 'Rick and Morty',
		releaseYear: '2013-',
		poster: 'https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg',
	},
	{
		id: 14,
		selected: false,
		title: 'Dragon Ball',
		releaseYear: 1986,
		poster: 'https://m.media-amazon.com/images/M/MV5BYzI0YjYxY2UtNzRjNS00NTZiLTgzMDItNGEzMjU5MmE0ZWJmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
	},
	{
		id: 15,
		selected: false,
		title: 'The Last Dance',
		releaseYear: 2020,
		poster: 'https://m.media-amazon.com/images/M/MV5BY2U1ZTU4OWItNGU2MC00MTg1LTk4NzUtYTk3ODhjYjI0MzlmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX190_CR0,1,190,281_.jpg',
	},
	{
		id: 16,
		selected: false,
		title: 'Attack on Titan',
		releaseYear: '2013-2023',
		poster: 'https://m.media-amazon.com/images/M/MV5BZWJlODhhYTEtZjg3YS00NjNmLTgwNTMtMjBmYTZhYjQzMDJkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
	},
];

const TopShowsPage = () => {
	const [profileChanged, setProfileChanged] = useState(false);
	const [movieData, setMovieData] = useState(dummyShows);
	const [filteredData, setFilteredData] = useState(dummyShows);
	const [showMore, setShowMore] = useState(8);

	// Filtering movieData to see which movies were selected to then display in the 'top 5 selections' floater
	const floaterSelection = movieData.filter(media => media.selected === true);
	const selectionPlaceholder = []; // Placeholders, the squares with dotted borders
	for (let i = 0; i < 5 - floaterSelection.length; i++) {
		selectionPlaceholder.push({ id: i, title: '', poster: '' });
	}

	// Handler to remove a movie in the floater section when you click a movie
	function removeMediaHandler(id: number) {
		setMovieData(prev => {
			const index = prev.findIndex(media => media.id === id);
			const newData = [...prev];
			newData[index].selected = false;
			return newData;
		});
	}

	// Keeps track of how many movies have been selected
	const totalSelected = movieData.reduce((accumulator, currentValue) => {
		if (currentValue.selected) {
			return accumulator + 1;
		}
		return accumulator;
	}, 0);

	// Search Input Handler
	function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value.toLowerCase();
		const dataCopy = [...movieData];
		const filteredData = dataCopy.filter(movie => {
			return movie.title.toLowerCase().includes(value);
		});
		setFilteredData(filteredData);
	}

	// Toggles the media tiles in the main grid movie section
	function onToggleMediaSelect(id: number, newVal: boolean) {
		if (totalSelected < 5 || !newVal) {
			setMovieData(prev => {
				const index = prev.findIndex(movie => movie.id === id);
				const newData = [...prev];
				newData[index].selected = newVal;
				return newData;
			});
			setProfileChanged(true);
		} else {
			toast.error('Oops! Select just 5 shows.');
		}
	}

	// Pagination handler
	function showMoreHandler() {
		setShowMore(prev => {
			if (prev === 8) {
				return 16;
			} else return 8;
		});
	}

	// Async function for submitting page data to firebase
	const router = useRouter();
	async function onPageSubmit() {
		const top5shows = movieData
			.filter(movie => movie.selected === true)
			.map(movie => movie.title);
		const docRef = doc(db, '/users/bE2RmKF1qni2Y58Df2GM');
		try {
			await setDoc(
				docRef,
				{
					top5shows: top5shows,
				},
				{ merge: true }
			);
			router.push('/');
		} catch (error) {
			toast.error('Oops! Something went wrong');
		}
	}
	return (
		<section className={styles.container}>
			{/* ProgressBar */}
			<div className={styles.progress}>
				<Image src={'/progress-6-6.png'} fill alt='' />
			</div>

			{/* Floater */}
			<div className={styles['floater-container']}>
				<div className={styles.floater}>
					<h1>Your top 5 selections</h1>
					<div className={styles['selection-container']}>
						{floaterSelection.map(selection => (
							<Selection
								key={selection.id}
								id={selection.id}
								title={selection.title}
								poster={selection.poster}
								onRemoveMedia={removeMediaHandler}
							/>
						))}
						{selectionPlaceholder.map(placeholder => (
							<Selection
								key={placeholder.id}
								id={placeholder.id}
								poster={placeholder.poster}
								title={placeholder.title}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Header */}
			<header className={styles.header}>
				<h1>Select your top 5 TV shows</h1>
				<p>
					Selecting your top 5 TV-shows will enable us to suggest like-minded users and
					nearby communities for exciting watch parties and movie premiere gatherings.
				</p>
				<div className={styles['search-container']}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className={styles['search-icon']}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>

					<input
						onChange={inputChangeHandler}
						className={styles['search-input']}
						type='text'
						placeholder='Search'
					/>
				</div>
			</header>

			<div className={styles.movies}>
				{filteredData.slice(0, showMore).map(movie => (
					<Movie
						key={movie.id}
						id={movie.id}
						title={movie.title}
						year={movie.releaseYear}
						posterURL={movie.poster}
						selected={movie.selected}
						onToggleSelected={onToggleMediaSelect}
					/>
				))}
			</div>
			{!filteredData.length ? (
				<div className={styles['no-movies-message']}>
					<h1>No Results Found. Please try a different search term.</h1>
				</div>
			) : null}
			<div className={styles['show-more-container']}>
				<button onClick={showMoreHandler} className={styles['show-more-button']}>
					{showMore === 8 ? 'Show more' : 'Show less'}
				</button>
			</div>
			<Buttons
				nextPage={'/'}
				required={false}
				prevPage={'/top-genres'}
				onPageSubmit={onPageSubmit}
				profileChanged={profileChanged && totalSelected === 5}
				lastStep
			/>
		</section>
	);
};

export default TopShowsPage;
