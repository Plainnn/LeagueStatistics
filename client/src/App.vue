<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <div class="main-container">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lora:700&display=swap');
.theme--light.v-application {
  background: linear-gradient(
      0deg,
      rgba(21, 15, 52, 0.95),
      rgba(21, 15, 52, 0.95)
    ),
    url('./assets/image.png') !important;
}

.main-container {
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: 'Lora', serif;
  font-weight: 700 !important;
}

h1 {
  font-size: 350%;
}

h1 {
  margin: 0em 0em 0em 0em;
  background: linear-gradient(
    #ffd046 0%,
    #a58f4e 12.16%,
    #f1c542 25.1%,
    #be9b34 39.76%,
    #d3ac3a 51.03%,
    #facc45 71.54%,
    #806823 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 3px 1px #000);
}

hr {
  background-image: linear-gradient(to left, #ffd14600, #ffd146);
  height: 2px;
  border: 0;
}

hr.alt {
  background-image: linear-gradient(to right, #ffd14600, #ffd146);
  height: 2px;
  border: 0;
}
</style>
