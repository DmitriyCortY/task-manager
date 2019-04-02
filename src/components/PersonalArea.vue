<template>
  <div class="wrap">
    <label>
      <span>Введите или измените Login</span>
      <!-- <input style="margin-top: 5px;" type="text" v-model="authUser.name"> -->
      <input style="margin-top: 5px;" type="text" v-model="name">
    </label>
    <label>
      <!-- <span>Вставте ссылку на ваши изображение</span> -->
      <div>Выберите изображение</div>
      <!-- <input type="text" v-model="authUser.photo"> -->
      <input style="margin-top: 5px;" type="file" @change="uploadPhoto">
    </label>
    <button class="button-blue" @click="edit" >Применить</button>
    <br><br><br>
    <button class="button-red" @click="logout" >Выйти из аккаунта</button>
    <br>
    <br>
    {{userKey}}
    <!-- {{ authUser }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      photo: "",
      selectPhoto: null,
      urlPhoto: ""
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    },
    uploadPhoto(e) {
      this.selectPhoto = e.target.files[0];
      let reader = new FileReader();

      reader.onload = e => {
        this.urlPhoto = e.target.result;
        this.authUser.photo = e.target.result;
      };

      reader.readAsDataURL(this.selectPhoto);
    },
    edit() {
      // console.log(this.name);
      const editData = {
        name: this.name,
        mail: this.authUser.mail,
        photo: this.authUser.photo,
        key: this.userKey
      };
      this.$store.dispatch("editPersons", editData);
    }
  },
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
    },
    userKey() {
      return this.$store.getters.user.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.button-red {
  padding: 8px 15px;
  background-color: #dc3545;
  color: #fafafa;
  border-radius: 2px;
  font-weight: 700;
  @media screen and (max-width: 560px) {
    padding: 5px 11px;
    font-weight: 500;
  }
}
.button-blue {
  padding: 8px 15px;
  background-color: #2196f3;
  color: #fafafa;
  border-radius: 2px;
  font-weight: 700;
  @media screen and (max-width: 560px) {
    padding: 5px 11px;
    font-weight: 500;
  }
}
.wrap {
  max-width: 780px;
  margin: 15px auto;
  padding: 15px;
}
</style>