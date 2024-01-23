import React from "react";
import { useParams } from "react-router-dom";
import ProfilePhoto from "../EditProfile/ProfilePhoto";

export default function MessageSampleTile(messageSample) {
  messageSample = messageSample.messageSample;
  const { userID } = useParams();

  return (
    <div className="messageSampleTile">
      <ProfilePhoto
        src={messageSample.userImage}
        className="rounded-full w-20 h-20"
      />
      <div className="rightSide">
        <h2 className="text-xl font-bold">{messageSample.senderName}</h2>

        {messageSample.lastMessage && (
          <p className="whitespace-normal break-words">
            {messageSample.lastMessage.userID === userID
              ? "Me"
              : messageSample.senderName}
            : {messageSample.lastMessage.text}
          </p>
        ) || (<p>Write me first!!!</p>)}
      </div>
    </div>
  );
}
