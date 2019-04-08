import firebase from 'firebase/app'
import PesonalArea from './_personal-area_help'
// import _user from './user'

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
        editPersons(state, payload) {
            for (let i = 0; i < state.persona.length; i++) {
                if (state.persona[i].key == payload.key) {
                    state.persona[i].name = payload.name
                    state.persona[i].photo = payload.photo
                }
            }
        }
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

                await firebase.database().ref('users/' + payload.key).push(newPerson)

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


            // let userKey = _user.getters.user.id

            try {
                const newPerson = new PesonalArea(
                    payload.name,
                    payload.mail,
                    payload.photo,
                    payload.key,
                )

                // let timestamp = Number(new Date())
                // let storageRef = firebase.storage().ref(timestamp.toString())
                // storageRef.put(payload.photo);


                await firebase.database().ref('users/' + payload.key).update({
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