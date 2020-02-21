const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db/mongoose');

// Importing models
const List = require('./db/model/list.model');
const Task = require('./db/model/task.model');
// const {
//     List,
//     Task
// } = require('./db/model');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Cors HEADER MODULE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/*  ROUTE HANDLERS  */
/* LIST ROUTES */

/**
 * Path: GET/ lists
 * Purpose: Get all lists
 */
app.get('/lists', (req, res, next) => {
    // We want to return an array of all list in the database

    List.find()
        .then((listDoc) => {
            res.send(listDoc);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send(e);
        });
});

/**
 * Path: POST/ lists
 * Purpose: create a list
 */
app.post('/lists', (req, res) => {
    // We want to create new list and return the new list document back to user(which includes th id)

    const title = req.body.title;
    const list = new List({
        title: title
    });
    list.save()
        .then((listDoc) => {
            res.send(listDoc);
        }).catch(e => {
            console.log(e);
            res.status(500).send(e);
        });
});

/**
 * Path: PATCH/ lists:id
 * Purpose: Update a list
 */
app.patch('/lists/:id', (req, res) => {
    // WE want to update a specified list(list document with id in the URL ) with the new values specified in the JSON of the request
    // The list information (feilds) will pass via JSON request body

    List.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        })
        .then((list) => {
            console.log('List title updated');
            res.send(list);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send(e);
        });
});

/**
 * Path: DELETE/ lists:id
 * Purpose: Delete list
 */
app.delete('/lists/:id', (req, res) => {
    // WE want to delete a specified list(list document with id in the URL )
    // The list information (feilds) will pass via JSON request body

    List.findByIdAndDelete(
            req.params.id
        )
        .then(() => {
            res.send("list deleted");
        }).catch((e) => {
            console.log(e);
            res.status(500).send(e);
        });
});

/**
 * Path: GET/lists/:listid/task
 * Commend: show task in a specific list
 */
app.get('/lists/:listid/task', (req, res) => {
    Task.find({
            _listId: req.params.listid
        })
        .then(task => {
            res.send(task);
        }).catch(e => {
            console.log(e);
            res.status(500).send('Error occured');
        });
});

/**
 * Path: POST/lists/:listid/task/:taskid
 * Commend: update a task in a specific list with task id
 */
app.get('/lists/:listid/task/:taskid', (req, res) => {
    Task.find({
            _id: req.params.taskid
        })
        .then(task => {
            res.send(task);
        }).catch(e => {
            console.log(e);
            res.status(500).send('Error occured');
        });
});

/**
 * Path: POST/lists/:listid/task
 * Commend: Create a task in a specific list
 */
app.post('/lists/:listid/task', (req, res) => {
    var title = req.body.title;
    var task = new Task({
        _listId: req.params.listid,
        title: title
    });
    task.save()
        .then(task => {
            if (!task) {
                console.log('No Task Matches');
                res.send("NO task Matches with this id");
            } else {
                console.log(task);
                res.send(task);
            }

        }).catch(e => {
            console.log(e);
            res.status(500).send(e);
        });
});

/**
 * Path: POST/lists/:listid/task/:taskid
 * Commend: update a task in a specific list with task id
 */
app.patch('/lists/:listid/task/:taskid', (req, res) => {
    Task.findByIdAndUpdate(req.params.taskid, {
        $set: req.body
    }).then(uTask => {
        if (!uTask) {
            console.log('No Task Matches');
            res.send("NO task Matches with this id");
        } else {
            console.log(uTask);
            res.send('Task updated');
        }
    }).catch(e => {
        console.log(e);
        res.status(500).send(e);
    });
});

/**
 * Path: POST/lists/:listid/task/:taskid
 * Commend: Delete a task in a specific list with task id
 */
app.delete('/lists/:listid/task/:taskid', (req, res) => {
    var taskId = req.params.taskid;
    Task.findByIdAndDelete(taskId)
        .then((dTask) => {
            if (!dTask) {
                console.log("No task found");
                res.send('No task found with this id ');
            } else {
                console.log(dTask);
                res.send('Task deleted ' + dTask);
            }
        }).catch(e => {
            console.log(e);
            res.status(500).send(e);
        });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));