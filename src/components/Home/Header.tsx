import React from 'react';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<h1>Customize your profile</h1>
			<p>
				Personalizing your profile will enable us to suggest like-minded users and nearby
				communities for exciting watch parties and movie premiere gatherings.
			</p>
		</header>
	);
};

export default Header;
