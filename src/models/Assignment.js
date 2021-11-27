import Task from "@/models/Task";

function Assignment(task){
    //list of tasks
    task.tasks = [];
    task.addTask = function(task){
        this.tasks.push(task);
        updateTime()
    }
    task.deleteTask = function(task){
        this.tasks.splice(this.tasks.indexOf[task], 1);
        updateTime()
    }

    //Complete task
    task.toggleComplete = function(){
        this.complete = !this.complete;
    }

    //use to update assignment length
    let updateTime = function(){
        task.time = 0
        for(var i = 0; i < task.tasks.length; i++){
            task.time += task.tasks[i].time;
        }
    }
    //to firebase to save only certain fields
    task.toFirestore = function(){
        return{
            name: task.name,
            description: task.description,
            time: task.time,
            date: task.dueDate,
            complete: task.complete,
        }
    }
}

//from firebase to turn back into an assignment
Assignment.fromFirestore = function(snapshot, options){
    const data = snapshot.data(options);
    const assignment = new Assignment(new Task(data.name, data.description, data.time, data.dueDate));

    if(data.complete === true)
        assignment.complete = true;

    return assignment;
}

export default Assignment;