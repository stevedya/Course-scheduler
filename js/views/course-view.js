(function(exports) {

    var app = exports.app || (exports.app = {}),

        CourseView = Backbone.View.extend({
            tagName: 'div',

            template: Handlebars.compile($('#course-view-template').html()),

            errorTemplate: Handlebars.compile($('#course-view-errors-template').html()),

            events: {
                'submit .course-form': 'addUpdateCourse',
                'click .btn.add-section': 'addSection',
                'click .btn.add-time': 'addClassTime',
                'click .btn.cancel-time': 'resetTimeForm',
                'click button.cancel': 'doneAdding'

                // BONUS: add event for removing an added class time
            },

            initialize: function(options) {
                this.options = options || {};

                if (!this.options.model) {
                    this.model = new app.models.Course();
                }

                // TODO: the view should listen to the model for changes and render (hint: the model is - view.model.attributes.classes)
                //$('').html( view.render().el );
            },

            render: function() {
                this.$el.html(this.template(this.model.attributes));
                return this;
            },

            renderErrors: function() {
                this.$el.find('.errors').html(this.errorTemplate({ errors: this.model.validationError }));
            },

            doneAdding: function () {
                this.remove();
                //Use a spy to check if the function is called
            },

            addUpdateCourse: function(evt) {
                // gather data from the form
                this.model.set({
                    code: this.$el.find('input#course-code').val(),
                    name: this.$el.find('input#course-name').val(),
                    instructor: this.$el.find('input#course-instructor').val()
                }, { validate: true });

                // validate the model
                if (this.model.isValid()) {
                    // UPGRADE: is this a new course or an existing one?
                    app.schedule.add(this.model);

                    // UPGRADE: reset the form fields
                } else {
                    // invalid course, show the error messages
                    this.renderErrors();
                }

                evt.preventDefault();
            },

            addSection: function() {
                // TODO: complete the function as per the provided test in test.course-view.js 119
            },

            addClassTime: function() {
                // get the day, start, and end
                var day = this.$el.find('select#course-time-day').val(),
                    start = this.$el.find('input#course-time-start').val(),
                    end = this.$el.find('input#course-time-end').val();

                // UPGRADE: complete basic validation in course.js, ensure that the day is valid, the start
                // and end are correct format (you decide),and that start is before end
                this.model.addClass({ day: day, start: start, end: end });

                if (!this.model.isValid()) {
                    this.renderErrors();
                }
                //TODO: (steve note) hide the form
            },

            resetTimeForm: function() {
                // TODO: complete as per your created test in test.course-view.js line 130
            }

        });

    // export the CourseView model
    app.views || (app.views = {});
    app.views.CourseView = CourseView;

}(this));