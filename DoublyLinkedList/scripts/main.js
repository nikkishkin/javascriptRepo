//alert('Hello!');

function Node(data) {
	this.data = data;
	this.prev = null;
	this.next = null;
}

function List() {
	this._head = null;
	this._tail = null;
}

List.prototype.head = function() {
	return this._head.data;
}

List.prototype.tail = function() {
	return this._tail.data;
}

List.prototype.append = function(data) {
	var newNode = new Node(data);
	newNode.prev = this._tail;
	
	if (this._tail !== null) {
		this._tail.next = newNode;
	} else {
		this._head = newNode;
	}
	
	this._tail = newNode;
	return this;
}

List.prototype.nodeAt = function(index) {
	var curIndex = 0;
	var curNode = this._head;
	while(curNode !== null && curIndex !== index) {
		curIndex++;
		curNode = curNode.next;
	}
	return curNode;
}

List.prototype.at = function(index) {
	return this.nodeAt(index).data;
}

List.prototype.insertAt = function(data, index) {
	var nodeInList = this.nodeAt(index);
	var newNode = new Node(data);
	
	newNode.prev = nodeInList.prev;
	newNode.next = nodeInList;
	newNode.next.prev = newNode;
	if (index === 0) {
		this._head = newNode;
	} else {
		newNode.prev.next = newNode;
	}
	
	return this;
}

List.prototype.deleteAt = function(index) {
	if (index === 0) {
		if (this._tail === this._head) {
			this._tail = null;
			this._head = null;
			return this;
		}
		this._head = this._head.next;
		this._head.prev = null;
		return this;
	}
	
	var node = this.nodeAt(index);
	
	if (node === this._tail) {
		this._tail = this._tail.prev;
		this._tail.next = null;
		return this;
	}
	
	node.prev.next = node.next;
	node.next.prev = node.prev;
	return this;
}

List.prototype.reverse = function() {
	var from_head = this._head;
	var from_tail = this._tail;
	while (from_head.prev !== from_tail && from_head !== from_tail) {
		from_head.data = from_tail.data;
		from_head = from_head.next;
		from_tail = from_tail.prev;
	}
	return this;
}

List.prototype.each = function(func) {
	var curNode = this._head;
	while (curNode !== null) {
		func(curNode.data);
		curNode = curNode.next;
	}
	return this;
}

List.prototype.indexOf = function(data) {
	var curNode = this._head;
	while(curNode !== null && curNode.data !== data) {
		curNode = curNode.next;
	}
	if (curNode !== null) {
		return curNode.data;
	}
}

//--------------------------------------

function showList(list) {
	var str = "list: ";
	list.each(function(data){str += data + " "});
	alert(str);
}

var list = new List();
alert(list.append(1).append(2).append(3).deleteAt(2).reverse().at(0));
list.append(7).append(7);
showList(list);

//--------------------------------------

// List.prototype.insertAt = function(data, index) {
	// var nodeInList = this.nodeAt(index);
	// if (nodeInList == null) {
		// this.append(data);
	// } else {
		// var newNode = new Node(data);
		// newNode.prev = nodeInList.prev;
		// newNode.next = nodeInList;
		// newNode.prev.next = newNode;
		// newNode.next.prev = newNode;
		// if (index === 0) {
			// this._head = newNode;
		// }
	// }
// }