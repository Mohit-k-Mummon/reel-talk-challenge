import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const initAOS = () => {
	AOS.init({
		duration: 800, // Duration of animation
		easing: 'ease', // Easing function
		once: true, // Animation occurs only once
	});
};

export default initAOS;
