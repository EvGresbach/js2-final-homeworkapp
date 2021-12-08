function Task(name, description, time, dueDate){
    this.name = name || "";
    this.description = description || '';
    this.time = time || '';
    this.dueDate = dueDate || "";
    this.complete = false;
    this.deleted = false;
    this.remainingTime = this.time;

    this._id = null;
    this._path = null;

    this.formatDate = function(){
        //return date as month day year
        if(this.dueDate) {
            let date = this.dueDate.split('-');
            return date[1] + "/" + date[2] + "/" + date[0];
        } else return "No due date"
    }

    //change completion status
    this.toggleComplete = function(){
        this.complete = !this.complete;
        if(this.complete === true)
            this.remainingTime = 0;
        else{
            this.remainingTime = this.time;
        }
    }

    this.toggleDeleted = function(){
        this.deleted = !this.deleted;
    }

    this.toFirestore = function(){
        return{
            name: this.name,
            description: this.description,
            time: this.time,
            date: this.dueDate,
            complete: this.complete,
            deleted: this.deleted,
        }
    }
}

Task.fromFirestore = function(snapshot, options){
    const data = snapshot.data(options);
    const task = new Task(data.name, data.description, data.time, data.date);

    if(data.complete === true){
        task.complete = true;
        task.remainingTime = 0;
    }
    if(data.deleted === true) {
        task.deleted = true;
        task.remainingTime = 0
    }

    console.log(task);
    task._id = snapshot.id;
    task._path = snapshot.ref.path;
    return task;
}

export default Task;