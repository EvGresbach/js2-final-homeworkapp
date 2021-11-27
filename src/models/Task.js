function Task(name, description, time, dueDate){
    this.name = name || "Assignment";
    this.description = description || '';
    this.time = time || 0;
    this.dueDate = dueDate || null;
    this.complete = false;

    //change completion status
    this.toggleComplete = function(){
        this.complete = !this.complete;
    }

    this.toFirestore = function(){
        return{
            name: this.name,
            description: this.description,
            time: this.time,
            date: this.dueDate,
            complete: this.complete,
        }
    }

}

export default Task;