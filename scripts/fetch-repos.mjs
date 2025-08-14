import fs from 'fs/promises';
import https from 'https';

const GITHUB_USERNAME = 'ytkg';
const OUTPUT_PATH = 'src/data/repositories.ts';

// Function to fetch data from GitHub API
function fetchGitHubRepos() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      method: 'GET',
      headers: {
        'User-Agent': 'node.js', // GitHub API requires a User-Agent header
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API responded with status code ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Main function to orchestrate the process
async function main() {
  try {
    console.log('Fetching repositories...');
    const repos = await fetchGitHubRepos();
    console.log(`Fetched ${repos.length} repositories.`);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const filteredRepos = repos.filter(repo => {
      const updatedAt = new Date(repo.pushed_at);
      return repo.stargazers_count >= 1 || updatedAt >= oneMonthAgo;
    });
    console.log(`Found ${filteredRepos.length} repositories matching the criteria.`);


    const mappedRepos = filteredRepos.map(repo => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
    }));

    const fileContent = `import { Repository } from '../types';

export const REPOSITORIES: Repository[] = ${JSON.stringify(mappedRepos, null, 2)};
`;

    await fs.writeFile(OUTPUT_PATH, fileContent);
    console.log(`Successfully wrote ${mappedRepos.length} repositories to ${OUTPUT_PATH}`);

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
