import { io } from 'socket.io-client';

const socket = io('https://brain-battle-server-wpcm.onrender.com/'); // Replace with your Socket.io server URL

export default socket;
