import { Request, Response } from 'express';
import cors from 'cors';
require('../database/mongoose');

const express = require('express');
const app = express();
const { List, Task } = require('../database/models');

app.use(express.json());
app.use(cors());

//Return all lists
app.get('/lists', (req: Request, res: Response) => {
    List.find({}).then((lists: any) => {
        res.send(lists);
    }).catch((e: any) => {
        res.send(e);
    });
})

//Create list
app.post('/lists', (req: Request, res: Response) => {
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc: any) => {
        res.send(listDoc);
    })
});

//Update list by ID
app.patch('/lists/:id', (req: Request, res: Response) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully' });
    });
});

//Delete list by ID
app.delete('/lists/:id', (req: Request, res: Response) => {
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc: any) => {
        res.send(removedListDoc);
        deleteTasksFromList(removedListDoc._id);
    })
});


//Return tasks in list
app.get('/lists/:listId/tasks', (req: Request, res: Response) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks: any) => {
        res.send(tasks);
    })
});

//Create a new task in a specific list
app.post('/lists/:listId/tasks', (req: Request, res: Response) => {
    List.findOne({
        _id: req.params.listId
    }).then((list: any) => {
        if (list) {
            return true;
        } else {
            return false;
        }
    }).then((canCreateTask: any) => {
        if (canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId,
                date: req.body.date
            });
            newTask.save().then((newTaskDoc: any) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})

//Update an existing task
app.patch('/lists/:listId/tasks/:taskId', (req: Request, res: Response) => {
    List.findOne({
        _id: req.params.listId,
    }).then((list: any) => {
        if (list) {
            return true;
        } else {
            return false;
        }
    }).then((canUpdateTasks: any) => {
        if (canUpdateTasks) {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

//Delete task
app.delete('/lists/:listId/tasks/:taskId', (req: Request, res: Response) => {

    List.findOne({
        _id: req.params.listId
    }).then((list: any) => {
        if (list) {
            return true;
        } else {
            return false;
        }
    }).then((canDeleteTasks: any) => {

        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc: any) => {
                res.send(removedTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
});

//Delete task from list method
let deleteTasksFromList = (_listId: any) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})