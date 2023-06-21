const dotenv = require('dotenv');

dotenv.config();

const { REACT_APP_GITHUB_SECRET } = process.env;
if (!REACT_APP_GITHUB_SECRET) {
	throw new Error('REACT_APP_GITHUB_SECRET not set');
}
