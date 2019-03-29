import firebase from 'firebase/app'
import PesonalArea from './_personal-area_help'
import _user from './user'

export default {
    state: {
        persona: []
    },
    mutations: {
        // newPersons(state, payload) {
        //     state.persona.push(payload)
        // },
        loadPersons(state, payload) {
            state.persona = payload
        },
        // editPersons(state, payload){

        // }
    },
    actions: {
        async newPersons({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const newPerson = new PesonalArea(
                    payload.name,
                    payload.mail,
                    payload.photo,
                    payload.key
                )

                await firebase.database().ref('users').push(newPerson)

                // commit('newPersons', {
                //     ...newPerson
                // })
                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
        async loadPersons({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const persona = await firebase.database().ref('users').once('value')
                const persons = persona.val()
                const personsArray = []

                Object.keys(persons).forEach(key => {
                    const p = persons[key]

                    personsArray.push(
                        new PesonalArea(
                            p.name,
                            p.mail,
                            p.photo,
                            p.key
                        )
                    )
                })

                commit('loadPersons', personsArray)

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
        async editPersons({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)


            let userKey = _user.getters.user

            try {
                const newPerson = new PesonalArea(
                    payload.name,
                    payload.mail,
                    payload.photo,
                    userKey,
                )

                await firebase.database().ref('users/').update({
                    ...newPerson
                })
                commit('editPersons', {
                    ...newPerson
                })

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        }
    },
    getters: {
        persona(state) {
            return state.persona
        }
    }
}