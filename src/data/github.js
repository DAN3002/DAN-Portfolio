import axios from 'axios';

const getGithubData = async () => {
	const res = await axios.get('https://api.github.com/users/DAN3002/repos?visibility=private');
	console.log(res);
};

const getLatestCommit = async () => {

};

export {
	getGithubData,
	getLatestCommit,
};
