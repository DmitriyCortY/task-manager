<template>
  <div class="wrapper-tasks">
    <div class="row-flex">
      <div>
        <label for="markerName">Маркер имени проекта</label>
        <select id="markerName" v-model="markerName" >
          <option v-for="elem in getMarkers" :key="elem.key" :value="elem.prefix + elem.name">{{elem.prefix}}{{elem.name}}</option>
        </select>
        <!-- <input id="markerName" v-model="markerName" type="text"> -->
      </div>
      <div @click="createMarker('@')" class="plus-marker">+</div>
    </div>



    <label for="markerRole">Маркер роли в проекте</label>
    <!-- <input id="markerRole" v-model="markerRole" type="text"> -->
    <select  v-model="markerRole" style="text-transform: capitalize;" name="markerRole" id="markerRole">
      <option value="layout" selected>Layout</option>
      <option value="adversting">Adversting</option>
      <option value="wordpress">Wordpress</option>
      <option value="other">Other</option>
    </select>

    <label for="title">Заголовок проекта</label>
    <input id="title" v-model="title" type="text">

    <label for="description">Описание проекта</label>
    <textarea id="description" v-model="description"></textarea>

    <label for="cost">Стоимость проекта</label>
    <input id="cost" v-model="cost" type="number">

    <!-- <label for="currency">Валюта</label>
    <select id="currency" v-model="currency" name="select">
      <option value="грн" selected>грн</option>
      <option value="usd">usd</option>
    </select> -->

    <div class="ui-messageBox__wrapper" @click="cancelCreateMarker()"  :class="{active: createMarkerFlag}">
      <div class="ui-messageBox fadeInDown" @click.stop>
        <div class="ui-messageBox__header">
          <span>Создание маркера</span>
          <span class="button-close" @click="cancelCreateMarker"></span>
        </div>
        <div class="ui-messageBox__content">
          <input class="namemarker" type="text" v-model="marker.name">
          <input class="colorpicker" type="color" value="#2196f3" v-model="marker.color">
        </div>
        <div class="ui-messageBox__footer">
          <div class="button" @click="finishCreateMarker">Принять</div>
        </div>
      </div>
    </div>
    
    <button @click="newTask">Добавить задачу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "inProcces",
      markerName: "",
      markerRole: "layout",
      title: "",
      description: "",
      cost: "",
      currency: "грн",
      payd: false,
      id: 12,

      createMarkerFlag: false,
      marker: {
        name: '',
        color: '#2196f3',
        prefix: ''
      }
    };
  },
  methods: {
    newTask() {
      if (
        this.markerName === "" ||
        this.markerNamarkerRoleme === "" ||
        this.title === "" ||
        // this.description === "" ||
        this.cost === "" ||
        this.currency === ""
      ) {
        return;
      }
      const task = {
        status: "inProcces",
        markerName: this.markerName,
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
    },


    createMarker(prefix){
      this.marker.prefix = prefix
      this.createMarkerFlag = !this.createMarkerFlag
    },
    cancelCreateMarker(){
      this.createMarkerFlag = !this.createMarkerFlag
    },
    finishCreateMarker(){
      const marker = {
        name: this.marker.name,
        color: this.marker.color,
        prefix: this.marker.prefix
      }

      this.$store.dispatch("newMarkers", marker);
      
      this.createMarkerFlag = !this.createMarkerFlag

      this.marker.name = ''
      this.marker.color = '#2196f3'
      this.marker.prefix = ''
    }
  },
  computed: {
    getMarkers(){
      return this.$store.getters.markers
    }
  }
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
.row-flex{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.plus-marker{
  width: 35px;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 25px;
  background-color: #73af76;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
}
.active{
  display: flex;
}
.ui-messageBox__content{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.namemarker{
  margin: 0 5px;
  height: 30px;
  border-radius: 5px;
}
.colorpicker{
  margin: 0 5px;
  height: 30px;
  border-radius: 5px;
}
.button{
  color: #ffffff;
  background-color: #2196f3;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
}
</style>


