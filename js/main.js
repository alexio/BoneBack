//Person Model
var Person = Backbone.Model.extend({
    defaults: {
        name: 'John Doe',
        age: 30,
        occupation: 'worker'
    }
    /*,

  validate: function(attrs) {
    console.log(attrs);

    if(attrs.age < 0 ){
      console.log("negative age");
      return 'Age must be positive';
    }

    if( ! attrs.name ){
      return 'Every person must have a name';
    }
  },

  work: function(){
    return this.get('name') + ' is working';
  }*/
});

//A list of people
var PeopleCollection = Backbone.Collection.extend({
    model: Person
});

var PeopleView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
        console.log("collection view init");
        console.log(this.collection);
    },

    render: function() {
        //filter through all items in a collection
        //for each, create a new PersonView
        //append to root element
        this.collection.each(function(person){
          var personView = new PersonView({model:person});

          this.$el.append(personView.render().el);
        }, this);

        return this;
    }
});

//The Person View
var PersonView = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    id: 'some-person',

    template: _.template($('#personTemplate').html()),

    /*initialize: function() {
        //console.log("View init");
        //console.log(this.model);
        this.render();
    },*/

    render: function() {
        //this.$el.html(this.model.get('name') + ' ('+ this.model.get('age') + ') - ' + this.model.get('occupation'));
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var person = new Person;
var personView = new PersonView({
    model: person
});

var peopleCollection = new PeopleCollection([{
    name: 'Alexio',
    age: 27
}, {
    name: 'John Doe',
    age: 10,
    occupation: 'bamf'
}, {
    name: 'Sally Doe',
    age: 22,
    occupation: 'bamf'
}]);

var peopleView = new PeopleView({
    collection: peopleCollection
});

peopleCollection.add(person);

//bleh
var person2 = new Person({
    name: 'Alexio',
    age: 22
});
var personView2 = new PersonView({
    model: person2
});

peopleCollection.add(person2);

$(document.body).append(peopleView.render().el);

/*
var Quiz = function(title) {
  this.title = title;
};

//classical way
var Person = function(config) {
  this.name = config.name;
  this.age = config.age;
  this.occupation = config.occupation;
};

Person.prototype.work = function(){
  return this.name + ' is working';
};
*/
