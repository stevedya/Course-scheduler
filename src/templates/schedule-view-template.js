(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['schedule-view-template'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <ul class=\"list-group\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.courses : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "            <li class=\"list-group-item\">\r\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.code : stack1), depth0))
    + ": "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + " <a href=\"#\" class=\"edit\" data-id=\""
    + alias2(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"cid","hash":{},"data":data}) : helper)))
    + "\"><i\r\n                    class=\"fas fa-edit\"></i></a>\r\n                <a href=\"#\" class=\"delete\" data-id=\""
    + alias2(((helper = (helper = helpers["delete"] || (depth0 != null ? depth0["delete"] : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"delete","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fas fa-trash-alt\"></i></a>\r\n                <table border=\"1\">\r\n                    <tr>\r\n                        <th>Day</th>\r\n                        <th>Start</th>\r\n                        <th>End</th>\r\n                    </tr>\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.classes : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </table>\r\n            </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <tr>\r\n                            <td>"
    + alias4(((helper = (helper = helpers.day || (depth0 != null ? depth0.day : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"day","hash":{},"data":data}) : helper)))
    + "</td>\r\n                            <td>"
    + alias4(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data}) : helper)))
    + "</td>\r\n                            <td>"
    + alias4(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"end","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        </tr>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <p>No Courses</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2>Schedule Display</h2>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.courses : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();