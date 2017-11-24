(function(exports) {

    var app = exports.app || (exports.app = {}),

        ScheduleView = Backbone.View.extend({
            tagName: 'div',

            template: Handlebars.compile($('#schedule-view-template').html()),

            errorTemplate: Handlebars.compile($('#course-view-errors-template').html()),

            initialize: function(options) {
                this.options = options || {};

                if (!this.options.model) {
                    this.model = new app.models.Schedule();
                }

                // TODO: the view should listen to the Collection! for changes and render (hint: the model is - view.collections.models.classes)
                //$('').html( view.render().el );
            },

            render: function() {
                this.$el.html(this.template({ courses: this.collection.models }));
                return this;
            },

            events: {
                //TODO: Event to view or modify existing course
                // [optional]: Events for filtering
                // [optional]: remove course from schedule

            }

        });

    // export the CourseView model
    app.views || (app.views = {});
    app.views.Schedule = ScheduleView;

}(this));