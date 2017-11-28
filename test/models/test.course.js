describe('Course', function () {

    var course;

    beforeEach(function () {
        course = new app.models.Course();
    });

    describe('contains default attributes', function () {
        it('has a name', function () {
            expect(course.get('name')).toEqual('');
        });

        it('has a course code', function () {
            expect(course.get('code')).toEqual('');
        });

        it('has an assigned instructor', function () {
            expect(course.get('instructor')).toEqual('');
        });

        it('has scheduled classes', function () {
            expect(course.get('classes')).toEqual(jasmine.any(Array));
        });

    });

    describe('performs validation', function () {
        it('returns an array of error objects if validation fails for any attribute', function () {
            // trigger validate, default attributes for name, code, and instructor are invalid
            course.isValid();

            // check for appropriate validationError
            expect(course.validationError).toEqual(jasmine.any(Array));
            expect(course.validationError.length).toEqual(3);
        });

        describe('validates set attributes', function () {

            // ************************************************************************
            // Earlier form of validation test. Tests have been updated/added to be 
            // simpler to check and provide a means to return multiple error messages.
            // ************************************************************************

            /* 
            it('ensures a non-empty name is provided', function() {
                var errorArgs,
                    errorCallback = jasmine.createSpy('-invalid event callback-');

                course.on('invalid', errorCallback);

                // What would you need to set on the course attributes to
                // cause validation to fail?

                course.set({ name: '' }, { validate: true });

                errorArgs = errorCallback.calls.mostRecent().args;

                expect(errorArgs).toBeDefined();
                expect(errorArgs[0]).toBe(course);
                expect(errorArgs[1]).toBe('Course.name must not be an empty string.');

                // What would be acceptable?
                course.set({ name: 'test name' }, { validate: true });

                // Should only have been called once for the previous failure
                expect(errorCallback.calls.count()).toEqual(1);
            });

            Updated testing begins below...

            */

            beforeEach(function () {
                // set course with good values in order to test desired validation (all attributes are passed to validate function)
                course.set({
                    name: 'Computing 1',
                    code: 'COMP1000',
                    instructor: 'Jane Doe',
                    classes: [{day: 'Wednesday', start: '1:00PM', end: '3:00PM'}, {
                        day: 'Friday',
                        start: '10:00AM',
                        end: '12:00PM'
                    }]
                });
            });

            it('ensures a non-empty name is provided', function () {
                // don't need to check spy callback, can simply check validationError value

                // invalid value for name
                course.set({name: ''}, {validate: true});

                // validate will return an array of error objects if validation fails for any attribute
                expect(course.validationError[0].attr).toEqual('name');
                expect(course.validationError[0].message).toEqual('Course.name must not be an empty string.');

                // What would be acceptable?
                course.set({name: 'Computing 2'}, {validate: true});

                expect(course.validationError).toBeNull();
            });

            it('ensures a non-empty code is provided', function () {
                // invalid value for code
                course.set({code: ''}, {validate: true});

                // validate will return an array of error objects if validation fails for any attribute
                expect(course.validationError[0].attr).toEqual('code');
                expect(course.validationError[0].message).toEqual('Course.code must not be an empty string.');

                // What would be acceptable?
                course.set({code: 'COMP2000'}, {validate: true});

                expect(course.validationError).toBeNull();
            });

            it('ensures a non-empty instructor is provided', function () {
                // invalid value for instructor
                course.set({instructor: ''}, {validate: true});

                // validate will return an array of error objects if validation fails for any attribute
                expect(course.validationError[0].attr).toEqual('instructor');
                expect(course.validationError[0].message).toEqual('Course.instructor must not be an empty string.');

                // What would be acceptable?
                course.set({instructor: 'COMP2000'}, {validate: true});

                expect(course.validationError).toBeNull();
            });

            it('ensures that classes must be an array of {day, start, end} objects', function () {
                // invalid type for classes
                course.set({classes: ''}, {validate: true});

                // validate will return an array of error objects if validation fails for any attribute
                expect(course.validationError[0].attr).toEqual('classes');
                expect(course.validationError[0].message).toEqual('Course.classes must be an array.');

                // invalid array element(s) for classes
                course.set({classes: ['foo', 'bar']}, {validate: true});

                // validate will return an array of error objects if validation fails for any attribute
                expect(course.validationError[0].attr).toEqual('classes');
                expect(course.validationError[0].message).toEqual('Course.classes must be an array of {day, start, end} objects.');

                // What would be acceptable?
                course.set({
                    classes: [{day: 'Wednesday', start: '1:00PM', end: '3:00PM'}, {
                        day: 'Friday',
                        start: '10:00AM',
                        end: '12:00PM'
                    }]
                }, {validate: true});

                expect(course.validationError).toBeNull();

            });
        });
    });

    // ************************************************************************
    // the following are not required for grading (i.e. you were not expected
    // to complete them), but may be required for functionality
    // ************************************************************************
    describe('supports adding class times', function () {
        it('only allows adding {day, start, end} objects', function () {
            // test with invalid value
            course.addClass('');

            expect(course.get('classes').length).toEqual(0);

            // test with invalid object
            course.addClass({start: '1:00PM', end: '3:00PM'});
            expect(course.get('classes').length).toEqual(0);

            // test with acceptable object
            course.addClass({day: 'Wednesday', start: '1:00PM', end: '3:00PM'});
            expect(course.get('classes').length).toEqual(1);
            course.addClass({day: 'Friday', start: '12:00PM', end: '2:00PM'});
            expect(course.get('classes').length).toEqual(2);

            // UPGRADE: ensure that class times cannot be duplicated or overlap
        });
    });

    describe('supports removing class times', function () {
        var removedClass;

        beforeEach(function () {
            // direct setting of good classes array
            course.attributes.classes = [
                {day: 'Monday', start: '1:00PM', end: '3:00PM'},
                {day: 'Tuesday', start: '9:00AM', end: '11:00AM'},
                {day: 'Friday', start: '10:00AM', end: '12:00PM'}
            ];
        });

        it('removes class time objects', function () {
            var classToRemove;

            // random invalid reference
            course.removeClass('');
            expect(course.get('classes').length).toEqual(3);

            // good reference, remove the second class time
            removedClass = course.removeClass(course.get('classes')[1]);
            expect(course.get('classes').length).toEqual(2);
            expect(course.get('classes').indexOf(removedClass)).toBe(-1);
        });

        it('removes class time objects by index', function () {
            // random invalid index
            course.removeClass(3);
            expect(course.get('classes').length).toEqual(3);

            // good index
            removedClass = course.removeClass(1);
            expect(course.get('classes').length).toEqual(2);
            expect(course.get('classes').indexOf(removedClass)).toBe(-1);
        });
    });
});