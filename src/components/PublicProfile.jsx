import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PublicProfile() {
  const { userID } = useParams();

  useEffect(() => {
    console.log('IN useEFFECT', userID);
  });

  return (
    <div>
      <div>HELLOO</div>
        <div>
          <Link to="/user/fred">Fred</Link>
        </div>
    </div>
  );  
}

export default PublicProfile;