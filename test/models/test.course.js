describe('Course', function () {

    var course;

    beforeEach(function () {
        course = new app.models.Course(); // this is how to export
    });

    describe('contains default attributes', function () {
        it('has a name set to \'\'', function () {
            expect(course.get('name')).toEqual('');
        });
        it('has as course code set to \'\'', function () {
            expect(course.get('code')).toEqual('');
        });
        it('has an instructor set to \'\'', function () {
            expect(course.get('instructor')).toEqual('');
        });
        it('has an classes set to \'\'', function () {
            expect(course.get('classes')).toEqual(
                [{
                    day: '',
                    start: '',
                    end: ''
                }]
            );
        });
    });


    describe('validates set attributes', function () {

        it('ensures a non-empty name is provided', function () {
            var errorCallback = jasmine.createSpy('-invalid event callback-');

            course.on('invalid', errorCallback);
            course.set({name: ''}, {validate: true}); //can't be empty

            var errorArgs = errorCallback.calls.mostRecent().args;

            expect(errorArgs).toBeDefined();
            expect(errorArgs[0]).toBe(course);
            expect(errorArgs[1]).toBe('Course name cannot be empty.');
        });

        it('Ensures a non-empty course code is provided', function () {
            var errorCallback = jasmine.createSpy('-invalid event callback-');

            course.on('invalid', errorCallback);
            course.set({name: 'Food Studies', code: ''}, {validate: true});  //Cant be empty

            var errorArgs = errorCallback.calls.mostRecent().args;

            expect(errorArgs).toBeDefined();
            expect(errorArgs[0]).toBe(course);
            expect(errorArgs[1]).toBe('code name cannot be empty.');
        });

        it('Ensures a non-empty instructor code is provided', function () {
            var errorCallback = jasmine.createSpy('-invalid event callback-');

            course.on('invalid', errorCallback);
            course.set({name: 'Food Studies', code: 'COMP1002', instructor: ''}, {validate: true});  //Cant be empty

            var errorArgs = errorCallback.calls.mostRecent().args;

            expect(errorArgs).toBeDefined();
            expect(errorArgs[0]).toBe(course);
            expect(errorArgs[1]).toBe('instructor name cannot be empty.');
        });


        // TODO: create specific tests for classes -> day, start, and end times
        describe('validates set classes attributes', function () {
            it('ensures class day was entered', function () {
                var errorCallback = jasmine.createSpy('-invalid event callback-');

                course.on('invalid', errorCallback);
                course.set({name: 'Food Studies', code: 'COMP1002', instructor: 'Gary'}, {validate: true});
                course.addClassTime({day: '', start: '8:00am', end: 'NEVER'});

                var errorArgs = errorCallback.calls.mostRecent().args;

                expect(errorArgs).toBeDefined();
                expect(errorArgs[0]).toBe(course);
                expect(errorArgs[1]).toBe('class day cannot be empty.');
            });
        });

        //Couldn't quite get it to validate properly.
    });
});