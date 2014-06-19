(function() {
window.Bobcat = window.$B = window.Bobcat || {}, "function" == typeof $B.timerCheck && $B.timerCheck("application or application-editor.js run"), 
window.console || (window.console = {
log:function() {},
error:function() {},
warn:function() {}
});
}).call(this), function(e, t) {
e.rails !== t && e.error("jquery-ujs has already been loaded!");
var o;
e.rails = o = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
buttonClickSelector:"button[data-remote]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input[type=file]",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(t) {
var o = e('meta[name="csrf-token"]').attr("content");
o && t.setRequestHeader("X-CSRF-Token", o);
},
fire:function(t, o, n) {
var i = e.Event(o);
return t.trigger(i, n), i.result !== !1;
},
confirm:function(e) {
return confirm(e);
},
ajax:function(t) {
return e.ajax(t);
},
href:function(e) {
return e.attr("href");
},
handleRemote:function(n) {
var i, r, a, s, l, c, u, d;
if (o.fire(n, "ajax:before")) {
if (s = n.data("cross-domain"), l = s === t ? null :s, c = n.data("with-credentials") || null, 
u = n.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, n.is("form")) {
i = n.attr("method"), r = n.attr("action"), a = n.serializeArray();
var p = n.data("ujs:submit-button");
p && (a.push(p), n.data("ujs:submit-button", null));
} else n.is(o.inputChangeSelector) ? (i = n.data("method"), r = n.data("url"), a = n.serialize(), 
n.data("params") && (a = a + "&" + n.data("params"))) :n.is(o.buttonClickSelector) ? (i = n.data("method") || "get", 
r = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) :(i = n.data("method"), 
r = o.href(n), a = n.data("params") || null);
d = {
type:i || "GET",
data:a,
dataType:u,
beforeSend:function(e, i) {
return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), 
o.fire(n, "ajax:beforeSend", [ e, i ]);
},
success:function(e, t, o) {
n.trigger("ajax:success", [ e, t, o ]);
},
complete:function(e, t) {
n.trigger("ajax:complete", [ e, t ]);
},
error:function(e, t, o) {
n.trigger("ajax:error", [ e, t, o ]);
},
crossDomain:l
}, c && (d.xhrFields = {
withCredentials:c
}), r && (d.url = r);
var h = o.ajax(d);
return n.trigger("ajax:send", h), h;
}
return !1;
},
handleMethod:function(n) {
var i = o.href(n), r = n.data("method"), a = n.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), c = e('<form method="post" action="' + i + '"></form>'), u = '<input name="_method" value="' + r + '" type="hidden" />';
l !== t && s !== t && (u += '<input name="' + l + '" value="' + s + '" type="hidden" />'), 
a && c.attr("target", a), c.hide().append(u).appendTo("body"), c.submit();
},
disableFormElements:function(t) {
t.find(o.disableSelector).each(function() {
var t = e(this), o = t.is("button") ? "html" :"val";
t.data("ujs:enable-with", t[o]()), t[o](t.data("disable-with")), t.prop("disabled", !0);
});
},
enableFormElements:function(t) {
t.find(o.enableSelector).each(function() {
var t = e(this), o = t.is("button") ? "html" :"val";
t.data("ujs:enable-with") && t[o](t.data("ujs:enable-with")), t.prop("disabled", !1);
});
},
allowAction:function(e) {
var t, n = e.data("confirm"), i = !1;
return n ? (o.fire(e, "confirm") && (i = o.confirm(n), t = o.fire(e, "confirm:complete", [ i ])), 
i && t) :!0;
},
blankInputs:function(t, o, n) {
var i, r, a = e(), s = o || "input,textarea", l = t.find(s);
return l.each(function() {
if (i = e(this), r = i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") :i.val(), 
!r == !n) {
if (i.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + i.attr("name") + '"]').length) return !0;
a = a.add(i);
}
}), a.length ? a :!1;
},
nonBlankInputs:function(e, t) {
return o.blankInputs(e, t, !0);
},
stopEverything:function(t) {
return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), 
!1;
},
disableElement:function(e) {
e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
return o.stopEverything(e);
});
},
enableElement:function(e) {
e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), 
e.unbind("click.railsDisable");
}
}, o.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, n) {
e.crossDomain || o.CSRFProtection(n);
}), e(document).delegate(o.linkDisableSelector, "ajax:complete", function() {
o.enableElement(e(this));
}), e(document).delegate(o.linkClickSelector, "click.rails", function(n) {
var i = e(this), r = i.data("method"), a = i.data("params");
if (!o.allowAction(i)) return o.stopEverything(n);
if (i.is(o.linkDisableSelector) && o.disableElement(i), i.data("remote") !== t) {
if (!(!n.metaKey && !n.ctrlKey || r && "GET" !== r || a)) return !0;
var s = o.handleRemote(i);
return s === !1 ? o.enableElement(i) :s.error(function() {
o.enableElement(i);
}), !1;
}
return i.data("method") ? (o.handleMethod(i), !1) :void 0;
}), e(document).delegate(o.buttonClickSelector, "click.rails", function(t) {
var n = e(this);
return o.allowAction(n) ? (o.handleRemote(n), !1) :o.stopEverything(t);
}), e(document).delegate(o.inputChangeSelector, "change.rails", function(t) {
var n = e(this);
return o.allowAction(n) ? (o.handleRemote(n), !1) :o.stopEverything(t);
}), e(document).delegate(o.formSubmitSelector, "submit.rails", function(n) {
var i = e(this), r = i.data("remote") !== t, a = o.blankInputs(i, o.requiredInputSelector), s = o.nonBlankInputs(i, o.fileInputSelector);
if (!o.allowAction(i)) return o.stopEverything(n);
if (a && i.attr("novalidate") == t && o.fire(i, "ajax:aborted:required", [ a ])) return o.stopEverything(n);
if (r) {
if (s) {
setTimeout(function() {
o.disableFormElements(i);
}, 13);
var l = o.fire(i, "ajax:aborted:file", [ s ]);
return l || setTimeout(function() {
o.enableFormElements(i);
}, 13), l;
}
return o.handleRemote(i), !1;
}
setTimeout(function() {
o.disableFormElements(i);
}, 13);
}), e(document).delegate(o.formInputClickSelector, "click.rails", function(t) {
var n = e(this);
if (!o.allowAction(n)) return o.stopEverything(t);
var i = n.attr("name"), r = i ? {
name:i,
value:n.val()
} :null;
n.closest("form").data("ujs:submit-button", r);
}), e(document).delegate(o.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
this == t.target && o.disableFormElements(e(this));
}), e(document).delegate(o.formSubmitSelector, "ajax:complete.rails", function(t) {
this == t.target && o.enableFormElements(e(this));
}), e(function() {
var t = e("meta[name=csrf-token]").attr("content"), o = e("meta[name=csrf-param]").attr("content");
e('form input[name="' + o + '"]').val(t);
}));
}(jQuery), function() {
var e, t;
jQuery.uaMatch = function(e) {
e = e.toLowerCase();
var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
return {
browser:t[1] || "",
version:t[2] || "0"
};
}, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, 
t.version = e.version), t.chrome ? t.webkit = !0 :t.webkit && (t.safari = !0), jQuery.browser = t, 
jQuery.sub = function() {
function e(t, o) {
return new e.fn.init(t, o);
}
jQuery.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, 
e.sub = this.sub, e.fn.init = function(o, n) {
return n && n instanceof jQuery && !(n instanceof e) && (n = e(n)), jQuery.fn.init.call(this, o, n, t);
}, e.fn.init.prototype = e.fn;
var t = e(document);
return e;
};
}(), function(e) {
function t(e) {
return "object" == typeof e ? e :{
top:e,
left:e
};
}
var o = e.scrollTo = function(t, o, n) {
e(window).scrollTo(t, o, n);
};
o.defaults = {
axis:"xy",
duration:parseFloat(e.fn.jquery) >= 1.3 ? 0 :1
}, o.window = function() {
return e(window)._scrollable();
}, e.fn._scrollable = function() {
return this.map(function() {
var t = this, o = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
if (!o) return t;
var n = (t.contentWindow || t).document || t.ownerDocument || t;
return e.browser.safari || "BackCompat" == n.compatMode ? n.body :n.documentElement;
});
}, e.fn.scrollTo = function(n, i, r) {
return "object" == typeof i && (r = i, i = 0), "function" == typeof r && (r = {
onAfter:r
}), "max" == n && (n = 9e9), r = e.extend({}, o.defaults, r), i = i || r.speed || r.duration, 
r.queue = r.queue && r.axis.length > 1, r.queue && (i /= 2), r.offset = t(r.offset), 
r.over = t(r.over), this._scrollable().each(function() {
function a(e) {
c.animate(d, i, r.easing, e && function() {
e.call(this, n, r);
});
}
var s, l = this, c = e(l), u = n, d = {}, p = c.is("html,body");
switch (typeof u) {
case "number":
case "string":
if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(u)) {
u = t(u);
break;
}
u = e(u, this);

case "object":
(u.is || u.style) && (s = (u = e(u)).offset());
}
e.each(r.axis.split(""), function(e, t) {
var n = "x" == t ? "Left" :"Top", i = n.toLowerCase(), h = "scroll" + n, g = l[h], f = o.max(l, t);
if (s) d[h] = s[i] + (p ? 0 :g - c.offset()[i]), r.margin && (d[h] -= parseInt(u.css("margin" + n)) || 0, 
d[h] -= parseInt(u.css("border" + n + "Width")) || 0), d[h] += r.offset[i] || 0, 
r.over[i] && (d[h] += u["x" == t ? "width" :"height"]() * r.over[i]); else {
var m = u[i];
d[h] = m.slice && "%" == m.slice(-1) ? parseFloat(m) / 100 * f :m;
}
/^\d+$/.test(d[h]) && (d[h] = d[h] <= 0 ? 0 :Math.min(d[h], f)), !e && r.queue && (g != d[h] && a(r.onAfterFirst), 
delete d[h]);
}), a(r.onAfter);
}).end();
}, o.max = function(t, o) {
var n = "x" == o ? "Width" :"Height", i = "scroll" + n;
if (!e(t).is("html,body")) return t[i] - e(t)[n.toLowerCase()]();
var r = "client" + n, a = t.ownerDocument.documentElement, s = t.ownerDocument.body;
return Math.max(a[i], s[i]) - Math.min(a[r], s[r]);
};
}(jQuery), /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def:"easeOutQuad",
swing:function(e, t, o, n, i) {
return (t /= i / 2) < 1 ? n / 2 * t * t + o :-n / 2 * (--t * (t - 2) - 1) + o;
},
easeInQuad:function(e, t, o, n, i) {
return n * (t /= i) * t + o;
},
easeOutQuad:function(e, t, o, n, i) {
return -n * (t /= i) * (t - 2) + o;
},
easeInOutQuad:function(e, t, o, n, i) {
return (t /= i / 2) < 1 ? n / 2 * t * t + o :-n / 2 * (--t * (t - 2) - 1) + o;
},
easeInCubic:function(e, t, o, n, i) {
return n * (t /= i) * t * t + o;
},
easeOutCubic:function(e, t, o, n, i) {
return n * ((t = t / i - 1) * t * t + 1) + o;
},
easeInOutCubic:function(e, t, o, n, i) {
return (t /= i / 2) < 1 ? n / 2 * t * t * t + o :n / 2 * ((t -= 2) * t * t + 2) + o;
},
easeInQuart:function(e, t, o, n, i) {
return n * (t /= i) * t * t * t + o;
},
easeOutQuart:function(e, t, o, n, i) {
return -n * ((t = t / i - 1) * t * t * t - 1) + o;
},
easeInOutQuart:function(e, t, o, n, i) {
return (t /= i / 2) < 1 ? n / 2 * t * t * t * t + o :-n / 2 * ((t -= 2) * t * t * t - 2) + o;
},
easeInQuint:function(e, t, o, n, i) {
return n * (t /= i) * t * t * t * t + o;
},
easeOutQuint:function(e, t, o, n, i) {
return n * ((t = t / i - 1) * t * t * t * t + 1) + o;
},
easeInOutQuint:function(e, t, o, n, i) {
return (t /= i / 2) < 1 ? n / 2 * t * t * t * t * t + o :n / 2 * ((t -= 2) * t * t * t * t + 2) + o;
},
easeInSine:function(e, t, o, n, i) {
return -n * Math.cos(t / i * (Math.PI / 2)) + n + o;
},
easeOutSine:function(e, t, o, n, i) {
return n * Math.sin(t / i * (Math.PI / 2)) + o;
},
easeInOutSine:function(e, t, o, n, i) {
return -n / 2 * (Math.cos(Math.PI * t / i) - 1) + o;
},
easeInExpo:function(e, t, o, n, i) {
return 0 == t ? o :n * Math.pow(2, 10 * (t / i - 1)) + o;
},
easeOutExpo:function(e, t, o, n, i) {
return t == i ? o + n :n * (-Math.pow(2, -10 * t / i) + 1) + o;
},
easeInOutExpo:function(e, t, o, n, i) {
return 0 == t ? o :t == i ? o + n :(t /= i / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + o :n / 2 * (-Math.pow(2, -10 * --t) + 2) + o;
},
easeInCirc:function(e, t, o, n, i) {
return -n * (Math.sqrt(1 - (t /= i) * t) - 1) + o;
},
easeOutCirc:function(e, t, o, n, i) {
return n * Math.sqrt(1 - (t = t / i - 1) * t) + o;
},
easeInOutCirc:function(e, t, o, n, i) {
return (t /= i / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + o :n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + o;
},
easeInElastic:function(e, t, o, n, i) {
var r = 1.70158, a = 0, s = n;
if (0 == t) return o;
if (1 == (t /= i)) return o + n;
if (a || (a = .3 * i), s < Math.abs(n)) {
s = n;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(n / s);
return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * i - r) * Math.PI / a)) + o;
},
easeOutElastic:function(e, t, o, n, i) {
var r = 1.70158, a = 0, s = n;
if (0 == t) return o;
if (1 == (t /= i)) return o + n;
if (a || (a = .3 * i), s < Math.abs(n)) {
s = n;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(n / s);
return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * i - r) * Math.PI / a) + n + o;
},
easeInOutElastic:function(e, t, o, n, i) {
var r = 1.70158, a = 0, s = n;
if (0 == t) return o;
if (2 == (t /= i / 2)) return o + n;
if (a || (a = .3 * i * 1.5), s < Math.abs(n)) {
s = n;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(n / s);
return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * i - r) * Math.PI / a) + o :s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * i - r) * Math.PI / a) * .5 + n + o;
},
easeInBack:function(e, t, o, n, i, r) {
return void 0 == r && (r = 1.70158), n * (t /= i) * t * ((r + 1) * t - r) + o;
},
easeOutBack:function(e, t, o, n, i, r) {
return void 0 == r && (r = 1.70158), n * ((t = t / i - 1) * t * ((r + 1) * t + r) + 1) + o;
},
easeInOutBack:function(e, t, o, n, i, r) {
return void 0 == r && (r = 1.70158), (t /= i / 2) < 1 ? n / 2 * t * t * (((r *= 1.525) + 1) * t - r) + o :n / 2 * ((t -= 2) * t * (((r *= 1.525) + 1) * t + r) + 2) + o;
},
easeInBounce:function(e, t, o, n, i) {
return n - jQuery.easing.easeOutBounce(e, i - t, 0, n, i) + o;
},
easeOutBounce:function(e, t, o, n, i) {
return (t /= i) < 1 / 2.75 ? 7.5625 * n * t * t + o :2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + o :2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + o :n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + o;
},
easeInOutBounce:function(e, t, o, n, i) {
return i / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, i) + o :.5 * jQuery.easing.easeOutBounce(e, 2 * t - i, 0, n, i) + .5 * n + o;
}
}), /*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function() {
var e = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
}, t = [].slice;
!function(e, t) {
return "function" == typeof define && define.amd ? define("waypoints", [ "jquery" ], function(o) {
return t(o, e);
}) :t(e.jQuery, e);
}(window, function(o, n) {
var i, r, a, s, l, c, u, d, p, h, g, f, m, v, b, w;
return i = o(n), d = e.call(n, "ontouchstart") >= 0, s = {
horizontal:{},
vertical:{}
}, l = 1, u = {}, c = "waypoints-context-id", g = "resize.waypoints", f = "scroll.waypoints", 
m = 1, v = "waypoints-waypoint-ids", b = "waypoint", w = "waypoints", r = function() {
function e(e) {
var t = this;
this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, 
this.id = "context" + l++, this.oldScroll = {
x:e.scrollLeft(),
y:e.scrollTop()
}, this.waypoints = {
horizontal:{},
vertical:{}
}, this.element[c] = this.id, u[this.id] = this, e.bind(f, function() {
var e;
return t.didScroll || d ? void 0 :(t.didScroll = !0, e = function() {
return t.doScroll(), t.didScroll = !1;
}, n.setTimeout(e, o[w].settings.scrollThrottle));
}), e.bind(g, function() {
var e;
return t.didResize ? void 0 :(t.didResize = !0, e = function() {
return o[w]("refresh"), t.didResize = !1;
}, n.setTimeout(e, o[w].settings.resizeThrottle));
});
}
return e.prototype.doScroll = function() {
var e, t = this;
return e = {
horizontal:{
newScroll:this.$element.scrollLeft(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left"
},
vertical:{
newScroll:this.$element.scrollTop(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up"
}
}, !d || e.vertical.oldScroll && e.vertical.newScroll || o[w]("refresh"), o.each(e, function(e, n) {
var i, r, a;
return a = [], r = n.newScroll > n.oldScroll, i = r ? n.forward :n.backward, o.each(t.waypoints[e], function(e, t) {
var o, i;
return n.oldScroll < (o = t.offset) && o <= n.newScroll ? a.push(t) :n.newScroll < (i = t.offset) && i <= n.oldScroll ? a.push(t) :void 0;
}), a.sort(function(e, t) {
return e.offset - t.offset;
}), r || a.reverse(), o.each(a, function(e, t) {
return t.options.continuous || e === a.length - 1 ? t.trigger([ i ]) :void 0;
});
}), this.oldScroll = {
x:e.horizontal.newScroll,
y:e.vertical.newScroll
};
}, e.prototype.refresh = function() {
var e, t, n, i = this;
return n = o.isWindow(this.element), t = this.$element.offset(), this.doScroll(), 
e = {
horizontal:{
contextOffset:n ? 0 :t.left,
contextScroll:n ? 0 :this.oldScroll.x,
contextDimension:this.$element.width(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left",
offsetProp:"left"
},
vertical:{
contextOffset:n ? 0 :t.top,
contextScroll:n ? 0 :this.oldScroll.y,
contextDimension:n ? o[w]("viewportHeight") :this.$element.height(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up",
offsetProp:"top"
}
}, o.each(e, function(e, t) {
return o.each(i.waypoints[e], function(e, n) {
var i, r, a, s, l;
return i = n.options.offset, a = n.offset, r = o.isWindow(n.element) ? 0 :n.$element.offset()[t.offsetProp], 
o.isFunction(i) ? i = i.apply(n.element) :"string" == typeof i && (i = parseFloat(i), 
n.options.offset.indexOf("%") > -1 && (i = Math.ceil(t.contextDimension * i / 100))), 
n.offset = r - t.contextOffset + t.contextScroll - i, n.options.onlyOnScroll && null != a || !n.enabled ? void 0 :null !== a && a < (s = t.oldScroll) && s <= n.offset ? n.trigger([ t.backward ]) :null !== a && a > (l = t.oldScroll) && l >= n.offset ? n.trigger([ t.forward ]) :null === a && t.oldScroll >= n.offset ? n.trigger([ t.forward ]) :void 0;
});
});
}, e.prototype.checkEmpty = function() {
return o.isEmptyObject(this.waypoints.horizontal) && o.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([ g, f ].join(" ")), 
delete u[this.id]) :void 0;
}, e;
}(), a = function() {
function e(e, t, n) {
var i, r;
"bottom-in-view" === n.offset && (n.offset = function() {
var e;
return e = o[w]("viewportHeight"), o.isWindow(t.element) || (e = t.$element.height()), 
e - o(this).outerHeight();
}), this.$element = e, this.element = e[0], this.axis = n.horizontal ? "horizontal" :"vertical", 
this.callback = n.handler, this.context = t, this.enabled = n.enabled, this.id = "waypoints" + m++, 
this.offset = null, this.options = n, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, 
i = null != (r = this.element[v]) ? r :[], i.push(this.id), this.element[v] = i;
}
return e.prototype.trigger = function(e) {
return this.enabled ? (null != this.callback && this.callback.apply(this.element, e), 
this.options.triggerOnce ? this.destroy() :void 0) :void 0;
}, e.prototype.disable = function() {
return this.enabled = !1;
}, e.prototype.enable = function() {
return this.context.refresh(), this.enabled = !0;
}, e.prototype.destroy = function() {
return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], 
this.context.checkEmpty();
}, e.getWaypointsByElement = function(e) {
var t, n;
return (n = e[v]) ? (t = o.extend({}, s.horizontal, s.vertical), o.map(n, function(e) {
return t[e];
})) :[];
}, e;
}(), h = {
init:function(e, t) {
var n;
return t = o.extend({}, o.fn[b].defaults, t), null == (n = t.handler) && (t.handler = e), 
this.each(function() {
var e, n, i, s;
return e = o(this), i = null != (s = t.context) ? s :o.fn[b].defaults.context, o.isWindow(i) || (i = e.closest(i)), 
i = o(i), n = u[i[0][c]], n || (n = new r(i)), new a(e, n, t);
}), o[w]("refresh"), this;
},
disable:function() {
return h._invoke.call(this, "disable");
},
enable:function() {
return h._invoke.call(this, "enable");
},
destroy:function() {
return h._invoke.call(this, "destroy");
},
prev:function(e, t) {
return h._traverse.call(this, e, t, function(e, t, o) {
return t > 0 ? e.push(o[t - 1]) :void 0;
});
},
next:function(e, t) {
return h._traverse.call(this, e, t, function(e, t, o) {
return t < o.length - 1 ? e.push(o[t + 1]) :void 0;
});
},
_traverse:function(e, t, i) {
var r, a;
return null == e && (e = "vertical"), null == t && (t = n), a = p.aggregate(t), 
r = [], this.each(function() {
var t;
return t = o.inArray(this, a[e]), i(r, t, a[e]);
}), this.pushStack(r);
},
_invoke:function(e) {
return this.each(function() {
var t;
return t = a.getWaypointsByElement(this), o.each(t, function(t, o) {
return o[e](), !0;
});
}), this;
}
}, o.fn[b] = function() {
var e, n;
return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], h[n] ? h[n].apply(this, e) :o.isFunction(n) ? h.init.apply(this, arguments) :o.isPlainObject(n) ? h.init.apply(this, [ null, n ]) :n ? o.error("The " + n + " method does not exist in jQuery Waypoints.") :o.error("jQuery Waypoints needs a callback function or handler option.");
}, o.fn[b].defaults = {
context:n,
continuous:!0,
enabled:!0,
horizontal:!1,
offset:0,
triggerOnce:!1
}, p = {
refresh:function() {
return o.each(u, function(e, t) {
return t.refresh();
});
},
viewportHeight:function() {
var e;
return null != (e = n.innerHeight) ? e :i.height();
},
aggregate:function(e) {
var t, n, i;
return t = s, e && (t = null != (i = u[o(e)[0][c]]) ? i.waypoints :void 0), t ? (n = {
horizontal:[],
vertical:[]
}, o.each(n, function(e, i) {
return o.each(t[e], function(e, t) {
return i.push(t);
}), i.sort(function(e, t) {
return e.offset - t.offset;
}), n[e] = o.map(i, function(e) {
return e.element;
}), n[e] = o.unique(n[e]);
}), n) :[];
},
above:function(e) {
return null == e && (e = n), p._filter(e, "vertical", function(e, t) {
return t.offset <= e.oldScroll.y;
});
},
below:function(e) {
return null == e && (e = n), p._filter(e, "vertical", function(e, t) {
return t.offset > e.oldScroll.y;
});
},
left:function(e) {
return null == e && (e = n), p._filter(e, "horizontal", function(e, t) {
return t.offset <= e.oldScroll.x;
});
},
right:function(e) {
return null == e && (e = n), p._filter(e, "horizontal", function(e, t) {
return t.offset > e.oldScroll.x;
});
},
enable:function() {
return p._invoke("enable");
},
disable:function() {
return p._invoke("disable");
},
destroy:function() {
return p._invoke("destroy");
},
extendFn:function(e, t) {
return h[e] = t;
},
_invoke:function(e) {
var t;
return t = o.extend({}, s.vertical, s.horizontal), o.each(t, function(t, o) {
return o[e](), !0;
});
},
_filter:function(e, t, n) {
var i, r;
return (i = u[o(e)[0][c]]) ? (r = [], o.each(i.waypoints[t], function(e, t) {
return n(i, t) ? r.push(t) :void 0;
}), r.sort(function(e, t) {
return e.offset - t.offset;
}), o.map(r, function(e) {
return e.element;
})) :[];
}
}, o[w] = function() {
var e, o;
return o = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], p[o] ? p[o].apply(null, e) :p.aggregate.call(null, o);
}, o[w].settings = {
resizeThrottle:100,
scrollThrottle:30
}, i.on("load.waypoints", function() {
return o[w]("refresh");
});
});
}.call(this), /*!
 * jQuery Templates Plugin
 * http://github.com/jquery/jquery-tmpl
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
function(e) {
function t(t, o, n, i) {
var r = {
data:i || (o ? o.data :{}),
_wrap:o ? o._wrap :null,
tmpl:null,
parent:o || null,
nodes:[],
calls:c,
nest:u,
wrap:d,
html:p,
update:h
};
return t && e.extend(r, t, {
nodes:[],
parent:o
}), n && (r.tmpl = n, r._ctnt = r._ctnt || r.tmpl(e, r), r.key = ++_, (x.length ? w :b)[_] = r), 
r;
}
function o(t, i, r) {
var a, s = r ? e.map(r, function(e) {
return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + m + '="' + t.key + '" $2') :e :o(e, t, e._ctnt);
}) :t;
return i ? s :(s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, o, i, r) {
a = e(i).get(), l(a), o && (a = n(o).concat(a)), r && (a = a.concat(n(r)));
}), a ? a :n(s));
}
function n(t) {
var o = document.createElement("div");
return o.innerHTML = t, e.makeArray(o.childNodes);
}
function i(t) {
return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, o, n, i, r, s, l) {
var c, u, d, p = e.tmpl.tag[n];
if (!p) throw "Template command not found: " + n;
return c = p._default || [], s && !/\w$/.test(r) && (r += s, s = ""), r ? (r = a(r), 
l = l ? "," + a(l) + ")" :s ? ")" :"", u = s ? r.indexOf(".") > -1 ? r + s :"(" + r + ").call($item" + l :r, 
d = s ? u :"(typeof(" + r + ")==='function'?(" + r + ").call($item):(" + r + "))") :d = u = c.$1 || "null", 
i = a(i), "');" + p[o ? "close" :"open"].split("$notnull_1").join(r ? "typeof(" + r + ")!=='undefined' && (" + r + ")!=null" :"true").split("$1a").join(d).split("$1").join(u).split("$2").join(i ? i.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(e, t, o, n) {
return n = n ? "," + n + ")" :o ? ")" :"", n ? "(" + t + ").call($item" + n :e;
}) :c.$2 || "") + "_.push('";
}) + "');}return _;");
}
function r(t, n) {
t._wrap = o(t, !0, e.isArray(n) ? n :[ v.test(n) ? n :e(n).html() ]).join("");
}
function a(e) {
return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") :null;
}
function s(e) {
var t = document.createElement("div");
return t.appendChild(e.cloneNode(!0)), t.innerHTML;
}
function l(o) {
function n(o) {
function n(e) {
e += c, a = u[e] = u[e] || t(a, b[a.parent.key + c] || a.parent, null, !0);
}
var i, r, a, s, l = o;
if (s = o.getAttribute(m)) {
for (;l.parentNode && 1 === (l = l.parentNode).nodeType && !(i = l.getAttribute(m)); ) ;
i !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 :l.getAttribute(m) || 0 :0, 
(a = b[s]) || (a = w[s], a = t(a, b[l] || w[l], null, !0), a.key = ++_, b[_] = a), 
k && n(s)), o.removeAttribute(m);
} else k && (a = e.data(o, "tmplItem")) && (n(a.key), b[a.key] = a, l = e.data(o.parentNode, "tmplItem"), 
l = l ? l.key :0);
if (a) {
for (r = a; r && r.key != l; ) r.nodes.push(o), r = r.parent;
delete a._ctnt, delete a._wrap, e.data(o, "tmplItem", a);
}
}
var i, r, a, s, l, c = "_" + k, u = {};
for (a = 0, s = o.length; s > a; a++) if (1 === (i = o[a]).nodeType) {
for (r = i.getElementsByTagName("*"), l = r.length - 1; l >= 0; l--) n(r[l]);
n(i);
}
}
function c(e, t, o, n) {
return e ? (x.push({
_:e,
tmpl:t,
item:this,
data:o,
options:n
}), void 0) :x.pop();
}
function u(t, o, n) {
return e.tmpl(e.template(t), o, n, this);
}
function d(t, o) {
var n = t.options || {};
return n.wrapped = o, e.tmpl(e.template(t.tmpl), t.data, n, t.item);
}
function p(t, o) {
var n = this._wrap;
return e.map(e(e.isArray(n) ? n.join("") :n).filter(t || "*"), function(e) {
return o ? e.innerText || e.textContent :e.outerHTML || s(e);
});
}
function h() {
var t = this.nodes;
e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove();
}
var g, f = e.fn.domManip, m = "_tmplitem", v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, b = {}, w = {}, y = {
key:0,
data:{}
}, _ = 0, k = 0, x = [];
e.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(t, o) {
e.fn[t] = function(n) {
var i, r, a, s, l = [], c = e(n), u = 1 === this.length && this[0].parentNode;
if (g = b || {}, u && 11 === u.nodeType && 1 === u.childNodes.length && 1 === c.length) c[o](this[0]), 
l = this; else {
for (r = 0, a = c.length; a > r; r++) k = r, i = (r > 0 ? this.clone(!0) :this).get(), 
e.fn[o].apply(e(c[r]), i), l = l.concat(i);
k = 0, l = this.pushStack(l, t, c.selector);
}
return s = g, g = null, e.tmpl.complete(s), l;
};
}), e.fn.extend({
tmpl:function(t, o, n) {
return e.tmpl(this[0], t, o, n);
},
tmplItem:function() {
return e.tmplItem(this[0]);
},
template:function(t) {
return e.template(t, this[0]);
},
domManip:function(t, o, n) {
if (t[0] && t[0].nodeType) {
for (var i, r = e.makeArray(arguments), a = t.length, s = 0; a > s && !(i = e.data(t[s++], "tmplItem")); ) ;
a > 1 && (r[0] = [ e.makeArray(t) ]), i && k && (r[2] = function(t) {
e.tmpl.afterManip(this, t, n);
}), f.apply(this, r);
} else f.apply(this, arguments);
return k = 0, g || e.tmpl.complete(b), this;
}
}), e.extend({
tmpl:function(n, i, a, s) {
var l, c = !s;
if (c) s = y, n = e.template[n] || e.template(null, n), w = {}; else if (!n) return n = s.tmpl, 
b[s.key] = s, s.nodes = [], s.wrapped && r(s, s.wrapped), e(o(s, null, s.tmpl(e, s)));
return n ? ("function" == typeof i && (i = i.call(s || {})), a && a.wrapped && r(a, a.wrapped), 
l = e.isArray(i) ? e.map(i, function(e) {
return e ? t(a, s, n, e) :null;
}) :[ t(a, s, n, i) ], c ? e(o(s, null, l)) :l) :[];
},
tmplItem:function(t) {
var o;
for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(o = e.data(t, "tmplItem")) && (t = t.parentNode); ) ;
return o || y;
},
template:function(t, o) {
return o ? ("string" == typeof o ? o = i(o) :o instanceof e && (o = o[0] || {}), 
o.nodeType && (o = e.data(o, "tmpl") || e.data(o, "tmpl", i(o.innerHTML))), "string" == typeof t ? e.template[t] = o :o) :t ? "string" != typeof t ? e.template(null, t) :e.template[t] || e.template(null, v.test(t) ? t :e(t)) :null;
},
encode:function(e) {
return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
}
}), e.extend(e.tmpl, {
tag:{
tmpl:{
_default:{
$2:"null"
},
open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"
},
wrap:{
_default:{
$2:"null"
},
open:"$item.calls(_,$1,$2);_=[];",
close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"
},
each:{
_default:{
$2:"$index, $value"
},
open:"if($notnull_1){$.each($1a,function($2){with(this){",
close:"}});}"
},
"if":{
open:"if(($notnull_1) && $1a){",
close:"}"
},
"else":{
_default:{
$1:"true"
},
open:"}else if(($notnull_1) && $1a){"
},
html:{
open:"if($notnull_1){_.push($1a);}"
},
"=":{
_default:{
$1:"$data"
},
open:"if($notnull_1){_.push($.encode($1a));}"
},
"!":{
open:""
}
},
complete:function() {
b = {};
},
afterManip:function(t, o, n) {
var i = 11 === o.nodeType ? e.makeArray(o.childNodes) :1 === o.nodeType ? [ o ] :[];
n.call(t, o), l(i), k++;
}
});
}(jQuery), function(e) {
function t() {
var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
window.console && window.console.log ? window.console.log(e) :window.opera && window.opera.postError && window.opera.postError(e);
}
e.fn.ajaxSubmit = function(o) {
function n(n) {
function r(e) {
var t = e.contentWindow ? e.contentWindow.document :e.contentDocument ? e.contentDocument :e.document;
return t;
}
function a() {
function o() {
try {
var e = r(f).readyState;
t("state = " + e), "uninitialized" == e.toLowerCase() && setTimeout(o, 50);
} catch (n) {
t("Server abort: ", n, " (", n.name, ")"), l(S), y && clearTimeout(y), y = void 0;
}
}
var n = s.attr("target"), a = s.attr("action");
_.setAttribute("target", h), i || _.setAttribute("method", "POST"), a != d.url && _.setAttribute("action", d.url), 
d.skipEncodingOverride || i && !/post/i.test(i) || s.attr({
encoding:"multipart/form-data",
enctype:"multipart/form-data"
}), d.timeout && (y = setTimeout(function() {
w = !0, l(x);
}, d.timeout));
var c = [];
try {
if (d.extraData) for (var u in d.extraData) c.push(e('<input type="hidden" name="' + u + '" />').attr("value", d.extraData[u]).appendTo(_)[0]);
d.iframeTarget || (g.appendTo("body"), f.attachEvent ? f.attachEvent("onload", l) :f.addEventListener("load", l, !1)), 
setTimeout(o, 15), _.submit();
} finally {
_.setAttribute("action", a), n ? _.setAttribute("target", n) :s.removeAttr("target"), 
e(c).remove();
}
}
function l(o) {
if (!m.aborted && !T) {
try {
E = r(f);
} catch (n) {
t("cannot access response document: ", n), o = S;
}
if (o === x && m) return m.abort("timeout"), void 0;
if (o == S && m) return m.abort("server abort"), void 0;
if (E && E.location.href != d.iframeSrc || w) {
f.detachEvent ? f.detachEvent("onload", l) :f.removeEventListener("load", l, !1);
var i, a = "success";
try {
if (w) throw "timeout";
var s = "xml" == d.dataType || E.XMLDocument || e.isXMLDoc(E);
if (t("isXml=" + s), !s && window.opera && (null == E.body || "" == E.body.innerHTML) && --$) return t("requeing onLoad callback, DOM not available"), 
setTimeout(l, 250), void 0;
var c = E.body ? E.body :E.documentElement;
m.responseText = c ? c.innerHTML :null, m.responseXML = E.XMLDocument ? E.XMLDocument :E, 
s && (d.dataType = "xml"), m.getResponseHeader = function(e) {
var t = {
"content-type":d.dataType
};
return t[e];
}, c && (m.status = Number(c.getAttribute("status")) || m.status, m.statusText = c.getAttribute("statusText") || m.statusText);
var u = d.dataType || "", h = /(json|script|text)/.test(u.toLowerCase());
if (h || d.textarea) {
var v = E.getElementsByTagName("textarea")[0];
if (v) m.responseText = v.value, m.status = Number(v.getAttribute("status")) || m.status, 
m.statusText = v.getAttribute("statusText") || m.statusText; else if (h) {
var b = E.getElementsByTagName("pre")[0], _ = E.getElementsByTagName("body")[0];
b ? m.responseText = b.textContent ? b.textContent :b.innerHTML :_ && (m.responseText = _.innerHTML);
}
} else "xml" != d.dataType || m.responseXML || null == m.responseText || (m.responseXML = I(m.responseText));
try {
C = A(m, d.dataType, d);
} catch (o) {
a = "parsererror", m.error = i = o || a;
}
} catch (o) {
t("error caught: ", o), a = "error", m.error = i = o || a;
}
m.aborted && (t("upload aborted"), a = null), m.status && (a = m.status >= 200 && m.status < 300 || 304 === m.status ? "success" :"error"), 
"success" === a ? (d.success && d.success.call(d.context, C, "success", m), p && e.event.trigger("ajaxSuccess", [ m, d ])) :a && (void 0 == i && (i = m.statusText), 
d.error && d.error.call(d.context, m, a, i), p && e.event.trigger("ajaxError", [ m, d, i ])), 
p && e.event.trigger("ajaxComplete", [ m, d ]), p && !--e.active && e.event.trigger("ajaxStop"), 
d.complete && d.complete.call(d.context, m, a), T = !0, d.timeout && clearTimeout(y), 
setTimeout(function() {
d.iframeTarget || g.remove(), m.responseXML = null;
}, 100);
}
}
}
var c, u, d, p, h, g, f, m, v, b, w, y, _ = s[0], k = !!e.fn.prop;
if (n) for (u = 0; u < n.length; u++) c = e(_[n[u].name]), c[k ? "prop" :"attr"]("disabled", !1);
if (e(":input[name=submit],:input[id=submit]", _).length) return alert('Error: Form elements must not have name or id of "submit".'), 
void 0;
if (d = e.extend(!0, {}, e.ajaxSettings, o), d.context = d.context || d, h = "jqFormIO" + new Date().getTime(), 
d.iframeTarget ? (g = e(d.iframeTarget), b = g.attr("name"), null == b ? g.attr("name", h) :h = b) :(g = e('<iframe name="' + h + '" src="' + d.iframeSrc + '" />'), 
g.css({
position:"absolute",
top:"-1000px",
left:"-1000px"
})), f = g[0], m = {
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:"n/a",
getAllResponseHeaders:function() {},
getResponseHeader:function() {},
setRequestHeader:function() {},
abort:function(o) {
var n = "timeout" === o ? "timeout" :"aborted";
t("aborting upload... " + n), this.aborted = 1, g.attr("src", d.iframeSrc), m.error = n, 
d.error && d.error.call(d.context, m, n, o), p && e.event.trigger("ajaxError", [ m, d, n ]), 
d.complete && d.complete.call(d.context, m, n);
}
}, p = d.global, p && !e.active++ && e.event.trigger("ajaxStart"), p && e.event.trigger("ajaxSend", [ m, d ]), 
d.beforeSend && d.beforeSend.call(d.context, m, d) === !1) return d.global && e.active--, 
void 0;
if (!m.aborted) {
v = _.clk, v && (b = v.name, b && !v.disabled && (d.extraData = d.extraData || {}, 
d.extraData[b] = v.value, "image" == v.type && (d.extraData[b + ".x"] = _.clk_x, 
d.extraData[b + ".y"] = _.clk_y)));
var x = 1, S = 2;
d.forceSync ? a() :setTimeout(a, 10);
var C, E, T, $ = 50, I = e.parseXML || function(e, t) {
return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", 
t.loadXML(e)) :t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t :null;
}, O = e.parseJSON || function(e) {
return window.eval("(" + e + ")");
}, A = function(t, o, n) {
var i = t.getResponseHeader("content-type") || "", r = "xml" === o || !o && i.indexOf("xml") >= 0, a = r ? t.responseXML :t.responseText;
return r && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"), 
n && n.dataFilter && (a = n.dataFilter(a, o)), "string" == typeof a && ("json" === o || !o && i.indexOf("json") >= 0 ? a = O(a) :("script" === o || !o && i.indexOf("javascript") >= 0) && e.globalEval(a)), 
a;
};
}
}
if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), 
this;
var i, r, a, s = this;
"function" == typeof o && (o = {
success:o
}), i = this.attr("method"), r = this.attr("action"), a = "string" == typeof r ? e.trim(r) :"", 
a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]), 
o = e.extend(!0, {
url:a,
success:e.ajaxSettings.success,
type:i || "GET",
iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" :"about:blank"
}, o);
var l = {};
if (this.trigger("form-pre-serialize", [ this, o, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), 
this;
if (o.beforeSerialize && o.beforeSerialize(this, o) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), 
this;
var c, u, d = this.formToArray(o.semantic);
if (o.data) {
o.extraData = o.data;
for (c in o.data) if (o.data[c] instanceof Array) for (var p in o.data[c]) d.push({
name:c,
value:o.data[c][p]
}); else u = o.data[c], u = e.isFunction(u) ? u() :u, d.push({
name:c,
value:u
});
}
if (o.beforeSubmit && o.beforeSubmit(d, this, o) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"), 
this;
if (this.trigger("form-submit-validate", [ d, this, o, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), 
this;
var h = e.param(d);
"GET" == o.type.toUpperCase() ? (o.url += (o.url.indexOf("?") >= 0 ? "&" :"?") + h, 
o.data = null) :o.data = h;
var g = [];
if (o.resetForm && g.push(function() {
s.resetForm();
}), o.clearForm && g.push(function() {
s.clearForm();
}), !o.dataType && o.target) {
var f = o.success || function() {};
g.push(function(t) {
var n = o.replaceTarget ? "replaceWith" :"html";
e(o.target)[n](t).each(f, arguments);
});
} else o.success && g.push(o.success);
o.success = function(e, t, n) {
for (var i = o.context || o, r = 0, a = g.length; a > r; r++) g[r].apply(i, [ e, t, n || s, s ]);
};
var m = e("input:file", this).length > 0, v = "multipart/form-data", b = s.attr("enctype") == v || s.attr("encoding") == v;
if (o.iframe !== !1 && (m || o.iframe || b)) o.closeKeepAlive ? e.get(o.closeKeepAlive, function() {
n(d);
}) :n(d); else {
if (e.browser.msie && "get" == i) {
var w = s[0].getAttribute("method");
"string" == typeof w && (o.type = w);
}
e.ajax(o);
}
return this.trigger("form-submit-notify", [ this, o ]), this;
}, e.fn.ajaxForm = function(o) {
if (0 === this.length) {
var n = {
s:this.selector,
c:this.context
};
return !e.isReady && n.s ? (t("DOM not ready, queuing ajaxForm"), e(function() {
e(n.s, n.c).ajaxForm(o);
}), this) :(t("terminating; zero elements found by selector" + (e.isReady ? "" :" (DOM not ready)")), 
this);
}
return this.ajaxFormUnbind().bind("submit.form-plugin", function(t) {
t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(o));
}).bind("click.form-plugin", function(t) {
var o = t.target, n = e(o);
if (!n.is(":submit,input:image")) {
var i = n.closest(":submit");
if (0 == i.length) return;
o = i[0];
}
var r = this;
if (r.clk = o, "image" == o.type) if (void 0 != t.offsetX) r.clk_x = t.offsetX, 
r.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) {
var a = n.offset();
r.clk_x = t.pageX - a.left, r.clk_y = t.pageY - a.top;
} else r.clk_x = t.pageX - o.offsetLeft, r.clk_y = t.pageY - o.offsetTop;
setTimeout(function() {
r.clk = r.clk_x = r.clk_y = null;
}, 100);
});
}, e.fn.ajaxFormUnbind = function() {
return this.unbind("submit.form-plugin click.form-plugin");
}, e.fn.formToArray = function(t) {
var o = [];
if (0 === this.length) return o;
var n = this[0], i = t ? n.getElementsByTagName("*") :n.elements;
if (!i) return o;
var r, a, s, l, c, u, d;
for (r = 0, u = i.length; u > r; r++) if (c = i[r], s = c.name) if (t && n.clk && "image" == c.type) c.disabled || n.clk != c || (o.push({
name:s,
value:e(c).val()
}), o.push({
name:s + ".x",
value:n.clk_x
}, {
name:s + ".y",
value:n.clk_y
})); else if (l = e.fieldValue(c, !0), l && l.constructor == Array) for (a = 0, 
d = l.length; d > a; a++) o.push({
name:s,
value:l[a]
}); else null !== l && "undefined" != typeof l && o.push({
name:s,
value:l
});
if (!t && n.clk) {
var p = e(n.clk), h = p[0];
s = h.name, s && !h.disabled && "image" == h.type && (o.push({
name:s,
value:p.val()
}), o.push({
name:s + ".x",
value:n.clk_x
}, {
name:s + ".y",
value:n.clk_y
}));
}
return o;
}, e.fn.formSerialize = function(t) {
return e.param(this.formToArray(t));
}, e.fn.fieldSerialize = function(t) {
var o = [];
return this.each(function() {
var n = this.name;
if (n) {
var i = e.fieldValue(this, t);
if (i && i.constructor == Array) for (var r = 0, a = i.length; a > r; r++) o.push({
name:n,
value:i[r]
}); else null !== i && "undefined" != typeof i && o.push({
name:this.name,
value:i
});
}
}), e.param(o);
}, e.fn.fieldValue = function(t) {
for (var o = [], n = 0, i = this.length; i > n; n++) {
var r = this[n], a = e.fieldValue(r, t);
null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(o, a) :o.push(a));
}
return o;
}, e.fieldValue = function(t, o) {
var n = t.name, i = t.type, r = t.tagName.toLowerCase();
if (void 0 === o && (o = !0), o && (!n || t.disabled || "reset" == i || "button" == i || ("checkbox" == i || "radio" == i) && !t.checked || ("submit" == i || "image" == i) && t.form && t.form.clk != t || "select" == r && -1 == t.selectedIndex)) return null;
if ("select" == r) {
var a = t.selectedIndex;
if (0 > a) return null;
for (var s = [], l = t.options, c = "select-one" == i, u = c ? a + 1 :l.length, d = c ? a :0; u > d; d++) {
var p = l[d];
if (p.selected) {
var h = p.value;
if (h || (h = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text :p.value), 
c) return h;
s.push(h);
}
}
return s;
}
return e(t).val();
}, e.fn.clearForm = function() {
return this.each(function() {
e("input,select,textarea", this).clearFields();
});
}, e.fn.clearFields = e.fn.clearInputs = function() {
var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function() {
var t = this.type, o = this.tagName.toLowerCase();
e.test(t) || "textarea" == o ? this.value = "" :"checkbox" == t || "radio" == t ? this.checked = !1 :"select" == o && (this.selectedIndex = -1);
});
}, e.fn.resetForm = function() {
return this.each(function() {
("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
});
}, e.fn.enable = function(e) {
return void 0 === e && (e = !0), this.each(function() {
this.disabled = !e;
});
}, e.fn.selected = function(t) {
return void 0 === t && (t = !0), this.each(function() {
var o = this.type;
if ("checkbox" == o || "radio" == o) this.checked = t; else if ("option" == this.tagName.toLowerCase()) {
var n = e(this).parent("select");
t && n[0] && "select-one" == n[0].type && n.find("option").selected(!1), this.selected = t;
}
});
};
}(jQuery), +function(e) {
"use strict";
var t = function(e, t) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", e, t);
};
t.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:"body",
callback:function() {}
}, t.prototype.init = function(t, o, n) {
this.enabled = !0, this.type = t, this.$element = e(o), this.options = this.getOptions(n);
for (var i = this.options.trigger.split(" "), r = i.length; r--; ) {
var a = i[r];
if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
var s = "hover" == a ? "mouseenter" :"focus", l = "hover" == a ? "mouseleave" :"blur";
this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
}
}
this.options.selector ? this._options = e.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.getOptions = function(t) {
return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
show:t.delay,
hide:t.delay
}), t;
}, t.prototype.getDelegateOptions = function() {
var t = {}, o = this.getDefaults();
return this._options && e.each(this._options, function(e, n) {
o[e] != n && (t[e] = n);
}), t;
}, t.prototype.enter = function(t) {
var o = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(o.timeout), o.hoverState = "in", o.options.delay && o.options.delay.show ? (o.timeout = setTimeout(function() {
"in" == o.hoverState && o.show();
}, o.options.delay.show), void 0) :o.show();
}, t.prototype.leave = function(t) {
var o = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(o.timeout), o.hoverState = "out", o.options.delay && o.options.delay.hide ? (o.timeout = setTimeout(function() {
"out" == o.hoverState && o.hide();
}, o.options.delay.hide), void 0) :o.hide();
}, t.prototype.show = function() {
var t = e.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
if (this.$element.trigger(t), t.isDefaultPrevented()) return;
var o = this.tip();
this.setContent(), this.options.animation && o.addClass("fade");
var n = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) :this.options.placement, i = /\s?auto?\s?/i, r = i.test(n);
r && (n = n.replace(i, "") || "top"), o.detach().css({
top:0,
left:0,
display:"block"
}).addClass(n), this.options.container ? o.appendTo(this.options.container) :o.insertAfter(this.$element);
var a = this.getPosition(), s = o[0].offsetWidth, l = o[0].offsetHeight;
if (r) {
var c = this.$element.parent(), u = n, d = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth :c.outerWidth(), h = "body" == this.options.container ? window.innerHeight :c.outerHeight(), g = "body" == this.options.container ? 0 :c.offset().left;
n = "bottom" == n && a.top + a.height + l - d > h ? "top" :"top" == n && a.top - d - l < 0 ? "bottom" :"right" == n && a.right + s > p ? "left" :"left" == n && a.left - s < g ? "right" :n, 
o.removeClass(u).addClass(n);
}
var f = this.getCalculatedOffset(n, a, s, l);
this.applyPlacement(f, n), this.$element.trigger("shown.bs." + this.type), "function" == typeof this.options.callback && this.options.callback.call(this.$element, this.tip());
}
}, t.prototype.applyPlacement = function(e, t) {
var o, n = this.tip(), i = n[0].offsetWidth, r = n[0].offsetHeight, a = parseInt(n.css("margin-top"), 10), s = parseInt(n.css("margin-left"), 10);
isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, 
n.offset(e).addClass("in");
var l = n[0].offsetWidth, c = n[0].offsetHeight;
if ("top" == t && c != r && (o = !0, e.top = e.top + r - c), /bottom|top/.test(t)) {
var u = 0;
e.left < 0 && (u = -2 * e.left, e.left = 0, n.offset(e), l = n[0].offsetWidth, c = n[0].offsetHeight), 
this.replaceArrow(u - i + l, l, "left");
} else this.replaceArrow(c - r, c, "top");
o && n.offset(e);
}, t.prototype.replaceArrow = function(e, t, o) {
this.arrow().css(o, e ? 50 * (1 - e / t) + "%" :"");
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle();
e.find(".tooltip-inner")[this.options.html ? "html" :"text"](t), e.removeClass("fade in top bottom left right");
}, t.prototype.hide = function() {
function t() {
"in" != o.hoverState && n.detach();
}
var o = this, n = this.tip(), i = e.Event("hide.bs." + this.type);
return this.$element.trigger(i), i.isDefaultPrevented() ? void 0 :(n.removeClass("in"), 
e.support.transition && this.$tip.hasClass("fade") ? n.one(e.support.transition.end, t).emulateTransitionEnd(150) :t(), 
this.$element.trigger("hidden.bs." + this.type), this);
}, t.prototype.fixTitle = function() {
var e = this.$element;
(e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
}, t.prototype.hasContent = function() {
return this.getTitle();
}, t.prototype.getPosition = function() {
var t = this.$element[0];
return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() :{
width:t.offsetWidth,
height:t.offsetHeight
}, this.$element.offset());
}, t.prototype.getCalculatedOffset = function(e, t, o, n) {
return "bottom" == e ? {
top:t.top + t.height,
left:t.left + t.width / 2 - o / 2
} :"top" == e ? {
top:t.top - n,
left:t.left + t.width / 2 - o / 2
} :"left" == e ? {
top:t.top + t.height / 2 - n / 2,
left:t.left - o
} :{
top:t.top + t.height / 2 - n / 2,
left:t.left + t.width
};
}, t.prototype.getTitle = function() {
var e, t = this.$element, o = this.options;
return e = "function" == typeof o.title ? o.title.call(t[0]) :t.attr("data-original-title") || o.title;
}, t.prototype.tip = function() {
return this.$tip = this.$tip || e(this.options.template);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, t.prototype.validate = function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
}, t.prototype.enable = function() {
this.enabled = !0;
}, t.prototype.disable = function() {
this.enabled = !1;
}, t.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, t.prototype.toggle = function(t) {
var o = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
o.tip().hasClass("in") ? o.leave(o) :o.enter(o);
}, t.prototype.destroy = function() {
this.hide().$element.off("." + this.type).removeData("bs." + this.type);
};
var o = e.fn.tooltip;
e.fn.tooltip = function(o) {
return this.each(function() {
var n = e(this), i = n.data("bs.tooltip"), r = "object" == typeof o && o;
i || n.data("bs.tooltip", i = new t(this, r)), "string" == typeof o && i[o]();
});
}, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
return e.fn.tooltip = o, this;
};
}(jQuery), /* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e) {
"use strict";
var t = function(e, t) {
this.init("popover", e, t);
};
if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
placement:"right",
trigger:"click",
content:"",
template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, 
t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle(), o = this.getContent();
e.find(".popover-title")[this.options.html ? "html" :"text"](t), e.find(".popover-content")[this.options.html ? "html" :"text"](o), 
e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
}, t.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
}, t.prototype.getContent = function() {
var e = this.$element, t = this.options;
return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) :t.content);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".arrow");
}, t.prototype.tip = function() {
return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
};
var o = e.fn.popover;
e.fn.popover = function(o) {
return this.each(function() {
var n = e(this), i = n.data("bs.popover"), r = "object" == typeof o && o;
i || n.data("bs.popover", i = new t(this, r)), "string" == typeof o && i[o]();
});
}, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
return e.fn.popover = o, this;
};
}(jQuery), /*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
function(e, t, o) {
"$:nomunge";
function n(e) {
return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1");
}
var i, r = "hashchange", a = document, s = e.event.special, l = a.documentMode, c = "on" + r in t && (l === o || l > 7);
e.fn[r] = function(e) {
return e ? this.bind(r, e) :this.trigger(r);
}, e.fn[r].delay = 50, s[r] = e.extend(s[r], {
setup:function() {
return c ? !1 :(e(i.start), void 0);
},
teardown:function() {
return c ? !1 :(e(i.stop), void 0);
}
}), i = function() {
function i() {
var o = n(), a = h(u);
o !== u ? (p(u = o, a), e(t).trigger(r)) :a !== u && (location.href = location.href.replace(/#.*/, "") + a), 
s = setTimeout(i, e.fn[r].delay);
}
var s, l = {}, u = n(), d = function(e) {
return e;
}, p = d, h = d;
return l.start = function() {
s || i();
}, l.stop = function() {
s && clearTimeout(s), s = o;
}, e.browser.msie && !c && function() {
var t, o;
l.start = function() {
t || (o = e.fn[r].src, o = o && o + n(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
o || p(n()), i();
}).attr("src", o || "javascript:0").insertAfter("body")[0].contentWindow, a.onpropertychange = function() {
try {
"title" === event.propertyName && (t.document.title = a.title);
} catch (e) {}
});
}, l.stop = d, h = function() {
return n(t.location.href);
}, p = function(o, n) {
var i = t.document, s = e.fn[r].domain;
o !== n && (i.title = a.title, i.open(), s && i.write('<script>document.domain="' + s + '"</script>'), 
i.close(), t.location.hash = o);
};
}(), l;
}();
}(jQuery, this), !function(e) {
var t = "waitForImages";
e.waitForImages = {
hasImageProperties:[ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor" ]
}, e.expr[":"].uncached = function(t) {
if (!e(t).is('img[src!=""]')) return !1;
var o = new Image();
return o.src = t.src, !o.complete;
}, e.fn.waitForImages = function(o, n, i) {
var r = 0, a = 0;
if (e.isPlainObject(arguments[0]) && (i = arguments[0].waitForAll, n = arguments[0].each, 
o = arguments[0].finished), o = o || e.noop, n = n || e.noop, i = !!i, !e.isFunction(o) || !e.isFunction(n)) throw new TypeError("An invalid callback was supplied.");
return this.each(function() {
var s = e(this), l = [], c = e.waitForImages.hasImageProperties || [], u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
i ? s.find("*").addBack().each(function() {
var t = e(this);
t.is("img:uncached") && l.push({
src:t.attr("src"),
element:t[0]
}), e.each(c, function(e, o) {
var n, i = t.css(o);
if (!i) return !0;
for (;n = u.exec(i); ) l.push({
src:n[2],
element:t[0]
});
});
}) :s.find("img:uncached").each(function() {
l.push({
src:this.src,
element:this
});
}), r = l.length, a = 0, 0 === r && o.call(s[0]), e.each(l, function(i, l) {
var c = new Image();
e(c).on("load." + t + " error." + t, function(e) {
return a++, n.call(l.element, a, r, "load" == e.type), a == r ? (o.call(s[0]), !1) :void 0;
}), c.src = l.src;
});
});
};
}(jQuery), /*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
function(e, t, o, n) {
var i = e(t);
e.fn.lazyload = function(r) {
function a() {
var t = 0;
l.each(function() {
var o = e(this);
if (!c.skip_invisible || o.is(":visible")) if (e.abovethetop(this, c) || e.leftofbegin(this, c)) ; else if (e.belowthefold(this, c) || e.rightoffold(this, c)) {
if (++t > c.failure_limit) return !1;
} else o.trigger("appear"), t = 0;
});
}
var s, l = this, c = {
threshold:0,
failure_limit:0,
event:"scroll",
effect:"show",
container:t,
data_attribute:"original",
skip_invisible:!0,
appear:null,
load:null
};
return r && (n !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), 
n !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(c, r)), 
s = c.container === n || c.container === t ? i :e(c.container), 0 === c.event.indexOf("scroll") && s.bind(c.event, function() {
return a();
}), this.each(function() {
var t = this, o = e(t);
t.loaded = !1, o.one("appear", function() {
if (!this.loaded) {
if (c.appear) {
var n = l.length;
c.appear.call(t, n, c);
}
if (o.data("background")) {
var i = o.data("background");
o.css("backgroundImage", "url(" + i + ")");
} else {
var i = o.data(c.data_attribute);
e("<img />").bind("load", function() {
o.hide().attr("src", i).on("load", function() {
o.trigger("afterAppear");
}), o[c.effect](c.effect_speed), t.loaded = !0;
var n = e.grep(l, function(e) {
return !e.loaded;
});
if (l = e(n), c.load) {
var r = l.length;
c.load.call(t, r, c);
}
}).attr("src", i);
}
}
}), 0 !== c.event.indexOf("scroll") && o.bind(c.event, function() {
t.loaded || o.trigger("appear");
});
}), i.bind("resize", function() {
a();
}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && i.bind("pageshow", function(t) {
t.originalEvent && t.originalEvent.persisted && l.each(function() {
e(this).trigger("appear");
});
}), e(o).ready(function() {
a();
}), this;
}, e.belowthefold = function(o, r) {
var a;
return a = r.container === n || r.container === t ? i.height() + i.scrollTop() :e(r.container).offset().top + e(r.container).height(), 
a <= e(o).offset().top - r.threshold;
}, e.rightoffold = function(o, r) {
var a;
return a = r.container === n || r.container === t ? i.width() + i.scrollLeft() :e(r.container).offset().left + e(r.container).width(), 
a <= e(o).offset().left - r.threshold;
}, e.abovethetop = function(o, r) {
var a;
return a = r.container === n || r.container === t ? i.scrollTop() :e(r.container).offset().top, 
a >= e(o).offset().top + r.threshold + e(o).height();
}, e.leftofbegin = function(o, r) {
var a;
return a = r.container === n || r.container === t ? i.scrollLeft() :e(r.container).offset().left, 
a >= e(o).offset().left + r.threshold + e(o).width();
}, e.inviewport = function(t, o) {
return !(e.rightoffold(t, o) || e.leftofbegin(t, o) || e.belowthefold(t, o) || e.abovethetop(t, o));
}, e.extend(e.expr[":"], {
"below-the-fold":function(t) {
return e.belowthefold(t, {
threshold:0
});
},
"above-the-top":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-screen":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-screen":function(t) {
return !e.rightoffold(t, {
threshold:0
});
},
"in-viewport":function(t) {
return e.inviewport(t, {
threshold:0
});
},
"above-the-fold":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-fold":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-fold":function(t) {
return !e.rightoffold(t, {
threshold:0
});
}
});
}(jQuery, window, document), function(e, t) {
function o(e, t) {
var o = null === e || typeof e in i;
return o ? e === t :!1;
}
var n = e.ko = {};
n.exportSymbol = function(t, o) {
for (var n = t.split("."), i = e, r = 0; r < n.length - 1; r++) i = i[n[r]];
i[n[n.length - 1]] = o;
}, n.exportProperty = function(e, t, o) {
e[t] = o;
}, n.utils = new function() {
function o(e, t) {
if ("INPUT" != e.tagName || !e.type) return !1;
if ("click" != t.toLowerCase()) return !1;
var o = e.type.toLowerCase();
return "checkbox" == o || "radio" == o;
}
var i = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, r = /MSIE 6/i.test(navigator.userAgent), a = /MSIE 7/i.test(navigator.userAgent), s = {}, l = {}, c = /Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" :"UIEvents";
s[c] = [ "keyup", "keydown", "keypress" ], s.MouseEvents = [ "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave" ];
for (var u in s) {
var d = s[u];
if (d.length) for (var p = 0, h = d.length; h > p; p++) l[d[p]] = u;
}
return {
fieldsIncludedWithJsonPost:[ "authenticity_token", /^__RequestVerificationToken(_.*)?$/ ],
arrayForEach:function(e, t) {
for (var o = 0, n = e.length; n > o; o++) t(e[o]);
},
arrayIndexOf:function(e, t) {
if ("function" == typeof e.indexOf) return e.indexOf(t);
for (var o = 0, n = e.length; n > o; o++) if (e[o] === t) return o;
return -1;
},
arrayFirst:function(e, t, o) {
for (var n = 0, i = e.length; i > n; n++) if (t.call(o, e[n])) return e[n];
return null;
},
arrayRemoveItem:function(e, t) {
var o = n.utils.arrayIndexOf(e, t);
o >= 0 && e.splice(o, 1);
},
arrayGetDistinctValues:function(e) {
e = e || [];
for (var t = [], o = 0, i = e.length; i > o; o++) n.utils.arrayIndexOf(t, e[o]) < 0 && t.push(e[o]);
return t;
},
arrayMap:function(e, t) {
e = e || [];
for (var o = [], n = 0, i = e.length; i > n; n++) o.push(t(e[n]));
return o;
},
arrayFilter:function(e, t) {
e = e || [];
for (var o = [], n = 0, i = e.length; i > n; n++) t(e[n]) && o.push(e[n]);
return o;
},
arrayPushAll:function(e, t) {
for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
},
emptyDomNode:function(e) {
for (;e.firstChild; ) n.removeNode(e.firstChild);
},
setDomNodeChildren:function(e, t) {
n.utils.emptyDomNode(e), t && n.utils.arrayForEach(t, function(t) {
e.appendChild(t);
});
},
replaceDomNodes:function(e, t) {
var o = e.nodeType ? [ e ] :e;
if (o.length > 0) {
for (var i = o[0], r = i.parentNode, a = 0, s = t.length; s > a; a++) r.insertBefore(t[a], i);
for (var a = 0, s = o.length; s > a; a++) n.removeNode(o[a]);
}
},
setOptionNodeSelectionState:function(e, t) {
navigator.userAgent.indexOf("MSIE 6") >= 0 ? e.setAttribute("selected", t) :e.selected = t;
},
getElementsHavingAttribute:function(e, t) {
if (!e || 1 != e.nodeType) return [];
var o = [];
null !== e.getAttribute(t) && o.push(e);
for (var n = e.getElementsByTagName("*"), i = 0, r = n.length; r > i; i++) null !== n[i].getAttribute(t) && o.push(n[i]);
return o;
},
stringTrim:function(e) {
return (e || "").replace(i, "");
},
stringTokenize:function(e, t) {
for (var o = [], i = (e || "").split(t), r = 0, a = i.length; a > r; r++) {
var s = n.utils.stringTrim(i[r]);
"" !== s && o.push(s);
}
return o;
},
stringStartsWith:function(e, t) {
return e = e || "", t.length > e.length ? !1 :e.substring(0, t.length) === t;
},
evalWithinScope:function(e, o) {
return o === t ? new Function("return " + e)() :new Function("sc", "with(sc) { return (" + e + ") }")(o);
},
domNodeIsContainedBy:function(e, t) {
if (t.compareDocumentPosition) return 16 == (16 & t.compareDocumentPosition(e));
for (;null != e; ) {
if (e == t) return !0;
e = e.parentNode;
}
return !1;
},
domNodeIsAttachedToDocument:function(e) {
return n.utils.domNodeIsContainedBy(e, document);
},
registerEventHandler:function(e, t, n) {
if ("undefined" != typeof jQuery) {
if (o(e, t)) {
var i = n;
n = function(e, t) {
var o = this.checked;
t && (this.checked = t.checkedStateBeforeEvent !== !0), i.call(this, e), this.checked = o;
};
}
jQuery(e).bind(t, n);
} else if ("function" == typeof e.addEventListener) e.addEventListener(t, n, !1); else {
if ("undefined" == typeof e.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
e.attachEvent("on" + t, function(t) {
n.call(e, t);
});
}
},
triggerEvent:function(t, n) {
if (!t || !t.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
if ("undefined" != typeof jQuery) {
var i = [];
o(t, n) && i.push({
checkedStateBeforeEvent:t.checked
}), jQuery(t).trigger(n, i);
} else if ("function" == typeof document.createEvent) {
if ("function" != typeof t.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
var r = l[n] || "HTMLEvents", a = document.createEvent(r);
a.initEvent(n, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t), t.dispatchEvent(a);
} else {
if ("undefined" == typeof t.fireEvent) throw new Error("Browser doesn't support triggering events");
"click" == n && ("INPUT" != t.tagName || "checkbox" != t.type.toLowerCase() && "radio" != t.type.toLowerCase() || (t.checked = t.checked !== !0)), 
t.fireEvent("on" + n);
}
},
unwrapObservable:function(e) {
return n.isObservable(e) ? e() :e;
},
domNodeHasCssClass:function(e, t) {
var o = (e.className || "").split(/\s+/);
return n.utils.arrayIndexOf(o, t) >= 0;
},
toggleDomNodeCssClass:function(e, t, o) {
var i = n.utils.domNodeHasCssClass(e, t);
if (o && !i) e.className = (e.className || "") + " " + t; else if (i && !o) {
for (var r = (e.className || "").split(/\s+/), a = "", s = 0; s < r.length; s++) r[s] != t && (a += r[s] + " ");
e.className = n.utils.stringTrim(a);
}
},
range:function(e, t) {
e = n.utils.unwrapObservable(e), t = n.utils.unwrapObservable(t);
for (var o = [], i = e; t >= i; i++) o.push(i);
return o;
},
makeArray:function(e) {
for (var t = [], o = 0, n = e.length; n > o; o++) t.push(e[o]);
return t;
},
isIe6:r,
isIe7:a,
getFormFields:function(e, t) {
for (var o = n.utils.makeArray(e.getElementsByTagName("INPUT")).concat(n.utils.makeArray(e.getElementsByTagName("TEXTAREA"))), i = "string" == typeof t ? function(e) {
return e.name === t;
} :function(e) {
return t.test(e.name);
}, r = [], a = o.length - 1; a >= 0; a--) i(o[a]) && r.push(o[a]);
return r;
},
parseJson:function(t) {
return "string" == typeof t && (t = n.utils.stringTrim(t)) ? e.JSON && e.JSON.parse ? e.JSON.parse(t) :new Function("return " + t)() :null;
},
stringifyJson:function(e) {
if ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return JSON.stringify(n.utils.unwrapObservable(e));
},
postJson:function(e, t, o) {
o = o || {};
var i = o.params || {}, r = o.includeFields || this.fieldsIncludedWithJsonPost, a = e;
if ("object" == typeof e && "FORM" == e.tagName) {
var s = e;
a = s.action;
for (var l = r.length - 1; l >= 0; l--) for (var c = n.utils.getFormFields(s, r[l]), u = c.length - 1; u >= 0; u--) i[c[u].name] = c[u].value;
}
t = n.utils.unwrapObservable(t);
var d = document.createElement("FORM");
d.style.display = "none", d.action = a, d.method = "post";
for (var p in t) {
var h = document.createElement("INPUT");
h.name = p, h.value = n.utils.stringifyJson(n.utils.unwrapObservable(t[p])), d.appendChild(h);
}
for (var p in i) {
var h = document.createElement("INPUT");
h.name = p, h.value = i[p], d.appendChild(h);
}
document.body.appendChild(d), o.submitter ? o.submitter(d) :d.submit(), setTimeout(function() {
d.parentNode.removeChild(d);
}, 0);
}
};
}(), n.exportSymbol("ko.utils", n.utils), n.exportSymbol("ko.utils.arrayForEach", n.utils.arrayForEach), 
n.exportSymbol("ko.utils.arrayFirst", n.utils.arrayFirst), n.exportSymbol("ko.utils.arrayFilter", n.utils.arrayFilter), 
n.exportSymbol("ko.utils.arrayGetDistinctValues", n.utils.arrayGetDistinctValues), 
n.exportSymbol("ko.utils.arrayIndexOf", n.utils.arrayIndexOf), n.exportSymbol("ko.utils.arrayMap", n.utils.arrayMap), 
n.exportSymbol("ko.utils.arrayPushAll", n.utils.arrayPushAll), n.exportSymbol("ko.utils.arrayRemoveItem", n.utils.arrayRemoveItem), 
n.exportSymbol("ko.utils.fieldsIncludedWithJsonPost", n.utils.fieldsIncludedWithJsonPost), 
n.exportSymbol("ko.utils.getElementsHavingAttribute", n.utils.getElementsHavingAttribute), 
n.exportSymbol("ko.utils.getFormFields", n.utils.getFormFields), n.exportSymbol("ko.utils.postJson", n.utils.postJson), 
n.exportSymbol("ko.utils.parseJson", n.utils.parseJson), n.exportSymbol("ko.utils.registerEventHandler", n.utils.registerEventHandler), 
n.exportSymbol("ko.utils.stringifyJson", n.utils.stringifyJson), n.exportSymbol("ko.utils.range", n.utils.range), 
n.exportSymbol("ko.utils.toggleDomNodeCssClass", n.utils.toggleDomNodeCssClass), 
n.exportSymbol("ko.utils.triggerEvent", n.utils.triggerEvent), n.exportSymbol("ko.utils.unwrapObservable", n.utils.unwrapObservable), 
Function.prototype.bind || (Function.prototype.bind = function(e) {
var t = this, o = Array.prototype.slice.call(arguments), e = o.shift();
return function() {
return t.apply(e, o.concat(Array.prototype.slice.call(arguments)));
};
}), n.utils.domData = new function() {
var e = 0, o = "__ko__" + new Date().getTime(), i = {};
return {
get:function(e, o) {
var i = n.utils.domData.getAll(e, !1);
return i === t ? t :i[o];
},
set:function(e, o, i) {
if (i !== t || n.utils.domData.getAll(e, !1) !== t) {
var r = n.utils.domData.getAll(e, !0);
r[o] = i;
}
},
getAll:function(n, r) {
var a = n[o];
if (!a) {
if (!r) return t;
a = n[o] = "ko" + e++, i[a] = {};
}
return i[a];
},
clear:function(e) {
var t = e[o];
t && (delete i[t], e[o] = null);
}
};
}(), n.utils.domNodeDisposal = new function() {
function e(e, o) {
var i = n.utils.domData.get(e, r);
return i === t && o && (i = [], n.utils.domData.set(e, r, i)), i;
}
function o(e) {
n.utils.domData.set(e, r, t);
}
function i(t) {
var o = e(t, !1);
if (o) {
o = o.slice(0);
for (var i = 0; i < o.length; i++) o[i](t);
}
n.utils.domData.clear(t), "function" == typeof jQuery && "function" == typeof jQuery.cleanData && jQuery.cleanData([ t ]);
}
var r = "__ko_domNodeDisposal__" + new Date().getTime();
return {
addDisposeCallback:function(t, o) {
if ("function" != typeof o) throw new Error("Callback must be a function");
e(t, !0).push(o);
},
removeDisposeCallback:function(t, i) {
var r = e(t, !1);
r && (n.utils.arrayRemoveItem(r, i), 0 == r.length && o(t));
},
cleanNode:function(e) {
if (1 == e.nodeType || 9 == e.nodeType) {
i(e);
var t = [];
n.utils.arrayPushAll(t, e.getElementsByTagName("*"));
for (var o = 0, r = t.length; r > o; o++) i(t[o]);
}
},
removeNode:function(e) {
n.cleanNode(e), e.parentNode && e.parentNode.removeChild(e);
}
};
}(), n.cleanNode = n.utils.domNodeDisposal.cleanNode, n.removeNode = n.utils.domNodeDisposal.removeNode, 
n.exportSymbol("ko.cleanNode", n.cleanNode), n.exportSymbol("ko.removeNode", n.removeNode), 
n.exportSymbol("ko.utils.domNodeDisposal", n.utils.domNodeDisposal), n.exportSymbol("ko.utils.domNodeDisposal.addDisposeCallback", n.utils.domNodeDisposal.addDisposeCallback), 
n.exportSymbol("ko.utils.domNodeDisposal.removeDisposeCallback", n.utils.domNodeDisposal.removeDisposeCallback), 
function() {
function e(e) {
var t = n.utils.stringTrim(e).toLowerCase(), o = document.createElement("div"), i = t.match(/^<(thead|tbody|tfoot)/) && [ 1, "<table>", "</table>" ] || !t.indexOf("<tr") && [ 2, "<table><tbody>", "</tbody></table>" ] || (!t.indexOf("<td") || !t.indexOf("<th")) && [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] || [ 0, "", "" ];
for (o.innerHTML = i[1] + e + i[2]; i[0]--; ) o = o.lastChild;
return n.utils.makeArray(o.childNodes);
}
n.utils.parseHtmlFragment = function(t) {
return "undefined" != typeof jQuery ? jQuery.clean([ t ]) :e(t);
}, n.utils.setHtml = function(e, o) {
if (n.utils.emptyDomNode(e), null !== o && o !== t) if ("string" != typeof o && (o = o.toString()), 
"undefined" != typeof jQuery) jQuery(e).html(o); else for (var i = n.utils.parseHtmlFragment(o), r = 0; r < i.length; r++) e.appendChild(i[r]);
};
}(), n.memoization = function() {
function e() {
return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
}
function o() {
return e() + e();
}
function i(e, t) {
if (e) if (8 == e.nodeType) {
var o = n.memoization.parseMemoText(e.nodeValue);
null != o && t.push({
domNode:e,
memoId:o
});
} else if (1 == e.nodeType) for (var r = 0, a = e.childNodes, s = a.length; s > r; r++) i(a[r], t);
}
var r = {};
return {
memoize:function(e) {
if ("function" != typeof e) throw new Error("You can only pass a function to ko.memoization.memoize()");
var t = o();
return r[t] = e, "<!--[ko_memo:" + t + "]-->";
},
unmemoize:function(e, o) {
var n = r[e];
if (n === t) throw new Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
try {
return n.apply(null, o || []), !0;
} finally {
delete r[e];
}
},
unmemoizeDomNodeAndDescendants:function(e, t) {
var o = [];
i(e, o);
for (var r = 0, a = o.length; a > r; r++) {
var s = o[r].domNode, l = [ s ];
t && n.utils.arrayPushAll(l, t), n.memoization.unmemoize(o[r].memoId, l), s.nodeValue = "", 
s.parentNode && s.parentNode.removeChild(s);
}
},
parseMemoText:function(e) {
var t = e.match(/^\[ko_memo\:(.*?)\]$/);
return t ? t[1] :null;
}
};
}(), n.exportSymbol("ko.memoization", n.memoization), n.exportSymbol("ko.memoization.memoize", n.memoization.memoize), 
n.exportSymbol("ko.memoization.unmemoize", n.memoization.unmemoize), n.exportSymbol("ko.memoization.parseMemoText", n.memoization.parseMemoText), 
n.exportSymbol("ko.memoization.unmemoizeDomNodeAndDescendants", n.memoization.unmemoizeDomNodeAndDescendants), 
n.subscription = function(e, t) {
this.callback = e, this.dispose = function() {
this.isDisposed = !0, t();
}.bind(this), n.exportProperty(this, "dispose", this.dispose);
}, n.subscribable = function() {
var e = [];
this.subscribe = function(t, o) {
var i = o ? t.bind(o) :t, r = new n.subscription(i, function() {
n.utils.arrayRemoveItem(e, r);
});
return e.push(r), r;
}, this.notifySubscribers = function(t) {
n.utils.arrayForEach(e.slice(0), function(e) {
e && e.isDisposed !== !0 && e.callback(t);
});
}, this.getSubscriptionsCount = function() {
return e.length;
}, n.exportProperty(this, "subscribe", this.subscribe), n.exportProperty(this, "notifySubscribers", this.notifySubscribers), 
n.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount);
}, n.isSubscribable = function(e) {
return "function" == typeof e.subscribe && "function" == typeof e.notifySubscribers;
}, n.exportSymbol("ko.subscribable", n.subscribable), n.exportSymbol("ko.isSubscribable", n.isSubscribable), 
n.dependencyDetection = function() {
var e = [];
return {
begin:function() {
e.push([]);
},
end:function() {
return e.pop();
},
registerDependency:function(t) {
if (!n.isSubscribable(t)) throw "Only subscribable things can act as dependencies";
e.length > 0 && e[e.length - 1].push(t);
}
};
}();
var i = {
undefined:!0,
"boolean":!0,
number:!0,
string:!0
};
n.observable = function(e) {
function t() {
return arguments.length > 0 ? (t.equalityComparer && t.equalityComparer(i, arguments[0]) || (i = arguments[0], 
t.notifySubscribers(i)), this) :(n.dependencyDetection.registerDependency(t), i);
}
var i = e;
return t.__ko_proto__ = n.observable, t.valueHasMutated = function() {
t.notifySubscribers(i);
}, t.equalityComparer = o, n.subscribable.call(t), n.exportProperty(t, "valueHasMutated", t.valueHasMutated), 
t;
}, n.isObservable = function(e) {
return null === e || e === t || e.__ko_proto__ === t ? !1 :e.__ko_proto__ === n.observable ? !0 :n.isObservable(e.__ko_proto__);
}, n.isWriteableObservable = function(e) {
return "function" == typeof e && e.__ko_proto__ === n.observable ? !0 :"function" == typeof e && e.__ko_proto__ === n.dependentObservable && e.hasWriteFunction ? !0 :!1;
}, n.exportSymbol("ko.observable", n.observable), n.exportSymbol("ko.isObservable", n.isObservable), 
n.exportSymbol("ko.isWriteableObservable", n.isWriteableObservable), n.observableArray = function(e) {
if (0 == arguments.length && (e = []), null !== e && e !== t && !("length" in e)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
var o = new n.observable(e);
return n.utils.arrayForEach([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
o[e] = function() {
var t = o(), n = t[e].apply(t, arguments);
return o.valueHasMutated(), n;
};
}), n.utils.arrayForEach([ "slice" ], function(e) {
o[e] = function() {
var t = o();
return t[e].apply(t, arguments);
};
}), o.remove = function(e) {
for (var t = o(), n = [], i = [], r = "function" == typeof e ? e :function(t) {
return t === e;
}, a = 0, s = t.length; s > a; a++) {
var l = t[a];
r(l) ? i.push(l) :n.push(l);
}
return o(n), i;
}, o.removeAll = function(e) {
if (e === t) {
var i = o();
return o([]), i;
}
return e ? o.remove(function(t) {
return n.utils.arrayIndexOf(e, t) >= 0;
}) :[];
}, o.destroy = function(e) {
for (var t = o(), n = "function" == typeof e ? e :function(t) {
return t === e;
}, i = t.length - 1; i >= 0; i--) {
var r = t[i];
n(r) && (t[i]._destroy = !0);
}
o.valueHasMutated();
}, o.destroyAll = function(e) {
return e === t ? o.destroy(function() {
return !0;
}) :e ? o.destroy(function(t) {
return n.utils.arrayIndexOf(e, t) >= 0;
}) :[];
}, o.indexOf = function(e) {
var t = o();
return n.utils.arrayIndexOf(t, e);
}, o.replace = function(e, t) {
var n = o.indexOf(e);
n >= 0 && (o()[n] = t, o.valueHasMutated());
}, n.exportProperty(o, "remove", o.remove), n.exportProperty(o, "removeAll", o.removeAll), 
n.exportProperty(o, "destroy", o.destroy), n.exportProperty(o, "destroyAll", o.destroyAll), 
n.exportProperty(o, "indexOf", o.indexOf), o;
}, n.exportSymbol("ko.observableArray", n.observableArray), n.dependentObservable = function(e, t, o) {
function i() {
n.utils.arrayForEach(h, function(e) {
e.dispose();
}), h = [];
}
function r(e) {
i(), n.utils.arrayForEach(e, function(e) {
h.push(e.subscribe(a));
});
}
function a() {
if (c && "function" == typeof o.disposeWhen && o.disposeWhen()) return s.dispose(), 
void 0;
try {
n.dependencyDetection.begin(), l = o.owner ? o.read.call(o.owner) :o.read();
} finally {
var e = n.utils.arrayGetDistinctValues(n.dependencyDetection.end());
r(e);
}
s.notifySubscribers(l), c = !0;
}
function s() {
if (!(arguments.length > 0)) return c || a(), n.dependencyDetection.registerDependency(s), 
l;
if ("function" != typeof o.write) throw "Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.";
var e = arguments[0];
o.owner ? o.write.call(o.owner, e) :o.write(e);
}
var l, c = !1;
if (e && "object" == typeof e ? o = e :(o = o || {}, o.read = e || o.read, o.owner = t || o.owner), 
"function" != typeof o.read) throw "Pass a function that returns the value of the dependentObservable";
var u = "object" == typeof o.disposeWhenNodeIsRemoved ? o.disposeWhenNodeIsRemoved :null, d = null;
if (u) {
d = function() {
s.dispose();
}, n.utils.domNodeDisposal.addDisposeCallback(u, d);
var p = o.disposeWhen;
o.disposeWhen = function() {
return !n.utils.domNodeIsAttachedToDocument(u) || "function" == typeof p && p();
};
}
var h = [];
return s.__ko_proto__ = n.dependentObservable, s.getDependenciesCount = function() {
return h.length;
}, s.hasWriteFunction = "function" == typeof o.write, s.dispose = function() {
u && n.utils.domNodeDisposal.removeDisposeCallback(u, d), i();
}, n.subscribable.call(s), o.deferEvaluation !== !0 && a(), n.exportProperty(s, "dispose", s.dispose), 
n.exportProperty(s, "getDependenciesCount", s.getDependenciesCount), s;
}, n.dependentObservable.__ko_proto__ = n.observable, n.exportSymbol("ko.dependentObservable", n.dependentObservable), 
function() {
function e(n, r, a) {
a = a || new i(), n = r(n);
var s = "object" == typeof n && null !== n && n !== t;
if (!s) return n;
var l = n instanceof Array ? [] :{};
return a.save(n, l), o(n, function(o) {
var i = r(n[o]);
switch (typeof i) {
case "boolean":
case "number":
case "string":
case "function":
l[o] = i;
break;

case "object":
case "undefined":
var s = a.get(i);
l[o] = s !== t ? s :e(i, r, a);
}
}), l;
}
function o(e, t) {
if (e instanceof Array) for (var o = 0; o < e.length; o++) t(o); else for (var n in e) t(n);
}
function i() {
var e = [], o = [];
this.save = function(t, i) {
var r = n.utils.arrayIndexOf(e, t);
r >= 0 ? o[r] = i :(e.push(t), o.push(i));
}, this.get = function(i) {
var r = n.utils.arrayIndexOf(e, i);
return r >= 0 ? o[r] :t;
};
}
var r = 10;
n.toJS = function(t) {
if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
return e(t, function(e) {
for (var t = 0; n.isObservable(e) && r > t; t++) e = e();
return e;
});
}, n.toJSON = function(e) {
var t = n.toJS(e);
return n.utils.stringifyJson(t);
};
}(), n.exportSymbol("ko.toJS", n.toJS), n.exportSymbol("ko.toJSON", n.toJSON), function() {
n.selectExtensions = {
readValue:function(e) {
return "OPTION" == e.tagName ? e.__ko__hasDomDataOptionValue__ === !0 ? n.utils.domData.get(e, n.bindingHandlers.options.optionValueDomDataKey) :e.getAttribute("value") :"SELECT" == e.tagName ? e.selectedIndex >= 0 ? n.selectExtensions.readValue(e.options[e.selectedIndex]) :t :e.value;
},
writeValue:function(e, o) {
if ("OPTION" == e.tagName) switch (typeof o) {
case "string":
case "number":
n.utils.domData.set(e, n.bindingHandlers.options.optionValueDomDataKey, t), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, 
e.value = o;
break;

default:
n.utils.domData.set(e, n.bindingHandlers.options.optionValueDomDataKey, o), e.__ko__hasDomDataOptionValue__ = !0, 
e.value = "";
} else if ("SELECT" == e.tagName) {
for (var i = e.options.length - 1; i >= 0; i--) if (n.selectExtensions.readValue(e.options[i]) == o) {
e.selectedIndex = i;
break;
}
} else (null === o || o === t) && (o = ""), e.value = o;
}
};
}(), n.exportSymbol("ko.selectExtensions", n.selectExtensions), n.exportSymbol("ko.selectExtensions.readValue", n.selectExtensions.readValue), 
n.exportSymbol("ko.selectExtensions.writeValue", n.selectExtensions.writeValue), 
n.jsonExpressionRewriting = function() {
function e(e, t) {
return e.replace(o, function(e, o) {
return t[o];
});
}
function t(e) {
return n.utils.arrayIndexOf(r, n.utils.stringTrim(e).toLowerCase()) >= 0 ? !1 :null !== e.match(i);
}
var o = /\[ko_token_(\d+)\]/g, i = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i, r = [ "true", "false" ];
return {
parseJson:function(t) {
if (t = n.utils.stringTrim(t), t.length < 3) return {};
for (var o, i = [], r = null, a = "{" == t.charAt(0) ? 1 :0; a < t.length; a++) {
var s = t.charAt(a);
if (null === r) switch (s) {
case '"':
case "'":
case "/":
r = a, o = s;
break;

case "{":
r = a, o = "}";
break;

case "[":
r = a, o = "]";
} else if (s == o) {
var l = t.substring(r, a + 1);
i.push(l);
var c = "[ko_token_" + (i.length - 1) + "]";
t = t.substring(0, r) + c + t.substring(a + 1), a -= l.length - c.length, r = null;
}
}
for (var u = {}, d = t.split(","), p = 0, h = d.length; h > p; p++) {
var g = d[p], f = g.indexOf(":");
if (f > 0 && f < g.length - 1) {
var m = n.utils.stringTrim(g.substring(0, f)), v = n.utils.stringTrim(g.substring(f + 1));
"{" == m.charAt(0) && (m = m.substring(1)), "}" == v.charAt(v.length - 1) && (v = v.substring(0, v.length - 1)), 
m = n.utils.stringTrim(e(m, i)), v = n.utils.stringTrim(e(v, i)), u[m] = v;
}
}
return u;
},
insertPropertyAccessorsIntoJson:function(e) {
var o = n.jsonExpressionRewriting.parseJson(e), i = [];
for (var r in o) {
var a = o[r];
t(a) && (i.length > 0 && i.push(", "), i.push(r + " : function(__ko_value) { " + a + " = __ko_value; }"));
}
if (i.length > 0) {
var s = i.join("");
e = e + ", '_ko_property_writers' : { " + s + " } ";
}
return e;
}
};
}(), n.exportSymbol("ko.jsonExpressionRewriting", n.jsonExpressionRewriting), n.exportSymbol("ko.jsonExpressionRewriting.parseJson", n.jsonExpressionRewriting.parseJson), 
n.exportSymbol("ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson", n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson), 
function() {
function o(t, o) {
try {
var i = " { " + n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t) + " } ";
return n.utils.evalWithinScope(i, null === o ? e :o);
} catch (r) {
throw new Error("Unable to parse binding attribute.\nMessage: " + r + ";\nAttribute value: " + t);
}
}
function i(e, t, o, n, i) {
e(t, o, n, i);
}
var r = "data-bind";
n.bindingHandlers = {}, n.applyBindingsToNode = function(e, t, a, s) {
function l(e) {
return function() {
return d[e];
};
}
function c() {
return d;
}
var u = !0;
s = s || r;
var d;
new n.dependentObservable(function() {
var r = "function" == typeof t ? t() :t;
if (d = r || o(e.getAttribute(s), a), u) for (var p in d) n.bindingHandlers[p] && "function" == typeof n.bindingHandlers[p].init && i(n.bindingHandlers[p].init, e, l(p), c, a);
for (var p in d) n.bindingHandlers[p] && "function" == typeof n.bindingHandlers[p].update && i(n.bindingHandlers[p].update, e, l(p), c, a);
}, null, {
disposeWhenNodeIsRemoved:e
}), u = !1;
}, n.applyBindings = function(o, i) {
if (i && i.nodeType == t) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node (note: this is a breaking change since KO version 1.05)");
i = i || e.document.body;
var a = n.utils.getElementsHavingAttribute(i, r);
n.utils.arrayForEach(a, function(e) {
n.applyBindingsToNode(e, null, o);
});
}, n.exportSymbol("ko.bindingHandlers", n.bindingHandlers), n.exportSymbol("ko.applyBindings", n.applyBindings), 
n.exportSymbol("ko.applyBindingsToNode", n.applyBindingsToNode);
}();
var r = [ "click" ];
n.utils.arrayForEach(r, function(e) {
n.bindingHandlers[e] = {
init:function(t, o, i, r) {
var a = function() {
var t = {};
return t[e] = o(), t;
};
return n.bindingHandlers.event.init.call(this, t, a, i, r);
}
};
}), n.bindingHandlers.event = {
init:function(e, t, o, i) {
var r = t() || {};
for (var a in r) !function() {
var r = a;
"string" == typeof r && n.utils.registerEventHandler(e, r, function(e) {
var n, a = t()[r];
if (a) {
var s = o();
try {
n = a.apply(i, arguments);
} finally {
n !== !0 && (e.preventDefault ? e.preventDefault() :e.returnValue = !1);
}
var l = s[r + "Bubble"] !== !1;
l || (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
}
});
}();
}
}, n.bindingHandlers.submit = {
init:function(e, t, o, i) {
if ("function" != typeof t()) throw new Error("The value for a submit binding must be a function to invoke on submit");
n.utils.registerEventHandler(e, "submit", function(o) {
var n, r = t();
try {
n = r.call(i, e);
} finally {
n !== !0 && (o.preventDefault ? o.preventDefault() :o.returnValue = !1);
}
});
}
}, n.bindingHandlers.visible = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t()), i = !("none" == e.style.display);
o && !i ? e.style.display = "" :!o && i && (e.style.display = "none");
}
}, n.bindingHandlers.enable = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t());
o && e.disabled ? e.removeAttribute("disabled") :o || e.disabled || (e.disabled = !0);
}
}, n.bindingHandlers.disable = {
update:function(e, t) {
n.bindingHandlers.enable.update(e, function() {
return !n.utils.unwrapObservable(t());
});
}
}, n.bindingHandlers.value = {
init:function(e, t, o) {
var i = [ "change" ], r = o().valueUpdate;
r && ("string" == typeof r && (r = [ r ]), n.utils.arrayPushAll(i, r), i = n.utils.arrayGetDistinctValues(i)), 
n.utils.arrayForEach(i, function(i) {
var r = !1;
n.utils.stringStartsWith(i, "after") && (r = !0, i = i.substring("after".length));
var a = r ? function(e) {
setTimeout(e, 0);
} :function(e) {
e();
};
n.utils.registerEventHandler(e, i, function() {
a(function() {
var i = t(), r = n.selectExtensions.readValue(e);
if (n.isWriteableObservable(i)) i(r); else {
var a = o();
a._ko_property_writers && a._ko_property_writers.value && a._ko_property_writers.value(r);
}
});
});
});
},
update:function(e, t) {
var o = n.utils.unwrapObservable(t()), i = n.selectExtensions.readValue(e), r = o != i;
if (0 === o && 0 !== i && "0" !== i && (r = !0), r) {
var a = function() {
n.selectExtensions.writeValue(e, o);
};
a();
var s = "SELECT" == e.tagName;
s && setTimeout(a, 0);
}
"SELECT" == e.tagName && (i = n.selectExtensions.readValue(e), i !== o && n.utils.triggerEvent(e, "change"));
}
}, n.bindingHandlers.options = {
update:function(e, o, i) {
if ("SELECT" != e.tagName) throw new Error("options binding applies only to SELECT elements");
{
var r = n.utils.arrayMap(n.utils.arrayFilter(e.childNodes, function(e) {
return e.tagName && "OPTION" == e.tagName && e.selected;
}), function(e) {
return n.selectExtensions.readValue(e) || e.innerText || e.textContent;
}), a = e.scrollTop, s = n.utils.unwrapObservable(o());
e.value;
}
if (n.utils.emptyDomNode(e), s) {
var l = i();
if ("number" != typeof s.length && (s = [ s ]), l.optionsCaption) {
var c = document.createElement("OPTION");
c.innerHTML = l.optionsCaption, n.selectExtensions.writeValue(c, t), e.appendChild(c);
}
for (var u = 0, d = s.length; d > u; u++) {
var c = document.createElement("OPTION"), p = "string" == typeof l.optionsValue ? s[u][l.optionsValue] :s[u];
p = n.utils.unwrapObservable(p), n.selectExtensions.writeValue(c, p);
var h = l.optionsText;
optionText = "function" == typeof h ? h(s[u]) :"string" == typeof h ? s[u][h] :p, 
(null === optionText || optionText === t) && (optionText = ""), optionText = n.utils.unwrapObservable(optionText).toString(), 
"string" == typeof c.innerText ? c.innerText = optionText :c.textContent = optionText, 
e.appendChild(c);
}
for (var g = e.getElementsByTagName("OPTION"), f = 0, u = 0, d = g.length; d > u; u++) n.utils.arrayIndexOf(r, n.selectExtensions.readValue(g[u])) >= 0 && (n.utils.setOptionNodeSelectionState(g[u], !0), 
f++);
a && (e.scrollTop = a);
}
}
}, n.bindingHandlers.options.optionValueDomDataKey = "__ko.bindingHandlers.options.optionValueDomData__", 
n.bindingHandlers.selectedOptions = {
getSelectedValuesFromSelectNode:function(e) {
for (var t = [], o = e.childNodes, i = 0, r = o.length; r > i; i++) {
var a = o[i];
"OPTION" == a.tagName && a.selected && t.push(n.selectExtensions.readValue(a));
}
return t;
},
init:function(e, t, o) {
n.utils.registerEventHandler(e, "change", function() {
var e = t();
if (n.isWriteableObservable(e)) e(n.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this)); else {
var i = o();
i._ko_property_writers && i._ko_property_writers.value && i._ko_property_writers.value(n.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
}
});
},
update:function(e, t) {
if ("SELECT" != e.tagName) throw new Error("values binding applies only to SELECT elements");
var o = n.utils.unwrapObservable(t());
if (o && "number" == typeof o.length) for (var i = e.childNodes, r = 0, a = i.length; a > r; r++) {
var s = i[r];
"OPTION" == s.tagName && n.utils.setOptionNodeSelectionState(s, n.utils.arrayIndexOf(o, n.selectExtensions.readValue(s)) >= 0);
}
}
}, n.bindingHandlers.text = {
update:function(e, o) {
var i = n.utils.unwrapObservable(o());
(null === i || i === t) && (i = ""), "string" == typeof e.innerText ? e.innerText = i :e.textContent = i;
}
}, n.bindingHandlers.html = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t());
n.utils.setHtml(e, o);
}
}, n.bindingHandlers.css = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t() || {});
for (var i in o) if ("string" == typeof i) {
var r = n.utils.unwrapObservable(o[i]);
n.utils.toggleDomNodeCssClass(e, i, r);
}
}
}, n.bindingHandlers.style = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t() || {});
for (var i in o) if ("string" == typeof i) {
var r = n.utils.unwrapObservable(o[i]);
e.style[i] = r || "";
}
}
}, n.bindingHandlers.uniqueName = {
init:function(e, t) {
t() && (e.name = "ko_unique_" + ++n.bindingHandlers.uniqueName.currentIndex, n.utils.isIe6 && e.mergeAttributes(document.createElement("<input name='" + e.name + "'/>"), !1));
}
}, n.bindingHandlers.uniqueName.currentIndex = 0, n.bindingHandlers.checked = {
init:function(e, t, o) {
var i = function() {
var i;
if ("checkbox" == e.type) i = e.checked; else {
if ("radio" != e.type || !e.checked) return;
i = e.value;
}
var r = t();
if ("checkbox" == e.type && n.utils.unwrapObservable(r) instanceof Array) {
var a = n.utils.arrayIndexOf(n.utils.unwrapObservable(r), e.value);
e.checked && 0 > a ? r.push(e.value) :!e.checked && a >= 0 && r.splice(a, 1);
} else if (n.isWriteableObservable(r)) r() !== i && r(i); else {
var s = o();
s._ko_property_writers && s._ko_property_writers.checked && s._ko_property_writers.checked(i);
}
};
n.utils.registerEventHandler(e, "click", i), "radio" != e.type || e.name || n.bindingHandlers.uniqueName.init(e, function() {
return !0;
});
},
update:function(e, t) {
var o = n.utils.unwrapObservable(t());
"checkbox" == e.type ? (e.checked = o instanceof Array ? n.utils.arrayIndexOf(o, e.value) >= 0 :o, 
o && n.utils.isIe6 && e.mergeAttributes(document.createElement("<input type='checkbox' checked='checked' />"), !1)) :"radio" == e.type && (e.checked = e.value == o, 
e.value == o && (n.utils.isIe6 || n.utils.isIe7) && e.mergeAttributes(document.createElement("<input type='radio' checked='checked' />"), !1));
}
}, n.bindingHandlers.attr = {
update:function(e, o) {
var i = n.utils.unwrapObservable(o()) || {};
for (var r in i) if ("string" == typeof r) {
var a = n.utils.unwrapObservable(i[r]);
a === !1 || null === a || a === t ? e.removeAttribute(r) :e.setAttribute(r, a.toString());
}
}
}, n.templateEngine = function() {
this.renderTemplate = function() {
throw "Override renderTemplate in your ko.templateEngine subclass";
}, this.isTemplateRewritten = function() {
throw "Override isTemplateRewritten in your ko.templateEngine subclass";
}, this.rewriteTemplate = function() {
throw "Override rewriteTemplate in your ko.templateEngine subclass";
}, this.createJavaScriptEvaluatorBlock = function() {
throw "Override createJavaScriptEvaluatorBlock in your ko.templateEngine subclass";
};
}, n.exportSymbol("ko.templateEngine", n.templateEngine), n.templateRewriting = function() {
var e = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;
return {
ensureTemplateIsRewritten:function(e, t) {
t.isTemplateRewritten(e) || t.rewriteTemplate(e, function(e) {
return n.templateRewriting.memoizeBindingAttributeSyntax(e, t);
});
},
memoizeBindingAttributeSyntax:function(t, o) {
return t.replace(e, function() {
var e = arguments[1], t = arguments[6];
t = n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t);
var i = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                     return (function() { return { " + t + " } })()                 })";
return o.createJavaScriptEvaluatorBlock(i) + e;
});
},
applyMemoizedBindingsToNextSibling:function(e) {
return n.memoization.memoize(function(t, o) {
t.nextSibling && n.applyBindingsToNode(t.nextSibling, e, o);
});
}
};
}(), n.exportSymbol("ko.templateRewriting", n.templateRewriting), n.exportSymbol("ko.templateRewriting.applyMemoizedBindingsToNextSibling", n.templateRewriting.applyMemoizedBindingsToNextSibling), 
function() {
function e(e) {
return e.nodeType ? e :e.length > 0 ? e[0] :null;
}
function o(e, t, o, i, a) {
var s = n.utils.unwrapObservable(i);
a = a || {};
var l = a.templateEngine || r;
n.templateRewriting.ensureTemplateIsRewritten(o, l);
var c = l.renderTemplate(o, s, a);
if ("number" != typeof c.length || c.length > 0 && "number" != typeof c[0].nodeType) throw "Template engine must return an array of DOM nodes";
switch (c && n.utils.arrayForEach(c, function(e) {
n.memoization.unmemoizeDomNodeAndDescendants(e, [ i ]);
}), t) {
case "replaceChildren":
n.utils.setDomNodeChildren(e, c);
break;

case "replaceNode":
n.utils.replaceDomNodes(e, c);
break;

case "ignoreTargetNode":
break;

default:
throw new Error("Unknown renderMode: " + t);
}
return a.afterRender && a.afterRender(c, i), c;
}
function i(e, t) {
var o = n.utils.domData.get(e, a);
o && "function" == typeof o.dispose && o.dispose(), n.utils.domData.set(e, a, t);
}
var r;
n.setTemplateEngine = function(e) {
if (e != t && !(e instanceof n.templateEngine)) throw "templateEngine must inherit from ko.templateEngine";
r = e;
}, n.renderTemplate = function(i, a, s, l, c) {
if (s = s || {}, (s.templateEngine || r) == t) throw "Set a template engine before calling renderTemplate";
if (c = c || "replaceChildren", l) {
var u = e(l), d = function() {
return !u || !n.utils.domNodeIsAttachedToDocument(u);
}, p = u && "replaceNode" == c ? u.parentNode :u;
return new n.dependentObservable(function() {
var t = "function" == typeof i ? i(a) :i, n = o(l, c, t, a, s);
"replaceNode" == c && (l = n, u = e(l));
}, null, {
disposeWhen:d,
disposeWhenNodeIsRemoved:p
});
}
return n.memoization.memoize(function(e) {
n.renderTemplate(i, a, s, e, "replaceNode");
});
}, n.renderTemplateForEach = function(e, t, i, r) {
return new n.dependentObservable(function() {
var a = n.utils.unwrapObservable(t) || [];
"undefined" == typeof a.length && (a = [ a ]);
var s = n.utils.arrayFilter(a, function(e) {
return i.includeDestroyed || !e._destroy;
});
n.utils.setDomNodeChildrenFromArrayMapping(r, s, function(t) {
var n = "function" == typeof e ? e(t) :e;
return o(null, "ignoreTargetNode", n, t, i);
}, i);
}, null, {
disposeWhenNodeIsRemoved:r
});
};
var a = "__ko__templateSubscriptionDomDataKey__";
n.bindingHandlers.template = {
update:function(e, t, o, r) {
var a, s = n.utils.unwrapObservable(t()), l = "string" == typeof s ? s :s.name;
if ("undefined" != typeof s.foreach) a = n.renderTemplateForEach(l, s.foreach || [], {
templateOptions:s.templateOptions,
afterAdd:s.afterAdd,
beforeRemove:s.beforeRemove,
includeDestroyed:s.includeDestroyed,
afterRender:s.afterRender
}, e); else {
var c = s.data;
a = n.renderTemplate(l, "undefined" == typeof c ? r :c, {
templateOptions:s.templateOptions,
afterRender:s.afterRender
}, e);
}
i(e, a);
}
};
}(), n.exportSymbol("ko.setTemplateEngine", n.setTemplateEngine), n.exportSymbol("ko.renderTemplate", n.renderTemplate), 
function() {
function e(e, o, n) {
for (var i = [], r = 0; r <= o.length; r++) i[r] = [];
for (var r = 0, a = Math.min(e.length, n); a >= r; r++) i[0][r] = r;
for (var r = 1, a = Math.min(o.length, n); a >= r; r++) i[r][0] = r;
var s, l, c = e.length, u = o.length;
for (s = 1; c >= s; s++) {
var d = Math.max(1, s - n), p = Math.min(u, s + n);
for (l = d; p >= l; l++) if (e[s - 1] === o[l - 1]) i[l][s] = i[l - 1][s - 1]; else {
var h = i[l - 1][s] === t ? Number.MAX_VALUE :i[l - 1][s] + 1, g = i[l][s - 1] === t ? Number.MAX_VALUE :i[l][s - 1] + 1;
i[l][s] = Math.min(h, g);
}
}
return i;
}
function o(e, o, n) {
var i = o.length, r = n.length, a = [], s = e[r][i];
if (s === t) return null;
for (;i > 0 || r > 0; ) {
var l = e[r][i], c = r > 0 ? e[r - 1][i] :s + 1, u = i > 0 ? e[r][i - 1] :s + 1, d = r > 0 && i > 0 ? e[r - 1][i - 1] :s + 1;
(c === t || l - 1 > c) && (c = s + 1), (u === t || l - 1 > u) && (u = s + 1), l - 1 > d && (d = s + 1), 
u >= c && d > c ? (a.push({
status:"added",
value:n[r - 1]
}), r--) :c > u && d > u ? (a.push({
status:"deleted",
value:o[i - 1]
}), i--) :(a.push({
status:"retained",
value:o[i - 1]
}), r--, i--);
}
return a.reverse();
}
n.utils.compareArrays = function(i, r, a) {
if (a === t) return n.utils.compareArrays(i, r, 1) || n.utils.compareArrays(i, r, 10) || n.utils.compareArrays(i, r, Number.MAX_VALUE);
i = i || [], r = r || [];
var s = e(i, r, a);
return o(s, i, r);
};
}(), n.exportSymbol("ko.utils.compareArrays", n.utils.compareArrays), function() {
function e(e, t, o) {
var i = [], r = n.dependentObservable(function() {
var e = t(o) || [];
i.length > 0 && n.utils.replaceDomNodes(i, e), i.splice(0, i.length), n.utils.arrayPushAll(i, e);
}, null, {
disposeWhenNodeIsRemoved:e,
disposeWhen:function() {
return 0 == i.length || !n.utils.domNodeIsAttachedToDocument(i[0]);
}
});
return {
mappedNodes:i,
dependentObservable:r
};
}
n.utils.setDomNodeChildrenFromArrayMapping = function(o, i, r, a) {
i = i || [], a = a || {};
for (var s = n.utils.domData.get(o, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === t, l = n.utils.domData.get(o, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], c = n.utils.arrayMap(l, function(e) {
return e.arrayEntry;
}), u = n.utils.compareArrays(c, i), d = [], p = 0, h = [], g = [], f = null, m = 0, v = u.length; v > m; m++) switch (u[m].status) {
case "retained":
var b = l[p];
d.push(b), b.domNodes.length > 0 && (f = b.domNodes[b.domNodes.length - 1]), p++;
break;

case "deleted":
l[p].dependentObservable.dispose(), n.utils.arrayForEach(l[p].domNodes, function(e) {
h.push({
element:e,
index:m,
value:u[m].value
}), f = e;
}), p++;
break;

case "added":
var w = e(o, r, u[m].value), y = w.mappedNodes;
d.push({
arrayEntry:u[m].value,
domNodes:y,
dependentObservable:w.dependentObservable
});
for (var _ = 0, k = y.length; k > _; _++) {
var x = y[_];
g.push({
element:x,
index:m,
value:u[m].value
}), null == f ? o.firstChild ? o.insertBefore(x, o.firstChild) :o.appendChild(x) :f.nextSibling ? o.insertBefore(x, f.nextSibling) :o.appendChild(x), 
f = x;
}
}
n.utils.arrayForEach(h, function(e) {
n.cleanNode(e.element);
});
var S = !1;
if (!s) {
if (a.afterAdd) for (var m = 0; m < g.length; m++) a.afterAdd(g[m].element, g[m].index, g[m].value);
if (a.beforeRemove) {
for (var m = 0; m < h.length; m++) a.beforeRemove(h[m].element, h[m].index, h[m].value);
S = !0;
}
}
S || n.utils.arrayForEach(h, function(e) {
e.element.parentNode && e.element.parentNode.removeChild(e.element);
}), n.utils.domData.set(o, "setDomNodeChildrenFromArrayMapping_lastMappingResult", d);
};
}(), n.exportSymbol("ko.utils.setDomNodeChildrenFromArrayMapping", n.utils.setDomNodeChildrenFromArrayMapping), 
n.jqueryTmplTemplateEngine = function() {
this.jQueryTmplVersion = function() {
return "undefined" != typeof jQuery && jQuery.tmpl ? jQuery.tmpl.tag ? jQuery.tmpl.tag.tmpl && jQuery.tmpl.tag.tmpl.open && jQuery.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0 ? 3 :2 :1 :0;
}(), this.getTemplateNode = function(e) {
var t = document.getElementById(e);
if (null == t) throw new Error("Cannot find template with ID=" + e);
return t;
};
var e = "__ko_apos__", t = new RegExp(e, "g");
this.renderTemplate = function(e, o, n) {
if (n = n || {}, 0 == this.jQueryTmplVersion) throw new Error("jquery.tmpl not detected.\nTo use KO's default template engine, reference jQuery and jquery.tmpl. See Knockout installation documentation for more details.");
if (1 == this.jQueryTmplVersion) {
var i = '<script type="text/html">' + this.getTemplateNode(e).text + "</script>", r = jQuery.tmpl(i, o), a = r[0].text.replace(t, "'");
return jQuery.clean([ a ], document);
}
if (!(e in jQuery.template)) {
var s = this.getTemplateNode(e).text;
jQuery.template(e, s);
}
o = [ o ];
var l = jQuery.tmpl(e, o, n.templateOptions);
return l.appendTo(document.createElement("div")), jQuery.fragments = {}, l;
}, this.isTemplateRewritten = function(e) {
return e in jQuery.template ? !0 :this.getTemplateNode(e).isRewritten === !0;
}, this.rewriteTemplate = function(t, o) {
var i = this.getTemplateNode(t);
text = i.text.replace(/([\w-]+)=([\w-]+)([ >])/g, function(e, t, o, n) {
return t + '="' + o + '"' + n;
});
var r = o(text);
1 == this.jQueryTmplVersion && (r = n.utils.stringTrim(r), r = r.replace(/([\s\S]*?)(\${[\s\S]*?}|{{[\=a-z][\s\S]*?}}|$)/g, function() {
var t = arguments[1], o = arguments[2];
return t.replace(/\'/g, e) + o;
})), i.text = r, i.isRewritten = !0;
}, this.createJavaScriptEvaluatorBlock = function(e) {
return 1 == this.jQueryTmplVersion ? "{{= " + e + "}}" :"{{ko_code ((function() { return " + e + " })()) }}";
}, this.addTemplate = function(e, t) {
document.write("<script type='text/html' id='" + e + "'>" + t + "</script>");
}, n.exportProperty(this, "addTemplate", this.addTemplate), this.jQueryTmplVersion > 1 && (jQuery.tmpl.tag.ko_code = {
open:(this.jQueryTmplVersion < 3 ? "_" :"__") + ".push($1 || '');"
});
}, n.jqueryTmplTemplateEngine.prototype = new n.templateEngine(), n.setTemplateEngine(new n.jqueryTmplTemplateEngine()), 
n.exportSymbol("ko.jqueryTmplTemplateEngine", n.jqueryTmplTemplateEngine);
}(window), ko.exportSymbol = function(e, t) {
for (var o = e.split("."), n = window, i = 0; i < o.length - 1; i++) n = n[o[i]];
n[o[o.length - 1]] = t;
}, ko.exportProperty = function(e, t, o) {
e[t] = o;
}, function() {
function e(t, o) {
for (var n in o) o.hasOwnProperty(n) && o[n] && (!t[n] || t[n] instanceof Array ? t[n] = o[n] :e(t[n], o[n]));
}
function t(t, o) {
var n = {};
return e(n, t), e(n, o), n;
}
function o(e) {
return e && "object" == typeof e && e.constructor == new Date().constructor ? "date" :typeof e;
}
function n(e, t) {
return e = e || {}, (e.create instanceof Function || e.key instanceof Function || e.arrayChanged instanceof Function) && (e = {
"":e
}), t && (e.ignore = i(t.ignore, e.ignore), e.include = i(t.include, e.include), 
e.copy = i(t.copy, e.copy)), e.ignore = i(e.ignore, b.ignore), e.include = i(e.include, b.include), 
e.copy = i(e.copy, b.copy), e.mappedProperties = {}, e;
}
function i(e, t) {
return e instanceof Array || (e = "undefined" === o(e) ? [] :[ e ]), t instanceof Array || (t = "undefined" === o(t) ? [] :[ t ]), 
e.concat(t);
}
function r(e) {
var t = ko.dependentObservable;
ko.dependentObservable = function() {
var e = arguments[2] || {};
e.deferEvaluation = !0;
var t = new m(arguments[0], arguments[1], e);
return t.__ko_proto__ = m, t;
};
var o = e();
return ko.dependentObservable = t, o;
}
function a(e, n, i, l, h, m, v) {
var b = ko.utils.unwrapObservable(n) instanceof Array;
if (v = v || "", ko.mapping.isMapped(e)) {
var w = ko.utils.unwrapObservable(e)[f];
i = t(w, i);
}
var y = function() {
return i[h] && i[h].create instanceof Function;
};
if (l = l || new g(), l.get(n)) return e;
if (h = h || "", b) {
var _ = [], k = function(e) {
return e;
};
i[h] && i[h].key && (k = i[h].key);
var x = function(e) {
return e;
};
y() && (x = function(e) {
return i[h].create({
data:e,
parent:m
});
}), ko.isObservable(e) || (e = ko.observableArray([]), e.mappedRemove = function(t) {
var o = "function" == typeof t ? t :function(e) {
return e === k(t);
};
return e.remove(function(e) {
return o(k(e));
});
}, e.mappedRemoveAll = function(t) {
var o = u(t, k);
return e.remove(function(e) {
return -1 != ko.utils.arrayIndexOf(o, k(e));
});
}, e.mappedDestroy = function(t) {
var o = "function" == typeof t ? t :function(e) {
return e === k(t);
};
return e.destroy(function(e) {
return o(k(e));
});
}, e.mappedDestroyAll = function(t) {
var o = u(t, k);
return e.destroy(function(e) {
return -1 != ko.utils.arrayIndexOf(o, k(e));
});
}, e.mappedIndexOf = function(t) {
var o = u(e(), k), n = k(t);
return ko.utils.arrayIndexOf(o, n);
}, e.mappedCreate = function(t) {
if (-1 !== e.mappedIndexOf(t)) throw new Error("There already is an object with the key that you specified.");
var o = x(t);
return e.push(o), o;
});
for (var S = u(ko.utils.unwrapObservable(e), k).sort(), C = u(n, k).sort(), E = ko.utils.compareArrays(S, C), T = {}, $ = [], I = 0, O = E.length; O > I; I++) {
var A, B = E[I], D = v + "[" + I + "]";
switch (B.status) {
case "added":
var N = c(ko.utils.unwrapObservable(n), B.value, k);
A = ko.utils.unwrapObservable(a(void 0, N, i, l, h, e, D));
var M = s(ko.utils.unwrapObservable(n), N, T);
$[M] = A, T[M] = !0;
break;

case "retained":
var N = c(ko.utils.unwrapObservable(n), B.value, k);
A = c(e, B.value, k), a(A, N, i, l, h, e, D);
var M = s(ko.utils.unwrapObservable(n), N, T);
$[M] = A, T[M] = !0;
break;

case "deleted":
A = c(e, B.value, k);
}
_.push({
event:B.status,
item:A
});
}
e($), i[h] && i[h].arrayChanged && ko.utils.arrayForEach(_, function(e) {
i[h].arrayChanged(e.event, e.item);
});
} else if (p(n)) {
if (!e) {
if (y()) {
var H = r(function() {
return i[h].create({
data:n,
parent:m
});
});
return H;
}
e = {};
}
l.save(n, e), d(n, function(t) {
var o = v.length ? v + "." + t :t;
if (-1 == ko.utils.arrayIndexOf(i.ignore, o)) {
if (-1 != ko.utils.arrayIndexOf(i.copy, o)) return e[t] = n[t], void 0;
var r = l.get(n[t]);
e[t] = r ? r :a(e[t], n[t], i, l, t, e, o), i.mappedProperties[o] = !0;
}
});
} else switch (o(n)) {
case "function":
e = n;
break;

default:
ko.isWriteableObservable(e) ? e(ko.utils.unwrapObservable(n)) :e = y() ? r(function() {
return i[h].create({
data:n,
parent:m
});
}) :ko.observable(ko.utils.unwrapObservable(n));
}
return e;
}
function s(e, t, o) {
for (var n = 0, i = e.length; i > n; n++) if (o[n] !== !0 && e[n] == t) return n;
return null;
}
function l(e, t) {
var n;
return t && (n = t(e)), "undefined" === o(n) && (n = e), ko.utils.unwrapObservable(n);
}
function c(e, t, o) {
var n = ko.utils.arrayFilter(ko.utils.unwrapObservable(e), function(e) {
return l(e, o) == t;
});
if (0 == n.length) throw new Error("When calling ko.update*, the key '" + t + "' was not found!");
if (n.length > 1 && p(n[0])) throw new Error("When calling ko.update*, the key '" + t + "' was not unique!");
return n[0];
}
function u(e, t) {
return ko.utils.arrayMap(ko.utils.unwrapObservable(e), function(e) {
return t ? l(e, t) :e;
});
}
function d(e, t) {
if (e instanceof Array) for (var o = 0; o < e.length; o++) t(o); else for (var n in e) t(n);
}
function p(e) {
var t = o(e);
return "object" == t && null !== e && "undefined" !== t;
}
function h(e, t, o) {
var n = e || "";
return t instanceof Array ? e && (n += "[" + o + "]") :(e && (n += "."), n += o), 
n;
}
function g() {
var e = [], t = [];
this.save = function(o, n) {
var i = ko.utils.arrayIndexOf(e, o);
i >= 0 ? t[i] = n :(e.push(o), t.push(n));
}, this.get = function(o) {
var n = ko.utils.arrayIndexOf(e, o);
return n >= 0 ? t[n] :void 0;
};
}
ko.mapping = {};
var f = "__ko_mapping__", m = ko.dependentObservable, v = {
include:[ "_destroy" ],
ignore:[],
copy:[]
}, b = v;
ko.mapping.fromJS = function(e, o, i) {
if (0 == arguments.length) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
o = n(o);
var r = a(i, e, o);
return r[f] = t(r[f], o), r;
}, ko.mapping.fromJSON = function(e, t) {
var o = ko.utils.parseJson(e);
return ko.mapping.fromJS(o, t);
}, ko.mapping.isMapped = function(e) {
var t = ko.utils.unwrapObservable(e);
return t && t[f];
}, ko.mapping.updateFromJS = function(e, t) {
if (arguments.length < 2) throw new Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
if (!e) throw new Error("The object is undefined.");
if (!e[f]) throw new Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
return a(e, t, e[f]);
}, ko.mapping.updateFromJSON = function(e, t, o) {
var n = ko.utils.parseJson(t);
return ko.mapping.updateFromJS(e, n, o);
}, ko.mapping.toJS = function(e, t) {
if (b || ko.mapping.resetDefaultOptions(), 0 == arguments.length) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
if (!(b.ignore instanceof Array)) throw new Error("ko.mapping.defaultOptions().ignore should be an array.");
if (!(b.include instanceof Array)) throw new Error("ko.mapping.defaultOptions().include should be an array.");
if (!(b.copy instanceof Array)) throw new Error("ko.mapping.defaultOptions().copy should be an array.");
return t = n(t, e[f]), ko.mapping.visitModel(e, function(e) {
return ko.utils.unwrapObservable(e);
}, t);
}, ko.mapping.toJSON = function(e, t) {
var o = ko.mapping.toJS(e, t);
return ko.utils.stringifyJson(o);
}, ko.mapping.defaultOptions = function() {
return arguments.length > 0 ? (b = arguments[0], void 0) :b;
}, ko.mapping.resetDefaultOptions = function() {
b = {
include:v.include.slice(0),
ignore:v.ignore.slice(0),
copy:v.copy.slice(0)
};
}, ko.mapping.visitModel = function(e, t, i) {
i = i || {}, i.visitedObjects = i.visitedObjects || new g(), i.parentName || (i = n(i));
var r, a = ko.utils.unwrapObservable(e);
if (!p(a)) return t(e, i.parentName);
t(e, i.parentName), r = a instanceof Array ? [] :{}, i.visitedObjects.save(e, r);
var s = i.parentName;
return d(a, function(e) {
if (!i.ignore || -1 == ko.utils.arrayIndexOf(i.ignore, e)) {
var n = a[e];
if (i.parentName = h(s, a, e), -1 !== ko.utils.arrayIndexOf(i.copy, e) || -1 !== ko.utils.arrayIndexOf(i.include, e) || !a[f] || !a[f].mappedProperties || a[f].mappedProperties[e] || a instanceof Array) {
switch (o(ko.utils.unwrapObservable(n))) {
case "object":
case "undefined":
var l = i.visitedObjects.get(n);
r[e] = "undefined" !== o(l) ? l :ko.mapping.visitModel(n, t, i);
break;

default:
r[e] = t(n, i.parentName);
}
}
}
}), r;
}, ko.exportSymbol("ko.mapping", ko.mapping), ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS), 
ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON), ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped), 
ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions), ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS), 
ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON), ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS), 
ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON), ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel);
}(), function(e) {
var t = "data-bind";
e.currentlyBindingNamespace = "", e.applyBindings = function(o, n, i) {
n && void 0 !== n.nodeType ? (i = n, n = "") :(n = n || "", i = i || window.document.body), 
e.currentlyBindingNamespace = n;
var r = n.length > 0 ? "-" + n :"", a = t + r, s = e.utils.getElementsHavingAttribute(i, a);
e.utils.arrayForEach(s, function(t) {
e.applyBindingsToNode(t, null, o, a);
}), e.currentlyBindingNamespace = "";
}, e.templateRewriting = function() {
var t = /(<[a-z]+\d*(\s+(?!data-bind(-[a-z0-9\-]*)?=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind(-[a-z0-9\-]*)?=(["'])([\s\S]*?)\7/gi;
return {
ensureTemplateIsRewritten:function(t, o) {
o.isTemplateRewritten(t) || o.rewriteTemplate(t, function(t) {
return e.templateRewriting.memoizeBindingAttributeSyntax(t, o);
});
},
memoizeBindingAttributeSyntax:function(o, n) {
return o.replace(t, function(t) {
var o = arguments[1], i = arguments[8], r = arguments[6] ? arguments[6].slice(1) :"";
if ("" === r || r === e.currentlyBindingNamespace) {
i = e.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(i);
var a = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                         return (function() { return { " + i + " } })()                     })";
return n.createJavaScriptEvaluatorBlock(a) + o;
}
return t;
});
},
applyMemoizedBindingsToNextSibling:function(t) {
return e.memoization.memoize(function(o, n) {
o.nextSibling && e.applyBindingsToNode(o.nextSibling, t, n);
});
}
};
}();
}(ko), function() {
function e(t, o, n) {
if (t === o) return 0 !== t || 1 / t == 1 / o;
if (null == t || null == o) return t === o;
if (t._chain && (t = t._wrapped), o._chain && (o = o._wrapped), t.isEqual && x.isFunction(t.isEqual)) return t.isEqual(o);
if (o.isEqual && x.isFunction(o.isEqual)) return o.isEqual(t);
var i = c.call(t);
if (i != c.call(o)) return !1;
switch (i) {
case "[object String]":
return t == String(o);

case "[object Number]":
return t != +t ? o != +o :0 == t ? 1 / t == 1 / o :t == +o;

case "[object Date]":
case "[object Boolean]":
return +t == +o;

case "[object RegExp]":
return t.source == o.source && t.global == o.global && t.multiline == o.multiline && t.ignoreCase == o.ignoreCase;
}
if ("object" != typeof t || "object" != typeof o) return !1;
for (var r = n.length; r--; ) if (n[r] == t) return !0;
n.push(t);
var a = 0, s = !0;
if ("[object Array]" == i) {
if (a = t.length, s = a == o.length) for (;a-- && (s = a in t == a in o && e(t[a], o[a], n)); ) ;
} else {
if ("constructor" in t != "constructor" in o || t.constructor != o.constructor) return !1;
for (var l in t) if (x.has(t, l) && (a++, !(s = x.has(o, l) && e(t[l], o[l], n)))) break;
if (s) {
for (l in o) if (x.has(o, l) && !a--) break;
s = !a;
}
}
return n.pop(), s;
}
var t = this, o = t._, n = {}, i = Array.prototype, r = Object.prototype, a = Function.prototype, s = i.slice, l = i.unshift, c = r.toString, u = r.hasOwnProperty, d = i.forEach, p = i.map, h = i.reduce, g = i.reduceRight, f = i.filter, m = i.every, v = i.some, b = i.indexOf, w = i.lastIndexOf, y = Array.isArray, _ = Object.keys, k = a.bind, x = function(e) {
return new O(e);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), 
exports._ = x) :t._ = x, x.VERSION = "1.3.1";
var S = x.each = x.forEach = function(e, t, o) {
if (null != e) if (d && e.forEach === d) e.forEach(t, o); else if (e.length === +e.length) {
for (var i = 0, r = e.length; r > i; i++) if (i in e && t.call(o, e[i], i, e) === n) return;
} else for (var a in e) if (x.has(e, a) && t.call(o, e[a], a, e) === n) return;
};
x.map = x.collect = function(e, t, o) {
var n = [];
return null == e ? n :p && e.map === p ? e.map(t, o) :(S(e, function(e, i, r) {
n[n.length] = t.call(o, e, i, r);
}), e.length === +e.length && (n.length = e.length), n);
}, x.reduce = x.foldl = x.inject = function(e, t, o, n) {
var i = arguments.length > 2;
if (null == e && (e = []), h && e.reduce === h) return n && (t = x.bind(t, n)), 
i ? e.reduce(t, o) :e.reduce(t);
if (S(e, function(e, r, a) {
i ? o = t.call(n, o, e, r, a) :(o = e, i = !0);
}), !i) throw new TypeError("Reduce of empty array with no initial value");
return o;
}, x.reduceRight = x.foldr = function(e, t, o, n) {
var i = arguments.length > 2;
if (null == e && (e = []), g && e.reduceRight === g) return n && (t = x.bind(t, n)), 
i ? e.reduceRight(t, o) :e.reduceRight(t);
var r = x.toArray(e).reverse();
return n && !i && (t = x.bind(t, n)), i ? x.reduce(r, t, o, n) :x.reduce(r, t);
}, x.find = x.detect = function(e, t, o) {
var n;
return C(e, function(e, i, r) {
return t.call(o, e, i, r) ? (n = e, !0) :void 0;
}), n;
}, x.filter = x.select = function(e, t, o) {
var n = [];
return null == e ? n :f && e.filter === f ? e.filter(t, o) :(S(e, function(e, i, r) {
t.call(o, e, i, r) && (n[n.length] = e);
}), n);
}, x.reject = function(e, t, o) {
var n = [];
return null == e ? n :(S(e, function(e, i, r) {
t.call(o, e, i, r) || (n[n.length] = e);
}), n);
}, x.every = x.all = function(e, t, o) {
var i = !0;
return null == e ? i :m && e.every === m ? e.every(t, o) :(S(e, function(e, r, a) {
return (i = i && t.call(o, e, r, a)) ? void 0 :n;
}), i);
};
var C = x.some = x.any = function(e, t, o) {
t || (t = x.identity);
var i = !1;
return null == e ? i :v && e.some === v ? e.some(t, o) :(S(e, function(e, r, a) {
return i || (i = t.call(o, e, r, a)) ? n :void 0;
}), !!i);
};
x.include = x.contains = function(e, t) {
var o = !1;
return null == e ? o :b && e.indexOf === b ? -1 != e.indexOf(t) :o = C(e, function(e) {
return e === t;
});
}, x.invoke = function(e, t) {
var o = s.call(arguments, 2);
return x.map(e, function(e) {
return (x.isFunction(t) ? t || e :e[t]).apply(e, o);
});
}, x.pluck = function(e, t) {
return x.map(e, function(e) {
return e[t];
});
}, x.max = function(e, t, o) {
if (!t && x.isArray(e)) return Math.max.apply(Math, e);
if (!t && x.isEmpty(e)) return -1/0;
var n = {
computed:-1/0
};
return S(e, function(e, i, r) {
var a = t ? t.call(o, e, i, r) :e;
a >= n.computed && (n = {
value:e,
computed:a
});
}), n.value;
}, x.min = function(e, t, o) {
if (!t && x.isArray(e)) return Math.min.apply(Math, e);
if (!t && x.isEmpty(e)) return 1/0;
var n = {
computed:1/0
};
return S(e, function(e, i, r) {
var a = t ? t.call(o, e, i, r) :e;
a < n.computed && (n = {
value:e,
computed:a
});
}), n.value;
}, x.shuffle = function(e) {
var t, o = [];
return S(e, function(e, n) {
0 == n ? o[0] = e :(t = Math.floor(Math.random() * (n + 1)), o[n] = o[t], o[t] = e);
}), o;
}, x.sortBy = function(e, t, o) {
return x.pluck(x.map(e, function(e, n, i) {
return {
value:e,
criteria:t.call(o, e, n, i)
};
}).sort(function(e, t) {
var o = e.criteria, n = t.criteria;
return n > o ? -1 :o > n ? 1 :0;
}), "value");
}, x.groupBy = function(e, t) {
var o = {}, n = x.isFunction(t) ? t :function(e) {
return e[t];
};
return S(e, function(e, t) {
var i = n(e, t);
(o[i] || (o[i] = [])).push(e);
}), o;
}, x.sortedIndex = function(e, t, o) {
o || (o = x.identity);
for (var n = 0, i = e.length; i > n; ) {
var r = n + i >> 1;
o(e[r]) < o(t) ? n = r + 1 :i = r;
}
return n;
}, x.toArray = function(e) {
return e ? e.toArray ? e.toArray() :x.isArray(e) ? s.call(e) :x.isArguments(e) ? s.call(e) :x.values(e) :[];
}, x.size = function(e) {
return x.toArray(e).length;
}, x.first = x.head = function(e, t, o) {
return null == t || o ? e[0] :s.call(e, 0, t);
}, x.initial = function(e, t, o) {
return s.call(e, 0, e.length - (null == t || o ? 1 :t));
}, x.last = function(e, t, o) {
return null == t || o ? e[e.length - 1] :s.call(e, Math.max(e.length - t, 0));
}, x.rest = x.tail = function(e, t, o) {
return s.call(e, null == t || o ? 1 :t);
}, x.compact = function(e) {
return x.filter(e, function(e) {
return !!e;
});
}, x.flatten = function(e, t) {
return x.reduce(e, function(e, o) {
return x.isArray(o) ? e.concat(t ? o :x.flatten(o)) :(e[e.length] = o, e);
}, []);
}, x.without = function(e) {
return x.difference(e, s.call(arguments, 1));
}, x.uniq = x.unique = function(e, t, o) {
var n = o ? x.map(e, o) :e, i = [];
return x.reduce(n, function(o, n, r) {
return 0 != r && (t === !0 ? x.last(o) == n :x.include(o, n)) || (o[o.length] = n, 
i[i.length] = e[r]), o;
}, []), i;
}, x.union = function() {
return x.uniq(x.flatten(arguments, !0));
}, x.intersection = x.intersect = function(e) {
var t = s.call(arguments, 1);
return x.filter(x.uniq(e), function(e) {
return x.every(t, function(t) {
return x.indexOf(t, e) >= 0;
});
});
}, x.difference = function(e) {
var t = x.flatten(s.call(arguments, 1));
return x.filter(e, function(e) {
return !x.include(t, e);
});
}, x.zip = function() {
for (var e = s.call(arguments), t = x.max(x.pluck(e, "length")), o = new Array(t), n = 0; t > n; n++) o[n] = x.pluck(e, "" + n);
return o;
}, x.indexOf = function(e, t, o) {
if (null == e) return -1;
var n, i;
if (o) return n = x.sortedIndex(e, t), e[n] === t ? n :-1;
if (b && e.indexOf === b) return e.indexOf(t);
for (n = 0, i = e.length; i > n; n++) if (n in e && e[n] === t) return n;
return -1;
}, x.lastIndexOf = function(e, t) {
if (null == e) return -1;
if (w && e.lastIndexOf === w) return e.lastIndexOf(t);
for (var o = e.length; o--; ) if (o in e && e[o] === t) return o;
return -1;
}, x.range = function(e, t, o) {
arguments.length <= 1 && (t = e || 0, e = 0), o = arguments[2] || 1;
for (var n = Math.max(Math.ceil((t - e) / o), 0), i = 0, r = new Array(n); n > i; ) r[i++] = e, 
e += o;
return r;
};
var E = function() {};
x.bind = function(e, t) {
var o, n;
if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
if (!x.isFunction(e)) throw new TypeError();
return n = s.call(arguments, 2), o = function() {
if (!(this instanceof o)) return e.apply(t, n.concat(s.call(arguments)));
E.prototype = e.prototype;
var i = new E(), r = e.apply(i, n.concat(s.call(arguments)));
return Object(r) === r ? r :i;
};
}, x.bindAll = function(e) {
var t = s.call(arguments, 1);
return 0 == t.length && (t = x.functions(e)), S(t, function(t) {
e[t] = x.bind(e[t], e);
}), e;
}, x.memoize = function(e, t) {
var o = {};
return t || (t = x.identity), function() {
var n = t.apply(this, arguments);
return x.has(o, n) ? o[n] :o[n] = e.apply(this, arguments);
};
}, x.delay = function(e, t) {
var o = s.call(arguments, 2);
return setTimeout(function() {
return e.apply(e, o);
}, t);
}, x.defer = function(e) {
return x.delay.apply(x, [ e, 1 ].concat(s.call(arguments, 1)));
}, x.throttle = function(e, t) {
var o, n, i, r, a, s = x.debounce(function() {
a = r = !1;
}, t);
return function() {
o = this, n = arguments;
var l = function() {
i = null, a && e.apply(o, n), s();
};
i || (i = setTimeout(l, t)), r ? a = !0 :e.apply(o, n), s(), r = !0;
};
}, x.debounce = function(e, t) {
var o;
return function() {
var n = this, i = arguments, r = function() {
o = null, e.apply(n, i);
};
clearTimeout(o), o = setTimeout(r, t);
};
}, x.once = function(e) {
var t, o = !1;
return function() {
return o ? t :(o = !0, t = e.apply(this, arguments));
};
}, x.wrap = function(e, t) {
return function() {
var o = [ e ].concat(s.call(arguments, 0));
return t.apply(this, o);
};
}, x.compose = function() {
var e = arguments;
return function() {
for (var t = arguments, o = e.length - 1; o >= 0; o--) t = [ e[o].apply(this, t) ];
return t[0];
};
}, x.after = function(e, t) {
return 0 >= e ? t() :function() {
return --e < 1 ? t.apply(this, arguments) :void 0;
};
}, x.keys = _ || function(e) {
if (e !== Object(e)) throw new TypeError("Invalid object");
var t = [];
for (var o in e) x.has(e, o) && (t[t.length] = o);
return t;
}, x.values = function(e) {
return x.map(e, x.identity);
}, x.functions = x.methods = function(e) {
var t = [];
for (var o in e) x.isFunction(e[o]) && t.push(o);
return t.sort();
}, x.extend = function(e) {
return S(s.call(arguments, 1), function(t) {
for (var o in t) e[o] = t[o];
}), e;
}, x.defaults = function(e) {
return S(s.call(arguments, 1), function(t) {
for (var o in t) null == e[o] && (e[o] = t[o]);
}), e;
}, x.clone = function(e) {
return x.isObject(e) ? x.isArray(e) ? e.slice() :x.extend({}, e) :e;
}, x.tap = function(e, t) {
return t(e), e;
}, x.isEqual = function(t, o) {
return e(t, o, []);
}, x.isEmpty = function(e) {
if (x.isArray(e) || x.isString(e)) return 0 === e.length;
for (var t in e) if (x.has(e, t)) return !1;
return !0;
}, x.isElement = function(e) {
return !(!e || 1 != e.nodeType);
}, x.isArray = y || function(e) {
return "[object Array]" == c.call(e);
}, x.isObject = function(e) {
return e === Object(e);
}, x.isArguments = function(e) {
return "[object Arguments]" == c.call(e);
}, x.isArguments(arguments) || (x.isArguments = function(e) {
return !(!e || !x.has(e, "callee"));
}), x.isFunction = function(e) {
return "[object Function]" == c.call(e);
}, x.isString = function(e) {
return "[object String]" == c.call(e);
}, x.isNumber = function(e) {
return "[object Number]" == c.call(e);
}, x.isNaN = function(e) {
return e !== e;
}, x.isBoolean = function(e) {
return e === !0 || e === !1 || "[object Boolean]" == c.call(e);
}, x.isDate = function(e) {
return "[object Date]" == c.call(e);
}, x.isRegExp = function(e) {
return "[object RegExp]" == c.call(e);
}, x.isNull = function(e) {
return null === e;
}, x.isUndefined = function(e) {
return void 0 === e;
}, x.has = function(e, t) {
return u.call(e, t);
}, x.noConflict = function() {
return t._ = o, this;
}, x.identity = function(e) {
return e;
}, x.times = function(e, t, o) {
for (var n = 0; e > n; n++) t.call(o, n);
}, x.escape = function(e) {
return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, x.mixin = function(e) {
S(x.functions(e), function(t) {
B(t, x[t] = e[t]);
});
};
var T = 0;
x.uniqueId = function(e) {
var t = T++;
return e ? e + t :t;
}, x.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var $ = /.^/, I = function(e) {
return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
};
x.template = function(e, t) {
var o = x.templateSettings, n = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(o.escape || $, function(e, t) {
return "',_.escape(" + I(t) + "),'";
}).replace(o.interpolate || $, function(e, t) {
return "'," + I(t) + ",'";
}).replace(o.evaluate || $, function(e, t) {
return "');" + I(t).replace(/[\r\n\t]/g, " ") + ";__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", i = new Function("obj", "_", n);
return t ? i(t, x) :function(e) {
return i.call(this, e, x);
};
}, x.chain = function(e) {
return x(e).chain();
};
var O = function(e) {
this._wrapped = e;
};
x.prototype = O.prototype;
var A = function(e, t) {
return t ? x(e).chain() :e;
}, B = function(e, t) {
O.prototype[e] = function() {
var e = s.call(arguments);
return l.call(e, this._wrapped), A(t.apply(x, e), this._chain);
};
};
x.mixin(x), S([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
var t = i[e];
O.prototype[e] = function() {
var o = this._wrapped;
t.apply(o, arguments);
var n = o.length;
return "shift" != e && "splice" != e || 0 !== n || delete o[0], A(o, this._chain);
};
}), S([ "concat", "join", "slice" ], function(e) {
var t = i[e];
O.prototype[e] = function() {
return A(t.apply(this._wrapped, arguments), this._chain);
};
}), O.prototype.chain = function() {
return this._chain = !0, this;
}, O.prototype.value = function() {
return this._wrapped;
};
}.call(this), /*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
function(e, t, o, n) {
"use strict";
var i = o("html"), r = o(e), a = o(t), s = o.fancybox = function() {
s.open.apply(this, arguments);
}, l = navigator.userAgent.match(/msie/i), c = null, u = t.createTouch !== n, d = function(e) {
return e && e.hasOwnProperty && e instanceof o;
}, p = function(e) {
return e && "string" === o.type(e);
}, h = function(e) {
return p(e) && e.indexOf("%") > 0;
}, g = function(e) {
return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight);
}, f = function(e, t) {
var o = parseInt(e, 10) || 0;
return t && h(e) && (o = s.getViewport()[t] / 100 * o), Math.ceil(o);
}, m = function(e, t) {
return f(e, t) + "px";
};
o.extend(s, {
version:"2.1.5",
defaults:{
padding:15,
margin:20,
width:800,
height:600,
minWidth:100,
minHeight:100,
maxWidth:9999,
maxHeight:9999,
pixelRatio:1,
autoSize:!0,
autoHeight:!1,
autoWidth:!1,
autoResize:!0,
autoCenter:!u,
fitToView:!0,
aspectRatio:!1,
topRatio:.5,
leftRatio:.5,
scrolling:"auto",
wrapCSS:"",
arrows:!0,
closeBtn:!0,
closeClick:!1,
nextClick:!1,
mouseWheel:!0,
autoPlay:!1,
playSpeed:3e3,
preload:3,
modal:!1,
loop:!0,
ajax:{
dataType:"html",
headers:{
"X-fancyBox":!0
}
},
iframe:{
scrolling:"auto",
preload:!0
},
swf:{
wmode:"transparent",
allowfullscreen:"true",
allowscriptaccess:"always"
},
keys:{
next:{
13:"left",
34:"up",
39:"left",
40:"up"
},
prev:{
8:"right",
33:"down",
37:"right",
38:"down"
},
close:[ 27 ],
play:[ 32 ],
toggle:[ 70 ]
},
direction:{
next:"left",
prev:"right"
},
scrollOutside:!0,
index:0,
type:null,
href:null,
content:null,
title:null,
tpl:{
wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
image:'<img class="fancybox-image" src="{href}" alt="" />',
iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' :"") + "></iframe>",
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
},
openEffect:"fade",
openSpeed:250,
openEasing:"swing",
openOpacity:!0,
openMethod:"zoomIn",
closeEffect:"fade",
closeSpeed:250,
closeEasing:"swing",
closeOpacity:!0,
closeMethod:"zoomOut",
nextEffect:"elastic",
nextSpeed:250,
nextEasing:"swing",
nextMethod:"changeIn",
prevEffect:"elastic",
prevSpeed:250,
prevEasing:"swing",
prevMethod:"changeOut",
helpers:{
overlay:!0,
title:!0
},
onCancel:o.noop,
beforeLoad:o.noop,
afterLoad:o.noop,
beforeShow:o.noop,
afterShow:o.noop,
beforeChange:o.noop,
beforeClose:o.noop,
afterClose:o.noop
},
group:{},
opts:{},
previous:null,
coming:null,
current:null,
isActive:!1,
isOpen:!1,
isOpened:!1,
wrap:null,
skin:null,
outer:null,
inner:null,
player:{
timer:null,
isActive:!1
},
ajaxLoad:null,
imgPreload:null,
transitions:{},
helpers:{},
open:function(e, t) {
return e && (o.isPlainObject(t) || (t = {}), !1 !== s.close(!0)) ? (o.isArray(e) || (e = d(e) ? o(e).get() :[ e ]), 
o.each(e, function(i, r) {
var a, l, c, u, h, g, f, m = {};
"object" === o.type(r) && (r.nodeType && (r = o(r)), d(r) ? (m = {
href:r.data("fancybox-href") || r.attr("href"),
title:r.data("fancybox-title") || r.attr("title"),
isDom:!0,
element:r
}, o.metadata && o.extend(!0, m, r.metadata())) :m = r), a = t.href || m.href || (p(r) ? r :null), 
l = t.title !== n ? t.title :m.title || "", c = t.content || m.content, u = c ? "html" :t.type || m.type, 
!u && m.isDom && (u = r.data("fancybox-type"), u || (h = r.prop("class").match(/fancybox\.(\w+)/), 
u = h ? h[1] :null)), p(a) && (u || (s.isImage(a) ? u = "image" :s.isSWF(a) ? u = "swf" :"#" === a.charAt(0) ? u = "inline" :p(r) && (u = "html", 
c = r)), "ajax" === u && (g = a.split(/\s+/, 2), a = g.shift(), f = g.shift())), 
c || ("inline" === u ? a ? c = o(p(a) ? a.replace(/.*(?=#[^\s]+$)/, "") :a) :m.isDom && (c = r) :"html" === u ? c = a :u || a || !m.isDom || (u = "inline", 
c = r)), o.extend(m, {
href:a,
type:u,
content:c,
title:l,
selector:f
}), e[i] = m;
}), s.opts = o.extend(!0, {}, s.defaults, t), t.keys !== n && (s.opts.keys = t.keys ? o.extend({}, s.defaults.keys, t.keys) :!1), 
s.group = e, s._start(s.opts.index)) :void 0;
},
cancel:function() {
var e = s.coming;
e && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), 
s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), 
e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(e));
},
close:function(e) {
s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && e !== !0 ? (s.isOpen = s.isOpened = !1, 
s.isClosing = !0, o(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), 
s.transitions[s.current.closeMethod]()) :(o(".fancybox-wrap").stop(!0).trigger("onReset").remove(), 
s._afterZoomOut())));
},
play:function(e) {
var t = function() {
clearTimeout(s.player.timer);
}, o = function() {
t(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed));
}, n = function() {
t(), a.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd");
}, i = function() {
s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, 
a.bind({
"onCancel.player beforeClose.player":n,
"onUpdate.player":o,
"beforeLoad.player":t
}), o(), s.trigger("onPlayStart"));
};
e === !0 || !s.player.isActive && e !== !1 ? i() :n();
},
next:function(e) {
var t = s.current;
t && (p(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"));
},
prev:function(e) {
var t = s.current;
t && (p(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"));
},
jumpto:function(e, t, o) {
var i = s.current;
i && (e = f(e), s.direction = t || i.direction[e >= i.index ? "next" :"prev"], s.router = o || "jumpto", 
i.loop && (0 > e && (e = i.group.length + e % i.group.length), e %= i.group.length), 
i.group[e] !== n && (s.cancel(), s._start(e)));
},
reposition:function(e, t) {
var n, i = s.current, r = i ? i.wrap :null;
r && (n = s._getPosition(t), e && "scroll" === e.type ? (delete n.position, r.stop(!0, !0).animate(n, 200)) :(r.css(n), 
i.pos = o.extend({}, i.dim, n)));
},
update:function(e) {
var t = e && e.type, o = !t || "orientationchange" === t;
o && (clearTimeout(c), c = null), s.isOpen && !c && (c = setTimeout(function() {
var n = s.current;
n && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (o || "load" === t || "resize" === t && n.autoResize) && s._setDimension(), 
"scroll" === t && n.canShrink || s.reposition(e), s.trigger("onUpdate"), c = null);
}, o && !u ? 0 :300));
},
toggle:function(e) {
s.isOpen && (s.current.fitToView = "boolean" === o.type(e) ? e :!s.current.fitToView, 
u && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), 
s.update());
},
hideLoading:function() {
a.unbind(".loading"), o("#fancybox-loading").remove();
},
showLoading:function() {
var e, t;
s.hideLoading(), e = o('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), 
a.bind("keydown.loading", function(e) {
27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel());
}), s.defaults.fixed || (t = s.getViewport(), e.css({
position:"absolute",
top:.5 * t.h + t.y,
left:.5 * t.w + t.x
}));
},
getViewport:function() {
var t = s.current && s.current.locked || !1, o = {
x:r.scrollLeft(),
y:r.scrollTop()
};
return t ? (o.w = t[0].clientWidth, o.h = t[0].clientHeight) :(o.w = u && e.innerWidth ? e.innerWidth :r.width(), 
o.h = u && e.innerHeight ? e.innerHeight :r.height()), o;
},
unbindEvents:function() {
s.wrap && d(s.wrap) && s.wrap.unbind(".fb"), a.unbind(".fb"), r.unbind(".fb");
},
bindEvents:function() {
var e, t = s.current;
t && (r.bind("orientationchange.fb" + (u ? "" :" resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" :""), s.update), 
e = t.keys, e && a.bind("keydown.fb", function(i) {
var r = i.which || i.keyCode, a = i.target || i.srcElement;
return 27 === r && s.coming ? !1 :(i.ctrlKey || i.altKey || i.shiftKey || i.metaKey || a && (a.type || o(a).is("[contenteditable]")) || o.each(e, function(e, a) {
return t.group.length > 1 && a[r] !== n ? (s[e](a[r]), i.preventDefault(), !1) :o.inArray(r, a) > -1 ? (s[e](), 
i.preventDefault(), !1) :void 0;
}), void 0);
}), o.fn.mousewheel && t.mouseWheel && s.wrap.bind("mousewheel.fb", function(e, n, i, r) {
for (var a = e.target || null, l = o(a), c = !1; l.length && !(c || l.is(".fancybox-skin") || l.is(".fancybox-wrap")); ) c = g(l[0]), 
l = o(l).parent();
0 === n || c || s.group.length > 1 && !t.canShrink && (r > 0 || i > 0 ? s.prev(r > 0 ? "down" :"left") :(0 > r || 0 > i) && s.next(0 > r ? "up" :"right"), 
e.preventDefault());
}));
},
trigger:function(e, t) {
var n, i = t || s.coming || s.current;
if (i) {
if (o.isFunction(i[e]) && (n = i[e].apply(i, Array.prototype.slice.call(arguments, 1))), 
n === !1) return !1;
i.helpers && o.each(i.helpers, function(t, n) {
n && s.helpers[t] && o.isFunction(s.helpers[t][e]) && s.helpers[t][e](o.extend(!0, {}, s.helpers[t].defaults, n), i);
}), a.trigger(e);
}
},
isImage:function(e) {
return p(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
},
isSWF:function(e) {
return p(e) && e.match(/\.(swf)((\?|#).*)?$/i);
},
_start:function(e) {
var t, n, i, r, a, l = {};
if (e = f(e), t = s.group[e] || null, !t) return !1;
if (l = o.extend(!0, {}, s.opts, t), r = l.margin, a = l.padding, "number" === o.type(r) && (l.margin = [ r, r, r, r ]), 
"number" === o.type(a) && (l.padding = [ a, a, a, a ]), l.modal && o.extend(!0, l, {
closeBtn:!1,
closeClick:!1,
nextClick:!1,
arrows:!1,
mouseWheel:!1,
keys:null,
helpers:{
overlay:{
closeClick:!1
}
}
}), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), 
"auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = e, s.coming = l, 
!1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
if (i = l.type, n = l.href, !i) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = e, 
s[s.router](s.direction)) :!1;
if (s.isActive = !0, ("image" === i || "swf" === i) && (l.autoHeight = l.autoWidth = !1, 
l.scrolling = "visible"), "image" === i && (l.aspectRatio = !0), "iframe" === i && u && (l.scrolling = "scroll"), 
l.wrap = o(l.tpl.wrap).addClass("fancybox-" + (u ? "mobile" :"desktop") + " fancybox-type-" + i + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), 
o.extend(l, {
skin:o(".fancybox-skin", l.wrap),
outer:o(".fancybox-outer", l.wrap),
inner:o(".fancybox-inner", l.wrap)
}), o.each([ "Top", "Right", "Bottom", "Left" ], function(e, t) {
l.skin.css("padding" + t, m(l.padding[e]));
}), s.trigger("onReady"), "inline" === i || "html" === i) {
if (!l.content || !l.content.length) return s._error("content");
} else if (!n) return s._error("href");
"image" === i ? s._loadImage() :"ajax" === i ? s._loadAjax() :"iframe" === i ? s._loadIframe() :s._afterLoad();
},
_error:function(e) {
o.extend(s.coming, {
type:"html",
autoWidth:!0,
autoHeight:!0,
minWidth:0,
minHeight:0,
scrolling:"no",
hasError:e,
content:s.coming.tpl.error
}), s._afterLoad();
},
_loadImage:function() {
var e = s.imgPreload = new Image();
e.onload = function() {
this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio, 
s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad();
}, e.onerror = function() {
this.onload = this.onerror = null, s._error("image");
}, e.src = s.coming.href, e.complete !== !0 && s.showLoading();
},
_loadAjax:function() {
var e = s.coming;
s.showLoading(), s.ajaxLoad = o.ajax(o.extend({}, e.ajax, {
url:e.href,
error:function(e, t) {
s.coming && "abort" !== t ? s._error("ajax", e) :s.hideLoading();
},
success:function(t, o) {
"success" === o && (e.content = t, s._afterLoad());
}
}));
},
_loadIframe:function() {
var e = s.coming, t = o(e.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", u ? "auto" :e.iframe.scrolling).attr("src", e.href);
o(e.wrap).bind("onReset", function() {
try {
o(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
} catch (e) {}
}), e.iframe.preload && (s.showLoading(), t.one("load", function() {
o(this).data("ready", 1), u || o(this).bind("load.fb", s.update), o(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), 
s._afterLoad();
})), e.content = t.appendTo(e.inner), e.iframe.preload || s._afterLoad();
},
_preloadImages:function() {
var e, t, o = s.group, n = s.current, i = o.length, r = n.preload ? Math.min(n.preload, i - 1) :0;
for (t = 1; r >= t; t += 1) e = o[(n.index + t) % i], "image" === e.type && e.href && (new Image().src = e.href);
},
_afterLoad:function() {
var e, t, n, i, r, a, l = s.coming, c = s.current, u = "fancybox-placeholder";
if (s.hideLoading(), l && s.isActive !== !1) {
if (!1 === s.trigger("afterLoad", l, c)) return l.wrap.stop(!0).trigger("onReset").remove(), 
s.coming = null, void 0;
switch (c && (s.trigger("beforeChange", c), c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), 
s.unbindEvents(), e = l, t = l.content, n = l.type, i = l.scrolling, o.extend(s, {
wrap:e.wrap,
skin:e.skin,
outer:e.outer,
inner:e.inner,
current:e,
previous:c
}), r = e.href, n) {
case "inline":
case "ajax":
case "html":
e.selector ? t = o("<div>").html(t).find(e.selector) :d(t) && (t.data(u) || t.data(u, o('<div class="' + u + '"></div>').insertAfter(t).hide()), 
t = t.show().detach(), e.wrap.bind("onReset", function() {
o(this).find(t).length && t.hide().replaceAll(t.data(u)).data(u, !1);
}));
break;

case "image":
t = e.tpl.image.replace("{href}", r);
break;

case "swf":
t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + r + '"></param>', 
a = "", o.each(e.swf, function(e, o) {
t += '<param name="' + e + '" value="' + o + '"></param>', a += " " + e + '="' + o + '"';
}), t += '<embed src="' + r + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>";
}
d(t) && t.parent().is(e.inner) || e.inner.append(t), s.trigger("beforeShow"), e.inner.css("overflow", "yes" === i ? "scroll" :"no" === i ? "hidden" :i), 
s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), 
s.isOpened ? c.prevMethod && s.transitions[c.prevMethod]() :o(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), 
s.transitions[s.isOpened ? e.nextMethod :e.openMethod](), s._preloadImages();
}
},
_setDimension:function() {
var e, t, n, i, r, a, l, c, u, d, p, g, v, b, w, y = s.getViewport(), _ = 0, k = !1, x = !1, S = s.wrap, C = s.skin, E = s.inner, T = s.current, $ = T.width, I = T.height, O = T.minWidth, A = T.minHeight, B = T.maxWidth, D = T.maxHeight, N = T.scrolling, M = T.scrollOutside ? T.scrollbarWidth :0, H = T.margin, L = f(H[1] + H[3]), P = f(H[0] + H[2]);
if (S.add(C).add(E).width("auto").height("auto").removeClass("fancybox-tmp"), e = f(C.outerWidth(!0) - C.width()), 
t = f(C.outerHeight(!0) - C.height()), n = L + e, i = P + t, r = h($) ? (y.w - n) * f($) / 100 :$, 
a = h(I) ? (y.h - i) * f(I) / 100 :I, "iframe" === T.type) {
if (b = T.content, T.autoHeight && 1 === b.data("ready")) try {
b[0].contentWindow.document.location && (E.width(r).height(9999), w = b.contents().find("body"), 
M && w.css("overflow-x", "hidden"), a = w.outerHeight(!0));
} catch (F) {}
} else (T.autoWidth || T.autoHeight) && (E.addClass("fancybox-tmp"), T.autoWidth || E.width(r), 
T.autoHeight || E.height(a), T.autoWidth && (r = E.width()), T.autoHeight && (a = E.height()), 
E.removeClass("fancybox-tmp"));
if ($ = f(r), I = f(a), u = r / a, O = f(h(O) ? f(O, "w") - n :O), B = f(h(B) ? f(B, "w") - n :B), 
A = f(h(A) ? f(A, "h") - i :A), D = f(h(D) ? f(D, "h") - i :D), l = B, c = D, T.fitToView && (B = Math.min(y.w - n, B), 
D = Math.min(y.h - i, D)), g = y.w - L, v = y.h - P, T.aspectRatio ? ($ > B && ($ = B, 
I = f($ / u)), I > D && (I = D, $ = f(I * u)), O > $ && ($ = O, I = f($ / u)), A > I && (I = A, 
$ = f(I * u))) :($ = Math.max(O, Math.min($, B)), T.autoHeight && "iframe" !== T.type && (E.width($), 
I = E.height()), I = Math.max(A, Math.min(I, D))), T.fitToView) if (E.width($).height(I), 
S.width($ + e), d = S.width(), p = S.height(), T.aspectRatio) for (;(d > g || p > v) && $ > O && I > A && !(_++ > 19); ) I = Math.max(A, Math.min(D, I - 10)), 
$ = f(I * u), O > $ && ($ = O, I = f($ / u)), $ > B && ($ = B, I = f($ / u)), E.width($).height(I), 
S.width($ + e), d = S.width(), p = S.height(); else $ = Math.max(O, Math.min($, $ - (d - g))), 
I = Math.max(A, Math.min(I, I - (p - v)));
M && "auto" === N && a > I && g > $ + e + M && ($ += M), E.width($).height(I), S.width($ + e), 
d = S.width(), p = S.height(), k = (d > g || p > v) && $ > O && I > A, x = T.aspectRatio ? l > $ && c > I && r > $ && a > I :(l > $ || c > I) && (r > $ || a > I), 
o.extend(T, {
dim:{
width:m(d),
height:m(p)
},
origWidth:r,
origHeight:a,
canShrink:k,
canExpand:x,
wPadding:e,
hPadding:t,
wrapSpace:p - C.outerHeight(!0),
skinSpace:C.height() - I
}), !b && T.autoHeight && I > A && D > I && !x && E.height("auto");
},
_getPosition:function(e) {
var t = s.current, o = s.getViewport(), n = t.margin, i = s.wrap.width() + n[1] + n[3], r = s.wrap.height() + n[0] + n[2], a = {
position:"absolute",
top:n[0],
left:n[3]
};
return t.autoCenter && t.fixed && !e && r <= o.h && i <= o.w ? a.position = "fixed" :t.locked || (a.top += o.y, 
a.left += o.x), a.top = m(Math.max(a.top, a.top + (o.h - r) * t.topRatio)), a.left = m(Math.max(a.left, a.left + (o.w - i) * t.leftRatio)), 
a;
},
_afterZoomIn:function() {
var e = s.current;
e && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), 
s.update(), (e.closeClick || e.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function(t) {
o(t.target).is("a") || o(t.target).parent().is("a") || (t.preventDefault(), s[e.closeClick ? "close" :"next"]());
}), e.closeBtn && o(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(e) {
e.preventDefault(), s.close();
}), e.arrows && s.group.length > 1 && ((e.loop || e.index > 0) && o(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), 
(e.loop || e.index < s.group.length - 1) && o(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), 
s.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, 
s.play()) :s.play(!1));
},
_afterZoomOut:function(e) {
e = e || s.current, o(".fancybox-wrap").trigger("onReset").remove(), o.extend(s, {
group:{},
opts:{},
router:!1,
current:null,
isActive:!1,
isOpened:!1,
isOpen:!1,
isClosing:!1,
wrap:null,
skin:null,
outer:null,
inner:null
}), s.trigger("afterClose", e);
}
}), s.transitions = {
getOrigPosition:function() {
var e = s.current, t = e.element, o = e.orig, n = {}, i = 50, r = 50, a = e.hPadding, l = e.wPadding, c = s.getViewport();
return !o && e.isDom && t.is(":visible") && (o = t.find("img:first"), o.length || (o = t)), 
d(o) ? (n = o.offset(), o.is("img") && (i = o.outerWidth(), r = o.outerHeight())) :(n.top = c.y + (c.h - r) * e.topRatio, 
n.left = c.x + (c.w - i) * e.leftRatio), ("fixed" === s.wrap.css("position") || e.locked) && (n.top -= c.y, 
n.left -= c.x), n = {
top:m(n.top - a * e.topRatio),
left:m(n.left - l * e.leftRatio),
width:m(i + l),
height:m(r + a)
};
},
step:function(e, t) {
var o, n, i, r = t.prop, a = s.current, l = a.wrapSpace, c = a.skinSpace;
("width" === r || "height" === r) && (o = t.end === t.start ? 1 :(e - t.start) / (t.end - t.start), 
s.isClosing && (o = 1 - o), n = "width" === r ? a.wPadding :a.hPadding, i = e - n, 
s.skin[r](f("width" === r ? i :i - l * o)), s.inner[r](f("width" === r ? i :i - l * o - c * o)));
},
zoomIn:function() {
var e = s.current, t = e.pos, n = e.openEffect, i = "elastic" === n, r = o.extend({
opacity:1
}, t);
delete r.position, i ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) :"fade" === n && (t.opacity = .1), 
s.wrap.css(t).animate(r, {
duration:"none" === n ? 0 :e.openSpeed,
easing:e.openEasing,
step:i ? this.step :null,
complete:s._afterZoomIn
});
},
zoomOut:function() {
var e = s.current, t = e.closeEffect, o = "elastic" === t, n = {
opacity:.1
};
o && (n = this.getOrigPosition(), e.closeOpacity && (n.opacity = .1)), s.wrap.animate(n, {
duration:"none" === t ? 0 :e.closeSpeed,
easing:e.closeEasing,
step:o ? this.step :null,
complete:s._afterZoomOut
});
},
changeIn:function() {
var e, t = s.current, o = t.nextEffect, n = t.pos, i = {
opacity:1
}, r = s.direction, a = 200;
n.opacity = .1, "elastic" === o && (e = "down" === r || "up" === r ? "top" :"left", 
"down" === r || "right" === r ? (n[e] = m(f(n[e]) - a), i[e] = "+=" + a + "px") :(n[e] = m(f(n[e]) + a), 
i[e] = "-=" + a + "px")), "none" === o ? s._afterZoomIn() :s.wrap.css(n).animate(i, {
duration:t.nextSpeed,
easing:t.nextEasing,
complete:s._afterZoomIn
});
},
changeOut:function() {
var e = s.previous, t = e.prevEffect, n = {
opacity:.1
}, i = s.direction, r = 200;
"elastic" === t && (n["down" === i || "up" === i ? "top" :"left"] = ("up" === i || "left" === i ? "-" :"+") + "=" + r + "px"), 
e.wrap.animate(n, {
duration:"none" === t ? 0 :e.prevSpeed,
easing:e.prevEasing,
complete:function() {
o(this).trigger("onReset").remove();
}
});
}
}, s.helpers.overlay = {
defaults:{
closeClick:!0,
speedOut:200,
showEarly:!0,
css:{},
locked:!u,
fixed:!0
},
overlay:null,
fixed:!1,
el:o("html"),
create:function(e) {
e = o.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = o('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent :e.parent), 
this.fixed = !1, e.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), 
this.fixed = !0);
},
open:function(e) {
var t = this;
e = o.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") :this.create(e), 
this.fixed || (r.bind("resize.overlay", o.proxy(this.update, this)), this.update()), 
e.closeClick && this.overlay.bind("click.overlay", function(e) {
return o(e.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() :t.close(), 
!1) :void 0;
}), this.overlay.css(e.css).show();
},
close:function() {
var e, t;
r.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (o(".fancybox-margin").removeClass("fancybox-margin"), 
e = r.scrollTop(), t = r.scrollLeft(), this.el.removeClass("fancybox-lock"), r.scrollTop(e).scrollLeft(t)), 
o(".fancybox-overlay").remove().hide(), o.extend(this, {
overlay:null,
fixed:!1
});
},
update:function() {
var e, o = "100%";
this.overlay.width(o).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), 
a.width() > e && (o = a.width())) :a.width() > r.width() && (o = a.width()), this.overlay.width(o).height(a.height());
},
onReady:function(e, t) {
var n = this.overlay;
o(".fancybox-overlay").stop(!0, !0), n || this.create(e), e.locked && this.fixed && t.fixed && (n || (this.margin = a.height() > r.height() ? o("html").css("margin-right").replace("px", "") :!1), 
t.locked = this.overlay.append(t.wrap), t.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments);
},
beforeShow:function(e, t) {
var n, i;
t.locked && (this.margin !== !1 && (o("*").filter(function() {
return "fixed" === o(this).css("position") && !o(this).hasClass("fancybox-overlay") && !o(this).hasClass("fancybox-wrap");
}).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), n = r.scrollTop(), 
i = r.scrollLeft(), this.el.addClass("fancybox-lock"), r.scrollTop(n).scrollLeft(i)), 
this.open(e);
},
onUpdate:function() {
this.fixed || this.update();
},
afterClose:function(e) {
this.overlay && !s.coming && this.overlay.fadeOut(e.speedOut, o.proxy(this.close, this));
}
}, s.helpers.title = {
defaults:{
type:"float",
position:"bottom"
},
beforeShow:function(e) {
var t, n, i = s.current, r = i.title, a = e.type;
if (o.isFunction(r) && (r = r.call(i.element, i)), p(r) && "" !== o.trim(r)) {
switch (t = o('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + r + "</div>"), 
a) {
case "inside":
n = s.skin;
break;

case "outside":
n = s.wrap;
break;

case "over":
n = s.inner;
break;

default:
n = s.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), 
s.current.margin[2] += Math.abs(f(t.css("margin-bottom")));
}
t["top" === e.position ? "prependTo" :"appendTo"](n);
}
}
}, o.fn.fancybox = function(e) {
var t, n = o(this), i = this.selector || "", r = function(r) {
var a, l, c = o(this).blur(), u = t;
r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || c.is(".fancybox-wrap") || (a = e.groupAttr || "data-fancybox-group", 
l = c.attr(a), l || (a = "rel", l = c.get(0)[a]), l && "" !== l && "nofollow" !== l && (c = i.length ? o(i) :n, 
c = c.filter("[" + a + '="' + l + '"]'), u = c.index(this)), e.index = u, s.open(c, e) !== !1 && r.preventDefault());
};
return e = e || {}, t = e.index || 0, i && e.live !== !1 ? a.undelegate(i, "click.fb-start").delegate(i + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", r) :n.unbind("click.fb-start").bind("click.fb-start", r), 
this.filter("[data-fancybox-start=1]").trigger("click"), this;
}, a.ready(function() {
var t, r;
o.scrollbarWidth === n && (o.scrollbarWidth = function() {
var e = o('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), t = e.children(), n = t.innerWidth() - t.height(99).innerWidth();
return e.remove(), n;
}), o.support.fixedPosition === n && (o.support.fixedPosition = function() {
var e = o('<div style="position:fixed;top:20px;"></div>').appendTo("body"), t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
return e.remove(), t;
}()), o.extend(s.defaults, {
scrollbarWidth:o.scrollbarWidth(),
fixed:o.support.fixedPosition,
parent:o("body")
}), t = o(e).width(), i.addClass("fancybox-lock-test"), r = o(e).width(), i.removeClass("fancybox-lock-test"), 
o("<style type='text/css'>.fancybox-margin{margin-right:" + (r - t) + "px;}</style>").appendTo("head");
});
}(window, document, jQuery), function(e) {
var t = e.fancybox;
t.helpers.buttons = {
defaults:{
skipSingle:!1,
position:"top",
tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
},
list:null,
buttons:null,
beforeLoad:function(e, t) {
return e.skipSingle && t.group.length < 2 ? (t.helpers.buttons = !1, t.closeBtn = !0, 
void 0) :(t.margin["bottom" === e.position ? 2 :0] += 30, void 0);
},
onPlayStart:function() {
this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn");
},
onPlayEnd:function() {
this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn");
},
afterShow:function(o, n) {
var i = this.buttons;
i || (this.list = e(o.tpl).addClass(o.position).appendTo("body"), i = {
prev:this.list.find(".btnPrev").click(t.prev),
next:this.list.find(".btnNext").click(t.next),
play:this.list.find(".btnPlay").click(t.play),
toggle:this.list.find(".btnToggle").click(t.toggle),
close:this.list.find(".btnClose").click(t.close)
}), n.index > 0 || n.loop ? i.prev.removeClass("btnDisabled") :i.prev.addClass("btnDisabled"), 
n.loop || n.index < n.group.length - 1 ? (i.next.removeClass("btnDisabled"), i.play.removeClass("btnDisabled")) :(i.next.addClass("btnDisabled"), 
i.play.addClass("btnDisabled")), this.buttons = i, this.onUpdate(o, n);
},
onUpdate:function(e, t) {
var o;
this.buttons && (o = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"), 
t.canShrink ? o.addClass("btnToggleOn") :t.canExpand || o.addClass("btnDisabled"));
},
beforeClose:function() {
this.list && this.list.remove(), this.list = null, this.buttons = null;
}
};
}(jQuery), function(e) {
var t = e.fancybox;
t.helpers.thumbs = {
defaults:{
width:50,
height:50,
position:"bottom",
source:function(t) {
var o;
return t.element && (o = e(t.element).find("img").attr("src")), !o && "image" === t.type && t.href && (o = t.href), 
o;
}
},
wrap:null,
list:null,
width:0,
init:function(t, o) {
var n, i = this, r = t.width, a = t.height, s = t.source;
n = "";
for (var l = 0; l < o.group.length; l++) n += '<li><a style="width:' + r + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
this.wrap = e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"), 
this.list = e("<ul>" + n + "</ul>").appendTo(this.wrap), e.each(o.group, function(t) {
var n = s(o.group[t]);
n && e("<img />").load(function() {
var o, n, s, l = this.width, c = this.height;
i.list && l && c && (o = l / r, n = c / a, s = i.list.children().eq(t).find("a"), 
o >= 1 && n >= 1 && (o > n ? (l = Math.floor(l / n), c = a) :(l = r, c = Math.floor(c / o))), 
e(this).css({
width:l,
height:c,
top:Math.floor(a / 2 - c / 2),
left:Math.floor(r / 2 - l / 2)
}), s.width(r).height(a), e(this).hide().appendTo(s).fadeIn(300));
}).attr("src", n);
}), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (o.group.length + 1)).css("left", Math.floor(.5 * e(window).width() - (o.index * this.width + .5 * this.width)));
},
beforeLoad:function(e, t) {
return t.group.length < 2 ? (t.helpers.thumbs = !1, void 0) :(t.margin["top" === e.position ? 0 :2] += e.height + 15, 
void 0);
},
afterShow:function(e, t) {
this.list ? this.onUpdate(e, t) :this.init(e, t), this.list.children().removeClass("active").eq(t.index).addClass("active");
},
onUpdate:function(t, o) {
this.list && this.list.stop(!0).animate({
left:Math.floor(.5 * e(window).width() - (o.index * this.width + .5 * this.width))
}, 150);
},
beforeClose:function() {
this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0;
}
};
}(jQuery), function(e) {
"use strict";
var t = e.fancybox, o = function(t, o, n) {
return n = n || "", "object" === e.type(n) && (n = e.param(n, !0)), e.each(o, function(e, o) {
t = t.replace("$" + e, o || "");
}), n.length && (t += (t.indexOf("?") > 0 ? "&" :"?") + n), t;
};
t.helpers.media = {
defaults:{
youtube:{
matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
params:{
autoplay:1,
autohide:1,
fs:1,
rel:0,
hd:1,
wmode:"opaque",
enablejsapi:1
},
type:"iframe",
url:"//www.youtube.com/embed/$3"
},
vimeo:{
matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
params:{
autoplay:1,
hd:1,
show_title:1,
show_byline:1,
show_portrait:0,
fullscreen:1
},
type:"iframe",
url:"//player.vimeo.com/video/$1"
},
metacafe:{
matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
params:{
autoPlay:"yes"
},
type:"swf",
url:function(t, o, n) {
return n.swf.flashVars = "playerVars=" + e.param(o, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf";
}
},
dailymotion:{
matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,
params:{
additionalInfos:0,
autoStart:1
},
type:"swf",
url:"//www.dailymotion.com/swf/video/$1"
},
twitvid:{
matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
params:{
autoplay:0
},
type:"iframe",
url:"//www.twitvid.com/embed.php?guid=$1"
},
twitpic:{
matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
type:"image",
url:"//twitpic.com/show/full/$1/"
},
instagram:{
matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
type:"image",
url:"//$1/p/$2/media/?size=l"
},
google_maps:{
matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
type:"iframe",
url:function(e) {
return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" :"embed");
}
}
},
beforeLoad:function(t, n) {
var i, r, a, s, l = n.href || "", c = !1;
for (i in t) if (t.hasOwnProperty(i) && (r = t[i], a = l.match(r.matcher))) {
c = r.type, s = e.extend(!0, {}, r.params, n[i] || (e.isPlainObject(t[i]) ? t[i].params :null)), 
l = "function" === e.type(r.url) ? r.url.call(this, a, s, n) :o(r.url, a, s);
break;
}
c && (n.href = l, n.type = c, n.autoHeight = !1);
}
};
}(jQuery), function() {
"undefined" != typeof _ && null !== _ && (_.templateSettings = {
evaluate:/\{\{(.+?)\}\}/g,
interpolate:/\{\{=(.+?)\}\}/g
}), "undefined" != typeof $ && null !== $ && ($.support.cors = !0), $B.Singleton || ($B.Singleton = {});
}.call(this), function() {
var e, t, o, n, i = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, r = {}.hasOwnProperty, a = function(e, t) {
function o() {
this.constructor = e;
}
for (var n in t) r.call(t, n) && (e[n] = t[n]);
return o.prototype = t.prototype, e.prototype = new o(), e.__super__ = t.prototype, 
e;
}, s = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
String.prototype.toSlug = function() {
var e;
return e = this.replace(/[^\u0020-\u007e]/g, ""), e = e.replace(/["'`]/g, ""), e = e.replace(/@/g, " at "), 
e = e.replace(/&/g, " and "), e = e.replace(/\W+/g, " "), e = e.replace(/_/g, " "), 
e = e.trim(), e = e.replace(/\s+/g, "-"), e = e.toLowerCase();
}, String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), $B.trackingAlias = function(e) {
var t;
return t = !!$.cookie("__strk_aliased"), 1 !== $S.user_meta.sign_in_count || t ? void 0 :(analytics.alias(e), 
$.cookie("__strk_aliased", "1", {
expires:30,
path:"/"
}));
}, $B.store = {
enabled:!0,
set:function(e, t, o) {
var n;
if (null != window.store && this.enabled) return n = {
val:t
}, o && (n.exp = o, n.time = new Date().getTime()), window.store.set(e, n);
},
setHours:function(e, t, o) {
return this.set(e, t, Math.floor(36e5 * o));
},
get:function(e) {
var t;
return null != window.store && this.enabled ? (t = window.store.get(e), t ? t.exp && t.time && new Date().getTime() - t.time > t.exp ? null :t.val :null) :null;
},
clear:function() {
var e;
return null != (e = window.store) ? e.clear() :void 0;
},
remove:function(e) {
var t;
return null != (t = window.store) ? t.remove(e) :void 0;
}
}, $B.isStatic = function() {
return "yes" === $("html").attr("static");
}, $B.isHeadlessRendering = function() {
return $S.conf.headless_render && !$B.isStatic();
}, $B.toVal = function(e) {
return "function" == typeof e ? e() :e;
}, $B.topInWindow = function(e) {
return $(e).offset().top - $(window).scrollTop();
}, $B.Cookie = function() {
function e(e) {
this.options = null != e ? e :{}, this.set = i(this.set, this), this.get = i(this.get, this);
}
return e.prototype.get = function(e) {
return $.cookie("__" + this.options.scope + "_" + e);
}, e.prototype.set = function(e, t, o) {
return null == o && (o = {
expires:1,
path:"/"
}), $.cookie("__" + this.options.scope + "_" + e, t, o);
}, e;
}(), $B.dialog = function(e) {
var t, o, n;
return n = $.Deferred(), 0 === $("#sdialog").length && $("body").append('      <div id="sdialog" style="opacity: 0; position: relative; z-index: 99999">        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0; background: #000; opacity: .6;">        </div>        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0;">          <div class="white-modal" style="display: block; height: auto;">            <div id="sdialog-content" class="modal-container" style="height: auto; box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.7);">              <!--text-->            </div>          </div>        </div>      </div>      '), 
$("#sdialog > div").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown"), 
n.reject();
}, 100);
}), $("#sdialog-content").unbind("click").bind("click", function(e) {
return e.stopPropagation();
}), o = {
easing:"easeInOutQuart",
duration:200
}, $("#sdialog").show().animate({
opacity:"1"
}, o), t = $("#sdialog-content").html(e).css("opacity", 0), setTimeout(function() {
return t.addClass("easeUp"), setTimeout(function() {
return t.css("opacity", 1);
}, 200);
}, 100), n;
}, $.fn.doIf = function(e, t) {
return t($(this)) ? e($(this)) :void 0;
}, $B.customAlert = function(e, t, o) {
var n, i, r;
return i = "", null != o && (i = "      <button class='s-btn cancel gray'>" + o + "</button>"), 
n = "", null != t && (n = "      <div class='bottom-actions'>        " + i + "        <button class='s-btn confirm'>" + t + "</button>      </div>    "), 
r = $B.dialog("    <div class='strikingly-custom-alert'>      <i class='fa fa-exclamation-triangle'></i>      <i class='close'>&times;</i>      <div class='alert-content'>      " + e + "      </div>      " + n + "    <div>"), 
$(".strikingly-custom-alert .confirm").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown");
}, 100), r.resolve();
}), $(".strikingly-custom-alert .close, .strikingly-custom-alert .cancel").unbind("click").bind("click", function() {
return $("#sdialog > div").trigger("click");
}), r;
}, $B.getParentWindow = function(e) {
var t;
return t = e.defaultView || e.parentWindow, t.parent;
}, $B.getFrameForDocument = function(e) {
var t, o, n, i;
for (n = $B.getParentWindow(e).document.getElementsByTagName("iframe"), i = n.length; i-- > 0; ) {
o = n[i];
try {
if (t = o.contentDocument || o.contentWindow.document, t === e) return o;
} catch (r) {}
}
}, $B.log = function() {
var e;
return e = "true" === $B.store.get("strikinglyLogger") || $B.log.enabledFlag, $B.log.enabled() && console && console.log ? console.log(Array.prototype.slice.call(arguments)) :void 0;
}, $B.log.enabled = function() {
var e, t, o;
return t = "true" === $B.store.get("strikinglyLogger"), e = "true" === ("function" == typeof (o = $("meta[name=a-minimum]")).attr ? o.attr("content") :void 0), 
t || e || -1 !== window.location.toString().indexOf(":3000");
}, $B.log.enable = function() {
return $B.store.set("strikinglyLogger", "true"), $B.log.enabledFlag = !0, console.log("Bobcat logger enabled!");
}, $B.log.disable = function() {
return $B.store.set("strikinglyLogger", "false"), console.log("Bobcat logger disabled!");
}, $B.growl = function(e) {
var t, o, n;
if ($B.log.enabled()) return o = 2800, n = 20 + 34 * $(".s-growl").length, t = $("<div></div>").addClass("s-growl").text(e).css({
background:"rgba(0,0,0,0.85)",
color:"white",
padding:"6px 14px",
"font-size":"110%",
position:"fixed",
"z-index":999e3,
top:n,
right:20,
"-webkit-border-radius":"4px"
}), setTimeout(function() {
return t.animate({
top:"-=5",
opacity:0
}, function() {
return t.remove();
});
}, o), $("body").append(t);
}, $B.pollHelper = function(e, t) {
var o;
return null == t && (t = 1e3), (o = function() {
return setTimeout(function() {
return e.call(this, o);
}, t), t = 1.5 * t;
})();
}, $B.poller = function(e, t, o) {
var n;
return null == t && (t = function() {}), null == o && (o = function() {}), n = !1, 
$B.pollHelper(function(i) {
var r;
return r = $.getJSON(e), r.success(function(e, o, r) {
return n ? void 0 :e && "retry" !== e && "retry" !== (null != e ? e.html :void 0) ? t(e, o, r) :i();
}), r.error(o);
}), {
cancel:function() {
return n = !0;
}
};
}, $B.restPoller = function(e, t) {
var o;
return null == t && (t = {}), o = {
url:e
}, $.extend(!0, o, t), o.success = function(e) {
var o, n, i, r, a, s, l;
if ((null != e ? null != (n = e.message) ? n.type :void 0 :void 0) && (null != e ? null != (i = e.message) ? i.id :void 0 :void 0)) o = "/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm"; else {
if (!(null != e ? null != (r = e.data) ? null != (a = r.task) ? a.type :void 0 :void 0 :void 0) || !(null != e ? null != (s = e.data) ? null != (l = s.task) ? l.id :void 0 :void 0 :void 0)) return $B.log("Could not get poll URL!"), 
$B.log(e), void 0;
o = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm";
}
return $B.poller(o, t.success, t.error), $B.log("Begin polling: " + o);
}, o.error = function(e, o, n) {
return t.error(e, o, n);
}, $.ajax(o), $B.log("Requesting poller: " + e);
}, $B.waitFor = function(e, t, o) {
var n;
return o = o || 100, n = setInterval(function() {
return e() ? (clearInterval(n), t()) :void 0;
}, o);
}, $B.getQueryValue = function(e) {
var t, o;
return t = new RegExp("[?&]" + e + "=([^&#]*)"), o = t.exec(window.location.href), 
null == o ? "" :o[1];
}, $B.detectCSSFeature = function(e) {
var t, o, n, i, r, a, s;
if (n = !1, t = "Webkit Moz ms O".split(" "), o = document.createElement("div"), 
e = e.toLowerCase(), i = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== o.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (r = t[a], void 0 !== o.style[r + i]) return !0;
return !1;
}, function(e) {
var t;
return t = {}, e.setCustomization = function(e, o) {
return t[e] = o;
}, e.getCustomization = function(e) {
return null != t[e] ? t[e] :void 0;
};
}($B), function(e) {
var t;
return t = {}, e.meta = function(e, o) {
var n;
return null == o && (o = !1), null == t[e] || o ? (n = $('meta[name="' + e + '"]').attr("content"), 
null != n ? t[e] = n :($B.log("" + e + " missing in meta."), void 0)) :t[e];
}, e.metaObject = function(e, o) {
var n;
return null == o && (o = !1), null == t[e] || o ? (n = $('meta[name="' + e + '"]').attr("content"), 
null != n ? t[e] = jQuery.parseJSON(n) :($B.log("" + e + " missing in meta object."), 
{})) :t[e];
}, e.appMeta = function(t) {
return e.metaObject("app-configs")[t];
}, e.siteMeta = function(t) {
return e.metaObject("site-configs")[t];
};
}($B), $B.ui = {
modalStk:[],
removeFromModalStk:function(e) {
var t, o, n, i, r;
for (r = this.modalStk, t = n = 0, i = r.length; i > n; t = ++n) if (o = r[t], o.dialog[0] === e[0]) return this.modalStk.splice(t, 1), 
!0;
return !1;
},
closeLastModal:function() {
var e;
if (0 !== this.modalStk.length) return e = this.modalStk.pop(), $B.ui.closeModal(e.dialog, e.options);
},
openModal:function(e, t) {
var o, n;
if (!e.is(":visible") || "1" !== e.css("opacity")) return t.shade && (0 === (n = $("#g-shade")).length && (n = $('<div id="g-shade" class="s-editor-modal-bg">').css("opacity", 0).appendTo($("body")), 
n.click(function() {
return $B.ui.closeLastModal();
})), n.stop().show(), setTimeout(function() {
return n.css("opacity", 1);
}, 1)), e.css({
"margin-top":-e.height() / 2
}), $(window).height() > 700 ? e.css("top", "45%") :e.css("top", "50%"), t.absolute && e.css({
position:"absolute",
top:$(document).scrollTop() + $(window).height() / 2
}), e.stop().addClass("invisible").show(), setTimeout(function() {
return e.removeClass("invisible");
}, 1), this.modalStk.push({
dialog:e,
options:t
}), (o = $(".s-modal-bg")).length ? (o.css("opacity", 0).show(), o.css("pointer-events", "auto"), 
o.animate({
opacity:1
}, 400, "easeInOutQuart")) :void 0;
},
closeModal:function(e, t) {
var o, n, i, r;
return i = {}, $.extend(!0, i, t), o = $(".s-modal-bg"), r = $("#g-shade"), o.stop().animate({
opacity:0
}, 400, "easeInOutQuart", function() {
return o.hide();
}), e.is(":visible") ? (e.addClass("invisible"), this.removeFromModalStk(e), n = !this.modalStk.length, 
n && (r.css("opacity", 0), $("body").removeClass("no-scroll")), setTimeout(function() {
return e.hide(), n ? r.hide() :void 0;
}, 300)) :void 0;
},
openCloseModal:function(e, t) {
var o, n;
return n = {
onlyOpen:!1,
shade:!0,
block:!1,
absolute:!1
}, $.extend(!0, n, t), $.browser.safari && e.find("iframe").length && (n.absolute = !0), 
o = e.is(":visible"), o ? n.onlyOpen || this.closeModal(e, n) :this.openModal(e, n), 
o;
},
openPanel:function(e) {
return e.is(":visible") && "1" === e.css("opacity") ? void 0 :(e.css({
left:"-120px"
}).show(), e.stop().animate({
left:"200px"
}, 400, "easeInOutQuart"));
},
closePanel:function(e) {
return e.is(":visible") || "0" !== e.css("opacity") ? e.stop().animate({
left:"-120px"
}, 400, "easeInOutQuart", function() {
return e.hide();
}) :void 0;
},
openClosePanel:function(e, t) {
var o;
return null == t && (t = !1), o = e.is(":visible"), o ? t || this.closePanel(e) :this.openPanel(e), 
o;
},
openIframePopup:function(e, t) {
var o, n, i, r, a;
return null == t && (t = {}), a = $.extend({
showAddress:!1
}, t), o = $(".s-page-layer").show(), $("iframe", o).attr("src", e), n = $(".address .link", o), 
a.showAddress ? n.attr("href", e).text(e) :n.attr("href", "").text(""), $(".s-page-wrapper").css({
height:"auto",
width:"auto",
"margin-top":0,
"margin-left":0,
padding:"0"
}), null != a.height && (r = null != a.topOffset ? a.topOffset :0, $(".s-page-wrapper").css({
height:a.height + "px",
"margin-top":(.8 * $(window).height() - a.height) / 2 + r + "px"
})), null != a.width && (i = null != a.leftOffset ? a.leftOffset :0, $(".s-page-wrapper").css({
width:a.width + "px",
"margin-left":(.92 * $(window).width() - a.width) / 2 + i + "px"
})), null != a.extra && $(".s-page-wrapper").css(a.extra), setTimeout(function() {
return o.addClass("open"), $(".s-page-shade, .back-btn", o).click(function() {
return $B.ui.closeIframePopup();
});
}, 100);
},
closeIframePopup:function() {
var e;
return e = $(".s-page-layer"), e.removeClass("open"), setTimeout(function() {
return e.hide(), $(".s-page-shade, .back-btn", e).unbind("click"), $("iframe", e).attr("src", "");
}, 300);
},
openLinkInWindow:function(e) {
return e.click(function(e) {
var t, o, n;
return e.preventDefault(), t = $(this), o = t.attr("href"), n = window.open(o, "Share Huula", "scrollbars=1,width=500,height=500,menubar=no,toolbar=no,location=no");
});
}
}, $B.Queue = function() {
function e() {
this.clear = i(this.clear, this), this.size = i(this.size, this), this.dequeue = i(this.dequeue, this), 
this.enqueue = i(this.enqueue, this), this.q = [];
}
return e.prototype.enqueue = function(e) {
return this.q.push(e);
}, e.prototype.dequeue = function() {
return this.q.shift();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.Stack = function() {
function e() {
this.clear = i(this.clear, this), this.size = i(this.size, this), this.pop = i(this.pop, this), 
this.push = i(this.push, this), this.q = [];
}
return e.prototype.push = function(e) {
return this.q.push(e);
}, e.prototype.pop = function() {
return this.q.pop();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.ObservableStack = function(e) {
function t() {
this.clear = i(this.clear, this), this.pop = i(this.pop, this), this.push = i(this.push, this), 
t.__super__.constructor.call(this), this.observableSize = ko.observable(0);
}
return a(t, e), t.prototype.push = function(e) {
return t.__super__.push.call(this, e), this.observableSize(this.size());
}, t.prototype.pop = function() {
return this.observableSize(this.size() - 1), t.__super__.pop.call(this);
}, t.prototype.clear = function() {
return t.__super__.clear.call(this), this.observableSize(this.size());
}, t;
}($B.Stack), window.Singleton = function() {
function e() {}
var t;
return t = void 0, e.get = function(e) {
return null != t ? t :t = new n(e);
}, e;
}(), n = function() {
function e(e) {
this.args = e;
}
return e.prototype.echo = function() {
return this.args;
}, e;
}(), o = [ "extended", "included" ], $B.Module = function() {
function e() {}
return e.extend = function(e) {
var t, n, i;
for (t in e) n = e[t], s.call(o, t) < 0 && (this[t] = n);
return null != (i = e.extended) && i.apply(this), this;
}, e.include = function(e) {
var t, n, i;
for (t in e) n = e[t], s.call(o, t) < 0 && (this.prototype[t] = n);
return null != (i = e.included) && i.apply(this), this;
}, e;
}(), $B.UrlHelper = {
isEmail:function(e) {
var t;
return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
t.test(e);
},
hasProtocol:function(e) {
var t, o;
return t = /^((http|https|ftp|mailto|tel|fb|skype):)/, o = /^(#)/, t.test(e) || o.test(e);
},
addProtocol:function(e, t) {
return null == t && (t = !1), e = $.trim(e), 0 === e.length ? e = t ? "" :"javascript:void(0);" :this.isEmail(e) ? e = "mailto:" + e :this.hasProtocol(e) || (e = "http://" + e), 
e;
},
createUrlParser:function(e) {
var t;
return t = document.createElement("a"), t.href = this.addProtocol(e, !0), t;
}
}, $B.HtmlHelper = {
htmlEncode:function(e) {
return $("<div/>").text(e).html();
},
htmlDecode:function(e) {
return $("<div/>").html(e).text();
},
checkClosingTags:function(e) {
var t, o, n, i, r, a, l, c, u, d, p;
for (n = function(e) {
var t;
return t = "area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr".split(", "), 
e = e.split(/[<>\s]/g)[1], e = e.replace(/\//g, ""), s.call(t, e) >= 0;
}, t = /<\/?([A-Z][A-Z0-9]*)\b[^>]*>/gi, i = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 
a = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, r = e; i.test(r) || a.test(r); ) r = r.replace(i, ""), 
r = r.replace(a, "");
for (c = null != (p = r.match(t)) ? p :[], o = 0, u = 0, d = c.length; d > u; u++) if (l = c[u], 
!n(l) && ("/" !== l[1] ? o += 1 :o -= 1, 0 > o)) return !1;
return 0 === o;
}
}, $B.ImageOptionHelper = {
IMAGE_SIZE:{
small:"300x225>",
medium:"720x540>",
large:"1200x900>",
background:"2000x1200>"
},
getOptions:function(e) {
var t, o, n, i, r, a, s;
return this.conversions ? this.conversions :(window.form = e, i = e.find('[name="asset[image_size]"]').get(0), 
a = e.find('[name="asset[thumb_size]"]').get(0), r = this.toImageSize($(i).val()), 
s = this.toImageSize($(a).val()), n = function(e) {
return e.slice(0, -1).split("x")[0];
}, o = function(e) {
return e.slice(0, -1).split("x")[1];
}, t = function(e) {
var t;
return t = e.charAt(e.length - 1), "#" === t ? {
crop:"fill",
gravity:"faces:center"
} :"<" === t || ">" === t ? {
crop:"limit"
} :void 0;
}, this.conversions = {
custom:{
width:n(r),
height:o(r)
},
thumb:{
width:n(s),
height:o(s)
}
}, this.conversions.custom = _.extend(this.conversions.custom, t(r)), this.conversions.thumb = _.extend(this.conversions.thumb, t(s)), 
this.conversions);
},
toImageSize:function(e) {
return ("small" === e || "medium" === e || "large" === e || "background" === e) && (e = this.IMAGE_SIZE[e]), 
e;
}
}, e = function() {
function e(e) {
this.handler = e, this.queue = [];
}
return e.prototype.run = function() {
var e, t = this;
return e = function() {
return t.queue.length > 0 ? t.run() :void 0;
}, this.handler(this.queue.shift(), e);
}, e.prototype.append = function(e) {
return this.queue.push(e), 1 === this.queue.length ? this.run() :void 0;
}, e;
}(), t = function() {
function e(e, t, o) {
this.item = e, this.url = t, this.callback = o;
}
return e;
}(), $B.loadFacebookScript = function() {
return function(e, t, o) {
var n, i;
return n = e.getElementsByTagName(t)[0], e.getElementById(o) ? void 0 :(i = e.createElement(t), 
i.id = o, i.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=138736959550286", 
n.parentNode.insertBefore(i, n));
}(document, "script", "facebook-jssdk");
}, $B.loadTwitterScript = function() {
return !function(e, t, o) {
var n, i, r;
return n = e.getElementsByTagName(t)[0], r = /^http:/.test(e.location) ? "http" :"https", 
e.getElementById(o) ? void 0 :(i = e.createElement(t), i.id = o, i.src = r + "://platform.twitter.com/widgets.js", 
n.parentNode.insertBefore(i, n));
}(document, "script", "twitter-wjs");
}, $B.FacebookLogin = function() {
function e(e) {
this._configs = e, this.loadFacebook = i(this.loadFacebook, this), this.fbLoginPopup = i(this.fbLoginPopup, this);
}
return e.prototype.fbLoginPopup = function(e) {
return FB.login(function(t) {
if (t.authResponse) {
if (e.success) return e.success(t);
} else if (e.fail) return e.fail(t);
}, {
scope:this._configs.FACEBOOK_PERMS
});
}, e.prototype.loadFacebook = function(e) {
var t = this;
return window.fbAsyncInit = function() {
return FB.init({
appId:t._configs.FACEBOOK_APP_ID,
channelUrl:"" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
status:!1,
cookie:!0,
xfbml:!0,
oauth:!0
}), FB.Event.subscribe("auth.authResponseChange", function(t) {
if (console.log(t), "connected" === t.status) {
if (e.connected) return e.connected(t);
} else if ("not_authorized" === t.status) {
if (e.notAuthorized) return e.notAuthorized(t);
} else if (e.others) return e.others(t);
});
}, function(e) {
var t, o, n;
return t = "facebook-jssdk", n = e.getElementsByTagName("script")[0], e.getElementById(t) ? void 0 :(o = e.createElement("script"), 
o.id = t, o.async = !0, o.src = "//connect.facebook.net/en_US/all.js", n.parentNode.insertBefore(o, n));
}(document);
}, e;
}(), $B.LinkedinLogin = function() {
function e(e) {
this._configs = e, this.loadLinkedin = i(this.loadLinkedin, this), this.linkedinLogout = i(this.linkedinLogout, this), 
this.linkedinLoginPopup = i(this.linkedinLoginPopup, this);
}
return e.prototype.linkedinLoginPopup = function(e) {
return IN.User.authorize(function() {
if (IN.User.isAuthorized()) {
if (e.success) return e.success();
} else if (e.fail) return e.fail();
});
}, e.prototype.linkedinLogout = function() {
return IN.User.logout();
}, e.prototype.loadLinkedin = function(e) {
var t = this;
return window.linkedinAsyncInit = function() {
return IN.init({
api_key:t._configs.LINKEDIN_API_KEY,
scope:t._configs.LINKEDIN_PERMS,
authorize:!1,
credentials_cookie:!0,
credentials_cookie_crc:!0
}), IN.Event.on(IN, "auth", function() {
return IN.User.isAuthorized() && ($B.log("[LinkedIn] Authorized user"), e.connected) ? e.connected() :void 0;
}), IN.Event.on(IN, "logout", function() {
return !IN.User.isAuthorized() && ($B.log("[LinkedIn] Deauthorized user"), e.disconnected) ? e.disconnected() :void 0;
}), e.initialized ? $B.waitFor(function() {
return "undefined" != typeof IN && null !== IN && null != IN.User && null != IN.Event;
}, e.initialized, 500) :void 0;
}, $.getScript("//platform.linkedin.com/in.js?async=true", linkedinAsyncInit);
}, e;
}(), window.AjaxQueueBuffer = e, window.Task = t, $B.debounce = function(e, t) {
var o;
return null == t && (t = 100), o = 0, function() {
var n, i;
return i = this, n = arguments, clearTimeout(o), o = setTimeout(function() {
return e.apply(i, n);
}, t);
};
}, $B.genGeneralErrorHandler = function(e) {
return function(t) {
var o, n, i;
return o = null != t.responseJSON ? null != (n = t.responseJSON.meta) ? null != (i = n.userMessage) ? i.plain :void 0 :void 0 :I18n.t("js.pages.edit.errors.api_error"), 
$B.customAlert(o), "function" == typeof e ? e() :void 0;
};
}, $B.lazyloadIframe = function() {
var e;
return e = 0, function(t, o) {
return null == o && (o = -1), -1 === o && (o = 1e4 + 1e3 * e), e += 1, setTimeout(function() {
return t.data("src") !== t.attr("src") ? (t.attr("src", t.data("src")), "function" == typeof $B.timerCheck ? $B.timerCheck("Loading iframe #" + t.attr("id")) :void 0) :void 0;
}, o);
};
}(), $B.Embedly = function() {
function e() {
this.apiKey = $S.conf.EMBEDLY_API_KEY;
}
return e.prototype.queryUrlForHtml = function(e) {
return $.ajax({
type:"GET",
url:"http://api.embed.ly/1/oembed",
data:{
key:this.apiKey,
url:e
},
dataType:"JSON"
});
}, e;
}(), $B.Prefetcher = function() {
function e(e) {
var t = this;
this.prepared = !1, this.url = e, this.nextPage = $("iframe.prefetch"), 0 === this.nextPage.length ? setTimeout(function() {
return t.nextPage = $("<iframe class='prefetch' src='" + e + "'></iframe>").load(function() {
return t.prepared = !0;
}), t.nextPage.hide().appendTo("body");
}, 1e3) :this.prepared = !0;
}
return e.prototype.getTitle = function() {
return this.nextPage[0].contentDocument.title;
}, e.prototype.expand = function() {
return $("body > *:not(.prefetch)").remove(), this.nextPage.css({
border:"0",
position:"fixed",
top:0,
bottom:0,
left:0,
right:0,
width:"100%",
height:"100%",
"z-index":9999999,
display:"block"
});
}, e;
}();
}.call(this), function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1, 
window.Bobcat.DOM = {
SLIDES:".slides .slide",
PAGE_DATA_SCOPE:"page",
EDITPAGE_DATA_SCOPE:"editpage",
NAVIGATOR:"#s-header, .navigator",
FOOTER:"#footer",
FOOTER_LOGO_EDITOR:"#edit-logo-footer",
EDITOR_OVERLAY:".edit-overlay",
EDITOR:".editor",
CONTENT:".content",
PAGE_SETTING_DIALOG:"#page-settings-menu",
NEW_PAGE_MESSAGE_DIALOG:"#new-page-message-dialog",
NEW_SECTION_DIALOG:"#new-section-dialog",
ASSET_LIB_DIALOG:"#asset-lib-dialog",
APP_STORE_DIALOG:"#app-store-dialog",
TRAFFIC_GUIDE_DIALOG:"#traffic-guide-dialog",
SHARE_DIALOG:"#sharing-options-dialog",
CATEGORY_DIALOG:"#category-dialog",
PUBLISH_DIALOG:"#publish-dialog-new",
UNPUBLISH_SITES_DIALOG:"#unpublish-sites-dialog",
SAVED_DIALOG:"#saved-dialog",
FEEDBACK_DIALOG:"#feedback-dialog",
FEEDBACK_DIALOG_STEP1:".step-1",
FEEDBACK_DIALOG_STEP2:".step-2",
DIALOG_INACTIVE_CLASS:"inactive",
FACEBOOK_ROOT:"#fb-root",
FONT_SELECTOR:"select.fontselector",
VARIATION_SELECTOR:"select.variationselector",
PRESET_SELECTOR:"select.s-preset-selector-input",
STRIKINGLY_LOGO:"#strikingly-footer-logo",
SETTINGS:{
FORM:".strikingly-settings-form",
DOMAIN_FORM:".strikingly-custom-domain-form",
PUBLISH:{
FB_SHARE:"#publish-fb-button",
PUBLIC_URL:"#publish-public-url"
}
},
IMAGE_TITLE:function(e) {
return e.find("img").attr("alt") || "";
},
IMAGE_DESCRIPTION:function(e) {
return e.find("img").attr("data-description") || "";
},
GALLERY:function(e) {
var t, o, n, i;
for (i = e.parent().find("a.item"), o = 0, n = i.length; n > o; o++) t = i[o], $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER++ + "]");
},
GALLERY_IMAGES:function(e) {
return e.find("a.item");
},
GALLERY_IMAGES_EDITOR:function(e) {
return e.find(".gallery-editor-image");
}
};
}.call(this), function() {
$B.referrers_source = {
unknown:{
Google:{
domains:"support.google.com developers.google.com maps.google.com accounts.google.com drive.google.com sites.google.com groups.google.com groups.google.co.uk news.google.co.uk".split(" ")
},
"Yahoo!":{
domains:"finance.yahoo.com news.yahoo.com eurosport.yahoo.com sports.yahoo.com astrology.yahoo.com travel.yahoo.com answers.yahoo.com screen.yahoo.com weather.yahoo.com messenger.yahoo.com games.yahoo.com shopping.yahoo.net movies.yahoo.com cars.yahoo.com lifestyle.yahoo.com omg.yahoo.com match.yahoo.net".split(" ")
}
},
search:{
TalkTalk:{
domains:[ "www.talktalk.co.uk" ],
parameters:[ "query" ]
},
"1.cz":{
domains:[ "1.cz" ],
parameters:[ "q" ]
},
Softonic:{
domains:[ "search.softonic.com" ],
parameters:[ "q" ]
},
GAIS:{
domains:[ "gais.cs.ccu.edu.tw" ],
parameters:[ "q" ]
},
Freecause:{
domains:[ "search.freecause.com" ],
parameters:[ "p" ]
},
RPMFind:{
domains:[ "rpmfind.net", "fr2.rpmfind.net" ],
parameters:[ "rpmfind.net", "fr2.rpmfind.net" ]
},
Comcast:{
domains:[ "serach.comcast.net" ],
parameters:[ "q" ]
},
Voila:{
domains:[ "search.ke.voila.fr", "www.lemoteur.fr" ],
parameters:[ "rdata" ]
},
Nifty:{
domains:[ "search.nifty.com" ],
parameters:[ "q" ]
},
Atlas:{
domains:[ "searchatlas.centrum.cz" ],
parameters:[ "q" ]
},
"Lo.st":{
domains:[ "lo.st" ],
parameters:[ "x_query" ]
},
DasTelefonbuch:{
domains:[ "www1.dastelefonbuch.de" ],
parameters:[ "kw" ]
},
Fireball:{
domains:[ "www.fireball.de" ],
parameters:[ "q" ]
},
"1und1":{
domains:[ "search.1und1.de" ],
parameters:[ "su" ]
},
Virgilio:{
domains:[ "ricerca.virgilio.it", "ricercaimmagini.virgilio.it", "ricercavideo.virgilio.it", "ricercanews.virgilio.it", "mobile.virgilio.it" ],
parameters:[ "qs" ]
},
"Web.nl":{
domains:[ "www.web.nl" ],
parameters:[ "zoekwoord" ]
},
Plazoo:{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
"Goyellow.de":{
domains:[ "www.goyellow.de" ],
parameters:[ "MDN" ]
},
AOL:{
domains:"search.aol.com search.aol.it aolsearch.aol.com aolsearch.com www.aolrecherche.aol.fr www.aolrecherches.aol.fr www.aolimages.aol.fr aim.search.aol.com www.recherche.aol.fr find.web.aol.com recherche.aol.ca aolsearch.aol.co.uk search.aol.co.uk aolrecherche.aol.fr sucheaol.aol.de suche.aol.de suche.aolsvc.de aolbusqueda.aol.com.mx alicesuche.aol.de alicesuchet.aol.de suchet2.aol.de search.hp.my.aol.com.au search.hp.my.aol.de search.hp.my.aol.it search-intl.netscape.com".split(" "),
parameters:[ "q", "query" ]
},
Acoon:{
domains:[ "www.acoon.de" ],
parameters:[ "begriff" ]
},
Free:{
domains:[ "search.free.fr", "search1-2.free.fr", "search1-1.free.fr" ],
parameters:[ "q" ]
},
"Apollo Latvia":{
domains:[ "apollo.lv/portal/search/" ],
parameters:[ "q" ]
},
HighBeam:{
domains:[ "www.highbeam.com" ],
parameters:[ "q" ]
},
"I-play":{
domains:[ "start.iplay.com" ],
parameters:[ "q" ]
},
FriendFeed:{
domains:[ "friendfeed.com" ],
parameters:[ "q" ]
},
Yasni:{
domains:[ "www.yasni.de", "www.yasni.com", "www.yasni.co.uk", "www.yasni.ch", "www.yasni.at" ],
parameters:[ "query" ]
},
Gigablast:{
domains:[ "www.gigablast.com", "dir.gigablast.com" ],
parameters:[ "q" ]
},
arama:{
domains:[ "arama.com" ],
parameters:[ "q" ]
},
Fixsuche:{
domains:[ "www.fixsuche.de" ],
parameters:[ "q" ]
},
Apontador:{
domains:[ "apontador.com.br", "www.apontador.com.br" ],
parameters:[ "q" ]
},
"Search.com":{
domains:[ "www.search.com" ],
parameters:[ "q" ]
},
Monstercrawler:{
domains:[ "www.monstercrawler.com" ],
parameters:[ "qry" ]
},
"Google Images":{
domains:"google.ac/imgres google.ad/imgres google.ae/imgres google.am/imgres google.as/imgres google.at/imgres google.az/imgres google.ba/imgres google.be/imgres google.bf/imgres google.bg/imgres google.bi/imgres google.bj/imgres google.bs/imgres google.by/imgres google.ca/imgres google.cat/imgres google.cc/imgres google.cd/imgres google.cf/imgres google.cg/imgres google.ch/imgres google.ci/imgres google.cl/imgres google.cm/imgres google.cn/imgres google.co.bw/imgres google.co.ck/imgres google.co.cr/imgres google.co.id/imgres google.co.il/imgres google.co.in/imgres google.co.jp/imgres google.co.ke/imgres google.co.kr/imgres google.co.ls/imgres google.co.ma/imgres google.co.mz/imgres google.co.nz/imgres google.co.th/imgres google.co.tz/imgres google.co.ug/imgres google.co.uk/imgres google.co.uz/imgres google.co.ve/imgres google.co.vi/imgres google.co.za/imgres google.co.zm/imgres google.co.zw/imgres google.com/imgres google.com.af/imgres google.com.ag/imgres google.com.ai/imgres google.com.ar/imgres google.com.au/imgres google.com.bd/imgres google.com.bh/imgres google.com.bn/imgres google.com.bo/imgres google.com.br/imgres google.com.by/imgres google.com.bz/imgres google.com.co/imgres google.com.cu/imgres google.com.cy/imgres google.com.do/imgres google.com.ec/imgres google.com.eg/imgres google.com.et/imgres google.com.fj/imgres google.com.gh/imgres google.com.gi/imgres google.com.gt/imgres google.com.hk/imgres google.com.jm/imgres google.com.kh/imgres google.com.kh/imgres google.com.kw/imgres google.com.lb/imgres google.com.lc/imgres google.com.ly/imgres google.com.mt/imgres google.com.mx/imgres google.com.my/imgres google.com.na/imgres google.com.nf/imgres google.com.ng/imgres google.com.ni/imgres google.com.np/imgres google.com.om/imgres google.com.pa/imgres google.com.pe/imgres google.com.ph/imgres google.com.pk/imgres google.com.pr/imgres google.com.py/imgres google.com.qa/imgres google.com.sa/imgres google.com.sb/imgres google.com.sg/imgres google.com.sl/imgres google.com.sv/imgres google.com.tj/imgres google.com.tn/imgres google.com.tr/imgres google.com.tw/imgres google.com.ua/imgres google.com.uy/imgres google.com.vc/imgres google.com.vn/imgres google.cv/imgres google.cz/imgres google.de/imgres google.dj/imgres google.dk/imgres google.dm/imgres google.dz/imgres google.ee/imgres google.es/imgres google.fi/imgres google.fm/imgres google.fr/imgres google.ga/imgres google.gd/imgres google.ge/imgres google.gf/imgres google.gg/imgres google.gl/imgres google.gm/imgres google.gp/imgres google.gr/imgres google.gy/imgres google.hn/imgres google.hr/imgres google.ht/imgres google.hu/imgres google.ie/imgres google.im/imgres google.io/imgres google.iq/imgres google.is/imgres google.it/imgres google.it.ao/imgres google.je/imgres google.jo/imgres google.kg/imgres google.ki/imgres google.kz/imgres google.la/imgres google.li/imgres google.lk/imgres google.lt/imgres google.lu/imgres google.lv/imgres google.md/imgres google.me/imgres google.mg/imgres google.mk/imgres google.ml/imgres google.mn/imgres google.ms/imgres google.mu/imgres google.mv/imgres google.mw/imgres google.ne/imgres google.nl/imgres google.no/imgres google.nr/imgres google.nu/imgres google.pl/imgres google.pn/imgres google.ps/imgres google.pt/imgres google.ro/imgres google.rs/imgres google.ru/imgres google.rw/imgres google.sc/imgres google.se/imgres google.sh/imgres google.si/imgres google.sk/imgres google.sm/imgres google.sn/imgres google.so/imgres google.st/imgres google.td/imgres google.tg/imgres google.tk/imgres google.tl/imgres google.tm/imgres google.to/imgres google.tt/imgres google.us/imgres google.vg/imgres google.vu/imgres images.google.ws images.google.ac images.google.ad images.google.ae images.google.am images.google.as images.google.at images.google.az images.google.ba images.google.be images.google.bf images.google.bg images.google.bi images.google.bj images.google.bs images.google.by images.google.ca images.google.cat images.google.cc images.google.cd images.google.cf images.google.cg images.google.ch images.google.ci images.google.cl images.google.cm images.google.cn images.google.co.bw images.google.co.ck images.google.co.cr images.google.co.id images.google.co.il images.google.co.in images.google.co.jp images.google.co.ke images.google.co.kr images.google.co.ls images.google.co.ma images.google.co.mz images.google.co.nz images.google.co.th images.google.co.tz images.google.co.ug images.google.co.uk images.google.co.uz images.google.co.ve images.google.co.vi images.google.co.za images.google.co.zm images.google.co.zw images.google.com images.google.com.af images.google.com.ag images.google.com.ai images.google.com.ar images.google.com.au images.google.com.bd images.google.com.bh images.google.com.bn images.google.com.bo images.google.com.br images.google.com.by images.google.com.bz images.google.com.co images.google.com.cu images.google.com.cy images.google.com.do images.google.com.ec images.google.com.eg images.google.com.et images.google.com.fj images.google.com.gh images.google.com.gi images.google.com.gt images.google.com.hk images.google.com.jm images.google.com.kh images.google.com.kh images.google.com.kw images.google.com.lb images.google.com.lc images.google.com.ly images.google.com.mt images.google.com.mx images.google.com.my images.google.com.na images.google.com.nf images.google.com.ng images.google.com.ni images.google.com.np images.google.com.om images.google.com.pa images.google.com.pe images.google.com.ph images.google.com.pk images.google.com.pr images.google.com.py images.google.com.qa images.google.com.sa images.google.com.sb images.google.com.sg images.google.com.sl images.google.com.sv images.google.com.tj images.google.com.tn images.google.com.tr images.google.com.tw images.google.com.ua images.google.com.uy images.google.com.vc images.google.com.vn images.google.cv images.google.cz images.google.de images.google.dj images.google.dk images.google.dm images.google.dz images.google.ee images.google.es images.google.fi images.google.fm images.google.fr images.google.ga images.google.gd images.google.ge images.google.gf images.google.gg images.google.gl images.google.gm images.google.gp images.google.gr images.google.gy images.google.hn images.google.hr images.google.ht images.google.hu images.google.ie images.google.im images.google.io images.google.iq images.google.is images.google.it images.google.it.ao images.google.je images.google.jo images.google.kg images.google.ki images.google.kz images.google.la images.google.li images.google.lk images.google.lt images.google.lu images.google.lv images.google.md images.google.me images.google.mg images.google.mk images.google.ml images.google.mn images.google.ms images.google.mu images.google.mv images.google.mw images.google.ne images.google.nl images.google.no images.google.nr images.google.nu images.google.pl images.google.pn images.google.ps images.google.pt images.google.ro images.google.rs images.google.ru images.google.rw images.google.sc images.google.se images.google.sh images.google.si images.google.sk images.google.sm images.google.sn images.google.so images.google.st images.google.td images.google.tg images.google.tk images.google.tl images.google.tm images.google.to images.google.tt images.google.us images.google.vg images.google.vu images.google.ws".split(" "),
parameters:[ "q" ]
},
ABCsøk:{
domains:[ "abcsolk.no", "verden.abcsok.no" ],
parameters:[ "q" ]
},
"Google Product Search":{
domains:"google.ac/products google.ad/products google.ae/products google.am/products google.as/products google.at/products google.az/products google.ba/products google.be/products google.bf/products google.bg/products google.bi/products google.bj/products google.bs/products google.by/products google.ca/products google.cat/products google.cc/products google.cd/products google.cf/products google.cg/products google.ch/products google.ci/products google.cl/products google.cm/products google.cn/products google.co.bw/products google.co.ck/products google.co.cr/products google.co.id/products google.co.il/products google.co.in/products google.co.jp/products google.co.ke/products google.co.kr/products google.co.ls/products google.co.ma/products google.co.mz/products google.co.nz/products google.co.th/products google.co.tz/products google.co.ug/products google.co.uk/products google.co.uz/products google.co.ve/products google.co.vi/products google.co.za/products google.co.zm/products google.co.zw/products google.com/products google.com.af/products google.com.ag/products google.com.ai/products google.com.ar/products google.com.au/products google.com.bd/products google.com.bh/products google.com.bn/products google.com.bo/products google.com.br/products google.com.by/products google.com.bz/products google.com.co/products google.com.cu/products google.com.cy/products google.com.do/products google.com.ec/products google.com.eg/products google.com.et/products google.com.fj/products google.com.gh/products google.com.gi/products google.com.gt/products google.com.hk/products google.com.jm/products google.com.kh/products google.com.kh/products google.com.kw/products google.com.lb/products google.com.lc/products google.com.ly/products google.com.mt/products google.com.mx/products google.com.my/products google.com.na/products google.com.nf/products google.com.ng/products google.com.ni/products google.com.np/products google.com.om/products google.com.pa/products google.com.pe/products google.com.ph/products google.com.pk/products google.com.pr/products google.com.py/products google.com.qa/products google.com.sa/products google.com.sb/products google.com.sg/products google.com.sl/products google.com.sv/products google.com.tj/products google.com.tn/products google.com.tr/products google.com.tw/products google.com.ua/products google.com.uy/products google.com.vc/products google.com.vn/products google.cv/products google.cz/products google.de/products google.dj/products google.dk/products google.dm/products google.dz/products google.ee/products google.es/products google.fi/products google.fm/products google.fr/products google.ga/products google.gd/products google.ge/products google.gf/products google.gg/products google.gl/products google.gm/products google.gp/products google.gr/products google.gy/products google.hn/products google.hr/products google.ht/products google.hu/products google.ie/products google.im/products google.io/products google.iq/products google.is/products google.it/products google.it.ao/products google.je/products google.jo/products google.kg/products google.ki/products google.kz/products google.la/products google.li/products google.lk/products google.lt/products google.lu/products google.lv/products google.md/products google.me/products google.mg/products google.mk/products google.ml/products google.mn/products google.ms/products google.mu/products google.mv/products google.mw/products google.ne/products google.nl/products google.no/products google.nr/products google.nu/products google.pl/products google.pn/products google.ps/products google.pt/products google.ro/products google.rs/products google.ru/products google.rw/products google.sc/products google.se/products google.sh/products google.si/products google.sk/products google.sm/products google.sn/products google.so/products google.st/products google.td/products google.tg/products google.tk/products google.tl/products google.tm/products google.to/products google.tt/products google.us/products google.vg/products google.vu/products google.ws/products www.google.ac/products www.google.ad/products www.google.ae/products www.google.am/products www.google.as/products www.google.at/products www.google.az/products www.google.ba/products www.google.be/products www.google.bf/products www.google.bg/products www.google.bi/products www.google.bj/products www.google.bs/products www.google.by/products www.google.ca/products www.google.cat/products www.google.cc/products www.google.cd/products www.google.cf/products www.google.cg/products www.google.ch/products www.google.ci/products www.google.cl/products www.google.cm/products www.google.cn/products www.google.co.bw/products www.google.co.ck/products www.google.co.cr/products www.google.co.id/products www.google.co.il/products www.google.co.in/products www.google.co.jp/products www.google.co.ke/products www.google.co.kr/products www.google.co.ls/products www.google.co.ma/products www.google.co.mz/products www.google.co.nz/products www.google.co.th/products www.google.co.tz/products www.google.co.ug/products www.google.co.uk/products www.google.co.uz/products www.google.co.ve/products www.google.co.vi/products www.google.co.za/products www.google.co.zm/products www.google.co.zw/products www.google.com/products www.google.com.af/products www.google.com.ag/products www.google.com.ai/products www.google.com.ar/products www.google.com.au/products www.google.com.bd/products www.google.com.bh/products www.google.com.bn/products www.google.com.bo/products www.google.com.br/products www.google.com.by/products www.google.com.bz/products www.google.com.co/products www.google.com.cu/products www.google.com.cy/products www.google.com.do/products www.google.com.ec/products www.google.com.eg/products www.google.com.et/products www.google.com.fj/products www.google.com.gh/products www.google.com.gi/products www.google.com.gt/products www.google.com.hk/products www.google.com.jm/products www.google.com.kh/products www.google.com.kh/products www.google.com.kw/products www.google.com.lb/products www.google.com.lc/products www.google.com.ly/products www.google.com.mt/products www.google.com.mx/products www.google.com.my/products www.google.com.na/products www.google.com.nf/products www.google.com.ng/products www.google.com.ni/products www.google.com.np/products www.google.com.om/products www.google.com.pa/products www.google.com.pe/products www.google.com.ph/products www.google.com.pk/products www.google.com.pr/products www.google.com.py/products www.google.com.qa/products www.google.com.sa/products www.google.com.sb/products www.google.com.sg/products www.google.com.sl/products www.google.com.sv/products www.google.com.tj/products www.google.com.tn/products www.google.com.tr/products www.google.com.tw/products www.google.com.ua/products www.google.com.uy/products www.google.com.vc/products www.google.com.vn/products www.google.cv/products www.google.cz/products www.google.de/products www.google.dj/products www.google.dk/products www.google.dm/products www.google.dz/products www.google.ee/products www.google.es/products www.google.fi/products www.google.fm/products www.google.fr/products www.google.ga/products www.google.gd/products www.google.ge/products www.google.gf/products www.google.gg/products www.google.gl/products www.google.gm/products www.google.gp/products www.google.gr/products www.google.gy/products www.google.hn/products www.google.hr/products www.google.ht/products www.google.hu/products www.google.ie/products www.google.im/products www.google.io/products www.google.iq/products www.google.is/products www.google.it/products www.google.it.ao/products www.google.je/products www.google.jo/products www.google.kg/products www.google.ki/products www.google.kz/products www.google.la/products www.google.li/products www.google.lk/products www.google.lt/products www.google.lu/products www.google.lv/products www.google.md/products www.google.me/products www.google.mg/products www.google.mk/products www.google.ml/products www.google.mn/products www.google.ms/products www.google.mu/products www.google.mv/products www.google.mw/products www.google.ne/products www.google.nl/products www.google.no/products www.google.nr/products www.google.nu/products www.google.pl/products www.google.pn/products www.google.ps/products www.google.pt/products www.google.ro/products www.google.rs/products www.google.ru/products www.google.rw/products www.google.sc/products www.google.se/products www.google.sh/products www.google.si/products www.google.sk/products www.google.sm/products www.google.sn/products www.google.so/products www.google.st/products www.google.td/products www.google.tg/products www.google.tk/products www.google.tl/products www.google.tm/products www.google.to/products www.google.tt/products www.google.us/products www.google.vg/products www.google.vu/products www.google.ws/products".split(" "),
parameters:[ "q" ]
},
DasOertliche:{
domains:[ "www.dasoertliche.de" ],
parameters:[ "kw" ]
},
InfoSpace:{
domains:"infospace.com dogpile.com www.dogpile.com metacrawler.com webfetch.com webcrawler.com search.kiwee.com isearch.babylon.com start.facemoods.com search.magnetic.com search.searchcompletion.com clusty.com".split(" "),
parameters:[ "q", "s" ]
},
Weborama:{
domains:[ "www.weborama.com" ],
parameters:[ "QUERY" ]
},
Bluewin:{
domains:[ "search.bluewin.ch" ],
parameters:[ "searchTerm" ]
},
Neti:{
domains:[ "www.neti.ee" ],
parameters:[ "query" ]
},
Winamp:{
domains:[ "search.winamp.com" ],
parameters:[ "q" ]
},
Nigma:{
domains:[ "nigma.ru" ],
parameters:[ "s" ]
},
"Yahoo! Images":{
domains:[ "image.yahoo.cn", "images.search.yahoo.com" ],
parameters:[ "p", "q" ]
},
Exalead:{
domains:[ "www.exalead.fr", "www.exalead.com" ],
parameters:[ "q" ]
},
Teoma:{
domains:[ "www.teoma.com" ],
parameters:[ "q" ]
},
Needtofind:{
domains:[ "ko.search.need2find.com" ],
parameters:[ "searchfor" ]
},
Looksmart:{
domains:[ "www.looksmart.com" ],
parameters:[ "key" ]
},
"Wirtualna Polska":{
domains:[ "szukaj.wp.pl" ],
parameters:[ "szukaj" ]
},
Toolbarhome:{
domains:[ "www.toolbarhome.com", "vshare.toolbarhome.com" ],
parameters:[ "q" ]
},
Searchalot:{
domains:[ "searchalot.com" ],
parameters:[ "q" ]
},
Yandex:{
domains:"yandex.ru yandex.ua yandex.com www.yandex.ru www.yandex.ua www.yandex.com".split(" "),
parameters:[ "text" ]
},
"canoe.ca":{
domains:[ "web.canoe.ca" ],
parameters:[ "q" ]
},
Compuserve:{
domains:[ "websearch.cs.com" ],
parameters:[ "query" ]
},
Startpagina:{
domains:[ "startgoogle.startpagina.nl" ],
parameters:[ "q" ]
},
eo:{
domains:[ "eo.st" ],
parameters:[ "x_query" ]
},
Zhongsou:{
domains:[ "p.zhongsou.com" ],
parameters:[ "w" ]
},
"La Toile Du Quebec Via Google":{
domains:[ "www.toile.com", "web.toile.com" ],
parameters:[ "q" ]
},
Paperball:{
domains:[ "www.paperball.de" ],
parameters:[ "q" ]
},
"Jungle Spider":{
domains:[ "www.jungle-spider.de" ],
parameters:[ "q" ]
},
PeoplePC:{
domains:[ "search.peoplepc.com" ],
parameters:[ "q" ]
},
"MetaCrawler.de":{
domains:[ "s1.metacrawler.de", "s2.metacrawler.de", "s3.metacrawler.de" ],
parameters:[ "qry" ]
},
Orange:{
domains:[ "busca.orange.es", "search.orange.co.uk" ],
parameters:[ "q" ]
},
"Gule Sider":{
domains:[ "www.gulesider.no" ],
parameters:[ "q" ]
},
Francite:{
domains:[ "recherche.francite.com" ],
parameters:[ "name" ]
},
"Ask Toolbar":{
domains:[ "search.tb.ask.com" ],
parameters:[ "searchfor" ]
},
Aport:{
domains:[ "sm.aport.ru" ],
parameters:[ "r" ]
},
"Trusted-Search":{
domains:[ "www.trusted--search.com" ],
parameters:[ "w" ]
},
goo:{
domains:[ "search.goo.ne.jp", "ocnsearch.goo.ne.jp" ],
parameters:[ "MT" ]
},
"Fast Browser Search":{
domains:[ "www.fastbrowsersearch.com" ],
parameters:[ "q" ]
},
Blogpulse:{
domains:[ "www.blogpulse.com" ],
parameters:[ "query" ]
},
Volny:{
domains:[ "web.volny.cz" ],
parameters:[ "search" ]
},
Icerockeet:{
domains:[ "blogs.icerocket.com" ],
parameters:[ "q" ]
},
Terra:{
domains:[ "buscador.terra.es", "buscador.terra.cl", "buscador.terra.com.br" ],
parameters:[ "query" ]
},
Searchy:{
domains:[ "www.searchy.co.uk" ],
parameters:[ "q" ]
},
Onet:{
domains:[ "szukaj.onet.pl" ],
parameters:[ "qt" ]
},
Digg:{
domains:[ "digg.com" ],
parameters:[ "s" ]
},
Abacho:{
domains:"www.abacho.de www.abacho.com www.abacho.co.uk www.se.abacho.com www.tr.abacho.com www.abacho.at www.abacho.fr www.abacho.es www.abacho.ch www.abacho.it".split(" "),
parameters:[ "q" ]
},
maailm:{
domains:[ "www.maailm.com" ],
parameters:[ "tekst" ]
},
Flix:{
domains:[ "www.flix.de" ],
parameters:[ "keyword" ]
},
Suchnase:{
domains:[ "www.suchnase.de" ],
parameters:[ "q" ]
},
Freenet:{
domains:[ "suche.freenet.de" ],
parameters:[ "query", "Keywords" ]
},
DuckDuckGoL:{
domains:[ "duckduckgo.com" ],
parameters:[ "q" ]
},
"Poisk.ru":{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
Sharelook:{
domains:[ "www.sharelook.fr" ],
parameters:[ "keyword" ]
},
Najdi:{
domains:[ "www.najdi.si" ],
parameters:[ "q" ]
},
Picsearch:{
domains:[ "www.picsearch.com" ],
parameters:[ "q" ]
},
"Mail.ru":{
domains:[ "go.mail.ru" ],
parameters:[ "q" ]
},
Alexa:{
domains:[ "alexa.com", "search.toolbars.alexa.com" ],
parameters:[ "q" ]
},
Metager:{
domains:[ "meta.rrzn.uni-hannover.de", "www.metager.de" ],
parameters:[ "eingabe" ]
},
Technorati:{
domains:[ "technorati.com" ],
parameters:[ "q" ]
},
WWW:{
domains:[ "search.www.ee" ],
parameters:[ "query" ]
},
"Trouvez.com":{
domains:[ "www.trouvez.com" ],
parameters:[ "query" ]
},
IXquick:{
domains:"ixquick.com www.eu.ixquick.com ixquick.de www.ixquick.de us.ixquick.com s1.us.ixquick.com s2.us.ixquick.com s3.us.ixquick.com s4.us.ixquick.com s5.us.ixquick.com eu.ixquick.com s8-eu.ixquick.com s1-eu.ixquick.de".split(" "),
parameters:[ "query" ]
},
Zapmeta:{
domains:[ "www.zapmeta.com", "www.zapmeta.nl", "www.zapmeta.de", "uk.zapmeta.com" ],
parameters:[ "q", "query" ]
},
Yippy:{
domains:[ "search.yippy.com" ],
parameters:[ "q", "query" ]
},
Gomeo:{
domains:[ "www.gomeo.com" ],
parameters:[ "Keywords" ]
},
Walhello:{
domains:[ "www.walhello.info", "www.walhello.com", "www.walhello.de", "www.walhello.nl" ],
parameters:[ "key" ]
},
Meta:{
domains:[ "meta.ua" ],
parameters:[ "q" ]
},
Skynet:{
domains:[ "www.skynet.be" ],
parameters:[ "q" ]
},
Blogdigger:{
domains:[ "www.blogdigger.com" ],
parameters:[ "q" ]
},
WebSearch:{
domains:[ "www.websearch.com" ],
parameters:[ "qkw", "q" ]
},
Rambler:{
domains:[ "nova.rambler.ru" ],
parameters:[ "query", "words" ]
},
Latne:{
domains:[ "www.latne.lv" ],
parameters:[ "q" ]
},
MySearch:{
domains:"www.mysearch.com ms114.mysearch.com ms146.mysearch.com kf.mysearch.myway.com ki.mysearch.myway.com search.myway.com search.mywebsearch.com".split(" "),
parameters:[ "searchfor", "searchFor" ]
},
Cuil:{
domains:[ "www.cuil.com" ],
parameters:[ "q" ]
},
Tixuma:{
domains:[ "www.tixuma.de" ],
parameters:[ "sc" ]
},
Sapo:{
domains:[ "pesquisa.sapo.pt" ],
parameters:[ "q" ]
},
Gnadenmeer:{
domains:[ "www.gnadenmeer.de" ],
parameters:[ "keyword" ]
},
Arcor:{
domains:[ "www.arcor.de" ],
parameters:[ "Keywords" ]
},
Naver:{
domains:[ "search.naver.com" ],
parameters:[ "query" ]
},
Zoeken:{
domains:[ "www.zoeken.nl" ],
parameters:[ "q" ]
},
Yam:{
domains:[ "search.yam.com" ],
parameters:[ "k" ]
},
Eniro:{
domains:[ "www.eniro.se" ],
parameters:[ "q", "search_word" ]
},
APOLL07:{
domains:[ "apollo7.de" ],
parameters:[ "query" ]
},
Biglobe:{
domains:[ "cgi.search.biglobe.ne.jp" ],
parameters:[ "q" ]
},
Mozbot:{
domains:[ "www.mozbot.fr", "www.mozbot.co.uk", "www.mozbot.com" ],
parameters:[ "q" ]
},
ICQ:{
domains:[ "www.icq.com", "search.icq.com" ],
parameters:[ "q" ]
},
Baidu:{
domains:"www.baidu.com www1.baidu.com zhidao.baidu.com tieba.baidu.com news.baidu.com web.gougou.com".split(" "),
parameters:[ "wd", "word", "kw", "k" ]
},
Conduit:{
domains:[ "search.conduit.com" ],
parameters:[ "q" ]
},
Austronaut:{
domains:[ "www2.austronaut.at", "www1.astronaut.at" ],
parameters:[ "q" ]
},
Vindex:{
domains:[ "www.vindex.nl", "search.vindex.nl" ],
parameters:[ "search_for" ]
},
TrovaRapido:{
domains:[ "www.trovarapido.com" ],
parameters:[ "q" ]
},
"Suchmaschine.com":{
domains:[ "www.suchmaschine.com" ],
parameters:[ "suchstr" ]
},
Lycos:{
domains:[ "search.lycos.com", "www.lycos.com", "lycos.com" ],
parameters:[ "query" ]
},
Vinden:{
domains:[ "www.vinden.nl" ],
parameters:[ "q" ]
},
Altavista:{
domains:"www.altavista.com search.altavista.com listings.altavista.com altavista.de altavista.fr be-nl.altavista.com be-fr.altavista.com".split(" "),
parameters:[ "q" ]
},
dmoz:{
domains:[ "dmoz.org", "editors.dmoz.org" ],
parameters:[ "q" ]
},
Ecosia:{
domains:[ "ecosia.org" ],
parameters:[ "q" ]
},
Maxwebsearch:{
domains:[ "maxwebsearch.com" ],
parameters:[ "query" ]
},
Euroseek:{
domains:[ "www.euroseek.com" ],
parameters:[ "string" ]
},
Bing:{
domains:"bing.com www.bing.com msnbc.msn.com dizionario.it.msn.com cc.bingj.com m.bing.com".split(" "),
parameters:[ "q", "Q" ]
},
"X-recherche":{
domains:[ "www.x-recherche.com" ],
parameters:[ "MOTS" ]
},
"Yandex Images":{
domains:[ "images.yandex.ru", "images.yandex.ua", "images.yandex.com" ],
parameters:[ "text" ]
},
GMX:{
domains:[ "suche.gmx.net" ],
parameters:[ "su" ]
},
"Daemon search":{
domains:[ "daemon-search.com", "my.daemon-search.com" ],
parameters:[ "q" ]
},
"Jungle Key":{
domains:[ "junglekey.com", "junglekey.fr" ],
parameters:[ "query" ]
},
Firstfind:{
domains:[ "www.firstsfind.com" ],
parameters:[ "qry" ]
},
Crawler:{
domains:[ "www.crawler.com" ],
parameters:[ "q" ]
},
Holmes:{
domains:[ "holmes.ge" ],
parameters:[ "q" ]
},
Charter:{
domains:[ "www.charter.net" ],
parameters:[ "q" ]
},
Ilse:{
domains:[ "www.ilse.nl" ],
parameters:[ "search_for" ]
},
earthlink:{
domains:[ "search.earthlink.net" ],
parameters:[ "q" ]
},
Qualigo:{
domains:[ "www.qualigo.at", "www.qualigo.ch", "www.qualigo.de", "www.qualigo.nl" ],
parameters:[ "q" ]
},
"El Mundo":{
domains:[ "ariadna.elmundo.es" ],
parameters:[ "q" ]
},
Metager2:{
domains:[ "metager2.de" ],
parameters:[ "q" ]
},
Forestle:{
domains:[ "forestle.org", "www.forestle.org", "forestle.mobi" ],
parameters:[ "q" ]
},
"Search.ch":{
domains:[ "www.search.ch" ],
parameters:[ "q" ]
},
Meinestadt:{
domains:[ "www.meinestadt.de" ],
parameters:[ "words" ]
},
Freshweather:{
domains:[ "www.fresh-weather.com" ],
parameters:[ "q" ]
},
AllTheWeb:{
domains:[ "www.alltheweb.com" ],
parameters:[ "q" ]
},
Zoek:{
domains:[ "www3.zoek.nl" ],
parameters:[ "q" ]
},
Daum:{
domains:[ "search.daum.net" ],
parameters:[ "q" ]
},
Marktplaats:{
domains:[ "www.marktplaats.nl" ],
parameters:[ "query" ]
},
"suche.info":{
domains:[ "suche.info" ],
parameters:[ "q" ]
},
"Google News":{
domains:"news.google.ac news.google.ad news.google.ae news.google.am news.google.as news.google.at news.google.az news.google.ba news.google.be news.google.bf news.google.bg news.google.bi news.google.bj news.google.bs news.google.by news.google.ca news.google.cat news.google.cc news.google.cd news.google.cf news.google.cg news.google.ch news.google.ci news.google.cl news.google.cm news.google.cn news.google.co.bw news.google.co.ck news.google.co.cr news.google.co.id news.google.co.il news.google.co.in news.google.co.jp news.google.co.ke news.google.co.kr news.google.co.ls news.google.co.ma news.google.co.mz news.google.co.nz news.google.co.th news.google.co.tz news.google.co.ug news.google.co.uk news.google.co.uz news.google.co.ve news.google.co.vi news.google.co.za news.google.co.zm news.google.co.zw news.google.com news.google.com.af news.google.com.ag news.google.com.ai news.google.com.ar news.google.com.au news.google.com.bd news.google.com.bh news.google.com.bn news.google.com.bo news.google.com.br news.google.com.by news.google.com.bz news.google.com.co news.google.com.cu news.google.com.cy news.google.com.do news.google.com.ec news.google.com.eg news.google.com.et news.google.com.fj news.google.com.gh news.google.com.gi news.google.com.gt news.google.com.hk news.google.com.jm news.google.com.kh news.google.com.kh news.google.com.kw news.google.com.lb news.google.com.lc news.google.com.ly news.google.com.mt news.google.com.mx news.google.com.my news.google.com.na news.google.com.nf news.google.com.ng news.google.com.ni news.google.com.np news.google.com.om news.google.com.pa news.google.com.pe news.google.com.ph news.google.com.pk news.google.com.pr news.google.com.py news.google.com.qa news.google.com.sa news.google.com.sb news.google.com.sg news.google.com.sl news.google.com.sv news.google.com.tj news.google.com.tn news.google.com.tr news.google.com.tw news.google.com.ua news.google.com.uy news.google.com.vc news.google.com.vn news.google.cv news.google.cz news.google.de news.google.dj news.google.dk news.google.dm news.google.dz news.google.ee news.google.es news.google.fi news.google.fm news.google.fr news.google.ga news.google.gd news.google.ge news.google.gf news.google.gg news.google.gl news.google.gm news.google.gp news.google.gr news.google.gy news.google.hn news.google.hr news.google.ht news.google.hu news.google.ie news.google.im news.google.io news.google.iq news.google.is news.google.it news.google.it.ao news.google.je news.google.jo news.google.kg news.google.ki news.google.kz news.google.la news.google.li news.google.lk news.google.lt news.google.lu news.google.lv news.google.md news.google.me news.google.mg news.google.mk news.google.ml news.google.mn news.google.ms news.google.mu news.google.mv news.google.mw news.google.ne news.google.nl news.google.no news.google.nr news.google.nu news.google.pl news.google.pn news.google.ps news.google.pt news.google.ro news.google.rs news.google.ru news.google.rw news.google.sc news.google.se news.google.sh news.google.si news.google.sk news.google.sm news.google.sn news.google.so news.google.st news.google.td news.google.tg news.google.tk news.google.tl news.google.tm news.google.to news.google.tt news.google.us news.google.vg news.google.vu news.google.ws".split(" "),
parameters:[ "q" ]
},
Zoohoo:{
domains:[ "zoohoo.cz" ],
parameters:[ "q" ]
},
Seznam:{
domains:[ "search.seznam.cz" ],
parameters:[ "q" ]
},
"Online.no":{
domains:[ "online.no" ],
parameters:[ "q" ]
},
Eurip:{
domains:[ "www.eurip.com" ],
parameters:[ "q" ]
},
"all.by":{
domains:[ "all.by" ],
parameters:[ "query" ]
},
"Road Runner Search":{
domains:[ "search.rr.com" ],
parameters:[ "q" ]
},
"Opplysningen 1881":{
domains:[ "www.1881.no" ],
parameters:[ "Query" ]
},
YouGoo:{
domains:[ "www.yougoo.fr" ],
parameters:[ "q" ]
},
"Bing Images":{
domains:[ "bing.com/images/search", "www.bing.com/images/search" ],
parameters:[ "q", "Q" ]
},
Geona:{
domains:[ "geona.net" ],
parameters:[ "q" ]
},
Nate:{
domains:[ "search.nate.com" ],
parameters:[ "q" ]
},
"T-Online":{
domains:[ "suche.t-online.de", "brisbane.t-online.de", "navigationshilfe.t-online.de" ],
parameters:[ "q" ]
},
Hotbot:{
domains:[ "www.hotbot.com" ],
parameters:[ "query" ]
},
Kvasir:{
domains:[ "www.kvasir.no" ],
parameters:[ "q" ]
},
Babylon:{
domains:[ "search.babylon.com", "searchassist.babylon.com" ],
parameters:[ "q" ]
},
Excite:{
domains:"search.excite.it search.excite.fr search.excite.de search.excite.co.uk serach.excite.es search.excite.nl msxml.excite.com www.excite.co.jp".split(" "),
parameters:[ "q", "search" ]
},
qip:{
domains:[ "search.qip.ru" ],
parameters:[ "query" ]
},
"Yahoo!":{
domains:"search.yahoo.com yahoo.com ar.search.yahoo.com ar.yahoo.com au.search.yahoo.com au.yahoo.com br.search.yahoo.com br.yahoo.com cade.searchde.yahoo.com cade.yahoo.com chinese.searchinese.yahoo.com chinese.yahoo.com cn.search.yahoo.com cn.yahoo.com de.search.yahoo.com de.yahoo.com dk.search.yahoo.com dk.yahoo.com es.search.yahoo.com es.yahoo.com espanol.searchpanol.yahoo.com espanol.searchpanol.yahoo.com espanol.yahoo.com espanol.yahoo.com fr.search.yahoo.com fr.yahoo.com ie.search.yahoo.com ie.yahoo.com it.search.yahoo.com it.yahoo.com kr.search.yahoo.com kr.yahoo.com mx.search.yahoo.com mx.yahoo.com no.search.yahoo.com no.yahoo.com nz.search.yahoo.com nz.yahoo.com one.cn.yahoo.com one.searchn.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.yahoo.com qc.yahoo.com se.search.yahoo.com se.search.yahoo.com se.yahoo.com search.searcharch.yahoo.com search.yahoo.com uk.search.yahoo.com uk.yahoo.com www.yahoo.co.jp search.yahoo.co.jp www.cercato.it search.offerbox.com ys.mirostart.com".split(" "),
parameters:[ "p", "q" ]
},
"URL.ORGanizier":{
domains:[ "www.url.org" ],
parameters:[ "q" ]
},
Witch:{
domains:[ "www.witch.de" ],
parameters:[ "search" ]
},
"Mister Wong":{
domains:[ "www.mister-wong.com", "www.mister-wong.de" ],
parameters:[ "Keywords" ]
},
Startsiden:{
domains:[ "www.startsiden.no" ],
parameters:[ "q" ]
},
"Web.de":{
domains:[ "suche.web.de" ],
parameters:[ "su" ]
},
Ask:{
domains:"ask.com www.ask.com web.ask.com int.ask.com mws.ask.com uk.ask.com images.ask.com ask.reference.com www.askkids.com iwon.ask.com www.ask.co.uk www.qbyrd.com search-results.com uk.search-results.com www.search-results.com int.search-results.com".split(" "),
parameters:[ "q" ]
},
Centrum:{
domains:[ "serach.centrum.cz", "morfeo.centrum.cz" ],
parameters:[ "q" ]
},
Everyclick:{
domains:[ "www.everyclick.com" ],
parameters:[ "keyword" ]
},
"Google Video":{
domains:[ "video.google.com" ],
parameters:[ "q" ]
},
Delfi:{
domains:[ "otsing.delfi.ee" ],
parameters:[ "q" ]
},
blekko:{
domains:[ "blekko.com" ],
parameters:[ "q" ]
},
Jyxo:{
domains:[ "jyxo.1188.cz" ],
parameters:[ "q" ]
},
Kataweb:{
domains:[ "www.kataweb.it" ],
parameters:[ "q" ]
},
"uol.com.br":{
domains:[ "busca.uol.com.br" ],
parameters:[ "q" ]
},
Arianna:{
domains:[ "arianna.libero.it", "www.arianna.com" ],
parameters:[ "query" ]
},
Mamma:{
domains:[ "www.mamma.com", "mamma75.mamma.com" ],
parameters:[ "query" ]
},
Yatedo:{
domains:[ "www.yatedo.com", "www.yatedo.fr" ],
parameters:[ "q" ]
},
Twingly:{
domains:[ "www.twingly.com" ],
parameters:[ "q" ]
},
"Delfi latvia":{
domains:[ "smart.delfi.lv" ],
parameters:[ "q" ]
},
PriceRunner:{
domains:[ "www.pricerunner.co.uk" ],
parameters:[ "q" ]
},
Rakuten:{
domains:[ "websearch.rakuten.co.jp" ],
parameters:[ "qt" ]
},
Google:{
domains:"www.google.com www.google.ac www.google.ad www.google.com.af www.google.com.ag www.google.com.ai www.google.am www.google.it.ao www.google.com.ar www.google.as www.google.at www.google.com.au www.google.az www.google.ba www.google.com.bd www.google.be www.google.bf www.google.bg www.google.com.bh www.google.bi www.google.bj www.google.com.bn www.google.com.bo www.google.com.br www.google.bs www.google.co.bw www.google.com.by www.google.by www.google.com.bz www.google.ca www.google.com.kh www.google.cc www.google.cd www.google.cf www.google.cat www.google.cg www.google.ch www.google.ci www.google.co.ck www.google.cl www.google.cm www.google.cn www.google.com.co www.google.co.cr www.google.com.cu www.google.cv www.google.com.cy www.google.cz www.google.de www.google.dj www.google.dk www.google.dm www.google.com.do www.google.dz www.google.com.ec www.google.ee www.google.com.eg www.google.es www.google.com.et www.google.fi www.google.com.fj www.google.fm www.google.fr www.google.ga www.google.gd www.google.ge www.google.gf www.google.gg www.google.com.gh www.google.com.gi www.google.gl www.google.gm www.google.gp www.google.gr www.google.com.gt www.google.gy www.google.com.hk www.google.hn www.google.hr www.google.ht www.google.hu www.google.co.id www.google.iq www.google.ie www.google.co.il www.google.im www.google.co.in www.google.io www.google.is www.google.it www.google.je www.google.com.jm www.google.jo www.google.co.jp www.google.co.ke www.google.com.kh www.google.ki www.google.kg www.google.co.kr www.google.com.kw www.google.kz www.google.la www.google.com.lb www.google.com.lc www.google.li www.google.lk www.google.co.ls www.google.lt www.google.lu www.google.lv www.google.com.ly www.google.co.ma www.google.md www.google.me www.google.mg www.google.mk www.google.ml www.google.mn www.google.ms www.google.com.mt www.google.mu www.google.mv www.google.mw www.google.com.mx www.google.com.my www.google.co.mz www.google.com.na www.google.ne www.google.com.nf www.google.com.ng www.google.com.ni www.google.nl www.google.no www.google.com.np www.google.nr www.google.nu www.google.co.nz www.google.com.om www.google.com.pa www.google.com.pe www.google.com.ph www.google.com.pk www.google.pl www.google.pn www.google.com.pr www.google.ps www.google.pt www.google.com.py www.google.com.qa www.google.ro www.google.rs www.google.ru www.google.rw www.google.com.sa www.google.com.sb www.google.sc www.google.se www.google.com.sg www.google.sh www.google.si www.google.sk www.google.com.sl www.google.sn www.google.sm www.google.so www.google.st www.google.com.sv www.google.td www.google.tg www.google.co.th www.google.com.tj www.google.tk www.google.tl www.google.tm www.google.to www.google.com.tn www.google.com.tr www.google.tt www.google.com.tw www.google.co.tz www.google.com.ua www.google.co.ug www.google.ae www.google.co.uk www.google.us www.google.com.uy www.google.co.uz www.google.com.vc www.google.co.ve www.google.vg www.google.co.vi www.google.com.vn www.google.vu www.google.ws www.google.co.za www.google.co.zm www.google.co.zw google.com google.ac google.ad google.com.af google.com.ag google.com.ai google.am google.it.ao google.com.ar google.as google.at google.com.au google.az google.ba google.com.bd google.be google.bf google.bg google.com.bh google.bi google.bj google.com.bn google.com.bo google.com.br google.bs google.co.bw google.com.by google.by google.com.bz google.ca google.com.kh google.cc google.cd google.cf google.cat google.cg google.ch google.ci google.co.ck google.cl google.cm google.cn google.com.co google.co.cr google.com.cu google.cv google.com.cy google.cz google.de google.dj google.dk google.dm google.com.do google.dz google.com.ec google.ee google.com.eg google.es google.com.et google.fi google.com.fj google.fm google.fr google.ga google.gd google.ge google.gf google.gg google.com.gh google.com.gi google.gl google.gm google.gp google.gr google.com.gt google.gy google.com.hk google.hn google.hr google.ht google.hu google.co.id google.iq google.ie google.co.il google.im google.co.in google.io google.is google.it google.je google.com.jm google.jo google.co.jp google.co.ke google.com.kh google.ki google.kg google.co.kr google.com.kw google.kz google.la google.com.lb google.com.lc google.li google.lk google.co.ls google.lt google.lu google.lv google.com.ly google.co.ma google.md google.me google.mg google.mk google.ml google.mn google.ms google.com.mt google.mu google.mv google.mw google.com.mx google.com.my google.co.mz google.com.na google.ne google.com.nf google.com.ng google.com.ni google.nl google.no google.com.np google.nr google.nu google.co.nz google.com.om google.com.pa google.com.pe google.com.ph google.com.pk google.pl google.pn google.com.pr google.ps google.pt google.com.py google.com.qa google.ro google.rs google.ru google.rw google.com.sa google.com.sb google.sc google.se google.com.sg google.sh google.si google.sk google.com.sl google.sn google.sm google.so google.st google.com.sv google.td google.tg google.co.th google.com.tj google.tk google.tl google.tm google.to google.com.tn google.com.tr google.tt google.com.tw google.co.tz google.com.ua google.co.ug google.ae google.co.uk google.us google.com.uy google.co.uz google.com.vc google.co.ve google.vg google.co.vi google.com.vn google.vu google.ws google.co.za google.co.zm google.co.zw search.avg.com isearch.avg.com www.cnn.com darkoogle.com search.darkoogle.com search.foxtab.com www.gooofullsearch.com search.hiyo.com search.incredimail.com search1.incredimail.com search2.incredimail.com search3.incredimail.com search4.incredimail.com search.incredibar.com search.sweetim.com www.fastweb.it search.juno.com find.tdc.dk searchresults.verizon.com search.walla.co.il search.alot.com www.googleearth.de www.googleearth.fr webcache.googleusercontent.com encrypted.google.com googlesyndicatedsearch.com".split(" "),
parameters:[ "q", "query", "Keywords" ]
},
"Google Blogsearch":{
domains:"blogsearch.google.ac blogsearch.google.ad blogsearch.google.ae blogsearch.google.am blogsearch.google.as blogsearch.google.at blogsearch.google.az blogsearch.google.ba blogsearch.google.be blogsearch.google.bf blogsearch.google.bg blogsearch.google.bi blogsearch.google.bj blogsearch.google.bs blogsearch.google.by blogsearch.google.ca blogsearch.google.cat blogsearch.google.cc blogsearch.google.cd blogsearch.google.cf blogsearch.google.cg blogsearch.google.ch blogsearch.google.ci blogsearch.google.cl blogsearch.google.cm blogsearch.google.cn blogsearch.google.co.bw blogsearch.google.co.ck blogsearch.google.co.cr blogsearch.google.co.id blogsearch.google.co.il blogsearch.google.co.in blogsearch.google.co.jp blogsearch.google.co.ke blogsearch.google.co.kr blogsearch.google.co.ls blogsearch.google.co.ma blogsearch.google.co.mz blogsearch.google.co.nz blogsearch.google.co.th blogsearch.google.co.tz blogsearch.google.co.ug blogsearch.google.co.uk blogsearch.google.co.uz blogsearch.google.co.ve blogsearch.google.co.vi blogsearch.google.co.za blogsearch.google.co.zm blogsearch.google.co.zw blogsearch.google.com blogsearch.google.com.af blogsearch.google.com.ag blogsearch.google.com.ai blogsearch.google.com.ar blogsearch.google.com.au blogsearch.google.com.bd blogsearch.google.com.bh blogsearch.google.com.bn blogsearch.google.com.bo blogsearch.google.com.br blogsearch.google.com.by blogsearch.google.com.bz blogsearch.google.com.co blogsearch.google.com.cu blogsearch.google.com.cy blogsearch.google.com.do blogsearch.google.com.ec blogsearch.google.com.eg blogsearch.google.com.et blogsearch.google.com.fj blogsearch.google.com.gh blogsearch.google.com.gi blogsearch.google.com.gt blogsearch.google.com.hk blogsearch.google.com.jm blogsearch.google.com.kh blogsearch.google.com.kh blogsearch.google.com.kw blogsearch.google.com.lb blogsearch.google.com.lc blogsearch.google.com.ly blogsearch.google.com.mt blogsearch.google.com.mx blogsearch.google.com.my blogsearch.google.com.na blogsearch.google.com.nf blogsearch.google.com.ng blogsearch.google.com.ni blogsearch.google.com.np blogsearch.google.com.om blogsearch.google.com.pa blogsearch.google.com.pe blogsearch.google.com.ph blogsearch.google.com.pk blogsearch.google.com.pr blogsearch.google.com.py blogsearch.google.com.qa blogsearch.google.com.sa blogsearch.google.com.sb blogsearch.google.com.sg blogsearch.google.com.sl blogsearch.google.com.sv blogsearch.google.com.tj blogsearch.google.com.tn blogsearch.google.com.tr blogsearch.google.com.tw blogsearch.google.com.ua blogsearch.google.com.uy blogsearch.google.com.vc blogsearch.google.com.vn blogsearch.google.cv blogsearch.google.cz blogsearch.google.de blogsearch.google.dj blogsearch.google.dk blogsearch.google.dm blogsearch.google.dz blogsearch.google.ee blogsearch.google.es blogsearch.google.fi blogsearch.google.fm blogsearch.google.fr blogsearch.google.ga blogsearch.google.gd blogsearch.google.ge blogsearch.google.gf blogsearch.google.gg blogsearch.google.gl blogsearch.google.gm blogsearch.google.gp blogsearch.google.gr blogsearch.google.gy blogsearch.google.hn blogsearch.google.hr blogsearch.google.ht blogsearch.google.hu blogsearch.google.ie blogsearch.google.im blogsearch.google.io blogsearch.google.iq blogsearch.google.is blogsearch.google.it blogsearch.google.it.ao blogsearch.google.je blogsearch.google.jo blogsearch.google.kg blogsearch.google.ki blogsearch.google.kz blogsearch.google.la blogsearch.google.li blogsearch.google.lk blogsearch.google.lt blogsearch.google.lu blogsearch.google.lv blogsearch.google.md blogsearch.google.me blogsearch.google.mg blogsearch.google.mk blogsearch.google.ml blogsearch.google.mn blogsearch.google.ms blogsearch.google.mu blogsearch.google.mv blogsearch.google.mw blogsearch.google.ne blogsearch.google.nl blogsearch.google.no blogsearch.google.nr blogsearch.google.nu blogsearch.google.pl blogsearch.google.pn blogsearch.google.ps blogsearch.google.pt blogsearch.google.ro blogsearch.google.rs blogsearch.google.ru blogsearch.google.rw blogsearch.google.sc blogsearch.google.se blogsearch.google.sh blogsearch.google.si blogsearch.google.sk blogsearch.google.sm blogsearch.google.sn blogsearch.google.so blogsearch.google.st blogsearch.google.td blogsearch.google.tg blogsearch.google.tk blogsearch.google.tl blogsearch.google.tm blogsearch.google.to blogsearch.google.tt blogsearch.google.us blogsearch.google.vg blogsearch.google.vu blogsearch.google.ws".split(" "),
parameters:[ "q" ]
},
Amazon:{
domains:[ "amazon.com", "www.amazon.com" ],
parameters:[ "keywords" ]
},
"Hooseek.com":{
domains:[ "www.hooseek.com" ],
parameters:[ "recherche" ]
},
Dalesearch:{
domains:[ "www.dalesearch.com" ],
parameters:[ "q" ]
},
"Alice Adsl":{
domains:[ "rechercher.aliceadsl.fr" ],
parameters:[ "q" ]
},
"soso.com":{
domains:[ "www.soso.com" ],
parameters:[ "w" ]
},
Sogou:{
domains:[ "www.sougou.com" ],
parameters:[ "query" ]
},
"Hit-Parade":{
domains:[ "req.-hit-parade.com", "class.hit-parade.com", "www.hit-parade.com" ],
parameters:[ "p7" ]
},
SearchCanvas:{
domains:[ "www.searchcanvas.com" ],
parameters:[ "q" ]
},
Interia:{
domains:[ "www.google.interia.pl" ],
parameters:[ "q" ]
},
Tiscali:{
domains:[ "search.tiscali.it", "search-dyn.tiscali.it", "hledani.tiscali.cz" ],
parameters:[ "q", "key" ]
},
Clix:{
domains:[ "pesquisa.clix.pt" ],
parameters:[ "question" ]
}
},
email:{
"Outlook.com":{
domains:[ "mail.live.com" ]
},
"Orange Webmail":{
domains:[ "orange.fr/webmail" ]
},
"Yahoo! Mail":{
domains:[ "mail.yahoo.net", "mail.yahoo.com", "mail.yahoo.co.uk" ]
},
Gmail:{
domains:[ "mail.google.com" ]
}
},
social:{
hi5:{
domains:[ "hi5.com" ]
},
Friendster:{
domains:[ "friendster.com" ]
},
Weibo:{
domains:[ "weibo.com", "t.cn" ]
},
Xanga:{
domains:[ "xanga.com" ]
},
Myspace:{
domains:[ "myspace.com" ]
},
Buzznet:{
domains:[ "wayn.com" ]
},
MyLife:{
domains:[ "mylife.ru" ]
},
Flickr:{
domains:[ "flickr.com" ]
},
"Sonico.com":{
domains:[ "sonico.com" ]
},
Odnoklassniki:{
domains:[ "odnoklassniki.ru" ]
},
GitHub:{
domains:[ "github.com" ]
},
Classmates:{
domains:[ "classmates.com" ]
},
"Friends Reunited":{
domains:[ "friendsreunited.com" ]
},
Renren:{
domains:[ "renren.com" ]
},
"vKruguDruzei.ru":{
domains:[ "vkrugudruzei.ru" ]
},
"Gaia Online":{
domains:[ "gaiaonline.com" ]
},
Netlog:{
domains:[ "netlog.com" ]
},
Orkut:{
domains:[ "orkut.com" ]
},
MyHeritage:{
domains:[ "myheritage.com" ]
},
Multiply:{
domains:[ "multiply.com" ]
},
myYearbook:{
domains:[ "myyearbook.com" ]
},
WeeWorld:{
domains:[ "weeworld.com" ]
},
Geni:{
domains:[ "geni.com" ]
},
SourceForge:{
domains:[ "sourceforge.net" ]
},
Plaxo:{
domains:[ "plaxo.com" ]
},
"Taringa!":{
domains:[ "taringa.net" ]
},
Tagged:{
domains:[ "login.tagged.com" ]
},
XING:{
domains:[ "xing.com" ]
},
Vkontakte:{
domains:[ "vk.com", "vkontakte.ru" ]
},
Twitter:{
domains:[ "twitter.com", "t.co" ]
},
WAYN:{
domains:[ "wayn.com" ]
},
Tuenti:{
domains:[ "tuenti.com" ]
},
"Mail.ru":{
domains:[ "my.mail.ru" ]
},
Badoo:{
domains:[ "badoo.com" ]
},
Habbo:{
domains:[ "habbo.com" ]
},
Pinterest:{
domains:[ "pinterest.com" ]
},
LinkedIn:{
domains:[ "linkedin.com" ]
},
Foursquare:{
domains:[ "foursquare.com" ]
},
Flixster:{
domains:[ "flixster.com" ]
},
"Windows Live Spaces":{
domains:[ "login.live.com" ]
},
BlackPlanet:{
domains:[ "blackplanet.com" ]
},
Cyworld:{
domains:[ "global.cyworld.com" ]
},
Skyrock:{
domains:[ "skyrock.com" ]
},
Facebook:{
domains:[ "facebook.com", "fb.me" ]
},
StudiVZ:{
domains:[ "studivz.net" ]
},
Fotolog:{
domains:[ "fotolog.com" ]
},
"Google+":{
domains:[ "url.google.com", "plus.google.com" ]
},
"Nasza-klasa.pl":{
domains:[ "nk.pl" ]
},
Douban:{
domains:[ "douban.com" ]
},
Bebo:{
domains:[ "bebo.com" ]
},
Reddit:{
domains:[ "reddit.com" ]
},
"Identi.ca":{
domains:[ "identi.ca" ]
},
StackOverflow:{
domains:[ "stackoverflow.com" ]
},
Mixi:{
domains:[ "mixi.jp" ]
},
StumbleUpon:{
domains:[ "stumbleupon.com" ]
},
Viadeo:{
domains:[ "viadeo.com" ]
},
"Last.fm":{
domains:[ "lastfm.ru" ]
},
LiveJournal:{
domains:[ "livejournal.ru" ]
},
Tumblr:{
domains:[ "tumblr.com" ]
},
"Hacker News":{
domains:[ "news.ycombinator.com" ]
},
Qzone:{
domains:[ "qzone.qq.com" ]
},
Hyves:{
domains:[ "hyves.nl" ]
},
"Paper.li":{
domains:[ "paper.li" ]
},
"MoiKrug.ru":{
domains:[ "moikrug.ru" ]
}
}
};
}.call(this), function() {
$B.QueryStringParser = function() {
function e(e) {
var t, o;
if (this.query_params = {}, !document || !document.createElement) throw "This needs to be run in an HTML context with a document.";
t = document.createElement("a"), t.href = e, this.url = e, this.origin = t.origin ? t.origin :[ t.protocol, "//", t.host ].join(""), 
this.protocol = t.protocol, this.pathname = t.pathname, this.hostname = t.hostname, 
this.hash = t.hash, o = this, _.each(t.search.substr(1).split("&"), function(e) {
var t;
return t = e.split("="), o.query_params[t[0]] = t[1];
});
}
return e.prototype.toString = function() {
var e, t;
return t = _.compact(_.map(this.query_params, function(e, t) {
return "undefined" != typeof e && null !== e ? [ t, e ].join("=") :void 0;
})).join("&"), e = [ this.origin, this.pathname ].join(""), t && (e += "?" + t), 
this.hash && (e += this.hash), e;
}, e;
}(), $B.ReferrerParser = function() {
function e(e, t) {
var o;
this.url = t, this.referrers_map = this.loadReferrers(e), this.known = !1, this.referrer = null, 
this.medium = "unknown", this.search_parameter = null, this.search_term = null, 
o = new $B.QueryStringParser(this.url), this.host = o.hostname, this.path = o.pathname, 
this.referrer = this.lookup_referrer(this.host, this.path);
}
return e.prototype.lookup_referrer = function(e) {
var t;
return t = this.referrers_map[e];
}, e.prototype.loadReferrers = function(e) {
var t, o, n, i, r, a;
a = {};
for (n in e) {
t = e[n];
for (r in t) o = t[r], i = null, o.parameters && (i = o.parameters.map(function(e) {
return e.toLowerCase();
})), o.domains.forEach(function(e) {
return a[e] = {
name:r,
medium:n
}, i ? a[e].params = i :void 0;
});
}
return a;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
$B.UserAnalyticsEngine = function() {
function t(t, o, n) {
this.user_id = t, this.user_email = o, this.urlBase = n, this.save = e(this.save, this), 
this.track = e(this.track, this), this.trackWithoutExternalService = e(this.trackWithoutExternalService, this), 
null == this.urlBase && (this.urlBase = $S.global_conf.BOBCAT_ANALYTICS_POST_URL);
}
return t.prototype.trackWithoutExternalService = function(e) {
return this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.track = function(e, t) {
return "function" == typeof $B.log && $B.log("[TRACKING] " + e, t), window.analytics.track(e, t), 
this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.save = function(e, t) {
var o = this;
return $.ajax({
type:"POST",
url:"" + this.urlBase + "/events",
data:{
user_id:e,
event:t
},
success:function(e) {
return "Editor - edit" === t ? _veroq.push([ "user", {
id:o.user_id,
edit_count:e.count
} ]) :void 0;
},
dataType:"json"
});
}, t;
}(), $B.PageAnalyticsEngine = function() {
function t(t) {
this.pageData = t, this.normalizedReferrer = e(this.normalizedReferrer, this), this.sendDataKeenIO = e(this.sendDataKeenIO, this), 
this.logSocialClicks = e(this.logSocialClicks, this), this.logPageView = e(this.logPageView, this), 
this.baseData = {
pageId:this.pageData.page_id,
permalink:this.pageData.permalink,
referrer:document.referrer,
membership:this.pageData.membership,
createdAt:this.pageData.created_at,
strikinglyBranding:this.pageData.showStrikinglyLogo
};
}
return t.prototype.pingInterval = 1e4, t.prototype.setInternalTracking = function() {
var e, t;
return (t = $S.page_meta.strk_upvt) ? (e = {
thm:this.pageData.theme.name,
mem:this.pageData.membership,
brd:this.pageData.showStrikinglyLogo,
v:t
}, $("<iframe />", {
name:"strk-tracking",
id:"strk-tracking",
src:"//b.strikingly.com/ping.html?" + $.param(e)
}).appendTo("body")) :void 0;
}, t.prototype.trackPageEvent = function() {
var e;
return e = function(e, t) {
return function(o) {
var n, i, r;
return r = $(this), n = {
url:r.attr("href"),
target:r.attr("target"),
text:r.text()
}, window.edit_page.Event.publish(e, n), _gaq.push([ "_setCustomVar", 1, "url", n.url, 3 ]), 
_gaq.push([ "_setCustomVar", 2, "text", n.text, 3 ]), _gaq.push([ "_trackEvent", "Actions", t.gaEventName ]), 
i = "#" !== n.url[0], n.url && "_blank" !== n.target && i ? (o.preventDefault(), 
setTimeout(function() {
return window.location.href = n.url;
}, 500)) :void 0;
};
}, $("[data-component='button']").click(e("Site.button.click", {
gaEventName:"ButtonClick"
}));
}, t.prototype.logPageView = function() {
var e, t, o, n, i;
e = _.extend({
eventName:"PageView"
}, this.baseData), t = 1, i = this.baseData;
for (o in i) n = i[o], _gaq.push([ "_setCustomVar", t, o, n, 3 ]), ++t;
return _gaq.push([ "_trackEvent", "Page", e.eventName ]), this.sendDataKeenIO(this.baseData);
}, t.prototype.logSocialClicks = function(e) {
var t;
return t = _.extend({
eventName:"SocialClicks",
channel:e
}, this.baseData);
}, t.prototype.sendDataKeenIO = function(e) {
var t, o;
return o = e.referrer.split("/")[2], t = _.extend({
keen:{
addons:[ {
name:"keen:ip_to_geo",
input:{
ip:"ip_address"
},
output:"ip_geo_info"
}, {
name:"keen:ua_parser",
input:{
ua_string:"user_agent"
},
output:"parsed_user_agent"
} ]
},
ip_address:"${keen.ip}",
user_agent:"${keen.user_agent}",
host:document.location.host,
referrer_host:o,
normalized_referrer:this.normalizedReferrer(e.referrer)
}, e), Keen.addEvent($S.conf.keenio_collection, t);
}, t.prototype.normalizedReferrer = function(e) {
var t, o;
return t = new $B.ReferrerParser($B.referrers_source, e), (null != (o = t.referrer) ? o.name :void 0) || t.url || "Direct Traffic";
}, t;
}();
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, o) {
function n() {
this.constructor = t;
}
for (var i in o) e.call(o, i) && (t[i] = o[i]);
return n.prototype = o.prototype, t.prototype = new n(), t.__super__ = o.prototype, 
t;
}, o = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
window.partial = function(e, t) {
return _.template($("#" + e + "-partial").html(), t);
}, Bobcat.IndexGenerator = function() {
function e() {
this.currentIndex = 0;
}
return e.prototype.increment = function() {
return this.currentIndex += 1;
}, e.prototype.getNext = function() {
var e;
return e = this.currentIndex, this.increment(), "model" + e;
}, e;
}(), Bobcat.PageTransformer = function() {
function e(e, t) {
this.domTree = e, this.isEdit = t, this.textTransformer = new Bobcat.TextTransformer(), 
this.imageTransformer = new Bobcat.ImageTransformer(), this.htmlTransformer = new Bobcat.HtmlTransformer();
}
return e.prototype.transform = function() {
var e, t, o, n, i, r, a, s, l, c, u, d, p, h, g, f;
for (h = this.domTree.find("[data-component='repeatable_item_template']"), r = 0, 
c = h.length; c > r; r++) o = h[r], t = $(o), $("<div id='" + t.attr("id") + "_temp' style='display:none;'>" + t.html() + "</div>").appendTo(this.domTree);
for (this.indexGenerator = new Bobcat.IndexGenerator(), i = [ this.textTransformer, this.imageTransformer, this.htmlTransformer ], 
a = 0, u = i.length; u > a; a++) n = i[a], n.indexGenerator = this.indexGenerator;
for (s = 0, d = i.length; d > s; s++) n = i[s], n.transform(this.domTree, this.isEdit);
for (g = this.domTree.find("[data-component='repeatable_item_template']"), f = [], 
l = 0, p = g.length; p > l; l++) o = g[l], t = $(o), e = $("#" + t.attr("id") + "_temp"), 
$.browser.msie && parseInt($.browser.version) > 7 && e.find("*").filter(function() {
return "" !== $(this).attr("class");
}).addClass("ie-fix"), o.text = e.html(), f.push(e.remove());
return f;
}, e;
}(), Bobcat.Transformer = function() {
function e() {}
return e.prototype.validateName = function(e) {
return null == e.attr("data-name") && (this.warning("The following DOM doesn't have data-name."), 
this.warning(e)), !0;
}, e.prototype.getDataName = function(e) {
var t;
return t = e.attr("data-name"), t || (t = this.indexGenerator.getNext()), t;
}, e.prototype.clearDom = function(e) {
return e.html("");
}, e.prototype.isEditable = function(e) {
var t;
return t = e.attr("data-show"), "true" !== t;
}, e.prototype.warning = function(e) {
return console.warn(e);
}, e.prototype.error = function(e) {
return console.error(e);
}, e;
}(), Bobcat.TextTransformer = function(e) {
function n() {}
return t(n, e), n.prototype.transform = function(e, t) {
var o = this;
return this.domTree = e, this.isEdit = null != t ? t :!1, this.domTree.find("[data-component='text']").each(function(e, t) {
var n;
return n = $(t), o.validate(n) ? o.isEdit && o.isEditable(n) ? o.transformToEditable(n) :o.transformToShow(n) :void 0;
});
}, n.prototype.getTextType = function(e) {
var t;
if (t = e.attr("data-text-type")) {
if ("heading" === t) return "headingFont";
if ("title" === t) return "titleFont";
if ("navigation" === t) return "navFont";
}
return "bodyFont";
}, n.prototype.getUseFont = function(e) {
var t;
return t = e.attr("data-use-font"), "false" === t ? !1 :!0;
}, n.prototype.buildData = function(e) {
var t, o, n, i;
return t = e.html(), o = this.getDataName(e), n = this.getTextType(e), i = this.getUseFont(e), 
{
content:t,
name:o,
textType:n,
useFont:i
};
}, n.prototype.transformToShow = function(e) {
var t, o;
return t = this.buildData(e), e.addClass("text-component").html(""), o = $.trim(_.template($("#textContent-partial").html())(t)), 
$(o).appendTo(e);
}, n.prototype.transformToEditable = function(e) {
var t, o;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable text-component"), 
e.attr("data-text-type", "" + t.textType), e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-text': " + t.name + ".showEmptyText()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
o = $.trim(_.template($("#textEditor").html())(t)), $(o).appendTo(e);
}, n.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateTextType(e);
}, n.prototype.validateTextType = function(e) {
var t, n, i, r;
return i = !0, n = e.attr("data-text-type"), t = [ "body", "heading", "title", "navigation" ], 
n && (r = !n, o.call(t, r) >= 0 && (i = !1, this.warning("data-text-type should be one of " + t.join(", ")), 
this.warning(e))), i;
}, n;
}(Bobcat.Transformer), Bobcat.ImageTransformer = function(e) {
function o() {
return o.__super__.constructor.apply(this, arguments);
}
return t(o, e), o.prototype.transform = function(e, t) {
var o = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='image']").each(function(e, t) {
var n;
return n = $(t), o.validate(n) ? o.isEdit && o.isEditable(n) ? o.transformToEditable(n) :o.transformToShow(n) :void 0;
});
}, o.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateUrl(e) && this.validateImageSize(e) && this.validateThumbSize(e);
}, o.prototype.getImageDom = function(e) {
return e.imageDom ? e.imageDom :e.imageDom = e.find("img").first();
}, o.prototype.validateUrl = function(e) {
return "undefined" == typeof this.getImageDom(e).attr("src") ? (this.error("img doesn't have a src"), 
this.error(this.getImageDom(e)), !1) :!0;
}, o.prototype.transformToEditable = function(e) {
var t, o;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable image-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-image':!" + t.name + ".hasContent()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
o = $.trim(_.template($("#imageEditor").html())(t)), $(o).appendTo(e);
}, o.prototype.transformToShow = function(e) {
var t, o;
return t = this.buildData(e), e.html(""), o = $.trim(_.template($("#imageContent-partial").html())(t)), 
$(o).appendTo(e);
}, o.prototype.validateSize = function(e) {
return "small" === e || "medium" === e || "large" === e || "background" === e ? !0 :/^\d+x\d+[><^#]+$/.test(e) ? !0 :"undefined" == typeof e ? !0 :!1;
}, o.prototype.validateThumbSize = function(e) {
var t, o;
return t = e.attr("data-thumb-size"), o = this.validateSize(t), o || (this.warning("size format is wrong"), 
this.warning(e)), o;
}, o.prototype.validateImageSize = function(e) {
var t, o;
return t = e.attr("data-image-size"), o = this.validateSize(t), o || (this.warning("size format is wrong"), 
this.warning(e)), o;
}, o.prototype.getImageSize = function(e) {
var t;
return t = e.attr("data-image-size"), t || (t = "medium");
}, o.prototype.getThumbSize = function(e) {
var t;
return t = e.attr("data-thumb-size"), t || (t = "128x128#");
}, o.prototype.getHasUrl = function(e) {
var t;
return t = e.attr("data-use-url"), "true" === t;
}, o.prototype.getAssetUrls = function(e) {
var t;
return t = e.attr("data-assets"), t ? t.split(" ") :[];
}, o.prototype.buildData = function(e) {
var t, o, n, i, r, a, s, l;
return s = this.getImageDom(e).attr("src"), o = this.getImageDom(e).attr("alt"), 
i = this.getDataName(e), t = this.getAssetUrls(e), r = this.getImageSize(e), a = this.getThumbSize(e), 
l = this.getHasUrl(e), o || (o = ""), n = {
url:s,
caption:o,
name:i,
imageSize:r,
useUrl:l,
thumbSize:a,
assetUrls:t
};
}, o;
}(Bobcat.Transformer), Bobcat.HtmlTransformer = function(e) {
function o() {}
return t(o, e), o.prototype.transform = function(e, t) {
var o = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='html']").each(function(e, t) {
var n;
return n = $(t), o.validate(n) ? o.isEdit && o.isEditable(n) ? o.transformToEditable(n) :o.transformToShow(n) :void 0;
});
}, o.prototype.validate = function(e) {
var t;
return t = this.validateName(e);
}, o.prototype.transformToEditable = function(e) {
var t, o;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable html-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
o = $.trim(_.template($("#htmlEditor").html())(t)), $(o).appendTo(e);
}, o.prototype.buildData = function(e) {
return {
name:this.getDataName(e)
};
}, o.prototype.transformToShow = function() {}, o;
}(Bobcat.Transformer);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
Bobcat.ShowPage = function() {
function t(t) {
this.checkIframe = e(this.checkIframe, this), this.initAfterBindings = e(this.initAfterBindings, this), 
this.initBindings = e(this.initBindings, this), this.data = new Bobcat.PageData(t), 
this.Event = new Bobcat.Event(), this.unsavedChanges = ko.observable(!1), this.isShowPage = !0;
}
return t.prototype.initBindings = function() {
return this.data.removePremiumSlides(), this.data.bindSlides();
}, t.prototype.initAfterBindings = function() {
var e, t, o, n;
for (Bobcat.TH.initPageHelpers(), n = window.runAfterDomBinding.getAllJobs(), t = 0, 
o = n.length; o > t; t++) (e = n[t])();
return this.checkIframe();
}, t.prototype.registerUserAnalytics = function() {
return $B.siteMeta("google_analytics_tracker") && (_gaq.push([ "b._trackPageview" ]), 
_gaq.push([ "b._setAccount" ], $B.siteMeta("google_analytics_tracker"))), $B.siteMeta("custom_domain") ? _gaq.push([ "b._setDomainName", $B.siteMeta("custom_domain") ]) :void 0;
}, t.prototype.checkIframe = function() {
var e, t, o, n;
return window.top.location !== window.location && document.referrer && (n = document.referrer.match(/^https?:\/\/([^.]+\.)?([^:\/\s]+)\/?.*/), 
n && (t = $B.meta("strikingly-host-name"), t && (o = $.map(t.split(","), function(e) {
return e.trim();
}), e = n[2], -1 === $.inArray(e.toLowerCase(), o)))) ? (alert("Framing is not allowed with free account. Redirecting to Strikingly.com. Please contact support@strikingly.com if you have any questions."), 
window.top.location = window.location) :void 0;
}, t;
}();
}.call(this), function() {
window.$B = window.Bobcat || {}, $B.TH = {
fixNavOnScroll:function(e, t, o) {
var n, i;
return null == o && (o = 0), $B.TH.isSmallScreen() ? void 0 :(n = function() {
return $("ul.slides li.slide").css({
"padding-top":0
}), $B.TH.isSmallScreen() ? e.css("position", "static") :(e.css("position", "fixed"), 
$("ul.slides li.slide").first().css({
"padding-top":e.outerHeight(!1)
}));
}, i = function() {
var n, i, r, a;
return i = e.outerHeight() - t.height() - o, 0 !== e.length ? (n = $(window).height(), 
r = e.height(), a = $(window).scrollTop(), a > i && (a = i), $(".demo-bar-spacer").length && (a -= $(".demo-bar-spacer").outerHeight()), 
e.stop().animate({
top:-a
})) :void 0;
}, $(window).scroll(i), $(window).resize(n), setTimeout(n, 2e3), n());
},
isMobile:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(windows phone)|(iemobile)/i);
},
isAndroid:function() {
return navigator.userAgent.match(/(android)/i);
},
isWindowsPhone:function() {
return navigator.userAgent.match(/(windows phone)|(iemobile)/i);
},
isIpad:function() {
return navigator.userAgent.match(/(iPad)/i);
},
isIOS:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);
},
isSmallScreen:function() {
return $(window).width() <= 727 || $(window).height() < 400;
},
iOSversion:function() {
var e, t;
return /iP(hone|od|ad)/.test(navigator.platform) ? (e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), 
t = [ parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10) ], t[0]) :void 0;
},
androidVersion:function() {
var e;
return $B.TH.isAndroid() ? (e = navigator.userAgent, parseFloat(e.slice(e.indexOf("Android") + 8))) :void 0;
},
isAndroid2x:function() {
return $B.TH.isAndroid() && $B.TH.androidVersion() < 3;
},
shiftBody:function(e) {
var t, o;
return o = $("#s-content"), t = $("body"), e ? o.addClass("translate-" + e) :o.removeClass("translate-right translate-left"), 
t.css({
overflow:"visible",
"overflow-x":"visible"
}), o.css({
width:"auto"
});
},
shiftDrawer:function(e, t, o, n) {
return null == e && (e = 0), null == t && (t = !1), null == o && (o = 450), null == n && (n = "easeInOutQuart"), 
$(".navbar-drawer").toggleClass("translate");
},
shiftMobileDrawer:function(e, t, o, n) {
var i;
return null == e && (e = 0), null == t && (t = !1), null == o && (o = 450), null == n && (n = "easeInOutQuart"), 
i = $(".mobile-drawer"), t ? i.css({
right:e
}) :i.animate({
right:e
}, o, n);
},
toggleDrawer:function(e) {
var t, o, n, i, r, a, s, l;
return null == e && (e = !0), i = $(".navbar-drawer"), r = $(".navbar-drawer-bar"), 
n = $("#s-content"), $B.TH.canAnimateCSS() ? (s = "translate", t = "translate-left", 
o = "translate-right") :(s = "shown", t = "left", o = "right"), i.hasClass(s) ? (r.removeClass(t + " " + o), 
i.removeClass(s)) :(r.removeClass(t).addClass(o), i.addClass(s)), a = $(".mobile-actions"), 
a.removeClass(s), $B.TH.androidVersion() < 3 && (l = $(window).scrollTop(), $("#nav-drawer-list").attr("data-top", l)), 
i.css("top", 1), setTimeout(function() {
return i.css("top", 0);
}, 100);
},
toggleMobileDrawer:function(e) {
var t, o;
return null == e && (e = !0), t = $(".mobile-actions"), 0 !== t.length ? (o = $B.TH.canAnimateCSS() ? "translate" :"shown", 
t.hasClass(o) ? t.removeClass(o) :t.addClass(o)) :void 0;
},
detectCSSFeature:function(e) {
var t, o, n, i, r, a, s;
if (n = !1, t = "Webkit Moz ms O".split(" "), o = document.createElement("div"), 
e = e.toLowerCase(), i = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== o.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (r = t[a], void 0 !== o.style[r + i]) return !0;
return !1;
},
canAnimateCSS:function() {
return $B.TH.detectCSSFeature("transform") && !$B.TH.isAndroid2x() && !$B.TH.isWindowsPhone();
},
isIE:function() {
var e;
return e = navigator.userAgent.toLowerCase(), -1 !== e.indexOf("msie") ? parseInt(e.split("msie")[1]) :!1;
},
enableAnimationForBlocks:function(e, t) {
return null == e && (e = "75%"), null == t && (t = !1), t || window.edit_page.isShowPage && !$B.TH.isMobile() && !($B.TH.isIE() && $B.TH.isIE() <= 9) ? ($(".fadeInUp").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInUp");
}, 5e3);
}, {
offset:e
}), $(".fadeInRight").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInRight");
}, 5e3);
}, {
offset:e
}), $(".fadeInLeft").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInLeft");
}, 5e3);
}, {
offset:e
})) :$(".fadeInUp, .fadeInRight, .fadeInLeft").css("opacity", 1);
},
applyTouchNav:function() {
var e, t, o;
return $B.getCustomization("disableMobileNav") ? $(".strikingly-nav-spacer").hide() :(e = $(".navbar-touch").first(), 
$(".navbar-drawer").length && (o = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").removeClass("hidden"), 
$(".mobile-actions").css({
height:$(".mobile-actions").height()
}), $("body").bind("touchstart", function() {}).attr("ontouchstart", "").attr("screen_capture_injected", "true"), 
$B.TH.isAndroid2x() ? $(window).height() < o.height() && (o.css({
overflow:"visible",
height:"auto"
}), $(window).scroll(function() {
var e, t, n, i;
return e = parseInt(o.attr("data-top"), 10), e || 0 === e ? (i = $(window).scrollTop(), 
n = e - i, n > 0 && (n = 0), t = $(window).height() - o.height(), t > n && (n = t), 
o.css({
top:n
})) :void 0;
})) :o.height($(window).height()), $B.TH.canAnimateCSS() && $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").addClass("strikingly-nav-transition"), 
t = $(".navbar-drawer-bar .navbar-drawer-title"), t.width() < 170 && t.height() < 20 && t.addClass("big"))), 
$(window).resize(function() {
return o = $("#nav-drawer-list"), $B.TH.isAndroid2x() || o.height($(window).height()), 
$(".navbar-drawer").hasClass("shown") || $(".navbar-drawer").hasClass("translate") ? $B.TH.toggleDrawer() :void 0;
});
},
enableSlider:function(e) {
var t, o, n, i, r, a, s, l, c, u;
return i = $.extend({
fullscreen:!1,
padding:100
}, e), o = function(e, t) {
return e.find(".selector.selected").removeClass("selected"), e.find(".selector:eq(" + (t.currentSlideNumber - 1) + ")").addClass("selected");
}, t = function(e) {
var t;
return t = "strikingly-dark-text", -1 !== e.css("background-image").indexOf("/icons/transparent.png") ? e.closest(".wide").addClass(t) :e.hasClass(t) ? e.closest(".wide").addClass(t) :e.closest(".wide").removeClass(t);
}, c = function(e) {
var n, i;
return i = e.sliderObject, o(i.closest(".iosslider").find(".slide-selectors"), e), 
e.slideChanged ? (t(e.currentSlideObject), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() ? e.currentSlideObject.find(".animated").css({
opacity:1
}) :(n = i.find(".fadeIn, .fadeInLeft, .fadeInRight").css({
opacity:1
}), setTimeout(function() {
return n.animate({
opacity:0
}, {
duration:300
});
}, 10), n.removeClass("fadeIn fadeInLeft fadeInRight"), e.prevSlideNumber < e.currentSlideNumber && 1 === Math.abs(e.currentSlideNumber - e.prevSlideNumber) || e.prevSlideNumber > e.currentSlideNumber && Math.abs(e.currentSlideNumber - e.prevSlideNumber) > 1 ? (e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInRight"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInRight");
}, 100)) :(e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInLeft"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInLeft");
}, 100)))) :!1;
}, u = function(e) {
var n;
return n = e.sliderObject, o(n.closest(".iosslider").find(".slide-selectors"), e), 
n.find(".animated").removeClass("fadeIn fadeInLeft fadeInRight"), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() || (n.find(".animated").css({
opacity:0
}), $(e.currentSlideObject).find(".animated").addClass("fadeIn")), c(e), t(e.currentSlideObject);
}, n = function(e) {
var t, o, n;
return o = e.data("auto-play"), t = !1, n = !0, window.edit_page.isShowPage && (t = !0, 
n = !1), e.iosSlider({
responsiveSlideContainer:!0,
responsiveSlides:!0,
snapToChildren:!0,
desktopClickDrag:!1,
infiniteSlider:!0,
autoSlide:t,
autoSlideTimer:o,
onSliderLoaded:u,
onSlideChange:c,
navSlideSelector:e.find(".slide-selectors .selector-wrapper"),
navPrevSelector:e.find(".prev-button"),
navNextSelector:e.find(".next-button"),
disableActionOnSelectorClicked:n
}), e.find(".slider").css({
"min-height":300
}), s(e), e.find("img").one("load", function() {
return a();
}).each(function() {
return this.complete ? $(this).load() :void 0;
});
}, s = function(e) {
var t;
return t = e ? e.closest(".slider-container") :$(".slider-container"), t.each(function() {
var e, t, o, n;
return e = $(this), t = function(t) {
return e.find(".item").each(function() {
var e;
return e = $(this).find(".inner").first(), t(e);
});
}, o = 0, t(function(e) {
var t;
return t = e.outerHeight(), o = Math.max(o, t);
}), i.fullscreen || e.find(".iosslider").hasClass("full-screen") ? (n = $(window).height(), 
o = Math.max(n, o), o > n && (o += 2 * i.padding, o -= 2)) :(o += 2 * i.padding, 
o -= 2), t(function(e) {
var t, n;
return t = e.outerHeight(), n = Math.max(0, .5 * (o - t)), e.css({
"margin-top":n,
"margin-bottom":n
});
}), $(this).find(".iosslider").css({
"min-height":"" + o + "px"
}), setTimeout(function() {
return window.edit_page.isShowPage ? e.find(".iosslider").iosSlider("autoSlidePause").iosSlider("update").iosSlider("autoSlidePlay") :e.find(".iosslider").iosSlider("update");
}, 300);
});
}, a = $B.debounce(s, 100), $(window).resize(function() {
return a();
}), $(window).bind("repaint-slider", function() {
return a();
}), r = function(e, t) {
return t ? s(t) :a();
}, l = function(e, t) {
var o, n;
return null != (o = window.edit_page) ? null != (n = o.Event) ? n.subscribe(e, t || r) :void 0 :void 0;
}, l("Editor.SideMenu.Opened"), l("Editor.SideMenu.Closed"), l("Slider.ContentChanged"), 
l("Slide.afterAdd", function(e, t) {
var o;
return o = t.target.find(".iosslider"), o.length > 0 ? (n(o), s(o)) :void 0;
}), $(".iosslider").each(function() {
return n($(this));
});
},
matchHeights:function(e) {
var t, o, n, i;
if (e && ("string" == typeof e && (e = $(e)), 0 !== e.length)) {
n = {}, o = 0, e.each(function() {
var e;
return e = $(this), o = e.offset().top + "", n[o] = n[o] ? n[o].add(e) :e;
}), i = [];
for (o in n) t = n[o], t.length > 1 ? i.push($B.TH.matchHeightsAll(t)) :i.push(void 0);
return i;
}
},
matchHeightsAll:function(e) {
var t, o;
if (!(e.length <= 1 || (t = 0, o = e.first().offset().top, e.each(function() {
var e;
return e = $(this), e.css("height", "auto"), e.height() > t ? t = e.height() :void 0;
}), 5 > t))) return t = parseInt(t), e.each(function() {
var e, o;
return o = $(this), o.css("height", t), e = o.find("img"), "" === $.trim(o.text()) && e.length ? (e.css("vertical-align", "middle"), 
o.css("line-height", t + "px")) :void 0;
});
},
applyMatchHeights:function(e, t) {
var o, n;
return null == e && (e = ".s-mhi"), null == t && (t = ".s-mh"), o = function(o) {
return null == o && (o = !0), $(t).each(function() {
var t, n, i, r;
return t = $(this), i = t.find(e), n = $(this).find("img"), r = $(this).find("img.lazy"), 
r.length ? r.on("afterAppear", function() {
return $B.TH.matchHeights(i);
}) :n.length && o ? $(this).waitForImages(function() {
return $B.TH.matchHeights(i);
}) :$B.TH.matchHeights(i);
});
}, $(window).resize(function() {
return o(!1);
}), o(!0), window.edit_page.isShowPage ? void 0 :(n = function(o, n) {
var i, r, a;
if (n && (r = n.target, a = r.closest(t), a.length)) return i = a.find(e), $B.TH.matchHeights(i);
}, window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", n), window.edit_page.Event.subscribe("ImageComponent.afterChange", n), 
window.edit_page.Event.subscribe("Repeatable.add", n), window.edit_page.Event.subscribe("Repeatable.remove", n), 
window.edit_page.Event.subscribe("Repeatable.afterReorder", n));
},
fitText:function(e) {
return 0 !== e.length ? e.each(function() {
var e, t, o, n, i;
return i = $(this), n = i.width(), o = parseInt(i.css("font-size")), e = i.css({
position:"absolute"
}).width(), i.css({
position:"relative"
}), n >= e ? void 0 :(t = o * n / e, i.css({
"font-size":t
}));
}) :void 0;
},
isTouchDevice:function() {
try {
return document.createEvent("TouchEvent"), !0;
} catch (e) {
return !1;
}
},
touchScroll:function(e) {
var t;
return $B.TH.isTouchDevice() ? (t = 0, e.addEventListener("touchstart", function(e) {
return t = this.scrollTop + e.touches[0].pageY;
}, !1), e.addEventListener("touchmove", function(e) {
return this.scrollTop = t - e.touches[0].pageY;
}, !1)) :void 0;
},
resizeIFrame:function(e) {
var t, o, n, i, r;
if (1 !== e.data("height-binding-complete")) return e.data("height-binding-complete", 1), 
(null != (o = $.browser) ? o.safari :void 0) || (null != (n = $.browser) ? n.opera :void 0) ? (e.load(function() {
var t;
return t = function() {
return e.height(e.contents().find("body").height() + "px");
}, setTimeout(t, 1);
}), t = e[0].src, e[0].src = "", e[0].src = t) :e.load(function() {
return setTimeout(function() {
return e.height(e.contents().find("body").height() + "px");
}, 100);
}), "complete" === (null != (i = e.contents()) ? null != (r = i[0]) ? r.readyState :void 0 :void 0) && e.height() < e.contents().contents().eq(1).height() ? e.height(e.contents().contents().eq(1).height() + "px") :void 0;
},
adjustIFrameHeight:function() {
return $("iframe.s-show-frame").each(function() {
return $B.TH.resizeIFrame($(this));
});
},
enableParallax:function(e, t) {
return null == t && (t = !1), $B.TH.isMobile() || $B.TH.isSmallScreen() ? void 0 :($(window).scroll(function() {
var o, n, i;
return n = $(document).scrollTop(), i = $(window).height(), o = $(document).height(), 
e.each(function() {
var e, r, a, s, l, c, u;
if ($(this).css("background-image").length) return l = $(this), t ? (r = 0, e = o - i) :(u = l.offset().top, 
c = l.outerHeight(), r = u - i, e = u + c), s = e - r, a = 100 - .01 * ~~(1e4 * (n - r) / s), 
t && (a = 100 - a), a >= 0 && 100 >= a ? l.css({
backgroundPosition:"49.5% " + a + "%"
}) :void 0;
});
}), $(window).scroll());
},
getBackgroundImageSize:function(e, t) {
var o, n, i;
return n = null != (i = e.css("background-image")) ? i.split(/[()]/gi)[1] :void 0, 
n = n.replace(/"/g, ""), n ? (o = new Image(), o.onload = function() {
return t ? t({
width:this.width,
height:this.height
}) :void 0;
}, o.src = n) :null;
},
containBackgroundImages:function(e) {
return e.each(function() {
var e;
return e = $(this), "contain" === e.css("background-size") && "" === $.trim(e.text()) ? $B.TH.getBackgroundImageSize(e, function(t) {
var o, n, i;
return i = t.width, o = t.height, n = e.width() / i * o, e.css({
height:n,
"min-height":n
}), e.addClass("no-resize").removeClass("resize"), e.css("padding", 0);
}) :void 0;
});
},
setupStrikinglyLogo:function() {
var e, t, o, n, i, r, a;
return o = $(window), e = $(document), t = $($B.DOM.STRIKINGLY_LOGO), t && t.is(":visible") ? $B.TH.isMobile() ? (t.css({
bottom:-100,
position:"fixed"
}).show(), i = !1, o.scroll(function() {
return i = !0;
}), setInterval(function() {
var n;
if (i) {
if (n = e.height() - o.height() - 20, i = !1, o.scrollTop() >= n) return t.animate({
bottom:-20
}, 1e3, "easeInOutBack");
if (o.scrollTop() < n) return t.animate({
bottom:-100
}, 1e3, "easeInOutBack");
}
}, 250)) :(n = -70, t.css({
bottom:n,
position:"fixed"
}).hide(), a = 500, r = 100, o.scroll(function() {
var i, s, l, c, u;
return l = "free" === (null != (c = $S.page_meta) ? null != (u = c.user) ? u.membership :void 0 :void 0) ? o.height() + 100 :e.height() - a - 200, 
i = e.scrollTop() + o.height() + r, i > l + n ? (s = n + (i - l) / a * 60, s > -10 && (s = -10), 
n > s && (s = n), t.css({
bottom:s
}).show()) :t.css({
bottom:n
});
})) :void 0;
},
disableLazyload:function(e) {
return e.each(function(e, t) {
var o;
return o = $(t), null != o.data("background") && (null != o.data("background") && o.css("background-image", "url(" + o.data("background") + ")"), 
o.removeClass("lazy")), o.is("img") && null != o.data("original") ? (o.attr("src", o.data("original")), 
o.removeClass("lazy"), o.on("load", function() {
return o.trigger("afterAppear");
})) :void 0;
});
},
applyLazyload:function(e) {
return null == e && (e = $(".lazy")), e.lazyload({
effect:"fadeIn",
effect_speed:500,
skip_invisible:!1,
threshold:$(window).height()
}), $("img.lazy-img").each(function() {
return "static" === $(this).css("position") ? $(this).css("position", "relative") :void 0;
});
},
lazyloadSection:function(e) {
return null != e ? ($B.TH.disableLazyload(e.find(".lazy-background")), $B.TH.disableLazyload(e.find(".lazy-img")), 
$B.TH.applyLazyload(e.find(".lazy"))) :void 0;
},
lazyload:function() {
var e;
return $B.TH.isMobile() ? $B.TH.disableLazyload($(".lazy")) :(e = $($B.DOM.SLIDES), 
$B.TH.disableLazyload($($B.DOM.NAVIGATOR).find(".lazy").addBack()), e.each(function(e, t) {
return $B.TH.lazyloadSection($(t));
}));
},
initPageHelpers:function() {
return $B.TH.adjustIFrameHeight(), $B.TH.applyMatchHeights(), window.edit_page.isShowPage ? ($B.TH.lazyload(), 
$B.TH.setupStrikinglyLogo()) :void 0;
}
};
}.call(this), function() {
Bobcat.Event = function() {
function e() {
this.topics = {}, this.subUid = -1;
}
return e.prototype.subscribe = function(e, t) {
var o;
return this.topics[e] || (this.topics[e] = []), o = ++this.subUid, this.topics[e].push({
token:o,
func:t
}), o;
}, e.prototype.publish = function(e, t) {
var o, n, i, r, a;
if (!this.topics[e]) return !1;
for (n = this.topics[e].slice(), a = [], i = 0, r = n.length; r > i; i++) {
o = n[i];
try {
a.push("function" == typeof o.func ? o.func(e, t) :void 0);
} catch (s) {
a.push(console.warn("Cannot trigger subscription! " + s));
}
}
return a;
}, e.prototype.unsubscribe = function(e) {
var t, o, n, i, r;
r = this.topics;
for (i in r) {
n = r[i];
for (t in n) if (o = n[t], o.token === e) return n.splice(t, 1), e;
}
return !1;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
window.Bobcat = window.Bobcat || {}, Bobcat.Navigator = function() {
function t() {
this.selectAndGotoSlideWithIndex = e(this.selectAndGotoSlideWithIndex, this), this.getHighlightedIndex = e(this.getHighlightedIndex, this), 
this.registerSlideWaypoint = e(this.registerSlideWaypoint, this), this.registerSlideWaypoints = e(this.registerSlideWaypoints, this), 
this.selectSlideByWaypoint = e(this.selectSlideByWaypoint, this), this.hashTagChangeHandler = e(this.hashTagChangeHandler, this), 
this.getSlideName = e(this.getSlideName, this), this.setupKeyBindings = e(this.setupKeyBindings, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.currentSectionName = e(this.currentSectionName, this), 
this.currentIndex = e(this.currentIndex, this), this.slideIndex = e(this.slideIndex, this), 
this.unlockKeyboard = e(this.unlockKeyboard, this), this.lockKeyboard = e(this.lockKeyboard, this), 
this.removeHash = e(this.removeHash, this), this.setupHashTagChangeHandlerAndWaypoints = e(this.setupHashTagChangeHandlerAndWaypoints, this), 
this.runMobileOptimization = e(this.runMobileOptimization, this), this.scrolling = !1, 
this.keyboardLock = !1, this.firstTime = !0, this.current = ko.observable();
}
return t.prototype.init = function() {
return $B.log("[NAVIGATOR] Init"), this.selectSlide($(".slides .slide").first()), 
this.setupHashTagChangeHandlerAndWaypoints(), $B.getCustomization("pageKeybinding") && this.setupKeyBindings(), 
this.runMobileOptimization(), $B.isStatic() && $S.page_meta.show_navigation_buttons ? ($(".navigation-buttons").show(), 
$(".navigation-buttons span").css({
visibility:"visible",
opacity:0,
display:"block"
}), $(".navigation-buttons .prev").click(function() {
return window.slide_navigator.prev();
}), $(".navigation-buttons .next").click(function() {
return window.slide_navigator.next();
})) :void 0;
}, t.prototype.runMobileOptimization = function() {
var e;
return e = $B.TH.isMobile(), e && !location.hash ? window.scrollTo(0, 1) :void 0;
}, t.prototype.setupHashTagChangeHandlerAndWaypoints = function() {
var e = this;
return $(window).hashchange(function() {
return e.hashTagChangeHandler(location.hash);
}), "" === location.hash && this.registerSlideWaypoints, 0 === $(document).scrollTop() ? setTimeout(function() {
return $(window).hashchange(), e.registerSlideWaypoints();
}, 1500) :this.registerSlideWaypoints();
}, t.prototype.removeHash = function() {
var e;
return e = window.location.hash, "" !== e && "#" !== e && 0 !== e.indexOf("#!/~") ? "undefined" != typeof history && null !== history ? "function" == typeof history.replaceState ? history.replaceState("", document.title, window.location.pathname + window.location.search) :void 0 :void 0 :void 0;
}, t.prototype.lockKeyboard = function() {
return this.keyboardLock = !0;
}, t.prototype.unlockKeyboard = function() {
return this.keyboardLock = !1;
}, t.prototype.slideIndex = function(e) {
var t;
return t = $(".slides .slide"), t.index(e);
}, t.prototype.currentIndex = function() {
return this.slideIndex(this.current());
}, t.prototype.currentSectionName = function() {
return this.current().find("a.section-name-anchor").attr("data-section-name");
}, t.prototype.isFirst = function() {
var e;
return e = this.slideIndex(this.current()), 0 === e;
}, t.prototype.isLast = function() {
var e, t;
return t = $(".slides .slide"), e = this.slideIndex(this.current()), e === t.length - 1;
}, t.prototype.next = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), t.length - 1 > e ? this.selectAndGotoSlideWithIndex(e + 1) :e === t.length - 1 ? $("html, body").stop().animate({
scrollTop:$(document).height() - $(window).height()
}, 1200, "easeInOutQuart") :void 0;
}, t.prototype.prev = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), e > 0 ? this.selectAndGotoSlideWithIndex(e - 1) :$("html, body").stop().animate({
scrollTop:0
}, 1200, "easeInOutQuart");
}, t.prototype.setupKeyBindings = function() {
var e, t, o = this;
return t = !1, e = !0, $(document).on({
keydown:function(t) {
if (13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor(), !o.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) {
switch (t.keyCode) {
case 32:
t.preventDefault();
break;

case 38:
t.preventDefault();
break;

case 40:
t.preventDefault();
}
return e = !0;
}
},
keyup:function(n) {
if (clearTimeout(t), t = !1, !e) return e = !0, void 0;
if (!o.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) switch (n.keyCode) {
case 32:
return n.preventDefault(), o.next();

case 38:
return n.preventDefault(), o.prev();

case 40:
return n.preventDefault(), o.next();
}
}
});
}, t.prototype.getSlug = function(e, t) {
return e = e.toSlug(), (0 === e.length || e.match(/^[0-9]+$/g)) && (e = "_" + (t + 1)), 
e;
}, t.prototype.getSlideNames = function() {
var e, t, o, n, i, r, a, s, l, c;
for (n = [], s = window.edit_page.isShowPage ? $S.page_meta.slide_names :function() {
var e, t, o, n;
for (o = window.edit_page.data.slides(), n = [], e = 0, t = o.length; t > e; e++) a = o[e], 
n.push(a.components.slideSettings.name());
return n;
}(), t = l = 0, c = s.length; c > l; t = ++l) {
for (r = s[t], o = i = "#" + this.getSlug(r, t), e = 1; -1 !== $.inArray(o, n); ) o = i + "-" + e++;
n.push(o);
}
return n;
}, t.prototype.getSlideName = function(e) {
return this.getSlideNames()[e];
}, t.prototype.hashTagChangeHandler = function(e) {
var t, o, n, i = this;
return $B.log("[NAVIGATOR] Got hash change " + e), $("html, body").stop(), o = $('a[data-scroll-name="' + e + '"]'), 
o.length ? (n = o.closest(".slide"), $B.log("[NAVIGATOR] Found section number")) :(t = $.inArray(e, this.getSlideNames()), 
-1 !== t && ($B.log("[NAVIGATOR] Found section slug"), n = $("ul.slides .slide").eq(t), 
o = n.find("a.section-anchor").first())), o.length > 0 ? (this.scrolling = !0, window.edit_page.Event.publish("Menu.beforeChange", e), 
$(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"), this.selectSlide(n), $B.log("[NAVIGATOR] Animating to #" + ($(".slides .slide").index(n) + 1)), 
$("html, body").stop().animate({
scrollTop:o.first().offset().top
}, 1200, "easeInOutQuart", function() {
return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"), window.edit_page.Event.publish("Menu.afterChange", e), 
i.scrolling = !1;
})) :void 0;
}, t.prototype.selectSlideByWaypoint = function(e, t) {
var o;
return o = this.getSlideName(t), window.location.hash !== o ? ($B.log("[NAVIGATOR] Selecting slide " + (t + 1) + " by waypoint"), 
this.selectSlide(e), this.removeHash()) :void 0;
}, t.prototype.waypointsRegistered = !1, t.prototype.registerSlideWaypoints = function() {
var e;
return this.waypointsRegistered ? void 0 :($B.log("[NAVIGATOR] Registering waypoints"), 
e = this.registerSlideWaypoint, $(".slides .slide").each(function() {
return e($(this));
}), this.waypointsRegistered = !0);
}, t.prototype.registerSlideWaypoint = function(e) {
var t, o, n, i, r = this;
return o = this.slideIndex, e.waypoint(function(t) {
var n, i;
if (r.firstTime) return r.firstTime = !1, $B.log("[NAVIGATOR] Canceling first waypoint event"), 
void 0;
if (!r.scrolling) {
if (i = o(e), "down" === t || 0 === i) n = e; else if ("up" === t && (n = e.prev(), 
i -= 1, 0 === $(document).scrollTop() && 0 !== i)) return;
return $B.log("[NAVIGATOR] Got waypoint event " + t + ", " + i), r.selectSlideByWaypoint(n, i);
}
}, {
offset:"50%",
continuous:!1
}), t = 0, 0 === (null != (n = e.first()) ? null != (i = n.offset()) ? i.top :void 0 :void 0) ? $(window).scroll(function() {
var n;
if (!r.scrolling && 0 === o(e.first()) && e.first().height() < .5 * $(window).height() && e.eq(1).length) {
if (n = $(document).scrollTop(), t === n) return;
return 0 === n ? r.selectSlideByWaypoint(e.first(), 0) :0 === t && r.selectSlideByWaypoint(e.eq(1), 1), 
t = n;
}
}) :void 0;
}, t.prototype.getHighlightedIndex = function() {
var e, t, o;
for (o = $(".s-nav .s-nav-item"), t = $(".navbar-drawer .navbar-drawer-item"), e = this.currentIndex(); o[e] && !o.eq(e).is(":visible") && !t.eq(e).is(":visible"); ) e -= 1;
return e;
}, t.prototype.selectSlide = function(e) {
var t;
return $(".slides .slide").removeClass("selected"), e.addClass("selected"), this.current(e), 
$B.isStatic() ? (t = this.getHighlightedIndex(), $(".s-nav .s-nav-item").removeClass("selected"), 
t > -1 && $(".s-nav .s-nav-item").eq(t).addClass("selected"), $(".navbar-drawer .navbar-drawer-item").removeClass("selected"), 
t > -1 && $(".navbar-drawer .navbar-drawer-item").eq(t).addClass("selected"), this.isFirst() ? $(".navigation-buttons .prev").animate({
opacity:0
}) :$(".navigation-buttons .prev").animate({
opacity:1
}), this.isLast() ? $(".navigation-buttons .next").animate({
opacity:0
}) :$(".navigation-buttons .next").animate({
opacity:1
})) :void 0;
}, t.prototype.selectAndGotoSlideWithIndex = function(e) {
return window.location.hash = this.getSlideName(e);
}, t;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var i in o) t.call(o, i) && (e[i] = o[i]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
window.currentComponent = null, window.currentRepeatable = null, Bobcat.EditorTracker = function(t) {
function n() {
this.closeLastEditor = e(this.closeLastEditor, this), this.addOpenedEditor = e(this.addOpenedEditor, this), 
this.removeFromOpenedEditors = e(this.removeFromOpenedEditors, this), this.hasOpenedEditor = e(this.hasOpenedEditor, this), 
this.openedEditors = [];
}
return o(n, t), n.prototype.hasOpenedEditor = function() {
return 0 === this.openedEditors.length;
}, n.prototype.removeFromOpenedEditors = function(e) {
var t;
return t = $.inArray(e, this.openedEditors), t > -1 ? this.openedEditors.splice(t, 1) :void 0;
}, n.prototype.addOpenedEditor = function(e) {
return this.openedEditors.push(e);
}, n.prototype.closeLastEditor = function() {
var e;
return e = this.openedEditors.pop(), e && (Bobcat.AE.track("Editor - Combo Key - Done"), 
e.doneClickHandler()), e;
}, n;
}($B.Module), window.editorTracker = new Bobcat.EditorTracker(), Bobcat.ComponentHelper = {
TRANSPARENT_IMAGE_URL:"/assets/icons/transparent.png",
isImageTransparent:function(e) {
return null == e && (e = ""), -1 !== e.indexOf(this.TRANSPARENT_IMAGE_URL);
}
}, Bobcat.Component = function(t) {
function n(t, o, n) {
this.root = t, null == o && (o = {}), null == n && (n = {}), this.triggerEvent = e(this.triggerEvent, this), 
this.addSubscriber = e(this.addSubscriber, this), this.destroy = e(this.destroy, this), 
this.loadData = e(this.loadData, this), this.storeCommand = e(this.storeCommand, this), 
this.refreshRootLastData = e(this.refreshRootLastData, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.hideEditorHandler = e(this.hideEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.mouseleaveHandler = e(this.mouseleaveHandler, this), this.mouseenterHandler = e(this.mouseenterHandler, this), 
this.firstTimeToLoad = !0, this.loadData(o, n), this.selected = ko.observable(), 
this.dialogOpen = ko.observable(!1), this.state = ko.observable(0), this.lastData = o, 
this.mapping = n;
}
return o(n, t), n.include(Bobcat.ComponentHelper), n.prototype.isNull = function(e) {
return "undefined" == typeof e || null === e;
}, n.prototype.isState = function(e) {
return "normal" === e && 0 === this.state() ? !0 :"overlay" === e && 1 === this.state() ? !0 :"editor" === e && 2 === this.state() ? !0 :!1;
}, n.prototype.gotoState = function(e) {
return "normal" === e ? (this === window.currentComponent && (window.currentComponent = null), 
this === window.currentRepeatable && (window.currentRepeatable = null), this.state(0), 
window.editorTracker.removeFromOpenedEditors(this)) :"overlay" === e ? this.type && "RepeatableItem" === this.type() || !window.currentComponent || !window.currentComponent.isState("overlay") ? (this.type && "RepeatableItem" === this.type() ? window.currentRepeatable = this :window.currentComponent = this, 
this.state(1)) :(window.currentComponent.gotoState("normal"), void 0) :"editor" === e ? (window.editorTracker.addOpenedEditor(this), 
this.state(2)) :void 0;
}, n.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, n.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, n.prototype.clickEditorHandler = function() {
return this.isState("overlay") ? this.gotoState("editor") :void 0;
}, n.prototype.hideEditorHandler = function() {
return this.isState("editor") ? this.gotoState("normal") :void 0;
}, n.prototype.doneClickHandler = function(e) {
return this.hideEditorHandler(e), window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand();
}, n.prototype.refreshRootLastData = function() {
return this.root ? this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))) :void 0;
}, n.prototype.storeCommand = function() {
var e;
return console.log("storeCommand: root: ", this.root), console.log("storeCommand: self: ", this), 
this.root ? (e = this.root.rootLastData, this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))), 
$B.Singleton.TimeMachine.pushOp({
action:"modify",
self:this,
root:this.root,
data:{
mapping:this.root.mapping,
oldValue:e,
newValue:this.root.rootLastData
}
})) :void 0;
}, n.prototype.loadData = function(e, t) {
var o, n, i;
null == e && (e = {}), null == t && (t = {}), this.firstTimeToLoad && (this.lastData = e, 
this.firstTimeToLoad = !1), ko.mapping.fromJS(e, t, this), i = [];
for (o in e) n = e[o], this[o] && ko.isSubscribable(this[o]) ? i.push(this[o].subscribe(function() {
return window.edit_page.unsavedChanges(!0);
})) :i.push(void 0);
return i;
}, n.prototype.destroy = function() {}, n.prototype.addSubscriber = function(e, t) {
var o, n, i, r, a;
for (this.subscribers || (this.subscribers = []), e instanceof RegExp || (e = new RegExp(e)), 
o = !1, a = this.subscribers, i = 0, r = a.length; r > i; i++) n = a[i], n.event.toString() === e.toString() && (o = !0, 
n.listeners.push(t));
return o ? void 0 :this.subscribers.push({
event:e,
listeners:[ t ]
});
}, n.prototype.triggerEvent = function(e, t) {
var o, n, i, r, a, s, l, c;
if (this.subscribers) for (l = this.subscribers, i = 0, a = l.length; a > i; i++) if (n = l[i], 
n.event.test(e)) for (c = n.listeners, r = 0, s = c.length; s > r; r++) o = c[r], 
o.call(this, t);
return this.root && this !== this.root ? this.root.triggerEvent(e, t) :void 0;
}, n;
}($B.Module);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var i in o) t.call(o, i) && (e[i] = o[i]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
window.asset_path = function(e) {
var t, o;
return t = $("meta[name=asset-url]").attr("content"), o = /^\/assets\//, o.test(e) && t && (e = t + e), 
e;
}, Bobcat.DelayJob = function() {
function t() {
this.init = e(this.init, this), this.getAllJobs = e(this.getAllJobs, this), this.getJob = e(this.getJob, this), 
this.add = e(this.add, this), this.jobs = {};
}
return t.prototype.add = function(e, t) {
return this.jobs[e] = t;
}, t.prototype.getJob = function(e) {
return this.jobs[e];
}, t.prototype.getAllJobs = function() {
var e, t, o, n;
o = [], n = this.jobs;
for (t in n) e = n[t], o.push(e);
return o;
}, t.prototype.init = function() {}, t;
}(), window.runAfterDomBinding = new Bobcat.DelayJob(), Bobcat.PageData = function(t) {
function n(t) {
this.removePremiumSlides = e(this.removePremiumSlides, this), this.selectedPreset = e(this.selectedPreset, this);
var o;
this.isNull(t.showNavigationButtons) && (t.showNavigationButtons = !1), this.isNull(t.submenu) && (t.submenu = {
type:"SubMenu",
list:[],
components:{
link:{
type:"Button",
url:"http://www.wordpress.com",
text:"Blog",
new_target:!0
}
}
}), this.isNull(t.templateVariation) && (t.templateVariation = ""), this.isNull(t.templatePreset) && (t.templatePreset = ""), 
o = {
slides:{
create:function(e) {
return new Bobcat.Slide(e.data);
}
},
menu:{
create:function(e) {
return new Bobcat.Menu(e.data);
}
},
footer:{
create:function(e) {
return new Bobcat.Footer(e.data);
}
},
submenu:{
create:function(e) {
return new Bobcat.SubMenu(e.data);
}
}
}, n.__super__.constructor.call(this, null, t, o);
}
return o(n, t), n.prototype.selectedPreset = function() {}, n.prototype.removePremiumSlides = function() {
var e, t;
return (t = $B.meta("premium-slides")) ? (e = t.split(","), this.slides($.grep(this.slides(), function(t) {
return -1 === $.inArray(t.data.template_name, e);
}))) :void 0;
}, n.prototype.bindSlides = function() {
var e, t, o, n, i, r, a, s, l, c;
for (this.menu.bind($(Bobcat.DOM.NAVIGATOR)), this.footer.bind($(Bobcat.DOM.FOOTER)), 
$(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."), 
s = this.slides(), t = n = 0, r = s.length; r > n; t = ++n) o = s[t], e = $(Bobcat.DOM.SLIDES).eq(t), 
o.index(t), o.html(e);
for (this.slides.subscribe(function(e) {
var o, n, i, r, a;
for (t = n = 0, r = e.length; r > n; t = ++n) o = e[t], o.index(t);
for (i = 0, a = e.length; a > i; i++) o = e[i], o.html().find(".section-anchor").attr("data-scroll-name", "#" + (o.index() + 1)), 
o.beforeMoveHandler(), $(".slides").append(o.html()), o.afterMovedHandler();
return $.waypoints("refresh");
}), ko.applyBindings(this, Bobcat.DOM.PAGE_DATA_SCOPE), l = this.slides(), c = [], 
i = 0, a = l.length; a > i; i++) o = l[i], c.push(o.bind());
return c;
}, n.prototype.addSlideData = function(e, t) {
return this.slides.splice(e, 0, t), window.edit_page.setupTooltips();
}, n.prototype.removeSlideData = function(e) {
return this.slides.splice(e, 1), window.edit_page.removeTooltips();
}, n.prototype.hideAllEditors = function() {
var e, t, o, n;
for (n = this.slides(), t = 0, o = n.length; o > t; t++) e = n[t], e.hideAllEditors();
return this.menu.hideAllEditors();
}, n.prototype.highlightInNav = function(e) {
var t;
return t = e.data, t.isSelected() && !t.isHidden() ? !0 :void 0;
}, n;
}(Bobcat.Component), Bobcat.Slide = function(t) {
function n(t) {
var o, i = this;
this.data = t, this.destroy = e(this.destroy, this), this.deleteSlide = e(this.deleteSlide, this), 
this.isSelected = e(this.isSelected, this), this.isHighlighted = e(this.isHighlighted, this), 
this.getName = e(this.getName, this), this.isHidden = e(this.isHidden, this), this.selectSlide = e(this.selectSlide, this), 
this.toggleMenu = e(this.toggleMenu, this), this.renameDone = e(this.renameDone, this), 
this.rename = e(this.rename, this), o = {
components:{
create:function(e) {
var t, o, n, r, a;
o = {}, a = e.data;
for (t in a) n = a[t], o[t] = new Bobcat[n.type](i, n), "function" == typeof (r = o[t]).init && r.init();
return o;
}
}
}, n.__super__.constructor.call(this, this, this.data, o), this.html = ko.observable(), 
this.index = ko.observable(), this.renameMode = ko.observable(!1), this.rootLastData = this.data;
}
return o(n, t), n.StripHtml = function(e) {
return Bobcat.Gallery.StripHtml(e);
}, n.prototype.htmlCopy = function() {
return this.html().html();
}, n.prototype.hideAllEditors = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], n.push(e.hideEditorHandler());
return n;
}, n.prototype.bind = function() {
return ko.applyBindings(this.components, this.html().get(0));
}, n.prototype.rename = function(e) {
return this.renameMode(!0), window.dom = e, $(e.closest(".section").find("input").first()).focus(), 
window.slide_navigator.lockKeyboard();
}, n.prototype.renameDone = function() {
return this.renameMode(!1), window.slide_navigator.unlockKeyboard(), window.edit_page.track("Editor - Rename Section");
}, n.prototype.toggleMenu = function() {
var e;
return e = this.components.slideSettings.show_nav(), this.components.slideSettings.show_nav(!e), 
window.edit_page.Event.publish("MenuItem.toggle", {});
}, n.prototype.selectSlide = function(e) {
return this.isSelected() ? this.rename(e) :window.slide_navigator.selectAndGotoSlideWithIndex(this.index());
}, n.prototype.isHidden = function() {
return !this.components.slideSettings.show_nav();
}, n.prototype.hashHref = function() {
return window.slide_navigator.getSlideName(this.index());
}, n.prototype.getName = function() {
return this.components.slideSettings.name();
}, n.prototype.isHighlighted = function() {
var e, t;
if (this.isSelected() && !this.isHidden()) return !0;
if (this.index() > window.slide_navigator.currentIndex()) return !1;
for (e = this.index() + 1, t = window.edit_page.data.slides(); t[e] && t[e].isHidden(); ) {
if (t[e].isSelected()) return !0;
e += 1;
}
return !1;
}, n.prototype.isSelected = function() {
return window.slide_navigator.currentIndex() === this.index();
}, n.prototype.deleteSlide = function() {
var e, t = this;
return e = !0, $("html body").stop().animate({
scrollTop:this.html().first().offset().top
}, 500, "easeInOutQuart", function() {
return e && (e = !1, window.confirm(I18n.t("js.pages.edit.confirm.delete_section"))) ? (window.edit_page.deleteSlide(t.index()), 
t.destroy()) :void 0;
});
}, n.prototype.destroy = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], n.push(e.destroy());
return n;
}, n.prototype.beforeMoveHandler = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], null != e.beforeMoveHandler ? n.push(e.beforeMoveHandler()) :n.push(void 0);
return n;
}, n.prototype.afterMovedHandler = function() {}, n;
}(Bobcat.Component), Bobcat.Text = function(e) {
function t(e, o) {
var n, i = this;
this.root = e, n = {
style:{
create:function(e) {
return new Bobcat.TextStyle(i.root, e.data);
}
}
}, t.__super__.constructor.call(this, this.root, o, n), this.oldValue = ko.observable();
}
return o(t, e), t.prototype.edit = function() {
return t.__super__.edit.call(this), this["default"]() ? (this.oldValue(this.value()), 
this.value("&nbsp;")) :void 0;
}, t.prototype.deselect = function() {
return t.__super__.deselect.call(this), this["default"]() ? "&nbsp;" === this.value() ? this.value(this.oldValue()) :this["default"](!1) :void 0;
}, t;
}(Bobcat.Component), Bobcat.SocialMediaList = function(t) {
function n(t, o) {
var i, r, a = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.bind = e(this.bind, this), 
i = $.extend(!0, {}, o), window.social_media_config.updateButtonListData(i), r = {
link_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
},
button_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
}
}, n.__super__.constructor.call(this, this.root, i, r), this.mediaListHtml = ko.observable();
}
return o(n, t), n.prototype.bind = function() {
return this.render();
}, n.prototype.render = function() {
var e, t, o, n, i, r, a, s, l, c;
if (!$B.isHeadlessRendering()) {
for (o = "", s = this.button_list(), n = 0, r = s.length; r > n; n++) t = s[n], 
t.show_button() && (o += t.getTemplate());
for (this.mediaListHtml(o), l = this.button_list(), c = [], i = 0, a = l.length; a > i; i++) t = l[i], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
window.edit_page.isShowPage ? t.show_button() || e ? c.push(t.reRender()) :c.push(void 0) :c.push(t.reRender());
return c;
}
}, n.prototype.clickEditorHandler = function(e) {
return n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, n.prototype.doneClickHandler = function(e) {
var t, o, i, r;
for (this.render(), r = this.link_list(), o = 0, i = r.length; i > o; o++) t = r[o], 
t.doneClickHandler();
return n.__super__.doneClickHandler.call(this, e);
}, n;
}(Bobcat.Component), Bobcat.SocialMediaItem = function(t) {
function n(t, o) {
var i = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.onScriptLoad = e(this.onScriptLoad, this), 
this.getUrl = e(this.getUrl, this), o.link_url || (o.link_url = ""), o.share_text || (o.share_text = window.social_media_config.get("description")), 
n.__super__.constructor.call(this, this.root, o, {}), this.show_link = ko.dependentObservable(function() {
return i.link_url().length > 0;
});
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.getUrl = function() {
return this.url && this.url() ? this.url() :window.social_media_config.get("url");
}, n.prototype.getSubtitle = function() {
return "";
}, n.prototype.openLinkInput = function(e) {
var t;
return t = e.closest(".social-media-item"), t.length ? (t.find("input.url").show(), 
e.hide()) :void 0;
}, n.prototype.onScriptLoad = function() {
return this.runScript();
}, n.prototype.createScriptTag = function(e, t) {
var o, n;
return o = $("<div></div>").addClass(e), n = $("<script></script>").attr({
async:!0,
src:t
}), n.bind("load", this.onScriptLoad), o.get(0).appendChild(n.get(0)), $("#fb-root").get(0).appendChild(o.get(0));
}, n.prototype.doneClickHandler = function() {
var e, t;
return t = this.link_url(), e = this.addProtocol(t, !0), this.link_url(e);
}, n;
}(Bobcat.Component), Bobcat.Facebook = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), o.app_id = window.social_media_config.get("fb_app_id"), 
o.imageUrl = asset_path("/assets/icons/facebook.png"), n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, n.prototype.getSubtitle = function() {
return "Facebook Like";
}, n.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.app_id(),
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, n.prototype.reRender = function() {
return $("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, n;
}(Bobcat.SocialMediaItem), Bobcat.LinkedIn = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/linkedin.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, n.prototype.getSubtitle = function() {
return "LinkedIn Share";
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, n;
}(Bobcat.SocialMediaItem), Bobcat.Twitter = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/twitter.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>';
}, n.prototype.getSubtitle = function() {
return "Tweet button";
}, n.prototype.runScript = function() {
var e;
return "undefined" != typeof twttr && null !== twttr ? null != (e = twttr.widgets) ? e.load() :void 0 :void 0;
}, n.prototype.reRender = function() {
return $("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, n;
}(Bobcat.SocialMediaItem), Bobcat.GPlus = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/gplus.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, n.prototype.getSubtitle = function() {
return "Google +1";
}, n.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, n.prototype.reRender = function() {
return $("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, n;
}(Bobcat.SocialMediaItem), Bobcat.Renren = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/renren.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "人人喜欢";
}, n.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:window.social_media_config.get("title"),
description:window.social_media_config.get("description"),
image:window.social_media_config.get("image")
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}(Bobcat.SocialMediaItem), Bobcat.SinaWeibo = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
o.imageUrl = asset_path("/assets/icons/weibo.png"), n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "新浪微博";
}, n.prototype.getTemplate = function() {
var e, t, o, n, i;
i = 90, n = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:window.social_media_config.get("title"),
pic:window.social_media_config.get("image"),
rnd:new Date().valueOf()
}, o = [];
for (e in t) o.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + o.join("&") + '" width="' + i + '" height="' + n + '"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}(Bobcat.SocialMediaItem), Bobcat.Person = function(e) {
function t(e, o, n) {
this.root = e, this.parent = n, t.__super__.constructor.call(this, this.root, o, {}), 
this.name = new Bobcat.RichText(this.root, this.name), this.name.init(), this.title = new Bobcat.RichText(this.root, this.title), 
this.title.init(), this.image = new Bobcat.Image(this.root, this.image, {}, null), 
this.choosingImage = ko.observable(!1);
}
return o(t, e), t.prototype.remove = function() {
return this.parent.list.remove(this);
}, t.prototype.toggleImageChooser = function() {
return this.choosingImage(!this.choosingImage());
}, t;
}(Bobcat.Component), Bobcat.Video = function(t) {
function n(t, o, i) {
this.root = t, this.parent = i, this.remove = e(this.remove, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.errorCallback = e(this.errorCallback, this), 
this.successCallback = e(this.successCallback, this), this.upload = e(this.upload, this), 
n.__super__.constructor.call(this, this.root, o, {}), this.visible = ko.dependentObservable(function() {
return !window.edit_page.isLoading();
});
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.upload = function(e) {
var t = this;
if (!window.edit_page.isLoading()) return window.edit_page.isLoading(!0), e.target && (e = $(e.target)), 
this.url(this.addProtocol(this.url())), e.closest("form").ajaxSubmit({
url:"/s/videos.json",
type:"POST",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
return console.log(e), "retry" === e.html ? $B.poller("/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm?v=1", t.successCallback, t.errorCallback) :"success" === e.html ? t.successCallback(e) :void 0;
},
error:this.errorCallback
});
}, n.prototype.successCallback = function(e) {
return window.edit_page.isLoading(!1), this.html(e.message.html), window.edit_page.track("Editor - Add Video");
}, n.prototype.errorCallback = function(e) {
var t;
return t = jQuery.parseJSON(e.responseText), window.edit_page.isLoading(!1), $B.log(t), 
alert(I18n.t(t.html, t.message.i18n));
}, n.prototype.clickEditorHandler = function(e) {
return this.oldHtml = this.html(), n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.html(this.oldHtml), this.hideEditorHandler();
}, n.prototype.remove = function() {
return this.html(""), this.url("");
}, n;
}(Bobcat.Component), Bobcat.Repeatable = function(t) {
function n(t, o) {
var i, r = this;
this.root = t, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.selectedIndex = e(this.selectedIndex, this), 
this.changeToPrev = e(this.changeToPrev, this), this.changeToNext = e(this.changeToNext, this), 
this.changeSelected = e(this.changeSelected, this), this.add = e(this.add, this), 
this.isNull(o.subItemClassName) && (o.subItemClassName = "RepeatableItem"), i = {
list:{
create:function(e) {
return new Bobcat[o.subItemClassName](r.root, e.data, r);
}
},
components:{
create:function(e) {
return e.data;
}
}
}, n.__super__.constructor.call(this, this.root, o, i), this.selected = ko.observable(), 
this.direction = ko.observable(1);
}
return o(n, t), n.prototype.add = function(e) {
var t;
return t = new (Bobcat[this.subItemClassName()])(this.root, {
components:this.components
}, this), this.changeSelected(t), this.list.push(t), this.changeSelected(t), window.edit_page.Event.publish("Repeatable.add", {
target:e
}), window.edit_page.track("Editor - Add Repeatable"), this.triggerEvent("Repeatable.Add", t), 
this.storeCommand();
}, n.prototype.changeSelected = function(e) {
return this.selected() && e.index() > 0 && this.selectedIndex() > e.index() ? this.direction(-1) :this.direction(1), 
this.selected(e);
}, n.prototype.changeToNext = function(e) {
return this.changeSelected(this.list()[(e.index() + 1) % this.list().length]);
}, n.prototype.changeToPrev = function(e) {
return this.changeSelected(this.list()[(e.index() - 1) % this.list().length]);
}, n.prototype.beforeMoveHandler = function() {
var e, t, o, n, i;
for (n = this.list(), i = [], t = 0, o = n.length; o > t; t++) e = n[t], null != e.beforeMoveHandler ? i.push(e.beforeMoveHandler()) :i.push(void 0);
return i;
}, n.prototype.afterMovedHandler = function() {}, n.prototype.selectedIndex = function() {
return this.selected() ? this.selected().index() :void 0;
}, n.prototype.hasContent = function() {
return this.list().length > 0;
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n;
}(Bobcat.Component), Bobcat.RepeatableItem = function(t) {
function n(t, o, i) {
var r, a = this;
this.root = t, this.parent = i, this.col4 = e(this.col4, this), this.col3 = e(this.col3, this), 
this.smartCol8 = e(this.smartCol8, this), this.smartCol3 = e(this.smartCol3, this), 
this.smartCol = e(this.smartCol, this), this.deselect = e(this.deselect, this), 
this.selectForEdit = e(this.selectForEdit, this), this.direction = e(this.direction, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.select = e(this.select, this), 
this.showEditor = e(this.showEditor, this), this.leaveDeleteHandler = e(this.leaveDeleteHandler, this), 
this.enterDeleteHandler = e(this.enterDeleteHandler, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.isEven = e(this.isEven, this), this.index = e(this.index, this), 
this.remove = e(this.remove, this), r = {
components:{
create:function(e) {
var t, o, n, i;
o = {}, i = e.data;
for (t in i) n = i[t], "function" == typeof n.type && (n.type = n.type()), o[t] = new Bobcat[n.type](a.root, n), 
"undefined" != typeof o[t].init && o[t].init();
return o;
}
}
}, o.type = "RepeatableItem", o.deleteOverlayEnabled = !1, n.__super__.constructor.call(this, this.root, o, r), 
this.isSelected = ko.dependentObservable(function() {
return a.parent.selected() === a;
}, this);
}
return o(n, t), n.prototype.remove = function(e) {
var t, o, n;
return t = $(e.closest(".slide-list")[0]), o = e.closest(".repeatable").prev(), 
n = this.parent.list().indexOf(this), this.parent.list.remove(this), window.edit_page.Event.publish("Repeatable.remove", {
target:o
}), window.edit_page.track("Editor - Remove Repeatable"), this.triggerEvent("Repeatable.Remove", {
component:this,
target:e,
targetParent:t
}), this.parent.storeCommand();
}, n.prototype.index = function() {
return $.inArray(this, this.parent.list());
}, n.prototype.isEven = function() {
return this.index() % 2 === 0;
}, n.prototype.isFirst = function() {
return 0 === this.index();
}, n.prototype.isLast = function() {
return this.index() === this.parent.list().length - 1;
}, n.prototype.enterDeleteHandler = function() {
return this.deleteOverlayEnabled(!0);
}, n.prototype.leaveDeleteHandler = function() {
return this.deleteOverlayEnabled(!1);
}, n.prototype.showEditor = function() {
var e, t, o, n;
o = !0, n = this.components;
for (t in n) e = n[t], o = o && (e.isState("normal") || e.isState("overlay"));
return o;
}, n.prototype.select = function() {
return this.parent.changeSelected(this);
}, n.prototype.next = function() {
return this.deselect(), this.parent.changeToNext(this);
}, n.prototype.prev = function() {
return this.deselect(), this.parent.changeToPrev(this);
}, n.prototype.direction = function() {
return this.parent.direction();
}, n.prototype.selectForEdit = function(e) {
var t, o, n;
this.deselect(), this.select(e), n = this.components;
for (o in n) if (t = n[o], "Image" === t.type()) return t.mouseenterHandler(), t.clickEditorHandler(), 
void 0;
}, n.prototype.deselect = function() {
var e, t, o, n, i, r, a;
for (r = this.parent.list(), a = [], n = 0, i = r.length; i > n; n++) t = r[n], 
a.push(function() {
var n, i;
n = t.components, i = [];
for (o in n) e = n[o], "Image" === e.type() && e.isState("editor") ? i.push(e.clickCancelEditorHandler()) :i.push(void 0);
return i;
}());
return a;
}, n.prototype.beforeMoveHandler = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], null != e.beforeMoveHandler ? n.push(e.beforeMoveHandler()) :n.push(void 0);
return n;
}, n.prototype.afterMovedHandler = function() {}, n.prototype.smartCol = function() {
return 4 === this.parent.list().length || this.parent.list().length < 3;
}, n.prototype.smartCol3 = function() {
return this.parent.list().length % 3 === 0 || this.parent.list().length < 3;
}, n.prototype.smartCol8 = function() {
var e;
return e = this.parent.list().length, 1 === e || 2 === e || 4 === e;
}, n.prototype.col3 = function() {
return this.parent.list().length <= 3;
}, n.prototype.col4 = function() {
return this.parent.list().length <= 4;
}, n;
}(Bobcat.Component), Bobcat.Slider = function(t) {
function n(t, o) {
var i, r, a, s, l, c, u, d, p = this;
for (this.root = t, this.gotoSlide = e(this.gotoSlide, this), this.updateIndex = e(this.updateIndex, this), 
this.select2 = e(this.select2, this), this.select = e(this.select, this), this.add = e(this.add, this), 
this.onClickHandler = e(this.onClickHandler, this), n.__super__.constructor.call(this, this.root, o), 
this.selectedIdx = ko.observable(0), this.formOpen = ko.observable(!1), l = function(e, t) {
var o, n;
return null != (o = window.edit_page) ? null != (n = o.Event) ? n.publish(e, t) :void 0 :void 0;
}, c = function(e, t) {
return p.root.addSubscriber(e, function(e) {
var o;
return null != (o = window.edit_page) && "function" == typeof o.track && o.track("Edit Content - Slider - Editor v1"), 
l(t, e.target);
});
}, i = "Slider.ContentChanged", a = function() {
var e, t, o, n;
for (o = [ /Text\..*/, /BackgroundImage\..*/, /Media\..*/, /Repeatable\..*/ ], n = [], 
e = 0, t = o.length; t > e; e++) r = o[e], n.push([ r, i ]);
return n;
}(), u = 0, d = a.length; d > u; u++) s = a[u], c(s[0], s[1]);
this.root.addSubscriber("Repeatable.Remove", function(e) {
var t;
return 0 === p.list().length ? (t = e.targetParent.closest(".iosslider"), t.find(".slider").css({
"max-height":300
}), t.css({
"max-height":300,
"min-height":300
}), void 0) :(p.selectedIdx() >= p.list().length && p.selectedIdx(p.list().length - 1), 
$(window).trigger("resize"), setTimeout(function() {
return p.gotoSlide(e.targetParent.closest(".iosslider"), p.selectedIdx() + 1);
}, 300));
}), this.root.addSubscriber("Repeatable.Move", function(e) {
return p.selectedIdx(e.extra.newIndex), p.gotoSlide(e.target.closest(".iosslider"), p.selectedIdx() + 1);
}), this.root.addSubscriber(/Text\..*/, function() {
return setTimeout(function() {
return $(window).trigger("resize");
}, 300);
});
}
return o(n, t), n.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().find(".slider-settings"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, n.prototype.add = function(e) {
var t = this;
return this.list().length >= 10 ? ($B.customAlert("You can only add 10 slides!"), 
void 0) :(n.__super__.add.call(this, e), this.triggerEvent("Slider.Add"), 1 === this.list().length ? (this.selectedIdx(0), 
setTimeout(function() {
return t.gotoSlide(e.closest(".iosslider"), t.selectedIdx() + 1);
}, 500)) :void 0);
}, n.prototype.select = function(e) {
var t, o;
return e = $(e), t = e.closest(".selector"), o = e.closest(".slide-list").find(".selector"), 
this.selectedIdx(o.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, n.prototype.select2 = function(e) {
var t, o;
return e = $(e), t = e.closest(".selector"), o = e.closest(".slide-selectors").find(".selector"), 
this.selectedIdx(o.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, n.prototype.updateIndex = function(e) {
var t, o;
return o = $(e).hasClass("prev-button") ? -1 :1, t = Math.max(0, this.selectedIdx() + o), 
t = Math.min(this.list().length - 1, t), this.selectedIdx(t);
}, n.prototype.gotoSlide = function(e, t) {
return e.iosSlider("goToSlide", t);
}, n;
}(Bobcat.Repeatable), Bobcat.SubMenu = function(t) {
function n(t) {
this.add = e(this.add, this), t.subItemClassName = "SubMenuItem", n.__super__.constructor.call(this, this, t), 
this.rootLastData = t;
}
return o(n, t), n.prototype.add = function(e) {
return n.__super__.add.call(this, e), this.selected().edit(), window.edit_page.setupTooltips(), 
window.edit_page.Event.publish("Submenu.add", {}), window.edit_page.track("Editor - Add External Link");
}, n;
}(Bobcat.Repeatable), Bobcat.SubMenuItem = function(t) {
function n() {
return this.remove = e(this.remove, this), this.select = e(this.select, this), this.editDone = e(this.editDone, this), 
this.edit = e(this.edit, this), n.__super__.constructor.apply(this, arguments);
}
return o(n, t), n.prototype.edit = function() {
return this.gotoState("editor");
}, n.prototype.editDone = function() {
return this.gotoState("normal"), this.parent.selected(null);
}, n.prototype.select = function(e) {
return this.isSelected() ? this.parent.selected(null) :(n.__super__.select.call(this, e), 
this.edit());
}, n.prototype.remove = function(e) {
return window.edit_page.removeTooltips(), n.__super__.remove.call(this, e), window.edit_page.Event.publish("Submenu.remove", {});
}, n;
}(Bobcat.RepeatableItem), Bobcat.Gallery = function(t) {
function n(t, o) {
var i, r, a = this;
this.root = t, this.prevImage = e(this.prevImage, this), this.nextImage = e(this.nextImage, this), 
this.changeImage = e(this.changeImage, this), this.errorCallback = e(this.errorCallback, this), 
this.upload = e(this.upload, this), this.clickRemoveCurrentHandler = e(this.clickRemoveCurrentHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.mouseleaveHandler = e(this.mouseleaveHandler, this), 
this.mouseenterHandler = e(this.mouseenterHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.add = e(this.add, this), r = {
sources:{
create:function(e) {
return new Bobcat.Image(a.root, e.data, {}, a);
}
}
}, n.__super__.constructor.call(this, this.root, o, r), this.nullImage = new Bobcat.Image(this.root, {
type:"Image",
url:"",
caption:"",
description:""
}, {}, this), i = function() {
return "";
}, this.emptyImage = {
url:i,
caption:i,
description:i
}, this.current = ko.observable(), this.sources().length ? this.current(this.sources()[0]) :this.current(this.nullImage), 
this.empty = ko.dependentObservable(function() {
return 0 === a.sources().length;
}, this);
}
return o(n, t), n.include(Bobcat.ImageOptionHelper), n.StripHtml = function(e) {
return Bobcat.DOM.GALLERY_IMAGES(e).remove(), Bobcat.DOM.GALLERY_IMAGES_EDITOR(e).remove();
}, n.prototype.add = function(e) {
var t;
return console.log("Gallery#add"), t = new Bobcat.Image(this.root, e, {}, this), 
this.sources.push(t), this.current(t), this.storeCommand();
}, n.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, n.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, n.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, n.prototype.clickEditorHandler = function(e) {
return this.current(e), this.gotoState("editor");
}, n.prototype.clickRemoveCurrentHandler = function() {
return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)), 
this.gotoState("normal");
}, n.prototype.upload = function(e) {
var t, o, n = this;
return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
void 0) :(o = {
multiple:!0,
maxSize:6291456,
maxFiles:50,
container:"s-upload-iframe",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, t = new Bobcat.AssetDialog({
mode:"multi",
hideTabs:[ $B.AssetDialog.ICON_LIB ]
}, function(t) {
var o, i, r, a, s, l;
for (o = e.closest("form"), r = n.getOptions(o), l = [], a = 0, s = t.length; s > a; a++) i = t[a], 
l.push(n.add({
url:$.cloudinary.url("" + i.public_id + "." + i.format, r.custom),
thumb_url:$.cloudinary.url("" + i.public_id + "." + i.format, r.thumb)
}));
return l;
}), filepicker.pickAndStore(o, window.store_options, function(o) {
var i, r, a, s, l, c;
for (window.edit_page.isLoading(!0), console.log(o), i = e.closest("form"), t.closeAssetDialog(), 
a = o.length, c = [], s = 0, l = o.length; l > s; s++) r = o[s], c.push(function(e) {
return $.ajax({
url:"/r/v1/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:e,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
var t, o;
return o = function(e) {
var t, o;
return o = n.getOptions(i), t = e.message, n.add({
url:$.cloudinary.url("" + t.public_id + "." + t.format, o.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, o.thumb)
}), a--, 0 === a ? (window.edit_page.isLoading(!1), window.edit_page.track("Editor - Upload Image Gallery"), 
window.edit_page.save(!0)) :void 0;
}, t = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm", $B.poller(t, o, n.errorCallback);
},
error:function() {
return $B.customAlert("Sorry, there was an error processing your upload! Our engineers are investigating this issue!"), 
new $B.ExceptionReporter("STRIKINGLY FAILED TO UPLOAD IMAGES: " + JSON.stringify(e) + ", Response: " + JSON.stringify(resp)).report(), 
n.errorCallback();
}
});
}(r));
return c;
}, function(e) {
return e = e.toString(), t.closeAssetDialog(), $B.customAlert("Sorry, there was an error processing your upload! Please copy the following message and contact support: " + e), 
new $B.ExceptionReporter("FILEPICKER FAILED TO UPLOAD IMAGES CAUSED BY: " + e).report();
}), t.openAssetDialog());
}, n.prototype.errorCallback = function() {
return window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
}, n.prototype.changeImage = function(e) {
var t;
return t = (this.sources.indexOf(this.current()) + e) % this.sources().length, 0 > t && (t += this.sources().length), 
this.current(this.sources()[t]);
}, n.prototype.nextImage = function() {
return this.changeImage(1);
}, n.prototype.prevImage = function() {
return this.changeImage(-1);
}, n.prototype.isLastElement = function(e) {
return e.parent().find(".thumb").index(e) === this.sources().length - 1;
}, n.prototype.afterRender = function(e) {
var t;
return this.isLastElement($(e)) ? (t = Bobcat.DOM.GALLERY($(e)), t.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
})) :void 0;
}, n;
}(Bobcat.Component), Bobcat.Button = function(t) {
function n(t, o) {
this.root = t, this.toggleTarget = e(this.toggleTarget, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.changeUrl = e(this.changeUrl, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.link_url = e(this.link_url, this), this.target = e(this.target, this), "undefined" == typeof o.new_target && (o.new_target = !0), 
n.__super__.constructor.call(this, this.root, o, {});
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.target = function() {
return this.new_target() && "" !== this.url() ? "_blank" :"_self";
}, n.prototype.link_url = function() {
var e;
return e = this.url(), this.addProtocol(e);
}, n.prototype.doneClickHandler = function(e) {
var t;
return t = this.addProtocol(this.url()), this.url(t), n.__super__.doneClickHandler.call(this, e);
}, n.prototype.changeUrl = function(e) {
return this.url(e.attr("data-url"));
}, n.prototype.remove = function(e) {
return this.text(""), this.url(""), this.new_target(!1), this.doneClickHandler(e);
}, n.prototype.hasContent = function() {
return this.text().length > 0;
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n.prototype.clickEditorHandler = function(e) {
return this.oldText = this.text(), this.oldUrl = this.url(), n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.text(this.oldText), this.url(this.oldUrl), this.hideEditorHandler();
}, n.prototype.toggleTarget = function() {
return this.new_target(!this.new_target());
}, n;
}(Bobcat.Component), Bobcat.Image = function(t) {
function n(t, o, i, r) {
var a = this;
this.root = t, this.parent = r, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.clickRemoveHandler = e(this.clickRemoveHandler, this), this.clickGalleryEditorHandler = e(this.clickGalleryEditorHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.addFilter = e(this.addFilter, this), this.uploadFile = e(this.uploadFile, this), 
this.errorCallback = e(this.errorCallback, this), this.upload = e(this.upload, this), 
this.link = e(this.link, this), this.selectImage = e(this.selectImage, this), this.recover = e(this.recover, this), 
this.previewImage = e(this.previewImage, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.showDescriptionInput = e(this.showDescriptionInput, this), this.openAssetLib = e(this.openAssetLib, this), 
this.openDescriptionInput = e(this.openDescriptionInput, this), this.showLinkInput = e(this.showLinkInput, this), 
this.openLinkInput = e(this.openLinkInput, this), this.goToDescriptionField = e(this.goToDescriptionField, this), 
this.goToLinkUrlField = e(this.goToLinkUrlField, this), this.target = e(this.target, this), 
this.isNull(o.original_url) && (o.original_url = o.url), this.isNull(o.new_target) && (o.new_target = !0), 
o.linkInputEnabled = o.link_url ? o.link_url.length > 0 :!1, o.descriptionInputEnabled = o.caption ? o.caption.length > 0 :!1, 
this.isNull(o.caption) && (o.caption = ""), this.isNull(o.description) && (o.description = ""), 
n.__super__.constructor.call(this, this.root, o, i), this.parent && (this.selected = ko.dependentObservable(function() {
return a === a.parent.current();
}, this)), this.assetUrl = ko.dependentObservable(function() {
return window.asset_path(a.url());
}, this), this.loadingSpinner = !0;
}
return o(n, t), n.include(Bobcat.UrlHelper), n.include(Bobcat.ImageOptionHelper), 
n.prototype.target = function() {
return this.new_target() && "" !== this.link_url() ? "_blank" :"_self";
}, n.prototype.goToLinkUrlField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find(".link_url").focus(), window.el = t;
}, n.prototype.goToDescriptionField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find("textarea").focus(), window.el = t;
}, n.prototype.openLinkInput = function() {
return this.linkInputEnabled(!0);
}, n.prototype.showLinkInput = function() {
return this.linkInputEnabled();
}, n.prototype.openDescriptionInput = function() {
return this.descriptionInputEnabled(!0);
}, n.prototype.openAssetLib = function(e, t) {
return this.upload(e, t, !0), window.edit_page.track("Click More Icons Button - Editor v1");
}, n.prototype.showDescriptionInput = function() {
return this.descriptionInputEnabled();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("ImageComponent.afterChange", {
target:e.closest(".image-component")
});
}, n.prototype.previewImage = function(e) {
return this.tmpUrl || (this.tmpUrl = this.url()), this.url(e.attr("data-image-url")), 
this.onPreview = !0;
}, n.prototype.recover = function() {
return this.onPreview ? (this.url(this.tmpUrl), this.tmpUrl = "") :void 0;
}, n.prototype.selectImage = function(e) {
return this.url(e.attr("data-image-url")), this.tmpUrl = "", this.onPreview = !1, 
this.doneClickHandler(e.closest(".editor").find(".se-done-btn").first());
}, n.prototype.link = function() {
var e;
return e = this.link_url(), this.addProtocol(e);
}, n.prototype.upload = function(e, t, o) {
var n, i, r, a = this;
return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
void 0) :($B.log(window.filepicker_options), r = {
maxSize:6291456,
container:"s-upload-iframe",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, i = {
mode:"single"
}, null != o ? (i.initialTabIdx = 2, i.iconLibComponents = o === !0 ? "icon" :"background") :"BackgroundImage" === this.type() ? i.iconLibComponents = "background" :"Image" === this.type() && (i.iconLibComponents = "icon"), 
n = new Bobcat.AssetDialog(i, function(t) {
var o;
return o = a.getOptions(e.closest("form")), null != t.public_id ? ("BackgroundImage" === a.type() && "gif" !== t.format && (t.format = "jpg", 
o.custom.quality = 90, o.custom.flags = "progressive"), a.loadData({
url:$.cloudinary.url("" + t.public_id + "." + t.format, o.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, o.thumb),
original_url:t.url
})) :(a.loadData({
url:t.url,
thumb_url:t.thumb_url,
original_url:t.url
}), "BackgroundImage" === a.type() && null != t.extraOptions && (null != t.extraOptions.backgroundClassName && a.selectedClassName(t.extraOptions.backgroundClassName), 
null != t.extraOptions.backgroundSizing && a.style(t.extraOptions.backgroundSizing))), 
"BackgroundImage" === a.type() ? window.edit_page.Event.publish("Background.changeBackgroundImage") :void 0;
}), filepicker.pickAndStore(r, window.store_options, function(t) {
var o, i;
return i = t[0], o = e.closest("form"), window.edit_page.isLoading(!0), a.oldUrl = a.url(), 
a.loadingSpinner && a.url($('meta[name="loading-image-spinner"]').attr("content")), 
a.uploadFile(i, a.getOptions(o)), n.closeAssetDialog();
}, function(e) {
return e = e.toString(), n.closeAssetDialog(), $B.customAlert("Sorry, there was an error processing your upload! Please copy the following message and contact support: " + e), 
new $B.ExceptionReporter("FILEPICKER FAILED TO UPLOAD IMAGES CAUSED BY: " + e).report();
}), n.openAssetDialog());
}, n.prototype.errorCallback = function(e) {
return this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
window.edit_page.track("Editor - UploadErrors", e.responseText);
}, n.prototype.uploadFile = function(e, t) {
var o = this;
return $.ajax({
url:"/r/v1/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:e,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
var n, i;
return i = function(e) {
var n;
return n = e.message, "BackgroundImage" === o.type() && "gif" !== n.format && (n.format = "jpg", 
t.custom.quality = 90, t.custom.flags = "progressive"), o.loadData({
url:$.cloudinary.url("" + n.public_id + "." + n.format, t.custom),
thumb_url:$.cloudinary.url("" + n.public_id + "." + n.format, t.thumb),
original_url:n.url
}), window.edit_page.isLoading(!1), window.edit_page.track("Editor - Upload Image"), 
"BackgroundImage" === o.type() ? (o.oldUrl = o.url(), window.edit_page.Event.publish("Background.changeBackgroundImage"), 
o.storeCommand()) :void 0;
}, console.log("Begin poll"), n = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm", 
$B.poller(n, i, o.errorCallback);
},
error:this.errorCallback
});
}, n.prototype.addFilter = function(e) {
var t, o, n = this;
return "undefined" == typeof window.featherEditor || "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.effects_network_error")), 
void 0) :(o = "free" === $S.user_meta.plan ? [ "effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast" ] :[ "enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish" ], 
t = function(e) {
return e = window.asset_path(e), e.replace("https", "http");
}, window.featherEditor.launch({
tools:o,
onSave:function(t, o) {
var i;
return window.edit_page.isLoading(!0), n.oldUrl = n.url(), n.loadingSpinner && n.url($('meta[name="loading-image-spinner"]').attr("content")), 
window.featherEditor.close(), i = e.closest("form"), n.uploadFile({
url:o,
persist:"no"
}, n.getOptions(i));
},
image:e.closest("form").find("img"),
url:t(this.url())
}));
}, n.prototype.clickEditorHandler = function(e) {
return this.oldUrl = this.url(), this.oldThumbUrl = this.thumb_url(), n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.url(this.oldUrl), this.thumb_url(this.oldThumbUrl), this.hideEditorHandler();
}, n.prototype.clickGalleryEditorHandler = function(e) {
return this.parent ? (this.parent.current(this), this.parent.gotoState("editor"), 
setTimeout(function() {
return $(window).scrollTo(e.closest(".editable").find(".editor"), {
easing:"easeOutQuint",
duration:300,
axis:"y",
offset:-150
});
}, 200)) :void 0;
}, n.prototype.clickRemoveHandler = function() {
return this.parent.sources.remove(this), this.parent.storeCommand();
}, n.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.thumb_url(this.TRANSPARENT_IMAGE_URL);
}, n.prototype.hasContent = function() {
return !this.isImageTransparent(this.url());
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n;
}(Bobcat.Component), Bobcat.TextStyle = function(e) {
function t(e, o, n) {
this.root = e, this.parent = n, t.__super__.constructor.call(this, this.root, o, {});
}
return o(t, e), t;
}(Bobcat.Component), Bobcat.BackgroundImage = function(t) {
function n(t, o) {
var i, r, a, s, l, c = this;
if (this.root = t, this.onDoneHandler = e(this.onDoneHandler, this), this.onClickHandler = e(this.onClickHandler, this), 
this.saveSelection = e(this.saveSelection, this), this.selectImage = e(this.selectImage, this), 
this.stockImages = e(this.stockImages, this), this.bgObject = e(this.bgObject, this), 
this.recover = e(this.recover, this), this.previewImage = e(this.previewImage, this), 
this.remove = e(this.remove, this), this.selectedStyleLazy = e(this.selectedStyleLazy, this), 
this.selectedStyle = e(this.selectedStyle, this), this.textStyle = e(this.textStyle, this), 
this.inImageMode = e(this.inImageMode, this), this.getSelectedClassName = e(this.getSelectedClassName, this), 
this.selectBackgroundVariation = e(this.selectBackgroundVariation, this), this.previewBackgroundVariation = e(this.previewBackgroundVariation, this), 
this.uploadFromLib = e(this.uploadFromLib, this), this.hasBackgroundVariations = e(this.hasBackgroundVariations, this), 
r = {}, r.textStyles = {
create:function(e) {
return new Bobcat.TextStyle(c.root, e.data, c);
}
}, "undefined" != typeof o.textStyles && o.textStyles && o.selectedClassName || (o.textStyles = [], 
o.textStyles.push({
type:"TextStyle",
displayName:"Light Text",
colorCode:"#ffffff",
className:"strikingly-light-text"
}), o.textStyles.push({
type:"TextStyle",
displayName:"Dark Text",
colorCode:"#222222",
className:"strikingly-dark-text"
}), o.selectedClassName = "strikingly-light-text"), null == o.backgroundVariation && (o.backgroundVariation = ""), 
this.backgroundVariations = [], null != $S.conf.theme_background_variations) {
l = $S.conf.theme_background_variations;
for (i in l) s = l[i], a = $.extend(!0, {}, s), a.component = this, this.backgroundVariations.push(a);
}
n.__super__.constructor.call(this, this.root, o, r, null), this.opacity_f = ko.dependentObservable(function() {
return c.opacity() / 100;
}), this.onPreview = !1, this.formOpen = ko.observable(!1), this.loadingSpinner = !1, 
this.selectedClassName.subscribe(function(e) {
return c.triggerEvent("BackgroundImage.ChangeTextColor", e);
});
}
return o(n, t), n.prototype.hasBackgroundVariations = function() {
return this.backgroundVariations.length > 0;
}, n.prototype.uploadFromLib = function(e) {
return this.upload(e, null, !1);
}, n.prototype.previewBackgroundVariation = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.onPreview = !0;
}, n.prototype.selectBackgroundVariation = function(e) {
var t;
return this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.saveSelection(), this.onPreview = !1, "function" == typeof (t = window.edit_page).track && t.track("Change Variation - Background - Editor v1"), 
this.triggerEvent("BackgroundImage.ChangeVariation", e), window.edit_page.Event.publish("Background.changeBackgroundVariation", {
target:e
});
}, n.prototype.getSelectedClassName = function() {
return !window.edit_page.isShowPage && this.hasBackgroundVariations() ? this.hasContent() ? this.selectedClassName() :this.backgroundVariation() :"" !== ("function" == typeof this.backgroundVariation ? this.backgroundVariation() :void 0) ? this.backgroundVariation() :!this.hasBackgroundVariations() || this.hasContent() ? this.selectedClassName() :"";
}, n.prototype.inImageMode = function() {
return this.hasBackgroundVariations() ? this.hasContent() || this.onPreview ? !0 :!1 :!0;
}, n.prototype.textStyle = function() {
var e, t = this;
return e = this.textStyles().filter(function(e) {
return e.className() === t.selectedClassName();
}), e[0];
}, n.prototype.selectedStyle = function() {
var e, t, o;
return t = function() {
switch (this.style()) {
case "cover":
return "cover";

case "contain":
return "contain";

case "100%":
return "100%";

case "stretch":
return "100%";

case "fit":
return "cover";

default:
return "auto";
}
}.call(this), e = function() {
switch (this.style()) {
case "tile":
return "repeat";

default:
return "no-repeat";
}
}.call(this), o = {
backgroundPosition:"49% 50%",
backgroundImage:"url(" + this.assetUrl() + ")",
backgroundRepeat:e,
backgroundSize:t
};
}, n.prototype.selectedStyleLazy = function() {
var e;
return e = this.selectedStyle(), e.backgroundImage = "url(" + asset_path("/assets/icons/transparent.png") + ")", 
e;
}, n.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.storeCommand();
}, n.prototype.previewImage = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.onPreview = !0;
}, n.prototype.recover = function() {
return this.onPreview ? (this.url(this.oldUrl), this.style(this.oldStyle), this.backgroundVariation(this.oldBackgroundVariation), 
this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", this.onPreview = !1) :void 0;
}, n.prototype.bgObject = function(e) {
return {
url:"http://uploads.striking.ly/page/images/backgrounds/" + e + ".jpg",
thumbUrl:"http://uploads.striking.ly/page/images/backgrounds/" + e + "-thumb.jpg",
style:"stretch",
component:this
};
}, n.prototype.stockImages = function(e) {
var t, o, n, i, r, a, s, l, c;
if ("solidBanner" === e) {
for (a = [ "banners/banner1", "bg3", "banners/banner3" ], l = [], o = 0, i = a.length; i > o; o++) t = a[o], 
l.push(this.bgObject(t));
return l;
}
for (s = [ "bg1", "bg5", "bg6" ], c = [], n = 0, r = s.length; r > n; n++) t = s[n], 
c.push(this.bgObject(t));
return c;
}, n.prototype.selectImage = function(e) {
return this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.saveSelection(), 
this.triggerEvent("BackgroundImage.SelectImage", e);
}, n.prototype.saveSelection = function() {
return this.storeCommand(), this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", 
this.onPreview = !1, window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved();
}, n.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().find(".background-form"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, n.prototype.onDoneHandler = function(e) {
var t;
return t = e.closest(".background-form"), t.slideUp(), window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved(), this.formOpen(!1);
}, n;
}(Bobcat.Image), Bobcat.SlideSettings = function(e) {
function t() {
return t.__super__.constructor.apply(this, arguments);
}
return o(t, e), t;
}(Bobcat.Component), Bobcat.Menu = function(e) {
function t(e) {
var o, n = this;
this.data = e, o = {}, o.components = {
create:function(e) {
var t, o, i, r;
o = {}, o.firstSlideBackground = function(e) {
return null == e && (e = "background1"), window.edit_page.data.slides()[0].components[e];
}, r = e.data;
for (t in r) i = r[t], o[t] = "Image" === i.type ? new Bobcat[i.type](n, i, {}, null) :new Bobcat[i.type](n, i), 
"undefined" != typeof o[t].init && o[t].init();
return o;
}
}, t.__super__.constructor.call(this, this, this.data, o), this.rootLastData = this.data;
}
return o(t, e), t.prototype.bind = function(e) {
var t, o, n, i;
if (e.length > 0) {
for (i = [], o = 0, n = e.length; n > o; o++) t = e[o], i.push(ko.applyBindings(this.components, t));
return i;
}
return console.warn("Cannot find .navigator");
}, t.prototype.hideAllEditors = function() {
return this.logo.hideEditorHandler();
}, t;
}(Bobcat.Component), Bobcat.Footer = function(e) {
function t(e) {
var o, n = this;
o = {
socialMedia:{
create:function(e) {
return new Bobcat[e.data.type](n, e.data, n);
}
},
copyright:{
create:function(e) {
return new Bobcat[e.data.type](n, e.data, n);
}
}
}, t.__super__.constructor.call(this, this, e, o), this.rootLastData = e;
}
return o(t, e), t.prototype.lastSlideBackground = function(e) {
var t;
return null == e && (e = "background1"), t = window.edit_page.data.slides().length - 1, 
window.edit_page.data.slides()[t].components[e];
}, t.prototype.bind = function(e) {
return e.length > 0 ? (ko.applyBindings(this, e.get(0)), this.socialMedia.bind()) :console.warn("Cannot find #footer");
}, t;
}(Bobcat.Component), Bobcat.Media = function(t) {
function n(t, o) {
var i, r = this;
this.root = t, this.inEditorAndHasNoContent = e(this.inEditorAndHasNoContent, this), 
this.hasNoContentAndIsEditMode = e(this.hasNoContentAndIsEditMode, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.showImage = e(this.showImage, this), 
this.showVideo = e(this.showVideo, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
i = {
video:{
create:function(e) {
return new Bobcat.Video(r.root, e.data, r);
}
},
image:{
create:function(e) {
return new Bobcat.Image(r.root, e.data, {}, r);
}
}
}, n.__super__.constructor.call(this, this.root, o, i);
}
return o(n, t), n.prototype.clickEditorHandler = function(e) {
return n.__super__.clickEditorHandler.call(this, e), this.image.clickEditorHandler(e), 
this.video.clickEditorHandler(e), this.triggerEvent("Media.BeforeChange", {
target:e
});
}, n.prototype.clickCancelEditorHandler = function(e) {
return this.image.clickCancelEditorHandler(e), this.video.clickCancelEditorHandler(e), 
this.hideEditorHandler();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("Media.afterChange"), 
this.triggerEvent("Media.AfterChange", {
target:e
});
}, n.prototype.showVideo = function() {
return "video" === this.current() && this.video.html() && this.video.html().length > 0;
}, n.prototype.showImage = function() {
return "image" === this.current();
}, n.prototype.hasContent = function() {
return "video" === this.current() && this.video.html() || "image" === this.current() && this.image.url() && !this.isImageTransparent(this.image.url());
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n.prototype.hasNoContentAndIsEditMode = function() {
return !window.edit_page.isShowPage && !this.hasContent();
}, n.prototype.inEditorAndHasNoContent = function() {
return !this.isState("editor") && ("video" === this.current() && (!this.video.html() || 0 === this.video.html().length) || "image" === this.current() && 0 === this.image.url().length);
}, n;
}(Bobcat.Component), Bobcat.EmailForm = function(t) {
function n(t, o) {
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasMessageBox = e(this.hasMessageBox, this), 
this.hasNameBox = e(this.hasNameBox, this), this.hasEmailBox = e(this.hasEmailBox, this), 
this.isEmailInvalid = e(this.isEmailInvalid, this), this.isNameEmpty = e(this.isNameEmpty, this), 
this.isSuccess = e(this.isSuccess, this), this.isError = e(this.isError, this), 
this.submit = e(this.submit, this), o.isLoading = !1, o.recipient || (o.recipient = ""), 
this.isNull(o.hideMessageBox) && (o.hideMessageBox = !1), this.isNull(o.hide_name) && (o.hide_name = !1), 
this.isNull(o.hide_email) && (o.hide_email = !1), this.isNull(o.thanksMessage) && (o.thanksMessage = "Thanks for your message!"), 
null == $S.page_meta.edit_count && $S.page_meta.show_strikingly_logo && (o.thanksMessage = $("#brand-info").html().replace(/\${thanksMessage}/, o.thanksMessage)), 
this.isNull(o.name_label) && (o.name_label = "Name", o.email_label = "Email", o.message_label = "Message"), 
this.isNull(o.submit_label) && (o.submit_label = "Submit"), n.__super__.constructor.call(this, this.root, o, {}), 
this.status = ko.observable(""), this.invalidEmail = ko.observable(!1), this.invalidName = ko.observable(!1);
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.isRecipientEmailValid = function() {
return 0 === this.recipient().length || this.isEmail(this.recipient());
}, n.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, n.prototype.submit = function(e) {
var t = this;
if (window.edit_page.isShowPage) return this.reset(), this.isLoading(!0), e.closest("form").ajaxSubmit({
success:function(e) {
return console.log(e), t.status(e.status), t.isLoading(!1), _gaq.push([ "_trackEvent", "Actions", "EmailCollected" ]), 
_gaq.push([ "b._trackEvent", "Actions", "EmailCollected" ]), window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(e) {
var o;
if (o = jQuery.parseJSON(e.responseText), console.log(o), t.status(o.status), t.isLoading(!1), 
!o.message) throw alert(o.html), o.html;
return o.message.invalid_email && t.invalidEmail(!0), o.message.invalid_name ? t.invalidName(!0) :void 0;
}
});
}, n.prototype.isError = function() {
return "error" === this.status();
}, n.prototype.isSuccess = function() {
var e;
return e = this.status(), "ok" === e;
}, n.prototype.isNameEmpty = function() {
return this.invalidName();
}, n.prototype.isEmailInvalid = function() {
return this.invalidEmail();
}, n.prototype.hasEmailBox = function() {
return !this.hide_email();
}, n.prototype.hasNameBox = function() {
return !this.hide_name();
}, n.prototype.hasMessageBox = function() {
return !this.hideMessageBox();
}, n.prototype.clickEditorHandler = function(e) {
return n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e), window.edit_page.track("Edit Contact Form - Editor v1");
}, n;
}(Bobcat.Component);
}.call(this), function() {
var e, t = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, o = {}.hasOwnProperty, n = function(e, t) {
function n() {
this.constructor = e;
}
for (var i in t) o.call(t, i) && (e[i] = t[i]);
return n.prototype = t.prototype, e.prototype = new n(), e.__super__ = t.prototype, 
e;
};
e = function(e) {
var t, o, n, i, r, a, s, l, c;
if (null != (c = $S.conf) ? c.font_size :void 0) return t = [ 60, 80, 100, 130, 160 ], 
n = 14, o = 84, a = function(e) {
var t, o;
return t = 100, o = parseFloat($(e.getBody()).css("font-size")), $(e.getBody()).find("*").each(function() {
var e, n;
return e = null != (n = this.style) ? n.fontSize :void 0, -1 !== (null != e ? e.indexOf("%") :void 0) ? (t = parseFloat(e), 
o = parseFloat($(this).css("font-size")), !1) :void 0;
}), {
perc:t,
px:o
};
}, r = function(e, i) {
var r, s, l;
return s = a(e), s.px >= o && i > 0 ? !1 :s.px <= n && 0 > i ? !1 :(l = $.inArray(s.perc, t), 
-1 === l && (l = $.inArray(100, t)), r = l + i, r > t.length - 1 ? !1 :0 > r ? !1 :t[r] + "%");
}, l = function(e, t) {
var o;
return o = e.selection.getBookmark(), e.selection.select(e.getBody(), !0), e.execCommand("FontSize", null, t), 
e.execCommand("LineHeight", null, t), e.selection.moveToBookmark(o);
}, s = function(e) {
var t;
return (t = r(e, 1)) ? (l(e, t), window.analytics.track("Font Size Up - Editor v1")) :void 0;
}, i = function(e) {
var t;
return (t = r(e, -1)) ? (l(e, t), window.analytics.track("Font Size Down - Editor v1")) :void 0;
}, e.addButton("fontsizeup", {
title:"Increase Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-up.png"),
onclick:function() {
return s(e);
}
}), e.addButton("fontsizedown", {
title:"Decrease Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-down.png"),
onclick:function() {
return i(e);
}
}), e.onExecCommand.add(function(e, t) {
var o;
return "InsertUnorderedList" === t || "InsertOrderedList" === t ? (o = r(e, 0), 
$(e.getBody()).find("li *").each(function() {
var e, t;
return (null != (e = this.style) ? null != (t = e.fontSize) ? t.indexOf(!0) :void 0 :void 0) ? this.style.fontSize = "" :void 0;
}), l(e, o)) :void 0;
});
}, $B.RichText = function(o) {
function i(e, o) {
this.root = e, this.isCenterAligned = t(this.isCenterAligned, this), this.isRightAligned = t(this.isRightAligned, this), 
this.isLeftAligned = t(this.isLeftAligned, this), this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), 
this.showEmptyText = t(this.showEmptyText, this), this.hasContent = t(this.hasContent, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.changeFontHandler = t(this.changeFontHandler, this), 
this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), this.textValue = t(this.textValue, this), 
this.doneClickHandler = t(this.doneClickHandler, this), this._triggerEvent = t(this._triggerEvent, this), 
this.deleteHandler = t(this.deleteHandler, this), i.__super__.constructor.call(this, this.root, o), 
this.textarea = null, this.editor = null, this.originText = null;
}
return n(i, o), i.TINYMCE_OPTIONS = {
gecko_spellcheck:!0,
theme:"advanced",
skin:"striking",
plugins:"autoresize,paste,inlinepopups",
forced_root_block:"div",
remove_linebreaks:!1,
theme_advanced_buttons1:"bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull,fontsizeup,fontsizedown",
theme_advanced_buttons2:"",
theme_advanced_statusbar_location:"none",
theme_advanced_toolbar_align:"left",
paste_text_sticky:!0,
paste_remove_styles:!0,
paste_strip_class_attributes:"all",
convert_urls:!1,
relative_urls:!1,
valid_styles:{
"*":"text-align,text-decoration,font-size"
}
}, i.prototype.deleteHandler = function(e, t) {
return t.stopPropagation(), this.editor && this.editor.tinymce() ? (this.editor.tinymce().setContent(""), 
this.editor.tinymce().focus()) :void 0;
}, i.prototype.init = function() {}, i.prototype._triggerEvent = function(e, t) {
return this.triggerEvent(e, {
component:this,
target:t.closest(".text-component")
});
}, i.prototype.doneClickHandler = function(e) {
return this.done(), i.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("RichTextComponent.afterTextChange", {
target:e.closest(".text-component")
}), this._triggerEvent("Text.Save", e);
}, i.prototype.textValue = function() {
return this.value().replace(/<\/?.*?>/g, "");
}, i.prototype.clickCancelEditorHandler = function(e) {
return this.cancel(), this.hideEditorHandler(), this._triggerEvent("Text.Cancel", e);
}, i.prototype.changeFontHandler = function(e) {
return this.doneClickHandler(e), window.edit_page.showStylePanel(e.attr("text-type")), 
window.edit_page.showMenu(), this._triggerEvent("Text.ChangeFont", e);
}, i.prototype.clickEditorHandler = function(t) {
var o = this;
if (i.__super__.clickEditorHandler.call(this, t)) return this.textarea = t.find($B.DOM.EDITOR).find("textarea"), 
this.originText = this.filterText(this.textarea.val()), this.editor && this.editor.tinymce() || (this.editor = this.textarea.tinymce($.extend({
setup:function(n) {
return n.onChange.add(function() {
return o._triggerEvent("Text.ChangeText", t);
}), e(n), n.onInit.add(function(e) {
return $(e.getBody()).css({
"font-size":t.css("font-size"),
"text-align":t.css("text-align")
}), e.pasteAsPlainText = !0;
}), n.onKeyDown.add(function(e, t) {
return 13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor() ? t.preventDefault() :void 0;
}), n.onClick.add(function(e) {
return $(e.getBody()).find("a").each(function(e, t) {
var n;
return n = $(t).attr("href"), o.pattern || (o.pattern = new RegExp("^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")), 
o.pattern.test(n) ? ($(t).attr("href", "http://" + n), $(t).attr("data-mce-href", "http://" + n)) :void 0;
});
});
}
}, this.constructor.TINYMCE_OPTIONS))), this.editor.tinymce() && this.editor.tinymce().focus(), 
this.editor.init(), this._triggerEvent("Text.ClickEditor", t);
}, i.prototype.hasContent = function() {
return !/^\s*$/.test(this.value());
}, i.prototype.showEmptyText = function() {
return !this.hasContent() && !this.isState("editor");
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i.prototype.isLeftAligned = function() {
return /style="text-align: left;"/.test(this.value());
}, i.prototype.isRightAligned = function() {
return /style="text-align: right;"/.test(this.value());
}, i.prototype.isCenterAligned = function() {
return /style="text-align: center;"/.test(this.value());
}, i.prototype.done = function() {
var e;
return this.editor && this.editor.tinymce() ? (e = this.filterText(this.textarea.val()), 
this.value(e), this.originText = e) :void 0;
}, i.prototype.filterText = function(e) {
return e = e.replace(/^<div>(\s|&nbsp;)?<\/div>$/, ""), e.replace("<p><br></p>", "");
}, i.prototype.cancel = function() {
return this.editor && this.editor.tinymce() ? (this.value(this.originText), this.textarea.tinymce().execCommand("mceSetContent", !1, this.originText)) :void 0;
}, i.prototype.beforeMoveHandler = function() {
return this.editor && this.editor.tinymce() ? (this.editor.tinymce().remove(), this.gotoState("normal")) :void 0;
}, i.prototype.afterMoveHandler = function() {}, i;
}($B.Text);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var i in o) t.call(o, i) && (e[i] = o[i]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
Bobcat.HtmlComponent = function(t) {
function n(t, o) {
this.root = t, this.saveComponent = e(this.saveComponent, this), this.reloadIframe = e(this.reloadIframe, this), 
this.doneClickHandler = e(this.doneClickHandler, this), this.update = e(this.update, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.initWhenBound = e(this.initWhenBound, this), 
this.destroy = e(this.destroy, this), this.data = o, o.htmlValue = this.htmlDecode(o.value), 
o.selected_app_name || (o.selected_app_name = null), "undefined" == typeof o.render_as_iframe && (o.render_as_iframe = !1), 
o.app_list || (o.app_list = "{}"), o.editorIframeSrc = o.selected_app_name ? "/s/html_editor/" + o.id :"/s/editor/app_store_placeholder", 
n.__super__.constructor.call(this, this.root, o, {}), this.appList = jQuery.parseJSON(o.app_list), 
this.originalIframeSrc = this.editorIframeSrc();
}
return o(n, t), n.include(Bobcat.HtmlHelper), n.prototype.destroy = function() {
var e;
return e = $.ajax("/s/components/" + this.id(), {
type:"DELETE",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function() {},
error:function(e) {
var t;
return t = jQuery.parseJSON(e.responseText);
}
});
}, n.prototype.initWhenBound = function(e) {
var t;
return t = e.parent().find("iframe").first(), Bobcat.TH.resizeIFrame(t);
}, n.prototype.clickEditorHandler = function() {
var e, t, o = this;
return t = {
id:this.id(),
value:this.value(),
htmlValue:this.htmlValue(),
render_as_iframe:this.render_as_iframe(),
app_list:this.app_list(),
selected_app_name:this.selected_app_name()
}, e = new $B.AppStoreDialog(t, function(t) {
return o.update(t), e.close();
}, function() {
return e.close();
});
}, n.prototype.update = function(e) {
return e.id === this.id() ? (this.value(e.value), this.htmlValue(e.htmlValue), this.render_as_iframe(e.render_as_iframe), 
this.app_list(e.app_list), this.selected_app_name(e.selected_app_name), this.saveComponent(), 
window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand()) :void 0;
}, n.prototype.doneClickHandler = function(e) {
return this.done(e) !== !1 ? n.__super__.doneClickHandler.call(this, e) :void 0;
}, n.prototype.cancel = function() {
return this.value(this.htmlEncode(this.originText)), this.htmlValue(this.originText);
}, n.prototype.reloadIframe = function() {
var e;
return this.iframeSrcQ || (this.iframeSrcQ = 0), e = "" + this.originalIframeSrc + "?q=" + ++this.iframeSrcQ, 
~e.indexOf("/s/editor/app_store_placeholder") && (e = "/s/html_editor/" + this.id(), 
this.originalIframeSrc = e), this.editorIframeSrc(e);
}, n.prototype.saveComponent = function() {
var e, t = this;
return e = ko.mapping.toJS(this), $.ajax("/s/components/" + this.id(), {
dataType:"json",
type:"PUT",
data:{
component:{
value:ko.toJSON(e)
}
},
success:function() {
return t.reloadIframe();
}
});
}, n;
}(Bobcat.Component);
}.call(this), function() {
ko.bindingHandlers.runWhenBound = {
init:function(e, t) {
return t()($(e));
}
}, ko.bindingHandlers.enterKey = {
init:function(e, t, o, n) {
var i, r;
return r = function(e) {
return 13 === e.which ? t().call(this, e) :void 0;
}, i = function() {
return {
keyup:r
};
}, ko.bindingHandlers.event.init(e, i, o, n);
}
}, ko.bindingHandlers.enterKeyPress = {
init:function(e, t, o, n) {
var i, r;
return r = function(o) {
return 13 === o.which ? t().call(this, o, e) :!0;
}, i = function() {
return {
keypress:r
};
}, ko.bindingHandlers.event.init(e, i, o, n);
}
}, ko.bindingHandlers.className = {
update:function(e, t) {
var o;
return e.__ko__previousClassValue__ && $(e).removeClass(e.__ko__previousClassValue__), 
o = ko.utils.unwrapObservable(t()), $(e).addClass(o), e.__ko__previousClassValue__ = o;
}
}, ko.bindingHandlers.htmlValue = {
init:function(e, t, o) {
return ko.utils.registerEventHandler(e, "blur", function() {
var n, i, r;
return r = t(), i = e.innerHTML, ko.isWriteableObservable(r) ? r(i) :(n = o(), n._ko_property_writers && n._ko_property_writers.htmlValue ? n._ko_property_writers.htmlValue(i) :void 0);
});
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), (null === o || void 0 === o) && (o = ""), 
"textarea" === e.tagName.toLowerCase() ? $(e).val(o) :e.innerHTML = o;
}
}, ko.bindingHandlers.escapedValue = {
init:ko.bindingHandlers.value.init,
update:function(e, t) {
var o, n, i;
return i = ko.utils.unwrapObservable(t()), o = /<script\b[^>]*>([\s\S]*?)<\/script>/gim, 
n = /<\/script>/gim, i && (i = i.replace(o, "").replace(n, "")), t()(i), ko.bindingHandlers.value.update(e, t);
}
}, ko.bindingHandlers.mouseenter = {
init:function(e, t) {
return $(e).mouseenter(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseleave = {
init:function(e, t) {
return $(e).mouseleave(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseover = {
init:function(e, t) {
return $(e).mouseover(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseout = {
init:function(e, t) {
return $(e).mouseout(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseclick = {
init:function(e, t) {
return $(e).click(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.fadeVisible = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().fadeTo(400, 0, function() {
return $(e).css("visibility", "hidden");
});
}
}, ko.bindingHandlers.fadeVisibleAndHide = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().hide();
}
}, ko.bindingHandlers.data = {
update:function(e, t) {
var o, n, i, r;
i = ko.utils.unwrapObservable(t()) || {}, r = [];
for (o in i) n = i[o], n = ko.utils.unwrapObservable(n), "other" === o && "bananas" !== n && console.log(n), 
r.push($(e).data(o, n));
return r;
}
}, ko.bindingHandlers.bind = {
init:function(e, t) {
var o, n, i;
return i = ko.utils.unwrapObservable(t()), o = ko.utils.unwrapObservable(i.data), 
n = ko.utils.unwrapObservable(i.html), n ? ($(e).html(n), ko.applyBindings(o, e)) :void 0;
},
update:function(e, t) {
var o, n, i;
return i = ko.utils.unwrapObservable(t()), o = ko.utils.unwrapObservable(i.data), 
n = ko.utils.unwrapObservable(i.html), n ? ($(e).html(n), ko.applyBindings(o, e)) :void 0;
}
}, ko.bindingHandlers.slideVisible = {
init:function(e, t) {
var o;
return o = t(), $(e).toggle(o), $(e).data("animating", !1);
},
update:function(e, t) {
var o;
return o = t(), o ? ($(e).data("animating", !0), $(e).stop().slideDown(600, "swing", function() {
return $(this).data("animating", !1);
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.slideVisibleAndMoveTo = {
init:function(e, t) {
var o;
return o = t(), $(e).toggle(o), $(e).data("animating", !1);
},
update:function(e, t) {
var o;
return o = t(), o ? ($(e).data("animating", !0), $("html, body").stop().animate({
scrollTop:$(e).parent().offset().top - 100
}, 1200, "easeInOutQuart", function() {
return $(e).slideDown(600, "swing", function() {
return $(this).data("animating", !1);
});
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.bannerVisible = {
init:function(e, t, o, n) {
return n.isFirst() && n.select(), $(e).show().css({
left:"0%"
});
},
update:function(e, t, o, n) {
var i, r, a, s;
if (s = $(e), a = ko.utils.unwrapObservable(t()), i = n.parent.direction(), window.lol = n.parent, 
a) {
if (n.animated) return;
return console.log("show " + n.index() + " " + i), r = i > 0 ? "100%" :"-100%", 
s.stop().css({
left:r
}).animate({
left:"0%"
}), n.animated = !0;
}
return n.animated !== !1 ? (console.log("hide " + n.index() + " " + i), r = i > 0 ? "-100%" :"100%", 
s.stop().css({
left:"0%"
}).animate({
left:r
}), n.animated = !1) :void 0;
}
}, ko.bindingHandlers.slidyButtonSlide = {
init:function() {},
update:function(e, t) {
var o, n, i;
if (i = t()) ; else if (o = $(e).children(".icon"), n = $(e).children(".title"), 
!$(e).data("mouseover")) return n.stop(!0), n.css("left", "0"), n.hide("slide", {
direction:"left"
}, 250), n.removeClass("hover"), o.removeClass("hover");
}
}, ko.bindingHandlers.slideVisibleWidth = {
init:function(e, t) {
var o;
return o = t(), $(e).toggle(o);
},
update:function(e, t) {
var o;
return o = t(), o ? $(e).show("slide", {
direction:"right"
}, 600) :$(e).hide("slide", {
direction:"right"
}, 600);
}
}, ko.bindingHandlers.theme = {
init:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).addClass(o), $(e).data("theme", o);
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).removeClass($(e).data("theme")), 
$(e).addClass(o), $(e).data("theme", o);
}
}, ko.bindingHandlers.currentDisabled = {
init:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), o && o.style && o.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), o && o.style && o.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
}
}, ko.bindingHandlers.ensureVisible = {
init:function() {},
update:function(e, t) {
var o, n, i, r, a, s;
if (ko.utils.unwrapObservable(t())) return o = $(e), n = o.parent(), s = o.position().top, 
i = s + o.height(), a = n.scrollTop(), r = n.height(), a > s || i > r ? n.scrollTo(o) :void 0;
}
}, ko.bindingHandlers.background = {
init:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).attr("src", o);
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).attr("src", o);
}
}, ko.bindingHandlers.inverseChecked = {
init:function(e, t, o) {
var n, i, r;
return r = t(), n = ko.dependentObservable({
read:function() {
return !r();
},
write:function(e) {
return r(!e);
},
disposeWhenNodeIsRemoved:e
}), i = function() {
return n;
}, ko.utils.domData.set(e, "newValueAccessor", i), ko.bindingHandlers.checked.init(e, i, o);
},
update:function(e) {
return ko.bindingHandlers.checked.update(e, ko.utils.domData.get(e, "newValueAccessor"));
}
}, ko.bindingHandlers.computedStyles = {
init:function() {}
};
}.call(this), function() {
var e, t = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
e = window.Bobcat || {}, e.SocialMediaConfig = function() {
function e(e) {
this.settings = e;
}
return e.prototype.get = function(e) {
return this.settings[e];
}, e.prototype.getDefaultButtonListData = function() {
return [ {
type:"Facebook",
show_button:!0,
url:""
}, {
type:"Twitter",
show_button:!0,
url:""
}, {
type:"GPlus",
show_button:!0,
url:""
}, {
type:"LinkedIn",
show_button:!1,
url:""
} ];
}, e.prototype.updateButtonListData = function(e) {
var o, n, i, r, a, s, l, c;
for (o = this.getDefaultButtonListData(), r = function() {
var t, o, i, r;
for (i = e.button_list, r = [], t = 0, o = i.length; o > t; t++) n = i[t], r.push(n.type);
return r;
}(), c = [], a = 0, s = o.length; s > a; a++) i = o[a], l = i.type, t.call(r, l) < 0 ? c.push(e.button_list.push(i)) :c.push(void 0);
return c;
}, e;
}();
}.call(this), function() {}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var i in o) t.call(o, i) && (e[i] = o[i]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
$B.NavbarStatic = function() {
function e() {
this.navbarDrawerItems = $(".navbar-drawer .navbar-drawer-item"), this.navbarDrawerItems.bind("click", function() {
return Bobcat.TH.toggleDrawer();
});
}
return e;
}(), $B.EmailFormStatic = function() {
function e(e) {
this.form = e.find("form"), this.formNotSuccess = e.find(".s-form-not-success"), 
this.submitButton = e.find(".s-form-click"), this.loadingIcon = e.find(".s-form-icon"), 
this.formSuccess = e.find(".s-form-success"), this.errorEmail = e.find(".s-form-error-email"), 
this.errorName = e.find(".s-form-error-name");
}
return e.prototype.init = function() {
var e = this;
return this.submitButton.bind("click", function() {
return console.log("submitButton click"), e.reset(), e.isLoading(!0), e.form.ajaxSubmit({
success:function(t) {
return console.log(t), console.log("data.status: ", t.status), e.status(t.status), 
e.isLoading(!1), _gaq.push([ "_trackEvent", "Actions", "EmailCollected" ]), _gaq.push([ "b._trackEvent", "Actions", "EmailCollected" ]), 
window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(t) {
var o;
if (console.log("submit error"), o = jQuery.parseJSON(t.responseText), console.log(o), 
e.status(o.status), e.isLoading(!1), !o.message) throw alert(o.html), o.html;
return o.message.invalid_email && e.invalidEmail(!0), o.message.invalid_name ? e.invalidName(!0) :void 0;
}
});
});
}, e.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, e.prototype.isLoading = function(e) {
return this.loadingIcon !== [] ? e === !0 ? this.loadingIcon.show() :this.loadingIcon.hide() :void 0;
}, e.prototype.status = function(e) {
return "ok" === e ? (this.formSuccess.show(), this.formNotSuccess.hide()) :(this.formSuccess.hide(), 
this.formNotSuccess.show());
}, e.prototype.invalidEmail = function(e) {
return e === !0 ? this.errorEmail.show() :this.errorEmail.hide();
}, e.prototype.invalidName = function(e) {
return e === !0 ? this.errorName.show() :this.errorName.hide();
}, e;
}(), $B.SocialMediaListStatic = function() {
function e(e) {
this.data = e;
}
return e.prototype.init = function() {
var e, t, o, n, i, r, a, s, l, c, u;
for (i = "", n = [], c = this.data.button_list, r = 0, s = c.length; s > r; r++) o = c[r], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
(o.show_button || e) && (t = new $B[o.type + "Static"](o), n.push(t), o.show_button && (i += t.getTemplate()));
for ($(".social-media-display .buttons").append($(i)), u = [], a = 0, l = n.length; l > a; a++) t = n[a], 
u.push(t.reRender());
return u;
}, e;
}(), $B.SocialMediaItemStatic = function() {
function t() {
this.onScriptLoad = e(this.onScriptLoad, this), this.getUrl = e(this.getUrl, this);
}
return t.prototype.getUrl = function() {
return this.data.url ? this.data.url :$S.page_meta.social_media_config.url;
}, t.prototype.onScriptLoad = function() {
return this.runScript();
}, t.prototype.createScriptTag = function(e, t) {
var o, n;
return o = $("<div></div>").addClass(e), n = $("<script></script>").attr({
async:!0,
src:t
}), n.bind("load", this.onScriptLoad), o.get(0).appendChild(n.get(0)), $("#fb-root").get(0).appendChild(o.get(0));
}, t;
}(), $B.FacebookStatic = function(t) {
function n(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, n.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.data.app_id,
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, n.prototype.reRender = function() {
return $("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, n;
}($B.SocialMediaItemStatic), $B.LinkedInStatic = function(t) {
function n(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {
console.log("LinkedIn#reRender");
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, n;
}($B.SocialMediaItemStatic), $B.TwitterStatic = function(t) {
function n(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.data.share_text + '"  data-count="horizontal">Tweet</a></div>';
}, n.prototype.runScript = function() {
return "undefined" != typeof twttr && "undefined" != typeof twttr.widgets ? (console.log("Twitter#runScript"), 
twttr.widgets.load()) :void 0;
}, n.prototype.reRender = function() {
return $("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, n;
}($B.SocialMediaItemStatic), $B.GPlusStatic = function(t) {
function n(t) {
this.data = t, this.runScript = e(this.runScript, this), n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, n.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, n.prototype.reRender = function() {
return $("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, n;
}($B.SocialMediaItemStatic), $B.RenrenStatic = function(t) {
function n(t) {
this.data = t, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "人人喜欢";
}, n.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:$S.page_meta.social_media_config.title,
description:$S.page_meta.social_media_config.description,
image:$S.page_meta.social_media_config.image
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}($B.SocialMediaItemStatic), $B.SinaWeiboStatic = function(t) {
function n(t) {
this.data = t, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
t.imageUrl = asset_path("/assets/icons/weibo.png"), n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "新浪微博";
}, n.prototype.getTemplate = function() {
var e, t, o, n, i;
i = 90, n = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:$S.page_meta.social_media_config.title,
pic:$S.page_meta.social_media_config.image,
rnd:new Date().valueOf()
}, o = [];
for (e in t) o.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + o.join("&") + '" width="' + i + '" height="' + n + '"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}($B.SocialMediaItemStatic), $B.GalleryStatic = function() {
function e() {
var e;
$(".lazy-gallery").lazyload(), e = $(".gallery .item"), e.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
});
}
return e;
}(), $(function() {
var e, t, o, n, i;
for (t = $(".s-general-form, .s-template-form"), n = 0, i = t.length; i > n; n++) e = t[n], 
new $B.EmailFormStatic($(e)).init();
return o = new $B.SocialMediaListStatic($S.page_meta.social_media), o.init(), new $B.GalleryStatic(), 
new $B.NavbarStatic();
});
}.call(this), function() {
console.log("pages_show_static");
}.call(this), function(e) {
var t = 0, o = 0, n = 0, i = 10, r = 0, a = "ontouchstart" in window || navigator.msMaxTouchPoints > 0, s = "onorientationchange" in window, l = !1, c = !1, u = !1, d = !1, p = !1, h = !1, g = !1, f = "pointer", m = "pointer", v = new Array(), b = new Array(), w = new Array(), y = new Array(), _ = new Array(), k = new Array(), x = new Array(), S = new Array(), C = new Array(), E = new Array(), T = new Array(), $ = new Array(), I = new Array(), O = {
showScrollbar:function(t, o) {
t.scrollbarHide && e("." + o).css({
opacity:t.scrollbarOpacity,
filter:"alpha(opacity:" + 100 * t.scrollbarOpacity + ")"
});
},
hideScrollbar:function(e, t, o, n, r, a, s, l, c, u) {
if (e.scrollbar && e.scrollbarHide) for (var d = o; o + 25 > d; d++) t[t.length] = O.hideScrollbarIntervalTimer(i * d, n[o], (o + 24 - d) / 24, r, a, s, l, c, u, e);
},
hideScrollbarInterval:function(t, o, n, i, a, s, l, c, u) {
r = -1 * t / T[c] * (a - s - l - i), O.setSliderOffset("." + n, r), e("." + n).css({
opacity:u.scrollbarOpacity * o,
filter:"alpha(opacity:" + u.scrollbarOpacity * o * 100 + ")"
});
},
slowScrollHorizontalInterval:function(t, o, n, i, a, s, l, c, u, d, p, h, g, f, m, v, b, w, y) {
if (y.infiniteSlider) {
if (n <= -1 * T[v]) {
var _ = e(t).width();
if (n <= -1 * $[v]) {
var k = -1 * p[0];
e(o).each(function(t) {
O.setSliderOffset(e(o)[t], k + b), t < h.length && (h[t] = -1 * k), k += m[t];
}), n += -1 * h[0], E[v] = -1 * h[0] + b, T[v] = E[v] + _ - s, C[v] = 0;
} else {
var I = 0, A = O.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
O.getSliderOffset(this, "x") < A && (A = O.getSliderOffset(this, "x"), I = e);
});
var B = E[v] + _;
O.setSliderOffset(e(o)[I], B), E[v] = -1 * h[1] + b, T[v] = E[v] + _ - s, h.splice(0, 1), 
h.splice(h.length, 0, -1 * B + b), C[v]++;
}
}
if (n >= -1 * E[v] || n >= 0) {
var _ = e(t).width();
if (n > 0) {
var k = -1 * p[0];
for (e(o).each(function(t) {
O.setSliderOffset(e(o)[t], k + b), t < h.length && (h[t] = -1 * k), k += m[t];
}), n -= -1 * h[0], E[v] = -1 * h[0] + b, T[v] = E[v] + _ - s, C[v] = f; -1 * h[0] - _ + b > 0; ) {
var D = 0, N = O.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
O.getSliderOffset(this, "x") > N && (N = O.getSliderOffset(this, "x"), D = e);
});
var B = E[v] - m[D];
O.setSliderOffset(e(o)[D], B), h.splice(0, 0, -1 * B + b), h.splice(h.length - 1, 1), 
E[v] = -1 * h[0] + b, T[v] = E[v] + _ - s, C[v]--, x[v]++;
}
}
if (0 > n) {
var D = 0, N = O.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
O.getSliderOffset(this, "x") > N && (N = O.getSliderOffset(this, "x"), D = e);
});
var B = E[v] - m[D];
O.setSliderOffset(e(o)[D], B), h.splice(0, 0, -1 * B + b), h.splice(h.length - 1, 1), 
E[v] = -1 * h[0] + b, T[v] = E[v] + _ - s, C[v]--;
}
}
}
var M = !1, H = O.calcActiveOffset(y, n, h, s, C[v], f, d, v), B = (H + C[v] + f) % f;
if (y.infiniteSlider ? B != S[v] && (M = !0) :H != x[v] && (M = !0), M) {
var L = new O.args("change", y, t, e(t).children(":eq(" + B + ")"), B, w);
e(t).parent().data("args", L), "" != y.onSlideChange && y.onSlideChange(L);
}
if (x[v] = H, S[v] = B, n = Math.floor(n), O.setSliderOffset(t, n), y.scrollbar) {
r = Math.floor((-1 * n - E[v] + b) / (T[v] - E[v] + b) * (l - c - a));
var P = a - u;
n >= -1 * E[v] + b ? (P = a - u - -1 * r, O.setSliderOffset(e("." + i), 0), e("." + i).css({
width:P + "px"
})) :n <= -1 * T[v] + 1 ? (P = l - c - u - r, O.setSliderOffset(e("." + i), r), 
e("." + i).css({
width:P + "px"
})) :(O.setSliderOffset(e("." + i), r), e("." + i).css({
width:P + "px"
}));
}
},
slowScrollHorizontal:function(t, o, n, r, a, s, l, c, u, d, p, h, g, f, m, v, b, w, y, _, $) {
var I = O.getSliderOffset(t, "x"), A = new Array(), B = new Array(), D = 0, N = 25 / 1024 * c;
frictionCoefficient = $.frictionCoefficient, elasticFrictionCoefficient = $.elasticFrictionCoefficient, 
snapFrictionCoefficient = $.snapFrictionCoefficient, a > $.snapVelocityThreshold && $.snapToChildren && !y ? D = 1 :a < -1 * $.snapVelocityThreshold && $.snapToChildren && !y && (D = -1), 
-1 * N > a ? a = -1 * N :a > N && (a = N), e(t)[0] !== e(w)[0] && (D = -1 * D, a = -2 * a);
var M = C[m];
if ($.infiniteSlider) var H = E[m], L = T[m];
for (var P = new Array(), F = new Array(), j = 0; j < g.length; j++) P[j] = g[j], 
j < o.length && (F[j] = O.getSliderOffset(e(o[j]), "x"));
for (;a > 1 || -1 > a; ) {
if (a *= frictionCoefficient, I += a, (I > -1 * E[m] || I < -1 * T[m]) && !$.infiniteSlider && (a *= elasticFrictionCoefficient, 
I += a), $.infiniteSlider) {
if (-1 * L >= I) {
for (var R = e(t).width(), z = 0, q = F[0], j = 0; j < F.length; j++) F[j] < q && (q = F[j], 
z = j);
var U = H + R;
F[z] = U, H = -1 * P[1] + _, L = H + R - c, P.splice(0, 1), P.splice(P.length, 0, -1 * U + _), 
M++;
}
if (I >= -1 * H) {
for (var R = e(t).width(), V = 0, W = F[0], j = 0; j < F.length; j++) F[j] > W && (W = F[j], 
V = j);
var U = H - f[V];
F[V] = U, P.splice(0, 0, -1 * U + _), P.splice(P.length - 1, 1), H = -1 * P[0] + _, 
L = H + R - c, M--;
}
}
A[A.length] = I, B[B.length] = a;
}
var G = !1, Q = O.calcActiveOffset($, I, P, c, M, b, x[m], m), J = (Q + M + b) % b;
if ($.snapToChildren && ($.infiniteSlider ? J != S[m] && (G = !0) :Q != x[m] && (G = !0), 
0 > D && !G ? (Q++, Q >= g.length && !$.infiniteSlider && (Q = g.length - 1)) :D > 0 && !G && (Q--, 
0 > Q && !$.infiniteSlider && (Q = 0))), $.snapToChildren || (I > -1 * E[m] || I < -1 * T[m]) && !$.infiniteSlider) {
for ((I > -1 * E[m] || I < -1 * T[m]) && !$.infiniteSlider ? A.splice(0, A.length) :(A.splice(.1 * A.length, A.length), 
I = A.length > 0 ? A[A.length - 1] :I); I < P[Q] - .5 || I > P[Q] + .5; ) I = (I - P[Q]) * snapFrictionCoefficient + P[Q], 
A[A.length] = I;
A[A.length] = P[Q];
}
var K = 1;
A.length % 2 != 0 && (K = 0);
for (var Y = 0; Y < n.length; Y++) clearTimeout(n[Y]);
for (var X = (Q + M + b) % b, Z = 0, Y = K; Y < A.length; Y += 2) (Y == K || Math.abs(A[Y] - Z) > 1 || Y >= A.length - 2) && (Z = A[Y], 
n[n.length] = O.slowScrollHorizontalIntervalTimer(i * Y, t, o, A[Y], r, l, c, u, d, p, Q, h, g, v, b, f, m, _, X, $));
var G = !1, J = (Q + C[m] + b) % b;
$.infiniteSlider ? J != S[m] && (G = !0) :Q != x[m] && (G = !0), "" != $.onSlideComplete && A.length > 1 && (n[n.length] = O.onSlideCompleteTimer(i * (Y + 1), $, t, e(t).children(":eq(" + J + ")"), X, m)), 
k[m] = n, O.hideScrollbar($, n, Y, A, r, l, c, d, p, m);
},
onSlideComplete:function(t, o, n, i, r) {
var a = (v[r] != i ? !0 :!1, new O.args("complete", t, e(o), n, i, i));
e(o).parent().data("args", a), "" != t.onSlideComplete && t.onSlideComplete(a), 
v[r] = i;
},
getSliderOffset:function(t, o) {
var n = 0;
if (o = "x" == o ? 4 :5, !c || u || d) n = parseInt(e(t).css("left"), 10); else {
for (var i, r = new Array("-webkit-transform", "-moz-transform", "transform"), a = 0; a < r.length; a++) if (void 0 != e(t).css(r[a]) && e(t).css(r[a]).length > 0) {
i = e(t).css(r[a]).split(",");
break;
}
n = void 0 == i[o] ? 0 :parseInt(i[o], 10);
}
return n;
},
setSliderOffset:function(t, o) {
o = parseInt(o, 10), !c || u || d ? e(t).css({
left:o + "px"
}) :e(t).css({
msTransform:"matrix(1,0,0,1," + o + ",0)",
webkitTransform:"matrix(1,0,0,1," + o + ",0)",
MozTransform:"matrix(1,0,0,1," + o + ",0)",
transform:"matrix(1,0,0,1," + o + ",0)"
});
},
setBrowserInfo:function() {
null != navigator.userAgent.match("WebKit") ? (l = !0, f = "-webkit-grab", m = "-webkit-grabbing") :null != navigator.userAgent.match("Gecko") ? (g = !0, 
f = "move", m = "-moz-grabbing") :null != navigator.userAgent.match("MSIE 7") ? (u = !0, 
h = !0) :null != navigator.userAgent.match("MSIE 8") ? (d = !0, h = !0) :null != navigator.userAgent.match("MSIE 9") && (p = !0, 
h = !0);
},
has3DTransform:function() {
var t = !1, o = e("<div />").css({
msTransform:"matrix(1,1,1,1,1,1)",
webkitTransform:"matrix(1,1,1,1,1,1)",
MozTransform:"matrix(1,1,1,1,1,1)",
transform:"matrix(1,1,1,1,1,1)"
});
return "" == o.attr("style") ? t = !1 :g && parseInt(navigator.userAgent.split("/")[3], 10) >= 21 ? t = !1 :void 0 != o.attr("style") && (t = !0), 
t;
},
getSlideNumber:function(e, t, o) {
return (e - C[t] + o) % o;
},
calcActiveOffset:function(e, t, o, n, i, r) {
var a, s = !1, l = new Array();
t > o[0] && (a = 0), t < o[o.length - 1] && (a = r - 1);
for (var c = 0; c < o.length; c++) o[c] <= t && o[c] > t - n && (s || o[c] == t || (l[l.length] = o[c - 1]), 
l[l.length] = o[c], s = !0);
0 == l.length && (l[0] = o[o.length - 1]);
for (var u = n, d = 0, c = 0; c < l.length; c++) {
var p = Math.abs(t - l[c]);
u > p && (d = l[c], u = p);
}
for (var c = 0; c < o.length; c++) d == o[c] && (a = c);
return a;
},
changeSlide:function(t, o, n, r, a, s, l, c, u, d, p, h, g, f, m, v, b, w) {
O.autoSlidePause(f);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
{
var _ = Math.ceil(w.autoSlideTransTimer / 10) + 1, E = O.getSliderOffset(o, "x"), T = h[t], $ = T - E;
t - (x[f] + C[f] + v) % v;
}
if (w.infiniteSlider) {
t = (t - C[f] + 2 * v) % v;
var I = !1;
0 == t && 2 == v && (t = v, h[t] = h[t - 1] - e(n).eq(0).outerWidth(!0), I = !0), 
T = h[t], $ = T - E;
var A = new Array(h[t] - e(o).width(), h[t] + e(o).width());
I && h.splice(h.length - 1, 1);
for (var B = 0; B < A.length; B++) Math.abs(A[B] - E) < Math.abs($) && ($ = A[B] - E);
}
var D, N, M = new Array();
O.showScrollbar(w, a);
for (var B = 0; _ >= B; B++) D = B, D /= _, D--, N = E + $ * (Math.pow(D, 5) + 1), 
M[M.length] = N;
for (var H = (t + C[f] + v) % v, L = 0, B = 0; B < M.length; B++) if ((0 == B || Math.abs(M[B] - L) > 1 || B >= M.length - 2) && (L = M[B], 
r[B] = O.slowScrollHorizontalIntervalTimer(i * (B + 1), o, n, M[B], a, s, l, c, u, d, t, p, h, m, v, g, f, b, H, w)), 
0 == B && "" != w.onSlideStart) {
var P = (x[f] + C[f] + v) % v;
w.onSlideStart(new O.args("start", w, o, e(o).children(":eq(" + P + ")"), P, t));
}
var F = !1;
w.infiniteSlider ? H != S[f] && (F = !0) :t != x[f] && (F = !0), F && "" != w.onSlideComplete && (r[r.length] = O.onSlideCompleteTimer(i * (B + 1), w, o, e(o).children(":eq(" + H + ")"), H, f)), 
k[f] = r, O.hideScrollbar(w, r, B, M, a, s, l, u, d, f), O.autoSlide(o, n, r, a, s, l, c, u, d, p, h, g, f, m, v, b, w);
},
autoSlide:function(e, t, o, n, i, r, a, s, l, c, u, d, p, h, g, f, m) {
return y[p].autoSlide ? (O.autoSlidePause(p), b[p] = setTimeout(function() {
!m.infiniteSlider && x[p] > u.length - 1 && (x[p] = x[p] - g);
var v = (x[p] + C[p] + u.length + 1) % u.length;
O.changeSlide(v, e, t, o, n, i, r, a, s, l, c, u, d, p, h, g, f, m), O.autoSlide(e, t, o, n, i, r, a, s, l, c, u, d, p, h, g, f, m);
}, m.autoSlideTimer + m.autoSlideTransTimer), void 0) :!1;
},
autoSlidePause:function(e) {
clearTimeout(b[e]);
},
isUnselectable:function(t, o) {
return "" != o.unselectableSelector && 1 == e(t).closest(o.unselectableSelector).length ? !0 :!1;
},
slowScrollHorizontalIntervalTimer:function(e, t, o, n, i, r, a, s, l, c, u, d, p, h, g, f, m, v, b, w) {
var y = setTimeout(function() {
O.slowScrollHorizontalInterval(t, o, n, i, r, a, s, l, c, u, d, p, h, g, f, m, v, b, w);
}, e);
return y;
},
onSlideCompleteTimer:function(e, t, o, n, i, r) {
var a = setTimeout(function() {
O.onSlideComplete(t, o, n, i, r);
}, e);
return a;
},
hideScrollbarIntervalTimer:function(e, t, o, n, i, r, a, s, l, c) {
var u = setTimeout(function() {
O.hideScrollbarInterval(t, o, n, i, r, a, s, l, c);
}, e);
return u;
},
args:function(t, o, n, i, r, a) {
this.prevSlideNumber = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideNumber, 
this.prevSlideObject = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideObject, 
this.targetSlideNumber = a + 1, this.targetSlideObject = e(n).children(":eq(" + a + ")"), 
this.slideChanged = !1, "load" == t ? (this.targetSlideNumber = void 0, this.targetSlideObject = void 0) :"start" == t ? (this.targetSlideNumber = void 0, 
this.targetSlideObject = void 0) :"change" == t ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == e(n).parent().data("args") ? o.startAtSlide :e(n).parent().data("args").currentSlideNumber, 
this.prevSlideObject = e(n).children(":eq(" + this.prevSlideNumber + ")")) :"complete" == t && (this.slideChanged = e(n).parent().data("args").slideChanged), 
this.settings = o, this.data = e(n).parent().data("iosslider"), this.sliderObject = n, 
this.sliderContainerObject = e(n).parent(), this.currentSlideObject = i, this.currentSlideNumber = r + 1, 
this.currentSliderOffset = -1 * O.getSliderOffset(n, "x");
},
preventDrag:function(e) {
e.preventDefault();
},
preventClick:function(e) {
return e.stopImmediatePropagation(), !1;
},
enableClick:function() {
return !0;
}
};
O.setBrowserInfo();
var A = {
init:function(i, l) {
c = O.has3DTransform();
var p = e.extend(!0, {
elasticPullResistance:.6,
frictionCoefficient:.92,
elasticFrictionCoefficient:.6,
snapFrictionCoefficient:.92,
snapToChildren:!1,
snapSlideCenter:!1,
startAtSlide:1,
scrollbar:!1,
scrollbarDrag:!1,
scrollbarHide:!0,
scrollbarLocation:"top",
scrollbarContainer:"",
scrollbarOpacity:.4,
scrollbarHeight:"4px",
scrollbarBorder:"0",
scrollbarMargin:"5px",
scrollbarBackground:"#000",
scrollbarBorderRadius:"100px",
scrollbarShadow:"0 0 0 #000",
scrollbarElasticPullResistance:.9,
desktopClickDrag:!1,
keyboardControls:!1,
tabToAdvance:!1,
responsiveSlideContainer:!0,
responsiveSlides:!0,
navSlideSelector:"",
disableActionOnSelectorClicked:!1,
navPrevSelector:"",
navNextSelector:"",
autoSlideToggleSelector:"",
autoSlide:!1,
autoSlideTimer:5e3,
autoSlideTransTimer:750,
autoSlideHoverPause:!0,
infiniteSlider:!1,
snapVelocityThreshold:5,
slideStartVelocityThreshold:0,
horizontalSlideLockThreshold:5,
verticalSlideLockThreshold:3,
stageCSS:{
position:"relative",
top:"0",
left:"0",
overflow:"hidden",
zIndex:1
},
unselectableSelector:"",
onSliderLoaded:"",
onSliderUpdate:"",
onSliderResize:"",
onSlideStart:"",
onSlideChange:"",
onSlideComplete:""
}, i);
return void 0 == l && (l = this), e(l).each(function() {
function i() {
O.autoSlidePause(l), gt = e(it).find("a"), ft = e(it).find("[onclick]"), mt = e(it).find("*"), 
e(K).css("width", ""), e(K).css("height", ""), e(it).css("width", ""), R = e(it).children().not("script").get(), 
z = new Array(), q = new Array(), p.responsiveSlides && e(R).css("width", ""), T[l] = 0, 
j = new Array(), D = e(K).parent().width(), M = e(K).outerWidth(!0), p.responsiveSlideContainer && (M = e(K).outerWidth(!0) > D ? D :e(K).width()), 
e(K).css({
position:p.stageCSS.position,
top:p.stageCSS.top,
left:p.stageCSS.left,
overflow:p.stageCSS.overflow,
zIndex:p.stageCSS.zIndex,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
msTouchAction:"pan-y",
width:M
}), e(p.unselectableSelector).css({
cursor:"default"
});
for (var t = 0; t < R.length; t++) {
z[t] = e(R[t]).width(), q[t] = e(R[t]).outerWidth(!0);
var o = q[t];
p.responsiveSlides && (q[t] > M ? (o = M + -1 * (q[t] - z[t]), z[t] = o, q[t] = M) :o = z[t], 
e(R[t]).css({
width:o
})), e(R[t]).css({
webkitBackfaceVisibility:"hidden",
overflow:"hidden",
position:"absolute"
}), j[t] = -1 * T[l], T[l] = T[l] + o + (q[t] - z[t]);
}
p.snapSlideCenter && (J = .5 * (M - q[0]), p.responsiveSlides && q[0] > M && (J = 0)), 
$[l] = 2 * T[l];
for (var t = 0; t < R.length; t++) O.setSliderOffset(e(R[t]), -1 * j[t] + T[l] + J), 
j[t] = j[t] - T[l];
if (!p.infiniteSlider && !p.snapSlideCenter) {
for (var n = 0; n < j.length && !(j[n] <= -1 * (2 * T[l] - M)); n++) st = n;
j.splice(st + 1, j.length), j[j.length] = -1 * (2 * T[l] - M);
}
for (var n = 0; n < j.length; n++) Z[n] = j[n];
if (Y && (y[l].startAtSlide = y[l].startAtSlide > j.length ? j.length :y[l].startAtSlide, 
p.infiniteSlider ? (y[l].startAtSlide = (y[l].startAtSlide - 1 + rt) % rt, x[l] = y[l].startAtSlide) :(y[l].startAtSlide = y[l].startAtSlide - 1 < 0 ? j.length - 1 :y[l].startAtSlide, 
x[l] = y[l].startAtSlide - 1), S[l] = x[l]), E[l] = T[l] + J, e(it).css({
position:"relative",
cursor:f,
webkitPerspective:"0",
webkitBackfaceVisibility:"hidden",
width:T[l] + "px"
}), ht = T[l], T[l] = 2 * T[l] - M + 2 * J, ut = M > ht + J || 0 == M ? !0 :!1, 
ut && e(it).css({
cursor:"default"
}), N = e(K).parent().outerHeight(!0), H = e(K).height(), p.responsiveSlideContainer && (H = H > N ? N :H), 
e(K).css({
height:H
}), O.setSliderOffset(it, j[x[l]]), p.infiniteSlider && !ut) {
for (var i = O.getSliderOffset(e(it), "x"), r = (C[l] + rt) % rt * -1; 0 > r; ) {
var a = 0, s = O.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
O.getSliderOffset(this, "x") < s && (s = O.getSliderOffset(this, "x"), a = e);
});
var u = E[l] + ht;
O.setSliderOffset(e(R)[a], u), E[l] = -1 * j[1] + J, T[l] = E[l] + ht - M, j.splice(0, 1), 
j.splice(j.length, 0, -1 * u + J), r++;
}
for (;-1 * j[0] - ht + J > 0 && p.snapSlideCenter && Y; ) {
var d = 0, h = O.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
O.getSliderOffset(this, "x") > h && (h = O.getSliderOffset(this, "x"), d = e);
});
var u = E[l] - q[d];
O.setSliderOffset(e(R)[d], u), j.splice(0, 0, -1 * u + J), j.splice(j.length - 1, 1), 
E[l] = -1 * j[0] + J, T[l] = E[l] + ht - M, C[l]--, x[l]++;
}
for (;i <= -1 * T[l]; ) {
var a = 0, s = O.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
O.getSliderOffset(this, "x") < s && (s = O.getSliderOffset(this, "x"), a = e);
});
var u = E[l] + ht;
O.setSliderOffset(e(R)[a], u), E[l] = -1 * j[1] + J, T[l] = E[l] + ht - M, j.splice(0, 1), 
j.splice(j.length, 0, -1 * u + J), C[l]++, x[l]--;
}
}
return O.setSliderOffset(it, j[x[l]]), p.desktopClickDrag || e(it).css({
cursor:"default"
}), p.scrollbar && (e("." + G).css({
margin:p.scrollbarMargin,
overflow:"hidden",
display:"none"
}), e("." + G + " ." + Q).css({
border:p.scrollbarBorder
}), L = parseInt(e("." + G).css("marginLeft")) + parseInt(e("." + G).css("marginRight")), 
P = parseInt(e("." + G + " ." + Q).css("borderLeftWidth"), 10) + parseInt(e("." + G + " ." + Q).css("borderRightWidth"), 10), 
A = "" != p.scrollbarContainer ? e(p.scrollbarContainer).width() :M, B = M / ht * (A - L), 
p.scrollbarHide || (et = p.scrollbarOpacity), e("." + G).css({
position:"absolute",
left:0,
width:A - L + "px",
margin:p.scrollbarMargin
}), "top" == p.scrollbarLocation ? e("." + G).css("top", "0") :e("." + G).css("bottom", "0"), 
e("." + G + " ." + Q).css({
borderRadius:p.scrollbarBorderRadius,
background:p.scrollbarBackground,
height:p.scrollbarHeight,
width:B - P + "px",
minWidth:p.scrollbarHeight,
border:p.scrollbarBorder,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
position:"relative",
opacity:et,
filter:"alpha(opacity:" + 100 * et + ")",
boxShadow:p.scrollbarShadow
}), O.setSliderOffset(e("." + G + " ." + Q), Math.floor((-1 * j[x[l]] - E[l] + J) / (T[l] - E[l] + J) * (A - L - B))), 
e("." + G).css({
display:"block"
}), g = e("." + G + " ." + Q), b = e("." + G)), p.scrollbarDrag && !ut && e("." + G + " ." + Q).css({
cursor:f
}), p.infiniteSlider && (U = (T[l] + M) / 3), "" != p.navSlideSelector && e(p.navSlideSelector).each(function(t) {
e(this).css({
cursor:"pointer"
}), e(this).unbind(wt).bind(wt, function(o) {
p.disableActionOnSelectorClicked || ("touchstart" == o.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = o.type + ".iosSliderEvent", O.changeSlide(t, it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p));
});
}), "" != p.navPrevSelector && (e(p.navPrevSelector).css({
cursor:"pointer"
}), e(p.navPrevSelector).unbind(wt).bind(wt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = t.type + ".iosSliderEvent";
var o = (x[l] + C[l] + rt) % rt;
(o > 0 || p.infiniteSlider) && O.changeSlide(o - 1, it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p);
})), "" != p.navNextSelector && (e(p.navNextSelector).css({
cursor:"pointer"
}), e(p.navNextSelector).unbind(wt).bind(wt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = t.type + ".iosSliderEvent";
var o = (x[l] + C[l] + rt) % rt;
(o < j.length - 1 || p.infiniteSlider) && O.changeSlide(o + 1, it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p);
})), p.autoSlide && !ut && "" != p.autoSlideToggleSelector && (e(p.autoSlideToggleSelector).css({
cursor:"pointer"
}), e(p.autoSlideToggleSelector).unbind(wt).bind(wt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
wt = t.type + ".iosSliderEvent", dt ? (O.autoSlide(it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p), 
dt = !1, e(p.autoSlideToggleSelector).removeClass("on")) :(O.autoSlidePause(l), 
dt = !0, e(p.autoSlideToggleSelector).addClass("on"));
})), O.autoSlide(it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p), e(K).bind("mouseleave.iosSliderEvent", function() {
return dt ? !0 :(O.autoSlide(it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p), 
void 0);
}), e(K).bind("touchend.iosSliderEvent", function() {
return dt ? !0 :(O.autoSlide(it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p), 
void 0);
}), p.autoSlideHoverPause && e(K).bind("mouseenter.iosSliderEvent", function() {
O.autoSlidePause(l);
}), e(K).data("iosslider", {
obj:yt,
settings:p,
scrollerNode:it,
slideNodes:R,
numberOfSlides:rt,
centeredSlideOffset:J,
sliderNumber:l,
originalOffsets:Z,
childrenOffsets:j,
sliderMax:T[l],
scrollbarClass:Q,
scrollbarWidth:B,
scrollbarStageWidth:A,
stageWidth:M,
scrollMargin:L,
scrollBorder:P,
infiniteSliderOffset:C[l],
infiniteSliderWidth:U,
slideNodeOuterWidths:q,
shortContent:ut
}), Y = !1, !0;
}
t++;
var l = t, c = new Array();
y[l] = e.extend({}, p), E[l] = 0, T[l] = 0;
var g, b, A, B, D, N, M, H, L, P, F, j, R, z, q, U, V = new Array(0, 0), W = new Array(0, 0), G = "scrollbarBlock" + t, Q = "scrollbar" + t, J = 0, K = e(this), Y = !0, X = -1, Z = (new Array(), 
new Array()), et = 0, tt = 0, ot = 0, nt = 0, it = e(this).children(":first-child"), rt = e(it).children().not("script").length, at = !1, st = 0, lt = !1, ct = void 0;
C[l] = 0;
var ut = !1;
v[l] = -1;
var dt = !1;
w[l] = K, _[l] = !1;
var pt, ht, gt, ft, mt, vt = !1, bt = !1, wt = "touchstart.iosSliderEvent click.iosSliderEvent";
I[l] = !1, k[l] = new Array(), p.scrollbarDrag && (p.scrollbar = !0, p.scrollbarHide = !1);
var yt = e(this), _t = yt.data("iosslider");
if (void 0 != _t) return !0;
var kt = Math.floor(12317 * Math.random());
if (e(it).parent().append("<i class = 'i" + kt + "'></i>").append("<i class = 'i" + kt + "'></i>"), 
parseInt(e().jquery.split(".").join(""), 10) >= 14.2 ? e(this).delegate("img", "dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}) :e(this).find("img").bind("dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}), p.infiniteSlider && (p.scrollbar = !1), p.infiniteSlider && 1 == rt && (p.infiniteSlider = !1), 
p.scrollbar && ("" != p.scrollbarContainer ? e(p.scrollbarContainer).append("<div class = '" + G + "'><div class = '" + Q + "'></div></div>") :e(it).parent().append("<div class = '" + G + "'><div class = '" + Q + "'></div></div>")), 
!i()) return !0;
e(this).find("a").bind("mousedown", O.preventDrag), e(this).find("[onclick]").bind("click", O.preventDrag).each(function() {
e(this).data("onclick", this.onclick);
});
var X = O.calcActiveOffset(p, O.getSliderOffset(e(it), "x"), j, M, C[l], rt, void 0, l), xt = (X + C[l] + rt) % rt, St = new O.args("load", p, it, e(it).children(":eq(" + xt + ")"), xt, xt);
if (e(K).data("args", St), "" != p.onSliderLoaded && p.onSliderLoaded(St), v[l] = xt, 
y[l].responsiveSlides || y[l].responsiveSlideContainer) {
var Ct = s ? "orientationchange" :"resize", Et = $B.debounce(function() {
if (!i()) return !0;
var t = e(K).data("args");
"" != p.onSliderResize && p.onSliderResize(t);
}, 50);
e(window).bind(Ct + ".iosSliderEvent-" + l, Et);
}
if (!p.keyboardControls && !p.tabToAdvance || ut || e(document).bind("keydown.iosSliderEvent", function(e) {
if (!u && !d) var e = e.originalEvent;
if (I[l]) return !0;
if (37 == e.keyCode && p.keyboardControls) {
e.preventDefault();
var t = (x[l] + C[l] + rt) % rt;
(t > 0 || p.infiniteSlider) && O.changeSlide(t - 1, it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p);
} else if (39 == e.keyCode && p.keyboardControls || 9 == e.keyCode && p.tabToAdvance) {
e.preventDefault();
var t = (x[l] + C[l] + rt) % rt;
(t < j.length - 1 || p.infiniteSlider) && O.changeSlide(t + 1, it, R, c, Q, B, M, A, L, P, Z, j, q, l, U, rt, J, p);
}
}), a || p.desktopClickDrag) {
var Tt = !1, $t = !1, It = e(it), Ot = e(it), At = !1;
p.scrollbarDrag && (It = It.add(g), Ot = Ot.add(b)), e(It).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(t) {
if (e(window).one("scroll.iosSliderEvent", function() {
Tt = !1;
}), Tt) return !0;
if (Tt = !0, $t = !1, "touchstart" == t.type ? e(Ot).unbind("mousedown.iosSliderEvent") :e(Ot).unbind("touchstart.iosSliderEvent"), 
I[l] || ut) return Tt = !1, at = !1, !0;
if (At = O.isUnselectable(t.target, p)) return Tt = !1, at = !1, !0;
if (pt = e(this)[0] === e(g)[0] ? g :it, !u && !d) var t = t.originalEvent;
if (O.autoSlidePause(l), mt.unbind(".disableClick"), "touchstart" == t.type) eventX = t.touches[0].pageX, 
eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() :window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
eventX = t.pageX, eventY = t.pageY, lt = !0, ct = it, e(this).css({
cursor:m
});
}
V = new Array(0, 0), W = new Array(0, 0), o = 0, at = !1;
for (var n = 0; n < c.length; n++) clearTimeout(c[n]);
var i = O.getSliderOffset(it, "x");
i > -1 * E[l] + J + ht ? (i = -1 * E[l] + J + ht, O.setSliderOffset(e("." + Q), i), 
e("." + Q).css({
width:B - P + "px"
})) :i < -1 * T[l] && (i = -1 * T[l], O.setSliderOffset(e("." + Q), A - L - B), 
e("." + Q).css({
width:B - P + "px"
}));
var r = e(this)[0] === e(g)[0] ? E[l] :0;
tt = -1 * (O.getSliderOffset(this, "x") - eventX - r), ot = -1 * (O.getSliderOffset(this, "y") - eventY), 
V[1] = eventX, W[1] = eventY, bt = !1;
}), e(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(t) {
if (!u && !d) var t = t.originalEvent;
if (I[l] || ut || At || !Tt) return !0;
var i = 0;
if ("touchmove" == t.type) eventX = t.touches[0].pageX, eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
if (eventX = t.pageX, eventY = t.pageY, !lt) return !0;
if (!h && ("undefined" != typeof t.webkitMovementX || "undefined" != typeof t.webkitMovementY) && 0 === t.webkitMovementY && 0 === t.webkitMovementX) return !0;
}
if (V[0] = V[1], V[1] = eventX, o = (V[1] - V[0]) / 2, W[0] = W[1], W[1] = eventY, 
n = (W[1] - W[0]) / 2, !at) {
var a = (x[l] + C[l] + rt) % rt, s = new O.args("start", p, it, e(it).children(":eq(" + a + ")"), a, void 0);
e(K).data("args", s), "" != p.onSlideStart && p.onSlideStart(s);
}
if ((n > p.verticalSlideLockThreshold || n < -1 * p.verticalSlideLockThreshold) && "touchmove" == t.type && !at && (vt = !0), 
(o > p.horizontalSlideLockThreshold || o < -1 * p.horizontalSlideLockThreshold) && "touchmove" == t.type && t.preventDefault(), 
(o > p.slideStartVelocityThreshold || o < -1 * p.slideStartVelocityThreshold) && (at = !0), 
at && !vt) {
var c = O.getSliderOffset(it, "x"), f = e(pt)[0] === e(g)[0] ? E[l] :J, m = e(pt)[0] === e(g)[0] ? (E[l] - T[l] - J) / (A - L - B) :1, v = e(pt)[0] === e(g)[0] ? p.scrollbarElasticPullResistance :p.elasticPullResistance, b = p.snapSlideCenter && e(pt)[0] === e(g)[0] ? 0 :J, w = p.snapSlideCenter && e(pt)[0] === e(g)[0] ? J :0;
if ("touchmove" == t.type && (nt != t.touches.length && (tt = -1 * c + eventX), 
nt = t.touches.length), p.infiniteSlider) {
if (c <= -1 * T[l]) {
var y = e(it).width();
if (c <= -1 * $[l]) {
var _ = -1 * Z[0];
e(R).each(function(t) {
O.setSliderOffset(e(R)[t], _ + J), t < j.length && (j[t] = -1 * _), _ += q[t];
}), tt -= -1 * j[0], E[l] = -1 * j[0] + J, T[l] = E[l] + y - M, C[l] = 0;
} else {
var k = 0, D = O.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
O.getSliderOffset(this, "x") < D && (D = O.getSliderOffset(this, "x"), k = e);
});
var N = E[l] + y;
O.setSliderOffset(e(R)[k], N), E[l] = -1 * j[1] + J, T[l] = E[l] + y - M, j.splice(0, 1), 
j.splice(j.length, 0, -1 * N + J), C[l]++;
}
}
if (c >= -1 * E[l] || c >= 0) {
var y = e(it).width();
if (c >= 0) {
var _ = -1 * Z[0];
for (e(R).each(function(t) {
O.setSliderOffset(e(R)[t], _ + J), t < j.length && (j[t] = -1 * _), _ += q[t];
}), tt += -1 * j[0], E[l] = -1 * j[0] + J, T[l] = E[l] + y - M, C[l] = rt; -1 * j[0] - y + J > 0; ) {
var H = 0, z = O.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
O.getSliderOffset(this, "x") > z && (z = O.getSliderOffset(this, "x"), H = e);
});
var N = E[l] - q[H];
O.setSliderOffset(e(R)[H], N), j.splice(0, 0, -1 * N + J), j.splice(j.length - 1, 1), 
E[l] = -1 * j[0] + J, T[l] = E[l] + y - M, C[l]--, x[l]++;
}
} else {
var H = 0, z = O.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
O.getSliderOffset(this, "x") > z && (z = O.getSliderOffset(this, "x"), H = e);
});
var N = E[l] - q[H];
O.setSliderOffset(e(R)[H], N), j.splice(0, 0, -1 * N + J), j.splice(j.length - 1, 1), 
E[l] = -1 * j[0] + J, T[l] = E[l] + y - M, C[l]--;
}
}
} else {
var y = e(it).width();
c > -1 * E[l] + J && (i = (E[l] + -1 * (tt - f - eventX + b) * m - f) * v * -1 / m), 
c < -1 * T[l] && (i = (T[l] + w + -1 * (tt - f - eventX) * m - f) * v * -1 / m);
}
if (O.setSliderOffset(it, -1 * (tt - f - eventX - i) * m - f + w), p.scrollbar) {
O.showScrollbar(p, Q), r = Math.floor((tt - eventX - i - E[l] + b) / (T[l] - E[l] + J) * (A - L - B) * m);
var U = B;
0 >= r ? (U = B - P - -1 * r, O.setSliderOffset(e("." + Q), 0), e("." + Q).css({
width:U + "px"
})) :r >= A - L - P - B ? (U = A - L - P - r, O.setSliderOffset(e("." + Q), r), 
e("." + Q).css({
width:U + "px"
})) :O.setSliderOffset(e("." + Q), r);
}
"touchmove" == t.type && (F = t.touches[0].pageX);
var G = !1, Y = O.calcActiveOffset(p, -1 * (tt - eventX - i), j, M, C[l], rt, void 0, l), X = (Y + C[l] + rt) % rt;
if (p.infiniteSlider ? X != S[l] && (G = !0) :Y != x[l] && (G = !0), G) {
x[l] = Y, S[l] = X, bt = !0;
var s = new O.args("change", p, it, e(it).children(":eq(" + X + ")"), X, X);
e(K).data("args", s), "" != p.onSlideChange && p.onSlideChange(s);
}
}
});
var Bt = e(window);
if (d || u) var Bt = e(document);
e(It).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(e) {
var e = e.originalEvent;
if ($t) return !1;
if ($t = !0, I[l] || ut) return !0;
if (At) return !0;
if (0 != e.touches.length) for (var t = 0; t < e.touches.length; t++) e.touches[t].pageX == F && O.slowScrollHorizontal(it, R, c, Q, o, n, B, M, A, L, P, Z, j, q, l, U, rt, pt, bt, J, p); else O.slowScrollHorizontal(it, R, c, Q, o, n, B, M, A, L, P, Z, j, q, l, U, rt, pt, bt, J, p);
return vt = !1, Tt = !1, !0;
}), e(Bt).bind("mouseup.iosSliderEvent-" + l, function() {
if (at ? gt.unbind("click.disableClick").bind("click.disableClick", O.preventClick) :gt.unbind("click.disableClick").bind("click.disableClick", O.enableClick), 
ft.each(function() {
this.onclick = function(t) {
return at ? !1 :(e(this).data("onclick") && e(this).data("onclick").call(this, t || window.event), 
void 0);
}, this.onclick = e(this).data("onclick");
}), parseFloat(e().jquery) >= 1.8 ? mt.each(function() {
var t = e._data(this, "events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!at) return !1;
e(this).one("click.disableClick", O.preventClick);
var o = e._data(this, "events").click, n = o.pop();
o.splice(0, 0, n);
}
}) :parseFloat(e().jquery) >= 1.6 && mt.each(function() {
var t = e(this).data("events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!at) return !1;
e(this).one("click.disableClick", O.preventClick);
var o = e(this).data("events").click, n = o.pop();
o.splice(0, 0, n);
}
}), !_[l]) {
if (ut) return !0;
if (p.desktopClickDrag && e(it).css({
cursor:f
}), p.scrollbarDrag && e(g).css({
cursor:f
}), lt = !1, void 0 == ct) return !0;
O.slowScrollHorizontal(ct, R, c, Q, o, n, B, M, A, L, P, Z, j, q, l, U, rt, pt, bt, J, p), 
ct = void 0;
}
vt = !1, Tt = !1;
});
}
});
},
destroy:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
if (void 0 == n) return !1;
void 0 == t && (t = !0), O.autoSlidePause(n.sliderNumber), _[n.sliderNumber] = !0, 
e(window).unbind(".iosSliderEvent-" + n.sliderNumber), e(document).unbind(".iosSliderEvent-" + n.sliderNumber), 
e(document).unbind("keydown.iosSliderEvent"), e(this).unbind(".iosSliderEvent"), 
e(this).children(":first-child").unbind(".iosSliderEvent"), e(this).children(":first-child").children().unbind(".iosSliderEvent"), 
t && (e(this).attr("style", ""), e(this).children(":first-child").attr("style", ""), 
e(this).children(":first-child").children().attr("style", ""), e(n.settings.navSlideSelector).attr("style", ""), 
e(n.settings.navPrevSelector).attr("style", ""), e(n.settings.navNextSelector).attr("style", ""), 
e(n.settings.autoSlideToggleSelector).attr("style", ""), e(n.settings.unselectableSelector).attr("style", "")), 
n.settings.scrollbar && e(".scrollbarBlock" + n.sliderNumber).remove();
for (var i = k[n.sliderNumber], r = 0; r < i.length; r++) clearTimeout(i[r]);
o.removeData("iosslider"), o.removeData("args");
});
},
update:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
o.settings.startAtSlide = t.data("args").currentSlideNumber, A.destroy(!1, this), 
1 != o.numberOfSlides && o.settings.infiniteSlider && (o.settings.startAtSlide = (x[o.sliderNumber] + 1 + C[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides), 
A.init(o.settings, this);
var n = new O.args("update", o.settings, o.scrollerNode, e(o.scrollerNode).children(":eq(" + (o.settings.startAtSlide - 1) + ")"), o.settings.startAtSlide - 1, o.settings.startAtSlide - 1);
e(o.stageNode).data("args", n), "" != o.settings.onSliderUpdate && o.settings.onSliderUpdate(n);
});
},
addSlide:function(t, o) {
return this.each(function() {
var n = e(this), i = n.data("iosslider");
return void 0 == i ? !1 :(0 == e(i.scrollerNode).children().length ? (e(i.scrollerNode).append(t), 
n.data("args").currentSlideNumber = 1) :i.settings.infiniteSlider ? (1 == o ? e(i.scrollerNode).children(":eq(0)").before(t) :e(i.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
C[i.sliderNumber] < -1 && x[i.sliderNumber]--, n.data("args").currentSlideNumber >= o && x[i.sliderNumber]++) :(o <= i.numberOfSlides ? e(i.scrollerNode).children(":eq(" + (o - 1) + ")").before(t) :e(i.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
n.data("args").currentSlideNumber >= o && n.data("args").currentSlideNumber++), 
n.data("iosslider").numberOfSlides++, A.update(this), void 0);
});
},
removeSlide:function(t) {
return this.each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n ? !1 :(e(n.scrollerNode).children(":eq(" + (t - 1) + ")").remove(), 
x[n.sliderNumber] > t - 1 && x[n.sliderNumber]--, o.data("iosslider").numberOfSlides--, 
A.update(this), void 0);
});
},
goToSlide:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(t = t > n.childrenOffsets.length ? n.childrenOffsets.length - 1 :t - 1, 
O.changeSlide(t, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
void 0);
});
},
prevSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (x[o.sliderNumber] + C[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n > 0 || o.settings.infiniteSlider) && O.changeSlide(n - 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
x[o.sliderNumber] = n;
});
},
nextSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (x[o.sliderNumber] + C[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n < o.childrenOffsets.length - 1 || o.settings.infiniteSlider) && O.changeSlide(n + 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
x[o.sliderNumber] = n;
});
},
lock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:"default"
}), I[o.sliderNumber] = !0, void 0);
});
},
unlock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:f
}), I[o.sliderNumber] = !1, void 0);
});
},
getData:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :o;
});
},
autoSlidePause:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(y[o.sliderNumber].autoSlide = !1, O.autoSlidePause(o.sliderNumber), 
o);
});
},
autoSlidePlay:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(y[o.sliderNumber].autoSlide = !0, O.autoSlide(e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
o);
});
}
};
e.fn.iosSlider = function(t) {
return A[t] ? A[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("invalid method call!"), 
void 0) :A.init.apply(this, arguments);
};
}(jQuery), function() {
window.runAfterDomBinding.add("app", function() {
var e, t, o, n, i, r, a, s;
return Bobcat.TH.applyTouchNav(), Bobcat.TH.enableSlider({
fullscreen:!1,
padding:80
}), t = $(".wide.header"), e = t.find("h5").first(), a = e.find(".text"), i = e.find(".logo-container"), 
n = i.find("img"), s = t.find(".nav ul"), r = function() {
var o, r, l, c, u, d, p, h;
return l = e.width(), n.is(":visible") ? (d = i.outerWidth(), o = l - d - 15, o > 100 && a.css("max-width", o)) :a.css("max-width", "none"), 
c = t.height(), h = s.first().height(), r = e.height(), $B.TH.isSmallScreen() || (c > h && (p = .5 * (c - h), 
t.find(".nav").css({
"margin-top":p - 2
})), c > h && (p = .5 * (c - r), t.find("h5").css({
"margin-top":p - 2
}))), u = t.outerHeight(), $(".header-spacer").height(u), $(".navbar-drawer-bar").is(":visible") ? $(".section-anchor").css("top", -$(".navbar-drawer-bar").height()) :$(".section-anchor").css("top", -u);
}, $(window).resize(r), r(), n.load(r), o = function() {
return $(".line-shadow").each(function() {
var e;
return e = $(this).closest("li.slide").next(), e.find(".wide.image").length ? ($(this).hide(), 
$(this).closest(".wide").removeClass("has-divider")) :void 0;
});
}, o(), $(".signup-form-container, .email-form").each(function() {
return $(this).find(".input").each(function() {
var e, t, o;
return o = $(this).find("label.outside"), "none" !== o.css("display") ? (t = $(this).find("input, textarea"), 
e = function() {
return "" === t.val() ? o.show() :o.hide();
}, t.keypress(function() {
return "" === t.val() ? o.hide() :void 0;
}), t.keyup(e), t.blur(e), t.focus(function() {
return o.hide();
}), o.click(function() {
return t.focus();
})) :void 0;
});
});
});
}.call(this);