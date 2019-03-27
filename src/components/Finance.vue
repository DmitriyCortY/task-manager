<template>
  <div>
      {{ tasksPay }}
      {{ tasksNoPay }}
      
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
  computed: {
    tasksPay() {
      let tasks = this.$store.getters.tasks;
      let cost = 0;

      for (let i = 0; i < tasks.length; i++) {
        console.log(this.$store.getters.tasks[i].payd);
        console.log(this.$store.getters.tasks[i].cost);
        if (this.$store.getters.tasks[i].payd === true) {
          cost += parseInt(this.$store.getters.tasks[i].cost);
        }
      }
      return cost;
    },
    tasksNoPay() {
      let tasks = this.$store.getters.tasks;
      let cost = 0;

      for (let i = 0; i < tasks.length; i++) {
        console.log(this.$store.getters.tasks[i].payd);
        console.log(this.$store.getters.tasks[i].cost);
        if (this.$store.getters.tasks[i].payd === false) {
          cost += parseInt(this.$store.getters.tasks[i].cost);
        }
      }
      return cost;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
