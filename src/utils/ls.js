class Ls {
    static set(name,data) {
        window.sessionStorage.setItem(name,JSON.stringify(data))
    }
    static get(name) {
        const cache = window.sessionStorage.getItem(name)
        return cache ? JSON.parse(cache) : ""
    }
    static remove(name) {
        window.sessionStorage.removeItem(name)
    }
    static clear() {
        window.sessionStorage.clear()
    }
}

export {Ls}