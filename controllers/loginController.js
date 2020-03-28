exports.getRecomended = async (req, res) => {
  let userData = {};

  const efficiently = async kayn => {
    try {
      const summoner = await kayn.Summoner.by
        .name(req.params.name)
        .region(REGIONS.EUROPE_WEST);
      const rankedData = await kayn.League.Entries.by.summonerID(summoner.id);
      const leagueData = await kayn.League.by.uuid(rankedData[0].leagueId);
      const newRankedData = await rankedData.filter(
        d => d.queueType === 'RANKED_SOLO_5x5'
      );
      const data = {
        summonerName: summoner.name,
        summmonerTier: newRankedData[0].tier,
        summmonerRank: newRankedData[0].rank,
        summonerWins: newRankedData[0].wins,
        summonerLosses: newRankedData[0].losses,
        summonerLp: newRankedData[0].leaguePoints,
        summonerLeagueName: leagueData.name
      };

      res.json({
        data
      });
    } catch (error) {
      res.status(400).json({
        error
      });
    }
  };

  const main = async kayn => {
    let results = await efficiently(kayn);
  };

  main(kayn).then;
};
