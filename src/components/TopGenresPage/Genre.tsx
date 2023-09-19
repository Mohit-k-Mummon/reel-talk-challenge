import React from 'react';
import styles from './Genre.module.css';

type ComponentProps = {
	title: string;
	selected: boolean;
	onSelect: (newVal: boolean, index: number) => void;
	index: number;
};

const Genre = ({ title, selected, onSelect, index }: ComponentProps) => {
	const onClickHandler = () => {
		onSelect(!selected, index);
	};
	return (
		<button
			type='button'
			className={`${styles.genre} ${selected ? styles.selected : ''}`}
			onClick={onClickHandler}
		>
			<p className={styles.title}>{title}</p>
		</button>
	);
};

export default Genre;
