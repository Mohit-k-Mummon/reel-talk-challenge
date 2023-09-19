import Image from 'next/image';
import React from 'react';
import styles from '../../styles/components/NavBar.module.css';
import Link from 'next/link';

const NavBar = () => {
	return (
		<nav className={styles.nav}>
			<menu className={styles.container}>
				<ul className={styles.links}>
					<li className={styles.links}>
						<Link href={'/'} aria-label='Home'>
							<Image
								src={'/Logo.png'}
								height={26}
								width={118}
								alt='Reel Talk Logo'
							></Image>
						</Link>
					</li>
					<li>
						<Link href={'/'}>Browse</Link>
					</li>
					<li>
						<Link href={'/'}>Community</Link>
					</li>
				</ul>
				<form className={styles.search}>
					<button type='submit' className={styles['search-button']} aria-label='Search'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='transparent'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='#6D6D6D'
							className={styles.icon}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>
					</button>
					<input className={styles.input} type='text' placeholder='Search' />
				</form>
				<div className={styles.buttons}>
					<Link className={styles.login} href={'/'} aria-label='Login'>
						Login
					</Link>
					<Link className={styles.signup} href={'/'} aria-label='Sign Up'>
						Signup
					</Link>
				</div>
			</menu>
		</nav>
	);
};

export default NavBar;
