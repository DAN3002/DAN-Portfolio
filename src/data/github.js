/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const MAX_PER_PAGE = 100;
const USERNAME = 'DAN3002';
const headers = {
	Authorization: `token ${process.env.REACT_APP_GITHUB_SECRET}`,
};

const countTotalCommits = async () => {
	const total = 1 + 53 + 32 + 46 + 250;
	const { data } = await axios.get(`https://api.github.com/search/commits?q=author:${USERNAME}`, { headers });
	return total + data.total_count;
};

const getAllRepos = async (arr = [], page = 1) => {
	const { data } = await axios.get(`https://api.github.com/search/repositories?q=user:${USERNAME}&per_page=${MAX_PER_PAGE}&page=${page}`, { headers });

	const { total_count: totalCount, items } = data;

	const output = arr.concat(items);

	if (output.length < totalCount) {
		return getAllRepos(output, page + 1);
	}

	return output;
};

const getGithubData = async () => {
	const repos = await getAllRepos();

	const totalStars = repos.reduce((acc, curr) => acc + curr.stargazers_count, 0);
	const totalCommits = await countTotalCommits();

	return {
		numberOfRepos: repos.length,
		totalStars,
		totalCommits,
	};
};

const getLatestCommit = async () => {

};

export {
	getGithubData,
	getLatestCommit,
};
