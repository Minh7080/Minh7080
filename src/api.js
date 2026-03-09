import getCause from './causes.js';

// This is public, don't worry
const API_KEY = 'pk_live_875dc44d9803a9c42748008c5f89968a';
const cause = getCause();

export const getTotalPages = async () => {
  const response = await fetch(`https://partners.every.org/v0.2/browse/${cause}?apiKey=${API_KEY}&take=100`);
  return (await response.json()).pagination.pages;
}

export const getRandomCharity = async() => {
  const page = Math.floor(Math.random() * await getTotalPages()) + 1;
  const response = await fetch(`https://partners.every.org/v0.2/browse/${cause}?apiKey=${API_KEY}&take=100&page=${page}`);
  const nonprofit = (await response.json()).nonprofits;
  return nonprofit[Math.floor(Math.random() * nonprofit.length)];
}

export const getCharityInfo = async(identifier) => {
  if (!identifier || (typeof identifier != 'string' && typeof identifier != 'number')) throw Error('Identifier is invalid' + identifier);

  const response = await fetch(`https://partners.every.org/v0.2/nonprofit/${identifier}?apiKey=${API_KEY}`);
  return (await response.json()).data.nonprofit;
}
