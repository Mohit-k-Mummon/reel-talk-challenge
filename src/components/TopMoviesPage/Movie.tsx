import React from 'react';
import styles from './Movie.module.css';
import Image from 'next/image';

type ComponentProps = {
	id: number;
	title: string;
	posterURL: string;
	year: number | string;
	selected: boolean;
	onToggleSelected: (id: number, newVal: boolean) => void;
};

const Movie = ({ title, posterURL, year, selected, onToggleSelected, id }: ComponentProps) => {
	function onClickHandler() {
		onToggleSelected(id, !selected);
	}

	return (
		<div onClick={onClickHandler} className={styles.movie}>
			<div className={styles['poster-container']}>
				<Image
					className={`${styles.poster} ${selected ? styles['poster-selected'] : ''}`}
					src={posterURL}
					height={236}
					width={160}
					alt=''
				></Image>
			</div>
			<p>{`${title} (${year})`}</p>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='37'
				height='37'
				viewBox='0 0 37 37'
				fill='none'
				className={`${styles.checkmark} ${selected ? styles['checkmark-visible'] : ''}`}
			>
				<rect x='0.578125' y='0.257812' width='36' height='36' rx='18' fill='#FFA724' />
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M28.3926 12.3399C28.8694 12.7984 28.8694 13.5416 28.3926 14.0001L16.9978 24.9566C16.521 25.4151 15.748 25.4151 15.2712 24.9566L8.75993 18.6957C8.28315 18.2373 8.28315 17.494 8.75993 17.0356C9.23671 16.5771 10.0097 16.5771 10.4865 17.0356L16.1345 22.4664L26.666 12.3399C27.1428 11.8815 27.9158 11.8815 28.3926 12.3399Z'
					fill='#222222'
				/>
			</svg>
		</div>
	);
};

export default Movie;
