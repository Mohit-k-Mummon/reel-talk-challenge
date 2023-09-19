import React from 'react';
import NavBar from './NavBar';

interface ComponentProps {
	children: React.ReactNode;
}

const Layout: React.FC<ComponentProps> = ({ children }) => {
	return (
		<>
			<NavBar />
			<main className='px-3 relative'>{children}</main>
		</>
	);
};

export default Layout;
