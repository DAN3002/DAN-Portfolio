import axios from 'axios';

const MAX_PER_PAGE = 100;
const headers = {
	Authorization: `token ${process.env.REACT_APP_GITHUB_SECRET}`,
};

const getAllRepos = async (arr = [], page = 1) => {
	const { data } = await axios.get(`https://api.github.com/search/repositories?q=user:DAN3002&per_page=${MAX_PER_PAGE}&page=${page}`, { headers });

	const { total_count: totalCount, items } = data;

	const output = arr.concat(items);

	if (output.length < totalCount) {
		return getAllRepos(output, page + 1);
	}

	return output;
};

const getGithubData = async () => {
	const repos = await getAllRepos();

	return {
		numberOfRepos: repos.length,
	};
};

const getLatestCommit = async () => {

};

export {
	getGithubData,
	getLatestCommit,
};
