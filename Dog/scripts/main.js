function Dog(name){
	this.name = name;
}

Dog.prototype.voice = function(){
	console.log(this.name);
}

Dog.prototype.push = function(){
	var name = this.name;
	setTimeout(this.voice.bind(this), 2000);
 }

var dog = new Dog("Rex");
dog.voice();
dog.push();