function Stack(){
	this.head = null;
}

function Node(data, prev) {
	this.data = data;
	this.prev = prev;
}

Stack.prototype.push = function(data) {
	var newNode = new Node(data, this.head);
	this.head = newNode;
}

Stack.prototype.pop = function() {
	var result = this.head.data;
	this.head = this.head.prev;
	return result;
}

Stack.prototype.peek = function() {
	return this.head.data;
}

//-----------------------------------

var stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log("peek: " + stack.peek()); // 5

console.log("pop: " + stack.pop()); // 5
console.log("pop: " + stack.pop()); // 4
console.log("pop: " + stack.pop()); // 3

console.log("peek: " + stack.peek()); // 2
console.log("pop: " + stack.pop()); // 2
console.log("pop: " + stack.pop()); // 1
console.log("pop: " + stack.pop()); // exception