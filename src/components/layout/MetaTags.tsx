import Head from 'next/head';

type ComponentProps = {
	title: string;
	description: string;
};

export default function Metatags({ title, description }: ComponentProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta name='twitter:card' content='summary' />
			<meta name='twitter:site' content='@mxkumar' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />

			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
		</Head>
	);
}
