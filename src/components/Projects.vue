<template>
  <div class="projects">
    <div class="projects__inner">
      <div class="cards-list" style="border-top: 3px solid #01579B">
        <div class="cards-list__name">В процессе</div>

        <div class="cards-list__counter">
          <span>{{ counterTaskInProcces }}</span>
          <span> Карточек</span>
        </div>

        <div class="cards-list__inner">
          <div class="card" v-for="task in tasksInProcces" :key="task.id">
            <div class="card__markers">
              <div>
                <span style="background-color: #0079bf;">{{ task.markerName }}</span>
                <span style="background-color: #eb5a46;">{{ task.markerRole }}</span>
              </div>
              <div style="color: #363636; font-size:18px;">#{{ task.id }}</div>
            </div>

            <div class="card__name">{{ task.title }}</div>
            <div class="card__description">{{ task.description }}</div>

            <div class="card__cost">
              <div class="icon-edit" @click="taskEdit(task.id, task.title, task.description, task.markerName, task.markerRole, task.cost, task.currency, task.status, task.payd, task.key)">
                <i class="v-icon material-icons theme--light"> create </i>
              </div>

              <div>
                <span class="card__cost-number">{{ task.cost }}</span>
                <span class="card__cost-current">{{ task.currency }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="cards-list__add-card">+</div> -->
      </div>

      <div class="cards-list" style="border-top: 3px solid #D50000">
        <div class="cards-list__name">Проверяються</div>

        <div class="cards-list__counter">
          <span>{{ counterTaskChecking }}</span>
          <span> Карточек</span>
        </div>

        <div class="cards-list__inner">
          <div class="card" v-for="task in tasksChecking" :key="task.id">
            <div class="card__markers">
              <div>
                
                
                <span style="background-color: #0079bf;">{{ task.markerName }}</span>
                <span style="background-color: #eb5a46;">{{ task.markerRole }}</span>
              </div>
              <div style="color: #363636; font-size:18px;">#{{ task.id }}</div>
            </div>

            <div class="card__name">{{ task.title }}</div>
            <div class="card__description">{{ task.description }}</div>

            <div class="card__cost">
              <div class="icon-edit" @click="taskEdit(task.id, task.title, task.description, task.markerName, task.markerRole, task.cost, task.currency, task.status, task.payd, task.key)">
                <i class="v-icon material-icons theme--light"> create </i>
              </div>

              <div>
                <span class="card__cost-number">{{ task.cost }}</span>
                <span class="card__cost-current">{{ task.currency }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="cards-list__add-card">+</div> -->
      </div>

      <div class="cards-list" style="border-top: 3px solid #1B5E20">
        <div class="cards-list__name">Готовы</div>

        <div class="cards-list__counter">
          <span>{{ counterTaskDone }}</span>
          <span> Карточек</span>
        </div>

        <div class="cards-list__inner">
          <div class="card" v-for="task in tasksDone" :key="task.id">
            <div class="card__markers">
              <div>
                <span style="background-color: #0079bf;">{{ task.markerName }}</span>
                <span style="background-color: #eb5a46;">{{ task.markerRole }}</span>
              </div>
              <div style="color: #363636; font-size:18px;">#{{ task.id }}</div>
            </div>

            <div class="card__name">{{ task.title }}</div>
            <div class="card__description">{{ task.description }}</div>

           <div class="card__cost">
              <div class="icon-edit" @click="taskEdit(task.id, task.title, task.description, task.markerName, task.markerRole, task.cost, task.currency, task.status, task.payd, task.key)">
                <i class="v-icon material-icons theme--light"> create </i>
              </div>

              <div>
                <span class="card__cost-number">{{ task.cost }}</span>
                <span class="card__cost-current">{{ task.currency }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="cards-list__add-card">+</div> -->
      </div>
    </div>


    <div class="ui-messageBox__wrapper" @click="cancelTaskEdit"  :class="{active: editing}">
      <div class="ui-messageBox fadeInDown" @click.stop>
        <div class="ui-messageBox__header">
          <!-- <span @click="changeStatus" class="messageBox-title proccess">#{{taskId}} {{ status === 'inProcces' ? 'В Процессе' : '' }} {{ status === 'checking' ? 'На проверке' : '' }} {{ status === 'done' ? 'Готово' : '' }}</span> -->
          <span class="task-id">#{{taskId}} </span>
          <select class="select-status"  v-model="status">
            <option value="inProcces">В Процессе</option>
            <option value="checking">На проверке</option>
            <option value="done">Готово</option>
          </select>
          <span class="button-close" @click="cancelTaskEdit"></span>
        </div>

        <div class="ui-messageBox__content">
          <div class="markers">
            <input style="background-color: #0079bf;" class="marker" type="text" v-model="markerName">
            <input style="background-color: #eb5a46;" class="marker" type="text" v-model="markerRole">
          </div>
          <div class="flex-row">
            <input class="title" type="text" v-model="titleEditing">
            <div>
              <input type="number"  v-model="cost">
              <span>{{ currency }}</span>
            </div>
          </div>
            
          <textarea class="description" type="text" v-model="descEditing"></textarea>  
          <label class="check" for="payd-checkbox">Оплачен: <input class="" :checked="payd" @change="paydChange"  id="payd-checkbox" type="checkbox"></label>
          <div class="comments">
            <label for="">
              Комментарии
            <textarea class="comments__textarea" type="text" v-model="commentBody"></textarea>
            <div class="button comments__button button-primary" @click="newComment">Отправить</div>
            </label>
            <div class="comments__comment-wrap" >
              <div class="comments__comment"  v-for="comment in comments" :key="comment.key">
                <!-- {{ keyTask }} -->
                <div v-if="keyTask === comment.keyTask">
                  <div class="comments__comment-name"><span>{{ comment.auth }}</span>  <span>{{ comment.fullDate }}</span></div>
                  <div class="comments__comment-text">{{ comment.commentBody }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ui-messageBox__footer">
          <div class="button button-primary button__done" @click="finishTaskEdit">Принять</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "active",
      editing: false,
      titleEditing: "",
      descEditing: "",
      taskId: null,
      markerName: "",
      markerRole: "",
      cost: "",
      currency: "",
      status: "",
      payd: "",

      keyTask: "",
      commentBody: "",
      auth: this.$store.state.user.userMail
    };
  },
  methods: {
    paydChange() {
      this.payd = !this.payd;
    },
    taskEdit(
      id,
      title,
      description,
      markerName,
      markerRole,
      cost,
      currency,
      status,
      payd,
      keyTask
    ) {
      this.editing = !this.editing;

      this.titleEditing = title;
      this.descEditing = description;
      this.taskId = id;
      this.markerName = markerName;
      this.markerRole = markerRole;
      this.cost = cost;
      this.currency = currency;
      this.status = status;
      this.payd = payd;
      this.keyTask = keyTask;
    },
    cancelTaskEdit() {
      this.editing = !this.editing;

      this.filter = "active";
      this.titleEditing = "";
      this.descEditing = "";
      this.taskId = null;
      this.markerName = "";
      this.markerRole = "";
      this.cost = "";
      this.currency = "";
      this.status = "";
      this.payd = "";

      this.keyTask = "";
      this.commentBody = "";
    },
    finishTaskEdit() {
      const task = {
        status: this.status,
        markerName: this.markerName,
        markerRole: this.markerRole,
        title: this.titleEditing,
        description: this.descEditing,
        cost: this.cost,
        currency: this.currency,
        payd: this.payd,
        id: this.taskId,
        keyTask: this.keyTask,
        payDate: 0
      };

      this.$store.dispatch("editTasks", task);

      this.editing = !this.editing;

      this.filter = "active";
      this.titleEditing = "";
      this.descEditing = "";
      this.taskId = null;
      this.markerName = "";
      this.markerRole = "";
      this.cost = "";
      this.currency = "";
      this.status = "";
      this.payd = "";

      this.keyTask = "";
      this.commentBody = "";
    },
    newComment() {
      if (this.keyTask === "" || this.commentBody === "" || this.auth === "") {
        return;
      }

      const comment = {
        keyTask: this.keyTask,
        commentBody: this.commentBody,
        auth: this.auth
      };

      this.$store.dispatch("newComment", comment);

      this.commentBody = "";
    }
  },
  computed: {
    tasksInProcces() {
      let tasksArray = [];
      for (let i = 0; i < this.$store.getters.tasks.length; i++) {
        if (this.$store.getters.tasks[i].status === "inProcces") {
          tasksArray.push(this.$store.getters.tasks[i]);
        }
      }
      return tasksArray;
    },
    tasksChecking() {
      let tasksArray = [];
      for (let i = 0; i < this.$store.getters.tasks.length; i++) {
        if (this.$store.getters.tasks[i].status === "checking") {
          tasksArray.push(this.$store.getters.tasks[i]);
        }
      }
      return tasksArray;
    },
    tasksDone() {
      let tasksArray = [];
      for (let i = 0; i < this.$store.getters.tasks.length; i++) {
        if (this.$store.getters.tasks[i].status === "done") {
          tasksArray.push(this.$store.getters.tasks[i]);
        }
      }
      return tasksArray;
    },
    comments() {
      return this.$store.getters.comments;
    },
    counterTaskInProcces() {
      let counter = 0;
      for (let i = 0; i < this.$store.getters.tasks.length; i++) {
        if (this.$store.getters.tasks[i].status === "inProcces") {
          counter++;
        }
      }
      return counter;
    },
    counterTaskChecking() {
      let counter = 0;
      for (let i = 0; i < this.$store.getters.tasks.length; i++) {
        if (this.$store.getters.tasks[i].status === "checking") {
          counter++;
        }
      }
      return counter;
    },
    counterTaskDone() {
      let counter = 0;
      for (let i = 0; i < this.$store.getters.tasks.length; i++) {
        if (this.$store.getters.tasks[i].status === "done") {
          counter++;
        }
      }
      return counter;
    }
  }
};
</script>

<style lang="scss" scoped>
.projects {
  overflow-x: auto;
}
.projects__inner {
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  min-width: 1096px;
  width: 100%;
  @media screen and (max-width: 560px) {
    min-width: 300vw;
  }
}
.cards-list {
  display: flex;
  flex-direction: column;
  max-width: 360px;
  @media screen and (max-width: 560px) {
    max-width: calc(100vw - 16px);
    min-width: calc(100vw - 16px);
  }
  width: 100%;
  border-radius: 3px;
  background-color: #f5f5f5;

  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
  padding: 8px;
  box-sizing: border-box;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}
.cards-list__name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
  color: #465445;
}
.cards-list__counter {
  font-size: 15px;
  font-weight: 100;
  margin-bottom: 5px;
  color: #465445;
}
.cards-list__add-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  margin: auto;
  border-radius: 50%;
  background-color: #2196f3;
  color: #fff;
  font-weight: 900;
  font-size: 25px;
  cursor: pointer;
}
.cards-list__inner {
  max-height: 70vh;
  overflow-y: auto;
  display: block;
  margin-left: -10px;
  margin-right: -10px;
  padding: 10px;
}
.card {
  background-color: #ffffff;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background: darken(#fafafa, 0.3%);
  }
  &:hover .icon-edit {
    opacity: 1 !important;
  }
}
.card__markers {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  & span {
    color: #fdfdfd;
    border-radius: 3px;
    font-size: 12px;
    padding: 3px 5px;
    margin-right: 3px;
    font-weight: 900;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }
}
.card__name {
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  margin-bottom: 5px;
}
.card__description {
  display: none;
}
.card__cost {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.card__cost-number {
  font-size: 20px;
  font-weight: 700;
}
.card__cost-current {
  font-size: 14px;
  font-weight: 100;
  margin-top: 2px;
}
//popup
.ui-messageBox {
  width: 60%;
  max-height: 95vh;
  overflow-y: auto;
  & input {
    border: none;
  }
}
.active {
  display: flex;
}
.button-light {
  margin-right: 8px;
}
.icon-edit {
  background-color: #fff;
  cursor: pointer;
  padding: 1px 3px;
  transition: all 0.15s linear;
  opacity: 0;
  @media screen and (max-width: 560px) {
    opacity: 1;
  }
}
.title {
  font-size: 22px !important;
  font-weight: 700;
  margin-bottom: 0 !important;
}
.description {
  font-size: 18px !important;
  font-weight: 400;
  margin-bottom: 0 !important;
}
.markers {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 0 0.777777777777778rem;
}
.marker {
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  border-radius: 3px;
  margin-right: 5px;
  user-select: none;
  text-align: center;
  width: 75px;
  &:last-child {
    margin-right: 0;
  }
}
.proccess {
  cursor: pointer;
}
@media screen and (max-width: 780px) {
  .ui-messageBox {
    width: 95%;
  }
}
.check {
  padding: 0 0.777777777777778rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  & input {
    margin: 0 0 0 5px !important;
  }
}
.comments {
  padding: 0 0.777777777777778rem;
  & label {
    margin: 0;
  }
}
.comments__textarea {
  border: 1px solid #808080;
  margin-top: 5px;
  margin-bottom: 0;
}
.comments__comment-wrap {
  max-height: 25vh;
  overflow-y: auto;
}
.comments__comment {
  margin-top: 10px;
  margin-bottom: 25px;
}
.comments__comment-name {
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  & span:last-child {
    font-size: 12px;
    margin-right: 5px;
    @media screen and (max-width: 560px) {
      display: block;
      width: 100%;
      text-align: right;
    }
  }
  & span:first-child {
    margin-left: 5px;
    @media screen and (max-width: 560px) {
      display: block;
      width: 100%;
    }
  }
}
.comments__comment-text {
  font-size: 14px;
  border-radius: 0.6em;
  border: 1px solid #808080;
  padding: 5px;
}
.comments__button {
  padding: 6px 8px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 14px;
  position: relative;
  left: 100%;
  transform: translateX(-100%);
}
.button {
  padding: 6px 8px !important;
  font-size: 18px;
  line-height: 18px;
}
.task-id {
  font-size: 18px;
  font-weight: 600;
}
.select-status {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0 6px;
  padding: 0;
  cursor: pointer;
  & option {
    font-weight: 600;
  }
  @media screen and (max-width: 560px) {
    font-size: 16px;
    & * {
      font-size: 16px;
    }
  }
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-end;
    & input {
      text-align: right;
      margin: 0;
      font-size: 19px;
      font-weight: 600;
      padding-right: 0;
    }
    & span {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
.button__done {
  margin-right: 12px;
}
.button {
  border-radius: 3px;
  cursor: pointer;
}
@media screen and (max-width: 560px) {
  .button {
    font-size: 14px;
  }
}
</style>
