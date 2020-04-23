<template>
  <div v-if="data" class="text-center" style="margin: 0 auto; text-align: center" justify="center">
    <div>
      <h1>Champion Base Statistics</h1>
      <h2
        class="mb-12"
      >These stats are what a champion starts with and doesn't take into consideration items bought during a game</h2>
    </div>
    <v-row fluid class="text-center" justify="center">
      <v-col cols="3">
        <div class="card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png"
          />
          <h3>Base Health : {{hp}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png"
          />
          <h3>HP Per Level: {{hpPerLevel}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png"
          />
          <h3>Mana : {{mana}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png"
          />
          <h3>Mana Per Level : {{manaPerLevel}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png"
          />
          <h3>Base Movement Speed : {{moveSpeed}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png"
          />
          <h3>Base Armor : {{armor}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png"
          />
          <h3>Armor Per Level : {{armorPerLevel}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png"
          />
          <h3>Base Magic Resist : {{magicResist}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.png"
          />
          <h3>Magic Resist Per Level : {{magicResistPerLevel}}</h3>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="card card text-center pa-12">
          <img
            src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png"
          />
          <h3>Attack Range : {{attackRange}}</h3>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ChampionStats',
  props: ['data'],
  computed: {
    hp() {
      return this.data ? this.data.hp : '';
    },
    hpPerLevel() {
      return this.data ? this.data.hpperlevel : '';
    },
    mana() {
      return this.data ? this.data.mp : '';
    },
    manaPerLevel() {
      return this.data ? this.data.mpperlevel : '';
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

<style scoped>
</style>