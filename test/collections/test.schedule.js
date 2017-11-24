describe('Schedule', function() {

    var schedule;

    beforeEach(function() {
        schedule = new app.collections.Schedule();
    });

    describe('Allows for adding courses', function() {
        it('contains a Course model', function() {
            expect(schedule.model).toBe(app.models.Course);
        });
    });

    describe('Provides filters', function() {
        beforeEach(function() {
            schedule.add([
                { code: 'COMP1000', name: 'Course 1', instructor: 'Jane Doe', classes: [{ day: 'Monday', start: '8:00AM', end: '10:00AM' }] },
                { code: 'COMP1001', name: 'Course 2', instructor: 'Jon Doe', classes: [{ day: 'Monday', start: '12:00PM', end: '2:00PM' }] },
                { code: 'COMP1000', name: 'Course 1', instructor: 'Jane Doe', classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }, { day: 'Friday', start: '10:00AM', end: '12:00PM' }] }
            ]);
        });

        describe('filters courses by day of week', function() {
            it('returns only courses with classes on a desired day', function() {
                expect(schedule.forDay('monday').length).toEqual(2);
                expect(schedule.forDay('tuesday').length).toEqual(0);
            });
        });
        
        describe('filters courses by course code', function() {
            it('returns only courses with the desired code', function() {
                expect(schedule.forCode('COMP1000').length).toEqual(2);
                expect(schedule.forCode('COMP1001').length).toEqual(1);
                expect(schedule.forCode('').length).toEqual(0);
            });
        });

        describe('filters courses by course name', function() {
            it('returns only courses with the desired name', function() {
                expect(schedule.forName('Course 1').length).toEqual(2);
                expect(schedule.forName('Course 2').length).toEqual(1);
                expect(schedule.forName('').length).toEqual(0);
            });
        });

        describe('filters courses by course instructor', function() {
            it('returns only courses with the desired instructor', function() {
                expect(schedule.forInstructor('Jane Doe').length).toEqual(2);
                expect(schedule.forInstructor('Jon Doe').length).toEqual(1);
                expect(schedule.forInstructor('').length).toEqual(0);
            });
        });

    });
});