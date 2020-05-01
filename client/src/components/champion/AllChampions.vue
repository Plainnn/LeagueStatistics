<template>
  <div v-if="this.data" class="container">
    <v-row fluid>
      <v-toolbar class="card pa-12">
        <v-text-field
          v-model="searchText"
          label="Search By Champion Name"
          class="mb-6"
        >Search By Champion Name</v-text-field>
      </v-toolbar>
    </v-row>
    <v-row fluid justify="center">
      <v-col class="card ma-6" cols="2" v-for="index in filteredHeroes" :key="index.key">
        <div class="d-flex" @click="sendUrl(index.key, index.id)">
          <div>
            <v-img
              :src="championImage(index.id)"
              class="championImage"
              max-width="100"
              max-height="100"
              elevation="12"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>

          <div class="pa-2">
            <h3 class>{{ index.name }}</h3>
            <div v-for="(index) in index.tags" :key="index.key">
              <span class="caption">{{index}}</span>
            </div>
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
      searchText: ''
    };
  },
  async mounted() {
    const res = await axios(
      'http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json'
    );
    this.data = res.data.data;
  },
  computed: {
    filteredHeroes() {
      if (
        this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1) ===
        ''
      ) {
        return this.data;
      } else {
        return Object.keys(this.data).reduce((acc, val) => {
          if (
            val.indexOf(
              this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1)
            ) !== -1
          ) {
            acc[val] = this.data[val];
          }
          return acc;
        }, {});
      }
    }
  },
  methods: {
    championImage(key) {
      var images = require.context('./util/img/champs', false, /\.png$/);
      return images('./' + key + '.png');
    },
    sendUrl(datakey, dataid) {
      this.$router.push(`/champ/${dataid}/${datakey}`);
    }
  }
};
</script>

<style scoped>
.championImage {
  margin: 0 auto;
}

input {
  text-transform: capitalize;
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
  width: 75%;
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
</style>