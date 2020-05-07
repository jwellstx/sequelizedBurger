var db = require("../models");

module.exports = function (app) {
    app.get("/", (req, res) => {
        db.Burger.findAll({ 
            include: db.Customer,
            order: [['burger_name', 'ASC']]
        }).then(rows => {
            // https://github.com/handlebars-lang/handlebars.js/issues/1642
            // convert each entry to json, handlesbar has below issue
            // Handlebars: Access has been denied to resolve the property "burger_name" because it is not an "own property" of its parent.
            // You can add a runtime option to disable the check or this warning:
            // See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details
            res.render("index", { burgers: rows.map(burger => burger.toJSON()) });
        });
    });

    app.post("/:id", (req, res) => {
        db.Customer.create({
                customer_name: req.body.customer_name,
                BurgerId: req.params.id
        }).then((rows) => {
            db.Burger.update({
                devoured: true
            }, {
                where: {
                    id: req.params.id
                }
            }).then(() => { res.redirect("/"); });
        });
    });

    app.post("/", (req, res) => {
        db.Burger.create({
            burger_name: req.body.burger_name,
        }).then(() => { res.redirect("/"); });
    });
}