describe('ScheduleView', function() {
    var view;

    beforeEach(function() {
        view = new app.views.ScheduleView();
        view.render(); // need some DOM elements to test
    });

    describe('renders a view', function() {
        describe('without any courses added', function() {
            it('displays a message that no courses are added or exist', function() {
                expect(view.$el.find('p')).toHaveText('No Courses');
            });
        });

        describe('with a course or courses', function() {
            beforeEach(function() {
                // add two course mocks for testing
                view.collection.add({
                    code: 'COMP1000',
                    name: 'Computing 1',
                    instructor: 'Jane Doe',
                    classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }, { day: 'Friday', start: '10:00AM', end: '12:00PM' }]
                }, {
                    code: 'COMP2000',
                    name: 'Computing 2',
                    instructor: 'Jane Doe',
                    classes: [{ day: 'Monday', start: '11:00AM', end: '1:00PM' }, { day: 'Thursday', start: '9:00AM', end: '11:00AM' }]
                });

                view.render();
            });

            it('renders the expected course or courses', function() {
                expect(view.$el.text()).toContain('Computing 1');
                // UPGRADE: check for all fields in the expected DOM location
            });

            describe('renders when collection is modified', function() {
                it('renders when a model is updated', function() {
                    view.collection.models[0].set('name', 'Computing 101');
                    expect(view.$el.text()).toContain('Computing 101');
                });

                it('renders when a model is added', function() {
                    view.collection.add({
                        code: 'COMP3000',
                        name: 'Computing 3',
                        instructor: 'Jon Doe',
                        classes: [{ day: 'Tuesday', start: '1:00PM', end: '5:00PM' }]
                    });
                    expect(view.$el.text()).toContain('Computing 3');
                    // UPGRADE: check for all fields in the expected DOM location
                });
            });
        });
    });

    describe('supports interactive events', function() {
        beforeEach(function() {
            // add two course mocks for testing
            view.collection.add({
                code: 'COMP1000',
                name: 'Computing 1',
                instructor: 'Jane Doe',
                classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }, { day: 'Friday', start: '10:00AM', end: '12:00PM' }]
            });

            view.render();
        });
        it('listens for the required events', function() {
            var exptectedEvents = {
                'click .edit': 'modifyCourse'
            };

            expect(view.events).toEqual(exptectedEvents);
        });

        it('renders a course for modification when .edit is clicked', function() {
            app.appView = { renderCourseView: new jasmine.createSpy('editSPy') };

            view.$el.find('.edit').trigger('click');
            expect(app.appView.renderCourseView).toHaveBeenCalledWith(jasmine.any(Object), view.collection.get(view.$el.find('.edit').data('id')));
        });
    });
});