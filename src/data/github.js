/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const MAX_PER_PAGE = 100;
const USERNAME = 'DAN3002';
const CURRENT_REPO = 'DAN3002/DAN-Portfolio';
const CACHE_TIMEOUT = 1; // days

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
	// Check if the data is cached
	// const cachedData = localStorage.getItem('githubData');
	// if (cachedData) {
	// 	const { data, timestamp } = JSON.parse(cachedData);
	// 	if (timestamp > Date.now()) {
	// 		return data;
	// 	}
	// }

	const repos = await getAllRepos();

	const totalStars = repos.reduce((acc, curr) => acc + curr.stargazers_count, 0);
	const totalCommits = await countTotalCommits();

	const output = {
		numberOfRepos: repos.length,
		totalStars,
		totalCommits,
	};

	// Cache the data for CACHE_TIMEOUT days
	const cacheTime = CACHE_TIMEOUT * 24 * 60 * 60 * 1000;
	localStorage.setItem('githubData', JSON.stringify({ data: output, timestamp: Date.now() + cacheTime }));

	return output;
};

const getLatestCommitDate = async () => {
	// Check if the data is cached
	const cachedData = localStorage.getItem('latestCommitDate');
	if (cachedData) {
		const { date, timestamp } = JSON.parse(cachedData);
		if (timestamp > Date.now()) {
			return new Date(date);
		}
	}

	const { data } = await axios.get(`https://api.github.com/repos/${CURRENT_REPO}/commits`, { headers });

	const date = new Date(data[0].commit.author.date);

	const cachedTimeout = new Date(date.getFullYear(), date.getMonth(), 0);
	localStorage.setItem('latestCommitDate', JSON.stringify({
		date,
		timestamp: cachedTimeout,
	}));

	return date;
};

export {
	getGithubData,
	getLatestCommitDate,
};
