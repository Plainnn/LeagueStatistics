<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
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
      <router-link to="/" class="mx-2">Home</router-link>
      <router-link to="/profile" class="mx-2">Profile</router-link>
      <router-link to="/champions" class="mx-2">Champions</router-link>
      <router-link to="/leagues" class="mx-2">Leagues</router-link>
      <div v-if="!$auth.loading">
            <button class="button" v-if="!$auth.isAuthenticated" @click="login">Log in</button>
            <button class="button" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
    </v-app-bar> -->

  <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="primary"
      dark
      scroll-target="#routers"
      class
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class=".d-flex .d-md-none .d-lg-none"></v-app-bar-nav-icon>


      <v-spacer></v-spacer>
      <router-link to="/" class="mx-2">Home</router-link>
      <router-link to="/profile" class="mx-2">Profile</router-link>
      <router-link to="/champions" class="mx-2">Champions</router-link>
      <router-link to="/leagues" class="mx-2">Leagues</router-link>
      <div v-if="!$auth.loading">
            <button class="button" v-if="!$auth.isAuthenticated" @click="login">Log in</button>
            <button class="button" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
 
    </v-app-bar>
   


    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="primary"
    >
 


      <v-list >
        <v-list-item>
          <router-link to="/champions" class="mx-2">Champions</router-link>
        </v-list-item>
        <v-list-item>
            <router-link to="/leagues" class="mx-2">Leagues</router-link>
        </v-list-item>
        <v-list-item v-if="!$auth.loading">
              <button class="button" v-if="!$auth.isAuthenticated" @click="login">Log in</button>
              <button class="button" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
        </v-list-item>
        <v-list-item>
          <router-link to="/profile" class="mx-2">Profile</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/" class="mx-2">Home</router-link>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view id="routers"/>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
    domain: null,
    drawer: null,
    clientId: null,
          collapseOnScroll: true,

  }),
  methods: {
    /*eslint-disable */
    // Log the user in
    login() {
      localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')

      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      console.log('logged out');
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lora:700&display=swap');

.v-dialog.v-dialog--active {
  overflow-x: hidden;
}

a {
  color: #fff !important;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  background: linear-gradient(0deg, #150f34f2, rgba(21, 15, 52, 0.95)),
    url('./assets/image.png') no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
background-repeat:no-repeat;

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

.championImage,
.championImageMastery {
  cursor: pointer;

}

@media screen and (max-width: 39.9375em) {
  h1 {
  font-size: 100%;
}

.main-container {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.imgchamp {
  margin-top: 5vw;
}


}


h1,h2,h3  {
  margin: 0em 0em 0em 0em;
  color: #c4b998;
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

.theme--light.v-divider {
  border-color: rgba(181, 124, 255, 0.212) !important;
}
</style>
