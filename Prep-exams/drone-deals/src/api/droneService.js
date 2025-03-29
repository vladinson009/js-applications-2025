import fetcher from './fetcher.js';

// return an array of drones
function getAllDrones() {
  return fetcher.get('/data/drones?sortBy=_createdOn%20desc');
}
// return single object
function getDroneById(droneId) {
  return fetcher.get(`/data/drones/${droneId}`);
}
function deleteDroneById(droneId) {
  return fetcher.del(`/data/drones/${droneId}`);
}

function createDrone(formData) {
  const objectData = Object.fromEntries(formData);
  const arrayData = Object.entries(objectData);

  for (const [name, value] of arrayData) {
    if (value.trim() == '') {
      throw new Error(`${name} is reqired!`);
    }
  }

  return fetcher.post('/data/drones', objectData);
}

export default {
  getAllDrones,
  getDroneById,
  createDrone,
  deleteDroneById,
};
