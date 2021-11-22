
function Assignment(name, description, time, dueDate){
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.time = time;
    this.complete = false;

    //list of tasks
    this.tasks = [];
    this.addTask = function(task){
        this.tasks.push(task);
    }
    this.deleteTask = function(task){
        this.tasks.splice(this.tasks.indexOf[task], 1);
    }

    //Complete task
    this.toggleComplete = function(){
        this.complete = !this.complete;
    }

    //to firebase to save only certain fields

}

//from firebase to turn back into an assignment

export default Assignment;