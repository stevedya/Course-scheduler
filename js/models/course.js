/**
 * Course Model module. Represents a Course for a class schedule.
 */
(function(exports) {
    var app = exports.app || (exports.app = {}),

        Course = exports.Backbone.Model.extend({
            // defaults as a function due to the classes being an array
            // (see Backbonejs documentation http://backbonejs.org/#Model-defaults)
            defaults: function() {
                return {
                    name: '',
                    code: '',
                    instructor: '',
                    classes: []
                }
            },

            /**
             * Adds a class time object to this course.
             * @param {Object} classTime - a single class time representation
             * @param {string} classTime.day - the day of the week for the class
             * @param {string} classTime.start - the start time for the class
             * @param {string} classTime.end - the end time for the class
             * @returns {Boolean|undefined} - the result from calling the validate() function or undefined if the classTime did not have the required attributes
             */
            addClass: function(classTime) {
                // light validation at this level
                if (_.isObject(classTime) && classTime.hasOwnProperty('day') && classTime.hasOwnProperty('start') && classTime.hasOwnProperty('end')) {
                    this.attributes.classes.push(classTime);
                    this.trigger('change'); // force a render
                    return this.isValid(); // trigger full validation
                }
            },

            /**
             * Removes a class time from this course.
             * @param {Object|number} value - the actual class time object to remove or the index of the class to remove
             * @returns {Object|undefined} - the removed class time object if successful or undefined if no object was removed
             */
            removeClass: function(value) {
                var idx;

                if (_.isNumber(value)) {
                    // remove by index
                    if (value >= 0 && value < this.attributes.classes.length) {
                        return this.attributes.classes.splice(value, 1);
                    }
                } else if (_.isObject(value)) {
                    // remove by ref
                    if ((idx = this.attributes.classes.indexOf(value)) > -1) {
                        return this.attributes.classes.splice(idx, 1);
                    }
                }
            },

            validate: function(attrs) {
                var errors = [];

                if (attrs.hasOwnProperty('name') && _.isEmpty(attrs.name)) {
                    errors.push({
                        attr: 'name',
                        message: 'Course.name must not be an empty string.'
                    });
                }

                if (attrs.hasOwnProperty('code') && _.isEmpty(attrs.code)) {
                    errors.push({
                        attr: 'code',
                        message: 'Course.code must not be an empty string.'
                    });
                }

                if (attrs.hasOwnProperty('instructor') && _.isEmpty(attrs.instructor)) {
                    errors.push({
                        attr: 'instructor',
                        message: 'Course.instructor must not be an empty string.'
                    });
                }

                // for classes, need to ensure that an array of {day, start, end} objects are present
                if (attrs.hasOwnProperty('classes') && !_.isArray(attrs.classes)) {
                    errors.push({
                        attr: 'classes',
                        message: 'Course.classes must be an array.'
                    });
                } else if (attrs.classes.length > 0) {
                    // array present, check for objects
                    attrs.classes.forEach(function(session) {
                        if (!session.hasOwnProperty('day') || !session.hasOwnProperty('start') || !session.hasOwnProperty('end')) {
                            errors.push({
                                attr: 'classes',
                                message: 'Course.classes must be an array of {day, start, end} objects.'
                            });
                        }
                        // TODO: valdiate day, start, and end...
                    });
                }

                // only return a value if any errors were found (as per the Backbone documentation)
                if (errors.length > 0) {
                    return errors;
                }
            }
        });

    // export the Course model
    app.models || (app.models = {});
    app.models.Course = Course;

}(this));