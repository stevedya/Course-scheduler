!function(e){var s=e.app||(e.app={}),t=e.Backbone.View.extend({tagName:"div",template:Handlebars.compile($("#course-view-template").html()),errorTemplate:Handlebars.compile($("#course-view-errors-template").html()),events:{"submit .course-form":"addUpdateCourse","click .btn.add-section":"addSection","click .btn.add-class":"addClass","click .btn.cancel-class":"resetClassForm","click .btn.close-course":"removeView"},initialize:function(e){this.options=e||{},this.newCourse=!1,this.options.model||(this.model=new s.models.Course({}),this.newCourse=!0),this.listenTo(this.model,"change",this.render)},render:function(){return this.$el.html(this.template(this.model.attributes)),this.newCourse&&this.$el.find(".times").addClass("hidden"),this},renderErrors:function(){this.$el.find(".errors").html(this.errorTemplate({errors:this.model.validationError}))},removeView:function(){this.remove()},addSection:function(e){this.$el.find(".time-controls").removeClass("hidden"),this.$el.find(".btn-add-course-time").addClass("hidden"),e.preventDefault()},resetClassForm:function(){this.$el.find(".time-controls").addClass("hidden"),this.$el.find(".btn-add-course-time").removeClass("hidden"),this.$el.find("#course-time-day")[0].options[0].selected="selected",this.$el.find("#course-time-start").val(""),this.$el.find("#course-time-end").val("")},addClass:function(){var e=this.$el.find("select#course-time-day").val(),s=this.$el.find("input#course-time-start").val(),t=this.$el.find("input#course-time-end").val();this.model.addClass({day:e,start:s,end:t}),this.model.isValid()?this.model.save():this.renderErrors()},addUpdateCourse:function(e){this.model.set({code:this.$el.find("input#course-code").val(),name:this.$el.find("input#course-name").val(),instructor:this.$el.find("input#course-instructor").val()},{validate:!0}),this.model.isValid()?(this.newCourse&&(s.schedule.add(this.model),this.newCourse=!1,this.render(),s.router.navigate("courses/"+this.model.id)),this.model.save()):this.renderErrors(),e.preventDefault()}});s.views||(s.views={}),s.views.CourseView=t}(this);