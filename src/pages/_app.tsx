import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import initAOS from '../../util/aos-init';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	useEffect(() => {
		if (router.pathname === '/') {
			router.push('/onboarding/profile-info');
		}
		// Initialize AOS when the component mounts
		initAOS();
	}, [router]);
	return (
		<>
			<Layout>
				<Component {...pageProps} />
				<Toaster
					toastOptions={{
						style: {
							fontSize: '1.6rem',
							fontFamily: 'inherit',
						},
					}}
				/>
			</Layout>
		</>
	);
}
