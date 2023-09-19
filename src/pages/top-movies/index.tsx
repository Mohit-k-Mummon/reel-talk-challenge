import React, { useState } from 'react';
import Image from 'next/image';
import styles from './top-movies.module.css';
import Buttons from '@/components/Home/Buttons';
import Movie from '@/components/TopMoviesPage/Movie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Selection from '@/components/TopMoviesPage/Selection';

// FireBase
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '@/lib/firebase';
const db = getFirestore(app);

const dummyMovies = [
	{
		id: 1,
		selected: false,
		title: 'The Shawshank Redemption',
		releaseYear: 1994,
		poster: 'https://m.media-amazon.com/images/I/81O1wR9ohtL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 2,
		selected: false,
		title: 'Inception',
		releaseYear: 2010,
		poster: 'https://m.media-amazon.com/images/I/81UOFL9v79L._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 3,
		selected: false,
		title: 'The Intouchables',
		releaseYear: 2011,
		poster: 'https://m.media-amazon.com/images/I/813RpC1inEL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 4,
		selected: false,
		title: 'WALL-E',
		releaseYear: 2008,
		poster: 'https://m.media-amazon.com/images/I/91vYNYvKXvL._AC_UL480_FMwebp_QL65_.jpg',
	},
	{
		id: 5,
		selected: false,
		title: 'Flipped',
		releaseYear: 2010,
		poster: 'https://m.media-amazon.com/images/I/81ts3Y5pfDL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 6,
		selected: false,
		title: 'The Dark Knight',
		releaseYear: 2008,
		poster: 'https://m.media-amazon.com/images/I/91ebheNmoUL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 7,
		selected: false,
		title: 'Life of Pi',
		releaseYear: 2012,
		poster: 'https://m.media-amazon.com/images/I/81sQpouz82L._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 8,
		selected: false,
		title: 'The Pianist',
		releaseYear: 2003,
		poster: 'https://m.media-amazon.com/images/I/71A47Ju3NqL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 9,
		selected: false,
		title: 'The Godfather',
		releaseYear: 1972,
		poster: 'https://m.media-amazon.com/images/I/714ZOEiVNtL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 10,
		selected: false,
		title: 'The Godfather Part II',
		releaseYear: 1974,
		poster: 'https://m.media-amazon.com/images/I/71Tn5ZErDiL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 11,
		selected: false,
		title: '12 Angry Men',
		releaseYear: 1957,
		poster: 'https://m.media-amazon.com/images/I/71FthvsNDDL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 12,
		selected: false,
		title: "Schindler's list",
		releaseYear: 1994,
		poster: 'https://m.media-amazon.com/images/I/81pBGFSSSwL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 13,
		selected: false,
		title: 'The Lord of the Rings: The Return of the King',
		releaseYear: 2003,
		poster: 'https://m.media-amazon.com/images/I/912lTyxLdSL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 14,
		selected: false,
		title: 'Pulp Fiction',
		releaseYear: 1994,
		poster: 'https://m.media-amazon.com/images/I/81wrPiZFKIL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 15,
		selected: false,
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		releaseYear: 2001,
		poster: 'https://m.media-amazon.com/images/I/91AbJ-7DqfL._AC_UY327_FMwebp_QL65_.jpg',
	},
	{
		id: 16,
		selected: false,
		title: 'Forrest Gump',
		releaseYear: 1994,
		poster: 'https://m.media-amazon.com/images/I/71nGjvTg15L._AC_UY327_FMwebp_QL65_.jpg',
	},
];

const TopMoviesPage = () => {
	const [profileChanged, setProfileChanged] = useState(false);
	const [data, setData] = useState(dummyMovies);
	const [filteredData, setFilteredData] = useState(dummyMovies);
	const [showMore, setShowMore] = useState(8);

	// Filtering data to see which movies were selected to then display in the 'top 5 selections' floater
	const floaterSelection = data.filter(media => media.selected === true);
	const selectionPlaceholder = [];
	for (let i = 0; i < 5 - floaterSelection.length; i++) {
		selectionPlaceholder.push({ id: i, title: '', poster: '' });
	}

	function removeMediaHandler(id: number) {
		setData(prev => {
			const index = prev.findIndex(media => media.id === id);
			const newData = [...prev];
			newData[index].selected = false;
			return newData;
		});
	}

	const totalSelected = data.reduce((accumulator, currentValue) => {
		if (currentValue.selected) {
			return accumulator + 1;
		}
		return accumulator;
	}, 0);

	function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value.toLowerCase();
		const dataCopy = [...data];
		const filteredData = dataCopy.filter(movie => {
			return movie.title.toLowerCase().includes(value);
		});
		setFilteredData(filteredData);
	}

	function onToggleMovieSelect(id: number, newVal: boolean) {
		if (totalSelected < 5 || !newVal) {
			setData(prev => {
				const index = prev.findIndex(movie => movie.id === id);
				const newData = [...prev];
				newData[index].selected = newVal;
				return newData;
			});
			setProfileChanged(true);
		} else {
			toast.error('Oops! Select just 5 movies.');
		}
	}

	function showMoreHandler() {
		setShowMore(prev => {
			if (prev === 8) {
				return 16;
			} else return 8;
		});
	}

	const router = useRouter();

	async function onPageSubmit() {
		const topFiveMovies = data
			.filter(movie => movie.selected === true)
			.map(movie => movie.title);
		const docRef = doc(db, '/users/bE2RmKF1qni2Y58Df2GM');
		try {
			await setDoc(
				docRef,
				{
					top5Movies: topFiveMovies,
				},
				{ merge: true }
			);
			router.push('/top-shows');
		} catch (error) {
			toast.error('Oops! Something went wrong');
		}
	}
	return (
		<section className={styles.container}>
			{/* ProgressBar */}
			<div className={styles.progress}>
				<Image src={'/progress-5-6.png'} fill alt='' />
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
				<h1>Select your top 5 movies</h1>
				<p>
					Selecting your top 5 movies will enable us to suggest like-minded users and
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
						onToggleSelected={onToggleMovieSelect}
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
				nextPage={'/top-shows'}
				required={false}
				prevPage={'/top-genres'}
				onPageSubmit={onPageSubmit}
				profileChanged={profileChanged && totalSelected === 5}
			/>
		</section>
	);
};

export default TopMoviesPage;
