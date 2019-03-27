<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-item" :class="{ 'error--text': $v.email.$error }">
      <label for="email">Почта</label>
      <input
        type="email"
        id="email"
        v-model="email"
        :class="{ 'error--text': $v.email.$error }"
        @input="$v.email.$touch()"
      >
      <span>Введите коректную почту</span>
    </div>

    <div class="form-item" :class="{ 'error--text': $v.password.$error }">
      <label for="password">Пароль</label>
      <input
        type="password"
        id="password"
        v-model="password"
        :class="{ 'error--text': $v.password.$error }"
        @input="$v.password.$touch()"
      >
      <span>Пароль должен быль не менее 8 символов</span>
    </div>

    <div>
      <button
        type="submit"
        class="button"
        color="info"
      >
      <span v-if="loading">Загрузка</span>
      <span v-else>Войти</span>
      </button>

      <br>
      <br>
      <p class="typo__p" v-if="submitStatus === 'OK'">Спасибо за заявку!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Пожалуйста, заполните форму правильно.</p>
      <p class="typo__p" v-if="submitStatus === 'The password is invalid or the user does not have a password.'">Пароль неверен или у пользователя нет пароля.</p>
      <!-- <p class="typo__p" v-if="submitStatus === 'PENDING'">Посылка ...</p> -->
    </div>
    <br>
    
    <p style="margin-top: 35px;">Нет аккаунта? <router-link style="text-decoration: underline; cursor: pointer;" to="/registration">Нажмите сдесь</router-link> </p>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      submitStatus: null
    };
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },

  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        const user = {
          email: this.email,
          password: this.password
        };

        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.submitStatus = "OK";
            this.$router.push("/projects");
          })
          .catch(err => {
            this.submitStatus = err.message;
          });
      }
    }
  },
  computed: {
    loading() {
      this.$router.push("/projects");
      return this.$store.getters.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 8px;
}
.form-item {
  position: relative;
  margin-bottom: 15px;
  & input {
    display: block;
    width: 100%;
    outline: none;
    padding: 5px 3px;
    border-bottom: 2px solid #2196f3;
    transition: all 0.3s ease-in-out;
    color: #848484;
  }
  & label {
    color: #848484;
    cursor: text;
    margin-bottom: -2px;
    display: block;
  }
  & span {
    transition: all 0.3s ease-in-out;
    font-size: 12px;
    color: red;
    display: block;
    height: 5px;
    opacity: 0;
    display: block;
    margin-top: -10px;
  }
}
.error--text {
  & input {
    border-bottom: 2px solid red;
    color: red;
  }
  & label {
    color: red;
  }

  & span {
    opacity: 1;
  }
}
.button {
  outline: none;
  border: none;
  background: #2196f3;
  padding: 5px 8px;
  border-radius: 2px;
  color: #fafafa;
  margin-top: 3px;
  font-weight: 700;
}
</style>
