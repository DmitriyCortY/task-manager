<template>
  <div class="wrapper-tasks">
    <div class="row-flex">
      <div>
        <label @click="openList">Выбор маркера &#9660;: 
          <span class="checked-marker" v-for="elem in markerArray" :key="elem.key"  :style="{backgroundColor: elem.color}">
            {{elem.str}}
          </span>
        </label>
        <ul class="list" :class="{active_list:activeList}">
          <li @click="toggleCheckMarker(elem.prefix + elem.name, elem.color)" v-for="elem in getMarkers" :key="elem.key" :value="elem.prefix + elem.name">
            <span :style="{backgroundColor: elem.color}">
              {{elem.prefix + elem.name}}
            </span>
          </li>
        </ul>
      </div>
      <div @click="createMarker()" class="plus-marker">+</div>
    </div>



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
          <select style="margin: 0 5px 0 0; width: 15vw;" v-model="marker.prefix">
            <option value="@">@</option>
            <option value=".">.</option>
            <option value="#">#</option>
          </select>
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
      title: "",
      description: "",
      cost: "",
      currency: "грн",
      payd: false,
      id: 12,

      createMarkerFlag: false,
      marker: {
        name: "",
        color: "#2196f3",
        prefix: ""
      },

      activeList: false,
      checkMarker: [],
      markerArray: []
    };
  },
  methods: {
    newTask() {
      if (
        this.title === "" ||
        // this.description === "" ||
        this.cost === "" ||
        this.currency === ""
      ) {
        return;
      }
      const task = {
        status: "inProcces",
        markerArray: this.markerArray,
        title: this.title,
        description: this.description,
        cost: this.cost,
        currency: this.currency,
        payd: this.payd,
        id:
          this.$store.getters.tasks.length != 0
            ? this.$store.getters.tasks[this.$store.getters.tasks.length - 1]
                .id + 1
            : 1
      };

      this.$store.dispatch("newTask", task);

      this.status = "inProcces";
      this.checkMarker = "";
      this.title = "";
      this.description = "";
      this.cost = "";
      this.currency = "";
      this.payd = false;
      this.id = 12;

      this.$router.push("/projects");
    },

    createMarker() {
      this.createMarkerFlag = !this.createMarkerFlag;
    },
    cancelCreateMarker() {
      this.createMarkerFlag = !this.createMarkerFlag;
    },
    finishCreateMarker() {
      const marker = {
        name: this.marker.name,
        color: this.marker.color,
        prefix: this.marker.prefix
      };

      this.$store.dispatch("newMarkers", marker);

      this.createMarkerFlag = !this.createMarkerFlag;

      this.marker.name = "";
      this.marker.color = "#2196f3";
      this.marker.prefix = "";
    },
    openList() {
      this.activeList = !this.activeList;
    },
    toggleCheckMarker(str, color) {
      if (this.checkMarker.indexOf(str) != -1) {
        this.checkMarker.splice(this.checkMarker.indexOf(str), 1);
        // this.markerArray
        this.removeByAttr(this.markerArray, "str", str);
      } else {
        this.checkMarker.push(str);
        this.markerArray.push({ str, color });
      }
    },
    removeByAttr(arr, attr, value) {
      var i = arr.length;
      while (i--) {
        if (
          arr[i] &&
          arr[i].hasOwnProperty(attr) &&
          (arguments.length > 2 && arr[i][attr] === value)
        ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    }
  },
  computed: {
    getMarkers() {
      return this.$store.getters.markers;
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
select {
  text-transform: capitalize;
}
label {
  cursor: pointer;
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
.row-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.plus-marker {
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
.active {
  display: flex;
}
.ui-messageBox__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.namemarker {
  margin: 0 5px;
  height: 30px;
  border-radius: 5px;
}
.colorpicker {
  margin: 0 5px;
  height: 30px;
  border-radius: 5px;
}
.button {
  color: #ffffff;
  background-color: #2196f3;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
}
.list {
  display: none;
  max-height: 30vh;
  overflow: auto;
  margin: 0;
  padding: 0;
  list-style-type: none;
  max-width: 150px;
  min-width: 150px;
  user-select: none;
  & li {
    user-select: none;
    margin: 5px auto;
    padding: 0 3px;
    cursor: pointer;
    list-style: none;
    text-align: center;
    display: flex;
    flex-direction: row;
    & span {
      width: 100%;
      padding: 4px 10px;
      border-radius: 3px;
      color: #ffffff;
      font-weight: 500;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
  }
}
.active_list {
  display: block;
}
.checked-marker {
  padding: 4px 10px;
  border-radius: 3px;
  color: #ffffff;
  font-weight: 500;
  margin-right: 6px;
  font-size: 14px;
}
</style>


