export default class Task {
    constructor(
        status,
        markerName,
        markerRole,
        title,
        description,
        cost,
        currency,
        payd,
        id,
        user = null,
        key = '',
        payDate = 0
    ) {
        this.status = status
        this.markerName = markerName
        this.markerRole = markerRole
        this.title = title
        this.description = description
        this.cost = cost
        this.currency = currency
        this.payd = payd
        this.id = id
        this.user = user
        this.key = key
        this.payDate = payDate
    }
}