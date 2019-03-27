export default class Comment {
    constructor(
        keyTask,
        commentBody,
        auth,
        fullDate
    ) {
        this.keyTask = keyTask,
            this.commentBody = commentBody,
            this.auth = auth,
            this.fullDate = fullDate
    }
}