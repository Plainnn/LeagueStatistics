<template>
  <div>
    <div v-if="this.data" class="card-container">
      <!-- After the created call, check the res to see if a user has already stored a league of legends username on their account.
      If they have, show the data, if they haven't show a form to allow the user to input a name-->
      <div v-if="this.data.data.users.summonerName.length > 0" class>
        <div class="add-container">
          <h1>Your Accounts</h1>
          <v-btn v-on:click="isHidden = !isHidden" class="add-btn">
            <v-icon>mdi-account-plus</v-icon>Add Account
          </v-btn>
        </div>
        <!-- This is an extra feature, this is just if a user wants to add more than one username to his account, still need to turn the form into a component -->
        <div v-if="isHidden">
          <h1>Test</h1>
          <!-- 
            Add Form component here
          -->
        </div>

        <!-- Display user account data, again i need to turn this into a component, and eventually will need to have v-for each username stored -->
        <div v-if="this.data && this.userData" class="flex-container card">
          <div class="userImg">
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${userData.data.data.profileIcon}.jpg`"
            />
          </div>
          <h1 class="name">{{this.data.data.users.summonerName}}</h1>
          <div>
            <p class="label">Rank</p>
            <p
              class="rank"
            >{{userData.data.data.summmonerTier}} {{userData.data.data.summmonerRank}}</p>
            <p class="league-name">{{userData.data.data.summonerLeagueName}}</p>
          </div>
          <div>
            <p class="label">Win Rate</p>
            <h1>{{Math.round(userData.data.data.summonerWins / (userData.data.data.summonerWins + userData.data.data.summonerLosses) * 100) }}%</h1>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Show form to add username if the length is < 0  -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  components: {},
  data() {
    return {
      loading: false,
      data: null,
      error: null,
      globalId: null,
      hasFriends: false,
      data2: null,
      region: 'euw',
      sumName: null,
      inputName: null,
      hasName: false,
      nameData: null,
      userData: null,
      isHidden: false
    };
  },
  async mounted() {
    /*eslint-disable */

    //Using oAuth i get  a UUID that is attatched to my account, i store/see if this UUID is already stored in my datbase
    const token = this.$auth.user['http://localhost:8080/uuid'];
    this.globalId = token;
    const postMsg = await axios.post('/api/v1/users/add', {
      uniqueid: token
    });
    this.data = postMsg;
    this.nameData = postMsg;
    this.userData = await axios.get(
      `/api/v1/getrank/${this.region}/${this.data.data.users.summonerName}`
    );

    console.log(this.userData);
  },
  methods: {
    async onSubmit() {
      //Make the API call on submit of the form to add the username to their account
      this.loading = true;
      const post = await axios.post('/api/v1/users/add/user/summoner', {
        uniqueid: this.data.data.users.uniqueid,
        summonerName: this.inputName,
        region: this.region
      });

      this.userData = await axios.get(
        `/api/v1/getrank/${this.region}/${this.data.data.users.summonerName}`
      );

      this.loading = false;
    },
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style>
.card {
  background: #0d0920;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
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

.flex-container .userImg img {
  width: 85px;
  border-radius: 50px;
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