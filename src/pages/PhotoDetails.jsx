import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import { post, get } from "../services/authService";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TheseTags from "../components/TheseTags";
import L from "leaflet";
import styled from "styled-components";

import tagIcon from "../assets/AppStar.png";

const PhotoDetails = () => {
  let myIcon = L.icon({
    iconUrl: tagIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState({ comment: "" });
  const [map, setMap] = useState({ lat: 0, lng: 0, zoom: 13 });
  const [showAllComments, setShowAllComments] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getView = () => [photo.latitude, photo.longitude];

  const getPhoto = () => {
    get(`/photos/${params.id}/details`)
      .then((res) => {
        setPhoto(res.data.result);
        setMap((prev) => ({
          ...prev,
          lat: res.data.result.latitude,
          lng: res.data.result.longitude,
        }));
      })
      .catch((err) => console.log(err));
  };

  const deletePhoto = () => {
    post(`/photos/${params.id}/delete`)
      .then(() => navigate("/profile"))
      .catch((err) => console.log(err));
  };

  const update = (newComment) => {
    post(`/comments/${params.id}/add-comment`, newComment)
      .then(() => getPhoto())
      .catch((error) => console.error("There was an error!", error));
  };

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(comment);
    setComment({ comment: "" });
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const userLastComment = photo?.comments
    .filter((comment) => comment.user._id === user?._id)
    .slice(-1)
    .map((comment) => comment.comment);

  return (
    <DetailContainer>
      {photo && (
        <>
          <TopSection>
            <PhotoDetailContainer>
              <DetailPhoto src={photo.imageUrl} alt={photo.description || "Photo"} />
              {photo.contributor && user && user._id === photo.contributor._id && (
                <DeleteButton onClick={deletePhoto}>Delete Photo</DeleteButton>
              )}
            </PhotoDetailContainer>
            <CommentSection>
              <Title>{photo.description}</Title>
              <CommentForm onSubmit={handleSubmit}>
                <CommentInput
                  onChange={handleChange}
                  type="text"
                  name="comment"
                  value={comment.comment}
                />
                <CommentButton type="submit">Add Comment</CommentButton>
              </CommentForm>
              <h4>Comments:</h4>
              {photo.comments && (
                <div>
                  {photo.comments.slice(0, 3).map((comment) => (
                    <Comment key={comment._id}>
                      <strong>{comment.user.username}</strong>: {comment.comment}
                    </Comment>
                  ))}
                  {photo.comments.length > 3 && (
                    <ViewAllButton onClick={() => setShowAllComments(!showAllComments)}>
                      {showAllComments ? "Hide Comments" : "View All Comments"}
                    </ViewAllButton>
                  )}
                  {showAllComments && (
                    <div>
                      {photo.comments.map((comment) => (
                        <Comment key={comment._id}>
                          <strong>{comment.user.username}</strong>: {comment.comment}
                        </Comment>
                      ))}
                    </div>
                  )}
                  {user && user._id === photo.contributor._id && userLastComment && (
                    <LastComment>
                      Your Last Comment: {userLastComment}
                    </LastComment>
                  )}
                </div>
              )}
            </CommentSection>
          </TopSection>
          {photo.latitude && (
            <StyledMapContainer
              center={getView()}
              zoom={map.zoom}
              style={{ width: "90%", height: "80vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
                                <Marker icon={myIcon} position={getView()} key={photo["_id"]}>
                <Popup>
                  <TheseTags photo={photo} />
                  <br />
                  <Link to={`/${photo._id}/details`} onClick={() => window.scrollTo(0, 0)}>
                    Details
                  </Link>
                  <br />
                  <img src={photo.imageUrl} alt="previewImage" />
                </Popup>
              </Marker>
            </StyledMapContainer>
          )}
        </>
      )}
    </DetailContainer>
  );
};

export default PhotoDetails;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const PhotoDetailContainer = styled.div`
  width: 600px;
  height: 400px;
  border-radius: 5px;
  margin: 20px auto;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailPhoto = styled.img`
  max-height: 100%;
  max-width: 90%;
  object-fit: cover;
  border-radius: 5px;
`;

export const DetailContent = styled.div`
  max-height: 60%;
  max-width: 50%;
  margin-top: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 80%;
  margin: 0 auto 40px;
`;

export const CommentSection = styled.div`
  width: 400px;
  border: 1px solid lightgrey;
  border-bottom: none;
  margin-left: 40px;
  align-items: center;
  margin-top: 50px;
`;

export const DeleteButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1200;
  margin-top: 15px;
  z-index: 1;
  border-radius: 4px;

  &:hover {
    background-color: #ff4d4f;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const CommentInput = styled.input`
  padding: 10px;
  max-width: 200px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const CommentButton = styled.button`
  background-color: black;
  color: white;
  max-width: 200px;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: grey;
  }
`;

export const Comment = styled.p`
  margin: 5px 0;
  margin-left: 5px;
`;

export const ViewAllButton = styled.button`
  background-color: none;
  color: gray;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export const LastComment = styled.p`
  margin-top: 10px;
  font-style: italic;
`;

export const Title = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const StyledMapContainer = styled(MapContainer)`
  width: 90%;
  height: 80vh;
  margin-top: 20px;
`;