<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app disable-resize-watcher disable-route-watcher>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">MTMS</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in menu" :key="item.title" :to="item.path" @click.stop="drawer = !drawer">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app light>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <div class="_header" v-if="this.$store.state.user.user === null">
        <v-list-tile v-for="item in auth" :key="item.title" :to="item.path">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>

      <router-link v-if="this.$store.state.user.user !== null" to="/personal-area">
        <div class="user-photo-wrap">
          <div :style="{'background-image': 'url(' + authUser.photo + ')'}" class="user-photo"></div>
          <div>{{ authUser.name != '' ? authUser.name : this.$store.state.user.userMail }}</div>
        </div>
      </router-link>
    </v-toolbar>

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: null,
      menu: [
        { title: "Создать проект", icon: "dashboard", path: "/" },
        { title: "Проекты", icon: "work", path: "/projects" },
        { title: "Финансы", icon: "assessment", path: "/finance" }
      ],
      auth: [
        { title: "Регистрация", icon: "account_box", path: "/registration" },
        { title: "Логин", icon: "account_box", path: "/login" }
      ],
      right: null
    };
  },
  methods: {},
  computed: {
    authUser() {
      let authUser = [];
      for (let i = 0; i < this.$store.getters.persona.length; i++) {
        if (
          this.$store.getters.persona[i].key === this.$store.getters.user.id
        ) {
          authUser = this.$store.getters.persona[i];
        }
      }
      return authUser;
    }
  }
};
</script>

<style lang="scss">
._header {
  display: flex;
  & i {
    margin-right: 5px;
  }
}
::-webkit-scrollbar {
  @media screen and (min-width: 560px) {
    width: 5px;
    height: 5px;
    background-color: #ededed;
  }
}
::-webkit-scrollbar-thumb {
  @media screen and (min-width: 560px) {
    background: #666;
  }
}
.user-photo {
  width: 35px;
  height: 35px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 5px;
}
.user-photo-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>

