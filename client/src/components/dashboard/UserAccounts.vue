<template>
  <div v-if="this.data">
    <a href="#" @click="sendToSearch">
      <div v-if="summonerName" class="flex-container card">
        <div class="region">{{userRegion}}</div>
        <div class="userImg">
          <img :src="userProfileImg" />
        </div>
        <h1 class="name">{{ summonerName }}</h1>
        <img class="userRankLogo" :src="userRankIcon" />
        <div>
          <p class="label">Rank</p>
          <p class="rank">{{ summonerTier }} {{ summonerRank }}</p>
          <p class="league-name">{{ summonerLeagueName }}</p>
        </div>
        <div>
          <p class="label">Win Rate</p>
          <h1>{{ winRatePercentage }}%</h1>
        </div>
        <button @click="deleteSummoner" class="error">X</button>
      </div>
    </a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  /*eslint-disable */

  name: 'UserAccounts',
  props: ['users'],
  data() {
    return {
      data: null,
      globalId: null
    };
  },
  methods: {
    async deleteSummoner() {
      const postMsg = await axios.delete('/api/v1/users/delete/user/summoner', {
        data: {
          uniqueid: this.globalId,
          _id: this.users._id
        }
      });
      console.log(postMsg);
      this.$emit('data', postMsg.data.user.summonerNames);
    },
    sendToSearch() {
      console.log();
      this.$router.push(`/${this.users.region}/${this.users.summonerName}`);
    }
  },
  computed: {
    summonerName() {
      return this.data.data.data ? this.data.data.data.summonerName : '';
    },
    summonerTier() {
      return this.data.data.data ? this.data.data.data.summmonerTier : '';
    },
    summonerRank() {
      return this.data.data.data ? this.data.data.data.summmonerRank : '';
    },
    summonerLeagueName() {
      return this.data.data.data ? this.data.data.data.summonerLeagueName : '';
    },
    winRatePercentage() {
      return this.data.data.data
        ? Math.round(
            (this.data.data.data.summonerWins /
              (this.data.data.data.summonerWins +
                this.data.data.data.summonerLosses)) *
              100
          )
        : 0;
    },
    userProfileImg() {
      return this.data.data.data.profileIcon
        ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${this.data.data.data.profileIcon}.jpg`
        : '';
    },
    userRankIcon() {
      return this.data.data.data
        ? `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-league-tier-names/global/default/assets/images/ranked-mini-regalia/${this.summonerTier.toLowerCase()}.png`
        : '';
    },
    userRegion() {
      return this.users ? this.users.region : '';
    }
  },

  async mounted() {
    const token = this.$auth.user['http://localhost:8080/uuid'];
    this.globalId = token;
    if (this.users.summonerName) {
      this.data = await axios.get(
        `/api/v1/getrank/${this.users.region}/${this.users.summonerName}`
      );
    } else {
      return false;
    }
  }
};
</script>

<style>
.card {
  background: #0d0920;
  margin: 1em auto;
  border-radius: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  position: relative;
}

.card .error {
  position: absolute;
  top: 12.5px;
  right: 12.5px;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  line-height: 25px;
  background-color: #b51e1e !important;
  color: #fff;
  font-weight: 800;
  -webkit-filter: drop-shadow(0px 3px 1px #000);
  filter: drop-shadow(0px 3px 1px #000);
  transition: 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}

.card .error:hover {
  background: #8d1313 !important;
}

.flex-container {
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}

.flex-container .userImg {
  flex: 0.25;
  margin-left: 2em;
  text-align: center;
}

.flex-container .name {
  flex: 2;
  margin-left: 1em;
  text-align: left;
}

.flex-container .region {
  flex: 0.1;
  margin-left: 2em;
}

.flex-container .userImg img {
  width: 85px;
  border-radius: 50px;
  transition: 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}

.card:hover .userImg img {
  border-radius: 5px;
  transition: 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}

.flex-container div {
  margin-top: 10px;
  color: white;
  flex: 1;
}

.card-container {
  width: 85%;
  margin: 0 auto;
}

.add-btn {
  padding: 15px 20px;
  position: absolute;
  right: 0;
  margin-top: 2.5em;
  background: #4caf50 !important;
}

.add-btn i {
  margin-right: 0.5em;
}

.add-container {
  margin: 1em 0;
  position: relative;
}

.add-btn,
.card-container h1 {
  display: inline-block;
}

p.label {
  color: #827e7e;
  margin: 0;
  padding: 0;
  font-weight: bold;
}

p.rank {
  margin-bottom: 0;
}

.userRankLogo {
  margin-right: 1em;
  width: 44px;
  height: 44px;
}

/* Small only */
@media screen and (max-width: 39.9375em) {
  .flex-container .userImg {
    flex: 100%;
  }

  .flex-container div {
    flex: 100%;
  }

  .card {
    padding: 2em 1em;
  }
}

/* Medium and up */
@media screen and (min-width: 40em) {
}

/* Medium only */
@media screen and (min-width: 40em) and (max-width: 63.9375em) {
}

/* Large and up */
@media screen and (min-width: 64em) {
}

/* Large only */
@media screen and (min-width: 64em) and (max-width: 74.9375em) {
}
</style>
