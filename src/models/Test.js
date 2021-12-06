import Task from "@/models/Task";

function Test(name, description, time, dueDate){
    Task.call(this, name, description, time, dueDate)

    this._id = null;
    this._path = null;

    //to firebase to save only certain fields
    this.toFirestore = function(){
        return{
            name: this.name,
            description: this.description,
            time: this.time,
            date: this.dueDate,
            complete: this.complete,
            deleted: this.deleted,
            test: true,
        }
    }
}

Test.prototype = Object.create(Task.prototype);
Test.prototype.constructor = Test;

//from firebase to turn back into an assignment
Test.fromFirestore = function(snapshot, options){
    const data = snapshot.data(options);
    const test = new Test(data.name, data.description, data.time, data.date);

    if(data.complete === true)
        test.complete = true;
    if(data.deleted === true)
        test.deleted = true;

    test._id = snapshot.id;
    test._path = snapshot.ref.path;
    console.log(test);
    return test;
}

export default Test;