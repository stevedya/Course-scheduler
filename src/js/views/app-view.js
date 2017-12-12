(function(exports) {

    var app = exports.app || (exports.app = {});


    AppView = Backbone.View.extend({
        el: 'body',

        events: {
        	'click a.add-course': 'renderCourseView'
        },

        initialize: function() {
        	this.scheduleView = new app.views.ScheduleView({ collection: app.schedule });
        	this.$el.find('.schedule-display').html(this.scheduleView.render().el);
        },

        /**
         * Renders a course view to the DOM
         * @param {Object} evt - the event object triggered for the event
         * @param {app.models.Course} course - an optional course for the view
         */
        renderCourseView: function (evt, course) {

        	if (this.courseView) {
        		this.courseView.remove();
        	}

            if (course) {
                this.courseView = new app.views.CourseView({model: course});
            } else {
                this.courseView = new app.views.CourseView();    
            }
        	
        	this.$el.find('.course-display').html(this.courseView.render().el);

        	evt.preventDefault();
        }
    });

    // export the AppView
    app.views || (app.views = {});
    app.views.AppView = AppView;

}(this));