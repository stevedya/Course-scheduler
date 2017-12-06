(function(exports) {
    var app = exports.app || (exports.app = {}),

        AppRouter = exports.Backbone.Router.extend({
            routes: {
                '': 'index', // # index route
                'courses/:id': 'renderCourse'  // #course/12
            },

            index: function() {
                app.schedule.fetch();
            },

            renderCourse: function(id) {
                // fake evt obj
                var evt = {
                    preventDefault: function () { return false;}
                }
                app.schedule.fetch();
                app.appView.renderCourseView(evt, app.schedule.get(id));
            }

        });

    // export the Schedule collection
    app.routers || (app.routers = {});
    app.routers.AppRouter = AppRouter;

}(this));