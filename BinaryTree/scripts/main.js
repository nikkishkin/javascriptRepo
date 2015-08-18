function Node(data) {
	this.left = null;
	this.right = null;
	this.data = data;
}

Node.prototype.addLeft = function(value) {
	this.left = new Node(value);
}

Node.prototype.addRight = function(value) {
	this.right = new Node(value);
}

function BinaryTree() {
	this.root = null;
}

BinaryTree.prototype.add = function(data) {
	for (var i = 0; i < arguments.length; i++) {
		this.doAdd(arguments[i]);
	}
	return this;
}

BinaryTree.prototype.doAdd = function(data) {
	if (this.root === null) {
		this.root = new Node(data);
		return;
	}
	
	var curNode = this.root;
	var isAdded = false;
	while (!isAdded) {
		if (data < curNode.data) {
			if (curNode.left === null) {
				curNode.left = new Node(data);
				isAdded = true;
			} else {
				curNode = curNode.left;
			}
		} else if (data > curNode.data) {
			if (curNode.right === null) {
				curNode.right = new Node(data);
				isAdded = true;
			} else {
				curNode = curNode.right;
			}
		} else {
			isAdded = true;
		}
	}
}

// get values from tree using in-order traversal
BinaryTree.prototype.getValues = function() {
	var result = [];
	this.doTraverse(this.root, result);
	return result;
}

// in-order traversal
BinaryTree.prototype.doTraverse = function(curNode, resultArray) {
	if (curNode !== null) {
		this.doTraverse(curNode.left, resultArray);
		resultArray.push(curNode.data);
		this.doTraverse(curNode.right, resultArray);
	}
}

//--------------------------------

var tree = new BinaryTree();
tree.add(13, 14, 1, 2, 5, 7, 25, 56, 3);
console.log(tree.getValues());

//13, 14 1 2 5 7 25 56 3