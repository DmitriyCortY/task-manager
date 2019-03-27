<template>
  <div>
      Личный кабинет в разработке
      <br>
      <button @click="logout" >Выйти из аккаунта</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
  button{
    padding: 8px 5px;
    background-color: #dc3545;
    color: #fafafa;
    border-radius: 2px;
    font-weight: 700;
  }
</style>