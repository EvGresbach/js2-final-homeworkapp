function Class(name){
    this.name = name;
    this.assignments = [];
    this.tests = [];

    //TODO: add/delete/finish assignments
    this.addAssignment = function(assignment){
        this.assignments.push(assignment);
    }
    this.deleteAssignment = function(assignment){
        this.assignments.splice(this.assignments.indexOf(assignment));
    }
    //TODO: //add/delete/finish tests

}

export default Class;