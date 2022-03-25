import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`


async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function getProfile(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

const addGame = (profile_id, game) => {
  // localhost:3000/profile/:id/addGame
  return fetch(`${BASE_URL}/${profile_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  })
  .then(res => res.json())
}

export { 
  getAllProfiles,  
  getProfile,
  addGame,
}
