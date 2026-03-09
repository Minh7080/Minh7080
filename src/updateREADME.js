import fs from 'fs';
import { getCharityInfo, getRandomCharity } from './api.js';

const randomCharity = await getRandomCharity();
const charityInfo = await getCharityInfo(randomCharity.slug ?? randomCharity.ein ?? randomCharity.id);

const content = `# [Donate to ${charityInfo.name}](${charityInfo.websiteUrl ?? charityInfo.profileUrl})

${charityInfo.logoUrl ? `<p align="center">\n<img src="${charityInfo.logoUrl}" alt="logo"/>\n</p>` : ''}

${charityInfo.description ?? ''}

${charityInfo.coverImageUrl ? `![cover image](${charityInfo.coverImageUrl})` : ''}


*This charity is randomly fetch from [every.org](every.org).*
*Last updated ${new Date().toISOString()}*
`;

fs.writeFileSync('../README.md', content);
