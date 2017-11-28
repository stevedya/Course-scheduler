(function(exports) {

    var app = exports.app || (exports.app = {}),

        ScheduleView = Backbone.View.extend({
            tagName: 'div',

            template: Handlebars.compile($('#schedule-view-template').html()),

            events: {
                'click .modify-course': 'viewCourse',

                // TODO: event listener to view/modify an existing course
                // TODO: [OPTIONAL] event(s) to filter the view
            },

            initialize: function(options) {
                this.options = options || {};

                if (!this.options.collection) {
                    this.collection = new app.collections.Schedule();
                }

                this.listenTo(this.collection.model, 'change', this.render);

            },

            render: function() {
                this.$el.html(this.template({ courses: this.collection.models }));
                return this;
            },

            viewCourse: function () {

            }
        });

    // export the ScheduleView model
    app.views || (app.views = {});
    app.views.ScheduleView = ScheduleView;

}(this));