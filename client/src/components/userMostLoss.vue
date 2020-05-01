<template>
  <section class="userMostLossContainer">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="error">
      <h1>An error has occoured</h1>
      {{ error }}
      <router-link to="/">Try Again</router-link>
    </div>
    <div class="userMostLoss mb-12" v-if="data">
      <div class="row">
        <div class="col-sm-9 sum-name">
          <div class="align">
            <h1>{{ data.data.mostLosses.champ }}</h1>
          </div>
          <h2 class="champStats">Is Your Worst Champion</h2>
          <hr />
          <h5 class="champStats">
            {{
            `You have lost ${data.data.mostLosses.losses} of your last 20 Games`
            }}
          </h5>
        </div>

        <div class="col-sm-3 sum-rank">
          <div class="imgchamp">
            <img :src="require(`./champion/util/img/champs/nobkg/${(lostChampion)}.png`)" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'userMostLoss',
  props: ['data'],
  data() {
    return {
      loading: false,
      error: false,
      profileData: null
    };
  },
  computed: {
    imgSrc() {
      return `x`;
    },
    lostChampion() {
      return this.data
        ? this.data.data.mostLosses.champ.replace(/ /g, '_')
        : '';
    }
  },
  beforeCreate() {},
  async created() {
    this.loading = true;
    try {
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
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

.imgchamp {
  height: 440px;
  width: 250px;
  margin-top: -50px;
  display: block;
}

.imgchamp img {
  object-fit: contain;
  height: 500px;
  display: block;
}

.userMostLossontainer {
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
