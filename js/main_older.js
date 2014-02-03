(function() {

    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    // id is id of templat being fetched
    window.template = function(id) {
        return _.template($('#' + id).html());
    };

    /*
     *App.Models.Person = Backbone.Model.extend({});
     *App.Views.PersonView = Backbone.Model.extend({});
     *App.Collections.PeopleCollection = Backbone.Model.extend({});
     */

    //Person Model
    App.Models.Person = Backbone.Model.extend({
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
    App.Collections.People = Backbone.Collection.extend({
        model: App.Models.Person
    });

    App.Views.People = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            console.log("collection view init");
            console.log(this.collection);
        },

        render: function() {
            //filter through all items in a collection
            //for each, create a new PersonView
            //append to root element
            this.collection.each(function(person) {
                var personView = new App.Views.Person({
                    model: person
                });

                this.$el.append(personView.render().el);
            }, this);

            return this;
        }
    });

    //The Person View
    App.Views.Person = Backbone.View.extend({
        tagName: 'li',
        className: 'person',
        id: 'some-person',

        template: template('personTemplate'),

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
})();

var person = new App.Models.Person;
var personView = new App.Views.Person({
    model: person
});

var peopleCollection = new App.Collections.People([{
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

var peopleView = new App.Views.People({
    collection: peopleCollection
});

peopleCollection.add(person);

//bleh
var person2 = new App.Models.Person({
    name: 'Alexio',
    age: 22
});
var personView2 = new App.Views.Person({
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
