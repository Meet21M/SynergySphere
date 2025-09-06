import { handleSignup } from './auth.js';
import { qs } from './utils.js';

handleSignup(qs('#signupForm'));
