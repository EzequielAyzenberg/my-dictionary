String.prototype.capitalize = function () {
    if (this[0])
        return this[0].toUpperCase() + this.substr(1)
    else
        return this
}

export default class Definition {

    constructor(name, description="", subDefinitions=[]) {
        this.name = name
        this.description = description
        this.subDefinitions = subDefinitions
    }

    update(line) {
        const parts = line.split("-")
        if (parts.length > 1) {
            this.name = parts[0].trimEnd().capitalize()
            this.description = parts[1].trim()
        } else {
            this.name = line.capitalize()
        }
        return this
    }

    toLine() {
        return `${this.name} - ${this.description}`
    }

    static of (line) {
        return new Definition("").update(line)
    }
}