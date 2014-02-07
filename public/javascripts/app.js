!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var t={},s={},o=function(e,t){return{}.hasOwnProperty.call(e,t)},n=function(e,t){var s,o,n=[];s=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var r=0,a=s.length;a>r;r++)o=s[r],".."===o?n.pop():"."!==o&&""!==o&&n.push(o);return n.join("/")},r=function(e){return e.split("/").slice(0,-1).join("/")},a=function(t){return function(s){var o=r(t),a=n(o,s);return e.require(a,t)}},i=function(e,t){var o={id:e,exports:{}};return s[e]=o,t(o.exports,a(e),o),o.exports},u=function(e,r){var a=n(e,".");if(null==r&&(r="/"),o(s,a))return s[a].exports;if(o(t,a))return i(a,t[a]);var u=n(a,"./index");if(o(s,u))return s[u].exports;if(o(t,u))return i(u,t[u]);throw new Error('Cannot find module "'+e+'" from "'+r+'"')},p=function(e,s){if("object"==typeof e)for(var n in e)o(e,n)&&(t[n]=e[n]);else t[e]=s},h=function(){var e=[];for(var s in t)o(t,s)&&e.push(s);return e};e.require=u,e.require.define=p,e.require.register=p,e.require.list=h,e.require.brunch=!0}}(),require.register("config/app",function(e,t,s){s.exports=Em.Application.create({LOG_TRANSITIONS:!0,LOG_TRANSITIONS_INTERNAL:!0})}),require.register("config/router",function(){App.Router.reopen({location:"history"}),App.Router.map(function(){this.resource("todos",function(){this.route("create"),this.resource("todo",{path:":todo_id"})}),this.route("about")})}),require.register("config/store",function(){App.Adapter=DS.RESTAdapter.extend({namespace:"api"}),App.ApplicationSerliazer=DS.RESTSerializer.extend({normalize:function(e,t,s){return t.id=t._id,delete t._id,this._super(e,t,s)}}),App.Store=DS.Store.extend({adapter:App.Adapter})}),require.register("controllers/TodosController",function(e,t,s){"use strict";s.exports=App.TodosController=Ember.ArrayController.extend({task:null,content:[],completedTasks:function(){return this.filterBy("isCompleted",!0).length}.property("content.@each.isCompleted"),incompleteTasks:function(){return this.filterBy("isCompleted",!1).length}.property("content.@each.isCompleted"),actions:{createTodo:function(){var e=this.get("task"),t=this.store.createRecord("todo",{task:e,isCompleted:!1});t.save(),this.get("content").pushObject(t),this.set("task",null)},removeTodo:function(e){e.deleteRecord(),e.save()},completeTodo:function(e){e.toggleProperty("isCompleted"),e.save()},showComplete:function(){},showIncomplete:function(){},clear:function(){this.get("content").filter(function(e){return e.get("isCompleted")===!0}).forEach(function(e){e.deleteRecord(),e.save()})}}})}),require.register("initialize",function(e,t){"use strict";window.App=t("config/app"),t("config/router"),t("config/store");var s=["initializers","mixins","routes","models","views","controllers","helpers","templates","components"];s.forEach(function(e){window.require.list().filter(function(t){return new RegExp("^"+e+"/").test(t)}).forEach(function(e){t(e)})})}),require.register("models/Todo",function(e,t,s){"use strict";App.TodoSerializer=App.ApplicationSerliazer.extend(),s.exports=App.Todo=DS.Model.extend({task:DS.attr("string"),isCompleted:DS.attr("boolean")})}),require.register("routes/IndexRoute",function(e,t,s){"use strict";s.exports=App.IndexRoute=Ember.Route.extend({beforeModel:function(){this.transitionTo("todos")}})}),require.register("routes/TodosRoute",function(e,t,s){"use strict";s.exports=App.TodosRoute=Ember.Route.extend({model:function(){return this.get("store").find("todo")},setupController:function(e,t){e.set("content",t)}})}),require.register("templates/application",function(e,t,s){s.exports=Ember.TEMPLATES.application=Ember.Handlebars.template(function(e,t,s,o,n){function r(e,t){t.buffer.push("Todos")}function a(e,t){t.buffer.push("About")}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,Ember.Handlebars.helpers),n=n||{};var i,u,p,h,c,l="",f=this,d=s.helperMissing,b=this.escapeExpression;return n.buffer.push("<h1>Brunch &amp; Express Todo Demo</h1>\n\n<nav>\n  <ul>\n    <li>"),p={},h={},c={hash:{},inverse:f.noop,fn:f.program(1,r,n),contexts:[t],types:["STRING"],hashContexts:h,hashTypes:p,data:n},i=s["link-to"]||t&&t["link-to"],u=i?i.call(t,"todos",c):d.call(t,"link-to","todos",c),(u||0===u)&&n.buffer.push(u),n.buffer.push("</li>\n    <li>"),p={},h={},c={hash:{},inverse:f.noop,fn:f.program(3,a,n),contexts:[t],types:["STRING"],hashContexts:h,hashTypes:p,data:n},i=s["link-to"]||t&&t["link-to"],u=i?i.call(t,"about",c):d.call(t,"link-to","about",c),(u||0===u)&&n.buffer.push(u),n.buffer.push("</li>\n  </ul>\n</nav>\n\n"),p={},h={},n.buffer.push(b(s._triageMustache.call(t,"outlet",{hash:{},contexts:[t],types:["ID"],hashContexts:h,hashTypes:p,data:n}))),n.buffer.push("\n"),l})}),require.register("templates/todos",function(e,t,s){s.exports=Ember.TEMPLATES.todos=Ember.Handlebars.template(function(e,t,s,o,n){function r(e,t){var o,n,r,i="";return t.buffer.push('\n  <section id="todo-list">\n    <ul>\n      '),n={},r={},o=s.each.call(e,"todo","in","content",{hash:{},inverse:b.noop,fn:b.program(2,a,t),contexts:[e,e,e],types:["ID","ID","ID"],hashContexts:r,hashTypes:n,data:t}),(o||0===o)&&t.buffer.push(o),t.buffer.push('\n    </ul>\n  </section>\n  <footer id="todo-list-footer">\n    <span class="view-complete"><button type="button" '),n={},r={},t.buffer.push(d(s.action.call(e,"showComplete",{hash:{},contexts:[e],types:["STRING"],hashContexts:r,hashTypes:n,data:t}))),t.buffer.push('>Show complete</button></span>\n    <span class="view-incomplete"><button type="button" '),n={},r={},t.buffer.push(d(s.action.call(e,"showIncomplete",{hash:{},contexts:[e],types:["STRING"],hashContexts:r,hashTypes:n,data:t}))),t.buffer.push('>Show incomplete</button></span>\n    <span class="clear"><button type="reset" '),n={},r={},t.buffer.push(d(s.action.call(e,"clear",{hash:{},contexts:[e],types:["STRING"],hashContexts:r,hashTypes:n,data:t}))),t.buffer.push('>Clear complete</button></span>\n    <span class="count"><strong>Tasks:</strong> '),n={},r={},t.buffer.push(d(s._triageMustache.call(e,"content.length",{hash:{},contexts:[e],types:["ID"],hashContexts:r,hashTypes:n,data:t}))),t.buffer.push('</span>\n    <span class="incomplete-tasks"><strong>Remaining:</strong> '),n={},r={},t.buffer.push(d(s._triageMustache.call(e,"incompleteTasks",{hash:{},contexts:[e],types:["ID"],hashContexts:r,hashTypes:n,data:t}))),t.buffer.push('</span>\n    <span class="completed"><strong>Done:</strong> '),n={},r={},t.buffer.push(d(s._triageMustache.call(e,"completedTasks",{hash:{},contexts:[e],types:["ID"],hashContexts:r,hashTypes:n,data:t}))),t.buffer.push("</span>\n  </footer>\n"),i}function a(e,t){var o,n,r,a,i="";return t.buffer.push('\n        <li>\n          <div class="completed">\n            <!--class="complete fa fa-check" -->\n            <button '),n={"class":e},r={"class":"STRING"},a={hash:{"class":":complete :fa :fa-check todo.isCompleted:done:"},contexts:[],types:[],hashContexts:n,hashTypes:r,data:t},t.buffer.push(d((o=s["bind-attr"]||e&&e["bind-attr"],o?o.call(e,a):f.call(e,"bind-attr",a)))),t.buffer.push(" "),r={},n={},t.buffer.push(d(s.action.call(e,"completeTodo","todo",{hash:{},contexts:[e,e],types:["STRING","ID"],hashContexts:n,hashTypes:r,data:t}))),t.buffer.push("></button>\n          </div>\n          <div "),n={"class":e},r={"class":"STRING"},a={hash:{"class":":task todo.isCompleted:done:"},contexts:[],types:[],hashContexts:n,hashTypes:r,data:t},t.buffer.push(d((o=s["bind-attr"]||e&&e["bind-attr"],o?o.call(e,a):f.call(e,"bind-attr",a)))),t.buffer.push(">\n            "),r={},n={},t.buffer.push(d(s._triageMustache.call(e,"todo.task",{hash:{},contexts:[e],types:["ID"],hashContexts:n,hashTypes:r,data:t}))),t.buffer.push('\n          </div>\n          <div class="actions">\n            <button class="remove fa fa-times" type="button" class="remove" '),r={},n={},t.buffer.push(d(s.action.call(e,"removeTodo","todo",{hash:{},contexts:[e,e],types:["STRING","ID"],hashContexts:n,hashTypes:r,data:t}))),t.buffer.push("></button>\n          </div>\n        </li>\n      "),i}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,Ember.Handlebars.helpers),n=n||{};var i,u,p,h,c,l="",f=s.helperMissing,d=this.escapeExpression,b=this;return n.buffer.push("<header>\n  "),p={id:t,type:t,valueBinding:t,action:t,placeholder:t},h={id:"STRING",type:"STRING",valueBinding:"STRING",action:"STRING",placeholder:"STRING"},c={hash:{id:"new-todo",type:"text",valueBinding:"task",action:"createTodo",placeholder:"What do you need to do?"},contexts:[],types:[],hashContexts:p,hashTypes:h,data:n},n.buffer.push(d((i=s.input||t&&t.input,i?i.call(t,c):f.call(t,"input",c)))),n.buffer.push("\n</header>\n"),h={},p={},u=s["if"].call(t,"length",{hash:{},inverse:b.noop,fn:b.program(1,r,n),contexts:[t],types:["ID"],hashContexts:p,hashTypes:h,data:n}),(u||0===u)&&n.buffer.push(u),n.buffer.push("\n"),l})}),require.register("views/TodosView",function(e,t,s){"use strict";s.exports=App.TodosView=Ember.View.extend({focusInput:function(){this.$("#new-todo").focus()}.on("didInsertElement")})});