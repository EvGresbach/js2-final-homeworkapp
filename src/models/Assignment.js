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

    //use to update total assignment time
    this.updateTime = function(){
        this.time = parseInt(this.time);
        for(var i = 0; i < this.tasks.length; i++){
            this.time += parseInt(this.tasks[i].time);
        }
        this.updateRemainingTime();
    }

    //update time remaining
    this.updateRemainingTime = function(){
        var remaining = this.tasks.filter(t => !t.complete)
        console.log(remaining);
        this.remainingTime = 0;
        for(var i = 0; i < remaining.length; i++){
            this.remainingTime += parseInt(remaining[i].time);
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
            deleted: this.deleted,
            assignment: true,
        }
    }
}
Assignment.prototype = Object.create(Task.prototype);
Assignment.prototype.constructor = Assignment;

//from firebase to turn back into an assignment
Assignment.fromFirestore = function(snapshot, options){
    const data = snapshot.data(options);
    const assignment = new Assignment(data.name, data.description, data.time, data.date);

    if(data.complete === true){
        assignment.complete = true;
        assignment.remainingTime = 0;
    }
    if(data.deleted === true){
        assignment.deleted = true;
        assignment.remainingTime = 0;
    }

    assignment._id = snapshot.id;
    assignment._path = snapshot.ref.path;
    return assignment;
}

export default Assignment;