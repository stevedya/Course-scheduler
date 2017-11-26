describe('CourseView', function() {
	var view;

	beforeEach(function() {
		view = new app.views.CourseView();
		view.render(); // need some DOM elements to test
	});

	describe('renders a view', function() {
		describe('without a course', function() {
			it('contains inupt#course-code', function() {
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

		describe('with a course', function() {
			beforeEach(function() {
				view = new app.views.CourseView({
					model: {
						attributes: {
							code: 'COMP1000',
							name: 'Computing 1',
							instructor: 'Jane Doe',
							classes: [
								{
									day: 'tuesday',
                                    start: '8:00am',
									end: '9:00pm'
                                },
                                {
                                    day: 'wednesday',
                                    start: '10:00am',
                                    end: '12:00pm'
                                }
								]
						}
					}
				});
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
            it('renders the expected course day in the times display', function() {
				expect(view.$el.find('.class-time .day').eq(0).text()).toBe('tuesday');
                expect(view.$el.find('.class-time .day').eq(1).text()).toBe('wednesday');
            });
            it('renders the expected course start in the times display', function() {
                expect(view.$el.find('.class-time .start').eq(0).text()).toBe('8:00am');
                expect(view.$el.find('.class-time .start').eq(1).text()).toBe('10:00am');
            });
            it('renders the expected course end in the times display', function() {
                expect(view.$el.find('.class-time .end').eq(0).text()).toBe('9:00pm');
                expect(view.$el.find('.class-time .end').eq(1).text()).toBe('12:00pm');
            });
		});

		describe('renders when course is modified', function() {

			it('displays updated values', function() {
                var submitSpy = jasmine.createSpy('submitSpy');

                var tempSchedule = app.schedule || {};
                app.schedule = {};
                app.schedule.add = submitSpy;

                // set valid values
                view.$el.find('input#course-code').val('COMP1000');
                view.$el.find('input#course-name').val('Computing 1');
                view.$el.find('input#course-instructor').val('Jane Doe');

                // TODO: manually add classes
                view.$el.find('.course-form').trigger('submit'); // should be good!

                // check that the values have been pulled from the markup and set on the view model
                expect(view.model.attributes.code).toEqual('COMP1000');
                expect(view.model.attributes.name).toEqual('Computing 1');
                expect(view.model.attributes.instructor).toEqual('Jane Doe');

                // change values
                view.$el.find('input#course-code').val('Gary101');
                view.$el.find('input#course-name').val('Gary Tech');
                view.$el.find('input#course-instructor').val('Gary');
                // TODO: manually add classes
                view.$el.find('.course-form').trigger('submit'); // should be good!

                // check that the values have been pulled from the markup and set on the view model
                expect(view.model.attributes.code).toEqual('Gary101');
                expect(view.model.attributes.name).toEqual('Gary Tech');
                expect(view.model.attributes.instructor).toEqual('Gary');

            });
		});
	});

	describe('supports interactive events', function() {
		var submitSpy = jasmine.createSpy('submitSpy');

		it ('listens for the required events', function() {
			var exptectedEvents = {
				'submit .course-form': 'addUpdateCourse',
				'click .btn.add-section': 'addSection',
				'click .btn.add-time': 'addClassTime',
				'click .btn.cancel-time': 'resetTimeForm',
                'click button.cancel': 'cancelAdd'
				// TODO: bonus add event for removing an added class time
			};

			expect(view.events).toEqual(exptectedEvents);
		});

		describe('rejects invalid courses', function() {
			it('rejects adding an invalid course when .course-form is submitted and displays error(s)', function() {
				var tempSchedule = app.schedule || {};
				app.schedule = {};
				app.schedule.add = submitSpy;

				var errorSpy = jasmine.createSpy('errorSpy');
				view.renderErrors = errorSpy;

				// begin with valid values for a course and then test each one
				view.$el.find('input#course-code').val('COMP1000');
				view.$el.find('input#course-name').val('Computing 1');
				view.$el.find('input#course-instructor').val('Jane Doe');
                view.$el.find('select#course-time-day').val('tuesday');
                view.$el.find('input#course-time-start').val('8:00am');
                view.$el.find('input#course-time-end').val('10:00am');


				// view = new app.views.CourseView({
				// 	model: {
				// 		attributes: {
				// 			classes: [{
                 //                day: 'tuesday',
                 //                start: '8:00am',
                 //                end: '10:00am',
				// 			}]
				// 		}
				// 	}
				// });

                // TODO: manually set classes for the view.model ??

				// test the code
				view.$el.find('input#course-code').val('');
                view.$el.find('input#course-name').val('');
                view.$el.find('input#course-instructor').val('');

				view.$el.find('.course-form').trigger('submit');
				expect(app.schedule.add).not.toHaveBeenCalled();
				// one alternative option, rather than using an error spy
				// expect(view.$el.find('div.errors p').length).toEqual(1);
				expect(view.renderErrors).toHaveBeenCalled();

				// back to a good value for the next test
				view.$el.find('input#course-code').val('COMP1000');
                view.$el.find('input#course-name').val('Computing 1');
                view.$el.find('input#course-instructor').val('Jane Doe');

                //view.$el.find('.course-form').trigger('submit');
                //expect(app.schedule.add).toHaveBeenCalled();
                //expect(view.renderErrors).not.toHaveBeenCalled();

				// TODO: test the name and instructor
			});
		});

		describe('accepts valid courses', function() {
			it('adds or updates a valid course in the schedule when .course-form is submitted', function() {
				var tempSchedule = app.schedule || {};
				app.schedule = {};
				app.schedule.add = submitSpy;

				// set valid values
				view.$el.find('input#course-code').val('COMP1000');
				view.$el.find('input#course-name').val('Computing 1');
				view.$el.find('input#course-instructor').val('Jane Doe');
				// TODO: manually add classes

				view.$el.find('.course-form').trigger('submit'); // should be good!

				// check that the values have been pulled from the markup and set on the view model
				expect(view.model.attributes.code).toEqual('COMP1000');
				expect(view.model.attributes.name).toEqual('Computing 1');
				expect(view.model.attributes.instructor).toEqual('Jane Doe');
				// TODO: complete for the remaining values (name and instructor)

				expect(app.schedule.add).toHaveBeenCalledWith(view.model);


			});
		});

		it('shows .time-controls and hides .btn-add-course-time when .btn.add-section is clicked', function() {
            // prepare the view for the test
            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            expect(view.$el.find('.btn-add-course-time')).not.toHaveClass('hidden');

            view.$el.find('.btn.add-section').trigger('click');

            expect(view.$el.find('.btn-add-course-time')).toHaveClass('hidden');
            expect(view.$el.find('.time-controls')).not.toHaveClass('hidden');
        });

        it('shows .btn.add-section and hides .time-controls when .btn.cancel-time', function() {
			//prepare the view for test
            view.$el.find('.time-controls').removeClass('hidden');
            view.$el.find('.btn.add-section').addClass('hidden');

            expect(view.$el.find('.btn.add-section')).toHaveClass('hidden');
            expect(view.$el.find('.time-controls')).not.toHaveClass('hidden');

            view.$el.find('.btn.cancel-time').trigger('click');

            expect(view.$el.find('.btn.add-section')).not.toHaveClass('hidden');
            expect(view.$el.find('.time-controls')).toHaveClass('hidden');

            // TODO: complete the test for proper functioning of the .btn.add-secton button
        });

        it('adds a class time and hides .time-controls when .btn.add-time is clicked', function() {
            // prepare the view for the test
            view.$el.find('.time-controls').removeClass('hidden');
            view.$el.find('.btn.add-section').addClass('hidden');

            view.$el.find('.btn.add-time').trigger('click');

            expect(view.model.attributes.classes.length).toEqual(1);

            expect(view.$el.find('.time-controls')).toHaveClass('hidden');
            expect(view.$el.find('.btn.add-section')).not.toHaveClass('hidden');

        });
	});
});