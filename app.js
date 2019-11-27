exports.getUser = async (req, res) => {
  var data = {};
  //Search API for username
  LeagueAPI.getSummonerByName('AutSerene')
    .then(async function(accountObject) {
      //Using the account object, search the API for matchList
      let matchList = await LeagueAPI.getMatchList(accountObject);
      //Push the accountId so i can use it later
      data.accountId = accountObject.accountId;
      //Get the gameId from each matc
      let newMatch = await matchList.matches.map(item => ({
        id: item.gameId
      }));
      //Splice just the first two results, this will be 20 when
      let new20Match = newMatch.splice(0, 2);
      console.log(data);
      return new20Match;
    })
    .then(async function(activeGames) {
      let findMatchData = activeGames.map(element => {
        //Search API using the gameId to find out further info  on a match (who won, champ played, other participants)
        return LeagueAPI.getMatch(element.id)
          .then()
          .catch(console.log);
      });
      return Promise.all(findMatchData);
    })
    .then(async function(gameData) {
      // Return all the participantIdentities so i can find out who is our original user (AutSerene from first line)
      let teamParticipant = await Promise.all(
        gameData.map(element => {
          return element.participantIdentities;
        })
      );
      //Return array of all the participants
      return teamParticipant;
    })
    .then(async function(teamParticipant) {
      //Search through array to find which participant matches with the original accountId i stored
      const r = teamParticipant[0].find(
        p => p.player.accountId === data.accountId
      );
      console.log(r.participantId);
      res.send({
        teamParticipant
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};
