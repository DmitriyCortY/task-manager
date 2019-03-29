import firebase from 'firebase/app'
import Marker from './markers_help'

export default{
    state: {
        markers: [{
            name: 'test',
            color: 'red',
            prefix: '@'
        }],
        error: null
    },
    mutations: {
        loadMarkers(state, payload){
            state.markers = payload
        },
        newMarkers(state, payload){
            state.markers.push(payload)
        }
    },
    actions:{
        async loadMarkers({commit}, payload){
            commit('clearError')
            commit('setLoading', true)

            try{
                const marker = await firebase.database().ref('markers').once('value')

                const markers = marker.val()
                const markersArray = []

                Object.keys(markers).forEach(key => {
                    const m = markers[key]
                    markersArray.push(
                        new Marker(
                            m.name,
                            m.color,
                            m.prefix
                        )
                    )
                })

                commit('loadMarkers', markersArray)

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
        async newMarkers({commit}, payload){
            commit('clearError')
            commit('setLoading', true)

            try{
                const newMarker = new Marker(
                    payload.name,
                    payload.color,
                    payload.prefix
                )
                await firebase.database().ref('markers').push(newMarker)

                commit('newMarkers',{
                    ...newMarker
                })
                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        }
    },
    getters: {
        markers(state) {
            return state.markers
        }
    }
}