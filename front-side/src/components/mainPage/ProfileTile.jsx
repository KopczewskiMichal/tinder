import React from "react";
import ProfilePhoto from "../EditProfile/ProfilePhoto";

export default function ProfileTile({ profileData = null }) {
  if (profileData == null) {
    return (
      <div className="empty profile-tile">
        <p>To już wszystkie profile na teraz😢</p>
        <p>Zapraszamy ponownie za jakiś czas...</p>
        {/* //TODO przycisk do odświeżania strony */}
      </div>
    );
  } else {
    profileData = profileData[1]
    return (
      <div className="not-empty profile-tile">
        <h2>{profileData.name}</h2>
        <h2>{profileData.age}</h2>
        <h3>{profileData.surname}</h3>
        {/* // TODO zamienić undefined na puste stringi */}
        {profileData.city !== undefined ? (<div><span>City: </span><span>{profileData.city}</span></div>) : null}
        {profileData.degree !== undefined ? (<div><span>Degree: </span><span>{profileData.degree}</span></div>) : null}
        {profileData.height !==undefined ? (<div><span>Height: </span><span>{profileData.height}</span></div>) : null}
        {profileData.lookingFor !== undefined ? (<div><span>Looking For: </span><span>{profileData.lookingFor}</span></div>) : null}
        {profileData.aboutMe !== undefined ? (<div><span>About Me: </span><span>{profileData.aboutMe}</span></div>) : null}
        {profileData.image !== undefined ? (<ProfilePhoto src={profileData.image}/>) : null}
        
      </div>
    );
  }
}
