!function(e){var o=e.app||(e.app={}),t=e.Backbone.Collection.extend({model:o.models.Course,url:"/courses",localStorage:new Backbone.LocalStorage("Schedule"),forDay:function(e){return this.filter(function(o){var t;return o.get("classes").forEach(function(o){t=o.day.toLowerCase()===e.toLowerCase()}),t})},forCode:function(e){return this.filter(function(o){return o.get("code").toLowerCase()===e.toLowerCase()})},forName:function(e){return this.filter(function(o){return o.get("name").toLowerCase()===e.toLowerCase()})},forInstructor:function(e){return this.filter(function(o){return o.get("instructor").toLowerCase()===e.toLowerCase()})}});o.collections||(o.collections={}),o.collections.Schedule=t}(this);