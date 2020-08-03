<template>
    <div class="page-container">
      <md-app>

        <md-app-toolbar class="md-primary">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title app-title">B.O.B. List</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="full" md-swipeable>
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Navigation</span>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text"><router-link to="/">Search</router-link></span>
            </md-list-item>

            <!-- TODO: Should there be a favorites nav option
            <md-list-item>
              <md-icon>bookmark</md-icon>
              <span class="md-list-item-text"><router-link to="/">Favorites</router-link></span>
            </md-list-item> -->

            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text"><router-link to="/about">Info</router-link></span>
            </md-list-item>

          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </div>
</template>

<script>

export default {
  name: 'PersistentFull',
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss" scoped>

  .app-title {
    font-family: 'Eva';
    font-size: 2vh;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
