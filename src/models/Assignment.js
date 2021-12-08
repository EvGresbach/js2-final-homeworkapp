import Task from "@/models/Task";

function Assignment(name, description, time, dueDate){
    Task.call(this, name, description, time, dueDate)
    //base time so we can correctly add task time
    this.baseTime = 0;

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
        this.time = parseInt(this.baseTime);
        for(var i = 0; i < this.tasks.length; i++){
            if(this.tasks[i].time >= 0)
                this.time += parseInt(this.tasks[i].time);
        }
        this.updateRemainingTime();
    }
    this.updateTime = function(list){
        this.time = parseInt(this.baseTime);
        for(var i = 0; i < list.length; i++){
            if(list[i].time >= 0)
                this.time += parseInt(list[i].time);
        }
        this.updateRemainingTime(list);
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
    this.updateRemainingTime = function(list){
        var remaining = list.filter(t => !t.complete)
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
        this.updateTime();
        return{
            name: this.name,
            description: this.description,
            baseTime: this.baseTime,
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
    assignment.baseTime = data.baseTime;
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