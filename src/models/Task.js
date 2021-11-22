function Task(name, description, time, dueDate){
    this.name = name || "Assignment";
    this.description = description || '';
    this.time = time;
    this.date = dueDate;
    this.complete = false;

    //change completion status
    this.toggleComplete = function(){
        this.complete = !this.complete;
    }

}

export default Task;