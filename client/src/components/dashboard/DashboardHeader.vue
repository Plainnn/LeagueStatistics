<template>
  <div></div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['data'],
  data() {
    return {
      hasName: false,
      inputName: '',
      region: null,
      userData: null,
      loading: null,
      isHidden: false
    };
  },
  methods: {
    async onSubmit() {
      //Make the API call on submit of the form to add the username to their account
      this.loading = true;
      this.data = await axios.post('/api/v1/users/add/user/summoner', {
        uniqueid: this.data.data.users.uniqueid,
        summonerName: this.inputName,
        region: this.region
      });

      if (this.data.data.user.summonerName == null || undefined || '') {
        console.log('Please enter a username');
      } else {
        this.userData = await axios.get(
          `/api/v1/getrank/${this.region}/${this.data.data.users.summonerName}`
        );
      }

      this.loading = false;
    }
  }
};
</script>

<style scoped>
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