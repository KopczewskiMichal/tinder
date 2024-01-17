import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import ProfileTile from "./ProfileTile";

export default function Candidates() {
  const { userID } = useParams();

  const [candidatesArr, setCandidatesArr] = useState(null);

  const getCandidates = () => {
    axios.get(`http://127.0.0.1:8080/candidatesFor/${userID}`).then((res) => {
      setCandidatesArr(res.data);
    });
  };

  useEffect(() => {
    getCandidates();
  }, []);

  function sendCandidateOpinion({ candidateID, isAccepted }) {
    const toSend = {
      candidateID: candidateID,
      isAccepted: isAccepted,
      senderID: userID,
    };
    axios
      .post("http://127.0.0.1:8080/opinions", toSend)
      // .then(() => console.log("succes"))
      .catch((err) => alert(err));
  }

  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  function reducer(state, action) {
    switch (action.type) {
      case "acceptCandidate": {
        const candidateInfo = candidatesArr[state.counter];
        sendCandidateOpinion({
          candidateID: candidateInfo.userID,
          isAccepted: true,
        });
        return {
          counter: state.counter + 1,
        };
      }
      case "rejectCandidate": {
        const candidateInfo = candidatesArr[state.counter];
        sendCandidateOpinion({
          candidateID: candidateInfo.userID,
          isAccepted: false,
        });
        return {
          counter: state.counter + 1,
        };
      }

      default: {
        throw Error("Unknown action.");
      }
    }
  }

  return (
    <div className="candiates">
      <ProfileTile profileData={candidatesArr} index={state.counter} />
      <button
        className="text-5xl"
        onClick={() => dispatch({ type: "rejectCandidate" })}
      >
        ❌
      </button>
      <button
        className="text-5xl"
        onClick={() => dispatch({ type: "acceptCandidate" })}
      >
        ✅
      </button>
    </div>
  );
}
