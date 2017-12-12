!function(s){var t=s.app||(s.app={}),e=s.Backbone.Model.extend({defaults:function(){return{name:"",code:"",instructor:"",classes:[]}},addClass:function(s){if(_.isObject(s)&&s.hasOwnProperty("day")&&s.hasOwnProperty("start")&&s.hasOwnProperty("end"))return this.attributes.classes.push(s),this.trigger("change"),this.isValid()},removeClass:function(s){var t;if(_.isNumber(s)){if(s>=0&&s<this.attributes.classes.length)return this.attributes.classes.splice(s,1)}else if(_.isObject(s)&&(t=this.attributes.classes.indexOf(s))>-1)return this.attributes.classes.splice(t,1)},validate:function(s){var t=[];if(s.hasOwnProperty("name")&&_.isEmpty(s.name)&&t.push({attr:"name",message:"Course.name must not be an empty string."}),s.hasOwnProperty("code")&&_.isEmpty(s.code)&&t.push({attr:"code",message:"Course.code must not be an empty string."}),s.hasOwnProperty("instructor")&&_.isEmpty(s.instructor)&&t.push({attr:"instructor",message:"Course.instructor must not be an empty string."}),s.hasOwnProperty("classes")&&!_.isArray(s.classes)?t.push({attr:"classes",message:"Course.classes must be an array."}):s.classes.length>0&&s.classes.forEach(function(s){s.hasOwnProperty("day")&&s.hasOwnProperty("start")&&s.hasOwnProperty("end")||t.push({attr:"classes",message:"Course.classes must be an array of {day, start, end} objects."})}),t.length>0)return t}});t.models||(t.models={}),t.models.Course=e}(this);