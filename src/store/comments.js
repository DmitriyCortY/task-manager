import firebase from 'firebase/app'
import Comment from './comments_help'

export default {
    state: {
        comments: [],
        error: null
    },
    mutations: {
        newComment(state, payload) {
            state.comments.push(payload)
        },
        loadComments(state, payload) {
            state.comments = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async loadComments({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const comment = await firebase.database().ref('commetns').once('value')

                const comments = comment.val()
                const commentsArray = []
                Object.keys(comments).forEach(key => {
                    const c = comments[key]
                    commentsArray.push(
                        new Comment(
                            c.keyTask,
                            c.commentBody,
                            c.auth,
                            c.fullDate
                        )
                    )
                })

                commit('loadComments', commentsArray)

                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
        async newComment({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const date = new Date();
                const fullDate = date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes();
                const newComment = new Comment(
                    payload.keyTask,
                    payload.commentBody,
                    payload.auth,
                    fullDate
                );

                const comment = await firebase.database().ref('commetns').push(newComment)

                commit('newComment', {
                    ...newComment,
                    key: comment.key
                })
                commit('setLoading', false)
            } catch{
                commit('setLoading', false)
                commit('setError', payload)
            }
        },
    },
    getters: {
        comments(state) {
            return state.comments
        }
    }
}
