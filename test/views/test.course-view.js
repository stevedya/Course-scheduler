describe('CourseView', function () {
    var view;

    beforeEach(function () {
        view = new app.views.CourseView();
        view.render(); //Need some DOM elements to test.
    });

    describe('Renders a view', function () {
        //does it have an input for course code?
        describe('without a course', function () {
            it('contains input#course-code', function () {
              expect(view.$el.find('input#course-code')).toExist();
            });
            //TODO: Write the remaining tests for the views of other elements
        });

        describe('with a course', function () {
            beforeEach(function () {
                view = new app.views.CourseView({
                    model: {
                        attributes: {
                            code: 'COMP1000',
                            name: 'Computing 1',
                            instructor: 'Jane Doe'
                            //TODO: Include Classes
                        }
                    }
                });
                view.render();
            });

            it('renders the expected course code', function () {
                expect(view.$el.find('input#course-code')).toHaveValue('COMP1000');
            });

            //TODO: Test for the display of desired course attributes
        });

        describe('renders when course is modified', function () {
            xit('displays updated values', function () {
            //TODO: Complete the test
            });
        });
    });

    describe('supports interactive events', function () {
       // Example when submit is clicked does it do the thing?
    });
});