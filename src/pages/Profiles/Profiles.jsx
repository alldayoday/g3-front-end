import { React, useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import GroupList from '../../components/GroupList/GroupList'
import { Link } from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  return (
    <>
      <GroupList profiles={profiles} />
      <h1 id='profile-text'>All Users</h1>
      {profiles.length ?
        <>
          <div className="container py-5 px-3">
            <div className='row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g1 px-4'>
              {profiles.map(profile =>
                <div key={profile._id} className="col">
                  <div className="card text-decoration-none mx-auto my-3 profileCards" to={`/profiles/${profile._id}`}  state={{ profile }} >
                    <img id="profileListImg" className='card-img-top'
                      src={profile.avatar ? profile.avatar : 'https://picsum.photos/300/400?random=1'}
                      alt='placeholder'
                      width="100%"
                    />
 
                    <p className='fs-3 text-dark text-center' >{profile.name}</p>

                  </div>
                </div>
              )}
            </div>
          </div>
        </>
        :
        <p>No profiles yet</p>
      }

      <div className="top-btn">
      <ScrollToTop smooth/>
      </div>
    </>
  )
}

export default Profiles