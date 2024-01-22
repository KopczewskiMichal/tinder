import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MatchCandidateTile from "./MatchCandidateTile";

export default function RelationsToAccept () {
  const { userID } = useParams();

  const [candidatesArr, setCandidatesArr] = useState([]);

  const getCandidates = () => {
    axios.get(`http://127.0.0.1:8080/matchesToConfirm/${userID}`).then((res) => {
      setCandidatesArr(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div>
      <ul>

      {candidatesArr.map((elem, index) =>  {return (
        <li key={index}
        ><MatchCandidateTile data={elem} />  
        </li>
        )
        
      })}
      </ul>
    </div>
  )
}