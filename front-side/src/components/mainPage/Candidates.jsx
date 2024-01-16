import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileTile from "./ProfileTile";

export default function Candidates () {
  const { userID } = useParams();
  
  const [candidatesArr, setCandidatesArr] = useState(null);

  const getCandidates = () => {
    axios
    .get(`http://127.0.0.1:8080/candidatesFor/${userID}`)
    .then((res) => {
      console.log(res.data)
      setCandidatesArr(res.data)
    })
  }
    
  useEffect(()=> {
    getCandidates()
  }, [])

  return (
    <div
    className="candiates">
    <ProfileTile profileData={candidatesArr}/>
    </div>

  )
}