module.exports = function (app){
    app.route('/home')
    .get((req, res) => {
        console.log("Home:::::::");
        res.send("This is home button!");
    })
    .post((req, res) => {
        console.log("This is post method!");
        res.send("This is post method request!")
    })

    app.route('/about')
    .get((req, res) => {
        console.log("About ");
        res.send("This is about!")
    })
}