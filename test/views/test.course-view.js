describe('CourseView', function () {
    var view;

    beforeEach(function () {
        view = new app.views.CourseView();
        view.render(); // need some DOM elements to test
    });

    describe('renders a view', function () {
        describe('without a course', function () {
            it('contains inupt#course-code', function () {
                expect(view.$el.find('input#course-code')).toExist();
            });
            it('contains inupt#course-name', function () {
                expect(view.$el.find('input#course-name')).toExist();
            });
            it('contains inupt#course-instructor', function () {
                expect(view.$el.find('input#course-instructor')).toExist();
            });
            it('contains select#course-time-day', function () {
                expect(view.$el.find('select#course-time-day')).toExist();
            });
            it('contains inupt#course-time-start', function () {
                expect(view.$el.find('input#course-time-start')).toExist();
            });
            it('contains inupt#course-time-end', function () {
                expect(view.$el.find('input#course-time-end')).toExist();
            });

        });

        describe('with a course', function () {
            beforeEach(function () {
                view = new app.views.CourseView({
                    model: {
                        attributes: {
                            code: 'COMP1000',
                            name: 'Computing 1',
                            instructor: 'Jane Doe',
                            classes:
                                [{
                                    day: 'tuesday',
                                    start: '8:00AM',
                                    end: '10:00AM'
                                }]
                            // TODO: include classes
                        }
                    }
                });
                view.render();

            });

            it('renders the expected course code', function () {
                expect(view.$el.find('input#course-code')).toHaveValue('COMP1000');
            });
            it('renders the expected course name', function () {
                expect(view.$el.find('input#course-name')).toHaveValue('Computing 1');
            });
            it('renders the expected instructor', function () {
                expect(view.$el.find('input#course-instructor')).toHaveValue('Jane Doe');
            });
            it('renders select#course-time-day', function () {
                expect(view.$el.find('#course-time-day option')).toHaveValue('tuesday');
            });
            it('contains inupt#course-time-start', function () {
                expect(view.$el.find('input#course-time-start')).toHaveValue('8:00AM');
            });
            it('contains inupt#course-time-end', function () {
                expect(view.$el.find('input#course-time-end')).toHaveValue('10:00AM');
            });

            // TODO: tests for display of desired course attributes
        });

        describe('renders when course is modified', function () {
            xit('displays updated values', function () {
                // TODO: complete the test
                // (hint, need to 'listenTo' the model in initialize:
                // see backbone applications text TodoView example)
            });
        });
    });

    describe('supports interactive events', function () {
        var submitSpy = jasmine.createSpy('submitSpy');

        it('listens for the required events', function () {
            var exptectedEvents = {
                'submit .course-form': 'addUpdateCourse',
                'click .btn.add-section': 'addSection',
                'click .btn.add-time': 'addClassTime',
                'click .btn.cancel-time': 'resetTimeForm',
                'click button.cancel': 'doneAdding'

                // TODO: add event for removing an added class time
            };

            expect(view.events).toEqual(exptectedEvents);
        });

        describe('rejects invalid courses', function () {
            it('rejects adding an invalid course when .course-form is submitted and displays error(s)', function () {
                var tempSchedule = app.schedule || {};
                app.schedule = {};
                app.schedule.add = submitSpy;

                var errorSpy = jasmine.createSpy('errorSpy');
                view.renderErrors = errorSpy;

                // begin with valid vlaues for a course and then test each one
                view.$el.find('input#course-code').val('COMP1000');
                view.$el.find('input#course-name').val('Computing 1');
                view.$el.find('input#course-instructor').val('Jane Doe');
                // TODO: manually set classes for the view.model

                // test the code
                view.$el.find('input#course-code').val('');
                view.$el.find('.course-form').trigger('submit');
                expect(app.schedule.add).not.toHaveBeenCalled();
                // one alternative option, rather than using an error spy
                // expect(view.$el.find('div.errors p').length).toEqual(1);
                expect(view.renderErrors).toHaveBeenCalled();

                // back to a good value for the next test
                view.$el.find('input#course-code').val('COMP1000');

                // TODO: test the name and instructor
            });
        });

        describe('accepts valid courses', function () {
            it('adds or updates a valid course in the schedule when .course-form is submitted', function () {
                var tempSchedule = app.schedule || {};
                app.schedule = {};
                app.schedule.add = submitSpy;

                // set valid vlaues
                view.$el.find('input#course-code').val('COMP1000');
                view.$el.find('input#course-name').val('Computing 1');
                view.$el.find('input#course-instructor').val('Jane Doe');
                // TODO: manually add classes

                view.$el.find('.course-form').trigger('submit'); // should be good!

                // check that the values have been pulled from the markup and set on the view model
                expect(view.model.attributes.code).toEqual('COMP1000');
                // TODO: complete for the remaining values (name and instructor)

                expect(app.schedule.add).toHaveBeenCalledWith(view.model);


            });
        });

        it('shows .time-controls and hides .btn-add-course-time when .btn.add-section is clicked', function () {
            // prepare the view for the test
            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            expect(view.$el.find('.btn-add-course-time')).not.toHaveClass('hidden');

            view.$el.find('.btn.add-section').trigger('click');

            expect(view.$el.find('.btn-add-course-time')).toHaveClass('hidden');
            expect(view.$el.find('.time-controls')).not.toHaveClass('hidden');
        });

        xit('shows .btn.add-section and hides .time-controls when .btn.cancel-time', function () {
            // TODO: complete the test for proper functioning of the .btn.add-secton button
        });

        it('adds a class time and hides .time-controls when .btn.add-time is clicked', function () {
            // prepare the view for the test
            view.$el.find('.time-controls').removeClass('hidden');
            view.$el.find('.btn-add-section').addClass('hidden');

            view.$el.find('.btn.add-time').trigger('click');

            expect(view.model.attributes.classes.length).toEqual(1);

            //add class hidden
            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            //remove class hidden
            expect(view.$el.find('.btn-add-section')).not.toHaveClass('hidden');
        });
    });
});