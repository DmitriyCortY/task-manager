import firebase from 'firebase/app'
import User from './user_help'

import store from './store.js'

export default {
    state: {
        user: null,
        userMail: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setUserMail(state, payload) {
            state.userMail = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async registerUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                const UserId = new User(user.user.uid)
                commit('setUser', UserId)
                commit('setUserMail', email)
                store.dispatch('newPersons', {
                    name: '',
                    mail: email,
                    photo: '',
                    key: UserId.id
                })


                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.user.uid))
                commit('setUserMail', email)

                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        loggedUser({ commit }, payload) {
            commit('setUser', new User(payload.uid))
            commit('setUserMail', payload.email)

        },
        logoutUser({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        checkUser(state) {
            return state.user !== null
        }
    }
}