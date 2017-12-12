describe('CourseView', function() {
    var view = null;

    beforeEach(function() {
        view = new app.views.CourseView();
        view.render();
    });

    afterEach(function() {
        // properly remove listeners of view to prevent memory leak (i.e. attached event listeners)
        view.undelegateEvents();

        // clear markup for render
        $('.course-display').html('');
    });

    describe('renders a view', function() {
        describe('without a course', function() {
            it('contains input#course-code', function() {
                expect(view.$el.find('input#course-code')).toExist();
            });

            it('contains input#course-name', function() {
                expect(view.$el.find('input#course-name')).toExist();
            });

            it('contains input#course-instructor', function() {
                expect(view.$el.find('input#course-instructor')).toExist();
            });
        });

        describe('with a course', function() {
            // for these tests, we need the model to have valid data
            beforeEach(function() {
                view.model.attributes = {
                    code: 'COMP1000',
                    name: 'Computing 1',
                    instructor: 'Jane Doe',
                    classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }, { day: 'Friday', start: '10:00AM', end: '12:00PM' }]
                }
                view.render();
            });

            it('renders the expected course code', function() {
                expect(view.$el.find('input#course-code')).toHaveValue('COMP1000');
            });

            it('renders the expected course name', function() {
                expect(view.$el.find('input#course-name')).toHaveValue('Computing 1');
            });

            it('renders the expected course instructor', function() {
                expect(view.$el.find('input#course-instructor')).toHaveValue('Jane Doe');
            });

            it('renders the expected course class times', function() {
                // check names
                expect(view.$el.find('.class-time-table .day').length).toEqual(2);
                expect(view.$el.find('.class-time-table .day').eq(0)).toHaveText('Wednesday');
                expect(view.$el.find('.class-time-table .day').eq(1)).toHaveText('Friday');

                // check start
                expect(view.$el.find('.class-time-table .start').length).toEqual(2);
                expect(view.$el.find('.class-time-table .start').eq(0)).toHaveText('1:00PM');
                expect(view.$el.find('.class-time-table .start').eq(1)).toHaveText('10:00AM');

                // check end
                expect(view.$el.find('.class-time-table .end').length).toEqual(2);
                expect(view.$el.find('.class-time-table .end').eq(0)).toHaveText('3:00PM');
                expect(view.$el.find('.class-time-table .end').eq(1)).toHaveText('12:00PM');
            });

            it('renders when the model is modified', function() {
                view.model.set('name', 'Computing 101');
                expect(view.$el.find('input#course-name')).toHaveValue('Computing 101');
            });
        });
    });

    describe('supports interactive events', function() {
        var submitSpy;

        submitSpy = jasmine.createSpy('submitSpy');

        it('listens for the required events', function() {
            var expectedEvents = {
                'submit .course-form': 'addUpdateCourse',
                'click .btn.add-section': 'addSection',
                'click .btn.add-class': 'addClass',
                'click .btn.cancel-class': 'resetClassForm',
                'click .btn.close-course': 'removeView'
            };

            expect(view.events).toEqual(expectedEvents);
        });

        describe('rejects invalid courses', function() {
            it('rejects adding an invalid course when .course-form is submitted and displays error message(s)', function() {
                // need to determine if the course was added to the application scope schedule object, temporarily stub the object if present
                var temp = app.schedule || {},
                    errorSpy = jasmine.createSpy('errorSpy');
                app.schedule = {};

                // spy on the add function
                app.schedule.add = submitSpy;

                // spy on the renderErrors function
                view.renderErrors = errorSpy;

                // begin with valid values for the required course fields and then test each one
                view.$el.find('input#course-code').val('COMP1000');
                view.$el.find('input#course-name').val('Computing 1');
                view.$el.find('input#course-instructor').val('Jane Doe');
                view.model.attributes.classes = [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }];

                // test code
                view.$el.find('input#course-code').val('');
                // trigger the form submission
                view.$el.find('.course-form').trigger('submit');
                expect(app.schedule.add).not.toHaveBeenCalled();
                expect(view.renderErrors).toHaveBeenCalled();
                // back to good
                view.$el.find('input#course-code').val('COMP1000');

                // test name
                view.$el.find('input#course-name').val('');
                // trigger the form submission
                view.$el.find('.course-form').trigger('submit');
                expect(app.schedule.add).not.toHaveBeenCalled();
                expect(view.renderErrors).toHaveBeenCalled();
                // back to good
                view.$el.find('input#course-name').val('Computing 1');

                // test instructor
                view.$el.find('input#course-instructor').val('');
                // trigger the form submission
                view.$el.find('.course-form').trigger('submit');
                expect(app.schedule.add).not.toHaveBeenCalled();
                expect(view.renderErrors).toHaveBeenCalled();
                // back to good
                view.$el.find('input#course-instructor').val('Jane Doe');

                // replace the original schedule object, if one was present
                app.schedule = temp;
            });
        });

        describe('accepts valid courses', function() {
            it('adds or updates a valid course in the application schedule collection when .course-form is submitted and resets the form', function() {
                // need to determine if the course was added to the application scope schedule object, temporarily stub the object if present
                var temp = app.schedule || {}

                app.schedule = {};

                // spy on the add function
                app.schedule.add = submitSpy;

                // ensure the form has valid values for the required course fields
                view.$el.find('input#course-code').val('COMP1000');
                view.$el.find('input#course-name').val('Computing 1');
                view.$el.find('input#course-instructor').val('Jane Doe');

                // addition of classes to the model will be tested separately
                view.model.attributes.classes = [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }];

                spyOn(view.model, 'save'); //not testing spec.

                // trigger the form submission
                view.$el.find('.course-form').trigger('submit');

                // check that the values have been pulled from the markup ... is this what should really happen (e.g. maybe a new model or destroy the view)?
                expect(view.model.attributes.code).toEqual('COMP1000');
                expect(view.model.attributes.name).toEqual('Computing 1');
                expect(view.model.attributes.instructor).toEqual('Jane Doe');

                expect(app.schedule.add).toHaveBeenCalledWith(view.model);

                // replace the original schedule object, if one was present
                app.schedule = temp;
            });
        });

        it('shows .time-controls and hides .btn-add-course-time when .btn.add-section is clicked', function() {
            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            expect(view.$el.find('.btn-add-course-time')).not.toHaveClass('hidden');

            view.$el.find('.btn.add-section').trigger('click');

            expect(view.$el.find('.btn-add-course-time')).toHaveClass('hidden');
            expect(view.$el.find('.time-controls')).not.toHaveClass('hidden');
        });

        it('shows .btn.add-section and hides .time-controls when .btn.cancel-class is clicked', function() {
            // prepare the view for the test
            view.$el.find('.time-controls').removeClass('hidden');
            view.$el.find('.btn-add-section').addClass('hidden');

            view.$el.find('.btn.cancel-class').trigger('click');

            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            expect(view.$el.find('.btn-add-section')).not.toHaveClass('hidden');
        });

        it('adds a class time and hides .time-controls when .btn.add-class is clicked', function() {
            // prepare the view for the test
            view.$el.find('.time-controls').removeClass('hidden');
            view.$el.find('.btn-add-section').addClass('hidden');

            view.$el.find('.btn.add-class').trigger('click');

            expect(view.model.attributes.classes.length).toEqual(1);

            // TODO: should do some validation checks as well

            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            expect(view.$el.find('.btn-add-section')).not.toHaveClass('hidden');
        });

        it('removes the view from the DOM when .btn.close-course is clicked', function() {
        	$('body').append(view.el);
        	view.$el.find('.btn.close-course').trigger('click');
        	expect(view.$el).not.toBeInDOM();
        });
    });
});