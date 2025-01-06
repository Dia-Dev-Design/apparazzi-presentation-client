import React from 'react';
import styled from 'styled-components';

const Leaderboards = () => {
  const generateLeaderboard = (type, limit = 10) => {
    const entries = Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      name: `John Doe`,
      picturesSold: (i + 1) * (type === 'weekly' ? 10 : 100),
      profilePicture: `https://via.placeholder.com/40x40?text=${i + 1}`,
    }));

    return (
      <LeaderboardGrid>
        {entries.map((entry, index) => (
          <LeaderboardCell key={index}>
            <ProfilePicture src={entry.profilePicture} alt="Profile Picture" />
            <LeaderboardInfo>
              <Username>{entry.name}</Username>
            </LeaderboardInfo>
            <AmountSold>
              <span className="number">{entry.picturesSold}</span>{' '}
              <span className="text">pictures sold</span>
            </AmountSold>
          </LeaderboardCell>
        ))}
      </LeaderboardGrid>
    );
  };

  return (
    <LeaderboardContainer>
      <LeaderboardContent>
        <WeeklyLeaderboardContainer>
          <WeeklyLeaderboardHeader>Weekly Top 10 Sellers</WeeklyLeaderboardHeader>
          <ViewAllWeekly>View all</ViewAllWeekly>
          {generateLeaderboard('weekly', 8)}
        </WeeklyLeaderboardContainer>

        <AllTimeLeaderboardContainer>
          <AllTimeLeaderboardHeader>All-Time Top 10 Sellers</AllTimeLeaderboardHeader>
          <ViewAllTime>View all</ViewAllTime>
          {generateLeaderboard('all-time', 8)}
        </AllTimeLeaderboardContainer>
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

export default Leaderboards;

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin: 0 auto;
  max-width: 1000px;
  padding: 20px;
  overflow-y: auto;
`;

const LeaderboardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  margin-top: 5vh;
   @media (max-width: 680px){
  margin-right: 50px;
  }
`;

const WeeklyLeaderboardContainer = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const AllTimeLeaderboardContainer = styled.div`
  margin-top: 40px;
  position: relative;
`;

const WeeklyLeaderboardHeader = styled.h2`
  margin-top: 0;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  margin-left: 20px;

  @media (max-width: 680px) {
    margin-left: 40px;
  }
`;

const AllTimeLeaderboardHeader = styled.h2`
  margin-top: 0;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  margin-left: 20px;

  @media (max-width: 680px) {
    margin-left: 50px;
  }
`;

const ViewAllWeekly = styled.div`
  position: absolute;
  right: -110px;
  top: 20px;
  font-size: 0.9rem;
  color: grey;
  cursor: pointer;
  text-decoration: underline;
@media (max-width: 1000px){
  right: 0px;
  }
  @media (max-width: 680px) {
    right: 15px;
  }
`;

const ViewAllTime = styled.div`
  position: absolute;
  right: -100px;
  top: 20px;
  font-size: 0.9rem;
  color: grey;
  cursor: pointer;
  text-decoration: underline;
  @media (max-width: 1000px){
  right: 0px;
  }
  @media (max-width: 680px) {
    right: 15px;
  }
`;

const LeaderboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: 10px;
  width: 100%;
`;

const LeaderboardCell = styled.div`
  display: flex;
  align-items: center;
  margin-right: 60px;
  margin-left: 60px;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 680px) {
    margin-right: 30px;
    margin-left: 30px;
  }
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LeaderboardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Username = styled.span`
  font-size: 16px;
  font-weight: bold;
  font-size: 0.9rem;
  color: black;
`;

const AmountSold = styled.span`
  font-size: 0.9rem;
  color: black;
  text-align: right;
  margin-left: 20px;
  margin-top: 20px;
  white-space: nowrap;
@media (max-width: 500px){
   margin-top: 75px;
   margin-left: -33px;
   }
  & .number {
    font-size: 1.1rem;
    font-weight: bold;
  }

  & .text {
    font-size: 0.8rem;
    font-weight: normal;
  }
`;
