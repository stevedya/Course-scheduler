describe('ScheduleView', function () {
    var view;

    beforeEach(function () {
        view = new app.views.ScheduleView();
        view.render(); // need some DOM elements to test
    });

    describe('renders a view', function () {
        describe('without any courses added', function () {
            it('displays a message that no courses are added or exist', function () {

                //Because there are no courses in the collection this message should exist
                expect(view.$el.find('#no-courses-message')).toExist();

            });
        });

        describe('with a course or courses', function () {
            beforeEach(function () {
                // mock two course mocks for testing
                view.collection.add([
                    {
                        code: 'COMP1000',
                        name: 'Computing 1',
                        instructor: 'Jane Doe',
                        classes: [
                            {
                                day: 'Wednesday',
                                start: '1:00PM',
                                end: '3:00PM'
                            },
                            {
                                day: 'Friday',
                                start: '10:00AM',
                                end: '12:00PM'

                            }]
                    },
                    {
                        code: 'COMP1001',
                        name: 'Computing 2',
                        instructor: 'Jane Doe',
                        classes: [
                            {
                                day: 'Tuesday',
                                start: '1:00PM',
                                end: '3:00PM'
                            },
                            {
                                day: 'Thursday',
                                start: '10:00AM',
                                end: '12:00PM'

                            }]
                    }
                ]);

                view.render();

            });

            it('renders the expected course or courses', function () {

                expect(view.$el.find('.schedule-name').eq(0).text()).toBe('Computing 1');
                expect(view.$el.find('.schedule-name').eq(1).text()).toBe('Computing 2');

                expect(view.$el.find('.schedule-code').eq(0).text()).toBe('COMP1000');
                expect(view.$el.find('.schedule-code').eq(1).text()).toBe('COMP1001');

            });

            it('renders the expected class times', function () {
                //tests for the first model
                expect(view.$el.find('.class-time-row .schedule-day').eq(0).text()).toBe('Wednesday');
                expect(view.$el.find('.class-time-row .schedule-start').eq(1).text()).toBe('10:00AM');

                //tests for the second model in collection
                expect(view.$el.find('.class-time-row .schedule-day').eq(2).text()).toBe('Tuesday');
                expect(view.$el.find('.class-time-row .schedule-end').eq(2).text()).toBe('3:00PM');

            });
        });

        describe('renders when collection is modified', function () {
            it('displays updated values', function () {
                //Set defaults and render
                view.collection.add([{code: 'COMP1000', name: 'Computing 1'}]);
                view.render();
                //Make sure they are set.
                expect(view.$el.find('.schedule-name').eq(0).text()).toBe('Computing 1');
                //make a change to the collection
                view.collection.set([{code: 'COMP1000', name: 'Gary 101'}]);
                view.render();
                //Test that it rendered properly
                expect(view.$el.find('.schedule-name').eq(0).text()).toBe('Gary 101');

            });
        });
    });

    describe('supports interactive events', function () {
        it('listens for the required events', function () {
            var exptectedEvents = {
                'click .modify-course': 'viewCourse'
            };
            expect(view.events).toEqual(exptectedEvents);
        });

        it('renders a course for modification when .modify-course is clicked', function () {
            // TODO: complete the test for successful click and render
            //Dunno what i'm doing here
            var modifyCourseSpy = jasmine.createSpy('modifyCourseSpy');
            app.views.AppView.modifyCourseView = modifyCourseSpy;

            //Add to the collection
            view.collection.add([
                {
                    code: 'COMP1000',
                    name: 'Computing 1',
                    instructor: 'Jane Doe'
                },
                {
                    code: 'COMP2000',
                    name: 'Computing 2',
                    instructor: 'Greg'
                }
            ]);
            view.render();

            //create a course view to check.
            var appView = new app.views.AppView();
            appView.render();

            //trigger the modify button
            view.$el.find('.list-group-item .modify-course').eq(0).trigger('click');

            //check inside the course view for the course.
            expect(appView.$el.find('input#course-code')).toHaveValue('COMP1000');
            expect(appView.$el.find('input#course-name')).toHaveValue('Computing 1');
            expect(appView.$el.find('input#course-instructor')).toHaveValue('Jane Doe');

        });
    });
});