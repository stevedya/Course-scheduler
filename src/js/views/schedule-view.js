(function(exports) {

    var app = exports.app || (exports.app = {}),

        ScheduleView = Backbone.View.extend({
            tagName: 'div',

            template: Handlebars.templates['schedule-view-template'],

            events: {
                'click .edit': 'modifyCourse'
                // TODO: [OPTIONAL] event(s) to filter the view
            },

            initialize: function(options) {
                this.options = options || {};

                if (!this.options.collection) {
                    this.collection = new app.collections.Schedule();
                }

                this.listenTo(this.collection, 'change', this.render);
                this.listenTo(this.collection, 'add', this.render);
            },

            render: function() {
                this.$el.html(this.template({ courses: this.collection.models }));
                return this;
            },

            modifyCourse: function(evt) {
                app.appView.renderCourseView(evt, this.collection.get(evt.currentTarget.dataset['id']));
                app.router.navigate('courses/' + evt.currentTarget.dataset['id'], {trigger: true});
            }
        });

    // export the ScheduleView model
    app.views || (app.views = {});
    app.views.ScheduleView = ScheduleView;

}(this));