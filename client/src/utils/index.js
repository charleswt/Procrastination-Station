import { Workbox } from 'workbox-window';
import '../../public/css/style.css';
import dino from '../../public/images/dino.webp'
// import dinoLose from '../../public/images/dinoGames/dino-lose.webp'
// import dinoRun0 from '../../public/images/dinoGames/dino-run-0.webp'
// import dinoRun1 from '../../public/images/dinoGames/dino-run-1.webp'
// import dinoGround from '../../public/images/dinoGames/dino-ground.webp'

import hero from '../../public/images/3.webp'
import logo from '../../public/images/chad.webp'
import snake from '../../public/images/logo.webp'
import ttt from '../../public/images/ttt.webp'

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register workbox service worker
  const workboxSW = new Workbox('./src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
