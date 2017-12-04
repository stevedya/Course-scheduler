(function (exports) {

    var app = exports.app || (exports.app = {});


    AppView = Backbone.View.extend({
        el: 'body',

        events: {
            'click a.add-course': 'renderCourseView'
        },

        initialize: function () {
            this.scheduleView = new app.views.ScheduleView({collection: app.schedule});
            this.$el.find('.schedule-display').html(this.scheduleView.render().el);
        },

        renderCourseView: function (evt) {

            if (this.courseView) {
                this.courseView.remove();
            }

            this.courseView = new app.views.CourseView();
            this.$el.find('.course-display').html(this.courseView.render().el);

            evt.preventDefault();
        },
        modifyCourseView: function (theCourse) {

            //remove previous course
            if (this.courseView) {
                this.courseView.remove();
            }

            this.courseView = new app.views.CourseView({
                model: theCourse
            });
            this.$el.find('.course-display').html(this.courseView.render().el);
        }
    });

    // export the AppView
    app.views || (app.views = {});
    app.views.AppView = AppView;

}(this));