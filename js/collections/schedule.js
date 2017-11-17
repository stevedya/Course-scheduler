(function(exports) {
    var app = exports.app || (exports.app = {}),
        Schedule = exports.Backbone.Collection.extend({
            model: app.models.Course,

            forDay: function(day) {
                return this.filter(function(course) {
                    var courseCheck = false;
                    course.get('classes').forEach(function(classTime) {
                        if (classTime.day.toLowerCase() === day.toLowerCase()) {
                            courseCheck = true;
                        }
                    });
                    return courseCheck;
                });
            },
            forCourse: function (code) {
                return this.filter(function (course) {
                    var courseCheck = false;

                        if (course.get('code').toLowerCase() === code.toLowerCase()) {
                            courseCheck = true;
                        }

                    return courseCheck;
                });
            },
            forName: function (name) {
                return this.filter(function (course) {
                    var courseCheck = false;
                    if (course.get('name').toLowerCase() === name.toLowerCase()) {
                        courseCheck = true;
                    }
                    return courseCheck;
                });
            },
            forInstructor: function (name) {
                return this.filter(function (course) {
                    var courseCheck = false;
                    if (course.get('instructor').toLowerCase() === name.toLowerCase()) {
                        courseCheck = true;
                    }
                    return courseCheck;
                });
            }
            // TODO: complete remaining filter functions (see test.schedule.js)
        });

    // export the Schedule collection
    app.collections || (app.collections = {});
    app.collections.Schedule = Schedule;


}(this));