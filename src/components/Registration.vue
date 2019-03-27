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

    <div class="form-item" :class="{ 'error--text': $v.repeatPassword.$error }">
      <label for="repeatPassword">Повторите пароль</label>
      <input
        type="password"
        id="repeatPassword"
        v-model="repeatPassword"
        :class="{ 'error--text': $v.repeatPassword.$error }"
        @input="$v.repeatPassword.$touch()"
      >
      <span>Пароли должны совпадать</span>
    </div>

    <div>
      <button
        type="submit"
        class="button"
        color="info"
      >
      <span v-if="loading">Загрузка</span>
      <span v-else>Регистрация</span>
      </button>

      <br>
      <br>
      <p class="typo__p" v-if="submitStatus === 'OK'">Спасибо за заявку!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Пожалуйста, заполните форму правильно.</p>
      <p class="typo__p" v-if="submitStatus === 'The email address is already in use by another account.'">Адрес электронной почты уже используется другой учетной записью.</p>
      <!-- <p class="typo__p" v-if="submitStatus === 'PENDING'">Посылка ...</p> -->
    </div>
    <br>
    <p style="margin-top: 35px">У вас уже есть аккаунт? <router-link style="text-decoration: underline; cursor: pointer;" to="/login">Нажмите сдесь</router-link> </p>
  </form>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
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
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
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
        }

        this.$store.dispatch('registerUser', user)
          .then( () => {
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading(){
      return this.$store.getters.loading
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 8px;
  max-width: 1170px;
  width: 60vw; 
  min-width: 340px;
  margin: 0 auto;  
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
