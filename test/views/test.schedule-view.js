describe('CourseView', function () {
    var view;

    beforeEach(function () {
        view = new app.views.CourseView();
        view.render(); // need some DOM elements to test
    });

    describe('renders a view', function () {
        describe('without any courses', function () {
            it('contains inupt#course-code', function () {
                expect(view.$el.find('input#course-code')).toExist();
            });
            xit('contains inupt#course-name', function () {
                expect(view.$el.find('input#course-name')).toExist();
            });
            xit('contains inupt#course-instructor', function () {
                expect(view.$el.find('input#course-instructor')).toExist();
            });
            xit('contains select#course-time-day', function () {
                expect(view.$el.find('select#course-time-day')).toExist();
            });
            xit('contains inupt#course-time-start', function () {
                expect(view.$el.find('input#course-time-start')).toExist();
            });
            xit('contains inupt#course-time-end', function () {
                expect(view.$el.find('input#course-time-end')).toExist();
            x});

        });

        describe('with courses', function () {
            beforeEach(function () {
                view = new app.views.CourseView({
                    collection: {
                        //TODO: Add some dummy courses
                    }
                });
                view.render();

            });

            it('renders the expected courses', function () {
                //TODO: What should be displayed
            });

        });

        describe('renders when a course is modified', function () {
            xit('displays updated values', function () {
                // TODO: complete the test
                // (hint, need to 'listenTo' the collection in initialize:
                // see backbone applications text TodoView example)
            });
        });
    });

    describe('supports interactive events', function () {
        var submitSpy = jasmine.createSpy('submitSpy');

        it('listens for the required events', function () {
            var exptectedEvents = {

                // TODO: add event for viewiing/modifying a course
            };

            expect(view.events).toEqual(exptectedEvents);
        });


    });
});