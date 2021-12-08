function UserClass(name){
    this.name = name || '';
    this.assignments = [];
    this.tests = [];

    this._id = null;
    this._path = null;

    this.addAssignment = function(assignment){
        this.assignments.push(assignment);
    }
    this.deleteAssignment = function(assignment){
        this.assignments.splice(this.assignments.indexOf(assignment));
    }

    this.toFirestore = function(){
        return{
            name: this.name,
        }
    }

}


UserClass.collectionName = 'classes';

UserClass.fromFirestore = function(snapshot, options){
    const data = snapshot.data(options);
    const userClass = new UserClass(data.name);

    userClass._id = snapshot.id;
    userClass._path = snapshot.ref.path;


    return userClass;
}

export default UserClass;