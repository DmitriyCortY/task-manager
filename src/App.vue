<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app disable-resize-watcher disable-route-watcher>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Tasks manager</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in menu" :key="item.title" :to="item.path">
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

      <router-link v-if="this.$store.state.user.user !== null" to="/personal-area">{{ this.$store.state.user.userMail }}</router-link>
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
    // redirection() {
    //   if (this.$store.getters.checkUser) {
    //   }
    // }
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
  width: 5px;
  height: 5px;
  background-color: #ededed;
}
::-webkit-scrollbar-thumb {
  background: #666;
}
</style>

