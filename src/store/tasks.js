import firebase from 'firebase/app'
import Task from './task_help'

export default {
    state: {
        tasks: [],
        error: null
    },
    mutations: {
        newTask(state, payload) {
            state.tasks.push(payload)
        },
        loadTasks(state, payload) {
            state.tasks = payload
        },
        editTasks(state, payload) {

            Object.keys(payload).forEach(key => {

                state.tasks[payload.id - 1][key] = payload[key]
            })
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async loadTasks({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const task = await firebase.database().ref('tasks').once('value')

                const tasks = task.val()
                const tasksArray = []
                Object.keys(tasks).forEach(key => {
                    const t = tasks[key]
                    tasksArray.push(
                        new Task(
                            t.status,
                            t.markerArray,
                            t.title,
                            t.description,
                            t.cost,
                            t.currency,
                            t.payd,
                            t.id,
                            t.user,
                            key,
                            t.payDate
                        )
                    )
                })

                commit('loadTasks', tasksArray)

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
        async newTask({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)


            try {
                const newTask = new Task(
                    payload.status,
                    payload.markerArray,
                    payload.title,
                    payload.description,
                    payload.cost,
                    payload.currency,
                    payload.payd,
                    payload.id,
                    getters.user.id
                )

                const task = await firebase.database().ref('tasks').push(newTask)


                await firebase.database().ref('tasks/' + task.key).update({
                    key: task.key
                })

                commit('newTask', {
                    ...newTask,
                    // key: task.key
                })

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
        async editTasks({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                if (payload.payd === true && payload.payDate === 0) {
                    payload.payDate = Date.now()
                } else {
                    payload.payDate = 0
                }
                const newTask = new Task(
                    payload.status,
                    payload.markerArray,
                    payload.title,
                    payload.description,
                    payload.cost,
                    payload.currency,
                    payload.payd,
                    payload.id,
                    getters.user.id,
                    payload.keyTask,
                    payload.payDate
                )


                await firebase.database().ref('tasks/' + payload.keyTask).update({
                    ...newTask
                })
                commit('editTasks', {
                    ...newTask
                })

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        }
    },
    getters: {
        tasks(state, getters) {
            //all login
            // return state.tasks

            //sign user
            return state.tasks.filter(task => {
                return task.user === getters.user.id
            })
        }
    }
}