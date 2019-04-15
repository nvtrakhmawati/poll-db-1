class View {
    static show(value) {
        console.table(value);
    }

    static showError(value) {
        console.error(value);
    }
}

module.exports = View
