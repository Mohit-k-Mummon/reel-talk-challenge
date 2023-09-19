import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // Import other Firebase services you plan to use

const firebaseConfig = {
	apiKey: 'AIzaSyAnzbypjJLhEXyyJVBhCt6ajCSCuFhtOEc',
	authDomain: 'reel-talk-57c1b.firebaseapp.com',
	projectId: 'reel-talk-57c1b',
	storageBucket: 'reel-talk-57c1b.appspot.com',
	messagingSenderId: '102386476377',
	appId: '1:102386476377:web:44c2594bcfa2ed2024d848',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
