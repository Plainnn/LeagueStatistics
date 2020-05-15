<template>
  <div>
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-container v-if="data">
      <form v-on:submit.prevent="getData" class="d-flex">
        <select
          name
          id="region-dropdown"
          v-model="region"
          class="dropdown-region px-4 ml-3"
          @change="getData()"
        >
          <option selected value="euw">EUW</option>
          <option value="na">NA</option>
          <option value="kr">KR</option>
        </select>
        <select class="league-dropdown px-4 ml-12" v-model="league" @change="getData()">
          <option selected value="challenger">Challenger</option>
          <option value="grandmaster">Grandmaster</option>
          <option value="master">Master</option>
          <option value="diamond">Diamond</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
          <option value="iron">Iron</option>
        </select>

        <select class="rank-dropdown px-4 ml-12" v-model="rank" @change="getData()">
          <option selected value="I">I</option>
          <option value="II" :disabled="rankDisabled">II</option>
          <option value="III" :disabled="rankDisabled">III</option>
          <option value="IV" :disabled="rankDisabled">IV</option>
        </select>
      </form>

      <v-data-iterator
        :items="data"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.summonerId"
              cols="12"
              sm="12"
              md="12"
              lg="12"
            >
              <v-card class="card">
                <v-card-title class>
                  <div class="d-flex align-center pt-4">
                
                    <div class="mx-6">
                      <p>{{ item.summonerName }}</p>
                    </div>
                    <div class="mx-6">
                      <label>
                        Wins
                        <p>{{ item.wins }}</p>
                      </label>
                    </div>
                    <div class="mx-6">
                      <label>
                        losses
                        <p>{{ item.losses }}</p>
                      </label>
                    </div>
                    <div class="mx-6">
                      <label>
                        LP
                        <p>{{ item.leaguePoints }}</p>
                      </label>
                    </div>
                    <div v-if="item.veteran">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-img src="./img/veteran.png" class="veteran-status" v-on="on" />
                        </template>
                        <span>
                          This user has played over 100 games in this
                          league.
                        </span>
                      </v-tooltip>
                    </div>
                    <div v-if="item.hotStreak">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-img src="./img/hotstreak.png" v-on="on" class="hotstreak-status" />
                        </template>
                        <span>This user has won 3 or more games in a row.</span>
                      </v-tooltip>
                    </div>
                  </div>
                </v-card-title>

              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark text color="primary" class="ml-2" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>


            <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
            <v-btn fab dark color="primary darken-3" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      itemsPerPageArray: [10, 25, 50, 100],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      sortBy: 'name',
      keys: ['Rank', 'Summoner Name', 'Wins', 'Losses'],
      region: 'euw',
      league: 'challenger',
      rank: 'I',
      data: null
    };
  },
  async mounted() {
    this.loading = true;
    const champion = await axios.get(`/api/v1/leagues/euw/challenger/I/1`);
    this.data = champion.data.sendResponse;
    this.loading = false;
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
    rankDisabled() {
      return ['challenger', 'grandmaster', 'master'].includes(this.league);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async getData() {
      if (
        this.league == 'challenger' ||
        this.league == 'grandmaster' ||
        this.league == 'master'
      ) {
        this.rank = 'I';
      }
      this.loading = true;
      this.data = null;
      /*eslint-disable */
      const champion = await axios.get(
        `/api/v1/leagues/${this.region}/${this.league}/${this.rank}/1`
      );
      this.data = champion.data.sendResponse;
      this.loading = false;
    }
  }
};
</script>
<style>
span.v-btn__content {
  color: #fff !important;
}

.theme--light.v-card {
      background: #0d0920;
    margin: 1em auto;
    border-radius: 10px;
    -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    position: relative;
    color: #fff;
}

#region-dropdown,
.league-dropdown,
.rank-dropdown {
  background: #252246 !important;
  color: #fff !important;
  border-radius: 5px;
  padding: 20px;
}

#region-dropdown {
  flex: 25%;
}

.league-dropdown {
  flex: 55%;
}

.rank-dropdown {
  flex: 15%;
}

.league-btn {
  flex: 5%;
}

@media screen and (max-width: 39.9375em) {

}

.v-application .d-flex {

    flex-direction: column;
    text-align: center;
}
</style>
