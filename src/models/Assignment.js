import Task from "@/models/Task";

function Assignment(name, description, time, dueDate){
    Task.call(this, name, description, time, dueDate)
    //list of tasks
    this.tasks = [];

    this._id = null;
    this._path = null;

    this.addTask = function(task){
        this.tasks.push(task);
        this.updateTime()
    }
    this.deleteTask = function(task){
        this.tasks.splice(this.tasks.indexOf[task], 1);
        this.updateTime()
    }
    //Complete task
    this.toggleComplete = function(){
        this.complete = !this.complete;
    }

    //use to update assignment time
    this.updateTime = function(){
        this.time = 0
        for(var i = 0; i < this.tasks.length; i++){
            this.time += parseInt(this.tasks[i].time);
        }
    }

    //to firebase to save only certain fields
    this.toFirestore = function(){
        //call toFirestore for each task so it moves to firebase okay
        for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i] = this.tasks[i].toFirestore();
        }
        return{
            name: this.name,
            description: this.description,
            time: this.time,
            date: this.dueDate,
            complete: this.complete,
            tasks: this.tasks,
        }
    }
}
Assignment.prototype = Object.create(Task.prototype);
Assignment.prototype.constructor = Assignment;

//from firebase to turn back into an assignment
Assignment.fromFirestore = function(snapshot, options){
    const data = snapshot.data(options);
    const assignment = new Assignment(data.name, data.description, data.time, data.date);

    if(data.complete === true)
        assignment.complete = true;

    for (let i = 0; i < data.tasks.length; i++) {
        var simple = data.tasks[i];
        var task = new Task(simple.name, simple.description, simple.time, simple.date);
        console.log(task);
        if(simple.complete === true)
            task.complete = true;
        assignment.tasks.push(task);
    }
    console.log("Data: ", data.tasks);
    console.log("Assignment", assignment.tasks);
    assignment._id = snapshot.id;
    assignment._path = snapshot.ref.path;
    console.log(assignment);
    return assignment;
}

export default Assignment;