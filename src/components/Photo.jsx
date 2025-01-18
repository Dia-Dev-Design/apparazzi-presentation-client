import React, { useState } from "react";  
import TheseTags from "./TheseTags";
import { Link } from "react-router-dom";
import { DateTime } from "luxon"
import styled from "styled-components";

const Photo = (props) => {
  const [likes, setLikes] = useState(props.photo.likes || 0);
  const [liked, setLiked] = useState(false);

  function parseDate(s) {
    var b = s.split(/\D/);
    return new Date(
      b[0],
      b[1] - 1,
      b[2],
      b[3],
      b[4],
      b[5]
    ).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  function readableDate(date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);
  }

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  };

  return (
    <PhotoCard>
      <Link to={`/${props.photo._id}/details`}>
        <Image src={props.photo.imageUrl} alt="photograph" />
      </Link>

      <LikeContainer>
        <LikeButton onClick={handleLike}>
          {liked ? "❤️" : "🤍"} Like {likes}
        </LikeButton>
      </LikeContainer>
      <PhotoDetails>
        <TheseTags photo={props.photo} />
        {props.photo.photographedDate && (
          <p className="description">
            Spotted on {parseDate(props.photo.photographedDate)}
          </p>
        )}
        {props.photo.contributor && (
          <ContributorInfo>
            <p className="post-time">
              By{" "}
              <Link to={`/${props.photo.contributor._id}/contributor`}>
                {props.photo.contributor.username}
              </Link>
            </p>
            <p className="post-time">
              Submitted on {readableDate(props.photo.createdAt)}
            </p>
          </ContributorInfo>
        )}
      </PhotoDetails>
    </PhotoCard>
  );
};

export default Photo;

const PhotoCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  &:hover {
    transform: scale(1.10);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    
  }
`;

const Image = styled.img`
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const PhotoDetails = styled.div`
  padding: 15px;
`;

const ContributorInfo = styled.div`
  p {
    margin: 5px 0;
    color: #555;
  }
  a {
    color: #007bff;
    text-decoration: none;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-right: 5%;
  width: 30%;
  background-color: white;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 13px;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: ${props => (props.liked ? "red" : "black")};
  outline: none;
  &:hover {
    color: red;
  }
`;
