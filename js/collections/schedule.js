(function(exports) {
    var app = exports.app || (exports.app = {}),

        Schedule = exports.Backbone.Collection.extend({
            model: app.models.Course,

            /**
             * Filters the courses in the schedule by the day of the week.
             * @param {string} day - the day of the week to filter by
             * @return {Array} - an array of matched courses.
             */
            forDay: function(day) {
                return this.filter(function(course) {
                    var courseCheck;

                    course.get('classes').forEach(function(classTime) {
                        courseCheck = classTime.day.toLowerCase() === day.toLowerCase();
                    });

                    return courseCheck;
                });
            },

            /**
             * Filters the courses in the schedule by the course code.
             * @param {string} code - the course code to filter by
             * @return {Array} - an array of matched courses.
             */
            forCode: function(code) {
                return this.filter(function(course) {
                    return course.get('code').toLowerCase() === code.toLowerCase();
                });
            },

            /**
             * Filters the courses in the schedule by the course name.
             * @param {string} name - the course name to filter by
             * @return {Array} - an array of matched courses.
             */
            forName: function(name) {
                return this.filter(function(course) {
                    return course.get('name').toLowerCase() === name.toLowerCase();
                });
            },

            /**
             * Filters the courses in the schedule by the course instructor.
             * @param {string} instructor - the course instructor to filter by
             * @return {Array} - an array of matched courses.
             */
            forInstructor: function(instructor) {
                return this.filter(function(course) {
                    return course.get('instructor').toLowerCase() === instructor.toLowerCase();
                });
            }

        });

    // export the Schedule collection
    app.collections || (app.collections = {});
    app.collections.Schedule = Schedule;

}(this));