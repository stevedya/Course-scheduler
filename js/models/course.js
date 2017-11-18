(function(exports) {

	var app = exports.app || (exports.app = {}),

		Course = Backbone.Model.extend({
			defaults: {
				code: '',
				name: '',
				instructor: '',
				classes: [{
					day: '',
                    start: '',
                    end: ''
				}]
			},

			// TODO: include a function to add class times (e.g. addClassTime(time))
			addClassTime: function(time) {
                this.get('classes').push(time);
                this.validate();
			},

			validate: function(attrs) {
				// TODO: modify this validation to suit your needs
			    if (attrs.hasOwnProperty('name') && _.isEmpty(attrs.name)) {
			        return 'Course name cannot be empty.';
			    }
                if (attrs.hasOwnProperty('code') && _.isEmpty(attrs.code)) {
                    return 'code name cannot be empty.';
                }
                if (attrs.hasOwnProperty('instructor') && _.isEmpty(attrs.instructor)) {
                    return 'instructor name cannot be empty.';
                }
			    // TODO: complete validation for the remaining attributes
				if (attrs.hasOwnProperty('classes')) {
			    	attrs.classes.forEach(function (classTime) {
						if(_.isEmpty(classTime.day)) {
							return 'class day cannot be empty.';
						}
                        if(_.isEmpty(classTime.start)) {
                            return 'class start cannot be empty.';
                        }
                        if(_.isEmpty(classTime.end)) {
                            return 'class end cannot be empty.';
                        }
                    });
				}
			    // classes can be a bit 'tricky'
			}
		});


	// export the Course model
	app.models || (app.models = {});
	app.models.Course = Course;

}(this));