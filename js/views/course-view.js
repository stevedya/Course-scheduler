(function (exports) {
    var app = exports.app || (exports.app = {}),

        CourseView = Backbone.View.extend({

            tagName: 'div',
            
            template: Handlebars.compile($('#course-view-template').html()),

            initialize: function (options) {
                this.options = options || {};

                if(!this.options.model) {
                    this.model = new app.models.Course();
                }
            },

            render: function () {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }
        });

    // export the Schedule collection
    app.views|| (app.views = {});
    app.views.CourseView = CourseView;

}(this));