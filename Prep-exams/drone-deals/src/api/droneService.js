import fetcher from './fetcher.js';

function getAllDrones() {
  // return an array of drones
  return fetcher.get('/data/drones?sortBy=_createdOn%20desc');
}

export default { getAllDrones };
