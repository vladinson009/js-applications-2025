import validateDroneData from '../utils/validateDroneData.js';
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
  const objectData = validateDroneData(formData);
  return fetcher.post('/data/drones', objectData);
}

function editDrone(droneId, formData) {
  const objectData = validateDroneData(formData);
  return fetcher.put(`/data/drones/${droneId}`, objectData);
}

export default {
  getAllDrones,
  getDroneById,
  createDrone,
  deleteDroneById,
  editDrone,
};
