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

    App.Models.Task = Backbone.Model.extend({
        validate: function(attrs) {
            if (!$.trim(attrs.title)) {
                return 'A task requires a valid title';
            }
        }
    });

    App.Collections.Tasks = Backbone.Collection.extend({
        model: App.Models.Task
    });

    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',

        initialize: function(){
          this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(task) {
            //creating a new child view
            var taskView = new App.Views.Task({
                model: task
            });

            this.$el.append(taskView.render().el);
        }
    });

    App.Views.Task = Backbone.View.extend({
        tagName: 'li',

        template: template('taskTemplate'),

        initialize: function() {
            //alternarive to passing this as context
            //_.bindAll(this, 'editTask', 'render');
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        events: {
            'click .edit': 'editTask',
            'click .delete': 'deleteTask'
        },

        editTask: function() {
            var newTaskTitle = prompt('What would you like to change the text to ?',
                this.model.get('title'));

            if (!newTaskTitle) return;

            this.model.set('title', newTaskTitle, {
                validate: true
            });

            console.log("You are editing the task");
        },


        deleteTask: function() {
            this.model.destroy();
        },

        //pnly remove element from the page when it has been removed from db?
        //delete and remove seperate because ajax calls errors may occur
        remove: function() {
            this.$el.remove();
        },

        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });

    App.Views.AddTask = Backbone.View.extend({
        el: '#addTask',

        events: {
            'submit': 'submit'
        },

        initialize: function() {
            //console.log(this.el.innerHTML);
        },

        submit: function(e) {
            e.preventDefault();

            var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

            var task = new App.Models.Task({
                title: newTaskTitle
            });

            this.collection.add(task);
        }
    });

    var tasks = new App.Collections.Tasks([{
        title: ' Go to the store',
        priority: 3
    }, {
        title: ' Go to the movie',
        priority: 5
    }, {
        title: ' Go to the shower',
        priority: 1
    }]);

    var addTaskView = new App.Views.AddTask({
        collection: tasks
    });

    var tasksView = new App.Views.Tasks({
        collection: tasks
    });

    $('.tasks').html(tasksView.render().el);
})();
