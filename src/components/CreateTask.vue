<template>
  <div class="wrapper-tasks">
    <label for="email">Маркер имени проекта</label>
    <input v-model="markerName" type="text">

    <label for="email">Маркер роли в проекте</label>
    <input v-model="markerRole" type="text">

    <label for="email">Заголовок проекта</label>
    <input v-model="title" type="text">

    <label for="email">Описание проекта</label>
    <textarea v-model="description"></textarea>

    <label for="email">Стоимость проекта</label>
    <input v-model="cost" type="number">

    <label for="email">Валюта</label>
    <select v-model="currency" name="select">
      <option value="грн" selected>грн</option>
      <option value="usd">usd</option>
    </select>
    
    <button @click="newTask">Добавить задачу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "inProcces",
      markerName: "",
      markerRole: "",
      title: "",
      description: "",
      cost: "",
      currency: "",
      payd: false,
      id: 12
    };
  },
  methods: {
    newTask() {
      if (
        this.markerName === "" ||
        this.markerNamarkerRoleme === "" ||
        this.title === "" ||
        this.description === "" ||
        this.cost === "" ||
        this.currency === ""
      ) {
        return;
      }
      const task = {
        status: "inProcces",
        markerName: "@" + this.markerName,
        markerRole: "." + this.markerRole,
        title: this.title,
        description: this.description,
        cost: this.cost,
        currency: this.currency,
        payd: this.payd,
        id:
          this.$store.getters.tasks[this.$store.getters.tasks.length - 1].id + 1
      };

      this.$store.dispatch("newTask", task);

      this.status = "inProcces";
      this.markerName = "";
      this.markerRole = "";
      this.title = "";
      this.description = "";
      this.cost = "";
      this.currency = "";
      this.payd = false;
      this.id = 12;

      this.$router.push("/projects");
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.wrapper-tasks {
  padding: 8px;
  max-width: 1170px;
  width: 60%;
  min-width: 340px;
  margin: 0 auto;
}
select,
textarea {
  border: 1px solid #dcdfe6;
  padding: 4px 10px;
}
button {
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


