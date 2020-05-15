<template>
  <div
    v-if="data"
    class="text-center"
    style="margin: 0 auto; text-align: center"
    justify="center"
  >
    <div>
      <h1>Champion Base Statistics</h1>
      <h2 class="mb-12">
        These stats are what a champion starts with and doesn't take into
        consideration items bought during a game
      </h2>
    </div>
    <v-row fluid class="text-center" justify="center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-col sm="12" lg="3">
            <div class="card text-center pa-12" dark v-on="on">
              <img
                src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png"
              />
              <h3>Base Health : {{ hp }}</h3>
            </div>
          </v-col>
        </template>
        <span>The base health at level 18 is {{ hp18 }}</span>
        <v-divider light block></v-divider>
        <span class="block"
          >This is calculated by multiplying the HP per level * 17 + Base
          Health</span
        >
      </v-tooltip>

      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png"
          />
          <h3>HP Per Level: {{ hpPerLevel }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png"
          />
          <h3>Mana : {{ mana }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png"
          />
          <h3>Mana Per Level : {{ manaPerLevel }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png"
          />
          <h3>Base Movement Speed : {{ moveSpeed }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png"
          />
          <h3>Base Armor : {{ armor }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png"
          />
          <h3>Armor Per Level : {{ armorPerLevel }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png"
          />
          <h3>Base Magic Resist : {{ magicResist }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.png"
          />
          <h3>Magic Resist Per Level : {{ magicResistPerLevel }}</h3>
        </div>
      </v-col>
      <v-col sm="12" lg="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png"
          />
          <h3>Attack Range : {{ attackRange }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.data">
      <v-tooltip right class="pa-6">
        <template v-slot:activator="{ on }">
          <v-btn @click="onClick()" class="button" color="green" v-on="on">
            <v-icon>mdi-download</v-icon>Download {{ names }}'s Stats
          </v-btn>
        </template>
        <v-row class="my-2 pa-2">
          <span>This will download a CSV file</span>
        </v-row>
        <v-row class="pa-2 my-1">
          <span class="font-weight-bold"
            >Learn more
            <a href="https://en.wikipedia.org/wiki/Comma-separated_values"
              >here</a
            ></span
          ></v-row
        >
      </v-tooltip>
    </v-row>
  </div>
</template>

<script>
import jsonexport from 'jsonexport';

export default {
  name: 'ChampionStats',
  props: ['data', 'name'],
  methods: {
    onClick() {
      jsonexport(this.data, function(err, csv) {
        if (err) return err;
        var fileURL = window.URL.createObjectURL(new Blob([csv]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'stats.csv');
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    }
  },
  computed: {
    names() {
      return this.name ? this.name : '';
    },
    hp() {
      return this.data ? parseInt(this.data.hp) : '';
    },
    hpPerLevel() {
      return this.data ? parseInt(this.data.hpperlevel) : '';
    },
    hp18() {
      return this.data ? this.hp + 17 * this.hpPerLevel : '';
    },
    mana() {
      return this.data ? this.data.mp : '';
    },
    manaPerLevel() {
      return this.data ? this.data.mpperlevel : '';
    },
    mana18() {
      return this.data ? this.mana + 17 * this.manaPerLevel : '';
    },
    moveSpeed() {
      return this.data ? this.data.movespeed : '';
    },
    armor() {
      return this.data ? this.data.armor : '';
    },
    armorPerLevel() {
      return this.data ? this.data.armorperlevel : '';
    },
    magicResist() {
      return this.data ? this.data.spellblock : '';
    },
    magicResistPerLevel() {
      return this.data ? this.data.spellblockperlevel : '';
    },
    attackRange() {
      return this.data ? this.data.attackrange : '';
    }
  }
};
</script>

<style scoped></style>
