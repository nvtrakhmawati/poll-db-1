class View{
    static showMessage(message){
        console.log(message)
    }

    static showError(err){
        console.log(err.message)
    }
}

module.exports = View