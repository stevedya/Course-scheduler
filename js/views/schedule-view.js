(function (exports) {

    var app = exports.app || (exports.app = {}),

        ScheduleView = Backbone.View.extend({
            tagName: 'div',

            template: Handlebars.compile($('#schedule-view-template').html()),

            events: {
                'click .modify-course': 'viewCourse',
                // TODO: [OPTIONAL] event(s) to filter the view
            },

            initialize: function (options) {
                this.options = options || {};

                if (!this.options.collection) {
                    this.collection = new app.collections.Schedule();
                }
                this.listenTo(this.collection, 'add', this.render);
                this.listenTo(this.collection, 'change', this.render);

            },

            render: function () {
                this.$el.html(this.template({courses: this.collection.models}));
                return this;
            },

            viewCourse: function (e) {
                //Get the id of the button
                var cid = $(e.target).data('id'),
                    //Get the model that matches the id
                    theCourse = this.collection.get(cid);
                console.log(cid);
                //pass the model to the app view and do the value update
                app.appView.modifyCourseView(theCourse);
            }
        });

    // export the ScheduleView model
    app.views || (app.views = {});
    app.views.ScheduleView = ScheduleView;

}(this));