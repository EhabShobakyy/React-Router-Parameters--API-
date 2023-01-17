import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDetails from "../PersonDetails/PersonalDetals";

// to call data
import axios from "axios";
import AccessRefreshTokens from "../RefreshToken/AccessRefreshTokens";

// Style
import "./Organizational Structure.css";
import Moment from "moment";

const formatDate = (date) => Moment(date).format("DD/MM/YYYY");

function OrganizationalStructure() {
  const [boardData, setBoardData] = useState([]);
  const [selectIndex, setSelectIndex] = useState([1]);
  const [popupId, setPopupId] = useState();

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
        // console.log(res.data.individuals);
        setBoardData(res.data.individuals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectIndex, localStorage.getItem("token")]);

  const chaeckEmpty = (string) => (string == "" ? "-" : string);

  const handelPopup = (idx) => {
    setSelectIndex(boardData[idx]);
  };

  return (
    <>
      <div className="OrganizationalStructure">
        <div className="chairman">
          <div className="container-md">
            <div className="row">
              <Link to={`/organization/${boardData[7]?.individualID}`}>
                <div className="chairman-card d-flex my-5">
                  <div className="chairman-img ">
                    <img
                      className="profile-img"
                      src={boardData[7]?.profilePicURL}
                      alt="Chairman Image"
                    />
                  </div>
                  <div className="chairman-card-data d-flex flex-column justify-content-center">
                    <p className="person-name">{boardData[7]?.nameEn}</p>
                    <p className="person-position">
                      {boardData[7]?.positionNameEn}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="board  my-2">
          <div className="container-md">
            <div className="row">
              {boardData.slice(0, 6).map((item, idx) => {
                return (
                  <div className="col-lg-3 col-sm-4 col-6">
                    <Link to={`/organization/${item.individualID}`} key={idx}>
                      <Link
                        to={`/organization/${item.individualID}`}
                        className="person-card my-3"
                      >
                        <div>
                          <img className="board-img" src={item.profilePicURL} />
                        </div>
                        <div className="person-info">
                          <p className="person-name">{item.nameEn}</p>
                          <p className="person-position">
                            {item.companyPositionTypeNameEn}
                          </p>
                        </div>
                        <div></div>
                      </Link>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationalStructure;
