import { handleLogin } from './auth.js';
import { qs } from './utils.js';

handleLogin(qs('#loginForm'));
