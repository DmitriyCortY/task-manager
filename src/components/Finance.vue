<template>
  <div>
    <div class="small">
      <line-chart :chart-data="datacollection"></line-chart>
    </div>
    
    <div class="wrap">
      <div class="row row-total">
        <div class="row-title">Общая сума</div>

        <div class="row-cost">{{ tasksPay + tasksNoPay}}<span> грн</span></div>
      </div>

      <div class="row row-payd">
        <div class="row-title">Оплачено</div>

        <div class="row-cost">{{ tasksPay }}<span> грн</span></div>
      </div>

      <div class="row row-nopayd">
        <div class="row-title">Не оплачено</div>

        <div class="row-cost">{{ tasksNoPay }}<span> грн</span></div>
      </div>

      <div class="range">
        <input v-model="startRange" type="date">
        <input v-model="endRange" type="date">
      </div>
    </div>

    
  </div>
</template>

<script>
import LineChart from '../store/LineChart.js'
export default {
  components: {
      LineChart
    },
  data() {
    return {
      datacollection: null,
      startRange: "2019-01-01",
      endRange:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() < 8
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() + 1)
    };
  },
  mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Оплачено', 'Не оплачено'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#a7c9ad', '#da9393'],
              data: [this.tasksPay, this.tasksNoPay]
            }
          ]
        }
      }
    },
  computed: {
    tasksPay() {
      let tasks = this.$store.getters.tasks;
      let cost = 0;

      for (let i = 0; i < tasks.length; i++) {
        if (this.$store.getters.tasks[i].payd === true) {
          if (
            this.$store.getters.tasks[i].payDate >
              new Date(this.startRange).getTime() &&
            this.$store.getters.tasks[i].payDate <
              new Date(this.endRange).getTime()
          ) {
            cost += parseInt(this.$store.getters.tasks[i].cost);
          }
        }
      }
      return cost;
    },
    tasksNoPay() {
      let tasks = this.$store.getters.tasks;
      let cost = 0;

      for (let i = 0; i < tasks.length; i++) {
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
.small {
    max-width: 460px;
    margin:  0 auto;
    @media screen and (max-width: 560px){
      max-width: 70vw;
      width: 70vw;
    }
  }

.wrap {
  max-width: 900px;
  margin: 0 auto;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 10px);
  padding: 15px;
  margin: 15px 5px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  text-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
  &:hover {
    transform: scale(1.005);
  }
  @media screen and (max-width: 560px){
    padding: 8px 10px;
  }
}
.row-total {
  border: 2px solid #93dada;
}
.row-payd {
  border: 2px solid #a7c9ad;
}
.row-nopayd {
  border: 2px solid #da9393;
}
.row-title {
  font-weight: 600;
  font-size: 18px;
  @media screen and (max-width: 560px){
    font-size: 16px;
  }
}
.row-cost {
  font-weight: 600;
  font-size: 16px;
  @media screen and (max-width: 560px){
    font-size: 14px;
  }
  & span {
    font-size: 12px;
  }
}
.range {
  width: calc(100% - 10px);
  padding: 15px 0;
  margin: 15px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  & input {
    width: calc(50% - 15px);
    text-align: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: 12px 8px;
    &:first-child {
      margin-right: 30px;
    }
    
  }
}
.button {
  width: calc(50% - 15px);
  text-align: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 12px 8px;
  color: #fff;
  background-color: #6098ff;
  @media screen and (max-width: 560px) {
    width: 100%;
  }
}
</style>
