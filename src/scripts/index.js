import 'regenerator-runtime';
import '../style/style.css';
import '../style/responsive.css';
import App from './views/app';

const app = new App({
	button: document.querySelector('#hamburgerButton'),
	drawer: document.querySelector('#navigationDrawer'),
	content: document.querySelector('#mainContent')
});

console.log('Hello coders!!!');
