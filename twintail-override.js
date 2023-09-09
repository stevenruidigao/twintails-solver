var __extends = this && this.__extends || function() {
    var n = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] = e[i])
    }
    ;
    return function(t, e) {
        function i() {
            this.constructor = t
        }
        n(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
}();
!function(t) {
    var r = function() {
        function t() {}
        return t.get = function(t) {
            return this._data[t]
        }
        ,
        t.add = function(t, e) {
            this._data[t] = e
        }
        ,
        t._data = {},
        t
    }();
    t.Assets = r;
    var i = function() {};
    t.Ref = i;
    var e = function() {
        function t() {
            this.__keyCount = 0,
            this.__updates = {},
            this.__resizes = {}
        }
        return t.prototype.initialize = function() {
            i.stw = aidn.window.width(),
            i.sth = aidn.window.height(),
            aidn.util.needExpandArea(!0),
            aidn.window.addDummyDiv()
        }
        ,
        t.prototype._start = function() {
            var t = this;
            i.time = Date.now() / 1e3,
            aidn.window.resize(function() {
                return t._resize()
            }, !0),
            this._resize(),
            this._update()
        }
        ,
        t.prototype.addUpdate = function(t, e) {
            t.__key || (t.__key = "key_" + this.__keyCount,
            this.__keyCount++),
            this.__updates[t.__key] = e
        }
        ,
        t.prototype.removeUpdate = function(t) {
            t.__key && delete this.__updates[t.__key]
        }
        ,
        t.prototype.addResize = function(t, e) {
            t.__key2 || (t.__key2 = "key_" + this.__keyCount,
            this.__keyCount++),
            this.__resizes[t.__key2] = e
        }
        ,
        t.prototype.removeResize = function(t) {
            t.__key2 && delete this.__resizes[t.__key2]
        }
        ,
        t.prototype._update = function() {
            var t = Date.now() / 1e3;
            for (var e in i.delta = t - i.time,
            i.time = t,
            this.__updates)
                this.__updates[e]()
        }
        ,
        t.prototype._resize = function() {
            for (var t in i.stw = aidn.window.width(),
            i.sth = aidn.window.height(),
            this.__resizes)
                this.__resizes[t]()
        }
        ,
        t
    }();
    t.MainBase = e;
    var n = function() {
        function t() {
            this.listeners = {}
        }
        return t.prototype.dispatchEvent = function(t) {
            var e, i;
            if (t instanceof a ? (i = t.type,
            e = t) : e = new a(i = t),
            null != this.listeners[i])
                for (var n = (e.currentTarget = this).listeners[i].length, o = 0; o < n && this.listeners[i]; o++) {
                    var s = this.listeners[i][o];
                    try {
                        s.handler(e)
                    } catch (t) {
                        window.console && console.error(t.stack)
                    }
                }
        }
        ,
        t.prototype.addEventListener = function(t, e, i) {
            void 0 === i && (i = 0),
            null == this.listeners[t] && (this.listeners[t] = []),
            this.listeners[t].push(new o(t,e,i)),
            this.listeners[t].sort(function(t, e) {
                return e.priolity - t.priolity
            })
        }
        ,
        t.prototype.removeEventListener = function(t, e) {
            if (this.hasEventListener(t, e))
                for (var i = 0; i < this.listeners[t].length; i++) {
                    var n = this.listeners[t][i];
                    if (n.equalCurrentListener(t, e))
                        return n.handler = null,
                        void this.listeners[t].splice(i, 1)
                }
        }
        ,
        t.prototype.clearEventListener = function() {
            this.listeners = {}
        }
        ,
        t.prototype.containEventListener = function(t) {
            return null != this.listeners[t] && 0 < this.listeners[t].length
        }
        ,
        t.prototype.hasEventListener = function(t, e) {
            if (null == this.listeners[t])
                return !1;
            for (var i = 0; i < this.listeners[t].length; i++) {
                if (this.listeners[t][i].equalCurrentListener(t, e))
                    return !0
            }
            return !1
        }
        ,
        t
    }();
    t.EventDispatcher = n;
    var o = function() {
        function t(t, e, i) {
            void 0 === t && (t = null),
            void 0 === e && (e = null),
            void 0 === i && (i = 0),
            this.type = t,
            this.handler = e,
            this.priolity = i
        }
        return t.prototype.equalCurrentListener = function(t, e) {
            return this.type == t && this.handler == e
        }
        ,
        t
    }()
      , a = function(t, e) {
        void 0 === t && (t = null),
        void 0 === e && (e = null),
        this.type = t,
        this.data = e
    };
    t.Event = a;
    var s = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._loaded = !1,
            t
        }
        return __extends(t, e),
        t.prototype.execute = function() {}
        ,
        t.prototype.cancel = function() {}
        ,
        t.prototype._dispatchComplete = function() {
            this._loaded = !0,
            this.dispatchEvent(new h(h.COMPLETE))
        }
        ,
        t.prototype._dispatchFailed = function() {
            this.dispatchEvent(new h(h.FAILED))
        }
        ,
        t.prototype._dispatchProgress = function(t) {
            var e = new h(h.PROGRESS);
            e.progress = t,
            this.dispatchEvent(e)
        }
        ,
        t
    }(n);
    t.CommandBase = s;
    var h = function(e) {
        function t(t) {
            return e.call(this, t) || this
        }
        return __extends(t, e),
        t.COMPLETE = "complete",
        t.FAILED = "failed",
        t.PROGRESS = "progress",
        t
    }(a);
    t.CommandEvent = h;
    var _ = function(i) {
        function t(t) {
            void 0 === t && (t = 1);
            var e = i.call(this) || this;
            return e._rates = [],
            e._sum = 0,
            e._commands = [],
            e._now = 0,
            e._total = 0,
            e._compnum = 0,
            e._compflags = [],
            e._connectionNum = t,
            e
        }
        return __extends(t, i),
        t.prototype.execute = function() {
            if (this._loaded = !1,
            this._now = this._compnum = this._compRate = 0,
            this._compflags = [],
            this._progRates = [],
            this._total <= this._compnum)
                return this._dispatchProgress(1),
                void this._dispatchComplete();
            for (var t = Math.min(this._total, this._connectionNum), e = 0; e < t; e++)
                this._execute()
        }
        ,
        t.prototype.cancel = function() {
            if (!(this._total <= this._compnum))
                for (var t = 0; t < this._total; t++)
                    try {
                        var e = this._commands[t];
                        this._removeEvents(e),
                        e.cancel()
                    } catch (t) {}
        }
        ,
        t.prototype.add = function(t, e) {
            void 0 === e && (e = 1),
            this._commands[this._total] = t,
            this._rates[this._total] = e,
            this._sum += e,
            this._total++
        }
        ,
        t.prototype._execute = function() {
            var e = this;
            if (this._now < this._total) {
                this._rates[this._now] = this._rates[this._now] / this._sum,
                this._progRates[this._now] = 0;
                var t = this._commands[this._now];
                t.__id = this._now,
                t.addEventListener(h.COMPLETE, function(t) {
                    return e._complete(t)
                }),
                t.addEventListener(h.PROGRESS, function(t) {
                    return e._progress(t)
                }),
                t.addEventListener(h.FAILED, function(t) {
                    return e._failed(t)
                }),
                t.execute(),
                this._now++
            } else
                this._total <= this._compnum && (this._dispatchProgress(1),
                this._dispatchComplete())
        }
        ,
        t.prototype._removeEvents = function(t) {
            t.clearEventListener()
        }
        ,
        t.prototype._completeCommand = function(t, e) {}
        ,
        t.prototype._complete = function(t) {
            var e = t.currentTarget.__id
              , i = this._commands[e];
            this._removeEvents(i),
            this._compRate += this._rates[e],
            this._compflags[e] = !0,
            this.__progress(),
            this._completeCommand(i, e),
            this._compnum++,
            this._execute()
        }
        ,
        t.prototype._progress = function(t) {
            var e = t.currentTarget.__id;
            this._progRates[e] = t.progress * this._rates[e],
            this.__progress()
        }
        ,
        t.prototype.__progress = function() {
            for (var t = 0, e = 0; e < this._now; e++)
                this._compflags[e] || (t += this._progRates[e]);
            this._dispatchProgress(this._compRate + t)
        }
        ,
        t.prototype._failed = function(t) {
            var e = t.currentTarget.__id
              , i = this._commands[e];
            this._removeEvents(i),
            this._dispatchFailed()
        }
        ,
        Object.defineProperty(t.prototype, "loaded", {
            get: function() {
                return this._loaded
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    }(s);
    t.SequentialCommand = _;
    var u = function(s) {
        function t(t, e, i, n) {
            void 0 === e && (e = null),
            void 0 === i && (i = !1),
            void 0 === n && (n = -1);
            var o = s.call(this) || this;
            return o._id = e,
            o._url = t,
            o._isplay = i,
            o._trimvol = n,
            o
        }
        return __extends(t, s),
        t.prototype.execute = function() {
            var t = this
              , e = function() {
                t._complete()
            };
            this._audio = new aidn.AutoAudio(null),
            this._isplay ? (this._audio.load([this._url], null, this._trimvol),
            this._audio.play(0, !1, e, 0, 0)) : this._audio.load([this._url], e, this._trimvol)
        }
        ,
        t.prototype._complete = function() {
            this._isplay && this._audio.stop();
            var t = this._id;
            t || (t = this._url),
            r.add(t, this._audio),
            this._dispatchComplete()
        }
        ,
        t
    }(s);
    t.AudioLoadCommand = u;
    var c = function(o) {
        function t(t, e, i) {
            void 0 === e && (e = null),
            void 0 === i && (i = -1);
            var n = o.call(this) || this;
            return n._url = t,
            n._type = i,
            (n._name = e) || (n._name = t),
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var t, e = this, i = new Image, n = this._name;
            t = this._type == l.PIXI ? function() {
                var t = new PIXI.Texture(new PIXI.BaseTexture(i));
                PIXI.Texture.addTextureToCache(t, n),
                r.add(n, t),
                setTimeout(function() {
                    e._complete()
                }, 10)
            }
            : this._type == l.THREE ? function() {
                var t = new THREE.Texture(i);
                t.needsUpdate = !0,
                r.add(n, t),
                setTimeout(function() {
                    e._complete()
                }, 10)
            }
            : function() {
                r.add(n, i),
                setTimeout(function() {
                    e._complete()
                }, 10)
            }
            ,
            i.onload = t,
            i.src = this._url
        }
        ,
        t.prototype._complete = function() {
            this._dispatchComplete()
        }
        ,
        t
    }(s);
    t.ImageLoadCommand = c;
    var d = function(r) {
        function t(t, e, i) {
            void 0 === e && (e = 1),
            void 0 === i && (i = 0);
            for (var n = r.call(this, e) || this, o = t.length, s = 0; s < o; s++)
                n.add(new p(t[s],i));
            return n
        }
        return __extends(t, r),
        t
    }(_);
    t.ScriptsLoaderCommand = d;
    var p = function(n) {
        function t(t, e) {
            void 0 === e && (e = 0);
            var i = n.call(this) || this;
            return i._url = t,
            i._ver = e,
            i
        }
        return __extends(t, n),
        t.prototype.execute = function() {
            var t = this;
            $.ajax({
                url: this._url + "?" + this._ver,
                cache: !0,
                dataType: "script"
            }).then(function() {
                return t._complete()
            }, function() {
                return t._failed()
            })
        }
        ,
        t.prototype._complete = function() {
            this._dispatchComplete()
        }
        ,
        t.prototype._failed = function() {
            this._dispatchFailed()
        }
        ,
        t
    }(s)
      , l = function() {
        function t() {}
        return t.PIXI = 0,
        t.THREE = 1,
        t.IMG = 2,
        t
    }();
    t.JsonBase64Type = l;
    var f = function(o) {
        function t(t, e, i) {
            void 0 === e && (e = 0),
            void 0 === i && (i = .3);
            var n = o.call(this) || this;
            return n._keys = [],
            n._url = t,
            n._type = e,
            n._jsonRate = i,
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var e = this
              , t = {
                method: "GET",
                url: this._url,
                dataType: "json",
                success: function(t) {
                    e._complete(t)
                },
                xhr: function() {
                    var t = $.ajaxSettings.xhr();
                    return t.onprogress = function(t) {
                        e._dispatchProgress(e._jsonRate * (t.loaded / t.total))
                    }
                    ,
                    t
                }
            };
            $.ajax(t)
        }
        ,
        t.prototype._complete = function(t) {
            this._data = t;
            var e = 0;
            for (var i in t)
                this._keys[e++] = i;
            this._now = -1,
            this._len = e,
            this._next()
        }
        ,
        t.prototype._next = function() {
            if (this._now++,
            this._now < this._len) {
                this._dispatchProgress(this._jsonRate + (1 - this._jsonRate) * (this._now / this._len));
                var e = this
                  , i = this._keys[this._now]
                  , t = this._data[i];
                if (0 < i.lastIndexOf(".mp3") || 0 < i.lastIndexOf(".ogg"))
                    if (aidn.util.webaudio) {
                        var n = new aidn.WebAudio;
                        r.add(i, n),
                        n.load(t, function() {
                            e._next()
                        })
                    } else
                        setTimeout(function() {
                            e._next()
                        }, 10);
                else {
                    var o, s = new Image;
                    o = this._type == l.PIXI ? function() {
                        var t = new PIXI.Texture(new PIXI.BaseTexture(s));
                        PIXI.Texture.addToCache ? PIXI.Texture.addToCache(t, i) : PIXI.Texture.addTextureToCache(t, i),
                        r.add(i, t),
                        setTimeout(function() {
                            e._next()
                        }, 10)
                    }
                    : this._type == l.THREE ? function() {
                        var t = new THREE.Texture(s);
                        t.needsUpdate = !0,
                        r.add(i, t),
                        setTimeout(function() {
                            e._next()
                        }, 10)
                    }
                    : function() {
                        r.add(i, s),
                        setTimeout(function() {
                            e._next()
                        }, 10)
                    }
                    ,
                    s.onload = o,
                    s.src = t
                }
            } else
                this._dispatchComplete()
        }
        ,
        t
    }(s);
    t.JsonBase64LoadCommand = f;
    var m = function() {
        function t(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = t,
            this.y = e
        }
        return t.prototype.set = function(t, e) {
            return void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = t,
            this.y = e,
            this
        }
        ,
        t.prototype.clone = function() {
            return new t(this.x,this.y)
        }
        ,
        t
    }();
    t.Point = m
}(aidnlib || (aidnlib = {}));
var aidnlib, twintail;
__extends = this && this.__extends || function() {
    var n = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] = e[i])
    }
    ;
    return function(t, e) {
        function i() {
            this.constructor = t
        }
        n(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
}();
!function(t) {
    var r = function() {
        function t() {}
        return t.get = function(t) {
            return this._data[t]
        }
        ,
        t.add = function(t, e) {
            this._data[t] = e
        }
        ,
        t._data = {},
        t
    }();
    t.Assets = r;
    var i = function() {};
    t.Ref = i;
    var e = function() {
        function t() {
            this.__keyCount = 0,
            this.__updates = {},
            this.__resizes = {}
        }
        return t.prototype.initialize = function() {
            i.stw = aidn.window.width(),
            i.sth = aidn.window.height(),
            aidn.util.needExpandArea(!0),
            aidn.window.addDummyDiv()
        }
        ,
        t.prototype._start = function() {
            var t = this;
            i.time = Date.now() / 1e3,
            aidn.window.resize(function() {
                return t._resize()
            }, !0),
            this._resize(),
            this._update()
        }
        ,
        t.prototype.addUpdate = function(t, e) {
            t.__key || (t.__key = "key_" + this.__keyCount,
            this.__keyCount++),
            this.__updates[t.__key] = e
        }
        ,
        t.prototype.removeUpdate = function(t) {
            t.__key && delete this.__updates[t.__key]
        }
        ,
        t.prototype.addResize = function(t, e) {
            t.__key2 || (t.__key2 = "key_" + this.__keyCount,
            this.__keyCount++),
            this.__resizes[t.__key2] = e
        }
        ,
        t.prototype.removeResize = function(t) {
            t.__key2 && delete this.__resizes[t.__key2]
        }
        ,
        t.prototype._update = function() {
            var t = Date.now() / 1e3;
            for (var e in i.delta = t - i.time,
            i.time = t,
            this.__updates)
                this.__updates[e]()
        }
        ,
        t.prototype._resize = function() {
            for (var t in i.stw = aidn.window.width(),
            i.sth = aidn.window.height(),
            this.__resizes)
                this.__resizes[t]()
        }
        ,
        t
    }();
    t.MainBase = e;
    var n = function() {
        function t() {
            this.listeners = {}
        }
        return t.prototype.dispatchEvent = function(t) {
            var e, i;
            if (t instanceof a ? (i = t.type,
            e = t) : e = new a(i = t),
            null != this.listeners[i])
                for (var n = (e.currentTarget = this).listeners[i].length, o = 0; o < n && this.listeners[i]; o++) {
                    var s = this.listeners[i][o];
                    try {
                        s.handler(e)
                    } catch (t) {
                        window.console && console.error(t.stack)
                    }
                }
        }
        ,
        t.prototype.addEventListener = function(t, e, i) {
            void 0 === i && (i = 0),
            null == this.listeners[t] && (this.listeners[t] = []),
            this.listeners[t].push(new o(t,e,i)),
            this.listeners[t].sort(function(t, e) {
                return e.priolity - t.priolity
            })
        }
        ,
        t.prototype.removeEventListener = function(t, e) {
            if (this.hasEventListener(t, e))
                for (var i = 0; i < this.listeners[t].length; i++) {
                    var n = this.listeners[t][i];
                    if (n.equalCurrentListener(t, e))
                        return n.handler = null,
                        void this.listeners[t].splice(i, 1)
                }
        }
        ,
        t.prototype.clearEventListener = function() {
            this.listeners = {}
        }
        ,
        t.prototype.containEventListener = function(t) {
            return null != this.listeners[t] && 0 < this.listeners[t].length
        }
        ,
        t.prototype.hasEventListener = function(t, e) {
            if (null == this.listeners[t])
                return !1;
            for (var i = 0; i < this.listeners[t].length; i++) {
                if (this.listeners[t][i].equalCurrentListener(t, e))
                    return !0
            }
            return !1
        }
        ,
        t
    }();
    t.EventDispatcher = n;
    var o = function() {
        function t(t, e, i) {
            void 0 === t && (t = null),
            void 0 === e && (e = null),
            void 0 === i && (i = 0),
            this.type = t,
            this.handler = e,
            this.priolity = i
        }
        return t.prototype.equalCurrentListener = function(t, e) {
            return this.type == t && this.handler == e
        }
        ,
        t
    }()
      , a = function(t, e) {
        void 0 === t && (t = null),
        void 0 === e && (e = null),
        this.type = t,
        this.data = e
    };
    t.Event = a;
    var s = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._loaded = !1,
            t
        }
        return __extends(t, e),
        t.prototype.execute = function() {}
        ,
        t.prototype.cancel = function() {}
        ,
        t.prototype._dispatchComplete = function() {
            this._loaded = !0,
            this.dispatchEvent(new h(h.COMPLETE))
        }
        ,
        t.prototype._dispatchFailed = function() {
            this.dispatchEvent(new h(h.FAILED))
        }
        ,
        t.prototype._dispatchProgress = function(t) {
            var e = new h(h.PROGRESS);
            e.progress = t,
            this.dispatchEvent(e)
        }
        ,
        t
    }(n);
    t.CommandBase = s;
    var h = function(e) {
        function t(t) {
            return e.call(this, t) || this
        }
        return __extends(t, e),
        t.COMPLETE = "complete",
        t.FAILED = "failed",
        t.PROGRESS = "progress",
        t
    }(a);
    t.CommandEvent = h;
    var _ = function(i) {
        function t(t) {
            void 0 === t && (t = 1);
            var e = i.call(this) || this;
            return e._rates = [],
            e._sum = 0,
            e._commands = [],
            e._now = 0,
            e._total = 0,
            e._compnum = 0,
            e._compflags = [],
            e._connectionNum = t,
            e
        }
        return __extends(t, i),
        t.prototype.execute = function() {
            if (this._loaded = !1,
            this._now = this._compnum = this._compRate = 0,
            this._compflags = [],
            this._progRates = [],
            this._total <= this._compnum)
                return this._dispatchProgress(1),
                void this._dispatchComplete();
            for (var t = Math.min(this._total, this._connectionNum), e = 0; e < t; e++)
                this._execute()
        }
        ,
        t.prototype.cancel = function() {
            if (!(this._total <= this._compnum))
                for (var t = 0; t < this._total; t++)
                    try {
                        var e = this._commands[t];
                        this._removeEvents(e),
                        e.cancel()
                    } catch (t) {}
        }
        ,
        t.prototype.add = function(t, e) {
            void 0 === e && (e = 1),
            this._commands[this._total] = t,
            this._rates[this._total] = e,
            this._sum += e,
            this._total++
        }
        ,
        t.prototype._execute = function() {
            var e = this;
            if (this._now < this._total) {
                this._rates[this._now] = this._rates[this._now] / this._sum,
                this._progRates[this._now] = 0;
                var t = this._commands[this._now];
                t.__id = this._now,
                t.addEventListener(h.COMPLETE, function(t) {
                    return e._complete(t)
                }),
                t.addEventListener(h.PROGRESS, function(t) {
                    return e._progress(t)
                }),
                t.addEventListener(h.FAILED, function(t) {
                    return e._failed(t)
                }),
                t.execute(),
                this._now++
            } else
                this._total <= this._compnum && (this._dispatchProgress(1),
                this._dispatchComplete())
        }
        ,
        t.prototype._removeEvents = function(t) {
            t.clearEventListener()
        }
        ,
        t.prototype._completeCommand = function(t, e) {}
        ,
        t.prototype._complete = function(t) {
            var e = t.currentTarget.__id
              , i = this._commands[e];
            this._removeEvents(i),
            this._compRate += this._rates[e],
            this._compflags[e] = !0,
            this.__progress(),
            this._completeCommand(i, e),
            this._compnum++,
            this._execute()
        }
        ,
        t.prototype._progress = function(t) {
            var e = t.currentTarget.__id;
            this._progRates[e] = t.progress * this._rates[e],
            this.__progress()
        }
        ,
        t.prototype.__progress = function() {
            for (var t = 0, e = 0; e < this._now; e++)
                this._compflags[e] || (t += this._progRates[e]);
            this._dispatchProgress(this._compRate + t)
        }
        ,
        t.prototype._failed = function(t) {
            var e = t.currentTarget.__id
              , i = this._commands[e];
            this._removeEvents(i),
            this._dispatchFailed()
        }
        ,
        Object.defineProperty(t.prototype, "loaded", {
            get: function() {
                return this._loaded
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    }(s);
    t.SequentialCommand = _;
    var u = function(s) {
        function t(t, e, i, n) {
            void 0 === e && (e = null),
            void 0 === i && (i = !1),
            void 0 === n && (n = -1);
            var o = s.call(this) || this;
            return o._id = e,
            o._url = t,
            o._isplay = i,
            o._trimvol = n,
            o
        }
        return __extends(t, s),
        t.prototype.execute = function() {
            var t = this
              , e = function() {
                t._complete()
            };
            this._audio = new aidn.AutoAudio(null),
            this._isplay ? (this._audio.load([this._url], null, this._trimvol),
            this._audio.play(0, !1, e, 0, 0)) : this._audio.load([this._url], e, this._trimvol)
        }
        ,
        t.prototype._complete = function() {
            this._isplay && this._audio.stop();
            var t = this._id;
            t || (t = this._url),
            r.add(t, this._audio),
            this._dispatchComplete()
        }
        ,
        t
    }(s);
    t.AudioLoadCommand = u;
    var c = function(o) {
        function t(t, e, i) {
            void 0 === e && (e = null),
            void 0 === i && (i = -1);
            var n = o.call(this) || this;
            return n._url = t,
            n._type = i,
            (n._name = e) || (n._name = t),
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var t, e = this, i = new Image, n = this._name;
            t = this._type == l.PIXI ? function() {
                var t = new PIXI.Texture(new PIXI.BaseTexture(i));
                PIXI.Texture.addTextureToCache(t, n),
                r.add(n, t),
                setTimeout(function() {
                    e._complete()
                }, 10)
            }
            : this._type == l.THREE ? function() {
                var t = new THREE.Texture(i);
                t.needsUpdate = !0,
                r.add(n, t),
                setTimeout(function() {
                    e._complete()
                }, 10)
            }
            : function() {
                r.add(n, i),
                setTimeout(function() {
                    e._complete()
                }, 10)
            }
            ,
            i.onload = t,
            i.src = this._url
        }
        ,
        t.prototype._complete = function() {
            this._dispatchComplete()
        }
        ,
        t
    }(s);
    t.ImageLoadCommand = c;
    var d = function(r) {
        function t(t, e, i) {
            void 0 === e && (e = 1),
            void 0 === i && (i = 0);
            for (var n = r.call(this, e) || this, o = t.length, s = 0; s < o; s++)
                n.add(new p(t[s],i));
            return n
        }
        return __extends(t, r),
        t
    }(_);
    t.ScriptsLoaderCommand = d;
    var p = function(n) {
        function t(t, e) {
            void 0 === e && (e = 0);
            var i = n.call(this) || this;
            return i._url = t,
            i._ver = e,
            i
        }
        return __extends(t, n),
        t.prototype.execute = function() {
            var t = this;
            $.ajax({
                url: this._url + "?" + this._ver,
                cache: !0,
                dataType: "script"
            }).then(function() {
                return t._complete()
            }, function() {
                return t._failed()
            })
        }
        ,
        t.prototype._complete = function() {
            this._dispatchComplete()
        }
        ,
        t.prototype._failed = function() {
            this._dispatchFailed()
        }
        ,
        t
    }(s)
      , l = function() {
        function t() {}
        return t.PIXI = 0,
        t.THREE = 1,
        t.IMG = 2,
        t
    }();
    t.JsonBase64Type = l;
    var f = function(o) {
        function t(t, e, i) {
            void 0 === e && (e = 0),
            void 0 === i && (i = .3);
            var n = o.call(this) || this;
            return n._keys = [],
            n._url = t,
            n._type = e,
            n._jsonRate = i,
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var e = this
              , t = {
                method: "GET",
                url: this._url,
                dataType: "json",
                success: function(t) {
                    e._complete(t)
                },
                xhr: function() {
                    var t = $.ajaxSettings.xhr();
                    return t.onprogress = function(t) {
                        e._dispatchProgress(e._jsonRate * (t.loaded / t.total))
                    }
                    ,
                    t
                }
            };
            $.ajax(t)
        }
        ,
        t.prototype._complete = function(t) {
            this._data = t;
            var e = 0;
            for (var i in t)
                this._keys[e++] = i;
            this._now = -1,
            this._len = e,
            this._next()
        }
        ,
        t.prototype._next = function() {
            if (this._now++,
            this._now < this._len) {
                this._dispatchProgress(this._jsonRate + (1 - this._jsonRate) * (this._now / this._len));
                var e = this
                  , i = this._keys[this._now]
                  , t = this._data[i];
                if (0 < i.lastIndexOf(".mp3") || 0 < i.lastIndexOf(".ogg"))
                    if (aidn.util.webaudio) {
                        var n = new aidn.WebAudio;
                        r.add(i, n),
                        n.load(t, function() {
                            e._next()
                        })
                    } else
                        setTimeout(function() {
                            e._next()
                        }, 10);
                else {
                    var o, s = new Image;
                    o = this._type == l.PIXI ? function() {
                        var t = new PIXI.Texture(new PIXI.BaseTexture(s));
                        PIXI.Texture.addToCache ? PIXI.Texture.addToCache(t, i) : PIXI.Texture.addTextureToCache(t, i),
                        r.add(i, t),
                        setTimeout(function() {
                            e._next()
                        }, 10)
                    }
                    : this._type == l.THREE ? function() {
                        var t = new THREE.Texture(s);
                        t.needsUpdate = !0,
                        r.add(i, t),
                        setTimeout(function() {
                            e._next()
                        }, 10)
                    }
                    : function() {
                        r.add(i, s),
                        setTimeout(function() {
                            e._next()
                        }, 10)
                    }
                    ,
                    s.onload = o,
                    s.src = t
                }
            } else
                this._dispatchComplete()
        }
        ,
        t
    }(s);
    t.JsonBase64LoadCommand = f;
    var m = function() {
        function t(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = t,
            this.y = e
        }
        return t.prototype.set = function(t, e) {
            return void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = t,
            this.y = e,
            this
        }
        ,
        t.prototype.clone = function() {
            return new t(this.x,this.y)
        }
        ,
        t
    }();
    t.Point = m
}(aidnlib || (aidnlib = {})),
function(t) {
    t.checkLoop = function() {
        "undefined" == typeof jQuery || "undefined" == typeof PIXI || "undefined" == typeof TweenMax || "undefined" == typeof aidn ? setTimeout(t.checkLoop, 10) : $(function() {
            t.active()
        })
    }
    ,
    t.active = function() {
        (new c).init()
    }
    ;
    var n, e, h = function() {
        function t() {}
        return t.stw = 1,
        t.sth = 1,
        t.delta = 0,
        t.state = 0,
        t.__mainSound = !1,
        t.__mainJson = !1,
        t.__rec = !1,
        t
    }(), o = function() {
        function t() {}
        return t.SHARE_URL = "https://aidn.jp/twintail/",
        t.BGM_PATH = "data/bgm.mp3",
        t.GAME_TIME = 30,
        t
    }();
    (e = n || (n = {}))[e.TOP = 0] = "TOP",
    e[e.LOADING = 1] = "LOADING",
    e[e.READY = 2] = "READY",
    e[e.START = 3] = "START",
    e[e.END = 4] = "END";
    var i = function() {
        function t() {}
        return t.convertTime = function(t) {
            var e = Math.floor(t)
              , i = Math.floor(100 * t) % 100;
            return this.keta(e, 2) + "." + this.keta(i, 2)
        }
        ,
        t.keta = function(t, e, i) {
            void 0 === i && (i = "0");
            for (var n = t + "", o = n.length; o < e; o++)
                n = i + n;
            return n
        }
        ,
        t
    }()
      , s = function() {
        function t() {}
        return t.prototype.playBGM = function() {
            if (h.player.soundOn && !h.__rec) {
                var t = aidnlib.Assets.get(o.BGM_PATH);
                t && (t.play(0, !0),
                t.volume = 0,
                TweenMax.killTweensOf(t),
                TweenMax.to(t, .6, {
                    volume: 1,
                    ease: Power1.easeOut
                }).play())
            }
        }
        ,
        t.prototype.stopBGM = function() {
            var t = this;
            if (h.player.soundOn) {
                var e = aidnlib.Assets.get(o.BGM_PATH);
                e && (TweenMax.killTweensOf(e),
                TweenMax.to(e, 1.2, {
                    volume: 0,
                    ease: Power1.easeOut,
                    onComplete: function() {
                        return t._stopComplete()
                    }
                }))
            }
        }
        ,
        t.prototype._stopComplete = function() {
            var t = aidnlib.Assets.get(o.BGM_PATH);
            t && t.stop()
        }
        ,
        t.prototype.playSEGetReady = function() {
            this._playSE("getready.mp3")
        }
        ,
        t.prototype.playSEGo = function() {
            this._playSE("go.mp3")
        }
        ,
        t.prototype.playSEOk = function() {
            this._playSE("ok.mp3")
        }
        ,
        t.prototype._playSE = function(t, e) {
            if (void 0 === e && (e = 1),
            h.player.soundOn) {
                var i = aidnlib.Assets.get(t);
                i && i.play(0, !1, null, 0, e)
            }
        }
        ,
        t
    }()
      , r = function() {
        function t() {
            this._hiSocre = -1;
            var t = parseInt(aidn.util.getCookie("score"));
            0 <= t && (this._hiSocre = t,
            this._updateHiScore());
            var e = parseInt(aidn.util.getCookie("sound"));
            this.soundOn = !0,
            0 == e && (this.soundOn = !1),
            this._updateSound()
        }
        return t.prototype._updateHiScore = function() {
            var t = "Hi-SCORE " + this._hiSocre + " / RANK " + this._getRank(this._hiSocre);
            $("#data").text(t),
            $("#data").css("display", "block"),
            $("#main .hiscore").text("Hi-SCORE: " + this._hiSocre),
            aidn.util.setCookie("score", this._hiSocre, 31536e3)
        }
        ,
        t.prototype._getRank = function(t) {
            for (var e = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 225, 250, 275, 300, 350, 400, 500], i = ["D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+", "SS-", "SS", "SS+", "SSS-", "SSS", "SSS+", "GOD"], n = e.length, o = 0; o < n; o++)
                if (t < e[o])
                    return i[o];
            return i[o]
        }
        ,
        t.prototype.getRank = function(t) {
            return this._getRank(t)
        }
        ,
        t.prototype.changeSound = function() {
            this.soundOn = !this.soundOn,
            this._updateSound()
        }
        ,
        t.prototype._updateSound = function() {
            var t, e, i = $("#bt_sound");
            this.soundOn ? (t = "SOUND ON",
            e = 1,
            i.addClass("on")) : (t = "SOUND OFF",
            e = 0,
            i.removeClass("on")),
            i.text(t),
            aidn.util.setCookie("sound", e, 31536e3)
        }
        ,
        t.prototype.updateScore = function() {
            var t = this._getRank(this.score)
              , e = "rank_" + t.charAt(0).toLowerCase();
            return $("#end .rank").html("RANK <span class='" + e + "'>" + t + "</span>"),
            $("#end .score").html("SCORE <span>" + this.score + "</span>"),
            $("#end .record").css("display", "none"),
            this._hiSocre < this.score && ($("#end .record").css("display", "block"),
            this._hiSocre = this.score,
            this._updateHiScore(),
            !0)
        }
        ,
        t
    }()
      , a = function(n) {
        function t() {
            var t = n.call(this) || this
              , e = aidn.init.basepath
              , i = "?" + aidn.init.ver;
            return t.add(new aidnlib.JsonBase64LoadCommand(e + "data/init/data.json" + i,aidnlib.JsonBase64Type.PIXI), 1),
            t
        }
        return __extends(t, n),
        t
    }(aidnlib.SequentialCommand)
      , _ = function(n) {
        function t() {
            var t = n.call(this) || this
              , e = aidn.init.basepath
              , i = "?" + aidn.init.ver;
            return h.player.soundOn && (h.__mainSound || (h.__mainSound = !0,
            t.add(new aidnlib.AudioLoadCommand(e + o.BGM_PATH + i,o.BGM_PATH), 1))),
            h.__mainJson || (h.__mainJson = !0,
            t.add(new aidnlib.JsonBase64LoadCommand(e + "data/main/data.json" + i,aidnlib.JsonBase64Type.PIXI), 1)),
            t
        }
        return __extends(t, n),
        t
    }(aidnlib.SequentialCommand)
      , u = function() {
        function t() {
            this._elems = [];
            var t = $("h1 span");
            this._n = -1;
            for (var e = t.length, i = 0; i < e; i++) {
                var n = $(t[i]);
                n.css("visibility", "hidden"),
                n.hasClass("kaku") ? this._elemKaku = n : this._elems.push(n)
            }
        }
        return t.prototype.show = function() {
            this._next()
        }
        ,
        t.prototype._next = function() {
            var t, e = this, i = aidn.math.rand(40, 120);
            if (Math.random() < .5 && (i = -i),
            this._n++,
            this._elems.length <= this._n)
                return (t = this._elemKaku).css("visibility", "visible"),
                void TweenMax.fromTo(t, .7, {
                    rotation: 35 + i,
                    scale: 4
                }, {
                    rotation: 35,
                    scale: 2.5,
                    ease: Elastic.easeOut.config(1, .3)
                });
            (t = this._elems[this._n]).css("visibility", "visible"),
            TweenMax.fromTo(t, .7, {
                rotation: i,
                scale: 2
            }, {
                rotation: 0,
                scale: 1,
                ease: Elastic.easeOut.config(1, .3)
            }),
            TweenMax.delayedCall(.1, function() {
                return e._next()
            })
        }
        ,
        t
    }()
      , c = function() {
        function t() {
            this.__updateId = -1,
            this.__updateFuncs = {},
            this.__resizeId = -1,
            this.__resizeFuncs = {},
            h.main = this
        }
        return t.prototype.init = function() {
            var e = this;
            PIXI.utils.skipHello(),
            aidn.util.needExpandArea(!0),
            aidn.window.addDummyDiv();
            var i = o.SHARE_URL;
            $("#bt_tw").click(function(t) {
                var e = document.title;
                aidn.social.shareTw(i, !0, e, "daniwell_aidn")
            }),
            $("#bt_fb").click(function(t) {
                aidn.social.shareFb(i, !0)
            }),
            $("#bt_gp").click(function(t) {
                aidn.social.shareGp(i, !0)
            }),
            1 == aidn.util.getQuery().rec && (h.__rec = !0),
            aidn.util.checkJapanese() ? $(".en").css("display", "none") : ($(".ja").css("display", "none"),
            $("#data").css("margin-top", 3));
            var t = aidn.util.checkMobile();
            t ? $(".pc").css("display", "none") : $(".mb").css("display", "none"),
            $("#bt_start  a").click(function(t) {
                return e._clickStart(t)
            }),
            $("#bt_howto  a").click(function(t) {
                return e._clickHowto(t)
            }),
            $("#bt_credit a").click(function(t) {
                return e._clickCredit(t)
            }),
            $("#cover,.close,#howto").click(function(t) {
                return e._clickFloatClose(t)
            }),
            $("#bt_tweet a").click(function(t) {
                return e._clickTweet(t)
            }),
            $("#bt_backe a").click(function(t) {
                return e._clickBacke(t)
            }),
            $("#bt_end").click(function(t) {
                return e._clickEnd(t)
            }),
            $("#bt_sound").click(function(t) {
                return e._clickSound(t)
            }),
            t ? ($("#bt_left").on("touchstart", function(t) {
                return e._onLeft(t)
            }),
            $("#bt_left").on("touchend", function(t) {
                return e._offLeft(t)
            }),
            $("#bt_right").on("touchstart", function(t) {
                return e._onRight(t)
            }),
            $("#bt_right").on("touchend", function(t) {
                return e._offRight(t)
            })) : ($("#bt_left").on("mousedown", function(t) {
                return e._onLeft(t)
            }),
            $("#bt_left").on("mouseup", function(t) {
                return e._offLeft(t)
            }),
            $("#bt_right").on("mousedown", function(t) {
                return e._onRight(t)
            }),
            $("#bt_right").on("mouseup", function(t) {
                return e._offRight(t)
            }),
            $(window).keydown(function(t) {
                return e._keyDown(t)
            }),
            $(window).keyup(function(t) {
                return e._keyUp(t)
            })),
            h.sound = new s,
            h.player = new r,
            this._pixi = new y,
            this._initCmd = new a,
            this._initCmd.addEventListener(aidnlib.CommandEvent.COMPLETE, function(t) {
                return e._initComplete(t)
            }),
            this._initCmd.addEventListener(aidnlib.CommandEvent.PROGRESS, function(t) {
                return e._initProgress(t)
            }),
            this._initCmd.execute()
        }
        ,
        t.prototype._onLeft = function(t) {
            t.preventDefault(),
            $("#bt_left").addClass("on"),
            h.left = !0
        }
        ,
        t.prototype._offLeft = function(t) {
            t.preventDefault(),
            $("#bt_left").removeClass("on"),
            h.left = !1
        }
        ,
        t.prototype._onRight = function(t) {
            t.preventDefault(),
            $("#bt_right").addClass("on"),
            h.right = !0
        }
        ,
        t.prototype._offRight = function(t) {
            t.preventDefault(),
            $("#bt_right").removeClass("on"),
            h.right = !1
        }
        ,
        t.prototype._keyDown = function(t) {
            switch (t.keyCode) {
            case 37:
            case 90:
            case 100:
                $("#bt_left").addClass("on"),
                h.left = !0;
                break;
            case 39:
            case 88:
            case 102:
                $("#bt_right").addClass("on"),
                h.right = !0
            }
        }
        ,
        t.prototype._keyUp = function(t) {
            switch (t.keyCode) {
            case 37:
            case 90:
            case 100:
                $("#bt_left").removeClass("on"),
                h.left = !1;
                break;
            case 39:
            case 88:
            case 102:
                $("#bt_right").removeClass("on"),
                h.right = !1
            }
        }
        ,
        t.prototype.changeState = function(t) {
            switch (this._pixi.changeState(t),
            h.state = t) {
            case n.TOP:
                this.__changeTop();
                break;
            case n.LOADING:
                this.__changeLoading();
                break;
            case n.READY:
                this.__changeReady();
                break;
            case n.START:
                this.__changeStart();
                break;
            case n.END:
                this.__changeEnd()
            }
        }
        ,
        t.prototype.__changeTop = function() {
            $("#end").stop().fadeOut(200, "linear"),
            $("#top").stop().fadeIn(200, "linear"),
            $("#bt_back,#bt_sound").stop().fadeIn(200, "linear"),
            aidn.adv.show()
        }
        ,
        t.prototype.__changeLoading = function() {
            $("#top").stop().fadeOut(200, "linear"),
            $("#bt_back,#bt_sound").stop().fadeOut(200, "linear"),
            $("#loading").stop().fadeIn(200, "linear"),
            aidn.adv.hide()
        }
        ,
        t.prototype.__changeReady = function() {
            $("#loading").stop().fadeOut(200, "linear"),
            $("#bt_end").stop().fadeOut(0),
            $("#main").stop().fadeIn(200, "linear"),
            $("#center_tx").text("GET READY"),
            $("#center_tx").fadeIn(0);
            var t = Back.easeOut.config(1.7);
            TweenMax.fromTo($("#center_tx"), .5, {
                css: {
                    scale: 0
                }
            }, {
                css: {
                    scale: 1
                },
                ease: t
            }),
            h.player.score = 0,
            $("#main .score").text(h.player.score),
            h.player.time = o.GAME_TIME;
            var e = i.convertTime(h.player.time);
            $("#main .time").text(e),
            h.sound.playSEGetReady()
        }
        ,
        t.prototype.__changeStart = function() {
            $("#bt_end").stop().fadeIn(200, "linear");
            var t = Back.easeOut.config(1.7);
            TweenMax.fromTo($("#center_tx"), .5, {
                css: {
                    scale: 0
                }
            }, {
                css: {
                    scale: 1.5
                },
                ease: t
            }),
            $("#center_tx").text("GO!"),
            $("#center_tx").delay(1500).fadeOut(200, "linear"),
            h.sound.playSEGo(),
            h.sound.playBGM()
        }
        ,
        t.prototype.__changeEnd = function() {
            h.sound.stopBGM(),
            h.player.updateScore(),
            $("#main").stop().fadeOut(200, "linear"),
            $("#end").stop().delay(400).fadeIn(200, "linear")
        }
        ,
        t.prototype.__updateStart = function() {
            h.player.time -= h.delta,
            h.player.time < 0 && (h.player.time = 0,
            this.changeState(n.END));
            var t = i.convertTime(h.player.time);
            $("#main .time").text(t)
        }
        ,
        t.prototype.addUpdate = function(t) {
            return this.__updateId++,
            this.__updateFuncs[this.__updateId] = t,
            this.__updateId
        }
        ,
        t.prototype.removeUpdate = function(t) {
            this.__updateFuncs[t] && delete this.__updateFuncs[t]
        }
        ,
        t.prototype.addResize = function(t) {
            return this.__resizeId++,
            this.__resizeFuncs[this.__resizeId] = t,
            this.__resizeId
        }
        ,
        t.prototype.removeResize = function(t) {
            this.__resizeFuncs[t] && delete this.__resizeFuncs[t]
        }
        ,
        t.prototype._initProgress = function(t) {}
        ,
        t.prototype._initComplete = function(t) {
            var e = this;
            this._pixi.init(),
            $("#loading_first").fadeOut(200, "linear"),
            $("#top").fadeIn(200, "linear"),
            $("#bt_back,#bt_sound").stop().fadeIn(200, "linear"),
            (new u).show();
            var i = 1;
            $("#bt_start").css("opacity", 0).delay(150 * i).animate({
                opacity: 1
            }, 250),
            i++,
            $("#bt_howto").css("opacity", 0).delay(150 * i).animate({
                opacity: 1
            }, 250),
            i++,
            $("#bt_credit").css("opacity", 0).delay(150 * i).animate({
                opacity: 1
            }, 250),
            i++,
            $("#sns").css("opacity", 0).delay(150 * i).animate({
                opacity: 1
            }, 250),
            i++,
            aidn.window.resize(function() {
                return e._resize()
            }),
            this._resize(),
            this._preTime = aidn.util.getTime(),
            this._update(),
            aidn.adv.show()
        }
        ,
        t.prototype._mainProgress = function(t) {
            var e = 100 * t.progress + "%";
            $("#loading p").width(e)
        }
        ,
        t.prototype._mainComplete = function(t) {
            var e = this;
            $("#loading p").width(0),
            this.changeState(n.READY),
            setTimeout(function() {
                return e.changeState(n.START)
            }, 2500)
        }
        ,
        t.prototype._clickStart = function(t) {
            var e = this;
            t.preventDefault(),
            this._mainCmd && (this._mainCmd.clearEventListener(),
            this._mainCmd.cancel()),
            this.changeState(n.LOADING),
            this._mainCmd = new _,
            this._mainCmd.addEventListener(aidnlib.CommandEvent.COMPLETE, function(t) {
                return e._mainComplete(t)
            }),
            this._mainCmd.addEventListener(aidnlib.CommandEvent.PROGRESS, function(t) {
                return e._mainProgress(t)
            }),
            this._mainCmd.execute()
        }
        ,
        t.prototype._clickHowto = function(t) {
            t.preventDefault(),
            $("#cover,#howto").stop().fadeIn(200, "linear")
        }
        ,
        t.prototype._clickCredit = function(t) {
            t.preventDefault(),
            $("#cover,#credit").stop().fadeIn(200, "linear")
        }
        ,
        t.prototype._clickSound = function(t) {
            h.player.changeSound()
        }
        ,
        t.prototype._clickEnd = function(t) {
            this.changeState(n.END)
        }
        ,
        t.prototype._clickTweet = function(t) {
            t.preventDefault();
            var e = document.title + "\nSCORE " + h.player.score + " / RANK " + h.player.getRank(h.player.score);
            aidn.social.shareTw(o.SHARE_URL, !0, e, "daniwell_aidn")
        }
        ,
        t.prototype._clickBacke = function(t) {
            t.preventDefault(),
            this.changeState(n.TOP)
        }
        ,
        t.prototype._clickFloatClose = function(t) {
            t.preventDefault(),
            $("#cover,#credit,#howto").stop().fadeOut(200, "linear")
        }
        ,
        t.prototype._update = function() {
            var t = this
              , e = aidn.util.getTime() / 1e3;
            for (var i in h.delta = e - this._preTime,
            this._preTime = e,
            this.__updateFuncs)
                this.__updateFuncs[i]();
            switch (h.state) {
            case n.START:
                this.__updateStart()
            }
            this._pixi.update(),
            window.requestAnimFrame(function() {
                return t._update()
            })
        }
        ,
        t.prototype._resize = function() {
            var t = aidn.window.width()
              , e = aidn.window.height();
            for (var i in h.stw = t,
            h.sth = e,
            this.__resizeFuncs)
                this.__resizeFuncs[i]();
            this._pixi.resize()
        }
        ,
        t
    }()
      , d = function() {
        function t(t, e) {
            void 0 === e && (e = null),
            this._target = t,
            e && e.addChild(t)
        }
        return t.prototype.addChild = function(t) {
            this._target.addChild(t)
        }
        ,
        Object.defineProperty(t.prototype, "x", {
            get: function() {
                return this._target.x
            },
            set: function(t) {
                this._target.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "y", {
            get: function() {
                return this._target.y
            },
            set: function(t) {
                this._target.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "width", {
            get: function() {
                return this._target.width
            },
            set: function(t) {
                this._target.width = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "height", {
            get: function() {
                return this._target.height
            },
            set: function(t) {
                this._target.height = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scale", {
            get: function() {
                return this._target.scale.x
            },
            set: function(t) {
                this._target.scale.set(t, t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleX", {
            get: function() {
                return this._target.scale.x
            },
            set: function(t) {
                this._target.scale.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleY", {
            get: function() {
                return this._target.scale.y
            },
            set: function(t) {
                this._target.scale.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotation", {
            get: function() {
                return this._target.rotation
            },
            set: function(t) {
                this._target.rotation = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "visible", {
            get: function() {
                return this._target.visible
            },
            set: function(t) {
                this._target.visible = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "alpha", {
            get: function() {
                return this._target.alpha
            },
            set: function(t) {
                this._target.alpha = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "target", {
            get: function() {
                return this._target
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    }()
      , p = function(a) {
        function t(t, e, i) {
            void 0 === e && (e = !1),
            void 0 === i && (i = !1);
            var n = this
              , o = "twin_l.png";
            e || (o = "twin_r.png"),
            i && (o = e ? "frame_l.png" : "frame_r.png");
            var s = aidnlib.Assets.get(o)
              , r = new PIXI.Sprite(s);
            return (n = a.call(this, r, t) || this)._left = e,
            n._tex = s,
            e ? r.anchor.set(.754, .116) : r.anchor.set(.25, .113),
            n.__d = 0,
            n
        }
        return __extends(t, a),
        t.prototype.checkAngle = function(t) {
            var e = 0;
            return Math.abs(t.rotation - this.rotation) < aidn.math.toRad(10) ? (e = 1,
            this.__t += h.delta,
            .04 < this.__t && (this.__t -= .04,
            t.visible = !t.visible)) : (this.__t = 0,
            t.visible = !0),
            e
        }
        ,
        t.prototype.update = function(t) {
            t ? (0 == this.rotation && (this.__d = 0),
            this.__d += .108 * h.delta,
            .028 < this.__d && (this.__d = .028)) : (this.__d -= .108 * h.delta,
            this.__d < -.028 && (this.__d = -.028)),
            this._left ? (this.rotation += this.__d,
            this.rotation < 0 && (this.rotation = 0),
            aidn.math.toRad(150) < this.rotation && (this.rotation = aidn.math.toRad(150))) : (this.rotation -= this.__d,
            0 < this.rotation && (this.rotation = 0),
            this.rotation < aidn.math.toRad(-150) && (this.rotation = aidn.math.toRad(-150)))
        }
        ,
        t.prototype.flash = function() {
            this.alpha = 1;
            var t = this;
            TweenMax.delayedCall(.06, function() {
                t.alpha = 0
            }).play(),
            TweenMax.delayedCall(.12, function() {
                t.alpha = 1
            }).play()
        }
        ,
        t.prototype.end = function() {
            this._end1()
        }
        ,
        t.prototype._end1 = function() {
            var t = this
              , e = aidn.math.toRad(110);
            this._left || (e = -e),
            TweenMax.to(this, 1.5, {
                rotation: e,
                ease: Power1.easeInOut,
                onComplete: function() {
                    return t._end2()
                }
            })
        }
        ,
        t.prototype._end2 = function() {
            var t = this
              , e = aidn.math.toRad(35);
            this._left || (e = -e),
            TweenMax.to(this, 1.5, {
                rotation: e,
                ease: Power1.easeInOut,
                onComplete: function() {
                    return t._end1()
                }
            })
        }
        ,
        t.prototype.startIntro = function() {
            var t = this;
            this._timeoutId = setTimeout(function() {
                return t._motion()
            }, 1e3)
        }
        ,
        t.prototype._motion = function() {
            var t = this
              , e = aidn.math.toRad(aidn.math.rand(40, 120));
            this._left || (e = aidn.math.toRad(-aidn.math.rand(40, 120)));
            var i = aidn.math.rand(.6, 1.2);
            TweenMax.to(this, i, {
                rotation: e,
                ease: Power2.easeOut,
                onComplete: function() {
                    return t._motion2()
                }
            })
        }
        ,
        t.prototype._motion2 = function() {
            var t = this
              , e = aidn.math.rand(1.2, 2);
            TweenMax.to(this, e, {
                rotation: 0,
                ease: Bounce.easeOut
            }),
            this._timeoutId = setTimeout(function() {
                return t._motion()
            }, 1700 * e)
        }
        ,
        t.prototype.reset = function(t) {
            clearTimeout(this._timeoutId),
            TweenMax.killTweensOf(this),
            TweenMax.to(this, t, {
                rotation: 0,
                ease: Power2.easeOut
            })
        }
        ,
        t.prototype.resize = function(t) {
            var e = t.x
              , i = t.y + .16 * t.height
              , n = .471 * t.width;
            this._left ? e -= n : e += n,
            this.x = e,
            this.y = i,
            this.scale = t.scale,
            this._body = t
        }
        ,
        t
    }(d)
      , l = function(o) {
        function t(t) {
            var e = this
              , i = aidnlib.Assets.get("miku_jito.png")
              , n = new PIXI.Sprite(i);
            return (e = o.call(this, n, t) || this)._sp = n,
            e._tex = i,
            n.anchor.set(.5, 0),
            e._gra = new PIXI.Graphics,
            t.addChild(e._gra),
            e._timeoutId = -1,
            e
        }
        return __extends(t, o),
        t.prototype.top = function() {
            this._tex = aidnlib.Assets.get("miku_jito.png"),
            this._sp.texture = this._tex
        }
        ,
        t.prototype.start = function() {
            this._tex = aidnlib.Assets.get("miku.png"),
            this._sp.texture = this._tex
        }
        ,
        t.prototype.ok = function() {
            var t = this;
            this._tex = aidnlib.Assets.get("miku_x.png"),
            this._sp.texture = this._tex,
            clearTimeout(this._timeoutId),
            this._timeoutId = setTimeout(function() {
                return t._okComp()
            }, 500)
        }
        ,
        t.prototype.end = function() {
            this._tex = aidnlib.Assets.get("miku_x.png"),
            this._sp.texture = this._tex
        }
        ,
        t.prototype._okComp = function() {
            this._tex = aidnlib.Assets.get("miku.png"),
            this._sp.texture = this._tex
        }
        ,
        t.prototype.resize = function() {
            var t = h.stw
              , e = h.sth
              , i = this._tex.width
              , n = this._tex.height
              , o = .44 * t
              , s = o / i * n;
            e < s && (o = (s = e) / n * i),
            this.width = o,
            this.height = s,
            this.x = .5 * t,
            this.y = e - s,
            this.y < .05 * e && (this.y = .05 * e),
            .32 * e < this.y && (this.y = .32 * e);
            var r = this._gra;
            r.clear(),
            r.beginFill(14279911),
            r.x = this.x,
            r.y = this.y + s;
            var a = .7 * o;
            r.drawRect(.5 * -a, 0, a, Math.ceil(e - r.y))
        }
        ,
        t
    }(d)
      , f = function(i) {
        function t(t) {
            var e = i.call(this, new PIXI.Container, t) || this;
            return e._tailL = new p(e.target,!0),
            e._tailR = new p(e.target,!1),
            e._body = new l(e.target),
            h.main.addResize(function() {
                return e._resize()
            }),
            h.main.addUpdate(function() {
                return e._update()
            }),
            e.alpha = 0,
            TweenMax.to(e, .5, {
                alpha: 1,
                ease: Power0.easeNone
            }).play(),
            e.top(),
            e
        }
        return __extends(t, i),
        t.prototype.top = function() {
            this._tailL.reset(.4),
            this._tailR.reset(.4),
            this._tailL.startIntro(),
            this._tailR.startIntro(),
            this._body.top()
        }
        ,
        t.prototype.loading = function() {
            this._tailL.reset(.6),
            this._tailR.reset(.6)
        }
        ,
        t.prototype.start = function() {
            this._frameL || (this._frameL = new p(this.target,!0,!0),
            this._frameR = new p(this.target,!1,!0),
            this._fraL = new p(this.target,!0,!0),
            this._fraR = new p(this.target,!1,!0),
            this._resize()),
            this._fraL.visible = this._fraR.visible = !1,
            this._frameL.visible = this._frameR.visible = !0,
            this._frameL.alpha = this._frameR.alpha = 1,
            this.resetAngle(),
            this._body.start()
        }
        ,
        t.prototype.ok = function() {
            this._body.ok(),
            this._fraL.rotation = this._frameL.rotation,
            this._fraR.rotation = this._frameR.rotation,
            this._fraL.visible = this._fraR.visible = !0,
            this._fraL.alpha = this._fraR.alpha = 1,
            this._fraL.scale = this._fraR.scale = this._body.scale,
            TweenMax.killTweensOf(this._fraL),
            TweenMax.killTweensOf(this._fraR),
            TweenMax.to(this._fraL, .2, {
                alpha: 0,
                ease: Power0.easeNone
            }),
            TweenMax.to(this._fraR, .2, {
                alpha: 0,
                ease: Power0.easeNone
            }),
            TweenMax.to(this._fraL, .2, {
                scale: 1.15 * this._body.scale,
                ease: Power2.easeOut
            }),
            TweenMax.to(this._fraR, .2, {
                scale: 1.15 * this._body.scale,
                ease: Power2.easeOut
            })
        }
        ,
        t.prototype.end = function() {
            this._tailL.end(),
            this._tailR.end(),
            this._body.end(),
            this._frameL.visible = this._frameR.visible = !1
        }
        ,
        t.prototype.resetAngle = function() {
            var t, e, i = this._frameL.rotation, n = this._frameR.rotation, o = .2;
            400 <= h.player.score ? o = .6 : 300 <= h.player.score ? o = .5 : 200 <= h.player.score ? o = .4 : 100 <= h.player.score && (o = .3);
            for (var s = 0; s < 30; s++) {
                t = aidn.math.toRad(aidn.math.rand(20, 110)),
                e = aidn.math.toRad(-aidn.math.rand(20, 110));
                var r = Math.abs(t - i) + Math.abs(e - n);
                if (Math.PI * o < r)
                    break
            }
            // console.log('DEBUG(t, e)', t * 180 / Math.PI, e * 180 / Math.PI);
            window.frameLRotation = t;
            window.frameRRotation = e;
            this._frameL.rotation = t,
            this._frameR.rotation = e,
            this._frameL.flash(),
            this._frameR.flash()
        }
        ,
        t.prototype.checkAngle = function() {
            var t = 0;
            // console.log('DEBUG(tailL, tailR)', this._tailL.rotation * 180 / Math.PI, this._tailR.rotation * 180 / Math.PI);
            window.tailLRotation = this._tailL.rotation;
            window.tailRRotation = this._tailR.rotation;
            return t += this._tailL.checkAngle(this._frameL),
            t += this._tailR.checkAngle(this._frameR)
        }
        ,
        t.prototype._update = function() {
            switch (h.state) {
            case n.START:
                this._tailL.update(h.left),
                this._tailR.update(h.right)
            }
        }
        ,
        t.prototype._resize = function() {
            this._body.resize(),
            this._tailL.resize(this._body),
            this._tailR.resize(this._body),
            this._frameL && (this._frameL.resize(this._body),
            this._frameR.resize(this._body),
            this._fraL.resize(this._body),
            this._fraR.resize(this._body))
        }
        ,
        t
    }(d)
      , m = function(n) {
        function t(t) {
            var e = this
              , i = new PIXI.Graphics;
            return (e = n.call(this, i, t) || this).init(16777215, 1),
            e._gra = i,
            e._resizeId = -1,
            e
        }
        return __extends(t, n),
        t.prototype.init = function(t, e) {
            void 0 === e && (e = 1),
            this._col = t,
            this._alp = e
        }
        ,
        t.prototype.show = function(t) {
            var e = this;
            void 0 === t && (t = 0),
            h.main.removeResize(this._resizeId),
            this._resizeId = h.main.addResize(function() {
                return e._resize()
            }),
            this._resize(),
            this.visible = !0,
            this.alpha = 0,
            TweenMax.to(this, t, {
                alpha: 1,
                ease: Power0.easeNone
            }).play()
        }
        ,
        t.prototype.hide = function(t) {
            var e = this;
            void 0 === t && (t = 0),
            h.main.removeResize(this._resizeId),
            TweenMax.to(this, t, {
                alpha: 0,
                ease: Power0.easeNone,
                onComplete: function() {
                    return e._hideComplete()
                }
            }).play()
        }
        ,
        t.prototype.showSlide = function() {
            var t = this;
            h.main.removeResize(this._resizeId),
            this._resizeId = h.main.addResize(function() {
                return t._resize()
            }),
            this._resize(),
            TweenMax.killTweensOf(this),
            this.visible = !0,
            this.y = h.sth,
            TweenMax.to(this, .3, {
                y: 0,
                ease: Power1.easeInOut,
                onComplete: function() {
                    return t._hideSlide()
                }
            }).play()
        }
        ,
        t.prototype._hideSlide = function() {
            var t = this;
            TweenMax.to(this, .5, {
                y: -h.sth,
                ease: Power1.easeInOut,
                onComplete: function() {
                    return t._hideComplete()
                }
            }).play()
        }
        ,
        t.prototype._hideComplete = function() {
            this.visible = !1,
            h.main.removeResize(this._resizeId)
        }
        ,
        t.prototype._resize = function() {
            var t = this._gra;
            t.clear(),
            t.beginFill(this._col, this._alp),
            t.drawRect(0, 0, h.stw, h.sth)
        }
        ,
        t
    }(d)
      , y = function() {
        function t() {}
        return t.prototype.init = function() {
            var t = 1;
            1 < window.devicePixelRatio && (t = 2);
            var e = PIXI.autoDetectRenderer(h.stw, h.sth, {
                backgroundColor: 16777215,
                antialias: !0,
                resolution: t
            });
            this._renderer = e,
            document.getElementById("view").appendChild(this._renderer.view),
            this._stage = new PIXI.Container,
            this._coverSl = new m(this._stage),
            this._coverSl.init(15663103, 1),
            this._miku = new f(this._stage),
            this._cover = new m(this._stage),
            this._cover.init(16777215, .72),
            this._cover.show()
        }
        ,
        t.prototype.changeState = function(t) {
            switch (t) {
            case n.TOP:
                this._miku.top();
                break;
            case n.LOADING:
                this._miku.loading();
                break;
            case n.READY:
                break;
            case n.START:
                this._cover.hide(.2),
                this._miku.start();
                break;
            case n.END:
                this._cover.show(.3),
                this._miku.end()
            }
        }
        ,
        t.prototype.update = function() {
            switch (h.state) {
            case n.START:
                this._updateStart()
            }
            this._renderer.render(this._stage)
        }
        ,
        t.prototype.resize = function() {
            var t = h.stw
              , e = h.sth;
            this._renderer.resize(t, e)
        }
        ,
        t.prototype._updateStart = function() {
            if (2 <= this._miku.checkAngle()) {
                h.player.score++,
                $("#main .score").text(h.player.score);
                var t = 1;
                h.player.score % 100 == 0 ? h.player.time < 5 ? t = 5 : h.player.time < 10 ? t = 4 : h.player.time < 20 ? t = 3 : h.player.time < 30 && (t = 2) : h.player.score % 50 == 0 && (h.player.time < 10 ? t = 3 : h.player.time < 20 && (t = 2)),
                3e3 <= h.player.time ? t -= 3 : 2e3 <= h.player.time ? t -= 2 : 1e3 <= h.player.time && (t -= 1),
                t < 1 && (t = 1),
                h.player.time += t;
                var e = Back.easeOut.config(1.7)
                  , i = $("#center_tx");
                i.stop().fadeIn(0),
                TweenMax.killTweensOf(i),
                TweenMax.fromTo(i, .4, {
                    css: {
                        scale: 0
                    }
                }, {
                    css: {
                        scale: 1.2
                    },
                    ease: e
                }),
                i.html(h.player.score + "<br><span>+ " + t + ".0 sec</span>"),
                i.stop().delay(1e3).fadeOut(200, "linear"),
                h.sound.playSEOk(),
                this._coverSl.showSlide(),
                this._miku.ok(),
                this._miku.resetAngle()
            }
        }
        ,
        t
    }()
}(twintail || (twintail = {})),
twintail.checkLoop();
