import { useState, useEffect } from 'react'
import { getGroup } from '../../services/groupService';
import { useLocation } from "react-router-dom";
import * as profileService from '../../services/profileService'
import * as groupService from '../../services/groupService'
import GameList from '../../components/GameList/GameList';
import AddGathering from '../../components/AddGathering/AddGathering';
import GatheringList from '../../components/GatheringList/GatheringList';

const GroupDetails = ({ user, }) => {
  const [groupDetails, setGroupDetails] = useState({})
  const location = useLocation()
  const group = location.state.group

  useEffect(() => {
    getGroup(group._id)
      .then(groupDetails => setGroupDetails(groupDetails))
  }, [group._id])

  const handleJoin = () => {
    // add group to profile
    profileService.joinGroup(user.profile, group)
    groupService.addMember(group._id, user.profile)
  }

  return (
    <>
      <h1>{group.name}</h1>
      <button className="btn btn-outline-success" type="submit" onClick={handleJoin}>Join</button>
      <img style={{ width: "500px" }} src={group.image} alt="group pic" />
      <AddGathering group={group} user={user} />
      <GatheringList group={group} gatherings={groupDetails.gatherings} />
      {groupDetails.profiles?.map((profile, idx) =>
        <div key={idx}>
          <h2> {profile.name}</h2>
          <GameList user={user} games={profile.games} />
        </div>
      )}
    </>
  );
}

export default GroupDetails;