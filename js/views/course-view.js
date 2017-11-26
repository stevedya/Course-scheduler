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
                'click button.cancel': 'cancelAdd'

                // BONUS: add event for removing an added class time
            },

            initialize: function(options) {
                this.options = options || {};

                if (!this.options.model) {
                    this.model = new app.models.Course();
                }

                // TODO: the view should listen to the model for changes and render
                this.listenTo(this.model, 'change', this.render);

            },

            render: function() {
                this.$el.html(this.template(this.model.attributes));
                return this;
            },

            renderErrors: function() {
                this.$el.find('.errors').html(this.errorTemplate({ errors: this.model.validationError }));
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

            /**
             * Removes the view from the DOM
             */
            cancelAdd: function () {
                this.remove();
            },

            addSection: function() {
                this.model.addClass({
                        day: this.$el.find('select#course-time-day').val(),
                        start: this.$el.find('input#course-time-start').val(),
                        end: this.$el.find('input#course-time-end').val(),
                    });
                this.$el.find('.btn-add-course-time').addClass('hidden');
                this.$el.find('.time-controls').removeClass('hidden');
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
                    // display any errors from validation
                    this.renderErrors();
                }
                this.$el.find('.time-controls').addClass('hidden');
                this.$el.find('.btn.add-section').removeClass('hidden');

            },

            resetTimeForm: function() {
                //Set the values of the fields to empty
                this.$el.find('select#course-time-day').val('monday'); //monday is the default for the select
                this.$el.find('input#course-time-start').val('');
                this.$el.find('input#course-time-end').val('');
                //hide the time controls and bring the add section button back
                this.$el.find('.btn.add-section').removeClass('hidden');
                this.$el.find('.time-controls').addClass('hidden');
                // TODO: complete as per your created test in test.course-view.js line 130
            }

        });

    // export the CourseView model
    app.views || (app.views = {});
    app.views.CourseView = CourseView;

}(this));