import React, { useEffect, useState } from "react";
// to call data
import axios from "axios";
import AccessRefreshTokens from "../RefreshToken/AccessRefreshTokens";
//Routing
import { Link, useParams } from "react-router-dom";

function PersonalDetails(props) {
  const [boardData, setBoardData] = useState([]);
  const [personInfo, setPersonInfo] = useState([]);
  let params = useParams();
  const personId = params.individualID;
  useEffect(() => {
    AccessRefreshTokens.getAccessToken();

    axios
      .get(
        `https://data.argaam.com/api/v1/json/ir-api/organizational-structure`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.individuals);
        setBoardData(res.data.individuals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem("token")]);

  const chaeckEmpty = (string) => (string === "" ? "-" : string);

  const filterd = boardData.filter((person) => {
    return person.individualID == personId;
  });
  console.log(filterd);

  return (
    <div className="popup-body">
      <div className="board-body">
        {props.children}
        <div className="boards-popup active-chart" id="boards-popup">
          <div className="container">
            <h3 className="board-title d-flex justify-content-between align-items-center">
              {filterd[0]?.nameEn}
              <Link to="/organization" className="close-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </Link>
            </h3>
            <p className="my-1">
              {filterd[0]?.resumeHighLightEn?.replace(
                /<[^>]*(>|$)|&nbsp;|&amp;|&raquo;|&laquo;|&gt;/g,
                " "
              )}
            </p>
            <table className="boards-popup-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Position Name</th>
                  <th>started On</th>
                  <th>Ended On</th>
                </tr>
              </thead>

              <tbody>
                {filterd[0]?.positionHistory?.map((list, id) => {
                  return (
                    <>
                      <tr>
                        <td>{list?.companyNameEn}</td>
                        <td>{list?.positionNameEn}</td>
                        <td>{chaeckEmpty(list?.startedOn)}</td>
                        <td>{chaeckEmpty(list?.endedOn)}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PersonalDetails;
