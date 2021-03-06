(function(exports) {

	var app = exports.app || (exports.app = {});

	// setup required app objects
	app.schedule = new app.collections.Schedule();
	app.appView = new app.views.AppView();

    //fire up the router
    app.router = new app.routers.AppRouter();
    Backbone.history.start();

}(this));