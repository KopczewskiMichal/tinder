import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Candidates () {
  const { userID } = useParams();
  
  const [candidatesArr, setCandidatesArr] = useState();

  const getCandidates = () => {
    axios
    .get(`http:8080/candidatesFor/${userID}`)
    .then((res) => {
      console.log(res.data)
    })
    //TODO reszta
  }
  
}