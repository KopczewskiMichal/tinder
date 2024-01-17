import React from "react";
import ProfilePhoto from "../EditProfile/ProfilePhoto";

export default function ProfileTile({ profileData = null, index = 0 }) {
  if (profileData == null || index >= profileData.length) {
    return (
      <div className="empty profile-tile">
        <p>To już wszystkie profile na teraz😢</p>
        <p>Zapraszamy ponownie za jakiś czas...</p>
        {/* //TODO przycisk do odświeżania strony */}
      </div>
    );
  } else {
    profileData = profileData[index];
    return (
      <div className="profile-tile bg-white p-6 rounded-md shadow-xl max-w-md mx-auto">
        {profileData.image !== undefined && (
          <div className="mb-4 overflow-hidden rounded-full w-100 h-100 mx-auto">
            <ProfilePhoto src={profileData.image} />
          </div>
        )}
    
        <div className="flex items-center mb-4 text-center">
          <h1 className="text-2xl font-bold mr-2">{profileData.name}</h1>
          <h2 className="text-xl">{profileData.age}</h2>
        </div>
        <h3 className="text-lg font-semibold mb-4 text-center">{profileData.surname}</h3>
    
        {profileData.city !== undefined && (
          <div className="mb-2 text-center">
            <span className="font-semibold">City:</span>
            <span className="ml-2">{profileData.city}</span>
          </div>
        )}
    
        {profileData.degree !== undefined && (
          <div className="mb-2 text-center">
            <span className="font-semibold">Degree:</span>
            <span className="ml-2">{profileData.degree}</span>
          </div>
        )}
    
        {profileData.height !== undefined && (
          <div className="mb-2 text-center">
            <span className="font-semibold">Height:</span>
            <span className="ml-2">{profileData.height}</span>
          </div>
        )}
    
        {profileData.lookingFor !== undefined && (
          <div className="mb-2 text-center">
            <span className="font-semibold">Looking For:</span>
            <span className="ml-2">{profileData.lookingFor}</span>
          </div>
        )}
    
        {profileData.aboutMe !== undefined && (
          <div className="mb-2 text-center">
            <span className="font-semibold">About Me:</span>
            <span className="ml-2">{profileData.aboutMe}</span>
          </div>
        )}
      </div>
    );
    
    }
}
