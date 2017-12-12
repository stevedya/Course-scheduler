(function(exports) {
    var app = exports.app || (exports.app = {}),

        CourseView = exports.Backbone.View.extend({
            tagName: 'div',

            // Cache the template function for a single item.
            // template: Handlebars.compile($('#course-view-template').html()),
            template: Handlebars.templates["course-view-template"],

            errorTemplate: Handlebars.templates["course-view-errors-template"],

            events: {
                'submit .course-form': 'addUpdateCourse',
                'click .btn.add-section': 'addSection',
                'click .btn.add-class': 'addClass',
                'click .btn.cancel-class': 'resetClassForm',
                'click .btn.close-course': 'removeView'
            },

            initialize: function(options) {
                this.options = options || {};
                this.newCourse = false; // track whether the course is existing or new

                // ensure there is always a model (Course) for the view
                if (!this.options.model) {
                    this.model = new app.models.Course({});
                    this.newCourse = true;
                }
                this.listenTo(this.model, 'change', this.render);
            },

            render: function() {
                this.$el.html(this.template(this.model.attributes));
                if(this.newCourse) {
                    this.$el.find('.times').addClass('hidden');
                }
                return this;
            },

            renderErrors: function() {
                this.$el.find('.errors').html(this.errorTemplate({ errors: this.model.validationError }));
            },

            removeView: function() {
                this.remove();
            },

            addSection: function(evt) {
                this.$el.find('.time-controls').removeClass('hidden');
                this.$el.find('.btn-add-course-time').addClass('hidden');
                evt.preventDefault();
            },

            resetClassForm: function() {
                this.$el.find('.time-controls').addClass('hidden');
                this.$el.find('.btn-add-course-time').removeClass('hidden');

                // return all class time fields to their default
                this.$el.find('#course-time-day')[0].options[0].selected = 'selected';
                this.$el.find('#course-time-start').val('');
                this.$el.find('#course-time-end').val('');
            },

            addClass: function () {
                // get the day, start, and end
                var day = this.$el.find('select#course-time-day').val(),
                    start = this.$el.find('input#course-time-start').val(),
                    end = this.$el.find('input#course-time-end').val();

                //check for validity here
                // TODO: basic validation, ensure that the start and end are correct format and that start is before end

                this.model.addClass({day: day, start: start, end: end});

                if (!this.model.isValid()) {
                    this.renderErrors();
                } else {
                    this.model.save(); //SYNC IT UP!
                }
            },

            addUpdateCourse: function(e) {
                // Gather data from form and update this.model

                this.model.set({
                    code: this.$el.find('input#course-code').val(),
                    name: this.$el.find('input#course-name').val(),
                    instructor: this.$el.find('input#course-instructor').val()
                }, { validate: true });

                // validate the model
                if (this.model.isValid()) {


                    if (this.newCourse) {
                        // add the model to the app.schedule
                        app.schedule.add(this.model);
                        this.newCourse = false;
                        this.render();
                        app.router.navigate('courses/' + this.model.id);

                    }
                    this.model.save(); //SYNC IT UP!
                } else {
                    this.renderErrors();
                }

                e.preventDefault();
            }
        });

    // export the Course model
    app.views || (app.views = {});
    app.views.CourseView = CourseView;

}(this));