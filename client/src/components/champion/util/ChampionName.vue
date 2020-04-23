<template>
  <div>
    <div>
      <div class="text-center p-12 champ-first">
        <v-img
          :src="championSplashImage"
          class="champ-splash-image"
          lazy-src="./img/teemo-loading.jpg"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <h2>{{quotePicker()}}</h2>
            </v-row>
          </template>
        </v-img>
        <div class="champ-name-info" elevation="12">
          <h2 class="title">{{championTitle}}</h2>
          <h1 class="name">{{championName}}</h1>
          <h3 class="mb-8">{{championBlurb}}</h3>
          <hr />
        </div>
        <!-- <div v-for="(tags, index) in this.data.tags" :key="index">
          <h3>{{tags}}</h3>
        </div>-->
      </div>
    </div>
    <!-- <div class="championImage pt-6">
      <v-img
        :src="championImage"
        @click="sendUrl(getId)"
        lazy-src="./img/question.png"
        max-width="120"
        max-height="120"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'ChampionName',
  props: ['data'],
  data() {
    return {
      quotes: [
        '"Wait for me, sweetie."',
        '"This moment is waiting to be seized."',
        '"I will wait for you to be better."'
      ]
    };
  },
  computed: {
    championName() {
      return this.data ? this.data.name : '';
    },
    championTitle() {
      return this.data ? this.data.title : '';
    },
    championBlurb() {
      return this.data ? this.data.blurb : '';
    },
    championImage() {
      return this.data.id
        ? `https://cdn.communitydragon.org/latest/champion/${this.data.id}/square`
        : '';
    },
    championSplashImage() {
      return this.data.id
        ? `https://cdn.communitydragon.org/latest/champion/${this.data.id}/splash-art/centered`
        : '';
    }
  },
  methods: {
    quotePicker() {
      let quoteNumber = Math.floor(Math.random() * this.quotes.length) - 1;
      return this.quotes[quoteNumber];
    }
  },
  mounted() {
    /*eslint-disable */
    console.log(this.data);
  }
};
</script>

<style scoped>
.champCard div {
  align-items: center;
  justify-content: center;
  align-items: center;
}

.champCard {
  display: flex;
  padding: 5em;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.championName {
  flex: 1;
  text-align: center;
}

.championBlurb {
  flex: 4;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

''.championImage {
  width: 120px;
  height: auto;
}

.champ-name-info {
  background: #150f3447;
  width: 50%;
  margin: -20em auto 0 auto;
  padding: 2em;
  border-radius: 25px;
  position: relative;
}

.champ-first h2.title {
  text-transform: uppercase;
}
.champ-first h1.name {
  font-size: 7em;
  margin: 0em;
  padding: -20px;
}

.champ-splash-image {
  mask-image: gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, rgba(0, 0, 0, 1)),
    color-stop(0.35, rgba(0, 0, 0, 1)),
    color-stop(0.4, rgba(0, 0, 0, 0.5)),
    color-stop(0.5, rgba(0, 0, 0, 0)),
    color-stop(0.6, rgba(0, 0, 0, 0)),
    color-stop(1, rgba(0, 0, 0, 0))
  );
  -webkit-mask-image: -webkit-gradient(
    linear,
    right top,
    right bottom,
    color-stop(0, rgba(0, 0, 0, 1)),
    color-stop(0.35, rgba(0, 0, 0, 1)),
    color-stop(0.8, rgba(0, 0, 0, 0)),
    color-stop(1, rgba(0, 0, 0, 0))
  );
  z-index: 1;
  height: 717px;
  width: 1215px;
  border-radius: 25px 25px 0px 0px;
  margin: 0 auto;
}

hr {
  background-image: linear-gradient(to left, #ffd14600, #ffd146, #ffd14600);
  height: 2px;
  border: 0;
  margin: 1em auto;
}
</style>