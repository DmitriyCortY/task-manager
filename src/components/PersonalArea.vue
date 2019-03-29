<template>
  <div class="wrap">
    <label>
      <span>Введите или измените Login</span>
      <input style="margin-top: 5px;" type="text" v-model="authUser.name">
    </label>
    <label>
      <span>Вставте ссылку на ваши изображение</span>
      <input type="text" v-model="authUser.photo">
    </label>
    <button @click="logout" >Выйти из аккаунта</button>
    <br>
    <br>
    <!-- {{ authUser }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      mail: "",
      photo: ""
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  },
  computed: {
    authUser() {
      let authUser = null;
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

<style lang="scss" scoped>
button {
  padding: 8px 5px;
  background-color: #dc3545;
  color: #fafafa;
  border-radius: 2px;
  font-weight: 700;
}
.wrap {
  max-width: 780px;
  margin: 15px auto;
}
</style>