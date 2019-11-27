<template>
  <section class="userMostLossContainer">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="error">
      <h1>{{ error }}</h1>
      <router-link to="/">Try Again</router-link>
    </div>
    <div v-else>
      <div class="userMostLoss">
        <div class="row">
          <div class="col-sm-9 sum-name">
            <div class="align">
              <h1>
                {{ profileData.data.mostLosses.champ }}
              </h1>
            </div>
            <h2 class="champStats">Is Your Worst Champion</h2>
            <hr />
            <h5 class="champStats">
              {{
                `You have won ${profileData.data.mostLosses.loss} of your last 20 Games`
              }}
            </h5>
          </div>
          <div v-if="profileData" class="col-sm-3 sum-rank">
            <h1 style="text-align:left">Loss</h1>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </section>
</template>

<script>
const axios = require('axios');

export default {
  name: 'userMostLoss',
  data() {
    return {
      loading: false,
      error: false,
      profileData: null
    };
  },
  beforeCreate() {},
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(
        `/api/v1/${this.$route.params.platform}/${this.$route.params.name}`
      );
      this.profileData = res;
      this.loading = false;
    } catch (error) {
      this.error = true;
    }
  }
};
</script>

<style scoped>
.userMostLoss h1,
.userMostLoss h2,
.userMostLoss p {
  text-align: left;
}

.sumRank {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sumRank .align {
  flex-grow: 0;
}

hr.alt {
  flex-grow: 1;
}

.userMostLossContainer {
  margin-top: 50px;
}

.champStats {
  font-family: BeaufortforLOL;
  font-weight: bold;
  font-size: 30px;
  line-height: 49px;
  text-align: left;
  color: #c4b998;
}
</style>
