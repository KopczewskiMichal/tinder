import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MatchCandidateTile from "./MatchCandidateTile";
import MessageSampleTile from "./MessageSampleTile";

export default function RelationsToAccept() {
  const { userID } = useParams();

  const [candidatesArr, setCandidatesArr] = useState([]);
  const [convedrsationsSamples, setConversationSamples] = useState([]);

  const getCandidates = () => {
    axios
      .get(`http://127.0.0.1:8080/matchesToConfirm/${userID}`)
      .then((res) => {
        setCandidatesArr(res.data);
      });
  };

  const getConversationSamples = () => {
    axios
      .get(`http://127.0.0.1:8080/conversationSamples/${userID}`)
      .then((res) => {
        setConversationSamples(res.data);
      })
      .catch((err) => console.log(err));
    };

  useEffect(() => {
    getConversationSamples();
    getCandidates();
  }, []);

  return (
    <div id="RelationsToAcceptContainer">
      <ul>
        {candidatesArr.map((elem, index) => {
          return (
            <li key={index}>
              <MatchCandidateTile data={elem} />
            </li>
          );
        })}

        {convedrsationsSamples.map((elem, index) => {return (
          <li key={`a${index}`}>
            <MessageSampleTile messageSample={elem} />
          </li>
        )})}
       </ul>
    </div>
  );
}
