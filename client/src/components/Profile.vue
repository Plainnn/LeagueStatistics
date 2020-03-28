<template>
  <div>
    <div class="card-container">
      <ErrorHandle v-if="this.error" :errorMsg="this.error" />

      <!-- After the created call, check the res to see if a user has already stored a league of legends username on their account.
      If they have, show the data, if they haven't show a form to allow the user to input a name-->
      <div v-if="this.userData">
        <div class="add-container">
          <h1>Your Accounts</h1>
          <v-btn v-on:click="isHidden = !isHidden; hasName = !!hasName;" class="add-btn">
            <v-icon>mdi-account-plus</v-icon>Add Account
          </v-btn>
        </div>
        <!-- This is an extra feature, this is just if a user wants to add more than one username to his account, still need to turn the form into a component -->
        <div v-if="!isHidden" class="text-center">
          <h1>Please Enter Your Summoner Name</h1>
          <form v-on:submit.prevent="onSubmit">
            <label for="region"></label>
            <select name id="region" v-model="region">
              <option value="EUW">EUW</option>
              <option value="NA">NA</option>
              <option value="KR">KR</option>
            </select>
            <label for="sumName"></label>
            <input
              type="text"
              name="text"
              v-model="inputName"
              class="sumName"
              id="sumName"
              placeholder="Dyrus"
            />
            <input type="submit" value="Submit" class="btn" />
          </form>
        </div>

        <ul id="summoner-accounts flex-container card">
          <UserAccounts
            v-for="(users, index) in this.data"
            :key="users._id"
            :users="users"
            data-aos="fade-left"
            :data-aos-delay="200 * index"
            @data="recieve"
          ></UserAccounts>
        </ul>
      </div>
    </div>
    <div v-if="hasName" class="container text-center">
      <h2>You Don't Have Any Accounts Added..</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ErrorHandle from './util/ErrorHandle';
import UserAccounts from './dashboard/UserAccounts';
export default {
  name: 'Profile',
  components: { ErrorHandle, UserAccounts },
  data() {
    return {
      loading: false,
      data: null,
      error: null,
      globalId: null,
      nameData: '',
      data2: null,
      region: 'euw',
      sumName: null,
      inputName: null,
      hasName: false,
      userData: {},
      isHidden: true
    };
  },
  async mounted() {
    /*eslint-disable */
    //Using oAuth i get  a UUID that is attatched to my account, i store/see if this UUID is already stored in my datbase
    try {
      const token = this.$auth.user['http://localhost:8080/uuid'];
      this.globalId = token;
      let postMsg = await axios.post('/api/v1/users/add', {
        uniqueid: token
      });

      if (postMsg.data.users.summonerNames.length > 0) {
        this.data = postMsg.data.users.summonerNames;
        this.hasName = true;
      } else {
        this.hasName = false;
      }
    } catch (error) {
      this.error = error.response.status;
    }
  },
  methods: {
    async onSubmit() {
      this.error = null;
      this.hasName = false;
      try {
        //Make the API call on submit of the form to add the username to their account
        this.loading = true;
        const postMsg = await axios.post('/api/v1/users/add/user/summoner', {
          uniqueid: this.globalId,
          summonerName: this.inputName,
          region: this.region
        });
        this.data = postMsg.data.addUser.summonerNames;
        this.isHidden = true;
        this.loading = false;
        this.inputName = '';
      } catch (error) {
        this.error = error.response.status;
        console.error(error.response.status);
      }
    },
    recieve(value) {
      this.data = value;
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

<style></style>
