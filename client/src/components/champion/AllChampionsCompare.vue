<template>
  <div v-if="this.data" class="container">
    <v-row fluid justify="center">
      <v-col class="ma-1" cols="2" v-for="index in this.data" :key="index.key">
        <div class="d-flex" @click="sendUrl(index.key, index.id)">
          <div>
            <v-img
              :src="championImage(index.id)"
              class="championImage"
              max-width="55"
              max-height="55"
              elevation="12"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey "></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
          <div class="pa-4">
            <h3 class>{{ index.name }}</h3>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const axios = require('axios');

/*eslint-disable */

export default {
  name: 'AllChampions',
  data() {
    return {
      data: null,
      sendUr: null
    };
  },
  async mounted() {
    const res = await axios(
      'https://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json'
    );
    this.data = res.data.data;
  },
  methods: {
    championImage(key) {
      var images = require.context('./util/img/champs', false, /\.png$/);
      return images('./' + key + '.png');
    },
    sendUrl(datakey, dataid) {
      this.$router.push(`${this.$route.path}/${dataid}/${datakey}`);
      // this.$router.push({
      //   name: 'ChampionPageCompare',
      //   params: {
      //     id1:
      //   }
      // })
      console.log(this.$route);
      this.sendUrl = this.$route.path;
    }
  }
};
</script>

<style scoped>
.v-dialog.v-dialog--active {
  overflow-x: hidden;
}

.championImage {
  margin: 0 auto;
}

p,
span,
h3 {
  color: #fff;
}

span {
  color: #facc45;
}

.container {
  width: 95%;
  margin: 0 auto;
}

h3 {
  font-family: 'Roboto', sans-serif;
}

.card {
  border: 2px solid transparent;
}

.card:hover {
  border: 2px solid #facc45;
}

v-img {
  min-height: 50px;
  min-width: 50px;
}
</style>