const router = require('express').Router();
const comp = require('../models/comp');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, "secret");
    var userRole = decoded.role

    if (userRole == "Admin") {
        res.status(400).send("Unauthorized!");
    }

    else {

        const newComp = new comp({
            descreption: req.body.descreption,
            status: req.body.status,
            compType: req.body.compType,
            createrId: req.body.createrId
        });

        newComp.save()
            .then(item => {
                res.json("item saved to database");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    }
})

router.get('/', async (req, res) => {

    const token = req.header('auth-token');
    const decoded = jwt.verify(token, "secret");
    var userRole = decoded.role

    if (userRole == "Customer") {
        res.status(400).send("Unauthorized!");
    }
    else {

        var x = await comp.find();
        console.log("Data : ", x);
        res.json({
            error: null,
            data: x
        })
    }
})


router.get('/:id', async (req, res) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, "secret");
    var userRole = decoded.role

    if (userRole == "Admin") {
        res.status(400).send("Unauthorized!");
    }
    else {


        let newArr = [];
        let allComp = await comp.find();
        allComp.forEach(comp => {
            if (comp.createrId) {
                if (comp.createrId == req.params.id)
                    newArr.push(comp);
            }
        })

        res.json({
            data: newArr
        })
    }
})


router.put('/', async (req, res) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, "secret");
    var userRole = decoded.role

    if (userRole == "Customer") {
        res.status(400).send("Unauthorized!");
    }
    else {
        let idVale = { '_id': req.body.compId };
        let newStatus = { 'status': req.body.status };

        await comp.findByIdAndUpdate(idVale, newStatus);

        res.json("updated");
    }
})

router.delete('/:id', async (req, res) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, "secret");
    var userRole = decoded.role

    if (userRole == "Admin") {
        res.status(400).send("Unauthorized!");
    }
    else {
        await comp.deleteOne({ '_id': req.params.id })

        res.json("DELETED");
    }
})

module.exports = router
