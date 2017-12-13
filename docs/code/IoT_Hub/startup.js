define("iot/_public/InputCollection", ["exports", "module", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "esui/lib"],
function(exports, module, e, t, i, a) {
    function n(e, t) {
        for (var i = {},
        a = 0; a < e.length; a++) {
            var n = e[a];
            if (("check" !== n.getCategory() || n.isChecked()) && !n.isDisabled()) {
                var r = n.get("name"),
                o = t(n);
                i.hasOwnProperty(r) ? i[r] = [].concat(i[r], o) : i[r] = o
            }
        }
        return i
    }
    var r = i["default"](t),
    o = i["default"](a),
    s = function() {
        function t(i) {
            e["default"](this, t),
            this.length = i.length;
            for (var a = 0; a < i.length; a++) this[a] = i[a]
        }
        return t.prototype.splice = function() {
            for (var e = arguments.length,
            t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return Array.prototype.splice(t)
        },
        t.prototype.getData = function() {
            return n(this,
            function(e) {
                return e.getRawValue()
            })
        },
        t.prototype.getDataAsString = function() {
            var e = n(this,
            function(e) {
                return encodeURIComponent(e.getValue())
            }),
            t = "";
            return r["default"].each(e,
            function(e, i) {
                return t += encodeURIComponent(i) + "=" + e
            }),
            t
        },
        t.prototype.getValueAsString = function(e) {
            var t = this.getData()[e];
            return t ? "string" == typeof t ? t: t.join(",") : ""
        },
        t.prototype.checkAll = function() {
            for (var e = 0; e < this.length; e++) {
                var t = this[e];
                "check" === t.getCategory() && t.setChecked(!0)
            }
        },
        t.prototype.uncheckAll = function() {
            for (var e = 0; e < this.length; e++) {
                var t = this[e];
                "check" === t.getCategory() && t.setChecked(!1)
            }
        },
        t.prototype.checkInverse = function() {
            for (var e = 0; e < this.length; e++) {
                var t = this[e];
                "check" === t.getCategory() && t.setChecked(!t.isChecked())
            }
        },
        t.prototype.checkByValue = function(e) {
            for (var t = o["default"].toDictionary(e), i = 0; i < this.length; i++) {
                var a = this[i];
                if ("check" === a.getCategory()) {
                    var n = t.hasOwnProperty(a.getValue());
                    a.setChecked(n)
                }
            }
        },
        t
    } ();
    module.exports = s
}),
define("iot/_public/mqttws", ["require"],
function(require) {
    function e(e, t, i) {
        return t[i++] = e >> 8,
        t[i++] = e % 256,
        i
    }
    function t(t, i, a, r) {
        return r = e(i, a, r),
        n(t, a, r),
        r + i
    }
    function i(e, t) {
        return 256 * e[t] + e[t + 1]
    }
    function a(e) {
        for (var t = 0,
        i = 0; i < e.length; i++) {
            var a = e.charCodeAt(i);
            a > 2047 ? (55296 <= a && a <= 56319 && (i++, t++), t += 3) : a > 127 ? t += 2 : t++
        }
        return t
    }
    function n(e, t, i) {
        for (var a = i,
        n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (55296 <= r && r <= 56319) {
                if (lowCharCode = e.charCodeAt(++n), isNaN(lowCharCode)) throw new Error(p(u.MALFORMED_UNICODE, [r, lowCharCode]));
                r = (r - 55296 << 10) + (lowCharCode - 56320) + 65536
            }
            r <= 127 ? t[a++] = r: r <= 2047 ? (t[a++] = r >> 6 & 31 | 192, t[a++] = 63 & r | 128) : r <= 65535 ? (t[a++] = r >> 12 & 15 | 224, t[a++] = r >> 6 & 63 | 128, t[a++] = 63 & r | 128) : (t[a++] = r >> 18 & 7 | 240, t[a++] = r >> 12 & 63 | 128, t[a++] = r >> 6 & 63 | 128, t[a++] = 63 & r | 128)
        }
        return t
    }
    function r(e, t, i) {
        for (var a, n = "",
        r = t; r < t + i;) {
            var o = e[r++];
            if (o < 128) a = o;
            else {
                var s = e[r++] - 128;
                if (s < 0) throw new Error(p(u.MALFORMED_UTF, [o.toString(16), s.toString(16), ""]));
                if (o < 224) a = 64 * (o - 192) + s;
                else {
                    var l = e[r++] - 128;
                    if (l < 0) throw new Error(p(u.MALFORMED_UTF, [o.toString(16), s.toString(16), l.toString(16)]));
                    if (o < 240) a = 4096 * (o - 224) + 64 * s + l;
                    else {
                        var d = e[r++] - 128;
                        if (d < 0) throw new Error(p(u.MALFORMED_UTF, [o.toString(16), s.toString(16), l.toString(16), d.toString(16)]));
                        if (! (o < 248)) throw new Error(p(u.MALFORMED_UTF, [o.toString(16), s.toString(16), l.toString(16), d.toString(16)]));
                        a = 262144 * (o - 240) + 4096 * s + 64 * l + d
                    }
                }
            }
            a > 65535 && (a -= 65536, n += String.fromCharCode(55296 + (a >> 10)), a = 56320 + (1023 & a)),
            n += String.fromCharCode(a)
        }
        return n
    }
    var o = window,
    s = {
        CONNECT: 1,
        CONNACK: 2,
        PUBLISH: 3,
        PUBACK: 4,
        PUBREC: 5,
        PUBREL: 6,
        PUBCOMP: 7,
        SUBSCRIBE: 8,
        SUBACK: 9,
        UNSUBSCRIBE: 10,
        UNSUBACK: 11,
        PINGREQ: 12,
        PINGRESP: 13,
        DISCONNECT: 14
    },
    l = function(e, t) {
        for (key in e) if (e.hasOwnProperty(key)) {
            if (!t.hasOwnProperty(key)) {
                var i = "Unknown property, " + key + ". Valid properties are:";
                for (key in t) t.hasOwnProperty(key) && (i = i + " " + key);
                throw new Error(i)
            }
            if (typeof e[key] !== t[key]) throw new Error(p(u.INVALID_TYPE, [typeof e[key], key]))
        }
    },
    d = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    },
    u = {
        OK: {
            code: 0,
            text: "AMQJSC0000I OK."
        },
        CONNECT_TIMEOUT: {
            code: 1,
            text: "AMQJSC0001E Connect timed out."
        },
        SUBSCRIBE_TIMEOUT: {
            code: 2,
            text: "AMQJS0002E Subscribe timed out."
        },
        UNSUBSCRIBE_TIMEOUT: {
            code: 3,
            text: "AMQJS0003E Unsubscribe timed out."
        },
        PING_TIMEOUT: {
            code: 4,
            text: "AMQJS0004E Ping timed out."
        },
        INTERNAL_ERROR: {
            code: 5,
            text: "AMQJS0005E Internal error."
        },
        CONNACK_RETURNCODE: {
            code: 6,
            text: "AMQJS0006E Bad Connack return code:{0} {1}."
        },
        SOCKET_ERROR: {
            code: 7,
            text: "AMQJS0007E Socket error:{0}."
        },
        SOCKET_CLOSE: {
            code: 8,
            text: "AMQJS0008I Socket closed."
        },
        MALFORMED_UTF: {
            code: 9,
            text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
        },
        UNSUPPORTED: {
            code: 10,
            text: "AMQJS0010E {0} is not supported by this browser."
        },
        INVALID_STATE: {
            code: 11,
            text: "AMQJS0011E Invalid state {0}."
        },
        INVALID_TYPE: {
            code: 12,
            text: "AMQJS0012E Invalid type {0} for {1}."
        },
        INVALID_ARGUMENT: {
            code: 13,
            text: "AMQJS0013E Invalid argument {0} for {1}."
        },
        UNSUPPORTED_OPERATION: {
            code: 14,
            text: "AMQJS0014E Unsupported operation."
        },
        INVALID_STORED_DATA: {
            code: 15,
            text: "AMQJS0015E Invalid data in local storage key={0} value={1}."
        },
        INVALID_MQTT_MESSAGE_TYPE: {
            code: 16,
            text: "AMQJS0016E Invalid MQTT message type {0}."
        },
        MALFORMED_UNICODE: {
            code: 17,
            text: "AMQJS0017E Malformed Unicode string:{0} {1}."
        }
    },
    c = {
        0 : "Connection Accepted",
        1 : "Connection Refused: unacceptable protocol version",
        2 : "Connection Refused: identifier rejected",
        3 : "Connection Refused: server unavailable",
        4 : "Connection Refused: bad user name or password",
        5 : "Connection Refused: not authorized"
    },
    p = function(e, t) {
        var i = e.text;
        if (t) for (var a = 0; a < t.length; a++) if (field = "{" + a + "}", start = i.indexOf(field), start > 0) {
            var n = i.substring(0, start),
            r = i.substring(start + field.length);
            i = n + t[a] + r
        }
        return i
    },
    f = [0, 6, 77, 81, 73, 115, 100, 112, 3],
    m = function(e, t) {
        this.type = e;
        for (name in t) t.hasOwnProperty(name) && (this[name] = t[name])
    };
    m.prototype.encode = function() {
        var i = (15 & this.type) << 4;
        switch (remLength = 0, topicStrLength = new Array, this.messageIdentifier != undefined && (remLength += 2), this.type) {
        case s.CONNECT:
            if (remLength += f.length + 3, remLength += a(this.clientId) + 2, this.willMessage != undefined) {
                remLength += a(this.willMessage.destinationName) + 2;
                var n = this.willMessage.payloadBytes;
                n instanceof Uint8Array || (n = new Uint8Array(r)),
                remLength += n.byteLength + 2
            }
            this.userName != undefined && (remLength += a(this.userName) + 2),
            this.password != undefined && (remLength += a(this.password) + 2);
            break;
        case s.SUBSCRIBE:
            i |= 2;
            for (p = 0; p < this.topics.length; p++) topicStrLength[p] = a(this.topics[p]),
            remLength += topicStrLength[p] + 2;
            remLength += this.requestedQos.length;
            break;
        case s.UNSUBSCRIBE:
            i |= 2;
            for (p = 0; p < this.topics.length; p++) topicStrLength[p] = a(this.topics[p]),
            remLength += topicStrLength[p] + 2;
            break;
        case s.PUBLISH:
            this.payloadMessage.duplicate && (i |= 8),
            i = i |= this.payloadMessage.qos << 1,
            this.payloadMessage.retained && (i |= 1),
            destinationNameLength = a(this.payloadMessage.destinationName),
            remLength += destinationNameLength + 2;
            var r = this.payloadMessage.payloadBytes;
            remLength += r.byteLength,
            r instanceof ArrayBuffer ? r = new Uint8Array(r) : r instanceof Uint8Array || (r = new Uint8Array(r.buffer));
            break;
        case s.DISCONNECT:
        }
        var o = function(e) {
            var t = new Array(1),
            i = 0;
            do {
                var a = e % 128; (e >>= 7) > 0 && (a |= 128), t[i++] = a
            } while ( e > 0 && i < 4 );
            return t
        } (remLength),
        l = o.length + 1,
        d = new ArrayBuffer(remLength + l),
        u = new Uint8Array(d);
        if (u[0] = i, u.set(o, 1), this.type == s.PUBLISH) l = t(this.payloadMessage.destinationName, destinationNameLength, u, l);
        else if (this.type == s.CONNECT) {
            u.set(f, l),
            l += f.length;
            var c = 0;
            this.cleanSession && (c = 2),
            this.willMessage != undefined && (c |= 4, c |= this.willMessage.qos << 3, this.willMessage.retained && (c |= 32)),
            this.userName != undefined && (c |= 128),
            this.password != undefined && (c |= 64),
            u[l++] = c,
            l = e(this.keepAliveInterval, u, l)
        }
        switch (this.messageIdentifier != undefined && (l = e(this.messageIdentifier, u, l)), this.type) {
        case s.CONNECT:
            l = t(this.clientId, a(this.clientId), u, l),
            this.willMessage != undefined && (l = t(this.willMessage.destinationName, a(this.willMessage.destinationName), u, l), l = e(n.byteLength, u, l), u.set(n, l), l += n.byteLength),
            this.userName != undefined && (l = t(this.userName, a(this.userName), u, l)),
            this.password != undefined && (l = t(this.password, a(this.password), u, l));
            break;
        case s.PUBLISH:
            u.set(r, l);
            break;
        case s.SUBSCRIBE:
            for (p = 0; p < this.topics.length; p++) l = t(this.topics[p], topicStrLength[p], u, l),
            u[l++] = this.requestedQos[p];
            break;
        case s.UNSUBSCRIBE:
            for (var p = 0; p < this.topics.length; p++) l = t(this.topics[p], topicStrLength[p], u, l)
        }
        return d
    };
    var h = function(e, t, i) {
        this._client = e,
        this._window = t,
        this._keepAliveInterval = 1e3 * i,
        this.isReset = !1;
        var a = new m(s.PINGREQ).encode(),
        n = function(e) {
            return function() {
                return r.apply(e)
            }
        },
        r = function() {
            this.isReset ? (this.isReset = !1, this._client._trace("Pinger.doPing", "send PINGREQ"), this._client.socket.send(a), this.timeout = this._window.setTimeout(n(this), this._keepAliveInterval)) : (this._client._trace("Pinger.doPing", "Timed out"), this._client._disconnected(u.PING_TIMEOUT.code, p(u.PING_TIMEOUT)))
        };
        this.reset = function() {
            this.isReset = !0,
            this._window.clearTimeout(this.timeout),
            this._keepAliveInterval > 0 && (this.timeout = setTimeout(n(this), this._keepAliveInterval))
        },
        this.cancel = function() {
            this._window.clearTimeout(this.timeout)
        }
    },
    b = function(e, t, i, a, n) {
        this._window = t,
        i || (i = 30);
        this.timeout = setTimeout(function(e, t, i) {
            return function() {
                return e.apply(t, i)
            }
        } (a, e, n), 1e3 * i),
        this.cancel = function() {
            this._window.clearTimeout(this.timeout)
        }
    },
    v = function(e, t, i) {
        if (! ("WebSocket" in o && null !== o.WebSocket)) throw new Error(p(u.UNSUPPORTED, ["WebSocket"]));
        if (! ("localStorage" in o && null !== o.localStorage)) throw new Error(p(u.UNSUPPORTED, ["localStorage"]));
        if (! ("ArrayBuffer" in o && null !== o.ArrayBuffer)) throw new Error(p(u.UNSUPPORTED, ["ArrayBuffer"]));
        this._trace("Messaging.Client", e, t, i),
        this.host = e,
        this.port = t,
        this.clientId = i,
        this._localKey = e + ":" + t + ":" + i + ":",
        this._msg_queue = [],
        this._sentMessages = {},
        this._receivedMessages = {},
        this._notify_msg_sent = {},
        this._message_identifier = 1,
        this._sequence = 0;
        for (key in localStorage) 0 != key.indexOf("Sent:" + this._localKey) && 0 != key.indexOf("Received:" + this._localKey) || this.restore(key)
    };
    v.prototype.host,
    v.prototype.port,
    v.prototype.clientId,
    v.prototype.socket,
    v.prototype.connected = !1,
    v.prototype.maxMessageIdentifier = 65536,
    v.prototype.connectOptions,
    v.prototype.hostIndex,
    v.prototype.onConnectionLost,
    v.prototype.onMessageDelivered,
    v.prototype.onMessageArrived,
    v.prototype._msg_queue = null,
    v.prototype._connectTimeout,
    v.prototype.sendPinger = null,
    v.prototype.receivePinger = null,
    v.prototype._traceBuffer = null,
    v.prototype._MAX_TRACE_ENTRIES = 100,
    v.prototype.connect = function(e) {
        var t = this._traceMask(e, "password");
        if (this._trace("Client.connect", t, this.socket, this.connected), this.connected) throw new Error(p(u.INVALID_STATE, ["already connected"]));
        if (this.socket) throw new Error(p(u.INVALID_STATE, ["already connected"]));
        this.connectOptions = e,
        e.hosts ? (this.hostIndex = 0, this._doConnect(e.hosts[0], e.ports[0])) : this._doConnect(this.host, this.port)
    },
    v.prototype.subscribe = function(e, t) {
        if (this._trace("Client.subscribe", e, t), !this.connected) throw new Error(p(u.INVALID_STATE, ["not connected"]));
        var i = new m(s.SUBSCRIBE);
        i.topics = [e],
        t.qos != undefined ? i.requestedQos = [t.qos] : i.requestedQos = [0],
        t.onSuccess && (i.callback = function() {
            t.onSuccess({
                invocationContext: t.invocationContext
            })
        }),
        t.timeout && (i.timeOut = new b(this, window, t.timeout, t.onFailure, [{
            invocationContext: t.invocationContext,
            errorCode: u.SUBSCRIBE_TIMEOUT.code,
            errorMessage: p(u.SUBSCRIBE_TIMEOUT)
        }])),
        this._requires_ack(i),
        this._schedule_message(i)
    },
    v.prototype.unsubscribe = function(e, t) {
        if (this._trace("Client.unsubscribe", e, t), !this.connected) throw new Error(p(u.INVALID_STATE, ["not connected"]));
        var i = new m(s.UNSUBSCRIBE);
        i.topics = [e],
        t.onSuccess && (i.callback = function() {
            t.onSuccess({
                invocationContext: t.invocationContext
            })
        }),
        t.timeout && (i.timeOut = new b(this, window, t.timeout, t.onFailure, [{
            invocationContext: t.invocationContext,
            errorCode: u.UNSUBSCRIBE_TIMEOUT.code,
            errorMessage: p(u.UNSUBSCRIBE_TIMEOUT)
        }])),
        this._requires_ack(i),
        this._schedule_message(i)
    },
    v.prototype.send = function(e) {
        if (this._trace("Client.send", e), !this.connected) throw new Error(p(u.INVALID_STATE, ["not connected"]));
        wireMessage = new m(s.PUBLISH),
        wireMessage.payloadMessage = e,
        e.qos > 0 ? this._requires_ack(wireMessage) : this.onMessageDelivered && (this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage)),
        this._schedule_message(wireMessage)
    },
    v.prototype.disconnect = function() {
        if (this._trace("Client.disconnect"), !this.socket) throw new Error(p(u.INVALID_STATE, ["not connecting or connected"]));
        wireMessage = new m(s.DISCONNECT),
        this._notify_msg_sent[wireMessage] = d(this._disconnected, this),
        this._schedule_message(wireMessage)
    },
    v.prototype.getTraceLog = function() {
        if (null !== this._traceBuffer) {
            this._trace("Client.getTraceLog", new Date),
            this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
            for (key in this._sentMessages) this._trace("_sentMessages ", key, this._sentMessages[key]);
            for (key in this._receivedMessages) this._trace("_receivedMessages ", key, this._receivedMessages[key]);
            return this._traceBuffer
        }
    },
    v.prototype.startTrace = function() {
        null === this._traceBuffer && (this._traceBuffer = []),
        this._trace("Client.startTrace", new Date, "0.0.0.0")
    },
    v.prototype.stopTrace = function() {
        delete this._traceBuffer
    },
    v.prototype._doConnect = function(e, t) {
        this.connectOptions.useSSL ? wsurl = ["wss://", e, ":", t, "/mqtt"].join("") : wsurl = ["ws://", e, ":", t, "/mqtt"].join(""),
        this.connected = !1,
        this.socket = new WebSocket(wsurl, "mqttv3.1"),
        this.socket.binaryType = "arraybuffer",
        this.socket.onopen = d(this._on_socket_open, this),
        this.socket.onmessage = d(this._on_socket_message, this),
        this.socket.onerror = d(this._on_socket_error, this),
        this.socket.onclose = d(this._on_socket_close, this),
        this.sendPinger = new h(this, window, this.connectOptions.keepAliveInterval),
        this.receivePinger = new h(this, window, this.connectOptions.keepAliveInterval),
        this._connectTimeout = new b(this, window, this.connectOptions.timeout, this._disconnected, [u.CONNECT_TIMEOUT.code, p(u.CONNECT_TIMEOUT)])
    },
    v.prototype._schedule_message = function(e) {
        this._msg_queue.push(e),
        this.connected && this._process_queue()
    },
    v.prototype.store = function(e, t) {
        switch (storedMessage = {
            type: t.type,
            messageIdentifier: t.messageIdentifier,
            version: 1
        },
        t.type) {
        case s.PUBLISH:
            t.pubRecReceived && (storedMessage.pubRecReceived = !0),
            storedMessage.payloadMessage = {};
            for (var i = "",
            a = t.payloadMessage.payloadBytes,
            n = 0; n < a.length; n++) a[n] <= 15 ? i = i + "0" + a[n].toString(16) : i += a[n].toString(16);
            storedMessage.payloadMessage.payloadHex = i,
            storedMessage.payloadMessage.qos = t.payloadMessage.qos,
            storedMessage.payloadMessage.destinationName = t.payloadMessage.destinationName,
            t.payloadMessage.duplicate && (storedMessage.payloadMessage.duplicate = !0),
            t.payloadMessage.retained && (storedMessage.payloadMessage.retained = !0),
            0 == e.indexOf("Sent:") && (t.sequence === undefined && (t.sequence = ++this._sequence), storedMessage.sequence = t.sequence);
            break;
        default:
            throw Error(p(u.INVALID_STORED_DATA, [key, storedMessage]))
        }
        localStorage.setItem(e + this._localKey + t.messageIdentifier, JSON.stringify(storedMessage))
    },
    v.prototype.restore = function(e) {
        var t = localStorage.getItem(e),
        i = JSON.parse(t),
        a = new m(i.type, i);
        switch (i.type) {
        case s.PUBLISH:
            for (var n = i.payloadMessage.payloadHex,
            r = new ArrayBuffer(n.length / 2), o = new Uint8Array(r), l = 0; n.length >= 2;) {
                var d = parseInt(n.substring(0, 2), 16);
                n = n.substring(2, n.length),
                o[l++] = d
            }
            var c = new y(o);
            c.qos = i.payloadMessage.qos,
            c.destinationName = i.payloadMessage.destinationName,
            i.payloadMessage.duplicate && (c.duplicate = !0),
            i.payloadMessage.retained && (c.retained = !0),
            a.payloadMessage = c;
            break;
        default:
            throw Error(p(u.INVALID_STORED_DATA, [e, t]))
        }
        0 == e.indexOf("Sent:" + this._localKey) ? this._sentMessages[a.messageIdentifier] = a: 0 == e.indexOf("Received:" + this._localKey) && (this._receivedMessages[a.messageIdentifier] = a)
    },
    v.prototype._process_queue = function() {
        for (var e = null,
        t = this._msg_queue.reverse(); e = t.pop();) this._socket_send(e),
        this._notify_msg_sent[e] && (this._notify_msg_sent[e](), delete this._notify_msg_sent[e])
    },
    v.prototype._requires_ack = function(e) {
        var t = Object.keys(this._sentMessages).length;
        if (t > this.maxMessageIdentifier) throw Error("Too many messages:" + t);
        for (; this._sentMessages[this._message_identifier] !== undefined;) this._message_identifier++;
        e.messageIdentifier = this._message_identifier,
        this._sentMessages[e.messageIdentifier] = e,
        e.type === s.PUBLISH && this.store("Sent:", e),
        this._message_identifier === this.maxMessagIdentifier && (this._message_identifier = 1)
    },
    v.prototype._on_socket_open = function() {
        var e = new m(s.CONNECT, this.connectOptions);
        e.clientId = this.clientId,
        this._socket_send(e)
    },
    v.prototype._on_socket_message = function(e) {
        this._trace("Client._on_socket_message", e.data),
        this.receivePinger.reset();
        var t = new Uint8Array(e.data);
        try {
            var a = function(e) {
                for (var t = 0,
                a = []; e.length > t;) {
                    var n, o = e[t++],
                    l = o >> 4,
                    d = o &= 15,
                    u = t,
                    c = 0,
                    p = 1;
                    do {
                        t++, c += (127 & (n = e[u++])) * p, p *= 128
                    } while ( 0 != ( 128 & n ));
                    var f = new m(l);
                    switch (l) {
                    case s.CONNACK:
                        f.topicNameCompressionResponse = e[u++],
                        f.returnCode = e[u++];
                        break;
                    case s.PUBLISH:
                        var h = d >> 1 & 3,
                        b = 0,
                        v = i(e, u);
                        b += 2;
                        var g = r(e, u += 2, v);
                        u += v,
                        b += v,
                        h > 0 && (f.messageIdentifier = i(e, u), u += 2, b += 2);
                        var w = new y(e.subarray(u, u + c - b));
                        1 == (1 & d) && (w.retained = !0),
                        8 == (8 & d) && (w.duplicate = !0),
                        w.qos = h,
                        w.destinationName = g,
                        f.payloadMessage = w;
                        break;
                    case s.PUBACK:
                    case s.PUBREC:
                    case s.PUBREL:
                    case s.PUBCOMP:
                    case s.UNSUBACK:
                        f.messageIdentifier = i(e, u);
                        break;
                    case s.SUBACK:
                        f.messageIdentifier = i(e, u),
                        u += 2,
                        f.grantedQos = e.subarray(u)
                    }
                    a.push(f),
                    t += c
                }
                return a
            } (t)
        } catch(g) {
            return console.log(g),
            void this._disconnected(u.INTERNAL_ERROR.code, p(u.INTERNAL_ERROR, [g.message]))
        }
        this._trace("Client._on_socket_message", a);
        for (d = 0; d < a.length; ++d) {
            var n = a[d];
            switch (n.type) {
            case s.CONNACK:
                if (this._connectTimeout.cancel(), this.connectOptions.cleanSession) {
                    for (key in this._sentMessages) {
                        v = this._sentMessages[key];
                        localStorage.removeItem("Sent:" + this._localKey + v.messageIdentifier)
                    }
                    this._sentMessages = {};
                    for (key in this._receivedMessages) {
                        b = this._receivedMessages[key];
                        localStorage.removeItem("Received:" + this._localKey + b.messageIdentifier)
                    }
                    this._receivedMessages = {}
                }
                if (0 !== n.returnCode) {
                    this._disconnected(u.CONNACK_RETURNCODE.code, p(u.CONNACK_RETURNCODE, [n.returnCode, c[n.returnCode]]));
                    break
                }
                this.connected = !0,
                this.connectOptions.hosts && (this.hostIndex = this.connectOptions.hosts.length);
                l = new Array;
                for (var o in this._sentMessages) this._sentMessages.hasOwnProperty(o) && l.push(this._sentMessages[o]);
                for (var l, d = 0,
                f = (l = l.sort(function(e, t) {
                    return e.sequence - t.sequence
                })).length; d < f; d++) {
                    if ((v = l[d]).type == s.PUBLISH && v.pubRecReceived) {
                        h = new m(s.PUBREL, {
                            messageIdentifier: v.messageIdentifier
                        });
                        this._schedule_message(h)
                    } else this._schedule_message(v)
                }
                this.connectOptions.onSuccess && this.connectOptions.onSuccess({
                    invocationContext: this.connectOptions.invocationContext
                }),
                this._process_queue();
                break;
            case s.PUBLISH:
                this._receivePublish(n);
                break;
            case s.PUBACK:
                (v = this._sentMessages[n.messageIdentifier]) && (delete this._sentMessages[n.messageIdentifier], localStorage.removeItem("Sent:" + this._localKey + n.messageIdentifier), this.onMessageDelivered && this.onMessageDelivered(v.payloadMessage));
                break;
            case s.PUBREC:
                if (v = this._sentMessages[n.messageIdentifier]) {
                    v.pubRecReceived = !0;
                    var h = new m(s.PUBREL, {
                        messageIdentifier: n.messageIdentifier
                    });
                    this.store("Sent:", v),
                    this._schedule_message(h)
                }
                break;
            case s.PUBREL:
                var b = this._receivedMessages[n.messageIdentifier];
                localStorage.removeItem("Received:" + this._localKey + n.messageIdentifier),
                b && (this._receiveMessage(b), delete this._receivedMessages[n.messageIdentifier]),
                pubCompMessage = new m(s.PUBCOMP, {
                    messageIdentifier: n.messageIdentifier
                }),
                this._schedule_message(pubCompMessage);
                break;
            case s.PUBCOMP:
                v = this._sentMessages[n.messageIdentifier];
                delete this._sentMessages[n.messageIdentifier],
                localStorage.removeItem("Sent:" + this._localKey + n.messageIdentifier),
                this.onMessageDelivered && this.onMessageDelivered(v.payloadMessage);
                break;
            case s.SUBACK:
            case s.UNSUBACK:
                var v; (v = this._sentMessages[n.messageIdentifier]) && (v.timeOut && v.timeOut.cancel(), v.callback && v.callback(), delete this._sentMessages[n.messageIdentifier]);
                break;
            case s.PINGRESP:
                this.sendPinger.reset();
                break;
            case s.DISCONNECT:
                this._disconnected(u.INVALID_MQTT_MESSAGE_TYPE.code, p(u.INVALID_MQTT_MESSAGE_TYPE, [n.type]));
                break;
            default:
                this._disconnected(u.INVALID_MQTT_MESSAGE_TYPE.code, p(u.INVALID_MQTT_MESSAGE_TYPE, [n.type]))
            }
        }
    },
    v.prototype._on_socket_error = function(e) {
        this._disconnected(u.SOCKET_ERROR.code, p(u.SOCKET_ERROR, [e.data]))
    },
    v.prototype._on_socket_close = function() {
        this._disconnected(u.SOCKET_CLOSE.code, p(u.SOCKET_CLOSE))
    },
    v.prototype._socket_send = function(e) {
        if (1 == e.type) {
            var t = this._traceMask(e, "password");
            this._trace("Client._socket_send", t)
        } else this._trace("Client._socket_send", e);
        this.socket.send(e.encode()),
        this.sendPinger.reset()
    },
    v.prototype._receivePublish = function(e) {
        switch (e.payloadMessage.qos) {
        case "undefined":
        case 0:
            this._receiveMessage(e);
            break;
        case 1:
            var t = new m(s.PUBACK, {
                messageIdentifier: e.messageIdentifier
            });
            this._schedule_message(t),
            this._receiveMessage(e);
            break;
        case 2:
            this._receivedMessages[e.messageIdentifier] = e,
            this.store("Received:", e);
            var i = new m(s.PUBREC, {
                messageIdentifier: e.messageIdentifier
            });
            this._schedule_message(i);
            break;
        default:
            throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos)
        }
    },
    v.prototype._receiveMessage = function(e) {
        this.onMessageArrived && this.onMessageArrived(e.payloadMessage)
    },
    v.prototype._disconnected = function(e, t) {
        this._trace("Client._disconnected", e, t),
        this.sendPinger.cancel(),
        this.receivePinger.cancel(),
        this._connectTimeout && this._connectTimeout.cancel(),
        this._msg_queue = [],
        this._notify_msg_sent = {},
        this.socket && (this.socket.onopen = null, this.socket.onmessage = null, this.socket.onerror = null, this.socket.onclose = null, 1 === this.socket.readyState && this.socket.close(), delete this.socket),
        this.connectOptions.hosts && this.hostIndex < this.connectOptions.hosts.length - 1 ? (this.hostIndex++, this._doConnect(this.connectOptions.hosts[this.hostIndex], this.connectOptions.ports[this.hostIndex])) : (e === undefined && (e = u.OK.code, t = p(u.OK)), this.connected ? (this.connected = !1, this.onConnectionLost && this.onConnectionLost({
            errorCode: e,
            errorMessage: t
        })) : this.connectOptions.onFailure && this.connectOptions.onFailure({
            invocationContext: this.connectOptions.invocationContext,
            errorCode: e,
            errorMessage: t
        }))
    },
    v.prototype._trace = function() {
        if (null !== this._traceBuffer) for (var e = 0,
        t = arguments.length; e < t; e++) this._traceBuffer.length == this._MAX_TRACE_ENTRIES && this._traceBuffer.shift(),
        0 === e ? this._traceBuffer.push(arguments[e]) : "undefined" == typeof arguments[e] ? this._traceBuffer.push(arguments[e]) : this._traceBuffer.push("  " + JSON.stringify(arguments[e]))
    },
    v.prototype._traceMask = function(e, t) {
        var i = {};
        for (var a in e) e.hasOwnProperty(a) && (i[a] = a == t ? "******": e[a]);
        return i
    };
    var g = function(e, t, i) {
        if ("string" != typeof e) throw new Error(p(u.INVALID_TYPE, [typeof e, "host"]));
        if ("number" != typeof t || t < 0) throw new Error(p(u.INVALID_TYPE, [typeof t, "port"]));
        for (var a = 0,
        n = 0; n < i.length; n++) {
            var r = i.charCodeAt(n);
            55296 <= r && r <= 56319 && n++,
            a++
        }
        if ("string" != typeof i || a < 1 | a > 23) throw new Error(p(u.INVALID_ARGUMENT, [i, "clientId"]));
        var o = new v(e, t, i);
        this._getHost = function() {
            return o.host
        },
        this._setHost = function() {
            throw new Error(p(u.UNSUPPORTED_OPERATION))
        },
        this._getPort = function() {
            return o.port
        },
        this._setPort = function() {
            throw new Error(p(u.UNSUPPORTED_OPERATION))
        },
        this._getClientId = function() {
            return o.clientId
        },
        this._setClientId = function() {
            throw new Error(p(u.UNSUPPORTED_OPERATION))
        },
        this._getOnConnectionLost = function() {
            return o.onConnectionLost
        },
        this._setOnConnectionLost = function(e) {
            if ("function" != typeof e) throw new Error(p(u.INVALID_TYPE, [typeof e, "onConnectionLost"]));
            o.onConnectionLost = e
        },
        this._getOnMessageDelivered = function() {
            return o.onMessageDelivered
        },
        this._setOnMessageDelivered = function(e) {
            if ("function" != typeof e) throw new Error(p(u.INVALID_TYPE, [typeof e, "onMessageDelivered"]));
            o.onMessageDelivered = e
        },
        this._getOnMessageArrived = function() {
            return o.onMessageArrived
        },
        this._setOnMessageArrived = function(e) {
            if ("function" != typeof e) throw new Error(p(u.INVALID_TYPE, [typeof e, "onMessageArrived"]));
            o.onMessageArrived = e
        },
        this.connect = function(e) {
            if (e = e || {},
            l(e, {
                timeout: "number",
                userName: "string",
                password: "string",
                willMessage: "object",
                keepAliveInterval: "number",
                cleanSession: "boolean",
                useSSL: "boolean",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                hosts: "object",
                ports: "object"
            }), e.keepAliveInterval === undefined && (e.keepAliveInterval = 60), e.willMessage) {
                if (! (e.willMessage instanceof y)) throw new Error(p(u.INVALID_TYPE, [e.willMessage, "connectOptions.willMessage"]));
                if (e.willMessage.stringPayload, "undefined" == typeof e.willMessage.destinationName) throw new Error(p(u.INVALID_TYPE, [typeof e.willMessage.destinationName, "connectOptions.willMessage.destinationName"]))
            }
            if ("undefined" == typeof e.cleanSession && (e.cleanSession = !0), e.hosts) {
                if (!e.ports) throw new Error(p(u.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                if (! (e.hosts instanceof Array)) throw new Error(p(u.INVALID_ARGUMENT, [e.hosts, "connectOptions.hosts"]));
                if (! (e.ports instanceof Array)) throw new Error(p(u.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                if (e.hosts.length < 1) throw new Error(p(u.INVALID_ARGUMENT, [e.hosts, "connectOptions.hosts"]));
                if (e.hosts.length != e.ports.length) throw new Error(p(u.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                for (var t = 0; t < e.hosts.length; t++) {
                    if ("string" != typeof e.hosts[t]) throw new Error(p(u.INVALID_TYPE, [typeof e.hosts[t], "connectOptions.hosts[" + t + "]"]));
                    if ("number" != typeof e.ports[t] || e.ports[t] < 0) throw new Error(p(u.INVALID_TYPE, [typeof e.ports[t], "connectOptions.ports[" + t + "]"]))
                }
            }
            o.connect(e)
        },
        this.subscribe = function(e, t) {
            if ("string" != typeof e) throw new Error("Invalid argument:" + e);
            if (t = t || {},
            l(t, {
                qos: "number",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            }), t.timeout && !t.onFailure) throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
            if ("undefined" != typeof t.qos && 0 !== t.qos && 1 !== t.qos && 2 !== t.qos) throw new Error(p(u.INVALID_ARGUMENT, [t.qos, "subscribeOptions.qos"]));
            o.subscribe(e, t)
        },
        this.unsubscribe = function(e, t) {
            if ("string" != typeof e) throw new Error("Invalid argument:" + e);
            if (t = t || {},
            l(t, {
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            }), t.timeout && !t.onFailure) throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
            o.unsubscribe(e, t)
        },
        this.send = function(e) {
            if (! (e instanceof y)) throw new Error("Invalid argument:" + typeof e);
            if ("undefined" == typeof e.destinationName) throw new Error("Invalid parameter Message.destinationName:" + e.destinationName);
            o.send(e)
        },
        this.disconnect = function() {
            o.disconnect()
        },
        this.getTraceLog = function() {
            return o.getTraceLog()
        },
        this.startTrace = function() {
            o.startTrace()
        },
        this.stopTrace = function() {
            o.stopTrace()
        }
    };
    g.prototype = {
        get host() {
            return this._getHost()
        },
        set host(e) {
            this._setHost(e)
        },
        get port() {
            return this._getPort()
        },
        set port(e) {
            this._setPort(e)
        },
        get clientId() {
            return this._getClientId()
        },
        set clientId(e) {
            this._setClientId(e)
        },
        get onConnectionLost() {
            return this._getOnConnectionLost()
        },
        set onConnectionLost(e) {
            this._setOnConnectionLost(e)
        },
        get onMessageDelivered() {
            return this._getOnMessageDelivered()
        },
        set onMessageDelivered(e) {
            this._setOnMessageDelivered(e)
        },
        get onMessageArrived() {
            return this._getOnMessageArrived()
        },
        set onMessageArrived(e) {
            this._setOnMessageArrived(e)
        }
    };
    var y = function(e) {
        var t;
        if (! ("string" == typeof e || e instanceof ArrayBuffer || e instanceof Int8Array || e instanceof Uint8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array)) throw p(u.INVALID_ARGUMENT, [e, "newPayload"]);
        t = e,
        this._getPayloadString = function() {
            return "string" == typeof t ? t: r(t, 0, t.length)
        },
        this._getPayloadBytes = function() {
            if ("string" == typeof t) {
                var e = new ArrayBuffer(a(t)),
                i = new Uint8Array(e);
                return n(t, i, 0),
                i
            }
            return t
        };
        var i = undefined;
        this._getDestinationName = function() {
            return i
        },
        this._setDestinationName = function(e) {
            if ("string" != typeof e) throw new Error(p(u.INVALID_ARGUMENT, [e, "newDestinationName"]));
            i = e
        };
        var o = 0;
        this._getQos = function() {
            return o
        },
        this._setQos = function(e) {
            if (0 !== e && 1 !== e && 2 !== e) throw new Error("Invalid argument:" + e);
            o = e
        };
        var s = !1;
        this._getRetained = function() {
            return s
        },
        this._setRetained = function(e) {
            if ("boolean" != typeof e) throw new Error(p(u.INVALID_ARGUMENT, [e, "newRetained"]));
            s = e
        };
        var l = !1;
        this._getDuplicate = function() {
            return l
        },
        this._setDuplicate = function(e) {
            l = e
        }
    };
    return y.prototype = {
        get payloadString() {
            return this._getPayloadString()
        },
        get payloadBytes() {
            return this._getPayloadBytes()
        },
        get destinationName() {
            return this._getDestinationName()
        },
        set destinationName(e) {
            this._setDestinationName(e)
        },
        get qos() {
            return this._getQos()
        },
        set qos(e) {
            this._setQos(e)
        },
        get retained() {
            return this._getRetained()
        },
        set retained(e) {
            this._setRetained(e)
        },
        get duplicate() {
            return this._getDuplicate()
        },
        set duplicate(e) {
            this._setDuplicate(e)
        }
    },
    {
        Client: g,
        Message: y
    }
}),
define("iot/_public/regions", ["require"],
function(require) {
    "use strict";
    return [{
        id: "086",
        name: "中国",
        provinces: [{
            id: 11e4,
            name: "北京市",
            cities: []
        },
        {
            id: 12e4,
            name: "天津市",
            cities: []
        },
        {
            id: 13e4,
            name: "河北省",
            cities: [{
                id: 130100,
                name: "石家庄市"
            },
            {
                id: 130200,
                name: "唐山市"
            },
            {
                id: 130300,
                name: "秦皇岛市"
            },
            {
                id: 130400,
                name: "邯郸市"
            },
            {
                id: 130500,
                name: "邢台市"
            },
            {
                id: 130600,
                name: "保定市"
            },
            {
                id: 130700,
                name: "张家口市"
            },
            {
                id: 130800,
                name: "承德市"
            },
            {
                id: 130900,
                name: "沧州市"
            },
            {
                id: 131e3,
                name: "廊坊市"
            },
            {
                id: 131100,
                name: "衡水市"
            }]
        },
        {
            id: 14e4,
            name: "山西省",
            cities: [{
                id: 140100,
                name: "太原市"
            },
            {
                id: 140200,
                name: "大同市"
            },
            {
                id: 140300,
                name: "阳泉市"
            },
            {
                id: 140400,
                name: "长治市"
            },
            {
                id: 140500,
                name: "晋城市"
            },
            {
                id: 140600,
                name: "朔州市"
            },
            {
                id: 140700,
                name: "晋中市"
            },
            {
                id: 140800,
                name: "运城市"
            },
            {
                id: 140900,
                name: "忻州市"
            },
            {
                id: 141e3,
                name: "临汾市"
            },
            {
                id: 141100,
                name: "吕梁市"
            }]
        },
        {
            id: 15e4,
            name: "内蒙古自治区",
            cities: [{
                id: 150100,
                name: "呼和浩特市"
            },
            {
                id: 150200,
                name: "包头市"
            },
            {
                id: 150300,
                name: "乌海市"
            },
            {
                id: 150400,
                name: "赤峰市"
            },
            {
                id: 150500,
                name: "通辽市"
            },
            {
                id: 150600,
                name: "鄂尔多斯市"
            },
            {
                id: 150700,
                name: "呼伦贝尔市"
            },
            {
                id: 150800,
                name: "巴彦淖尔市"
            },
            {
                id: 150900,
                name: "乌兰察布市"
            },
            {
                id: 152200,
                name: "兴安盟"
            },
            {
                id: 152500,
                name: "锡林郭勒盟"
            },
            {
                id: 152900,
                name: "阿拉善盟"
            }]
        },
        {
            id: 21e4,
            name: "辽宁省",
            cities: [{
                id: 210100,
                name: "沈阳市"
            },
            {
                id: 210200,
                name: "大连市"
            },
            {
                id: 210300,
                name: "鞍山市"
            },
            {
                id: 210400,
                name: "抚顺市"
            },
            {
                id: 210500,
                name: "本溪市"
            },
            {
                id: 210600,
                name: "丹东市"
            },
            {
                id: 210700,
                name: "锦州市"
            },
            {
                id: 210800,
                name: "营口市"
            },
            {
                id: 210900,
                name: "阜新市"
            },
            {
                id: 211e3,
                name: "辽阳市"
            },
            {
                id: 211100,
                name: "盘锦市"
            },
            {
                id: 211200,
                name: "铁岭市"
            },
            {
                id: 211300,
                name: "朝阳市"
            },
            {
                id: 211400,
                name: "葫芦岛市"
            }]
        },
        {
            id: 22e4,
            name: "吉林省",
            cities: [{
                id: 220100,
                name: "长春市"
            },
            {
                id: 220200,
                name: "吉林市"
            },
            {
                id: 220300,
                name: "四平市"
            },
            {
                id: 220400,
                name: "辽源市"
            },
            {
                id: 220500,
                name: "通化市"
            },
            {
                id: 220600,
                name: "白山市"
            },
            {
                id: 220700,
                name: "松原市"
            },
            {
                id: 220800,
                name: "白城市"
            },
            {
                id: 222400,
                name: "延边朝鲜族自治州"
            }]
        },
        {
            id: 23e4,
            name: "黑龙江省",
            cities: [{
                id: 230100,
                name: "哈尔滨市"
            },
            {
                id: 230200,
                name: "齐齐哈尔市"
            },
            {
                id: 230300,
                name: "鸡西市"
            },
            {
                id: 230400,
                name: "鹤岗市"
            },
            {
                id: 230500,
                name: "双鸭山市"
            },
            {
                id: 230600,
                name: "大庆市"
            },
            {
                id: 230700,
                name: "伊春市"
            },
            {
                id: 230800,
                name: "佳木斯市"
            },
            {
                id: 230900,
                name: "七台河市"
            },
            {
                id: 231e3,
                name: "牡丹江市"
            },
            {
                id: 231100,
                name: "黑河市"
            },
            {
                id: 231200,
                name: "绥化市"
            },
            {
                id: 232700,
                name: "大兴安岭地区"
            }]
        },
        {
            id: 31e4,
            name: "上海市",
            cities: []
        },
        {
            id: 32e4,
            name: "江苏省",
            cities: [{
                id: 320100,
                name: "南京市"
            },
            {
                id: 320200,
                name: "无锡市"
            },
            {
                id: 320300,
                name: "徐州市"
            },
            {
                id: 320400,
                name: "常州市"
            },
            {
                id: 320500,
                name: "苏州市"
            },
            {
                id: 320600,
                name: "南通市"
            },
            {
                id: 320700,
                name: "连云港市"
            },
            {
                id: 320800,
                name: "淮安市"
            },
            {
                id: 320900,
                name: "盐城市"
            },
            {
                id: 321e3,
                name: "扬州市"
            },
            {
                id: 321100,
                name: "镇江市"
            },
            {
                id: 321200,
                name: "泰州市"
            },
            {
                id: 321300,
                name: "宿迁市"
            }]
        },
        {
            id: 33e4,
            name: "浙江省",
            cities: [{
                id: 330100,
                name: "杭州市"
            },
            {
                id: 330200,
                name: "宁波市"
            },
            {
                id: 330300,
                name: "温州市"
            },
            {
                id: 330400,
                name: "嘉兴市"
            },
            {
                id: 330500,
                name: "湖州市"
            },
            {
                id: 330600,
                name: "绍兴市"
            },
            {
                id: 330700,
                name: "金华市"
            },
            {
                id: 330800,
                name: "衢州市"
            },
            {
                id: 330900,
                name: "舟山市"
            },
            {
                id: 331e3,
                name: "台州市"
            },
            {
                id: 331100,
                name: "丽水市"
            }]
        },
        {
            id: 34e4,
            name: "安徽省",
            cities: [{
                id: 340100,
                name: "合肥市"
            },
            {
                id: 340200,
                name: "芜湖市"
            },
            {
                id: 340300,
                name: "蚌埠市"
            },
            {
                id: 340400,
                name: "淮南市"
            },
            {
                id: 340500,
                name: "马鞍山市"
            },
            {
                id: 340600,
                name: "淮北市"
            },
            {
                id: 340700,
                name: "铜陵市"
            },
            {
                id: 340800,
                name: "安庆市"
            },
            {
                id: 341e3,
                name: "黄山市"
            },
            {
                id: 341100,
                name: "滁州市"
            },
            {
                id: 341200,
                name: "阜阳市"
            },
            {
                id: 341300,
                name: "宿州市"
            },
            {
                id: 341400,
                name: "巢湖市"
            },
            {
                id: 341500,
                name: "六安市"
            },
            {
                id: 341600,
                name: "亳州市"
            },
            {
                id: 341700,
                name: "池州市"
            },
            {
                id: 341800,
                name: "宣城市"
            }]
        },
        {
            id: 35e4,
            name: "福建省",
            cities: [{
                id: 350100,
                name: "福州市"
            },
            {
                id: 350200,
                name: "厦门市"
            },
            {
                id: 350300,
                name: "莆田市"
            },
            {
                id: 350400,
                name: "三明市"
            },
            {
                id: 350500,
                name: "泉州市"
            },
            {
                id: 350600,
                name: "漳州市"
            },
            {
                id: 350700,
                name: "南平市"
            },
            {
                id: 350800,
                name: "龙岩市"
            },
            {
                id: 350900,
                name: "宁德市"
            }]
        },
        {
            id: 36e4,
            name: "江西省",
            cities: [{
                id: 360100,
                name: "南昌市"
            },
            {
                id: 360200,
                name: "景德镇市"
            },
            {
                id: 360300,
                name: "萍乡市"
            },
            {
                id: 360400,
                name: "九江市"
            },
            {
                id: 360500,
                name: "新余市"
            },
            {
                id: 360600,
                name: "鹰潭市"
            },
            {
                id: 360700,
                name: "赣州市"
            },
            {
                id: 360800,
                name: "吉安市"
            },
            {
                id: 360900,
                name: "宜春市"
            },
            {
                id: 361e3,
                name: "抚州市"
            },
            {
                id: 361100,
                name: "上饶市"
            }]
        },
        {
            id: 37e4,
            name: "山东省",
            cities: [{
                id: 370100,
                name: "济南市"
            },
            {
                id: 370200,
                name: "青岛市"
            },
            {
                id: 370300,
                name: "淄博市"
            },
            {
                id: 370400,
                name: "枣庄市"
            },
            {
                id: 370500,
                name: "东营市"
            },
            {
                id: 370600,
                name: "烟台市"
            },
            {
                id: 370700,
                name: "潍坊市"
            },
            {
                id: 370800,
                name: "济宁市"
            },
            {
                id: 370900,
                name: "泰安市"
            },
            {
                id: 371e3,
                name: "威海市"
            },
            {
                id: 371100,
                name: "日照市"
            },
            {
                id: 371200,
                name: "莱芜市"
            },
            {
                id: 371300,
                name: "临沂市"
            },
            {
                id: 371400,
                name: "德州市"
            },
            {
                id: 371500,
                name: "聊城市"
            },
            {
                id: 371600,
                name: "滨州市"
            },
            {
                id: 371700,
                name: "菏泽市"
            }]
        },
        {
            id: 41e4,
            name: "河南省",
            cities: [{
                id: 410100,
                name: "郑州市"
            },
            {
                id: 410200,
                name: "开封市"
            },
            {
                id: 410300,
                name: "洛阳市"
            },
            {
                id: 410400,
                name: "平顶山市"
            },
            {
                id: 410500,
                name: "安阳市"
            },
            {
                id: 410600,
                name: "鹤壁市"
            },
            {
                id: 410700,
                name: "新乡市"
            },
            {
                id: 410800,
                name: "焦作市"
            },
            {
                id: 410900,
                name: "濮阳市"
            },
            {
                id: 411e3,
                name: "许昌市"
            },
            {
                id: 411100,
                name: "漯河市"
            },
            {
                id: 411200,
                name: "三门峡市"
            },
            {
                id: 411300,
                name: "南阳市"
            },
            {
                id: 411400,
                name: "商丘市"
            },
            {
                id: 411500,
                name: "信阳市"
            },
            {
                id: 411600,
                name: "周口市"
            },
            {
                id: 411700,
                name: "驻马店市"
            }]
        },
        {
            id: 42e4,
            name: "湖北省",
            cities: [{
                id: 420100,
                name: "武汉市"
            },
            {
                id: 420200,
                name: "黄石市"
            },
            {
                id: 420300,
                name: "十堰市"
            },
            {
                id: 420500,
                name: "宜昌市"
            },
            {
                id: 420600,
                name: "襄樊市"
            },
            {
                id: 420700,
                name: "鄂州市"
            },
            {
                id: 420800,
                name: "荆门市"
            },
            {
                id: 420900,
                name: "孝感市"
            },
            {
                id: 421e3,
                name: "荆州市"
            },
            {
                id: 421100,
                name: "黄冈市"
            },
            {
                id: 421200,
                name: "咸宁市"
            },
            {
                id: 421300,
                name: "随州市"
            },
            {
                id: 422800,
                name: "恩施土家族苗族自治州"
            },
            {
                id: 429e3,
                name: "省直辖行政单位"
            }]
        },
        {
            id: 43e4,
            name: "湖南省",
            cities: [{
                id: 430100,
                name: "长沙市"
            },
            {
                id: 430200,
                name: "株洲市"
            },
            {
                id: 430300,
                name: "湘潭市"
            },
            {
                id: 430400,
                name: "衡阳市"
            },
            {
                id: 430500,
                name: "邵阳市"
            },
            {
                id: 430600,
                name: "岳阳市"
            },
            {
                id: 430700,
                name: "常德市"
            },
            {
                id: 430800,
                name: "张家界市"
            },
            {
                id: 430900,
                name: "益阳市"
            },
            {
                id: 431e3,
                name: "郴州市"
            },
            {
                id: 431100,
                name: "永州市"
            },
            {
                id: 431200,
                name: "怀化市"
            },
            {
                id: 431300,
                name: "娄底市"
            },
            {
                id: 433100,
                name: "湘西土家族苗族自治州"
            }]
        },
        {
            id: 44e4,
            name: "广东省",
            cities: [{
                id: 440100,
                name: "广州市"
            },
            {
                id: 440200,
                name: "韶关市"
            },
            {
                id: 440300,
                name: "深圳市"
            },
            {
                id: 440400,
                name: "珠海市"
            },
            {
                id: 440500,
                name: "汕头市"
            },
            {
                id: 440600,
                name: "佛山市"
            },
            {
                id: 440700,
                name: "江门市"
            },
            {
                id: 440800,
                name: "湛江市"
            },
            {
                id: 440900,
                name: "茂名市"
            },
            {
                id: 441200,
                name: "肇庆市"
            },
            {
                id: 441300,
                name: "惠州市"
            },
            {
                id: 441400,
                name: "梅州市"
            },
            {
                id: 441500,
                name: "汕尾市"
            },
            {
                id: 441600,
                name: "河源市"
            },
            {
                id: 441700,
                name: "阳江市"
            },
            {
                id: 441800,
                name: "清远市"
            },
            {
                id: 441900,
                name: "东莞市"
            },
            {
                id: 442e3,
                name: "中山市"
            },
            {
                id: 445100,
                name: "潮州市"
            },
            {
                id: 445200,
                name: "揭阳市"
            },
            {
                id: 445300,
                name: "云浮市"
            }]
        },
        {
            id: 45e4,
            name: "广西壮族自治区",
            cities: [{
                id: 450100,
                name: "南宁市"
            },
            {
                id: 450200,
                name: "柳州市"
            },
            {
                id: 450300,
                name: "桂林市"
            },
            {
                id: 450400,
                name: "梧州市"
            },
            {
                id: 450500,
                name: "北海市"
            },
            {
                id: 450600,
                name: "防城港市"
            },
            {
                id: 450700,
                name: "钦州市"
            },
            {
                id: 450800,
                name: "贵港市"
            },
            {
                id: 450900,
                name: "玉林市"
            },
            {
                id: 451e3,
                name: "百色市"
            },
            {
                id: 451100,
                name: "贺州市"
            },
            {
                id: 451200,
                name: "河池市"
            },
            {
                id: 451300,
                name: "来宾市"
            },
            {
                id: 451400,
                name: "崇左市"
            }]
        },
        {
            id: 46e4,
            name: "海南省",
            cities: [{
                id: 460100,
                name: "海口市"
            },
            {
                id: 460200,
                name: "三亚市"
            },
            {
                id: 469e3,
                name: "省直辖县级行政单位"
            }]
        },
        {
            id: 5e5,
            name: "重庆市",
            cities: []
        },
        {
            id: 51e4,
            name: "四川省",
            cities: [{
                id: 510100,
                name: "成都市"
            },
            {
                id: 510300,
                name: "自贡市"
            },
            {
                id: 510400,
                name: "攀枝花市"
            },
            {
                id: 510500,
                name: "泸州市"
            },
            {
                id: 510600,
                name: "德阳市"
            },
            {
                id: 510700,
                name: "绵阳市"
            },
            {
                id: 510800,
                name: "广元市"
            },
            {
                id: 510900,
                name: "遂宁市"
            },
            {
                id: 511e3,
                name: "内江市"
            },
            {
                id: 511100,
                name: "乐山市"
            },
            {
                id: 511300,
                name: "南充市"
            },
            {
                id: 511400,
                name: "眉山市"
            },
            {
                id: 511500,
                name: "宜宾市"
            },
            {
                id: 511600,
                name: "广安市"
            },
            {
                id: 511700,
                name: "达州市"
            },
            {
                id: 511800,
                name: "雅安市"
            },
            {
                id: 511900,
                name: "巴中市"
            },
            {
                id: 512e3,
                name: "资阳市"
            },
            {
                id: 513200,
                name: "阿坝藏族羌族自治州"
            },
            {
                id: 513300,
                name: "甘孜藏族自治州"
            },
            {
                id: 513400,
                name: "凉山彝族自治州"
            }]
        },
        {
            id: 52e4,
            name: "贵州省",
            cities: [{
                id: 520100,
                name: "贵阳市"
            },
            {
                id: 520200,
                name: "六盘水市"
            },
            {
                id: 520300,
                name: "遵义市"
            },
            {
                id: 520400,
                name: "安顺市"
            },
            {
                id: 522200,
                name: "铜仁地区"
            },
            {
                id: 522300,
                name: "黔西南布依族苗族自治州"
            },
            {
                id: 522400,
                name: "毕节地区"
            },
            {
                id: 522600,
                name: "黔东南苗族侗族自治州"
            },
            {
                id: 522700,
                name: "黔南布依族苗族自治州"
            }]
        },
        {
            id: 53e4,
            name: "云南省",
            cities: [{
                id: 530100,
                name: "昆明市"
            },
            {
                id: 530300,
                name: "曲靖市"
            },
            {
                id: 530400,
                name: "玉溪市"
            },
            {
                id: 530500,
                name: "保山市"
            },
            {
                id: 530600,
                name: "昭通市"
            },
            {
                id: 530700,
                name: "丽江市"
            },
            {
                id: 530800,
                name: "普洱市"
            },
            {
                id: 530900,
                name: "临沧市"
            },
            {
                id: 532300,
                name: "楚雄彝族自治州"
            },
            {
                id: 532500,
                name: "红河哈尼族彝族自治州"
            },
            {
                id: 532600,
                name: "文山壮族苗族自治州"
            },
            {
                id: 532800,
                name: "西双版纳傣族自治州"
            },
            {
                id: 532900,
                name: "大理白族自治州"
            },
            {
                id: 533100,
                name: "德宏傣族景颇族自治州"
            },
            {
                id: 533300,
                name: "怒江傈僳族自治州"
            },
            {
                id: 533400,
                name: "迪庆藏族自治州"
            }]
        },
        {
            id: 54e4,
            name: "西藏自治区",
            cities: [{
                id: 540100,
                name: "拉萨市"
            },
            {
                id: 542100,
                name: "昌都地区"
            },
            {
                id: 542200,
                name: "山南地区"
            },
            {
                id: 542300,
                name: "日喀则地区"
            },
            {
                id: 542400,
                name: "那曲地区"
            },
            {
                id: 542500,
                name: "阿里地区"
            },
            {
                id: 542600,
                name: "林芝地区"
            }]
        },
        {
            id: 61e4,
            name: "陕西省",
            cities: [{
                id: 610100,
                name: "西安市"
            },
            {
                id: 610200,
                name: "铜川市"
            },
            {
                id: 610300,
                name: "宝鸡市"
            },
            {
                id: 610400,
                name: "咸阳市"
            },
            {
                id: 610500,
                name: "渭南市"
            },
            {
                id: 610600,
                name: "延安市"
            },
            {
                id: 610700,
                name: "汉中市"
            },
            {
                id: 610800,
                name: "榆林市"
            },
            {
                id: 610900,
                name: "安康市"
            },
            {
                id: 611e3,
                name: "商洛市"
            }]
        },
        {
            id: 62e4,
            name: "甘肃省",
            cities: [{
                id: 620100,
                name: "兰州市"
            },
            {
                id: 620200,
                name: "嘉峪关市"
            },
            {
                id: 620300,
                name: "金昌市"
            },
            {
                id: 620400,
                name: "白银市"
            },
            {
                id: 620500,
                name: "天水市"
            },
            {
                id: 620600,
                name: "武威市"
            },
            {
                id: 620700,
                name: "张掖市"
            },
            {
                id: 620800,
                name: "平凉市"
            },
            {
                id: 620900,
                name: "酒泉市"
            },
            {
                id: 621e3,
                name: "庆阳市"
            },
            {
                id: 621100,
                name: "定西市"
            },
            {
                id: 621200,
                name: "陇南市"
            },
            {
                id: 622900,
                name: "临夏回族自治州"
            },
            {
                id: 623e3,
                name: "甘南藏族自治州"
            }]
        },
        {
            id: 63e4,
            name: "青海省",
            cities: [{
                id: 630100,
                name: "西宁市"
            },
            {
                id: 632100,
                name: "海东地区"
            },
            {
                id: 632200,
                name: "海北藏族自治州"
            },
            {
                id: 632300,
                name: "黄南藏族自治州"
            },
            {
                id: 632500,
                name: "海南藏族自治州"
            },
            {
                id: 632600,
                name: "果洛藏族自治州"
            },
            {
                id: 632700,
                name: "玉树藏族自治州"
            },
            {
                id: 632800,
                name: "海西蒙古族藏族自治州"
            }]
        },
        {
            id: 64e4,
            name: "宁夏回族自治区",
            cities: [{
                id: 640100,
                name: "银川市"
            },
            {
                id: 640200,
                name: "石嘴山市"
            },
            {
                id: 640300,
                name: "吴忠市"
            },
            {
                id: 640400,
                name: "固原市"
            },
            {
                id: 640500,
                name: "中卫市"
            }]
        },
        {
            id: 65e4,
            name: "新疆维吾尔自治区",
            cities: [{
                id: 650100,
                name: "乌鲁木齐市"
            },
            {
                id: 650200,
                name: "克拉玛依市"
            },
            {
                id: 650300,
                name: "石河子市"
            },
            {
                id: 652100,
                name: "吐鲁番地区"
            },
            {
                id: 652200,
                name: "哈密地区"
            },
            {
                id: 652300,
                name: "昌吉回族自治州"
            },
            {
                id: 652700,
                name: "博尔塔拉蒙古自治州"
            },
            {
                id: 652800,
                name: "巴音郭楞蒙古自治州"
            },
            {
                id: 652900,
                name: "阿克苏地区"
            },
            {
                id: 653e3,
                name: "克孜勒苏柯尔克孜自治州"
            },
            {
                id: 653100,
                name: "喀什地区"
            },
            {
                id: 653200,
                name: "和田地区"
            },
            {
                id: 654e3,
                name: "伊犁哈萨克自治州"
            },
            {
                id: 654200,
                name: "塔城地区"
            },
            {
                id: 654300,
                name: "阿勒泰地区"
            },
            {
                id: 659e3,
                name: "省直辖行政单位"
            }]
        },
        {
            id: 71e4,
            name: "台湾",
            cities: []
        },
        {
            id: 81e4,
            name: "香港",
            cities: []
        },
        {
            id: 82e4,
            name: "澳门",
            cities: []
        }]
    }]
}),
define("iot/_public/RegionSelect", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "esui", "esui/InputControl", "esui/painters", "esui/Select"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    function d(e) {
        return p["default"].map(e,
        function(e) {
            return {
                name: e.name,
                value: e.id
            }
        })
    }
    function u(e, t) {
        if (p["default"].isArray(e) && p["default"].isFunction(t)) for (var i = 0,
        a = e.length; i < a; i++) if (t(e[i])) return i;
        return - 1
    }
    function c(e, t) {
        var i = e.getChild("country"),
        a = e.getChild("province"),
        n = e.getChild("city"),
        r = p["default"].extend({
            country: "",
            province: "",
            city: ""
        },
        e.rawValue),
        o = u(t,
        function(e) {
            return e.id == r.country
        });
        i.setProperties({
            selectedIndex: o,
            datasource: t ? d(t) : [{
                name: e.country.emptyText,
                value: ""
            }]
        });
        var s = t[o] && t[o].provinces,
        l = u(s,
        function(e) {
            return e.id == r.province
        });
        a.setProperties({
            selectedIndex: l,
            datasource: s ? d(s) : [{
                name: e.province.emptyText,
                value: ""
            }]
        });
        var c = s && s[l],
        f = c && c.cities,
        m = f ? d(f) : [];
        m.length || m.push(c ? {
            name: c.name,
            value: c.id
        }: {
            name: e.city.emptyText,
            value: ""
        });
        var h = u(m,
        function(e) {
            return e.value == r.city
        });
        n.setProperties({
            selectedIndex: h,
            datasource: m
        })
    }
    var p = n["default"](a),
    f = n["default"](r),
    m = n["default"](o),
    h = n["default"](s),
    b = {
        required: {
            name: "required",
            type: "boolean"
        },
        pattern: {
            name: "pattern",
            type: "regexp"
        },
        min: {
            name: "min",
            type: "number"
        },
        max: {
            name: "max",
            type: "number"
        },
        validityLabel: {
            name: "validityLabel",
            type: "string"
        }
    },
    v = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e)
        }
        return e["default"](n, a),
        n.prototype.initOptions = function(e) {
            var t = {
                country: {
                    emptyText: "- 国家 -",
                    title: "国家信息"
                },
                province: {
                    emptyText: "- 省份 -",
                    title: "省份信息"
                },
                city: {
                    emptyText: "- 城市 -",
                    title: "城市信息"
                }
            };
            p["default"].extend(t, e),
            a.prototype.initOptions.call(this, t)
        },
        n.prototype.initStructure = function() {
            var e = {
                height: this.height,
                extensions: this.extensions,
                viewContext: this.viewContext
            };
            p["default"].extend(e,
            function(e) {
                var t = {};
                return p["default"].each(b,
                function(i) {
                    var a = e[i.name];
                    if (a) switch (i.type) {
                    case "boolean":
                        t[i.name] = !!a;
                        break;
                    case "number":
                        t[i.name] = parseInt(a, 10);
                        break;
                    case "regexp":
                        t[i.name] = new Function("return " + a)();
                        break;
                    default:
                        t[i.name] = a
                    }
                }),
                t
            } (this));
            var t = p["default"].extend({
                childName: "country"
            },
            e, this.country),
            i = p["default"].extend({
                childName: "province"
            },
            e, this.province),
            a = p["default"].extend({
                childName: "city"
            },
            e, this.city),
            n = f["default"].create("Select", t),
            r = f["default"].create("Select", i),
            o = f["default"].create("Select", a);
            n.appendTo(this.main),
            r.appendTo(this.main),
            o.appendTo(this.main),
            this.addChild(n),
            this.addChild(r),
            this.addChild(o)
        },
        n.prototype.initEvents = function() {
            var e = this.getChild("country"),
            t = this.getChild("province"),
            i = this.getChild("city");
            e.on("change", this.changeCountry, this),
            t.on("change", this.changeProvince, this),
            i.on("change", this.changeCity, this)
        },
        n.prototype.changeCountry = function(e) {
            var t = this.datasource[e.target.selectedIndex];
            this.getChild("province").setProperties({
                selectedIndex: -1,
                datasource: t ? d(t.provinces) : []
            }),
            this.getChild("city").updateDatasource([{
                name: this.city.emptyText,
                value: ""
            }]),
            this.fire("countryChange", {
                source: t
            }),
            this.fire("change")
        },
        n.prototype.changeProvince = function(e) {
            var t = this.datasource[this.getChild("country").selectedIndex],
            i = t && t.provinces[e.target.selectedIndex],
            a = this.getChild("city"),
            n = i ? d(i.cities) : [];
            n.length || (n = i ? [{
                name: i.name,
                value: i.id
            }] : []),
            a.setProperties({
                selectedIndex: -1,
                datasource: n
            }),
            this.fire("provinceChange", {
                source: i
            }),
            this.fire("change")
        },
        n.prototype.changeCity = function(e) {
            var t = this.datasource[this.getChild("country").selectedIndex],
            i = t && t.provinces[this.getChild("province").selectedIndex],
            a = i && i.cities[e.target.selectedIndex];
            this.fire("cityChange", {
                source: a
            }),
            this.fire("change")
        },
        n.prototype.validate = function() {
            var e = !0;
            return p["default"].each(this.children,
            function(t) {
                e = e && t.validate()
            }),
            e
        },
        n.prototype.setValue = function(e) {
            a.prototype.setValue.call(this, e),
            c(this, this.datasource)
        },
        n.prototype.getValue = function() {
            return this.getRawValue()
        },
        n.prototype.getRawValue = function() {
            return {
                country: this.getChild("country").getValue(),
                province: this.getChild("province").getValue(),
                city: this.getChild("city").getValue()
            }
        },
        t["default"](n, [{
            key: "type",
            get: function() {
                return "RegionSelect"
            }
        },
        {
            key: "repaint",
            get: function() {
                return h["default"].createRepaint(a.prototype.repaint, {
                    name: "datasource",
                    paint: function(e, t) {
                        c(e, t)
                    }
                })
            }
        }]),
        n
    } (m["default"]);
    f["default"].register(v),
    module.exports = v
}),
define("iot/_public/storage", ["exports", "module", "underscore", "babel-runtime/helpers/interop-require-default", "common/constants", "fc-storage/sessionStorage"],
function(exports, module, e, t, i, a) {
    var n = t["default"](e),
    r = t["default"](i),
    o = t["default"](a);
    module.exports = function(e, t) {
        var i = function() {
            return "__IOT__" + t()
        };
        return {
            dump: function() {
                var t = e.getItem(i());
                return n["default"].isObject(t) || (t = {}),
                n["default"].clone(t)
            },
            get: function(e) {
                var t = this.dump();
                return n["default"].clone(t[e])
            },
            set: function(t, a) {
                var n = this.dump();
                n[t] = a,
                e.setItem(i(), n)
            },
            clear: function() {
                e.removeItem(i())
            },
            remove: function(t) {
                var a = this.dump();
                n["default"].isObject(a) && a[t] !== undefined && delete a[t],
                e.setItem(i(), a)
            },
            update: function(t, a) {
                var n, r = (n = {},
                n[t] = a, n);
                e.updateItem(i(), r)
            }
        }
    } (o["default"],
    function() {
        return r["default"].userid || "default-user"
    })
}),
define("iot/_public/SuggestInput", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "esui", "etpl", "esui/lib", "esui/InputControl", "esui/painters", "esui/validator/ValidityState"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](l),
    b = n["default"](d),
    v = n["default"](u),
    g = ['<div class="${prefix}-input-box" id="${inputId}"></div>', '<div class="${prefix}-create-tip" id="${createTipId}" ', 'title="取消创建${title}" style="display:none;">', "<span>创建${title}</span>", '<a href="javascript:;">×</a>', "</div>", '<div class="${prefix}-list-layer" id="${layerId}">', '<div class="${prefix}-list" id="${listId}"></div>', "\x3c!-- if: ${needFoot} --\x3e", '<div class="${prefix}-create-item" id="${createId}">＋创建</div>', "\x3c!-- /if --\x3e", "</div>"].join(""),
    y = ['<div class="${prefix}-item" data-index="${index}" ', 'action-type="item" action-data="${title}">', "${title}", "</div>"].join(""),
    w = {
        required: {
            name: "required",
            type: "boolean"
        },
        pattern: {
            name: "pattern",
            type: "regexp"
        },
        min: {
            name: "min",
            type: "number"
        },
        max: {
            name: "max",
            type: "number"
        },
        validityLabel: {
            name: "validityLabel",
            type: "string"
        }
    },
    x = {
        CREATING: "creating",
        NORMAL: "normal"
    },
    T = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initOptions = function(e) {
            var t = {
                needFoot: !0,
                maxListLength: 10,
                validMessage: "校验失败",
                params: {},
                _index: -1,
                _listLength: 0,
                _inputProperties: {},
                _fetchCount: 0,
                _status: x.NORMAL
            };
            c["default"].extend(t, e),
            "false" === e.disabled && (e.disabled = !1),
            c["default"].each(e,
            function(e, i) {
                var a = i.match(/^input\-(.*)?$/i);
                if (a && a[1]) {
                    var n = a[1];
                    t._inputProperties[n] = e,
                    delete t[i]
                }
            }),
            a.prototype.initOptions.call(this, t)
        },
        n.prototype.initStructure = function() {
            var e = f["default"].compile(g)({
                prefix: this.helper.getPrimaryClassName(),
                title: this.title,
                inputId: this.helper.getId("input"),
                layerId: this.helper.getId("layer"),
                listId: this.helper.getId("list"),
                createId: this.helper.getId("create"),
                createTipId: this.helper.getId("tip"),
                needFoot: this.needFoot
            });
            this.main.innerHTML = e;
            var t = {
                height: this.height,
                width: this.width,
                title: this.title,
                placeholder: this.placeholder,
                disabled: this.disabled,
                readOnly: this.readOnly,
                childName: "text",
                viewContext: this.viewContext
            };
            c["default"].extend(t,
            function(e) {
                var t = {};
                return c["default"].each(w,
                function(i) {
                    var a = e[i.name];
                    if (a) switch (i.type) {
                    case "boolean":
                        t[i.name] = !!a;
                        break;
                    case "number":
                        t[i.name] = parseInt(a, 10);
                        break;
                    case "regexp":
                        t[i.name] = new Function("return " + a)();
                        break;
                    default:
                        t[i.name] = a
                    }
                }),
                t
            } (this));
            var i = p["default"].create("TextBox", t);
            i.appendTo(this.helper.getPart("input")),
            this.addChild(i);
            var a = m["default"].getChildren(i.main)[0];
            c["default"].each(this._inputProperties,
            function(e, t) {
                return m["default"].setAttribute(a, t, e)
            }),
            this._input = a,
            this.rawValue && this.setValue(this.rawValue, {
                keyword: ""
            })
        },
        n.prototype.initEvents = function() {
            var e = this.helper.getPart("tip"),
            t = this.getChild("text");
            if (t.on("input", c["default"].debounce(this.onInput, 50), this), t.on("enter", this.onEnter, this), this.helper.addDOMEvent(this._input, "keydown", this.onKeydown), this.helper.addDOMEvent(this._input, "click", this.onInputClick), this.helper.addDOMEvent(e, "click", this.cancelCreate), this.helper.addDOMEvent(document, "click", this.documentClick), this.delegateEvent("item", "click", this.onSelect), this.needFoot) {
                var i = this.helper.getPart("create");
                this.helper.addDOMEvent(i, "click", this.onCreate)
            }
        },
        n.prototype.onInput = function(e) {
            this.search(e.target.getValue())
        },
        n.prototype.onInputClick = function(e) {
            var t = this;
            this.hasRelativeItem() ? this.toggleLayer(!0) : this.search(this.getValue()).done(function() {
                return t.toggleLayer(!0)
            })
        },
        n.prototype.onKeydown = function(e) {
            var t = e.which || e.keyCode,
            i = this._listLength - 1;
            38 === t ? (this._index = this._index - 1, this._index < -1 && (this._index = i), this.select(this._index)) : 40 === t && (this._index = this._index + 1, this._index > i && (this._index = -1), this.select(this._index))
        },
        n.prototype.onEnter = function() {
            this.onSelect({
                index: this._index
            })
        },
        n.prototype.select = function(e) {
            e = c["default"].isNumber(e) ? e: this._index,
            this._index = e;
            var t = this.helper.getPart("list"),
            i = t.querySelector(".active"),
            a = t.querySelector('[data-index="' + e + '"]');
            m["default"].removeClass(i, "active"),
            a ? (m["default"].addClass(a, "active"), this.setValue(m["default"].getAttribute(a, "action-data"))) : this.setValue(this._inputValue),
            window.setTimeout(c["default"].bind(this.setCursorEnd, this), -1)
        },
        n.prototype.onSelect = function(e) {
            var t = c["default"].isNumber(e.index) ? e.index: m["default"].getAttribute(e.target, "data-index");
            this.select(parseInt(t, 10)),
            c["default"].delay(c["default"].bind(this.toggleLayer, this, !1), 100)
        },
        n.prototype.onCreate = function(e) {
            this.fire("create", e),
            this.updateStatus(x.CREATING),
            this.toggleLayer(!1)
        },
        n.prototype.cancelCreate = function(e) {
            this.fire("cancelcreate", e),
            this.updateStatus(x.NORMAL)
        },
        n.prototype.updateStatus = function(e) {
            var t = this.helper.getPart("tip");
            switch (e) {
            case x.CREATING:
                this.setValue(""),
                this.showValidationMessage("valid"),
                t.style.display = "block";
                break;
            default:
                t.style.display = "none"
            }
            this._status = e
        },
        n.prototype.isCreating = function() {
            return this._status === x.CREATING
        },
        n.prototype.documentClick = function(e) {
            var t = m["default"].event.getTarget(e);
            m["default"].dom.contains(this.main, t) || this.toggleLayer(!1)
        },
        n.prototype.validate = function() {
            if (this._status === x.CREATING) return ! 0;
            var e = this.getValidationResult();
            return this._fetchCount > 0 ? e.addState("invalid", new v["default"](!1, this.title + "校验中")) : this.getValue() && !this.hasRelativeItem() && e.addState("invalid", new v["default"](!1, this.validMessage)),
            this.showValidity(e),
            e.isValid()
        },
        n.prototype.hasRelativeItem = function() {
            var e = this.helper.getPart("list");
            return m["default"].getChildren(e).length > 0
        },
        n.prototype.toggleLayer = function(e) {
            this.helper.getPart("layer").style.display = e ? "block": "none"
        },
        n.prototype.search = function(e) {
            var t = this;
            return this._inputValue = e,
            this._fetchCount++,
            this.action(c["default"].extend({
                keyword: e
            },
            this.params), {
                "X-silence": !0
            }).done(function(e) {
                t._fetchCount--,
                t.buildSuggestList(e)
            })
        },
        n.prototype.buildSuggestList = function(e) {
            var t = this;
            this._listData = e,
            this._listLength = Math.min(e.length, this.maxListLength);
            var i = c["default"].map(e,
            function(e, i) {
                var a = c["default"].isFunction(t.formatter) ? t.formatter(e, i) : c["default"].values(e)[0] || "";
                return f["default"].compile(y)({
                    prefix: t.helper.getPrimaryClassName(),
                    index: i,
                    title: a
                })
            });
            this.helper.getPart("list").innerHTML = i.join("")
        },
        n.prototype.setValue = function(e, t) {
            this.getChild("text").setValue(e),
            t && this.search(c["default"].has(t, "keyword") ? t.keyword: e)
        },
        n.prototype.getValue = function() {
            return this.getRawValue()
        },
        n.prototype.getRawValue = function() {
            return this.getChild("text").getValue() || ""
        },
        n.prototype.dispose = function() {
            a.prototype.dispose.call(this),
            this.helper.removeDOMEvent(document, "click", this.documentClick)
        },
        n.prototype.delegateEvent = function(e, t, i) {
            var a = this;
            this.helper.addDOMEvent(this.main, t,
            function(n) {
                var r = m["default"].event.getTarget(n),
                o = r.getAttribute("action-type"),
                s = r.getAttribute("action-data");
                o && o === e && i.call(a, {
                    target: r,
                    eventType: t,
                    originEvent: n,
                    args: s
                })
            })
        },
        n.prototype.setCursorEnd = function() {
            var e = this._input,
            t = this.getValue().length;
            if (e.setSelectionRange) e.setSelectionRange(t, t),
            e.focus();
            else {
                var i = e.createTextRange();
                i.collapse(!0),
                i.moveEnd("character", t),
                i.moveStart("character", t),
                i.select()
            }
        },
        t["default"](n, [{
            key: "type",
            get: function() {
                return "SuggestInput"
            }
        },
        {
            key: "repaint",
            get: function() {
                return b["default"].createRepaint(a.prototype.repaint, {
                    name: "width",
                    paint: function(e, t) {
                        e.helper.getPart("layer").style.width = t + "px"
                    }
                },
                {
                    name: "disabled",
                    paint: function(e, t) {
                        e._input.disabled = t
                    }
                })
            }
        }]),
        n
    } (h["default"]);
    p["default"].register(T),
    module.exports = T
}),
define("iot/_public/util", ["exports", "module", "underscore", "babel-runtime/helpers/interop-require-default", "esui", "../config"],
function(exports, module, e, t, i, a) {
    var n = t["default"](e),
    r = t["default"](i),
    o = t["default"](a);
    module.exports = {
        autoValidateExt: [r["default"].createExtension("AutoValidate", {
            prevent: !0
        })],
        formatMoney: function(e) {
            var t = "-";
            return (e || 0 === e) && (t = Number(e).toFixed(2)),
            t
        },
        hasAuth: function(e, t) {
            var i = (o["default"].IOT_AUTH || {})[e] || [],
            a = !0;
            return i && (a = n["default"].contains(i, t.domainStatus)),
            a
        },
        getInputControls: function(e, t, i) {
            var a = [];
            return function o(e) {
                var s = e.children;
                n["default"].each(s,
                function(e, n) {
                    if (1 !== e.nodeType) return ! 1;
                    var s = r["default"].getControlByDOM(e); ! s || !
                    function(e) {
                        var t = e && e.getCategory();
                        return t && ("input" === t || "check" === t)
                    } (s) || t && s.get("name") !== t || i && s.get("type") !== i ? o(e) : a.push(s)
                })
            } (e),
            a
        },
        getUIControls: function(e, t, i) {
            var a = [];
            return function o(e) {
                var s = e.children;
                n["default"].each(s,
                function(e, n) {
                    if (1 !== e.nodeType) return ! 1;
                    var s = r["default"].getControlByDOM(e); ! s || t && s.get("name") !== t || i && s.get("type") !== i ? o(e) : a.push(s)
                })
            } (e),
            a
        },
        setControlsDisabled: function(e, t) {
            e && n["default"].each(e,
            function(e) {
                t ? e.disable() : e.enable()
            })
        },
        indexOf: function(e, t) {
            if (null == e) return - 1;
            for (var i = 0; i < e.length; i++) if (e[i].value === t) return i;
            return - 1
        }
    }
}),
define("iot/app/base", ["exports", "module", "babel-runtime/helpers/class-call-check"],
function(exports, module, e) {
    var t = function() {
        function t() {
            e["default"](this, t),
            this.type = null,
            this.sidebar = null
        }
        return t.prototype.start = function() {},
        t.prototype.stop = function() {},
        t
    } ();
    module.exports = t
}),
define("iot/app/config", ["exports"],
function(exports) {
    exports.__esModule = !0;
    exports.HUB_SIDEBAR_CONFIG = {
        type: "IOT_HUB",
        depth: 3,
        hideActions: ["#/iot/order/initnotify", "#/iot/order/initcreate", "#/iot/order/upgradeUnicom", "#/iot/order/notify", "#/iot/order/create", "#/iot/order/upgrade", "#/iot/temp/error", "#/iot/turnkey/choose", "#/iot/turnkey/confirm", "#/iot/turnkey/detail", "#/iot/turnkey/success", "#/iot/turnkey/list", "#/iot/turnkey/listdetail", "#/region/404"],
        config: [{
            title: "物接入"
        },
        {
            title: "实例列表",
            service: "endpoint-list",
            icon: "icon-list",
            url: "#/iot/endpoint/list",
            anchors: ["#/iot/endpoint/initlist", "#/iot/endpoint/allStats", "#/iot/endpoint/package", "#/iot/endpoint/unicomStats", "#/iot/endpoint/unicomPackage"],
            navs: [[{
                title: "&lt;返回实例列表",
                url: "#/iot/endpoint/list"
            },
            {
                title: "用量统计-物接入",
                service: "endpoint-stats",
                url: "#/iot/endpoint/stats~[uuid][name][from]"
            },
            {
                title: "用量统计-物接入SIM版",
                service: "endpoint-unicom-stats",
                url: "#/iot/endpoint/uStats~[uuid][name][from]"
            }], [{
                title: "&lt;返回实例列表",
                url: "#/iot/endpoint/list"
            },
            {
                title: "设备列表",
                service: "thing-list",
                url: "#/iot/thing/list~[endpointName]"
            },
            {
                title: "身份列表",
                service: "principal-list",
                url: "#/iot/principal/list~[endpointName]"
            },
            {
                title: "策略列表",
                service: "policy-list",
                url: "#/iot/policy/list~[endpointName]"
            },
            {
                title: "数据存储",
                service: "storage-list",
                url: "#/iot/storage/list~[endpointName]"
            }]]
        }]
    };
    exports.HUB_SUBUSER_SIDEBAR_CONFIG = {
        type: "IOT_HUB",
        depth: 3,
        hideActions: ["#/iot/order/notify", "#/iot/order/create", "#/iot/order/upgrade", "#/iot/temp/error", "#/iot/turnkey/choose", "#/iot/turnkey/confirm", "#/iot/turnkey/detail", "#/iot/turnkey/success", "#/iot/turnkey/list", "#/iot/turnkey/listdetail", "#/region/404"],
        config: [{
            title: "物接入"
        },
        {
            title: "实例列表",
            service: "endpoint-list",
            icon: "icon-list",
            url: "#/iot/endpoint/list",
            anchors: ["#/iot/endpoint/initlist", "#/iot/endpoint/allStats", "#/iot/endpoint/package", "#/iot/endpoint/unicomStats", "#/iot/endpoint/unicomPackage"],
            navs: [[{
                title: "&lt;返回实例列表",
                url: "#/iot/endpoint/list"
            },
            {
                title: "用量统计-物接入",
                service: "endpoint-stats",
                url: "#/iot/endpoint/stats~[uuid][name][from]"
            },
            {
                title: "用量统计-物接入SIM版",
                service: "endpoint-unicom-stats",
                url: "#/iot/endpoint/uStats~[uuid][name][from]"
            }], [{
                title: "&lt;返回实例列表",
                url: "#/iot/endpoint/list"
            },
            {
                title: "设备列表",
                service: "thing-list",
                url: "#/iot/thing/list~[endpointName]"
            },
            {
                title: "身份列表",
                service: "principal-list",
                url: "#/iot/principal/list~[endpointName]"
            },
            {
                title: "策略列表",
                service: "policy-list",
                url: "#/iot/policy/list~[endpointName]"
            }]]
        }]
    };
    exports.PARSER_SIDEBAR_CONFIG = {
        type: "IOT_MODBUS",
        depth: 3,
        hideActions: ["#/iot/modbus/landing"],
        config: [{
            title: "物解析"
        },
        {
            title: "网关设备管理",
            service: "manage",
            icon: "icon-iam-user",
            url: "#/iot/modbus/manage"
        },
        {
            title: "解析项目",
            service: "analysis",
            icon: "icon-searchall",
            url: "#/iot/modbus/analysis",
            navs: [{
                title: "&lt;返回解析项目",
                url: "#/iot/modbus/analysis"
            },
            {
                title: "解析设置",
                service: "settings",
                url: "#/iot/modbus/analysis/settings~[parserObjectUuid:uuid][name][rawState][gatewayUuid]"
            },
            {
                title: "数据验证",
                service: "verify",
                url: "#/iot/modbus/analysis/verify~[uuid:parserObjectUuid][name][rawState][gatewayUuid]"
            }]
        },
        {
            title: "高级设置",
            service: "advanced",
            icon: "icon-sdk",
            url: "#/iot/modbus/advanced"
        }]
    }
}),
define("iot/app/helper", ["exports"],
function(exports) {
    exports.__esModule = !0;
    var e = {
        MODBUS: 1,
        HUBBUS: 2
    };
    exports.ApplicationType = e;
    exports.getApplicationType = function() {
        return location.href.indexOf("#/iot/modbus") > -1 ? e.MODBUS: e.HUBBUS
    }
}),
define("iot/app/hubbus", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "../endpoint/config", "../thing/config", "../principal/config", "../policy/config", "../storage/config", "../order/config", "../turnkey/config", "inf-ria/sidebar/Sidebar", "babel-runtime/helpers/interop-require-default", "common/storage", "./base", "./config", "./helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p, f, m) {
    var h = u["default"](d),
    b = u["default"](c),
    v = "BCE_IOT_MODBUS_SUBUSER",
    g = function(i) {
        function a() {
            t["default"](this, a),
            i.call(this),
            this.type = m.ApplicationType.HUBBUS;
            var e = b["default"].get(v) ? f.HUB_SUBUSER_SIDEBAR_CONFIG: f.HUB_SIDEBAR_CONFIG;
            this.sidebar = new h["default"](e)
        }
        return e["default"](a, i),
        a
    } (u["default"](p)["default"]);
    module.exports = g
}),
define("iot/app/manager", ["exports", "module", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "er/events", "./modbus", "./hubbus", "./helper"],
function(exports, module, e, t, i, a, n, r, o) {
    var s, l = i["default"](t),
    d = i["default"](a),
    u = i["default"](n),
    c = i["default"](r),
    p = (s = {},
    s[o.ApplicationType.MODBUS] = u["default"], s[o.ApplicationType.HUBBUS] = c["default"], s),
    f = function() {
        function t() {
            e["default"](this, t),
            this.app = null,
            this.eventHandler = l["default"].bind(this.eventHandler, this)
        }
        return t.prototype.eventHandler = function(e) {
            if (!e.isChildAction) {
                var t = o.getApplicationType();
                this.current().type !== t && this.switchTo(t)
            }
        },
        t.prototype.current = function() {
            return this.app || this.create(),
            this.app
        },
        t.prototype.switchTo = function(e) {
            var t = p[e];
            "function" == typeof t && (this.app = new t)
        },
        t.prototype.create = function() {
            var e = o.getApplicationType();
            this.switchTo(e)
        },
        t.prototype.start = function() {
            d["default"].on("enteractioncomplete", this.eventHandler);
            var e = this.current();
            e && e.start()
        },
        t.prototype.dispose = function() {
            d["default"].un("enteractioncomplete", this.eventHandler);
            var e = this.current();
            e && (e.stop(), this.app = null)
        },
        t
    } ();
    module.exports = new f
}),
define("iot/app/modbus", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "../modbus/manage/config", "../modbus/manage-v2/config", "../modbus/analysis/config", "../modbus/common/config", "../modbus/advanced/config", "../modbus/landing/config", "inf-ria/sidebar/Sidebar", "babel-runtime/helpers/interop-require-default", "./base", "./config", "./helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p) {
    var f = d["default"](l),
    m = function(i) {
        function a() {
            t["default"](this, a),
            i.call(this),
            this.type = p.ApplicationType.MODBUS,
            this.sidebar = new f["default"](c.PARSER_SIDEBAR_CONFIG)
        }
        return e["default"](a, i),
        a
    } (d["default"](u)["default"]);
    module.exports = m
}),
define("iot/common.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_name_tip --\x3e\n<span data-ui-type="Tip"\n    data-ui-arrow="true">名称由英文字母（a-z，不区分大小写）、数字（0-9）、下划线“_”以及连字符“-”（即中横线）构成，不能使用空格及特殊字符（如！、$、&、?等）。“-” 不能单独或连续使用，不能放在开头或结尾。</span>\n\n\x3c!-- target: TPL_iot_topic_tip --\x3e\n<span data-ui-type="Tip"\n    data-ui-arrow="true">主题名不超过256个字符，仅支持ASCII字符，不支持中文。</span>\n\n\x3c!-- target: TPL_modbus_name_tip --\x3e\n<span data-ui-type="Tip"\n    data-ui-arrow="true">该字段作为解析后的JSON串的KEY值。</span>\n\n\x3c!-- target: TPL_modbus_bit_tip --\x3e\n<span data-ui-type="Tip"\n    data-ui-arrow="true">若填写，则只解析该位数据，0表示该寄存器最右位（least significant bit）。</span>\n\n\x3c!-- target: TPL_modbus_formula_tip --\x3e\n<span data-ui-type="Tip"\n    data-ui-arrow="true">可以自定义一个公式来计算最终希望得到的数据，公式中用X代表原始二进制数据解析后的值，并可以引用RH和RL。<a href="https://cloud.baidu.com/doc/Parser/GUIGettingStarted.html#.E8.A7.A3.E6.9E.90.E9.A1.B9.E7.9B.AE" target="_blank">查看帮助</a></span>\n\n\x3c!-- target: TPL_modbus_upload_tip --\x3e\n<span data-ui-type="Tip" data-ui-arrow="true" data-ui-id="uploaderTip">\n    标准样例<br></br>\n    <img src="/iot/src/img/hint.png" style="width: 600px; height: auto;"></span>\n\n\x3c!-- target: TPL_iot_policy_fragment --\x3e\n<i class="iconfont icon-minus" action-type="delete-topic"></i>\n<div class="form-row">\n    <label><i>＊</i>主题：</label>\n    <div class="form-value">\n        <div data-ui-type="TextBox"\n            data-ui-name="topic${index}"\n            data-ui-id="topic${index}"></div>\n        \x3c!-- import: TPL_iot_topic_tip --\x3e\n    </div>\n</div>\n<div class="form-row operations-form-row">\n    <label><i>＊</i>权限：</label>\n    <div class="form-value">\n        <div data-ui-type="BoxGroup"\n            data-ui-name="operations${index}"\n            data-ui-id="operations${index}"\n            data-ui-box-type="checkbox"></div>\n    </div>\n</div>\n\n\x3c!-- target: TPL_iot_turnkey_enter --\x3e\n<span class="ui-turnkey">\n    <button data-ui-id="turnkey"\n            data-ui-type="Button">物联网快速应用通道</button>\n</span>\n'
}),
define("iot/config", ["exports", "module", "underscore", "babel-runtime/helpers/interop-require-default", "er/controller", "common/config", "common/constants"],
function(exports, module, e, t, i, a, n) {
    var r = t["default"](e),
    o = t["default"](i),
    s = t["default"](a),
    l = t["default"](n);
    o["default"].registerAction([]);
    var d = s["default"].getConfig();
    r["default"].extend(d.api, {
        iotEndpointList: "/api/iot/endpoint/list",
        iotEndpointCreate: "/api/iot/endpoint/create",
        iotEndpointDelete: "/api/iot/endpoint/delete",
        iotEndpointDetail: "/api/iot/endpoint/detail",
        updateEndpointDesp: "/api/iot/endpoint/update",
        iotThingList: "/api/iot/thing/list",
        iotThingCreate: "/api/iot/thing/create",
        iotThingCreateV2: "/api/iot/thing/create_v2",
        iotThingDelete: "/api/iot/thing/delete",
        iotThingDetail: "/api/iot/thing/detail",
        iotThingEdit: "/api/iot/thing/edit",
        iotThingEditV2: "/api/iot/thing/edit_v2",
        updateThingDesp: "/api/iot/thing/update",
        iotPrincipalList: "/api/iot/principal/list",
        iotPrincipalCreate: "/api/iot/principal/create",
        iotPrincipalCreateV2: "/api/iot/principal/create_v2",
        iotPrincipalDelete: "/api/iot/principal/delete",
        iotPrincipalDetail: "/api/iot/principal/detail",
        iotPrincipalSearch: "/api/iot/principal/search",
        iotPrincipalEdit: "/api/iot/principal/edit",
        iotPrincipalEditV2: "/api/iot/principal/edit_v2",
        iotPrincipalGetPassword: "/api/iot/principal/get_password",
        iotPolicyList: "/api/iot/policy/list",
        iotPolicySearch: "/api/iot/policy/search",
        iotPolicyCreate: "/api/iot/policy/create",
        iotPolicyDetail: "/api/iot/policy/detail",
        iotPolicyEdit: "/api/iot/policy/edit",
        iotPolicyDelete: "/api/iot/policy/delete",
        iotStorageCopylist: "/api/iot/storage/list",
        iotStorageCopyDelete: "/api/iot/storage/delete",
        iotStorageCreate: "/api/iot/storage/create",
        iotStorageDetail: "/api/iot/storage/detail",
        iotStorageEdit: "/api/iot/storage/edit",
        iotStorageList: "/api/iot/kafka/list",
        iotKafkaTopic: "/api/iot/kafka/kafka_topic/list",
        iotKafkaDelete: "/api/iot/kafka/delete",
        iotKafkaCreate: "/api/iot/kafka/create",
        iotKafkaEdit: "/api/iot/kafka/edit",
        iotBosCheckStatus: "/api/iot/bos/check_bos_status",
        iotBosBucketList: "/api/iot/bos/bucket/list",
        iotBosFolderList: "/api/iot/bos/object/folder",
        iotBosObjectList: "/api/iot/bos/object/list",
        iotBosCreateBucket: "/api/iot/bos/create",
        getGatewayList: "/api/iot/modbus/gateway/list",
        createGateway: "/api/iot/modbus/gateway/create",
        deleteGateway: "/api/iot/modbus/gateway/delete",
        getGatewaySublist: "/api/iot/modbus/device/list",
        createDevice: "/api/iot/modbus/device/create",
        deleteDevice: "/api/iot/modbus/device/delete",
        editDevice: "/api/iot/modbus/device/edit",
        updateDeviceState: "/api/iot/modbus/device/update_state",
        resetPassword: "/api/iot/modbus/gateway/regenerate_password",
        updateGatewayState: "/api/iot/modbus/gateway/update_state",
        getParseProjectList: "/api/iot/modbus/parseproject/list",
        updateParseproject: "/api/iot/modbus/parseproject/update",
        editParseproject: "/api/iot/modbus/parseproject/edit",
        deleteParseProject: "/api/iot/modbus/parseproject/delete",
        createParseproject: "/api/iot/modbus/parseproject/create",
        verifyData: "/api/iot/modbus/parsedata",
        getTrantableList: "/api/iot/modbus/trantable/list",
        getSlaveList: "/api/iot/modbus/slavepolicy/list",
        deleteSlave: "/api/iot/modbus/slavepolicy/delete",
        deleteTrantable: "/api/iot/modbus/trantable/delete",
        updateTrantable: "/api/iot/modbus/trantable/update",
        createTrantable: "/api/iot/modbus/trantable/create",
        editTrantable: "/api/iot/modbus/trantable/edit",
        createSlavePolicy: "/api/iot/modbus/slavepolicy/create",
        getIotInfor: "/api/iot/modbus/slavepolicy/iotinfor",
        activateDeploy: "/api/iot/modbus/deploy_modbus",
        activateDeploySingle: "/api/iot/modbus/deploy_modbus_single",
        createCustomProperty: "/api/iot/modbus/custom-property/create",
        getCustomPropertyList: "/api/iot/modbus/custom-property/list",
        deleteCustomProperty: "/api/iot/modbus/custom-property/delete",
        modbusLandingPage: "/api/iot/modbus/landingpage",
        getPrice: "/api/iot/order/price",
        getUpgradePrice: "/api/iot/order/upgrade_price",
        createOrder: "/api/iot/order/confirm",
        getPackageDetail: "/api/iot/order/iotresource/detail",
        getUnicomDetail: "/api/iot/order/iotresource/detail_unicom",
        getOverdueStatus: "/api/iot/validate/finance/check",
        getUnicomTester: "/api/iot/order/unicom/tester_quota",
        getDashboardSummary: "/api/iot/v2/dashboard/summary",
        getDashboardHistory: "/api/iot/v2/dashboard/historical-usage",
        getEndpointSummary: "/api/iot/v2/dashboard/endpoint/summary",
        getEndpointHistory: "/api/iot/v2/dashboard/endpoint/historical-usage",
        confirmTurnkey: "/api/iot/turnkey/project/confirm",
        createTurnkey: "/api/iot/turnkey/project/create",
        detailTurnkey: "/api/iot/turnkey/project/detail",
        listTurnkey: "/api/iot/turnkey/project/list",
        permissionTurnkey: "/api/iot/turnkey/project/permission",
        checkNameTurnkey: "/api/iot/turnkey/project/name/check",
        subPermission: "/api/iot/endpoint/permission",
        getRealNameStatus: "/api/iot/real-name/status"
    }),
    r["default"].extend(d, {
        index: "/iot/endpoint/list",
        pageSize: 10,
        region: r["default"].map(r["default"].pick(l["default"].REGION, ["gz", "bj"]),
        function(e, t) {
            return {
                name: e,
                value: t
            }
        }),
        nameRegExp: /^(?!-)(?!.*?-$)(?!.*?-{2,}.*?)(?!(?:test|bce|iot|bridge|default)$)[a-zA-Z0-9-_]{3,32}$/,
        topicRegExp: /^[a-zA-Z0-9_\-+=%~`!@#$\^\&\*:'",.;:<>\/\?\(\)\[\]\{\}\\\|]{1,255}$/,
        serviceType: "IOT",
        maxMessagesNum: 1e3
    }),
    module.exports = d
}),
define("iot/endpoint/AllStats", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "moment", "./AllStatsModel", "./AllStatsView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("REFRESH_CHART", this.refreshChart, this),
            this.view.on("UPGRADE", this.upgrade, this),
            this.view.on("REBUY", this.rebuy, this),
            this.refreshChart()
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgrade")
        },
        n.prototype.rebuy = function() {
            this.redirect("/iot/order/create")
        },
        n.prototype.refreshChart = function() {
            var e = this,
            t = this.view.get("rangeCalendar").getValue().split(/,/);
            if ((c["default"](t[1]).valueOf() - c["default"](t[0]).valueOf()) / 1e3 > 31536e3) this.view.waitAlert({
                title: "提示",
                content: "时间范围最大为一年，请重新选择",
                width: 420
            });
            else {
                var i = (new Date).valueOf();
                if (c["default"](t[1]).valueOf() > i) this.view.waitAlert({
                    title: "提示",
                    content: "所选时间超过当前时间，请重新选择",
                    width: 420
                });
                else {
                    var a = {
                        start: u["default"].timeToUtc(t[0]),
                        end: u["default"].timeToUtc(t[1]),
                        pace: this.view.get("cycleUnit").getValue(),
                        type: "COMMON"
                    };
                    this.model.getDashboardHistory(a).then(function(t) {
                        return e.view.renderNewLineChart(t)
                    }).fail(function() {
                        return e.view.showToast("获取新增图表失败！", {
                            messageType: "error"
                        })
                    })
                }
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/endpoint/allStats.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_allStats --\x3e\n<div class="iot-all-stats iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">物接入-实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">用量统计</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>本月概览</h2>\n            <div class="main-content">\n                <div class="detail-parts-table">\n                    <dl class="detail-part-1-col basic-info" id="config-wrap">\n                        <dt>\n                            <h4>基本信息</h4>\n                        </dt>\n                        <div data-ui-type="EChart" data-ui-chart-type="pie" data-ui-id="summaryPie"\n                             id="summaryPie" class="summary-pie"></div>\n                        <dd class="stats">\n                            <div class="detail-row">\n                                <label>实例数：</label>\n                                <span>${summary.endpointCount} 个</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月账期：</label>\n                                <span>${summary.billMonthStart} 至 ${summary.billMonthEnd}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月额度：</label>\n                                <span>${summary.quotaNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                \x3c!-- if: ${summary.quota} >= 1000 --\x3e\n                                 <span class="disabled">\n                                    <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">您已是最高额度，若想继续升配，请提工单 </span>\n                                    <esui-button class="upgrade-button ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled gray" data-ui-id="upgradeConfig" data-ui-disabled="disabled">配置升级</esui-button>\n                                </span>\n                                \x3c!-- elif: ${summary.status} !== \'EXPIRED\' && ${overdueStatus.pass} --\x3e\n                                <esui-button class="upgrade-button"\n                                    data-ui-id="upgradeConfig">配置升级</esui-button>\n                                \x3c!-- elif: ${summary.status} !== \'EXPIRED\' && !${overdueStatus.pass} --\x3e\n                                <span class="disabled">\n                                    <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买</span>\n                                    <esui-button class="upgrade-button ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled gray" data-ui-id="upgradeConfig" data-ui-disabled="disabled">配置升级</esui-button>\n                                </span>\n                                \x3c!-- /if --\x3e\n                            </div>\n                        </dd>\n                        <dd class="stats">\n                            <div class="detail-row">\n                                <label>已用：</label>\n                                <span>${summary.usedNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>剩余：</label>\n                                <span>${summary.remainNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>剩余日均：</label>\n                                <span>${summary.remainPerDayNum} 条</span>\n                            </div>\n                        </dd>\n                    </dl>\n                    <dl class="detail-part-1-col" id="config-wrap">\n                        <dt>\n                            <h4>累计信息</h4>\n                        </dt>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="accStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                    <dl class="detail-part-1-col" id="new-wrap">\n                        <dt>\n                            <h4>新增信息</h4>\n                        </dt>\n                        <div class="option">\n                            <span>时间选择：</span>\n                            <input data-ui-type="RangeCalendar" name="rangeCalendar"\n                               data-ui-id="rangeCalendar" class="range-calendar"\n                               data-ui-time="true"/>\n                        </div>\n                        <div class="option">\n                            <span>采样周期：</span>\n                            <esui-select class="cycle-unit"\n                                data-ui-id="cycleUnit" data-ui-name="cycleUnit"\n                                data-ui-width="80"\n                                data-ui-datasource="@cycleList"></esui-select>\n                        </div>\n                        <esui-button class="refresh-chart" data-ui-skin="refresh"\n                                data-ui-id="refreshChart"></esui-button>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="newStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/AllStatsModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getDashboardHistory = function(e) {
            return o.api.getDashboardHistory(e)
        },
        n.prototype.outputdollars = function(e) {
            if ((e = e.toString()).length <= 3) return "" === e ? "0": e;
            var t = e.length % 3,
            i = 0 === t ? "": e.substring(0, t),
            a = 0;
            for (a = 0; a < Math.floor(e.length / 3); a++) i += 0 === t && 0 === a ? e.substring(t + 3 * a, t + 3 * a + 3) : "," + e.substring(t + 3 * a, t + 3 * a + 3);
            return i
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    summary: function(e) {
                        return o.api.getDashboardSummary({
                            type: "COMMON"
                        }).then(function(t) {
                            return t.billMonthEnd = l["default"].toTime(t.billMonthEnd),
                            t.billMonthStart = l["default"].toTime(t.billMonthStart),
                            t.quotaNum = e.outputdollars(t.quota),
                            t.usedNum = e.outputdollars(t.usage),
                            t.remainNum = e.outputdollars(t.remain),
                            t.remainPerDayNum = e.outputdollars(t.remainPerDay),
                            t.quota = t.quota / 1e6,
                            t
                        })
                    },
                    cycleList: function(e) {
                        return [{
                            text: "1小时",
                            value: "hourly"
                        },
                        {
                            text: "1天",
                            value: "daily"
                        }]
                    },
                    overdueStatus: function(e) {
                        return o.api.getOverdueStatus()
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/endpoint/AllStatsView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./allStats.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "underscore", "jquery", "moment", "echarts", "echarts/chart/line", "inf-ria/utils/mtools"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](c),
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "cycleUnit:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "rangeCalendar:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "refreshChart:click": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "upgradeConfig:click": function(t) {
                    return e.fire("UPGRADE", t)
                },
                "reBuy:click": function(t) {
                    return e.fire("REBUY", t)
                }
            }
        },
        n.prototype.renderPieChart = function(e) {
            var t = {
                animation: !1,
                color: ["#CFE8FC", "#108cee"],
                series: [{
                    type: "pie",
                    center: ["50%", "50%"],
                    radius: ["71%", "100%"],
                    itemStyle: {
                        emphasis: {
                            label: {
                                formatter: "{b}\n{d}%"
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: !1,
                            position: "center"
                        },
                        emphasis: {
                            show: !0,
                            textStyle: {
                                fontSize: "13",
                                fontWeight: "bold"
                            },
                            formatter: "{b}\n{d}%",
                            label: {
                                formatter: "{b}\n{d}%"
                            }
                        }
                    },
                    data: [{
                        name: "REMAIN",
                        value: e.remain
                    },
                    {
                        name: "USED",
                        value: e.usage
                    }]
                }]
            },
            i = this.get("summaryPie");
            i.setOption(t),
            m["default"](window).on("resize.echarts", i.echartsInstance.resize)
        },
        n.prototype.renderAccLineChart = function(e) {
            var t = {
                name: "ACC-CHART",
                unit: "",
                metrics: []
            },
            i = v["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            f["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = v["default"].getChartOptions(i, t, null, {});
            b["default"].init(document.getElementById("accStats")).setOption(a, !0)
        },
        n.prototype.renderNewLineChart = function(e) {
            var t = {
                name: "NEW-CHART",
                unit: "",
                metrics: []
            },
            i = v["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            f["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = v["default"].getChartOptions(i, t, null, {});
            b["default"].init(document.getElementById("newStats")).setOption(a, !0)
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.renderPieChart(this.model.get("summary")),
            this.renderAccLineChart(this.model.get("summary"))
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_allStats"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    rangeCalendar: {
                        rawValue: {
                            begin: h["default"]().subtract(12, "h").toDate(),
                            end: new Date
                        },
                        range: {
                            begin: h["default"]().subtract(1, "y").toDate(),
                            end: new Date
                        }
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = g
}),
define("iot/endpoint/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default", "common/component/action_category"],
function(exports, module, e, t, i) {
    var a = t["default"](e),
    n = t["default"](i),
    r = [{
        type: "iot/endpoint/List",
        path: "/iot/endpoint/initlist",
        category: n["default"].LIST
    },
    {
        type: "iot/endpoint/List2",
        path: "/iot/endpoint/list",
        category: n["default"].LIST
    },
    {
        type: "iot/endpoint/dialog/Create",
        path: "/iot/endpoint/create"
    },
    {
        type: "iot/endpoint/Detail",
        path: "/iot/endpoint/package"
    },
    {
        type: "iot/endpoint/UnicomDetail",
        path: "/iot/endpoint/unicomPackage"
    },
    {
        type: "iot/endpoint/AllStats",
        path: "/iot/endpoint/allStats"
    },
    {
        type: "iot/endpoint/UnicomStats",
        path: "/iot/endpoint/unicomStats"
    },
    {
        type: "iot/endpoint/EndpointStats",
        path: "/iot/endpoint/stats"
    },
    {
        type: "iot/endpoint/UnicomEndpointStats",
        path: "/iot/endpoint/uStats"
    }];
    a["default"].registerAction(r),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何实例</br>", "点击左上角按钮立即创建", "</p></div>"].join(""),
        noDataHtmlsubuser: ["<div><p>没有任何实例</br>", "请联系管理员授权", "</p></div>"].join(""),
        tpl: {
            command: '<span class="operations"><button data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></button></span>',
            cmdWithTip: '<span class="operations <%- disabled %>"><span data-ui-type="Tip" data-ui-id="<%- tipId %>" data-ui-layer-width="auto" class="<%- tipClassName %>"><%- tipText %></span><button data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></button></span>'
        },
        status: {
            RUNNING: {
                text: "正常",
                css: "green"
            },
            EXPIRED: {
                text: "已过期",
                css: "red"
            },
            STOPPED: {
                text: "本月配额已用完",
                css: "red"
            },
            CREATING: {
                text: "创建中",
                css: "green"
            }
        }
    }
}),
define("iot/endpoint/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "inf-ria/helper", "./DetailModel", "./DetailView", "../config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("UPGRADE", this.upgrade, this),
            this.view.on("REBUY", this.rebuy, this),
            this.view.on("RENEW", this.renew, this)
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgrade")
        },
        n.prototype.rebuy = function() {
            this.redirect("/iot/order/create")
        },
        n.prototype.renew = function() {
            var e = this.model.get("basicInfo"),
            t = e.resourceId,
            i = e.region;
            u["default"].redirectToModule("billing", "/billing/recharge/list", {
                serviceType: l.serviceType,
                instanceIds: t,
                region: i
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return c["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = f
}),
define("iot/endpoint/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_detail --\x3e\n<div class="iot-package-detail iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">物接入-实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">计费套餐详情</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>计费套餐详情</h2>\n            <div class="main-content">\n                <div class="detail-parts-table">\n                    <div class="row-12">\n                        <div class="col-6">\n                            <dl class="detail-part-1-col with-desc-editor">\n                                <dt>\n                                    <h4>基本信息</h4>\n                                </dt>\n                                <dd class="col-2">\n                                    <div class="detail-row">\n                                        <label>区域：</label>\n                                        <span>${basicInfo.locationTxt}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>状态：</label>\n                                        <span class="status status-${basicInfo.state.css}"> ${basicInfo.state.text}</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                        </div>\n                        <div class="col-6">\n                            <dl class="detail-part-1-col">\n                                <dt>\n                                    <h4>支付信息</h4>\n                                </dt>\n                                <dd>\n                                    <div class="detail-row">\n                                        <label>支付方式：</label>\n                                        <span>${basicInfo.payType}\n                                        </span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>创建时间：</label>\n                                        <span>${basicInfo.createTime}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>到期时间：</label>\n                                        <span>${basicInfo.expireTime}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        \x3c!-- if: ${overdueStatus.pass} && ${basicInfo.recharge} --\x3e\n                                        <esui-button data-ui-id="renewButton" data-ui-type="Button">续费</esui-button>\n                                        \x3c!-- else --\x3e\n                                        <span class="disabled">\n                                            <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                                \x3c!-- if: !${overdueStatus.pass} --\x3e\n                                                    您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                                \x3c!-- else --\x3e\n                                                    账期已经大于一年，不符合续费条件\n                                                \x3c!-- /if --\x3e\n                                            </span>\n                                            <esui-button class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-type="Button" data-ui-disabled="disabled">续费</esui-button>\n                                        </span>\n                                        \x3c!-- /if --\x3e\n                                    </div>\n                                </dd>\n                            </dl>\n                        </div>\n                    </div>\n\n                    <dl class="detail-part-1-col" id="config-wrap">\n                        <dt>\n                            <h4>配置信息</h4>\n                        </dt>\n                        <dd class="col-2">\n                            <div class="detail-row">\n                                <label>购买规格：</label>\n                                <span>${basicInfo.messagesNum} 百万条/月</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>购买时长：</label>\n                                <span>${basicInfo.purchaseMonths} 个月</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月账期：</label>\n                                <span>${basicInfo.beginningAccount} 至 ${basicInfo.endAccount}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月账期内剩余：</label>\n                                <span>${basicInfo.remainderNum} 条</span>\n                            </div>\n                            \x3c!-- if: ${basicInfo.status} !== \'EXPIRED\' && ${overdueStatus.pass} && ${basicInfo.messagesNum} < 1000 --\x3e\n                            <esui-button data-ui-id="upgradeConfig">配置升级</esui-button>\n                            \x3c!-- else --\x3e\n                            <span class="disabled">\n                                <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                    \x3c!-- if: ${basicInfo.status} === \'EXPIRED\' --\x3e\n                                        资源已过期\n                                    \x3c!-- elif: ${basicInfo.messagesNum} >= 1000 --\x3e\n                                        您已是最高额度，若想继续升配，请提工单\n                                    \x3c!-- else --\x3e\n                                        您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                    \x3c!-- /if --\x3e\n                                </span>\n                                <esui-button data-ui-id="upgradeConfig" class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-disabled="disabled">配置升级</esui-button>\n                            </span>\n                            \x3c!-- /if --\x3e\n                        </dd>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "./config", "../config", "../enum"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.outputdollars = function(e) {
            if ((e = e.toString()).length <= 3) return "" === e ? "0": e;
            var t = e.length % 3,
            i = 0 === t ? "": e.substring(0, t),
            a = 0;
            for (a = 0; a < Math.floor(e.length / 3); a++) i += 0 === t && 0 === a ? e.substring(t + 3 * a, t + 3 * a + 3) : "," + e.substring(t + 3 * a, t + 3 * a + 3);
            return i
        },
        n.prototype.prepare = function() {
            var e = this.get("basicInfo"),
            t = c["default"].find(l.region, {
                value: e.region
            });
            c["default"].extend(e, {
                localTime: p["default"].toTime(e.createTime),
                locationTxt: t ? t.name: "",
                hostNameList: c["default"].map(e.hostname,
                function(e) {
                    return "<p>" + e + "</p>"
                }).join(""),
                configureTxt: d.ENDPOINT_CONFIG.getTextFromValue(e.configure)
            }),
            this.set("basicInfo", e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return l.api.getPackageDetail().then(function(t) {
                            return t.state = {
                                css: f["default"].status[t.status].css,
                                text: f["default"].status[t.status].text
                            },
                            t.payType = "prepay" === t.productType ? "预付费": "后付费",
                            t.remainderNum = t.remainderNum,
                            t.beginningAccount = p["default"].toTime(t.beginningAccount),
                            t.endAccount = p["default"].toTime(t.endAccount),
                            t.createTime = p["default"].toTime(t.createTime),
                            t.expireTime = p["default"].toTime(t.expireTime),
                            t.remainderNum = e.outputdollars(t.remainderNum),
                            t
                        })
                    },
                    overdueStatus: function(e) {
                        return l.api.getOverdueStatus()
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/endpoint/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "upgradeConfig:click": function(t) {
                    return e.fire("UPGRADE", t)
                },
                "reBuy:click": function(t) {
                    return e.fire("REBUY", t)
                },
                "renewButton:click": function(t) {
                    return e.fire("RENEW", t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_detail"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/endpoint/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "underscore", "../../events", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(c["default"].INPUT, this.syncWithName, this)
        },
        n.prototype.syncWithName = function(e) {
            var t = this.view.get("endpointName"),
            i = this.view.getGroup("endpointName"),
            a = t.getValue();
            u["default"].each(i,
            function(e) {
                return e.setText(a ? a + ".": "")
            })
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("实例创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "实例创建成功！"
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/endpoint/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_endpoint --\x3e\n<div class="iot-dialog-form iot-endpoint-create order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>名称：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="endpointName"\n                        data-ui-id="endpointName"></div>\n                    \x3c!-- import: TPL_iot_name_tip --\x3e\n                </div>\n            </div>\n            <div class="form-row">\n                <label>区域：</label>\n                <div class="form-value">\n                    <div data-ui-type="RadioSelect"\n                        data-ui-id="location"\n                        class="ui-radioselect-custom"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label>地址：</label>\n                <div class="form-value">\n                    <div class="default-txt">\n                        <p>\n                            tcp://<span data-ui-type="Label"\n                                data-ui-group="endpointName"></span>mqtt.iot.${region}.baidubce.com:1883\n                        </p>\n                        <p>\n                            ssl://<span data-ui-type="Label"\n                                data-ui-group="endpointName"></span>mqtt.iot.${region}.baidubce.com:1884\n                        </p>\n                        <p>\n                            wss://<span data-ui-type="Label"\n                                data-ui-group="endpointName"></span>mqtt.iot.${region}.baidubce.com:8884\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_endpoint_child --\x3e\n\x3c!-- import: TPL_iot_create_endpoint --\x3e\n'
}),
define("iot/endpoint/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/region", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotEndpointCreate
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    location: function(e) {
                        var t = l["default"].getCurrentRegion();
                        return [{
                            name: t.label,
                            value: t.id
                        }]
                    },
                    region: function(e) {
                        var t = l["default"].getCurrentRegion();
                        return t.id
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/endpoint/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../events", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "endpointName:input": function(t) {
                    return e.fire(d["default"].INPUT, t)
                }
            }
        },
        n.prototype.getExtraFormData = function() {
            return {
                location: this.get("location").getValue(),
                configure: "free"
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_endpoint"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    endpointName: {
                        title: "名称",
                        width: 200,
                        placeholder: "请填写名称，长度3-32",
                        required: "required",
                        pattern: s.nameRegExp
                    },
                    location: {
                        datasource: "@location"
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/endpoint/EndpointStats", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "moment", "./EndpointStatsModel", "./EndpointStatsView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("REFRESH_CHART", this.refreshChart, this),
            this.view.on("UPGRADE", this.upgrade, this),
            this.refreshChart()
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgrade")
        },
        n.prototype.refreshChart = function() {
            var e = this,
            t = this.view.get("rangeCalendar").getValue().split(/,/);
            if ((c["default"](t[1]).valueOf() - c["default"](t[0]).valueOf()) / 1e3 > 31536e3) this.view.waitAlert({
                title: "提示",
                content: "时间范围最大为一年，请重新选择",
                width: 420
            });
            else {
                var i = (new Date).valueOf();
                if (c["default"](t[1]).valueOf() > i) this.view.waitAlert({
                    title: "提示",
                    content: "所选时间超过当前时间，请重新选择",
                    width: 420
                });
                else {
                    var a = {
                        endpointUuid: this.model.get("uuid"),
                        endpointName: this.model.get("name"),
                        start: u["default"].timeToUtc(t[0]),
                        end: u["default"].timeToUtc(t[1]),
                        pace: this.view.get("cycleUnit").getValue(),
                        type: "COMMON"
                    };
                    this.model.getEndpointHistory(a).then(function(t) {
                        return e.view.renderNewLineChart(t)
                    }).fail(function() {
                        return e.view.showToast("获取新增图表失败！", {
                            messageType: "error"
                        })
                    })
                }
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/endpoint/endpointStats.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_stats --\x3e\n<div class="iot-endpoint-stats iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">物接入-实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">用量统计</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>实例 ${name}<span>本实例由${summary.from}创建</span></h2>\n            <div class="main-content">\n                <div class="detail-parts-table">\n                    <dl class="detail-part-1-col basic-info" id="config-wrap">\n                        <dt>\n                            <h4>基本信息</h4>\n                        </dt>\n                        <dd class="stats">\n                            <div class="detail-row">\n                                <label>本月账期：</label>\n                                <span>${summary.billMonthStart} 至 ${summary.billMonthEnd}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>已用：</label>\n                                <span>${summary.usedNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>当前连接数：</label>\n                                <span>${summary.connectedNum}个 （当前/最大连接数：${summary.connectedNum}/${summary.connectedLimitNum}）</span>\n                            </div>\n                        </dd>\n                    </dl>\n                    <dl class="detail-part-1-col" id="config-wrap">\n                        <dt>\n                            <h4>累计信息</h4>\n                        </dt>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="accStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                    <dl class="detail-part-1-col" id="new-wrap">\n                        <dt>\n                            <h4>新增信息</h4>\n                        </dt>\n                        <div class="option">\n                            <span>时间选择：</span>\n                            <input data-ui-type="RangeCalendar" name="rangeCalendar"\n                               data-ui-id="rangeCalendar" class="range-calendar"\n                               data-ui-time="true"/>\n                        </div>\n                        <div class="option">\n                            <span>采样周期：</span>\n                            <esui-select class="cycle-unit"\n                                data-ui-id="cycleUnit" data-ui-name="cycleUnit"\n                                data-ui-width="80"\n                                data-ui-datasource="@cycleList"></esui-select>\n                        </div>\n                        <esui-button class="refresh-chart" data-ui-skin="refresh"\n                                data-ui-id="refreshChart"></esui-button>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="newStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/EndpointStatsModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getEndpointHistory = function(e) {
            return o.api.getEndpointHistory(e)
        },
        n.prototype.outputdollars = function(e) {
            if ((e = e.toString()).length <= 3) return "" === e ? "0": e;
            var t = e.length % 3,
            i = 0 === t ? "": e.substring(0, t),
            a = 0;
            for (a = 0; a < Math.floor(e.length / 3); a++) i += 0 === t && 0 === a ? e.substring(t + 3 * a, t + 3 * a + 3) : "," + e.substring(t + 3 * a, t + 3 * a + 3);
            return i
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    summary: function(e) {
                        return o.api.getEndpointSummary({
                            endpointUuid: e.get("uuid"),
                            endpointName: e.get("name"),
                            type: "COMMON"
                        }).then(function(t) {
                            return t.billMonthEnd = l["default"].toTime(t.billMonthEnd),
                            t.billMonthStart = l["default"].toTime(t.billMonthStart),
                            t.usedNum = e.outputdollars(t.usage),
                            t.connectedNum = e.outputdollars(t.connectedClients),
                            t.connectedLimitNum = e.outputdollars(t.connectedClientLimit),
                            "DM" === e.get("from") ? t.from = "物管理": "USER" === e.get("from") ? t.from = "物接入": "PARSER" === e.get("from") && (t.from = "物解析"),
                            t
                        })
                    },
                    cycleList: function(e) {
                        return [{
                            text: "1小时",
                            value: "hourly"
                        },
                        {
                            text: "1天",
                            value: "daily"
                        }]
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/endpoint/EndpointStatsView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./endpointStats.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "underscore", "moment", "echarts", "echarts/chart/line", "inf-ria/utils/mtools"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](u),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "cycleUnit:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "rangeCalendar:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "refreshChart:click": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "upgradeConfig:click": function(t) {
                    return e.fire("UPGRADE", t)
                }
            }
        },
        n.prototype.renderAccLineChart = function(e) {
            var t = {
                name: "ACC-CHART",
                unit: "",
                metrics: []
            },
            i = h["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            p["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = h["default"].getChartOptions(i, t, null, {});
            m["default"].init(document.getElementById("accStats")).setOption(a, !0)
        },
        n.prototype.renderNewLineChart = function(e) {
            var t = {
                name: "NEW-CHART",
                unit: "",
                metrics: []
            },
            i = h["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            p["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = h["default"].getChartOptions(i, t, null, {});
            m["default"].init(document.getElementById("newStats")).setOption(a, !0)
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.renderAccLineChart(this.model.get("summary"))
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_stats"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    rangeCalendar: {
                        rawValue: {
                            begin: f["default"]().subtract(12, "h").toDate(),
                            end: new Date
                        },
                        range: {
                            begin: f["default"]().subtract(1, "y").toDate(),
                            end: new Date
                        }
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = b
}),
define("iot/endpoint/List", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./ListModel", "./ListView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].REFRESH, this.reload, this),
            this.view.on(u["default"].CREATE, this.create, this),
            this.view.on(u["default"].RELEASE, this.release, this),
            this.view.on(u["default"].VIEW_PACKAGE, this.viewPackage, this),
            this.view.on(u["default"].VIEW_STATS, this.viewStats, this),
            this.view.on(u["default"].VIEW_ENDPOINT_STATS, this.viewEndpointStats, this),
            this.view.on(u["default"].EDIT_TABLE_CELL, this.editTableCell, this),
            this.view.on(u["default"].START_TURNKEY, c["default"].startTurnkey, this)
        },
        n.prototype.editTableCell = function(e) {
            var t = this;
            if (this.model.get("mainUser")) {
                var i = this.view.get("table").datasource[e.rowIndex];
                if (e.value !== i.description) {
                    var a = {
                        endpointName: i.endpointName,
                        description: e.value
                    };
                    this.model.updateDescription(a).then(function() {
                        return t.view.showToast("修改实例描述成功！")
                    }).then(function() {
                        t.view.get("table").setCellText(e.value, e.rowIndex, e.columnIndex),
                        i.description = e.value
                    }).fail(function() {
                        return t.view.showToast("修改实例描述失败！")
                    })
                }
            } else this.view.showToast("没有权限修改！", {
                messageType: "error"
            })
        },
        n.prototype.viewPackage = function() {
            this.redirect("/iot/endpoint/package")
        },
        n.prototype.viewEndpointStats = function(e) {
            this.redirect("/iot/endpoint/stats~" + e.args)
        },
        n.prototype.viewStats = function() {
            this.redirect("/iot/endpoint/allStats")
        },
        n.prototype.create = function() {
            "PASS" === this.model.get("realName").status ? c["default"].createEndpoint.call(this, {
                parentAction: this
            }) : this.view.waitAlert({
                title: "提示",
                content: '为保证安全，创建新实例需实名认证，已经创建的实例仍可以正常使用不受影响。<a href="/qualify/#/qualify/index" target="_blank">立即去认证</a>',
                width: 580,
                encode: !1
            })
        },
        n.prototype.release = function(e) {
            c["default"].confirmHandler({
                title: "删除实例",
                content: "确认删除该实例?",
                width: 300
            },
            "endpoint.release", this.view, {
                endpointName: e.args
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/endpoint/list.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_list --\x3e\n<div class="iot-main-wrap endpoint-list main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物接入-实例列表</span>\n        </p>\n        <div class="list-content">\n            <h2>实例列表\n                \x3c!-- if: ${mainUser}--\x3e\n                <div class="button-sets">\n                    <esui-button class="button"\n                        data-ui-id="viewPackage">计费套餐详情</esui-button>\n                    <esui-button class="button"\n                        data-ui-id="viewStats">查看用量详情</esui-button>\n                </div>\n                \x3c!-- /if --\x3e\n                <span class="status status-${basicInfo.css}" style="\x3c!-- if: !${mainUser}--\x3eleft:100px\x3c!-- /if --\x3e">${basicInfo.text}</span>\n                \x3c!-- if: ${mainUser} && ${realName.status} === \'PASS\'--\x3e\n                \x3c!-- import: TPL_iot_turnkey_enter --\x3e\n                \x3c!-- /if --\x3e\n            </h2>\n            <div class="table-full-wrap">\n                \x3c!-- if: ${mainUser}--\x3e\n                <div class="operation-wrap">\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建实例">创建实例</button>\n                    <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="ssl-tip">最多可创建100个实例，可<a href="http://ticket.bce.baidu.com/#/ticket/create ">提交工单</a>申请更多额度</span>\n                </div>\n                \x3c!-- /if --\x3e\n                <div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx">\n                </div>\n                <div class="ui-row">\n                    \x3c!-- import: listPager --\x3e\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/List2", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "inf-ria/helper", "../events", "../operations", "../config", "./List2Model", "./List2View"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](d),
    b = n["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(f["default"].REFRESH, this.reload, this),
            this.view.on(f["default"].CREATE, this.create, this),
            this.view.on(f["default"].RELEASE, this.release, this),
            this.view.on(f["default"].VIEW_PACKAGE, this.viewPackage, this),
            this.view.on(f["default"].VIEW_STATS, this.viewStats, this),
            this.view.on(f["default"].VIEW_UNICOM_PACKAGE, this.viewUnicomPackage, this),
            this.view.on(f["default"].VIEW_UNICOM_STATS, this.viewUnicomStats, this),
            this.view.on(f["default"].VIEW_ENDPOINT_STATS, this.viewEndpointStats, this),
            this.view.on(f["default"].EDIT_TABLE_CELL, this.editTableCell, this),
            this.view.on(f["default"].START_TURNKEY, m["default"].startTurnkey, this),
            this.view.on(f["default"].UPGRADE_CONFIG, this.upgrade, this),
            this.view.on(f["default"].UPGRADE_UNICOM_CONFIG, this.upgradeUnicom, this),
            this.view.on(f["default"].RENEW, this.renew, this),
            this.view.on(f["default"].RENEW_UNICOM, this.renewUnicom, this),
            this.view.on(f["default"].CREATE_HUB, this.createHub, this),
            this.view.on(f["default"].CREATE_UNICOM, this.createUnicom, this)
        },
        n.prototype.createHub = function() {
            this.redirect("/iot/order/create~hub")
        },
        n.prototype.createUnicom = function() {
            this.redirect("/iot/order/create~unicom")
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgrade")
        },
        n.prototype.upgradeUnicom = function() {
            this.redirect("/iot/order/upgradeUnicom")
        },
        n.prototype.renew = function() {
            var e = this.model.get("basicInfo"),
            t = e.resourceId,
            i = e.region;
            this.redirectToBilling(t, i)
        },
        n.prototype.renewUnicom = function() {
            var e = this.model.get("unicomInfo"),
            t = e.resourceId,
            i = e.region;
            this.redirectToBilling(t, i)
        },
        n.prototype.redirectToBilling = function(e, t) {
            p["default"].redirectToModule("billing", "/billing/recharge/list", {
                serviceType: l.serviceType,
                instanceIds: e,
                region: t
            })
        },
        n.prototype.editTableCell = function(e) {
            var t = this;
            if (this.model.get("mainUser")) {
                var i = this.view.get("table").datasource[e.rowIndex];
                if (e.value !== i.description) {
                    var a = {
                        endpointName: i.endpointName,
                        description: e.value
                    };
                    this.model.updateDescription(a).then(function() {
                        return t.view.showToast("修改实例描述成功！")
                    }).then(function() {
                        t.view.get("table").setCellText(e.value, e.rowIndex, e.columnIndex),
                        i.description = e.value
                    }).fail(function() {
                        return t.view.showToast("修改实例描述失败！")
                    })
                }
            } else this.view.showToast("没有权限修改！", {
                messageType: "error"
            })
        },
        n.prototype.viewPackage = function() {
            this.redirect("/iot/endpoint/package")
        },
        n.prototype.viewUnicomPackage = function() {
            this.redirect("/iot/endpoint/unicomPackage")
        },
        n.prototype.viewEndpointStats = function(e) {
            this.redirect("/iot/endpoint/stats~" + e.args)
        },
        n.prototype.viewStats = function() {
            this.redirect("/iot/endpoint/allStats")
        },
        n.prototype.viewUnicomStats = function() {
            this.redirect("/iot/endpoint/unicomStats")
        },
        n.prototype.create = function() {
            "PASS" === this.model.get("realName").status ? m["default"].createEndpoint.call(this, {
                parentAction: this
            }) : this.view.waitAlert({
                title: "提示",
                content: '为保证安全，创建新实例需实名认证，已经创建的实例仍可以正常使用不受影响。<a href="/qualify/#/qualify/index" target="_blank">立即去认证</a>',
                width: 580,
                encode: !1
            })
        },
        n.prototype.release = function(e) {
            m["default"].confirmHandler({
                title: "删除实例",
                content: "确认删除该实例?",
                width: 300
            },
            "endpoint.release", this.view, {
                endpointName: e.args
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return b["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return h["default"]
            }
        }]),
        n
    } (c["default"]);
    module.exports = v
}),
define("iot/endpoint/list2.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_list_v2 --\x3e\n<div class="iot-main-wrap endpoint-list-new main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物接入-实例列表</span>\n        </p>\n        <div class="list-content">\n            <h2>计费方式\n                <div class="resource-list">\n                    <div class="resource">\n                        <i class="iconfont icon-iot"></i>\n                        <div class="text">\n                            <div class="title">物接入\n                                \x3c!-- if: ${iotServiceStatus.valid}--\x3e\n                                <span class="status status-${basicInfo.css}" style="\x3c!-- if: !${mainUser}--\x3eleft:100px\x3c!-- /if --\x3e">${basicInfo.text}</span>\n                                \x3c!-- /if --\x3e\n                            </div>\n                            \x3c!-- if: ${mainUser} && ${iotServiceStatus.valid}--\x3e\n                            <div class="button-sets">\n                                <esui-button class="button"\n                                    data-ui-id="viewPackage">计费套餐详情</esui-button>\n                                <esui-button class="button"\n                                    data-ui-id="viewStats">查看用量详情</esui-button>\n                                \x3c!-- if: ${basicInfo.status} !== \'EXPIRED\' && ${overdueStatus.pass} && ${basicInfo.messagesNum} < 1000 --\x3e\n                                <esui-button data-ui-id="upgradeConfig" class="upgrade-left">配置升级</esui-button>\n                                \x3c!-- else --\x3e\n                                <span class="disabled upgrade-left">\n                                    <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                        \x3c!-- if: ${basicInfo.status} === \'EXPIRED\' --\x3e\n                                            资源已过期\n                                        \x3c!-- elif: ${basicInfo.messagesNum} >= 1000 --\x3e\n                                            您已是最高额度，若想继续升配，请提工单\n                                        \x3c!-- else --\x3e\n                                            您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                        \x3c!-- /if --\x3e\n                                    </span>\n                                    <esui-button data-ui-id="upgradeConfig" class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-disabled="disabled">配置升级</esui-button>\n                                </span>\n                                \x3c!-- /if --\x3e\n                                \x3c!-- if: ${overdueStatus.pass} && ${basicInfo.recharge} --\x3e\n                                <esui-button data-ui-id="renewButton" data-ui-type="Button">续费</esui-button>\n                                \x3c!-- else --\x3e\n                                <span class="disabled">\n                                    <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                        \x3c!-- if: !${overdueStatus.pass} --\x3e\n                                            您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                        \x3c!-- else --\x3e\n                                            账期已经大于一年，不符合续费条件\n                                        \x3c!-- /if --\x3e\n                                    </span>\n                                    <esui-button class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-type="Button" data-ui-disabled="disabled">续费</esui-button>\n                                </span>\n                                \x3c!-- /if --\x3e\n                            </div>\n                            \x3c!-- /if --\x3e\n                            \x3c!-- if: ${mainUser} && !${iotServiceStatus.valid} && ${realName.status} === \'PASS\'--\x3e\n                            <div class="notcreate">未开通</div>\n                            \x3c!-- /if --\x3e\n                        </div>\n                        \x3c!-- if: ${mainUser} && !${iotServiceStatus.valid} && ${realName.status} === \'PASS\'--\x3e\n                        <button data-ui-id="createHub"\n                                data-ui-type="Button"\n                                data-ui-skin="create"\n                                title="新建物接入"\n                                class="create-resource">新建物接入</button>\n                        \x3c!-- /if --\x3e\n                    </div>\n                    <div class="resource">\n                        <i class="iconfont icon-iotunicom"></i>\n                        <div class="text">\n                            <div class="title">物接入（SIM版）\n                                \x3c!-- if: ${iotServiceStatus.unicom}--\x3e\n                                <span class="status status-${unicomInfo.css}" style="\x3c!-- if: !${mainUser}--\x3eleft:100px\x3c!-- /if --\x3e">${unicomInfo.text}</span>\n                                \x3c!-- /if --\x3e\n                            </div>\n                            \x3c!-- if: ${mainUser} && ${iotServiceStatus.unicom}--\x3e\n                            <div class="button-sets">\n                                <esui-button class="button"\n                                    data-ui-id="viewUnicomPackage">计费套餐详情</esui-button>\n                                <esui-button class="button"\n                                    data-ui-id="viewUnicomStats">查看用量详情</esui-button>\n                                \x3c!-- if: ${unicomInfo.status} !== \'EXPIRED\' && ${unicomInfo.status} !==\'CREATING\' && ${overdueStatus.pass} --\x3e\n                                <esui-button data-ui-id="upgradeUnicomConfig" class="upgrade-left">配置升级</esui-button>\n                                \x3c!-- else --\x3e\n                                <span class="disabled upgrade-left">\n                                    <span data-ui-type="Tip" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                        \x3c!-- if: ${unicomInfo.status} === \'CREATING\' --\x3e\n                                            资源创建中\n                                        \x3c!-- elif: ${unicomInfo.status} === \'EXPIRED\' --\x3e\n                                            资源已过期\n                                        \x3c!-- else --\x3e\n                                            您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                        \x3c!-- /if --\x3e\n                                    </span>\n                                    <esui-button data-ui-id="upgradeUnicomConfig" class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-disabled="disabled">配置升级</esui-button>\n                                </span>\n                                \x3c!-- /if --\x3e\n                                \x3c!-- if: ${overdueStatus.pass} && ${unicomInfo.recharge} && !${unicomInfo.tester} && ${unicomInfo.status} !== \'CREATING\' --\x3e\n                                <esui-button data-ui-id="renewUnicomButton" data-ui-type="Button">续费</esui-button>\n                                \x3c!-- else --\x3e\n                                <span class="disabled">\n                                    <span data-ui-type="Tip" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                        \x3c!-- if: ${unicomInfo.status} === \'CREATING\' --\x3e\n                                            资源创建中\n                                        \x3c!-- elif: ${unicomInfo.tester} --\x3e\n                                            测试版不能续费，请选择配置升级\n                                        \x3c!-- elif: !${overdueStatus.pass} --\x3e\n                                            您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                        \x3c!-- else --\x3e\n                                            账期已经大于一年，不符合续费条件\n                                        \x3c!-- /if --\x3e\n                                    </span>\n                                    <esui-button class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-type="Button" data-ui-disabled="disabled">续费</esui-button>\n                                </span>\n                                \x3c!-- /if --\x3e\n                            </div>\n                            \x3c!-- /if --\x3e\n                            \x3c!-- if: ${mainUser} && !${iotServiceStatus.unicom} && ${realName.status} === \'PASS\'--\x3e\n                            <div class="notcreate">未开通</div>\n                            \x3c!-- /if --\x3e\n                        </div>\n                        \x3c!-- if: ${mainUser} && !${iotServiceStatus.unicom} && ${realName.status} === \'PASS\'--\x3e\n                        <button data-ui-id="createUnicom"\n                                data-ui-type="Button"\n                                data-ui-skin="create"\n                                title="新建物接入（SIM版）"\n                                class="create-resource">新建物接入（SIM版）</button>\n                        \x3c!-- /if --\x3e\n                    </div>\n                </div>\n            </h2>\n            <h2 class="empty-div"></h2>\n            <h2>实例列表\n                \x3c!-- if: ${mainUser} && ${realName.status} === \'PASS\'--\x3e\n                \x3c!-- import: TPL_iot_turnkey_enter --\x3e\n                \x3c!-- /if --\x3e\n            </h2>\n            <div class="table-full-wrap">\n                \x3c!-- if: ${mainUser}--\x3e\n                <div class="operation-wrap">\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建实例">创建实例</button>\n                    <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="ssl-tip">最多可创建100个实例，可<a href="http://ticket.bce.baidu.com/#/ticket/create ">提交工单</a>申请更多额度</span>\n                </div>\n                \x3c!-- /if --\x3e\n                <div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx">\n                </div>\n                <div class="ui-row">\n                    \x3c!-- import: listPager --\x3e\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/List2Model", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "common/storage", "common/config", "../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](l),
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.serviceStatus = function() {
            return c["default"].api.iotServiceStatus()
        },
        n.prototype.updateDescription = function(e) {
            return s.api.updateEndpointDesp(e)
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return s.api.iotEndpointList
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return s.api.getPackageDetail().then(function(e) {
                            return e.status && (e.css = p["default"].status[e.status].css, e.text = p["default"].status[e.status].text),
                            e
                        })
                    },
                    unicomInfo: function(e) {
                        return s.api.getUnicomDetail().then(function(e) {
                            return e.status && (e.css = p["default"].status[e.status].css, e.text = p["default"].status[e.status].text),
                            e
                        })
                    },
                    mainUser: function() {
                        return ! u["default"].get("BCE_IOT_MODBUS_SUBUSER")
                    },
                    realName: function() {
                        return s.api.getRealNameStatus()
                    },
                    iotServiceStatus: function() {
                        return c["default"].api.iotServiceStatus()
                    },
                    overdueStatus: function(e) {
                        return s.api.getOverdueStatus()
                    }
                }
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: s.pageSize
                }
            }
        }]),
        n
    } (d["default"]);
    module.exports = f
}),
define("iot/endpoint/List2View", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./list2.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/timeUtil", "common/storage", "../events", "./config", "../config", "../enum"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p) {
    var f = r["default"](n),
    m = r["default"](o),
    h = r["default"](s),
    b = r["default"](l),
    v = r["default"](d),
    g = r["default"](u),
    y = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "create:click": function(t) {
                    return e.fire(v["default"].CREATE, t)
                },
                "viewStats:click": function(t) {
                    return e.fire(v["default"].VIEW_STATS, t)
                },
                "viewPackage:click": function(t) {
                    return e.fire(v["default"].VIEW_PACKAGE, t)
                },
                "viewUnicomStats:click": function(t) {
                    return e.fire(v["default"].VIEW_UNICOM_STATS, t)
                },
                "viewUnicomPackage:click": function(t) {
                    return e.fire(v["default"].VIEW_UNICOM_PACKAGE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "table:saveedit": function(t) {
                    return e.fire(v["default"].EDIT_TABLE_CELL, t)
                },
                "turnkey:click": function(t) {
                    return e.fire(v["default"].START_TURNKEY, t)
                },
                "upgradeConfig:click": function(t) {
                    return e.fire(v["default"].UPGRADE_CONFIG, t)
                },
                "renewButton:click": function(t) {
                    return e.fire(v["default"].RENEW, t)
                },
                "upgradeUnicomConfig:click": function(t) {
                    return e.fire(v["default"].UPGRADE_UNICOM_CONFIG, t)
                },
                "renewUnicomButton:click": function(t) {
                    return e.fire(v["default"].RENEW_UNICOM, t)
                },
                "createHub:click": function(t) {
                    return e.fire(v["default"].CREATE_HUB, t)
                },
                "createUnicom:click": function(t) {
                    return e.fire(v["default"].CREATE_UNICOM, t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "实例名称",
                    minWidth: 250,
                    field: "endpointName",
                    content: function(e, t) {
                        var i = f["default"].escape(e.endpointName);
                        return '<a href="#/iot/thing/list~endpointName=' + i + '">' + i + "</a>"
                    }
                },
                {
                    title: "描述",
                    field: "description",
                    width: 100,
                    content: function(e, t) {
                        var i = f["default"].escape(e.description);
                        return '<span class="description" title="' + i + '">' + i + "</span>"
                    },
                    editable: 1
                },
                {
                    title: "地址",
                    width: 220,
                    field: "hostname",
                    content: function(e, t) {
                        return f["default"].map(e.hostname,
                        function(e) {
                            return '<p class="nowrap">' + e + "</p>"
                        }).join("")
                    }
                },
                {
                    title: "区域",
                    minWidth: 100,
                    field: "location",
                    content: function(e, t) {
                        var i = f["default"].find(c.region, {
                            value: e.location
                        });
                        return i ? i.name: ""
                    }
                },
                {
                    title: "创建时间",
                    width: 120,
                    field: "createTime",
                    content: function(e, t) {
                        return h["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 125,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = e.creatorType === p.CREATOR.USER,
            a = "";
            e.creatorType === p.CREATOR.DM && (a = "本实例由物管理创建不能删除。不使用则不会产生费用"),
            e.creatorType === p.CREATOR.PARSER && (a = "本实例由物解析创建不能删除。不使用则不会产生费用");
            var n = e.endpointName,
            r = "uuid=" + e.uuid + "&name=" + e.endpointName + "&from=" + e.creatorType,
            o = [];
            return this.model.get("mainUser") && o.push(f["default"].template(g["default"].tpl.cmdWithTip)({
                label: "删除",
                command: v["default"].RELEASE,
                tipId: "ui-tip-" + t,
                tipText: a,
                args: n,
                className: i ? "": "state-disabled",
                tipClassName: a ? "": "state-hidden",
                disabled: i ? "": "disabled"
            })),
            o.push('<button class="cmd-button"\n                    data-command="VIEW_ENDPOINT_STATS"\n                    data-command-args=\'' + r + "'>用量统计</button>"),
            '<span class="operations">' + o.join("") + "</span>"
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_list_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: !1,
                        editable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        columnRenderIndexes: [5],
                        noDataHtml: b["default"].get("BCE_IOT_MODBUS_SUBUSER") ? g["default"].noDataHtmlsubuser: g["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (m["default"]);
    module.exports = y
}),
define("iot/endpoint/ListModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "common/storage", "../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.updateDescription = function(e) {
            return o.api.updateEndpointDesp(e)
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return o.api.iotEndpointList
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return o.api.getPackageDetail().then(function(e) {
                            if (e.status) return {
                                css: u["default"].status[e.status].css,
                                text: u["default"].status[e.status].text
                            }
                        })
                    },
                    mainUser: function() {
                        return ! d["default"].get("BCE_IOT_MODBUS_SUBUSER")
                    },
                    realName: function() {
                        return o.api.getRealNameStatus()
                    }
                }
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: o.pageSize
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/endpoint/ListView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./list.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/timeUtil", "common/storage", "../events", "./config", "../config", "../enum"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p) {
    var f = r["default"](n),
    m = r["default"](o),
    h = r["default"](s),
    b = r["default"](l),
    v = r["default"](d),
    g = r["default"](u),
    y = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "create:click": function(t) {
                    return e.fire(v["default"].CREATE, t)
                },
                "viewStats:click": function(t) {
                    return e.fire(v["default"].VIEW_STATS, t)
                },
                "viewPackage:click": function(t) {
                    return e.fire(v["default"].VIEW_PACKAGE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "table:saveedit": function(t) {
                    return e.fire(v["default"].EDIT_TABLE_CELL, t)
                },
                "turnkey:click": function(t) {
                    return e.fire(v["default"].START_TURNKEY, t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "实例名称",
                    minWidth: 250,
                    field: "endpointName",
                    content: function(e, t) {
                        var i = f["default"].escape(e.endpointName);
                        return '<a href="#/iot/thing/list~endpointName=' + i + '">' + i + "</a>"
                    }
                },
                {
                    title: "描述",
                    field: "description",
                    width: 100,
                    content: function(e, t) {
                        var i = f["default"].escape(e.description);
                        return '<span class="description" title="' + i + '">' + i + "</span>"
                    },
                    editable: 1
                },
                {
                    title: "地址",
                    width: 220,
                    field: "hostname",
                    content: function(e, t) {
                        return f["default"].map(e.hostname,
                        function(e) {
                            return '<p class="nowrap">' + e + "</p>"
                        }).join("")
                    }
                },
                {
                    title: "区域",
                    minWidth: 100,
                    field: "location",
                    content: function(e, t) {
                        var i = f["default"].find(c.region, {
                            value: e.location
                        });
                        return i ? i.name: ""
                    }
                },
                {
                    title: "创建时间",
                    width: 120,
                    field: "createTime",
                    content: function(e, t) {
                        return h["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 125,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = e.creatorType === p.CREATOR.USER,
            a = "";
            e.creatorType === p.CREATOR.DM && (a = "本实例由物管理创建不能删除。不使用则不会产生费用"),
            e.creatorType === p.CREATOR.PARSER && (a = "本实例由物解析创建不能删除。不使用则不会产生费用");
            var n = e.endpointName,
            r = "uuid=" + e.uuid + "&name=" + e.endpointName + "&from=" + e.creatorType,
            o = [];
            return this.model.get("mainUser") && o.push(f["default"].template(g["default"].tpl.cmdWithTip)({
                label: "删除",
                command: v["default"].RELEASE,
                tipId: "ui-tip-" + t,
                tipText: a,
                args: n,
                className: i ? "": "state-disabled",
                tipClassName: a ? "": "state-hidden",
                disabled: i ? "": "disabled"
            })),
            o.push('<button class="cmd-button"\n                    data-command="VIEW_ENDPOINT_STATS"\n                    data-command-args=\'' + r + "'>用量统计</button>"),
            '<span class="operations">' + o.join("") + "</span>"
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_list"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: !1,
                        editable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        columnRenderIndexes: [5],
                        noDataHtml: b["default"].get("BCE_IOT_MODBUS_SUBUSER") ? g["default"].noDataHtmlsubuser: g["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (m["default"]);
    module.exports = y
}),
define("iot/endpoint/UnicomDetail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "inf-ria/helper", "./UnicomDetailModel", "./UnicomDetailView", "../config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("UPGRADE", this.upgrade, this),
            this.view.on("REBUY", this.rebuy, this),
            this.view.on("RENEW", this.renew, this)
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgradeUnicom")
        },
        n.prototype.rebuy = function() {
            this.redirect("/iot/order/create")
        },
        n.prototype.renew = function() {
            var e = this.model.get("basicInfo"),
            t = e.resourceId,
            i = e.region;
            u["default"].redirectToModule("billing", "/billing/recharge/list", {
                serviceType: l.serviceType,
                instanceIds: t,
                region: i
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return c["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = f
}),
define("iot/endpoint/unicomDetail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_unicom_detail --\x3e\n<div class="iot-package-detail iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">物接入-实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">计费套餐详情-物接入（SIM版）</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>计费套餐详情</h2>\n            <div class="main-content">\n                <div class="detail-parts-table">\n                    <div class="row-12">\n                        <div class="col-6">\n                            <dl class="detail-part-1-col with-desc-editor">\n                                <dt>\n                                    <h4>基本信息</h4>\n                                </dt>\n                                <dd class="col-2">\n                                    <div class="detail-row">\n                                        <label>区域：</label>\n                                        <span>${basicInfo.locationTxt}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>状态：</label>\n                                        <span class="status status-${basicInfo.state.css}"> ${basicInfo.state.text}</span>\n                                    </div>\n                                    \x3c!-- if: ${basicInfo.expressId}--\x3e\n                                    <div class="detail-row">\n                                        <label>物联网卡快递公司：</label>\n                                        <span>${basicInfo.expressCompany}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>物联网卡快递单号：</label>\n                                        <span> ${basicInfo.expressId}</span>\n                                    </div>\n                                    \x3c!-- /if --\x3e\n                                </dd>\n                            </dl>\n                        </div>\n                        <div class="col-6">\n                            <dl class="detail-part-1-col">\n                                <dt>\n                                    <h4>支付信息</h4>\n                                </dt>\n                                <dd>\n                                    <div class="detail-row">\n                                        <label>支付方式：</label>\n                                        <span>${basicInfo.payType}\n                                        </span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>创建时间：</label>\n                                        <span>${basicInfo.createTime}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        <label>到期时间：</label>\n                                        <span>${basicInfo.expireTime}</span>\n                                    </div>\n                                    <div class="detail-row">\n                                        \x3c!-- if: ${basicInfo.status} !== \'CREATING\' && !${basicInfo.tester} && ${overdueStatus.pass} && ${basicInfo.recharge} --\x3e\n                                        <esui-button data-ui-id="renewButton" data-ui-type="Button">续费</esui-button>\n                                        \x3c!-- else --\x3e\n                                        <span class="disabled">\n                                            <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                                \x3c!-- if: ${basicInfo.status} === \'CREATING\' --\x3e\n                                                    资源创建中\n                                                \x3c!-- elif: ${basicInfo.tester} --\x3e\n                                                    测试版不能续费，请选择配置升级\n                                                \x3c!-- elif: !${overdueStatus.pass} --\x3e\n                                                    您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                                \x3c!-- else --\x3e\n                                                    账期已经大于一年，不符合续费条件\n                                                \x3c!-- /if --\x3e\n                                            </span>\n                                            <esui-button class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-type="Button" data-ui-disabled="disabled">续费</esui-button>\n                                        </span>\n                                        \x3c!-- /if --\x3e\n                                    </div>\n                                </dd>\n                            </dl>\n                        </div>\n                    </div>\n\n                    <dl class="detail-part-1-col" id="config-wrap">\n                        <dt>\n                            <h4>配置信息</h4>\n                        </dt>\n                        <dd class="col-2">\n                            <div class="detail-row">\n                                <label>物接入（SIM版）套餐类型：</label>\n                                <span>${basicInfo.resourceType}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>物联网卡数：</label>\n                                <span>${basicInfo.cardNum} 张</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>购买规格：</label>\n                                <span>${basicInfo.messagesNum} 百万条/月</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>购买时长：</label>\n                                <span>${basicInfo.purchaseMonths} 个月</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月账期：</label>\n                                <span>${basicInfo.beginningAccount} 至 ${basicInfo.endAccount}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月账期内剩余：</label>\n                                <span>${basicInfo.remainderNum} 条</span>\n                            </div>\n                            \x3c!-- if: ${basicInfo.status} !== \'EXPIRED\'  && ${basicInfo.status} !==\'CREATING\' && ${overdueStatus.pass} --\x3e\n                            <esui-button data-ui-id="upgradeConfig">配置升级</esui-button>\n                            \x3c!-- else --\x3e\n                            <span class="disabled">\n                                <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">\n                                    \x3c!-- if: ${basicInfo.status} === \'CREATING\' --\x3e\n                                        资源创建中\n                                    \x3c!-- elif: ${basicInfo.status} === \'EXPIRED\' --\x3e\n                                        资源已过期\n                                    \x3c!-- else --\x3e\n                                        您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                    \x3c!-- /if --\x3e\n                                </span>\n                                <esui-button data-ui-id="upgradeConfig" class="ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled" data-ui-disabled="disabled">配置升级</esui-button>\n                            </span>\n                            \x3c!-- /if --\x3e\n                        </dd>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/UnicomDetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "./config", "../config", "../enum"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.outputdollars = function(e) {
            if ((e = e.toString()).length <= 3) return "" === e ? "0": e;
            var t = e.length % 3,
            i = 0 === t ? "": e.substring(0, t),
            a = 0;
            for (a = 0; a < Math.floor(e.length / 3); a++) i += 0 === t && 0 === a ? e.substring(t + 3 * a, t + 3 * a + 3) : "," + e.substring(t + 3 * a, t + 3 * a + 3);
            return i
        },
        n.prototype.prepare = function() {
            var e = this.get("basicInfo"),
            t = c["default"].find(l.region, {
                value: e.region
            });
            c["default"].extend(e, {
                localTime: p["default"].toTime(e.createTime),
                locationTxt: t ? t.name: "",
                hostNameList: c["default"].map(e.hostname,
                function(e) {
                    return "<p>" + e + "</p>"
                }).join(""),
                configureTxt: d.ENDPOINT_CONFIG.getTextFromValue(e.configure)
            }),
            this.set("basicInfo", e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return l.api.getUnicomDetail().then(function(t) {
                            return t.state = {
                                css: f["default"].status[t.status].css,
                                text: f["default"].status[t.status].text
                            },
                            t.payType = "prepay" === t.productType ? "预付费": "后付费",
                            t.expressCompany = t.expressCompany ? t.expressCompany: "顺丰",
                            t.beginningAccount = p["default"].toTime(t.beginningAccount),
                            t.endAccount = p["default"].toTime(t.endAccount),
                            t.createTime = p["default"].toTime(t.createTime),
                            t.expireTime = p["default"].toTime(t.expireTime),
                            t.remainderNum = e.outputdollars(t.remainderNum),
                            t.tester ? t.resourceType = "1元试用版": 128 === t.messageByte ? t.resourceType = "小型设备版": t.resourceType = "大型设备版",
                            t
                        })
                    },
                    overdueStatus: function(e) {
                        return l.api.getOverdueStatus()
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/endpoint/UnicomDetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./unicomDetail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "upgradeConfig:click": function(t) {
                    return e.fire("UPGRADE", t)
                },
                "reBuy:click": function(t) {
                    return e.fire("REBUY", t)
                },
                "renewButton:click": function(t) {
                    return e.fire("RENEW", t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_unicom_detail"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/endpoint/UnicomEndpointStats", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "moment", "./UnicomEndpointStatsModel", "./UnicomEndpointStatsView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("REFRESH_CHART", this.refreshChart, this),
            this.view.on("UPGRADE", this.upgrade, this),
            this.refreshChart()
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgradeUnicom")
        },
        n.prototype.refreshChart = function() {
            var e = this,
            t = this.view.get("rangeCalendar").getValue().split(/,/);
            if ((c["default"](t[1]).valueOf() - c["default"](t[0]).valueOf()) / 1e3 > 31536e3) this.view.waitAlert({
                title: "提示",
                content: "时间范围最大为一年，请重新选择",
                width: 420
            });
            else {
                var i = (new Date).valueOf();
                if (c["default"](t[1]).valueOf() > i) this.view.waitAlert({
                    title: "提示",
                    content: "所选时间超过当前时间，请重新选择",
                    width: 420
                });
                else {
                    var a = {
                        endpointUuid: this.model.get("uuid"),
                        endpointName: this.model.get("name"),
                        start: u["default"].timeToUtc(t[0]),
                        end: u["default"].timeToUtc(t[1]),
                        pace: this.view.get("cycleUnit").getValue(),
                        type: "CHINA_UNICOM"
                    };
                    this.model.getEndpointHistory(a).then(function(t) {
                        return e.view.renderNewLineChart(t)
                    }).fail(function() {
                        return e.view.showToast("获取新增图表失败！", {
                            messageType: "error"
                        })
                    })
                }
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/endpoint/unicomEndpointStats.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_unicom_endpoint_stats --\x3e\n<div class="iot-endpoint-stats iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">物接入-实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">用量统计</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>实例 ${name}<span>本实例由${summary.from}创建</span></h2>\n            <div class="main-content">\n                <div class="detail-parts-table">\n                    <dl class="detail-part-1-col basic-info" id="config-wrap">\n                        <dt>\n                            <h4>基本信息</h4>\n                        </dt>\n                        <dd class="stats">\n                            <div class="detail-row">\n                                <label>本月账期：</label>\n                                <span>${summary.billMonthStart} 至 ${summary.billMonthEnd}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>已用：</label>\n                                <span>${summary.usedNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>当前连接数：</label>\n                                <span>${summary.connectedNum}个 （当前/最大连接数：${summary.connectedNum}/${summary.connectedLimitNum}）</span>\n                            </div>\n                        </dd>\n                    </dl>\n                    <dl class="detail-part-1-col" id="config-wrap">\n                        <dt>\n                            <h4>累计信息</h4>\n                        </dt>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="accStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                    <dl class="detail-part-1-col" id="new-wrap">\n                        <dt>\n                            <h4>新增信息</h4>\n                        </dt>\n                        <div class="option">\n                            <span>时间选择：</span>\n                            <input data-ui-type="RangeCalendar" name="rangeCalendar"\n                               data-ui-id="rangeCalendar" class="range-calendar"\n                               data-ui-time="true"/>\n                        </div>\n                        <div class="option">\n                            <span>采样周期：</span>\n                            <esui-select class="cycle-unit"\n                                data-ui-id="cycleUnit" data-ui-name="cycleUnit"\n                                data-ui-width="80"\n                                data-ui-datasource="@cycleList"></esui-select>\n                        </div>\n                        <esui-button class="refresh-chart" data-ui-skin="refresh"\n                                data-ui-id="refreshChart"></esui-button>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="newStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/UnicomEndpointStatsModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getEndpointHistory = function(e) {
            return o.api.getEndpointHistory(e)
        },
        n.prototype.outputdollars = function(e) {
            if ((e = e.toString()).length <= 3) return "" === e ? "0": e;
            var t = e.length % 3,
            i = 0 === t ? "": e.substring(0, t),
            a = 0;
            for (a = 0; a < Math.floor(e.length / 3); a++) i += 0 === t && 0 === a ? e.substring(t + 3 * a, t + 3 * a + 3) : "," + e.substring(t + 3 * a, t + 3 * a + 3);
            return i
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    summary: function(e) {
                        return o.api.getEndpointSummary({
                            endpointUuid: e.get("uuid"),
                            endpointName: e.get("name"),
                            type: "CHINA_UNICOM"
                        }).then(function(t) {
                            return t.billMonthEnd = l["default"].toTime(t.billMonthEnd),
                            t.billMonthStart = l["default"].toTime(t.billMonthStart),
                            t.usedNum = e.outputdollars(t.usage),
                            t.connectedNum = e.outputdollars(t.connectedClients),
                            t.connectedLimitNum = e.outputdollars(t.connectedClientLimit),
                            "DM" === e.get("from") ? t.from = "物管理": "USER" === e.get("from") ? t.from = "物接入": "PARSER" === e.get("from") && (t.from = "物解析"),
                            t
                        })
                    },
                    cycleList: function(e) {
                        return [{
                            text: "1小时",
                            value: "hourly"
                        },
                        {
                            text: "1天",
                            value: "daily"
                        }]
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/endpoint/UnicomEndpointStatsView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./unicomEndpointStats.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "underscore", "moment", "echarts", "echarts/chart/line", "inf-ria/utils/mtools"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](u),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "cycleUnit:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "rangeCalendar:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "refreshChart:click": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "upgradeConfig:click": function(t) {
                    return e.fire("UPGRADE", t)
                }
            }
        },
        n.prototype.renderAccLineChart = function(e) {
            var t = {
                name: "ACC-CHART",
                unit: "",
                metrics: []
            },
            i = h["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            p["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = h["default"].getChartOptions(i, t, null, {});
            m["default"].init(document.getElementById("accStats")).setOption(a, !0)
        },
        n.prototype.renderNewLineChart = function(e) {
            var t = {
                name: "NEW-CHART",
                unit: "",
                metrics: []
            },
            i = h["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            p["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = h["default"].getChartOptions(i, t, null, {});
            m["default"].init(document.getElementById("newStats")).setOption(a, !0)
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.renderAccLineChart(this.model.get("summary"))
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_unicom_endpoint_stats"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    rangeCalendar: {
                        rawValue: {
                            begin: f["default"]().subtract(12, "h").toDate(),
                            end: new Date
                        },
                        range: {
                            begin: f["default"]().subtract(1, "y").toDate(),
                            end: new Date
                        }
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = b
}),
define("iot/endpoint/UnicomStats", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "moment", "./UnicomStatsModel", "./UnicomStatsView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("REFRESH_CHART", this.refreshChart, this),
            this.view.on("UPGRADE", this.upgrade, this),
            this.view.on("REBUY", this.rebuy, this),
            this.refreshChart()
        },
        n.prototype.upgrade = function() {
            this.redirect("/iot/order/upgradeUnicom")
        },
        n.prototype.rebuy = function() {
            this.redirect("/iot/order/create")
        },
        n.prototype.refreshChart = function() {
            var e = this,
            t = this.view.get("rangeCalendar").getValue().split(/,/);
            if ((c["default"](t[1]).valueOf() - c["default"](t[0]).valueOf()) / 1e3 > 31536e3) this.view.waitAlert({
                title: "提示",
                content: "时间范围最大为一年，请重新选择",
                width: 420
            });
            else {
                var i = (new Date).valueOf();
                if (c["default"](t[1]).valueOf() > i) this.view.waitAlert({
                    title: "提示",
                    content: "所选时间超过当前时间，请重新选择",
                    width: 420
                });
                else {
                    var a = {
                        start: u["default"].timeToUtc(t[0]),
                        end: u["default"].timeToUtc(t[1]),
                        pace: this.view.get("cycleUnit").getValue(),
                        type: "CHINA_UNICOM"
                    };
                    this.model.getDashboardHistory(a).then(function(t) {
                        return e.view.renderNewLineChart(t)
                    }).fail(function() {
                        return e.view.showToast("获取新增图表失败！", {
                            messageType: "error"
                        })
                    })
                }
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/endpoint/unicomStats.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_endpoint_unicomStats --\x3e\n<div class="iot-all-stats iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">物接入-实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">用量统计-物接入（SIM版）</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>本月概览</h2>\n            <div class="main-content">\n                <div class="detail-parts-table">\n                    <dl class="detail-part-1-col basic-info" id="config-wrap">\n                        <dt>\n                            <h4>基本信息</h4>\n                        </dt>\n                        <div data-ui-type="EChart" data-ui-chart-type="pie" data-ui-id="summaryPie"\n                             id="summaryPie" class="summary-pie"></div>\n                        <dd class="stats">\n                            <div class="detail-row">\n                                <label>实例数：</label>\n                                <span>${summary.endpointCount} 个</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月账期：</label>\n                                <span>${summary.billMonthStart} 至 ${summary.billMonthEnd}</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>本月额度：</label>\n                                <span>${summary.quotaNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                \x3c!-- if: ${summary.quota} >= 1000 --\x3e\n                                 <span class="disabled">\n                                    <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">您已是最高额度，若想继续升配，请提工单 </span>\n                                    <esui-button class="upgrade-button ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled gray" data-ui-id="upgradeConfig" data-ui-disabled="disabled">配置升级</esui-button>\n                                </span>\n                                \x3c!-- elif: ${summary.status} !== \'EXPIRED\' && ${overdueStatus.pass} --\x3e\n                                <esui-button class="upgrade-button"\n                                    data-ui-id="upgradeConfig">配置升级</esui-button>\n                                \x3c!-- elif: ${summary.status} !== \'EXPIRED\' && !${overdueStatus.pass} --\x3e\n                                <span class="disabled">\n                                    <span data-ui-type="Tip" data-ui-id="ui-tip-0" data-ui-layer-width="auto" class="ui-ctrl ui-tip">您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买</span>\n                                    <esui-button class="upgrade-button ui-button-disabled state-disabled skin-danger-disabled skin-danger-button-disabled gray" data-ui-id="upgradeConfig" data-ui-disabled="disabled">配置升级</esui-button>\n                                </span>\n                                \x3c!-- /if --\x3e\n                            </div>\n                        </dd>\n                        <dd class="stats">\n                            <div class="detail-row">\n                                <label>已用：</label>\n                                <span>${summary.usedNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>剩余：</label>\n                                <span>${summary.remainNum} 条</span>\n                            </div>\n                            <div class="detail-row">\n                                <label>剩余日均：</label>\n                                <span>${summary.remainPerDayNum} 条</span>\n                            </div>\n                        </dd>\n                    </dl>\n                    <dl class="detail-part-1-col" id="config-wrap">\n                        <dt>\n                            <h4>累计信息</h4>\n                        </dt>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="accStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                    <dl class="detail-part-1-col" id="new-wrap">\n                        <dt>\n                            <h4>新增信息</h4>\n                        </dt>\n                        <div class="option">\n                            <span>时间选择：</span>\n                            <input data-ui-type="RangeCalendar" name="rangeCalendar"\n                               data-ui-id="rangeCalendar" class="range-calendar"\n                               data-ui-time="true"/>\n                        </div>\n                        <div class="option">\n                            <span>采样周期：</span>\n                            <esui-select class="cycle-unit"\n                                data-ui-id="cycleUnit" data-ui-name="cycleUnit"\n                                data-ui-width="80"\n                                data-ui-datasource="@cycleList"></esui-select>\n                        </div>\n                        <esui-button class="refresh-chart" data-ui-skin="refresh"\n                                data-ui-id="refreshChart"></esui-button>\n                        <div class="stats-chart">\n                            <div class="wrapper" >\n                                <div class="chart" id="newStats"></div>\n                            </div>\n                        </div>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/endpoint/UnicomStatsModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getDashboardHistory = function(e) {
            return o.api.getDashboardHistory(e)
        },
        n.prototype.outputdollars = function(e) {
            if ((e = e.toString()).length <= 3) return "" === e ? "0": e;
            var t = e.length % 3,
            i = 0 === t ? "": e.substring(0, t),
            a = 0;
            for (a = 0; a < Math.floor(e.length / 3); a++) i += 0 === t && 0 === a ? e.substring(t + 3 * a, t + 3 * a + 3) : "," + e.substring(t + 3 * a, t + 3 * a + 3);
            return i
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    summary: function(e) {
                        return o.api.getDashboardSummary({
                            type: "CHINA_UNICOM"
                        }).then(function(t) {
                            return t.billMonthEnd = l["default"].toTime(t.billMonthEnd),
                            t.billMonthStart = l["default"].toTime(t.billMonthStart),
                            t.quotaNum = e.outputdollars(t.quota),
                            t.usedNum = e.outputdollars(t.usage),
                            t.remainNum = e.outputdollars(t.remain),
                            t.remainPerDayNum = e.outputdollars(t.remainPerDay),
                            t.quota = t.quota / 1e6,
                            t
                        })
                    },
                    cycleList: function(e) {
                        return [{
                            text: "1小时",
                            value: "hourly"
                        },
                        {
                            text: "1天",
                            value: "daily"
                        }]
                    },
                    overdueStatus: function(e) {
                        return o.api.getOverdueStatus()
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/endpoint/UnicomStatsView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./unicomStats.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "underscore", "jquery", "moment", "echarts", "echarts/chart/line", "inf-ria/utils/mtools"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](c),
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "cycleUnit:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "rangeCalendar:change": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "refreshChart:click": function(t) {
                    return e.fire("REFRESH_CHART", t)
                },
                "upgradeConfig:click": function(t) {
                    return e.fire("UPGRADE", t)
                },
                "reBuy:click": function(t) {
                    return e.fire("REBUY", t)
                }
            }
        },
        n.prototype.renderPieChart = function(e) {
            var t = {
                animation: !1,
                color: ["#CFE8FC", "#108cee"],
                series: [{
                    type: "pie",
                    center: ["50%", "50%"],
                    radius: ["71%", "100%"],
                    itemStyle: {
                        emphasis: {
                            label: {
                                formatter: "{b}\n{d}%"
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: !1,
                            position: "center"
                        },
                        emphasis: {
                            show: !0,
                            textStyle: {
                                fontSize: "13",
                                fontWeight: "bold"
                            },
                            formatter: "{b}\n{d}%",
                            label: {
                                formatter: "{b}\n{d}%"
                            }
                        }
                    },
                    data: [{
                        name: "REMAIN",
                        value: e.remain
                    },
                    {
                        name: "USED",
                        value: e.usage
                    }]
                }]
            },
            i = this.get("summaryPie");
            i.setOption(t),
            m["default"](window).on("resize.echarts", i.echartsInstance.resize)
        },
        n.prototype.renderAccLineChart = function(e) {
            var t = {
                name: "ACC-CHART",
                unit: "",
                metrics: []
            },
            i = v["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            f["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = v["default"].getChartOptions(i, t, null, {});
            b["default"].init(document.getElementById("accStats")).setOption(a, !0)
        },
        n.prototype.renderNewLineChart = function(e) {
            var t = {
                name: "NEW-CHART",
                unit: "",
                metrics: []
            },
            i = v["default"].adjustSeriesData(e, "sum");
            t.statistics = "sum",
            f["default"].each(e.series,
            function(e) {
                t.metrics.push({
                    name: e.name,
                    value: e.name
                })
            });
            var a = v["default"].getChartOptions(i, t, null, {});
            b["default"].init(document.getElementById("newStats")).setOption(a, !0)
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.renderPieChart(this.model.get("summary")),
            this.renderAccLineChart(this.model.get("summary"))
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_endpoint_unicomStats"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    rangeCalendar: {
                        rawValue: {
                            begin: h["default"]().subtract(12, "h").toDate(),
                            end: new Date
                        },
                        range: {
                            begin: h["default"]().subtract(1, "y").toDate(),
                            end: new Date
                        }
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = g
}),
define("iot/enum", ["exports", "inf-ria/EnumX", "babel-runtime/helpers/interop-require-default", "inf-i18n"],
function(exports, e, t, i) {
    exports.__esModule = !0;
    var a = t["default"](e),
    n = (t["default"](i), new a["default"]({
        alias: "FREE",
        text: "免费",
        value: "free"
    }));
    exports.ENDPOINT_CONFIG = n;
    var r = new a["default"]({
        alias: "PUBLISH",
        text: "发布(PUB)",
        value: "PUBLISH"
    },
    {
        alias: "SUBSCRIBE",
        text: "订阅(SUB)",
        value: "SUBSCRIBE"
    });
    exports.OPERATIONS = r;
    var o = new a["default"]({
        alias: "USER",
        text: "用户",
        value: "USER"
    },
    {
        alias: "DM",
        text: "物管理",
        value: "DM"
    },
    {
        alias: "PARSER",
        text: "物解析",
        value: "PARSER"
    });
    exports.CREATOR = o;
    var s = new a["default"]({
        alias: "RUNNING",
        text: "运行中",
        value: "RUNNING",
        kclass: "status-running"
    },
    {
        alias: "CREATING",
        text: "创建中",
        value: "CREATING",
        kclass: "status-creating"
    });
    exports.INS_STATUS = s
}),
define("iot/events", ["exports", "module"],
function(exports, module) {
    module.exports = {
        REFRESH: "REFRESH",
        CREATE: "CREATE",
        RELEASE: "RELEASE",
        DELETE: "DELETE",
        EDIT: "EDIT",
        INPUT: "INPUT",
        CONFIRM: "CONFIRM",
        BEFORE_CHANGE: "BEFORE_CHANGE",
        THING_CREATED: "THING_CREATED",
        PRINCIPAL_CREATED: "PRINCIPAL_CREATED",
        CREATE_PRINCIPAL: "CREATE_PRINCIPAL",
        CANCEL_CREATE_PRINCIPAL: "CANCEL_CREATE_PRINCIPAL",
        PRINCIPAL_LOADED: "PRINCIPAL_LOADED",
        RENDER_AFTER_CONFIRM: "RENDER_AFTER_CONFIRM",
        GEN_PASSWORD: "GEN_PASSWORD",
        CREATE_POLICY: "CREATE_POLICY",
        CANCEL_CREATE_POLICY: "CANCEL_CREATE_POLICY",
        POLICY_LOADED: "POLICY_LOADED",
        VIEW_PACKAGE: "VIEW_PACKAGE",
        VIEW_DEVICE: "VIEW_DEVICE",
        VIEW_STATS: "VIEW_STATS",
        REFRESH_CHART: "REFRESH_CHART",
        VIEW_ENDPOINT_STATS: "VIEW_ENDPOINT_STATS",
        EDIT_TRANTABLE: "EDIT_TRANTABLE",
        BATCH_UPLOAD: "BATCH_UPLOAD",
        EDIT_TABLE_CELL: "EDIT_TABLE_CELL",
        START_TURNKEY: "START_TURNKEY",
        RENEW: "RENEW",
        RENEW_UNICOM: "RENEW_UNICOM",
        UPGRADE_CONFIG: "UPGRADE_CONFIG",
        UPGRADE_UNICOM_CONFIG: "UPGRADE_UNICOM_CONFIG",
        CREATE_HUB: "CREATE_HUB",
        CREATE_UNICOM: "CREATE_UNICOM",
        VIEW_UNICOM_STATS: "VIEW_UNICOM_STATS",
        VIEW_UNICOM_PACKAGE: "VIEW_UNICOM_PACKAGE"
    }
}),
define("iot/helper", ["exports", "module", "./config"],
function(exports, module, e) {
    module.exports = {
        isValidTopic: function(t) {
            return (0 !== t.indexOf("$") || 0 === t.indexOf("$baidu/") || 0 === t.indexOf("$SYS/")) && !!e.topicRegExp.test(t)
        },
        isShowCoupon: function(e, t) {
            return ! (1 === e && t <= 3)
        }
    }
}),
define("iot/modbus/advanced/Advanced", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./AdvancedModel", "./AdvancedView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_CUSTOM_PROPERTY", this.create, this),
            this.view.on("DELETE", this["delete"], this)
        },
        n.prototype.create = function() {
            var e = this;
            this.model.iotResourceValid().then(function(t) {
                t.valid ? c["default"].createCustomProperty.call(e, {
                    parentAction: e
                }) : c["default"].confirmCreateIotOrder(e.view).then(function() {
                    return e.redirect("#/iot/order/notify")
                })
            })
        },
        n.prototype["delete"] = function(e) {
            var t = this.model,
            i = this.view,
            a = this;
            t.deleteCustomProperty({
                name: e.name
            }).then(function() {
                return i.showToast("删除自定义标签成功！")
            }).then(function() {
                return a.reload()
            }).fail(function() {
                return i.showToast("删除自定义标签失败！")
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return u["default"]
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/advanced/advanced.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_advanced --\x3e\n<div class="modbus-main-wrap modbus-advanced main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物解析 - 高级设置</span>\n        </p>\n        <div class="list-content">\n            <h2>解析项目设置</h2>\n        \t<div class="tip-grey">\n        \t\t温馨提示：添加的自定义属性将应用与所有解析记录。\n        \t</div>\n            <div class="main-content table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="propertyCreateBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建自定义属性</button>\n\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/advanced/AdvancedModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../../config", "common/config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {},
        n.prototype.iotResourceValid = function() {
            return l["default"].api.iotServiceStatus()
        },
        n.prototype.deleteCustomProperty = function(e) {
            return r.api.deleteCustomProperty(e)
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.getCustomPropertyList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: 200
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/advanced/AdvancedView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./advanced.tpl", "inf-ria/mvc/ListView", "babel-runtime/helpers/interop-require-default", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = r["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return d["default"].getListEvents({
                "propertyCreateBtn:click": function(t) {
                    return e.fire("CREATE_CUSTOM_PROPERTY", t)
                },
                "table:command": this.handleTableCommand
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "自定义属性",
                field: "name",
                width: 50,
                content: function(e, t) {
                    return e.name
                }
            },
            {
                title: "操作",
                width: 50,
                field: "operation",
                content: function(e, t) {
                    return '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="DELETE"\n                                    data-command-args=\'' + t + "'>删除</button>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.handleTableCommand = function(e) {
            var t = this,
            i = this.get("table").datasource[e.args];
            "DELETE" === e.name && t.waitConfirm("是否删除自定义标签", "自定义标签").then(function() {
                t.fire(e.name, i)
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_advanced"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        editable: 1,
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: u["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/advanced/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default", "common/component/action_category"],
function(exports, module, e, t, i) {
    var a = t["default"](e),
    n = [{
        type: "iot/modbus/advanced/Advanced",
        path: "/iot/modbus/advanced",
        category: t["default"](i)["default"].LIST
    },
    {
        type: "iot/modbus/advanced/dialog/CreateProperty",
        path: "/iot/modbus/advanced/createproperty"
    }];
    a["default"].registerAction(n),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何自定义属性</br>", "点击左上角按钮立即创建", "</p></div>"].join("")
    }
}),
define("iot/modbus/advanced/dialog/CreateProperty", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreatePropertyModel", "./CreatePropertyView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("自定义属性创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "自定义属性创建成功！"
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/advanced/dialog/createproperty.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_customproperty --\x3e\n<div class="modbus-dialog-form modbus-customproperty-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label>标签：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="name"\n                        data-ui-id="label"></div>\n                </div>\n            </div>\n        </div>\n        \n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_customproperty_child --\x3e\n\x3c!-- import: TPL_modbus_create_customproperty --\x3e\n\n'
}),
define("iot/modbus/advanced/dialog/CreatePropertyModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "../../../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return r.api.createCustomProperty
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/modbus/advanced/dialog/CreatePropertyView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./createproperty.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_customproperty"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    label: {
                        width: 150,
                        placeholder: "",
                        required: "required"
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/analysis/Analysis", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListAction", "./AnalysisModel", "./AnalysisView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_PROJECT", this.create, this),
            this.view.on("DELETE_PROJECT", this["delete"], this),
            this.view.on("EDIT_PROJECT", this.edit, this),
            this.view.on("UPDATE_STATE", this.updateState, this),
            this.view.on("LINK_SETTINGS", this.linkToSettings, this),
            this.view.on("LINK_DATA", this.linkToData, this),
            this.model.on("change", this.syncModelToView, this)
        },
        n.prototype.syncModelToView = function(e) {
            a.prototype.syncModelToView.call(this, e)
        },
        n.prototype.linkToSettings = function(e) {
            this.redirect("/iot/modbus/analysis/settings~" + e.args)
        },
        n.prototype.linkToData = function(e) {
            this.redirect("/iot/modbus/analysis/verify~" + e.args)
        },
        n.prototype.updateState = function(e) {
            var t = this;
            this.model.updateState({
                uuid: e.uuid,
                state: e.state
            }).then(function() {
                return t.view.showToast(e.text + "解析项目成功！")
            }).then(function() {
                return t.reload()
            }).fail(function() {
                return t.showToast(e.text + "解析项目失败！")
            })
        },
        n.prototype.create = function() {
            var e = this;
            this.model.iotResourceValid().then(function(t) {
                t.valid ? f["default"].createParseProject.call(e, {
                    parentAction: e
                }) : f["default"].confirmCreateIotOrder(e.view).then(function() {
                    return e.redirect("#/iot/order/notify")
                })
            })
        },
        n.prototype.edit = function(e) {
            f["default"].editParseProject.call(this, {
                parentAction: this,
                item: e
            })
        },
        n.prototype["delete"] = function() {
            var e = this.view.get("table").getSelectedItems(),
            t = this.model,
            i = this.view,
            a = this,
            n = [];
            d["default"].each(e,
            function(e) {
                n.push({
                    uuid: e.uuid,
                    gatewayUuid: e.gatewayUuid,
                    storageTaskId: e.storageTaskId
                })
            }),
            i.waitConfirm({
                title: "删除解析项目",
                content: "是否确认删除解析项目？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                t.deleteParseProject(n).then(function() {
                    return i.showToast("删除解析项目成功！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast("删除解析项目失败！")
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return c["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/modbus/analysis/analysis.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_analysis_list --\x3e\n<div class="modbus-main-wrap modbus-manage main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物解析 - 解析项目</span>\n        </p>\n        <div class="list-content">\n            <h2>解析项目</h2>\n        \t<div class="notice">\n        \t\t解析项目配置完成后，需要配置下发才能生效，请到网关列表中点击相应网关的『配置下发』，完成配置的生效。\n        \t</div>\n            <div class="main-content table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="createBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建解析项目</button>\n\t                    <button data-ui-type="Button"\n\t                            data-ui-skin="danger"\n\t                            data-ui-id="deleteBtn">删除</button>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/analysis/AnalysisModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "common/config", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.iotResourceValid = function() {
            return l["default"].api.iotServiceStatus()
        },
        n.prototype.deleteParseProject = function(e) {
            return o.api.deleteParseProject(e)
        },
        n.prototype.updateState = function(e) {
            return o.api.updateParseproject(e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {}
            }
        },
        {
            key: "listRequester",
            get: function() {
                return o.api.getParseProjectList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: o.pageSize
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/analysis/AnalysisView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./analysis.tpl", "inf-ria/mvc/ListView", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = r["default"](d),
    h = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return f["default"].getListEvents({
                "createBtn:click": function(t) {
                    return e.fire("CREATE_PROJECT", t)
                },
                "deleteBtn:click": function(t) {
                    return e.fire("DELETE_PROJECT", t)
                },
                "table:select": this.updateButtonStates,
                "table:command": this.handleTableCommand
            })
        },
        n.prototype.handleTableCommand = function(e) {
            var t = this,
            i = this,
            a = this.get("table").datasource[e.args];
            "UPDATE_STATE" === e.name ?
            function() {
                var a = t.get("table").datasource[e.args],
                n = "RUNNING" === a.state ? "PAUSED": "RUNNING",
                r = "RUNNING" === a.state ? "暂停": "启动";
                i.waitConfirm("是否" + r + "解析项目", r + "解析项目").then(function() {
                    i.fire(e.name, {
                        uuid: a.uuid,
                        state: n,
                        text: r
                    })
                })
            } () : "EDIT_PROJECT" === e.name ? i.fire(e.name, a) : i.fire(e.name, e)
        },
        n.prototype.updateButtonStates = function() {
            var e = this.get("table").getSelectedItems();
            e && e.length > 0 ? this.get("deleteBtn").set("disabled", !1) : this.get("deleteBtn").set("disabled", !0)
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "项目名称",
                field: "name",
                width: 50,
                content: function(e) {
                    return c["default"].escape(e.name)
                }
            },
            {
                title: "状态",
                width: 50,
                field: "state",
                content: function(e) {
                    return '<span class="status status-' + m["default"].status[e.state].css + '">\n                            ' + m["default"].status[e.state].text + "\n                        </span>"
                }
            },
            {
                title: "协议",
                width: 50,
                field: "protocol",
                content: "protocol"
            },
            {
                title: "数据来源",
                width: 50,
                field: "gatewayCode",
                content: "gatewayCode"
            },
            {
                title: "存储位置",
                width: 50,
                field: "storage",
                content: "storage"
            },
            {
                title: "目的地主题",
                width: 50,
                field: "destTopic",
                content: "destTopic"
            },
            {
                title: "创建时间",
                width: 90,
                field: "createTime",
                content: function(e) {
                    return p["default"].toTime(e.createTime)
                }
            },
            {
                title: "操作",
                width: 170,
                field: "operation",
                content: function(e, t) {
                    var i = "RUNNING" === e.state ? "暂停": "启动",
                    a = "uuid=" + e.uuid + "&name=" + e.name + "&rawState=" + e.state + "&gatewayUuid=" + e.gatewayUuid;
                    return '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="UPDATE_STATE"\n                                    data-command-args=\'' + t + "'>" + i + '</button>\n                            <button class="cmd-button"\n                                    data-command="EDIT_PROJECT"\n                                    data-command-args=\'' + t + '\'>编辑</button>\n                            <button class="cmd-button"\n                                    data-command="LINK_SETTINGS"\n                                    data-command-args=\'parserObjectUuid=' + e.uuid + "&name=" + e.name + "&rawState=" + e.state + "&gatewayUuid=" + e.gatewayUuid + '\'>解析设置</button>\n                            <button class="cmd-button"\n                                    data-command="LINK_DATA"\n                                    data-command-args=\'' + a + "'>数据验证</button>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this),
            this.get("deleteBtn").set("disabled", !0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_analysis_list"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: "multi",
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: m["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = h
}),
define("iot/modbus/analysis/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default", "common/component/action_category"],
function(exports, module, e, t, i) {
    var a = t["default"](e),
    n = [{
        type: "iot/modbus/analysis/Analysis",
        path: "/iot/modbus/analysis",
        category: t["default"](i)["default"].LIST
    },
    {
        type: "iot/modbus/analysis/Verify",
        path: "/iot/modbus/analysis/verify"
    },
    {
        type: "iot/modbus/analysis/dialog/Create",
        path: "/iot/modbus/analysis/createProject"
    },
    {
        type: "iot/modbus/analysis/dialog/Create",
        path: "/iot/modbus/analysis/editProject"
    },
    {
        type: "iot/modbus/analysis/Settings",
        path: "/iot/modbus/analysis/settings"
    },
    {
        type: "iot/modbus/analysis/Polling",
        path: "/iot/modbus/analysis/setting/polling"
    },
    {
        type: "iot/modbus/analysis/dialog/Detail",
        path: "/iot/modbus/slave/detail"
    },
    {
        type: "iot/modbus/analysis/dialog/CreateTrantable",
        path: "/iot/modbus/analysis/createTrantable"
    },
    {
        type: "iot/modbus/analysis/dialog/Upload",
        path: "/iot/modbus/analysis/upload"
    },
    {
        type: "iot/modbus/analysis/NewPolling",
        path: "/iot/modbus/analysis/setting/create"
    },
    {
        type: "iot/modbus/analysis/dialog/HowUpload",
        path: "/iot/modbus/slave/howUpload"
    }];
    a["default"].registerAction(n),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何项目</br>", "点击左上角按钮立即创建", "</p></div>"].join(""),
        status: {
            RUNNING: {
                text: "运行中",
                css: "green"
            },
            PAUSED: {
                text: "暂停",
                css: "grey"
            }
        },
        kind: [{
            name: "INT",
            value: "INT"
        },
        {
            name: "BOOL",
            value: "BOOL"
        },
        {
            name: "REAL",
            value: "REAL"
        },
        {
            name: "INT32",
            value: "INT32"
        },
        {
            name: "REAL32",
            value: "REAL32"
        }],
        length: [{
            name: "1",
            value: 1
        },
        {
            name: "8",
            value: 8
        },
        {
            name: "16",
            value: 16
        },
        {
            name: "32",
            value: 32
        }],
        unit: [{
            name: "N/A",
            value: "N/A"
        },
        {
            name: "MPa(A)",
            value: "MPa(A)"
        },
        {
            name: "MPa(G)",
            value: "MPa(G)"
        },
        {
            name: "KPa",
            value: "KPa"
        },
        {
            name: "%",
            value: "%"
        },
        {
            name: "Nm^3/h",
            value: "Nm^3/h"
        },
        {
            name: "t/h",
            value: "t/h"
        },
        {
            name: "mm/s",
            value: "mm/s"
        },
        {
            name: "KW",
            value: "KW"
        },
        {
            name: "Hz",
            value: "Hz"
        },
        {
            name: "℃",
            value: "℃"
        },
        {
            name: "V",
            value: "V"
        },
        {
            name: "A",
            value: "A"
        }]
    }
}),
define("iot/modbus/analysis/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreateModel", "./CreateView", "underscore"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("gotoRuleCreation", this.gotoRuleCreation, this),
            this.view.on("REFRESH_RULE_BUTTON", this.refreshCreateRuleButton, this);
            var e = "解析项目创建成功！";
            this.model.get("item") && (e = "解析项目修改成功！"),
            this.toastMessage = e
        },
        n.prototype.refreshCreateRuleButton = function() {
            var e = this.view.getFormData(),
            t = this.model.getSubmitData(e).destTopic; ! t || t.length <= 0 ? this.view.get("addRuleToTsdb").set("disabled", !0) : this.view.get("addRuleToTsdb").set("disabled", !1)
        },
        n.prototype.gotoRuleCreation = function() {
            var e = this.view.getFormData(),
            t = this.model.getSubmitData(e),
            i = t.destTopic;
            if (!i || i.length <= 0) this.view.waitConfirm({
                title: "缺少目的地主题",
                content: "您需要为该解析项目设置目的地主题，规则引擎才能从该主题将数据提取欻来，并且写入时序数据库（TSDB）",
                width: 500,
                needFoot: !0
            }).done(function(e) {});
            else {
                var a = t.name + "->时序数据库(TSDB)",
                n = "如果解析项目" + t.name + "的目的地主题变更了，本规则的主题需要相应的更新",
                r = t.gatewayUuid,
                o = "";
                c["default"].each(this.model.get("gatewayList"),
                function(e) {
                    e.value === r && (o = e.username.split("/")[0])
                });
                var s = "/iotre/?_=" + location.search + "#/iotre/rule/create~name=" + a + "&desc=" + n + "&from=" + i + "&endpointname=" + o + "&select=_MODBUS_TO_TSDB_SELECT&dest_tsdb=1";
                window.open(s)
            }
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("解析项目创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return u["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return d["default"]
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/analysis/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_parseproject --\x3e\n<div class="modbus-dialog-form modbus-parseproject-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <div class="tip-yellow">\n                    温馨提示：新建完成后请尽快在解析设置配置Modbus和轮询请求。\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>项目名称：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="name"\n                        data-ui-id="name" data-ui-required="required"\n                        data-ui-required-error-message="请填写项目名称"\n                        data-ui-width="220" data-ui-value="${item.name}"\n                        data-ui-placeholder="请写项目名称"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label>工业协议：</label>\n                <div class="form-value">\n                    <div data-ui-type="BoxGroup" data-ui-box-type="radio"\n                    data-ui-id="protocol" data-ui-name="protocol"\n                    data-ui-value="MODBUS" data-ui-datasource="@protocolList"\n                    class="protocol"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label>数据来源：</label>\n                <esui-select data-ui-id="gatewayUuid" data-ui-width="220"\n                    data-ui-name="gatewayUuid"\n                    data-ui-value="${item.gatewayUuid}"\n                    data-ui-datasource="@gatewayUuidList"></esui-select>\n            </div>\n            <div class="form-row">\n                <label>数据存储：</label>\n                <div class="form-value">\n                    <div data-ui-type="BucketSelect"\n                        data-ui-id="storage"\n                        data-ui-name="storage"\n                        data-ui-value="${item.storage}"\n                        data-ui-extension-bucketselect-type="BucketSelectEx"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label>目的地主题：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="destTopic"\n                        data-ui-id="destTopic" data-ui-width="220" data-ui-value="${item.destTopic}"\n                        ></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <div class="form-value">\n                    <esui-button data-ui-id="addRuleToTsdb">快速创建存储至TSDB的规则引擎</esui-button>\n                    <div class="notice">    注意：如需转发至TSDB，需要填写目的地主题\n                    </div>\n                </div>\n            </div>\n            \x3c!-- <div class="form-row">\n                <label>解析服务：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="parserurl"\n                        data-ui-id="parserurl"\n                        data-ui-width="220" data-ui-value=""\n                        data-ui-placeholder="请填写 http:// 地址"></div>\n                </div>\n            </div> --\x3e\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_parseproject_child --\x3e\n\x3c!-- import: TPL_modbus_create_parseproject --\x3e\n'
}),
define("iot/modbus/analysis/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/region", "../../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e);
            var t = this.get("item");
            this.submitRequester = t ? s.api.editParseproject: s.api.createParseproject
        }
        return e["default"](n, a),
        n.prototype.filterData = function(e) {
            return e.protocol && (e.protocol = e.protocol[0]),
            this.get("item") && (e.uuid = this.get("item").uuid),
            e
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    protocolList: function() {
                        return [{
                            text: "MODBUS",
                            value: "MODBUS"
                        },
                        {
                            text: "OPC",
                            value: "OPC"
                        }]
                    },
                    gatewayUuidList: function(e) {
                        return s.api.getGatewayList({
                            order: "desc",
                            orderBy: "createTime",
                            pageNo: 1,
                            pageSize: 250
                        }).then(function(t) {
                            var i = [];
                            return d["default"].each(t.result,
                            function(e) {
                                var t = {
                                    name: e.code,
                                    value: e.uuid,
                                    username: e.username
                                };
                                i.push(t)
                            }),
                            e.set("gatewayList", i),
                            i
                        })
                    },
                    getBucketLocations: function() {
                        return function() {
                            return {
                                locations: [u["default"].getCurrentRegion().id]
                            }
                        }
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/analysis/dialog/CreateTrantable", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreateTrantableModel", "./CreateTrantableView", "jquery"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.beforeLeave = function() {
            c["default"](document).unbind()
        },
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = this.view;
            e.on("UPDATE_BIT_LENGTH", this.updateBitRule, this),
            this.on("entercomplete", this.updateBitRule),
            this.on("beforeleave", this.beforeLeave, this),
            c["default"](document).click(function(t) {
                var i = e.get("dropdownPanel");
                if (i && !i.isHidden()) {
                    if (0 !== c["default"](t.target).closest(".ui-textbox").length) return ! 1;
                    i.hide()
                }
            }),
            c["default"](".unit-input input").on("click",
            function(t) {
                e.get("dropdownPanel").show()
            }),
            c["default"](".dropdown-panel .item").on("click",
            function(t) {
                e.get("unit").setValue(c["default"](t.target).text().trim())
            })
        },
        n.prototype.updateBitRule = function(e) {
            var t = this.view.get("length").getValue(),
            i = this.view.get("bit");
            i.pattern = {
                1 : /^((-1)|0)$/,
                8 : /^((-1)|([0-7]))$/,
                16 : /^((-1)|[0-9]|(1[0-5]))$/,
                32 : /^((-1)|[0-9]|([12][0-9])|(3[01]))$/
            } [t],
            i.patternErrorMessage = "应小于数据长度" + t
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("记录创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return u["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "记录创建成功！"
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/analysis/dialog/createTrantable.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_trantable --\x3e\n<div class="modbus-dialog-form modbus-trantable-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>地址(十进制)：</label>\n                <div class="form-value">\n                    <span>${addressType}</span>\n                    <div data-ui-type="TextBox" data-ui-name="address"\n                        data-ui-id="address"\n                        data-ui-required="true"\n                        data-ui-width="207" data-ui-value="${item.address}"\n                        data-ui-placeholder="输入地址"></div>\n                </div>\n            </div>\n            <div class="form-row bit-form-row">\n                <label>BIT位：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="bit"\n                        data-ui-id="bit"\n                        data-ui-width="220" data-ui-value="${item.bit}"\n                        data-ui-placeholder="输入BIT位"></div>\n                    \x3c!-- import: TPL_modbus_bit_tip --\x3e\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>显示名称：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="name"\n                        data-ui-id="name"\n                        data-ui-required="true"\n                        data-ui-width="220" data-ui-value="${item.name}"\n                        data-ui-placeholder="输入显示名称"></div>\n                    \x3c!-- import: TPL_modbus_name_tip --\x3e\n                </div>\n            </div>\n            <div class="form-row">\n                <label>量程上限(RH)：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="rh"\n                        data-ui-id="rh"\n                        data-ui-width="220" data-ui-value="${item.rh}"\n                        data-ui-placeholder="输入量程上限(RH)"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label>量程下限(RL)：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="rl"\n                        data-ui-id="rl"\n                        data-ui-width="220" data-ui-value="${item.rl}"\n                        data-ui-placeholder="输入量程下限(RL)"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>数据类型：</label>\n                <esui-select data-ui-id="kind" data-ui-width="220"\n                    data-ui-name="kind"\n                    data-ui-required="true"\n                    data-ui-value="${item.kind}"\n                    data-ui-datasource="@kindList"></esui-select>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>数据长度(BIT)：</label>\n                <esui-select data-ui-id="length" data-ui-width="220"\n                    data-ui-name="length"\n                    data-ui-required="true"\n                    data-ui-value="${item.length}"\n                    data-ui-datasource="@lengthList"></esui-select>\n            </div>\n            <div class="form-row">\n                <label>单位：</label>\n                <div class="unit-input"\n                     data-ui-type="TextBox"\n                     data-ui-width="220"\n                     data-ui-name="unit"\n                     data-ui-id="unit"\n                     data-ui-value="${item.unit}"></div>\n                <div data-ui-type="Panel"\n                     data-ui-id="dropdownPanel"\n                     data-ui-hidden="hidden"\n                     class="dropdown-panel">\n                     \x3c!-- for: ${unitList} as ${item} --\x3e\n                        <div class="item" data-value=${item.value}>\n                            ${item.name}\n                        </div>\n                     \x3c!-- /for --\x3e\n                </div>\n            </div>\n            <div class="form-row formula">\n                <label>计算公式：</label>\n                <div class="form-value">\n                    <textarea data-ui-type="TextBox"\n                              data-ui-id="formula" data-ui-name="formula"\n                              data-ui-max-length="1000"\n                              data-ui-value=""\n                              data-ui-width="220" data-ui-height="45">\n                    </textarea>\n                    \x3c!-- import: TPL_modbus_formula_tip --\x3e\n                </div>\n            </div>\n\n            \x3c!-- for: ${customProperties} as ${prop} --\x3e\n            <div class="form-row">\n                <label>${prop.name}:</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox" data-ui-name="user_properties.${prop.name}"\n                        data-ui-id="user_properties.${prop.name}"\n                   \n                        data-ui-width="220" data-ui-value="${prop.value}"\n                        data-ui-placeholder="输入标签值"></div>\n                </div>\n            </div>\n            \x3c!-- /for --\x3e\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_trantable_child --\x3e\n\x3c!-- import: TPL_modbus_create_trantable --\x3e\n'
}),
define("iot/modbus/analysis/dialog/CreateTrantableModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "../../../config", "../config", "underscore"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](o),
    u = n["default"](s),
    c = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e);
            var t = this.get("item");
            this.submitRequester = t ? r.api.editTrantable: r.api.createTrantable
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {
            var e = this.get("item");
            if (e) {
                var t = e.address.toString();
                e.address = t.substring(1)
            }
        },
        n.prototype.filterData = function(e) {
            e.parserObjectUuid = this.get("parserObjectUuid"),
            1 === e.address.length ? e.address = this.get("addressType") + "000" + e.address: 2 === e.address.length ? e.address = this.get("addressType") + "00" + e.address: 3 === e.address.length ? e.address = this.get("addressType") + "0" + e.address: e.address = this.get("addressType") + e.address,
            this.get("item") && (e.uuid = this.get("item").uuid);
            var t = [],
            i = {};
            for (var a in e) if (e.hasOwnProperty(a)) {
                if ("user_properties." === a.substring(0, "user_properties.".length)) {
                    t.push(a);
                    i[a.substring("user_properties.".length)] = e[a]
                }
                e["user_properties.".substring(0, "user_properties.".length - 1)] = i
            }
            return u["default"].omit(e, t)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    kindList: function() {
                        return d["default"].kind
                    },
                    lengthList: function() {
                        return d["default"].length
                    },
                    unitList: function() {
                        return d["default"].unit
                    },
                    addressType: function(e) {
                        var t = e.get("addressType");
                        return "3" === t ? 4 : "1" === t ? 0 : "2" === t ? 1 : "4" === t ? 3 : ""
                    },
                    customProperties: function(e) {
                        if (e.get("item")) {
                            var t = e.get("item").user_properties,
                            i = [];
                            for (var a in t) if (t.hasOwnProperty(a)) {
                                var n = {
                                    name: a,
                                    value: t[a]
                                };
                                i.push(n)
                            }
                            return i
                        }
                        return r.api.getCustomPropertyList({
                            order: "desc",
                            orderBy: "createTime",
                            pageSize: 200
                        }).then(function(e) {
                            return u["default"].map(e.result,
                            function(e, t) {
                                return e.value = "",
                                e
                            })
                        })
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/analysis/dialog/CreateTrantableView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./createTrantable.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "length:change": function(t) {
                    return e.fire("UPDATE_BIT_LENGTH", t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this);
            var e = this.model.get("item");
            e ? this.get("formula").setValue(e.formula) : this.get("length").setValue(16)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_trantable"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    address: {
                        pattern: /^([1-9]|[0-9][1-9]|[1-9][0-9]|[0-9]{2}[1-9]|[0-9][1-9][0-9]|[1-9][0-9]{2}|[0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})$/
                    },
                    name: {
                        pattern: /^[a-zA-Z][a-zA-Z0-9_]{2,39}$/,
                        patternErrorMessage: "英文字符、数字和下划线'_'组成，3-40位，以英文字符开头"
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/analysis/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../../config", "jquery"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](s),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            d["default"](".protocol .ui-boxgroup-radio").eq(1).addClass("state-disabled"),
            d["default"](".protocol .ui-boxgroup-radio").eq(1).find("input").attr("disabled", !0).css("cursor", "not-allowed");
            var e = this.model.get("item"); (!e || !e.destTopic || e.destTopic.length < 1) && this.get("addRuleToTsdb").set("disabled", !0)
        },
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "addRuleToTsdb:click": function(t) {
                    return e.fire("gotoRuleCreation", t)
                },
                "destTopic:input": function(t) {
                    return e.fire("REFRESH_RULE_BUTTON", t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_parseproject"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    gatewayUuid: {
                        width: 242
                    },
                    storage: {
                        width: 262,
                        pattern: /^bos:\/\/.+\/$/,
                        patternErrorMessage: "请选择正确的路径",
                        getBucketList: o.api.iotBosBucketList,
                        getFolderList: o.api.iotBosFolderList,
                        getObjectList: o.api.iotBosObjectList,
                        createBucket: o.api.iotBosCreateBucket,
                        getBucketLocations: "@getBucketLocations",
                        viewtype: "folder",
                        urlPrefix: "bos://",
                        placeholder: "bos://"
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/modbus/analysis/dialog/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/analysis/dialog/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_view_slavedetail --\x3e\n<div class="modbus-dialog-form modbus-view-slavedetail">\n    <div class="column">\n        <div class="row">从站（Slave）：${item.device.slaveId}</div>\n        <div class="row">子设备ID：${item.device.code}</div>\n        <div class="row">子设备描述：${item.device.description}</div>\n        <div class="row">操作码：${item.functionCode}</div>\n        <div class="row">开始地址：${item.startAddress}</div>\n    </div>\n    <div class="column">\n        <div class="row">读取数据长度：${item.length}</div>\n        <div class="row">请求间隔：${item.pullInterval}秒</div>\n        <div class="row">地址：${item.device.address}</div>\n    </div>\n</div>\n\x3c!-- target: TPL_modbus_view_slavedetail_child --\x3e\n\x3c!-- import: TPL_modbus_view_slavedetail --\x3e\n\n'
}),
define("iot/modbus/analysis/dialog/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n) {
    var r = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    address: function(e) {
                        return e.get("item").device.address.split(":")[0]
                    },
                    host: function(e) {
                        return e.get("item").device.address.split(":")[1]
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = r
}),
define("iot/modbus/analysis/dialog/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_view_slavedetail"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/analysis/dialog/HowUpload", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./HowUploadModel", "./HowUploadView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/analysis/dialog/howUpload.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_gateway_how_upload --\x3e\n<div class="modbus-dialog-form modbus-gateway-how-upload">\n    <div class="tip-grey">\n        如果您选择<b>自己去实现数据上传的逻辑</b>（官方SDK用户不需关注），请使用我们为<b>当前该条轮询规则</b>生成的<b>数据上传信息</b>：\n    </div>\n    <div class="section">\n        <div class="title">\n            <span>数据上传的MQTT信息：</span>\n            <a data-ui-type="Clipboard"\n               data-ui-id="copyMqtt"\n               data-ui-clipboard-text="${mqttJson}"\n               class="ui-button skin-primary-button copy-mqtt">点击复制</a>\n        </div>\n        <div class="json">\n            <div class="level1">{</div>\n            <div class="level2">"endpoint": "${mqttData.endpoint}",</div>\n            <div class="level2">"topic": "${mqttData.topic}",</div>\n            <div class="level2">"user": "${mqttData.user}",</div>\n            <div class="level2">"password": "${mqttData.password}"</div>\n            <div class="level1">}</div>\n        </div>\n    </div>\n    <div class="section">\n        <div class="title">\n            <span>数据上传格式（大小写敏感）：</span>\n            <a data-ui-type="Clipboard"\n               data-ui-id="copyFormat"\n               data-ui-clipboard-text="${formatJson}"\n               class="ui-button skin-primary-button copy-format">点击复制</a>\n        </div>\n        <div class="json">\n            <div class="level1">{</div>\n            <div class="level2">"bdModbusVer": ${formatData.bdModbusVer},</div>\n            <div class="level2">"gatewayid": "${formatData.gatewayid}",</div>\n            <div class="level2">"trantable": "${formatData.trantable}",</div>\n            <div class="level2">"modbus": {</div>\n            <div class="level3">"request": {</div>\n            <div class="level4">"functioncode": ${formatData.modbus.request.functioncode},</div>\n            <div class="level4">"slaveid": ${formatData.modbus.request.slaveid},</div>\n            <div class="level4">"startAddr": ${formatData.modbus.request.startAddr},</div>\n            <div class="level4">"length": ${formatData.modbus.request.length}</div>\n            <div class="level3">},</div>\n            <div class="level3">"response": "${formatData.modbus.response}"</div>\n            <div class="level2">},</div>\n            <div class="level2">"timestamp": "${formatData.timestamp}"</div>\n            <div class="level1">}</div>\n        </div>\n    </div>\n</div>\n\x3c!-- target: TPL_modbus_gateway_how_upload_child --\x3e\n\x3c!-- import: TPL_modbus_gateway_how_upload --\x3e\n'
}),
define("iot/modbus/analysis/dialog/HowUploadModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../../../config", "../../operations"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](o),
    d = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    formatJson: function(e) {
                        var t = e.get("item"),
                        i = {
                            bdModbusVer: 1,
                            gatewayid: e.get("gatewayUuid"),
                            trantable: t.parserObjectUuid,
                            modbus: {
                                request: {
                                    functioncode: t.functionCode,
                                    slaveid: t.device.slaveId,
                                    startAddr: t.startAddress,
                                    length: t.length
                                },
                                response: "Modbus采集到的纯数据部分,每个离散量用00或者01表示,举例: 0b3f0100"
                            },
                            timestamp: "系统当前时间戳，选填"
                        };
                        return e.set("formatData", i),
                        l["default"].JsonToString(i)
                    },
                    mqttJson: function(e) {
                        return r.api.getIotInfor({
                            gatewayUuid: e.get("gatewayUuid"),
                            parserObjectUuid: e.get("item").parserObjectUuid
                        }).then(function(t) {
                            var i = {
                                endpoint: t.endpoint,
                                topic: t.topic,
                                user: t.user,
                                password: t.password
                            };
                            return e.set("mqttData", i),
                            l["default"].JsonToString(i)
                        })
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/analysis/dialog/HowUploadView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./howUpload.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "copyMqtt:aftercopy": function(t) {
                    return e.showToast("复制MQTT信息成功")
                },
                "copyFormat:aftercopy": function(t) {
                    return e.showToast("复制上传格式成功")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_gateway_how_upload"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/analysis/dialog/Upload", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./UploadModel", "./UploadView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("closeDialog", this.toCloseDialog, this)
        },
        n.prototype.toCloseDialog = function() {
            this.fire("closeDialog")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/analysis/dialog/upload.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_analysis_upload --\x3e\n<div class="modbus-dialog-form modbus-analysis-upload">\n    <div class="hint">\n        <div class="title">导入规范：</div>\n        <div class="content">\n            <div class="row">1. 导入文件支持.csv</div>\n            <div class="row">2. 导入表头请参考样例图（地址和记录名称必填）\x3c!-- import: TPL_modbus_upload_tip --\x3e</div>\n            <div class="row">3. 数据类型默认INT，数据长度默认16位</div>\n            <div class="row">4. 如果需要导入自定义属性，请确保CSV列名与自定义属性名相同</div>\n        </div>\n        <a href="http://iot-modbus.gz.bcebos.com/%E7%82%B9%E8%A1%A8%E5%AF%BC%E5%85%A5%E6%A0%B7%E4%BE%8B.csv" target="_blank"><i class="iconfont icon-download"></i>下载标准样例</a>\n    </div>\n    <div class="condition">\n        <input type="checkbox" data-ui-type="CheckBox" data-ui-id="agree" class="agreeCheck">如地址相同是否覆盖</input>\n    </div>\n    <div data-ui-type="WebUploader"\n        data-ui-id="uploader"\n        data-ui-min-file-size="1"\n        data-ui-hint="(附件大小不得超过100M)">上传附件</div>\n</div>\n\x3c!-- target: TPL_modbus_analysis_upload_child --\x3e\n\x3c!-- import: TPL_modbus_analysis_upload --\x3e\n'
}),
define("iot/modbus/analysis/dialog/UploadModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n) {
    var r = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {}
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = r
}),
define("iot/modbus/analysis/dialog/UploadView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./upload.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this);
            this.get("uploader").getNative().option("formData", {
                uuid: this.model.get("uuid"),
                overwrite: !1
            })
        },
        n.prototype.getUIEvents = function() {
            return {
                "agree:change": function(e) {
                    this.get("uploader").getNative().option("formData", {
                        uuid: this.model.get("uuid"),
                        overwrite: e.target.isChecked()
                    })
                },
                "uploader:error": function(e) {
                    "Q_EXCEED_NUM_LIMIT" === e.originalEvent.type && e.target.disable()
                },
                "uploader:uploadAccept": function(e) {
                    var t = e.originalEvent,
                    i = t.object,
                    a = t.ret;
                    if (a && a.success && a.result) {
                        var n = "成功导入" + a.result.count + "条记录！";
                        a.result.errors && a.result.errors.length > 0 && (n += "发生错误：" + a.result.errors[0]),
                        a.result.count > 0 ? this.showToast(n) : this.showToast(n, {
                            messageType: "error"
                        })
                    } else {
                        var r = (i.file.name ? "“ " + i.file.name + " ”": "") + (a && a.message && a.message.global ? a.message.global: "上传失败") + "，请重新上传！";
                        e.target.showValidationMessage("invalid", r),
                        this.showToast(r, {
                            messageType: "error"
                        })
                    }
                    this.fire("closeDialog")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_analysis_upload"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    uploaderTip: {
                        layerWidth: 600
                    },
                    uploader: {
                        uploaderOptions: {
                            formData: {},
                            server: "/api/iot/modbus/trantable/import",
                            chunked: !1,
                            threads: 1,
                            auto: !0,
                            disableGlobalDnd: !0,
                            fileNumLimit: 1,
                            sendAsBinary: !0,
                            fileSingleSizeLimit: 104857600,
                            accept: {
                                title: "Files",
                                extensions: "csv",
                                mimeTypes: ".csv"
                            }
                        }
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/analysis/NewPolling", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./NewPollingModel", "./NewPollingView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("VIEW_SLAVE", this.viewDetail, this),
            this.view.on("DELETE_SLAVE", this.deleteSlave, this)
        },
        n.prototype.viewDetail = function(e) {
            var t = this.view.get("table").datasource[e.args];
            c["default"].viewSlaveDetail.call(this, {
                parentAction: this,
                item: t
            })
        },
        n.prototype.deleteSlave = function(e) {
            var t = this.view.get("table").datasource[e.args],
            i = this.model,
            a = this.view,
            n = this;
            a.waitConfirm({
                title: "删除此轮询设置",
                content: "是否确认删除？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                i.deleteSlave({
                    uuid: t.uuid
                },
                "ENABLED").then(function() {
                    return a.showToast("删除轮询设置成功！")
                }).then(function() {
                    return n.reload()
                }).fail(function() {
                    return a.showToast("删除轮询设置失败！")
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return u["default"]
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/analysis/newPolling.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_analysis_new_polling --\x3e\n<div class="modbus-main-wrap modbus-analysis-new-polling main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/modbus/analysis">物解析 - 解析项目</a>\n            <span class="divider">/</span>\n            <span class="active">解析设置-Modbus通讯地址表</span>\n        </p>\n\n        <div class="instance-info">\n            <h1>${name}</h1>\n            <span class="status status-${stateStatus.css}">${stateStatus.text}</span>\n        </div>\n        <div class="create-content">\n            <ul class="ui-tab-navigator skin-sandwich-tab-navigator">\n                <li class="ui-tab-item skin-sandwich-tab-item">\n                    <a href="#/iot/modbus/analysis/settings~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}">Modbus通讯地址表</a>\n                </li>\n                <li class="ui-tab-item skin-sandwich-tab-item ui-tab-item-active skin-sandwich-tab-item-active">\n                    <a href="#/iot/modbus/analysis/setting/polling~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}">轮询请求设置</a>\n                </li>\n            </ul>\n\n            <form data-ui-type="Form" data-ui-id="form"\n                      data-ui-auto-validate="true">\n                <div class="detail-parts-table">\n                    <dl class="detail-create">\n                        <dt></dt>\n                        <dd>\n                            <div class="detail-cell">\n                                <label><span class="input-required">*</span>子设备ID：</label>\n                                <div data-ui-type="Tab"\n                                    data-ui-id="Tab"\n                                    data-ui-orientation="horizontal"\n                                    data-ui-width="600"\n                                    class="inner-tab">\n                                    <ul data-role="navigator" class="state-hide">\n                                        <li data-for="all">ALL(全部)</li>\n                                        <li data-for="customized">自定义</li>\n                                    </ul>\n                                    <div id="all"></div>\n                                    <div id="customized">\n                                        <div class="stats">\n                                            <div class="text">已选择<span>0</span>个设备</div>\n                                            <div class="text error">请选择子设备ID</div>\n                                        </div>\n                                        <div data-ui-type="Table"\n                                             data-ui-id="pollingDevice"\n                                             data-ui-datasource="@tableData"\n                                             data-ui-order-by="@orderBy" data-ui-order="@order"\n                                             data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                                             data-ui-required="true"\n                                             data-ui-extension-command-type="Command"\n                                             data-ui-extension-tableedit-type="TableEdit"\n                                             data-ui-extension-tableex-type="TableEx">\n                                        </div>\n                                        <span class="input-required"></span>\n                                    </div>\n                                </div>\n                            </div>\n                        </dd>\n                        <dd>\n                            <div class="detail-cell">\n                                <label><span class="input-required">*</span>操作码：</label>\n                                <span data-ui-type="Select"\n                                      data-ui-width="250"\n                                      data-ui-name="functionCode"\n                                      data-ui-required="true"\n                                      data-ui-required-error-message="请选择语言"\n                                      data-ui-selected-index="-1"\n                                      data-ui-datasource="@functionCode"\n                                      data-ui-id="functionCode">\n                                </span>\n                            </div>\n                        </dd>\n                        <dd>\n                            <div class="detail-cell">\n                                <label><span class="input-required">*</span>开始地址：</label>\n                                <span>\n                                    <input data-ui-type="TextBox"\n                                           data-ui-name="startAddress"\n                                           data-ui-id="startAddress"\n                                           data-ui-width="100"\n                                           data-ui-required="true"\n                                           data-ui-placeholder="十进制的数值"\n                                           data-ui-value="" />\n                                </span>\n                            </div>\n                        </dd>\n                        <dd>\n                            <div class="detail-cell">\n                                <label><span class="input-required">*</span>读取数据长度：</label>\n                                <span>\n                                    <input data-ui-type="TextBox"\n                                           data-ui-name="length"\n                                           data-ui-id="length"\n                                           data-ui-width="100"\n                                           data-ui-required="true"\n                                           data-ui-placeholder="1-256"\n                                           data-ui-value="" />\n                                </span>\n                            </div>\n                        </dd>\n                        <dd>\n                            <div class="detail-cell">\n                                <label><span class="input-required">*</span>请求间隔：</label>\n                                <span>\n                                    <input data-ui-type="TextBox"\n                                           data-ui-name="pullInterval"\n                                           data-ui-id="pullInterval"\n                                           data-ui-width="100"\n                                           data-ui-required="true"\n                                           data-ui-placeholder="300"\n                                           data-ui-value="" />\n                                    <span>秒(s)</span>\n                                </span>\n                            </div>\n                        </dd>\n                        <dd>\n                            <div class="detail-cell submit-buttons">\n                                <button data-ui="type:Button;id:submit;skin:primary"\n                                        class="slavepolicy-create">提交</button>\n                                <a data-ui="type:Button;"\n                                   href="#/iot/modbus/analysis/setting/polling~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}"\n                                   class="slavepolicy-create">取消</a>\n                            </div>\n                        </dd>\n                    </dl>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/analysis/NewPollingModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.deleteSlave = function(e) {
            return o.api.deleteSlave(e)
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.createSlavePolicy
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    stateStatus: function(e) {
                        return {
                            css: u["default"].status[e.get("rawState")].css,
                            text: u["default"].status[e.get("rawState")].text
                        }
                    },
                    tableData: function(e) {
                        var t = {
                            gatewayUuid: e.get("gatewayUuid"),
                            order: "desc",
                            orderBy: "createTime",
                            pageNo: 1,
                            pageSize: 250
                        };
                        return o.api.getGatewaySublist(t).then(function(e) {
                            return d["default"].each(e.result,
                            function(e) {
                                e.ipAddr = e.address.split(":")[0],
                                e.ipHost = e.address.split(":")[1]
                            }),
                            e.result
                        })
                    },
                    functionCode: function() {
                        return [{
                            text: "03-保持寄存器 (Holding Register)",
                            value: "3"
                        },
                        {
                            text: "01-线圈状态 (Coil Status)",
                            value: "1"
                        },
                        {
                            text: "02 输入状态 (Input Status) (1x)",
                            value: "2"
                        },
                        {
                            text: "04 输入寄存器  (Input Register) (3x)",
                            value: "4"
                        }]
                    }
                }
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: o.pageSize,
                    addressStart: 4
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/analysis/NewPollingView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./newPolling.tpl", "jquery", "babel-runtime/helpers/interop-require-default", "underscore", "bat-ria/mvc/FormView", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = r["default"](n),
    u = r["default"](o),
    c = r["default"](s),
    p = r["default"](l),
    f = [{
        title: "子设备ID",
        field: "code",
        width: 50,
        content: "code"
    },
    {
        title: "从站(slave)",
        field: "slaveId",
        width: 10,
        content: "slaveId"
    },
    {
        title: "子设备描述",
        field: "description",
        width: 50,
        content: "description"
    },
    {
        title: "      地址",
        field: "address",
        width: 20,
        content: "address"
    }],
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            return {
                "pollingDevice:select": this.updateSelection,
                "functionCode:change": this.selectChangeHandler
            }
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            d["default"](".inner-tab").on("click",
            function(e) {
                d["default"]("#customized .text.error").hide()
            })
        },
        n.prototype.getFormData = function() {
            var e = a.prototype.getFormData.call(this);
            e.deviceUuids = [];
            var t = [];
            if (t = 0 === this.get("Tab").activeIndex ? this.model.get("tableData") : this.get("pollingDevice").getSelectedItems(), u["default"].each(t,
            function(t) {
                e.deviceUuids.push(t.uuid)
            }), e.parserObjectUuid = this.model.get("parserObjectUuid"), t.length > 0) return e
        },
        n.prototype.bindEvents = function() {
            a.prototype.bindEvents.call(this);
            var e = this.get("form");
            e && e.on("beforevalidate", this.validateHandler, this)
        },
        n.prototype.validateHandler = function(e) {
            var t = this.get("Tab").activeIndex,
            i = this.get("pollingDevice").getSelectedItems();
            1 === t && i.length < 1 && (e.preventDefault(), d["default"]("#customized .text.error").show())
        },
        n.prototype.updateSelection = function() {
            var e = this.get("pollingDevice").getSelectedItems();
            d["default"]("#customized .stats span").text(e.length),
            e.length > 0 && d["default"]("#customized .text.error").hide()
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_analysis_new_polling"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    pollingDevice: {
                        sortable: !0,
                        columnResizable: !0,
                        fields: f,
                        select: "multi",
                        noDataHtml: p["default"].noDataHtml
                    },
                    startAddress: {
                        pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
                    },
                    length: {
                        pattern: /^([1-9])|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-6])$/
                    },
                    pullInterval: {
                        pattern: /^[1-9]\d*|0$/
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = m
}),
define("iot/modbus/analysis/Polling", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "./PollingModel", "./PollingView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("VIEW_SLAVE", this.viewDetail, this),
            this.view.on("DELETE_SLAVE", this.deleteSlave, this),
            this.view.on("CREATE_POLLING", this.create, this),
            this.view.on("HOW_UPLOAD", this.howUpload, this)
        },
        n.prototype.create = function(e) {
            this.redirect("/iot/modbus/analysis/setting/create~parserObjectUuid=" + this.model.get("parserObjectUuid") + "&name=" + this.model.get("name") + "&rawState=" + this.model.get("rawState") + "&gatewayUuid=" + this.model.get("gatewayUuid"))
        },
        n.prototype.howUpload = function(e) {
            var t = this.view.get("table").datasource[e.args];
            c["default"].viewHowUpload.call(this, {
                parentAction: this,
                item: t,
                gatewayUuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype.viewDetail = function(e) {
            var t = this.view.get("table").datasource[e.args];
            c["default"].viewSlaveDetail.call(this, {
                parentAction: this,
                item: t
            })
        },
        n.prototype.deleteSlave = function(e) {
            var t = this.view.get("table").datasource[e.args],
            i = this.model,
            a = this.view,
            n = this;
            a.waitConfirm({
                title: "删除此轮询设置",
                content: "是否确认删除？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                i.deleteSlave({
                    uuid: t.uuid
                },
                "ENABLED").then(function() {
                    return a.showToast("删除轮询设置成功！")
                }).then(function() {
                    return n.reload()
                }).fail(function() {
                    return a.showToast("删除轮询设置失败！")
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return u["default"]
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/analysis/polling.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_analysis_polling --\x3e\n<div class="modbus-main-wrap modbus-analysis-settings main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/modbus/analysis">物解析 - 解析项目</a>\n            <span class="divider">/</span>\n            <span class="active">解析设置-Modbus通讯地址表</span>\n        </p>\n\n        <div class="instance-info">\n            <h1>${name}</h1>\n            <span class="status status-${stateStatus.css}">${stateStatus.text}</span>\n        </div>\n        <div class="list-content">\n            <ul class="ui-tab-navigator skin-sandwich-tab-navigator">\n                <li class="ui-tab-item skin-sandwich-tab-item">\n                    <a href="#/iot/modbus/analysis/settings~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}">Modbus通讯地址表</a>\n                </li>\n                <li class="ui-tab-item skin-sandwich-tab-item ui-tab-item-active skin-sandwich-tab-item-active">\n                    <a href="#/iot/modbus/analysis/setting/polling~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}">轮询请求设置</a>\n                </li>\n            </ul>\n            <div class="table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="createBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建轮询设置</button>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/analysis/PollingModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../../config", "./config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.deleteSlave = function(e) {
            return r.api.deleteSlave(e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    stateStatus: function(e) {
                        return {
                            css: l["default"].status[e.get("rawState")].css,
                            text: l["default"].status[e.get("rawState")].text
                        }
                    },
                    deviceData: function(e) {
                        var t = {
                            gatewayUuid: e.get("gatewayUuid"),
                            order: "desc",
                            orderBy: "createTime",
                            pageNo: 1,
                            pageSize: 250
                        };
                        return r.api.getGatewaySublist(t)
                    }
                }
            }
        },
        {
            key: "listRequester",
            get: function() {
                return r.api.getSlaveList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize,
                    addressStart: 4
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/analysis/PollingView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./polling.tpl", "inf-ria/mvc/ListView", "babel-runtime/helpers/interop-require-default", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = r["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return d["default"].getListEvents({
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "createBtn:click": function(t) {
                    return e.fire("CREATE_POLLING", t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "从站(slave)",
                field: "slaveId",
                width: 10,
                content: function(e, t) {
                    return e.device.slaveId
                }
            },
            {
                title: "子设备ID",
                field: "code",
                width: 50,
                content: function(e, t) {
                    return e.device.code
                }
            },
            {
                title: "子设备描述",
                field: "description",
                width: 50,
                content: function(e, t) {
                    return e.device.description
                }
            },
            {
                title: "操作码",
                field: "functionCode",
                width: 20,
                content: "functionCode"
            },
            {
                title: "请求间隔(秒)",
                field: "pullInterval",
                width: 35,
                content: "pullInterval"
            },
            {
                title: "操作",
                width: 130,
                field: "operation",
                content: function(e, t) {
                    return '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="VIEW_SLAVE"\n                                    data-command-args=\'' + t + '\'>详情</button>\n                            <button class="cmd-button"\n                                    data-command="HOW_UPLOAD"\n                                    data-command-args=\'' + t + '\'>上传格式</button>\n                            <button class="cmd-button"\n                                    data-command="DELETE_SLAVE"\n                                    data-command-args=\'' + t + "'>删除</button>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this);
            this.model.get("deviceData").result.length < 1 && this.get("createBtn").set("disabled", !0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_analysis_polling"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: u["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/analysis/Settings", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "./SettingsModel", "./SettingsView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_TRANTABLE", this.create, this),
            this.view.on("DELETE", this["delete"], this),
            this.view.on("UPDATE_STATE", this.updateState, this),
            this.view.on("EDIT_TRANTABLE", this.editTranstable, this),
            this.view.on("BATCH_UPLOAD", this.batchUpload, this),
            this.view.on("EXPORT_AS_CSV", this.exportAsCsv, this)
        },
        n.prototype.batchUpload = function() {
            var e = this;
            this.view.waitActionDialog({
                title: "导入文件",
                width: 750,
                needFoot: !1,
                url: "/iot/modbus/analysis/upload",
                actionOptions: {
                    parentAction: this,
                    uuid: this.model.get("parserObjectUuid")
                }
            }).then(function(t) {
                t.target.getAction().on("closeDialog",
                function() {
                    e.reload()
                })
            })
        },
        n.prototype.exportAsCsv = function() {
            var e = "/api/iot/modbus/trantable/export/" + this.model.get("parserObjectUuid");
            window.open(e, "_self")
        },
        n.prototype.updateState = function(e) {
            var t = this;
            this.model.updateTrantable({
                uuid: e.uuid,
                state: e.state
            }).then(function() {
                return t.view.showToast(e.text + "通讯记录成功！")
            }).then(function() {
                return t.reload()
            }).fail(function() {
                return t.showToast(e.text + "通讯记录失败！")
            })
        },
        n.prototype.editTranstable = function(e) {
            c["default"].createTrantable.call(this, {
                parentAction: this,
                parserObjectUuid: this.model.get("parserObjectUuid"),
                addressType: this.view.get("addressType").getValue(),
                item: e
            })
        },
        n.prototype.create = function() {
            c["default"].createTrantable.call(this, {
                parentAction: this,
                parserObjectUuid: this.model.get("parserObjectUuid"),
                addressType: this.view.get("addressType").getValue()
            })
        },
        n.prototype["delete"] = function(e) {
            var t = this.model,
            i = this.view,
            a = this;
            t.deleteTrantable({
                uuid: e.uuid
            }).then(function() {
                return i.showToast("删除通讯记录成功！")
            }).then(function() {
                return a.reload()
            }).fail(function() {
                return i.showToast("删除通讯记录失败！")
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return u["default"]
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/analysis/settings.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_analysis_settings --\x3e\n<div class="modbus-main-wrap modbus-analysis-settings main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/modbus/analysis">物解析 - 解析项目</a>\n            <span class="divider">/</span>\n            <span class="active">解析设置-Modbus通讯地址表</span>\n        </p>\n\n        <div class="instance-info">\n            <h1>${name}</h1>\n            <span class="status status-${stateStatus.css}">${stateStatus.text}</span>\n        </div>\n        <div class="list-content">\n            <ul class="ui-tab-navigator skin-sandwich-tab-navigator">\n                <li class="ui-tab-item skin-sandwich-tab-item ui-tab-item-active skin-sandwich-tab-item-active">\n                    <a href="#/iot/modbus/analysis/settings~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}">Modbus通讯地址表</a>\n                </li>\n                <li class="ui-tab-item skin-sandwich-tab-item">\n                    <a href="#/iot/modbus/analysis/setting/polling~parserObjectUuid=${parserObjectUuid}&name=${name}&rawState=${rawState}&gatewayUuid=${gatewayUuid}">轮询请求设置</a>\n                </li>\n            </ul>\n\n            <div class="table-full-wrap">\n                <span data-ui-id="addressType" data-ui-datasource="@addressStartType"\n                    data-ui-type="RadioSelect" class="address-select"\n                    date-ui-value="0"></span>\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="createBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建记录</button>\n                        <button data-ui-id="uploadBtn"\n                                data-ui-type="Button"\n                                data-ui-skin="upload">批量导入</button>\n                        <button data-ui-id="exportBtn"\n                                data-ui-type="Button"\n                                data-ui-skin="upload">批量导出</button>\n                        <span>\n                        解析服务根据通讯地址表的内容，将Modbus消息解析成可直接使用的数据和内容。</span>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/analysis/SettingsModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../../config", "./config", "underscore"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](o),
    u = n["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.retrieveListPage = function() {
            var e = this;
            return a.prototype.retrieveListPage.call(this).then(function(t) {
                return t.tableData = e.handleListData(t.tableData),
                t
            })
        },
        n.prototype.handleListData = function(e) {
            return u["default"].map(e,
            function(e) {
                return e.userPropertiesDisplay = e.user_properties ? JSON.stringify(e.user_properties).replace(/\"/g, "") : "",
                e
            }),
            e
        },
        n.prototype.deleteTrantable = function(e) {
            return r.api.deleteTrantable(e)
        },
        n.prototype.updateTrantable = function(e) {
            return r.api.updateTrantable(e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    stateStatus: function(e) {
                        return {
                            css: d["default"].status[e.get("rawState")].css,
                            text: d["default"].status[e.get("rawState")].text
                        }
                    },
                    addressStartType: function() {
                        return [{
                            text: "03 保持寄存器(Holding Register) (4x)",
                            value: "3"
                        },
                        {
                            text: "01 线圈状态(Coil Status) (0x)",
                            value: "1"
                        },
                        {
                            text: "02 输入状态 (Input Status) (1x)",
                            value: "2"
                        },
                        {
                            text: "04 输入寄存器  (Input Register) (3x)",
                            value: "4"
                        }]
                    }
                }
            }
        },
        {
            key: "listRequester",
            get: function() {
                return r.api.getTrantableList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize,
                    addressStart: 4
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/analysis/SettingsView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./settings.tpl", "inf-ria/mvc/ListView", "babel-runtime/helpers/interop-require-default", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = r["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return d["default"].getListEvents({
                "createBtn:click": function(t) {
                    return e.fire("CREATE_TRANTABLE", t)
                },
                "uploadBtn:click": function(t) {
                    return e.fire("BATCH_UPLOAD", t)
                },
                "exportBtn:click": function(t) {
                    return e.fire("EXPORT_AS_CSV", t)
                },
                "table:command": this.handleTableCommand,
                "addressType:change": this.submitSearch
            })
        },
        n.prototype.getSearchArgs = function() {
            var e = a.prototype.getSearchArgs.call(this),
            t = this.get("addressType").getValue();
            return 1 == +t ? e.addressStart = 0 : 3 == +t ? e.addressStart = 4 : 2 == +t ? e.addressStart = 1 : 4 == +t && (e.addressStart = 3),
            e.name = this.model.get("name"),
            e.parserObjectUuid = this.model.get("parserObjectUuid"),
            e.rawState = this.model.get("rawState"),
            e.gatewayUuid = this.model.get("gatewayUuid"),
            e
        },
        n.prototype.handleTableCommand = function(e) {
            var t = this,
            i = this.get("table").datasource[e.args];
            "DELETE" === e.name ? t.waitConfirm("是否删除通讯记录", "删除通讯记录").then(function() {
                t.fire(e.name, {
                    uuid: i.uuid
                })
            }) : "UPDATE_STATE" === e.name ?
            function() {
                var a = "ENABLED" === i.state ? "不解析": "解析",
                n = "ENABLED" === i.state ? "DISABLED": "ENABLED";
                t.waitConfirm("是否" + a + "通讯记录", a + "通讯记录").then(function() {
                    t.fire(e.name, {
                        uuid: i.uuid,
                        state: n,
                        text: a
                    })
                })
            } () : t.fire(e.name, i)
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "地址(十进制)",
                field: "address",
                sortable: !0,
                width: 70,
                content: "address"
            },
            {
                title: "显示名称",
                field: "name",
                width: 60,
                content: "name"
            },
            {
                title: "BIT位",
                field: "bit",
                width: 15,
                content: "bit"
            },
            {
                title: "数据类型",
                field: "kind",
                width: 33,
                content: "kind"
            },
            {
                title: "数据长度",
                field: "length",
                width: 33,
                content: "length"
            },
            {
                title: "单位",
                field: "unit",
                width: 20,
                content: "unit"
            },
            {
                title: "量程上限(RH)",
                field: "rh",
                width: 25,
                content: "rh"
            },
            {
                title: "量程下限(RL)",
                field: "rl",
                width: 25,
                content: "rl"
            },
            {
                title: "计算公式",
                field: "formula",
                width: 65,
                content: function(e) {
                    return '<div data-ui-type="Tip"\n                            data-ui-content="' + e.formula + '"\n                            class="formula-tip"></div>'
                }
            },
            {
                title: "其他",
                field: "user_properties",
                width: 65,
                content: function(e) {
                    return '<div data-ui-type="Tip"\n                            data-ui-content="' + e.userPropertiesDisplay + '"\n                            class="inline-tip"></div>'
                }
            },
            {
                title: "操作",
                width: 100,
                field: "operation",
                content: function(e, t) {
                    return '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="UPDATE_STATE"\n                                    data-command-args=\'' + t + "'>" + ("ENABLED" === e.state ? "不解析": "解析") + '</button>\n                            <button class="cmd-button"\n                                    data-command="EDIT_TRANTABLE"\n                                    data-command-args=\'' + t + '\'>编辑</button>\n                            <button class="cmd-button"\n                                    data-command="DELETE"\n                                    data-command-args=\'' + t + "'>删除</button>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this),
            0 == +this.model.get("addressStart") ? this.get("addressType").setSelectedIndex(1) : 4 == +this.model.get("addressStart") ? this.get("addressType").setSelectedIndex(0) : 1 == +this.model.get("addressStart") ? this.get("addressType").setSelectedIndex(2) : 3 == +this.model.get("addressStart") && this.get("addressType").setSelectedIndex(3)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_analysis_settings"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        extTableEx: ["formula", "user_properties"],
                        noDataHtml: u["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/analysis/Verify", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "jquery", "babel-runtime/helpers/interop-require-default", "bat-ria/mvc/BaseAction", "./VerifyModel", "./VerifyView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("VERIFY_DATA", this.verify, this)
        },
        n.prototype.verify = function() {
            var e = this.view,
            t = this.model,
            i = {
                request: e.get("request").getValue(),
                response: e.get("response").getValue(),
                trantable: t.get("uuid")
            }; (e.get("request").validate() || e.get("response").validate()) && t.verifyData(i).then(function(t) {
                d["default"](".panel .text").html(f["default"].JsonToString(t)),
                e.showToast("数据验证成功！")
            }).fail(function() {
                return e.showToast("数据验证失败！")
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return c["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/modbus/analysis/verify.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_analysis_verify --\x3e\n<div class="modbus-main-wrap modbus-analysis-verify main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/modbus/analysis">物解析 - 解析项目</a>\n            <span class="divider">/</span>\n            <span class="active">数据验证</span>\n        </p>\n\n        <div class="instance-info">\n            <h1>${name}</h1>\n            <span class="status status-${stateStatus.css}">${stateStatus.text}</span>\n        </div>\n        <div class="list-content">\n            <div class="main-content">\n                <div class="section">\n                    <h3>Modbus验证</h3>\n                    <div class="fillup">\n                        <label><span class="input-required">*</span>Modbus请求消息：</label>\n                        <textarea data-ui-type="TextBox"\n                             data-ui-name="request"\n                             data-ui-value=""\n                             data-ui-width="550"\n                             data-ui-required="true"\n                             data-ui-id="request">\n                        </textarea>\n                        <label><span class="input-required">*</span>Modbus响应消息：</label>\n                        <textarea data-ui-type="TextBox"\n                             data-ui-name="response"\n                             data-ui-value=""\n                             data-ui-width="550"\n                             data-ui-required="true"\n                             data-ui-id="response">\n                        </textarea>\n                        <span data-ui-id="verify"\n                              data-ui-type="Button"\n                              class="btn btn-action">验证</span>\n                    </div>\n                </div>\n                <div class="log">\n                    <label>最新收到的数据 (最近1条）：</label>\n                    <div class="panel">\n                        <div class="text"></div>\n                    </div>\n                    <span data-ui-id="output"\n                          data-ui-type="Button"\n                          class="btn btn-action">导出</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/analysis/VerifyModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../../config", "./config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.verifyData = function(e) {
            return r.api.verifyData(e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    stateStatus: function(e) {
                        return {
                            css: l["default"].status[e.get("rawState")].css,
                            text: l["default"].status[e.get("rawState")].text
                        }
                    }
                }
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {}
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/analysis/VerifyView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./verify.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "verify:click": function(t) {
                    return e.fire("VERIFY_DATA", t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_analysis_verify"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    request: {
                        width: 550,
                        height: 85
                    },
                    response: {
                        width: 550,
                        height: 85
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/common.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_search --\x3e\n<span class="ui-group ui-search-group">\n    <input class="search-box"\n           data-ui-type="TextBox"\n           data-ui-name=""\n           data-ui-id="keyword"\n           data-ui-placeholder="${hint}"\n           data-ui-value="@keyword"\n           data-ui-width="250" />\n    <button data-ui-type="Button" data-ui-id="searchBtn"></button>\n</span>\n\n'
}),
define("iot/modbus/common/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/modbus/common/dialog/Deploy",
        path: "/iot/modbus/deploy_status"
    }]);
    module.exports = {}
}),
define("iot/modbus/common/dialog/Deploy", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./DeployModel", "./DeployView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/common/dialog/deploy.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_deploy --\x3e\n<div class="modbus-dialog-form modbus-deploy">\n    \x3c!-- for: ${item} as ${d} --\x3e\n\t    <div class="code">\n\t    \t"网关ID":"${d.gatewayCode}",\n\t    \t\x3c!-- if: ${d.result} --\x3e成功\n\t    \t\x3c!-- else --\x3e失败\n            \x3c!-- /if --\x3e\n\t    </div>\n    \x3c!-- /for --\x3e\n</div>\n\x3c!-- target: TPL_modbus_deploy_child --\x3e\n\x3c!-- import: TPL_modbus_deploy --\x3e\n'
}),
define("iot/modbus/common/dialog/DeployModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a(e) {
            t["default"](this, a),
            i.call(this, e)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/modbus/common/dialog/DeployView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./deploy.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_deploy"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/config", ["exports", "module"],
function(exports, module) {
    module.exports = {
        idRegExp: /^[a-zA-Z\d]+$/,
        ipRegExp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        portRegExp: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
        noChineseRegExp: /^[^\u4e00-\u9fa5]$/,
        intRegExp: /^(0|[1-9]\d*)$/
    }
}),
define("iot/modbus/landing/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/modbus/landing/Landing",
        path: "/iot/modbus/landing"
    }]),
    module.exports = {}
}),
define("iot/modbus/landing/Landing", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./LandingModel", "./LandingView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("START_USING", this.startUsing, this)
        },
        n.prototype.startUsing = function() {
            this.redirect("/iot/modbus/manage")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/landing/landing.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_landing --\x3e\n<div class="modbus-notify main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物解析</span>\n        </p>\n        <div class="list-content main-view">\n            <h2 class="no-bottom-border">物解析简介</h2>\n            <div class="main-content">\n                <div class="description">\n                    在云端解析和计算各种设备中的数据，降低网关成本并节约数据流量。可以随时调整解析规则以适应业务变化。\n                </div>\n                <div class="operation-wrap" data-follow-thead="table">\n                    <div class="buttons-wrap">\n                        <button data-ui-id="startUsing"\n                                data-ui-type="Button"\n                                data-ui-skin="create">开始使用</button>\n                    </div>\n                </div>\n                <div class="line-seperator"></div>\n                <div class="section">\n                    <div class="section-header">\n                        <h2>物解析使用流程</h2>\n                    </div>\n                    <div class="illustration">\n                        <div class="article">\n                            <div class="pic1"></div>\n                            <div class="title">配置网关连接</div>\n                            <div class="define">使用物解析 SDK在厂区网关端配置数据接入</div>\n                            <a href="https://cloud.baidu.com/doc/Parser/GUIGettingStarted.html#.E5.AE.89.E8.A3.85IoT.20Edge.20SDK" target="_blank">查看详情></a>\n                        </div>\n                        <div class="arrow-next">\n                            <img src="/iotre/src/img/landing/arrow-next.png"/>\n                        </div>\n                        <div class="article">\n                            <div class="pic2"></div>\n                            <div class="title">云端创建网关</div>\n                            <div class="define">创建网关和网关子设备（支持TCP和RTU模式）</div>\n                            <a href="https://cloud.baidu.com/doc/Parser/GUIGettingStarted.html#.E7.AE.A1.E7.90.86.E7.BD.91.E5.85.B3.E8.AE.BE.E5.A4.87" target="_blank">查看详情></a>\n                        </div>\n                        <div class="arrow-next">\n                            <img src="${images.arrowUrl}"/>\n                        </div>\n                        <div class="article">\n                            <div class="pic3"></div>\n                            <div class="title">填写解析项目</div>\n                            <div class="define">设置带解析的数据来源、通讯地址、轮询方法和数据存储位置</div>\n                            <a href="https://cloud.baidu.com/doc/Parser/GUIGettingStarted.html#.E8.A7.A3.E6.9E.90.E9.A1.B9.E7.9B.AE" target="_blank">查看详情></a>\n                        </div>\n                        <div class="arrow-next">\n                            <img src="${images.arrowUrl}"/>\n                        </div>\n                        <div class="article">\n                            <div class="pic4"></div>\n                            <div class="title">验证解析结果</div>\n                            <div class="define">查看解析结果是否符合期望</div>\n                            <a href="https://cloud.baidu.com/doc/Parser/GUIGettingStarted.html#.E8.A7.A3.E6.9E.90.E9.A1.B9.E7.9B.AE" target="_blank">查看详情></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="right-siderbar list-content">\n            <div class="wrapper">\n                <div class="right-siderbar-header">相关产品</div>\n                <div class="product-list">\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iot"></i></span>\n                        <a href="https://cloud.baidu.com/product/iot.html" target="_blank">\n                            <div class="title">物接入 IoT Hub</div>\n                            <div class="desp">快速建立设备与云端双向连接的、全托管服务</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iotdm"></i></span>\n                        <a href="https://cloud.baidu.com/product/iotdm.html" target="_blank">\n                            <div class="title">物管理</div>\n                            <div class="desp">智能、强大的设备管理平台</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iotre"></i></span>\n                        <a href="https://cloud.baidu.com/product/re.html" target="_blank">\n                            <div class="title">规则引擎</div>\n                            <div class="desp">灵活定义各种联动规则，与云端服务无缝连接</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-tsdb"></i></span>\n                        <a href="https://cloud.baidu.com/product/tsdb.html" target="_blank">\n                            <div class="title">时序数据库</div>\n                            <div class="desp">存储时间序列数据的高性能数据库</div>\n                        </a>\n                    </div>\n                </div>\n            </div>\n            <div class="line-seperator"></div>\n            <div class="help">\n                <div class="title">用户指南</div>\n                <a href="https://cloud.baidu.com/doc/Parser/index.html" target="_blank">帮助文档></a>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/landing/LandingModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n) {
    var r = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    images: function(e) {
                        return {
                            arrowUrl: require.toUrl("./img/arrow.png")
                        }
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = r
}),
define("iot/modbus/landing/LandingView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./landing.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "startUsing:click": function(t) {
                    return e.fire("START_USING", t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_landing"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/manage-v2/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/modbus/manage-v2/Manage",
        path: "/iot/modbus/manage-v2"
    },
    {
        type: "iot/modbus/manage-v2/dialog/Create",
        path: "/iot/modbus/gateway/create"
    },
    {
        type: "iot/modbus/manage-v2/Sub",
        path: "/iot/modbus/manage-v2/sublist"
    },
    {
        type: "iot/modbus/manage-v2/dialog/Createsub",
        path: "/iot/modbus/device/createv2"
    },
    {
        type: "iot/modbus/manage-v2/dialog/Password",
        path: "/iot/modbus/gateway/passwordv2"
    }]),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何网关</br>", "点击左上角按钮立即创建", "</p></div>"].join(""),
        status: {
            ENABLED: {
                text: "在线",
                css: "green",
                action: "DISABLE",
                actionTxt: "禁用"
            },
            OFFLINE: {
                text: "离线",
                css: "grey"
            },
            DISABLED: {
                text: "禁用",
                css: "red",
                action: "ENABLE",
                actionTxt: "恢复"
            }
        },
        notes: {
            NONE: "无",
            ODD: "奇",
            EVEN: "偶"
        }
    }
}),
define("iot/modbus/manage-v2/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("网关创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "网关创建成功！"
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage-v2/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_gateway_v2 --\x3e\n<div class="modbus-dialog-form modbus-gateway-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>网关ID：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="code"\n                        data-ui-id="code"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>网关描述：</label>\n                <div class="form-value">\n                    <textarea data-ui-type="TextBox"\n                              data-ui-id="description"\n                              data-ui-name="description"\n                              data-ui-max-length="1000">\n                    </textarea>\n                    <div class="verify">\n                        <input type="checkbox"\n                               data-ui-id="useSsl"\n                               data-ui-name="useSsl"\n                               data-ui-type="CheckBox" />\n                        <label class="test-name">使用加密链接（SSL）</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_gateway_v2_child --\x3e\n\x3c!-- import: TPL_modbus_create_gateway_v2 --\x3e\n'
}),
define("iot/modbus/manage-v2/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "../../../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.filterData = function(e) {
            return e.useSsl ? e.useSsl = !0 : e.useSsl = !1,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return r.api.createGateway
            }
        },
        {
            key: "datasource",
            get: function() {
                return {}
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/modbus/manage-v2/dialog/Createsub", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreatesubModel", "./CreatesubView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = "创建";
            this.model.get("item") && (e = "编辑"),
            this.toastMessage = "网关子设备" + e + "成功！"
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field);
            var t = "创建";
            this.model.get("item") && (t = "编辑"),
            this.view.showToast("网关子设备" + t + "失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage-v2/dialog/createsub.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_device_v2 --\x3e\n<div class="modbus-dialog-form modbus-device-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label>选择模式：</label>\n                <div class="form-value">\n                    <esui-select class="inline-select"\n                        data-ui-id="mode"\n                        data-ui-name="mode"\n                        data-ui-width="200"\n                        data-ui-datasource="@mode"></esui-select>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>子设备ID：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="code"\n                         \x3c!-- if: ${editing} --\x3e\n                         data-ui-read-only="true"\n                         \x3c!-- /if --\x3e\n                         data-ui-value="${item.code}"\n                         data-ui-id="code"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>从站(slave)：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="slaveId"\n                         data-ui-value="${item.slaveId}"\n                         data-ui-id="slaveId"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label>描述：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="description"\n                         data-ui-value="${item.description}"\n                         data-ui-id="description"></div>\n                </div>\n            </div>\n            <div data-ui-type="Panel"\n                 data-ui-id="tcpPanel"\n                 class="tcp-panel">\n                <div class="form-row">\n                    <label><i>＊</i>IP地址：</label>\n                    <div class="form-value">\n                        <div data-ui-type="TextBox"\n                             data-ui-name="address"\n                             data-ui-value="${item.address}"\n                             data-ui-id="address"></div>\n                    </div>\n                </div>\n                <div class="form-row">\n                    <label><i>＊</i>端口号：</label>\n                    <div class="form-value">\n                        <div data-ui-type="TextBox"\n                             data-ui-name="portNum"\n                             \x3c!-- if: ${item.portNum} --\x3e\n                             data-ui-value="${item.portNum}"\n                             \x3c!-- else --\x3e\n                             data-ui-value="502"\n                             \x3c!-- /if --\x3e\n                             data-ui-id="portNum"></div>\n                    </div>\n                </div>\n            </div>\n            <div data-ui-type="Panel"\n                 data-ui-id="rtuPanel"\n                 class="rtu-panel">\n                <div class="form-row">\n                    <label><i>＊</i>串口号：</label>\n                    <div class="form-value">\n                        <div data-ui-type="TextBox"\n                             data-ui-name="rtuAddress"\n                             data-ui-required="true"\n                             data-ui-value="${item.rtuAddress}"\n                             data-ui-id="rtuAddress"></div>\n                    </div>\n                </div>\n                <div class="form-row">\n                    <label><i>＊</i>波特率：</label>\n                    <div class="form-value">\n                        <esui-select class="inline-select"\n                            data-ui-id="baud"\n                            data-ui-name="baud"\n                            data-ui-width="200"\n                            data-ui-required="true"\n                            data-ui-value="${item.baud}"\n                            data-ui-datasource="@baud"></esui-select>\n                    </div>\n                </div>\n                <div class="form-row">\n                    <label><i>＊</i>数据位：</label>\n                    <div class="form-value">\n                        <esui-select class="inline-select"\n                            data-ui-id="databits"\n                            data-ui-name="databits"\n                            data-ui-width="200"\n                            data-ui-required="true"\n                            data-ui-value="${item.databits}"\n                            data-ui-datasource="@databits"></esui-select>\n                    </div>\n                </div>\n                <div class="form-row">\n                    <label><i>＊</i>校验：</label>\n                    <div class="form-value">\n                        <esui-select class="inline-select"\n                            data-ui-id="parity"\n                            data-ui-name="parity"\n                            data-ui-width="200"\n                            data-ui-required="true"\n                            data-ui-value="${item.parity}"\n                            data-ui-datasource="@parity"></esui-select>\n                    </div>\n                </div>\n                <div class="form-row">\n                    <label><i>＊</i>停止位：</label>\n                    <div class="form-value">\n                        <esui-select class="inline-select"\n                            data-ui-id="stopbits"\n                            data-ui-name="stopbits"\n                            data-ui-width="200"\n                            data-ui-required="true"\n                            data-ui-value="${item.stopbits}"\n                            data-ui-datasource="@stopbits"></esui-select>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_device_v2_child --\x3e\n\x3c!-- import: TPL_modbus_create_device_v2 --\x3e\n'
}),
define("iot/modbus/manage-v2/dialog/CreatesubModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e);
            var t = this.get("item"),
            r = {};
            l["default"].extend(r, t),
            this.submitRequester = t ? o.api.editDevice: o.api.createDevice,
            t && ("rtu" === t.mode ? (r.rtuAddress = t.address, r.address = "", r.portNum = 502) : (r.rtuAddress = "", r.address = t.address.split(":")[0], r.portNum = t.address.split(":")[1]), this.set("item", r))
        }
        return e["default"](n, a),
        n.prototype.filterData = function(e) {
            var t = [];
            return this.get("item") ? e.uuid = this.get("item").uuid: e.gatewayUuid = this.get("uuid"),
            "tcp" === e.mode ? (e.address = e.address + ":" + e.portNum, t.push(["portNum"])) : e.address = e.rtuAddress,
            l["default"].omit(e, t)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    mode: function(e) {
                        return [{
                            value: "tcp",
                            name: "TCP"
                        },
                        {
                            value: "rtu",
                            name: "RTU"
                        }]
                    },
                    baud: function(e) {
                        return [{
                            value: 300,
                            name: "300"
                        },
                        {
                            value: 600,
                            name: "600"
                        },
                        {
                            value: 1200,
                            name: "1200"
                        },
                        {
                            value: 1440,
                            name: "1440"
                        },
                        {
                            value: 2440,
                            name: "2440"
                        },
                        {
                            value: 4800,
                            name: "4800"
                        },
                        {
                            value: 9600,
                            name: "9600"
                        },
                        {
                            value: 19200,
                            name: "19200"
                        },
                        {
                            value: 38400,
                            name: "38400"
                        },
                        {
                            value: 43e3,
                            name: "43000"
                        },
                        {
                            value: 56e3,
                            name: "56000"
                        },
                        {
                            value: 57600,
                            name: "57600"
                        },
                        {
                            value: 115200,
                            name: "115200"
                        },
                        {
                            value: 128e3,
                            name: "128000"
                        },
                        {
                            value: 256e3,
                            name: "256000"
                        }]
                    },
                    databits: function(e) {
                        return [{
                            value: 7,
                            name: "7"
                        },
                        {
                            value: 8,
                            name: "8"
                        }]
                    },
                    parity: function(e) {
                        return [{
                            value: "NONE",
                            name: "无校验"
                        },
                        {
                            value: "ODD",
                            name: "奇校验"
                        },
                        {
                            value: "EVEN",
                            name: "偶校验"
                        }]
                    },
                    stopbits: function(e) {
                        return [{
                            value: 1,
                            name: "1"
                        },
                        {
                            value: 2,
                            name: "2"
                        }]
                    },
                    editing: function(e) {
                        return e.has("item")
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/manage-v2/dialog/CreatesubView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./createsub.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "mode:change": function(t) {
                    d["default"].each(["rtu", "tcp"],
                    function(i) {
                        i === t.target.getValue() ? e.get(i + "Panel").show() : e.get(i + "Panel").hide()
                    }),
                    "tcp" === t.target.getValue() ? e.disableRTUControls() : e.disableTCPControls()
                }
            }
        },
        n.prototype.disableRTUControls = function() {
            this.get("rtuAddress").set("disabled", !0),
            this.get("baud").set("disabled", !0),
            this.get("databits").set("disabled", !0),
            this.get("parity").set("disabled", !0),
            this.get("stopbits").set("disabled", !0),
            this.get("portNum").set("disabled", !1),
            this.get("address").set("disabled", !1)
        },
        n.prototype.disableTCPControls = function() {
            this.get("portNum").set("disabled", !0),
            this.get("address").set("disabled", !0),
            this.get("rtuAddress").set("disabled", !1),
            this.get("baud").set("disabled", !1),
            this.get("databits").set("disabled", !1),
            this.get("parity").set("disabled", !1),
            this.get("stopbits").set("disabled", !1)
        },
        n.prototype.enterDocument = function() {
            var e = this;
            a.prototype.enterDocument.call(this);
            var t = this.model.get("item");
            t ? (d["default"].each(["rtu", "tcp"],
            function(i) {
                i === t.mode ? e.get(i + "Panel").show() : e.get(i + "Panel").hide()
            }), this.get("mode").setValue(t.mode), "tcp" === t.mode ? (this.get("baud").setValue(9600), this.disableRTUControls()) : this.disableTCPControls()) : (this.get("baud").setValue(9600), this.get("rtuPanel").hide(), this.disableRTUControls())
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_device_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    code: {
                        width: 220,
                        placeholder: "网关ID必须唯一，且仅支持英文、数字",
                        required: "required",
                        pattern: s.idRegExp
                    },
                    slaveId: {
                        width: 220,
                        required: "required",
                        placeholder: "可输入1-247之间的整数值",
                        pattern: /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-3][0-9]|24[0-7])$/
                    },
                    description: {
                        width: 220
                    },
                    address: {
                        width: 220,
                        required: "required",
                        placeholder: "请输入正确的IP地址，例如：19.220.56.127",
                        pattern: s.ipRegExp
                    },
                    portNum: {
                        width: 80,
                        required: "required",
                        pattern: s.portRegExp
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/modbus/manage-v2/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_gateway_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    code: {
                        width: 220,
                        placeholder: "ID必须唯一，且仅支持英文、数字",
                        required: "required",
                        pattern: o.idRegExp
                    },
                    description: {
                        value: "",
                        placeholder: "请写描述信息",
                        required: "required",
                        width: 220,
                        height: 120
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = s
}),
define("iot/modbus/manage-v2/dialog/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage-v2/dialog/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_device_detail_v2 --\x3e\n<div class="modbus-dialog-form modbus-device-detail">\n    \x3c!-- if: ${item.mode} === \'tcp\' --\x3e\n    <div class="row"><span>IP地址：</span>${address}</div>\n    <div class="row"><span>端口：</span>${host}</div>\n    \x3c!-- else: --\x3e\n    <div class="row"><span>串口号：</span>${address}</div>\n    <div class="row"><span>波特率：</span>${item.baud}秒</div>\n    <div class="row"><span>数据位：</span>${item.databits}</div>\n    <div class="row"><span>校验：</span>${item.parity}校验</div>\n    <div class="row"><span>停止位：</span>${item.stopbits}</div>\n    \x3c!-- /if --\x3e\n</div>\n\x3c!-- target: TPL_modbus_device_detail_v2_child --\x3e\n\x3c!-- import: TPL_modbus_device_detail_v2 --\x3e\n\n'
}),
define("iot/modbus/manage-v2/dialog/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n) {
    var r = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    address: function(e) {
                        return "tcp" === e.get("item").mode ? e.get("item").address.split(":")[0] : e.get("item").address
                    },
                    host: function(e) {
                        return "tcp" === e.get("item").mode ? e.get("item").address.split(":")[1] : ""
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = r
}),
define("iot/modbus/manage-v2/dialog/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_device_detail_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/manage-v2/dialog/Password", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./PasswordModel", "./PasswordView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage-v2/dialog/password.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_gateway_password_v2 --\x3e\n<div class="modbus-dialog-form modbus-gateway-password">\n    <div class="level1">{</div>\n    <div class="level2">"endpoint":"${item.host}",</div>\n    <div class="level2">"topic":"${item.commandTopic}",</div>\n    <div class="level2">"user":"${item.username}",</div>\n    <div class="level2">"password":"${item.password}"</div>\n    <div class="level1">}</div>\n</div>\n\x3c!-- target: TPL_modbus_gateway_password_v2_child --\x3e\n\x3c!-- import: TPL_modbus_gateway_password_v2 --\x3e\n'
}),
define("iot/modbus/manage-v2/dialog/PasswordModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a(e) {
            t["default"](this, a),
            i.call(this, e)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/modbus/manage-v2/dialog/PasswordView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./password.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_gateway_password_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/manage-v2/Manage", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "underscore", "./ManageModel", "./ManageView", "../operations", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_GATEWAY", this.create, this),
            this.view.on("DELETE_GATEWAY", this["delete"], this),
            this.view.on("TO_SUBPAGE", this.toSubpage, this),
            this.view.on("VIEW_PASSWORD", this.viewPassword, this),
            this.view.on("RESET_PASSWORD", this.resetPassword, this),
            this.view.on("UPDATE_GATEWAY", this.update, this),
            this.view.on("ACTIVATE_DEPLOY", this.activate, this),
            this.model.on("change", this.syncModelToView, this)
        },
        n.prototype.syncModelToView = function(e) {
            a.prototype.syncModelToView.call(this, e),
            this.view.get("activateBtn").set("disabled", 0 === this.model.get("tableData").length)
        },
        n.prototype.activate = function(e) {
            var t = this,
            i = this.model,
            a = this.view;
            i.activateDeploy().then(function(e) {
                var i = c["default"].filter(e,
                function(e) {
                    return e.result
                }).length;
                i === e.length ? a.showToast("数据生效成功！") : i > 0 ? a.showToast("数据生效部分成功！", {
                    messageType: "alert"
                }) : a.showToast("数据生效失败！", {
                    messageType: "error"
                }),
                m["default"].activateDeploy.call(t, {
                    parentAction: t,
                    item: e
                })
            }).fail(function() {
                return a.showToast("数据生效失败！", {
                    messageType: "error"
                })
            })
        },
        n.prototype.toSubpage = function(e) {
            this.redirect("/iot/modbus/manage/sublist~" + e.args)
        },
        n.prototype.update = function(e) {
            var t = this.model,
            i = this.view,
            a = this,
            n = e.item.uuid,
            r = h["default"].status[e.item.state].actionTxt,
            o = h["default"].status[e.item.state].action + "D";
            i.waitConfirm({
                title: r + "网关",
                content: "是否确认" + r + "网关？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                t.updateGatewayState(n, o).then(function() {
                    return i.showToast(r + "网关成功！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast(r + "网关失败！", {
                        messageType: "error"
                    })
                })
            })
        },
        n.prototype.viewPassword = function(e) {
            var t = this.view.get("table").datasource[e.args];
            m["default"].viewPassword.call(this, {
                parentAction: this,
                item: t,
                type: "查看"
            })
        },
        n.prototype.resetPassword = function(e) {
            var t = this,
            i = this.model,
            a = this.view;
            i.resetPassword(e.item).then(function(i) {
                e.item.password = i.password,
                a.showToast("密钥重置成功！"),
                m["default"].viewPassword.call(t, {
                    parentAction: t,
                    item: e.item,
                    type: "重置"
                })
            }).fail(function() {
                return a.showToast("密钥重置失败！", {
                    messageType: "error"
                })
            })
        },
        n.prototype.create = function() {
            var e = this;
            this.model.iotResourceValid().then(function(t) {
                t.valid ? m["default"].createGateway.call(e, {
                    parentAction: e
                }) : m["default"].confirmCreateIotOrder(e.view).then(function() {
                    return e.redirect("#/iot/order/notify")
                })
            })
        },
        n.prototype["delete"] = function() {
            var e = this.view.get("table").getSelectedItems(),
            t = this.model,
            i = this.view,
            a = this;
            i.waitConfirm({
                title: "删除网关",
                content: "是否确认删除？",
                width: 500,
                needFoot: !0
            }).done(function(n) {
                t.deleteGateway(e).then(function() {
                    return i.showToast("删除网关成功！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast("删除网关失败！", {
                        messageType: "error"
                    })
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return f["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = b
}),
define("iot/modbus/manage-v2/manage.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_manage_v2 --\x3e\n<div class="modbus-main-wrap modbus-manage main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物解析 - 网关设备管理</span>\n        </p>\n        <div class="list-content">\n            <h2>网关设备管理</h2>\n        \t<div class="notice">\n        \t\t在云端创建云网关，作为厂区网关在云端的一对一的映射。为了使厂区网关能正确上传数据到云网关， 需要将系统生成的密钥配置到对应的厂区网关中。\n        \t</div>\n            <div class="main-content table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="gatewayCreateBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建网关</button>\n                        <button data-ui-id="activateBtn"\n                                data-ui-type="Button"\n                                data-ui-skin="activate">全部生效</button>\n\t                    <button data-ui-type="Button"\n\t                            data-ui-skin="danger"\n\t                            data-ui-id="deleteGateway">删除</button>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/manage-v2/ManageModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/config", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.iotResourceValid = function() {
            return u["default"].api.iotServiceStatus()
        },
        n.prototype.deleteGateway = function(e) {
            var t = [];
            return d["default"].each(e,
            function(e) {
                t.push(e.uuid)
            }),
            s.api.deleteGateway({
                uuid: t
            })
        },
        n.prototype.resetPassword = function(e) {
            return s.api.resetPassword({
                uuid: e.uuid,
                username: e.username,
                principalUuid: e.principalUuid
            })
        },
        n.prototype.updateGatewayState = function(e, t) {
            return s.api.updateGatewayState({
                uuid: e,
                state: t
            })
        },
        n.prototype.activateDeploy = function() {
            return s.api.activateDeploy()
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {}
            }
        },
        {
            key: "listRequester",
            get: function() {
                return s.api.getGatewayList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: s.pageSize
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/manage-v2/ManageView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./manage.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/timeUtil", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = r["default"](d),
    h = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return f["default"].getListEvents({
                "gatewayCreateBtn:click": function(t) {
                    return e.fire("CREATE_GATEWAY", t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "deleteGateway:click": function(t) {
                    return e.fire("DELETE_GATEWAY", t)
                },
                "table:select": this.updateButtonStates,
                "table:change": this.handleSelectorChangeEvent,
                "activateBtn:click": function(t) {
                    return e.fire("ACTIVATE_DEPLOY", t)
                }
            })
        },
        n.prototype.updateButtonStates = function() {
            var e = this.get("table").getSelectedItems();
            e && e.length > 0 ? this.get("deleteGateway").set("disabled", !1) : this.get("deleteGateway").set("disabled", !0)
        },
        n.prototype.handleSelectorChangeEvent = function(e) {
            if (!0 === e.bubble) {
                var t = e.originalTarget,
                i = t.getValue();
                if (i) {
                    var a = t.get("xRowIndex"),
                    n = e.target.datasource[a];
                    "reset" === i ? this.fire("RESET_PASSWORD", {
                        item: n
                    }) : "update" === i && this.fire("UPDATE_GATEWAY", {
                        item: n
                    }),
                    t.set("selectedIndex", -1)
                }
            }
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "网关ID",
                field: "code",
                width: 50,
                content: function(e, t) {
                    return e.code
                }
            },
            {
                title: "状态",
                width: 50,
                field: "status",
                content: function(e, t) {
                    return '<span class="status status-' + m["default"].status[e.state].css + '">\n                            ' + m["default"].status[e.state].text + "\n                        </span>"
                }
            },
            {
                title: "网关描述",
                width: 140,
                field: "gatewayDesp",
                content: function(e, t) {
                    return u["default"].escape(e.description)
                }
            },
            {
                title: "子设备",
                width: 50,
                field: "subItem",
                content: function(e, t) {
                    return e.deviceNum
                }
            },
            {
                title: "创建时间",
                width: 90,
                field: "createTime",
                content: function(e, t) {
                    return p["default"].toTime(e.createTime)
                }
            },
            {
                title: "操作",
                width: 170,
                field: "operation",
                content: function(e, t) {
                    var i = u["default"].template('<option value="<%=value%>" <%if(disabled){%>disabled<%}%>><%=name%></option>'),
                    a = [{
                        name: m["default"].status[e.state].actionTxt,
                        value: "update",
                        disabled: !1
                    },
                    {
                        name: "重置密钥",
                        value: "reset",
                        disabled: !1
                    }],
                    n = "";
                    return u["default"].each(a,
                    function(e) {
                        n += i(e)
                    }),
                    '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="TO_SUBPAGE"\n                                    data-command-args=\'gatewayUuid=' + e.uuid + "&code=" + e.code + "&rawState=" + e.state + '\'>管理子设备</button>\n                            <button class="cmd-button"\n                                    data-command="VIEW_PASSWORD"\n                                    data-command-args=\'' + t + '\'>查看密钥</button>\n                            <select data-ui-type="Select"\n                                    data-ui-x-event-type="change"\n                                    data-ui-x-event-bubble="true"\n                                    data-ui-x-row-index=\'' + t + '\'\n                                    data-ui-width="80"\n                                    data-ui-selected-index="-1"\n                                    data-ui-empty-text="更多操作">' + n + "</select>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this),
            this.get("deleteGateway").set("disabled", !0),
            this.get("activateBtn").set("disabled", !0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_manage_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: "multi",
                        editable: 1,
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        extTableEx: ["operation"],
                        noDataHtml: m["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = h
}),
define("iot/modbus/manage-v2/Sub", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "./SubModel", "./SubView", "./config", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_DEVICE", this.create, this),
            this.view.on("DELETE_DEVICE", this["delete"], this),
            this.view.on("MODIFY_DEVICE", this.modify, this),
            this.view.on("ENABLE_DEVICE", this.enable, this),
            this.view.on("DISABLE_DEVICE", this.disable, this),
            this.view.on("VIEW_DEVICE", this.viewDevice, this)
        },
        n.prototype.enable = function(e) {
            var t = this.view.get("table").datasource[e.args],
            i = this.model,
            a = this.view,
            n = this;
            a.waitConfirm({
                title: "恢复子设备",
                content: "是否确认恢复？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                i.updateDeviceState(t.uuid, "ENABLED").then(function() {
                    return a.showToast("恢复子设备成功！")
                }).then(function() {
                    return n.reload()
                }).fail(function() {
                    return a.showToast("恢复子设备失败！")
                })
            })
        },
        n.prototype.disable = function(e) {
            var t = this.view.get("table").datasource[e.args],
            i = this.model,
            a = this.view,
            n = this;
            a.waitConfirm({
                title: "禁用子设备",
                content: "是否确认禁用？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                i.updateDeviceState(t.uuid, "DISABLED").then(function() {
                    return a.showToast("禁用子设备成功！")
                }).then(function() {
                    return n.reload()
                }).fail(function() {
                    return a.showToast("禁用子设备失败！")
                })
            })
        },
        n.prototype.modify = function(e) {
            var t = this.view.get("table").datasource[e.args];
            f["default"].createDeivceV2.call(this, {
                parentAction: this,
                type: "编辑",
                item: t,
                name: this.model.get("code"),
                uuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype.create = function() {
            f["default"].createDeivceV2.call(this, {
                parentAction: this,
                type: "新建",
                name: this.model.get("code"),
                uuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype.viewDevice = function(e) {
            var t = this.view.get("table").datasource[e.args];
            t.parity = p["default"].notes[t.parity],
            f["default"].viewDeivce.call(this, {
                parentAction: this,
                type: "查看详情",
                item: t,
                name: this.model.get("code"),
                uuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype["delete"] = function() {
            var e = this.view.get("table").getSelectedItems(),
            t = this.model,
            i = this.view,
            a = this;
            i.waitConfirm({
                title: "删除子设备",
                content: "是否确认删除？",
                width: 500,
                needFoot: !0
            }).done(function(n) {
                t.deleteDevice(e).then(function() {
                    return i.showToast("删除子设备！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast("删除子设备！")
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return u["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return c["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/modbus/manage-v2/sub.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_manage_sublist_v2 --\x3e\n<div class="modbus-main-wrap modbus-manage-sublist main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/modbus/manage">物解析 - 网关设备管理</a>\n            <span class="divider">/</span>\n            <span class="active">管理子设备</span>\n        </p>\n        <div class="list-content">\n            <div class="content-head">\n                <h2>${code}</h2>\n                <span class="status status-${deviceStatus.css}">${deviceStatus.text}</span>\n            </div>\n            <div class="main-content table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="deviceCreateBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建网关子设备</button>\n\t                    <button data-ui-type="Button"\n\t                            data-ui-skin="danger"\n\t                            data-ui-id="deleteDevice">删除</button>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                \x3c!-- import: listPager --\x3e\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/manage-v2/SubModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.deleteDevice = function(e) {
            var t = [];
            return d["default"].each(e,
            function(e) {
                t.push(e.uuid)
            }),
            o.api.deleteDevice({
                uuid: t
            })
        },
        n.prototype.updateDeviceState = function(e, t) {
            return o.api.updateDeviceState({
                uuid: e,
                state: t
            })
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    deviceStatus: function(e) {
                        return {
                            css: u["default"].status[e.get("rawState")].css,
                            text: u["default"].status[e.get("rawState")].text
                        }
                    }
                }
            }
        },
        {
            key: "listRequester",
            get: function() {
                return o.api.getGatewaySublist
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: o.pageSize
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/manage-v2/SubView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./sub.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = r["default"](n),
    u = r["default"](o),
    c = r["default"](s),
    p = r["default"](l),
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return c["default"].getListEvents({
                "deviceCreateBtn:click": function(t) {
                    return e.fire("CREATE_DEVICE", t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "deleteDevice:click": function(t) {
                    return e.fire("DELETE_DEVICE", t)
                },
                "table:select": this.updateButtonStates
            })
        },
        n.prototype.updateButtonStates = function() {
            var e = this.get("table").getSelectedItems();
            e && e.length > 0 ? this.get("deleteDevice").set("disabled", !1) : this.get("deleteDevice").set("disabled", !0)
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "子设备ID",
                field: "code",
                width: 80,
                content: function(e, t) {
                    return e.code
                }
            },
            {
                title: "状态",
                field: "code",
                width: 80,
                content: function(e, t) {
                    return '<span class="status status-' + p["default"].status[e.state].css + '">\n                            ' + p["default"].status[e.state].text + "\n                        </span>"
                }
            },
            {
                title: "从站(slave)",
                width: 50,
                field: "status",
                content: function(e, t) {
                    return e.slaveId
                }
            },
            {
                title: "子设备描述",
                width: 200,
                field: "gatewayDesp",
                content: function(e, t) {
                    return d["default"].escape(e.description)
                }
            },
            {
                title: "接入方式",
                width: 50,
                field: "subItem",
                content: function(e, t) {
                    return e.mode.toUpperCase()
                }
            },
            {
                title: "操作",
                width: 170,
                field: "operation",
                content: function(e, t) {
                    var i = p["default"].status[e.state].actionTxt;
                    return '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="MODIFY_DEVICE"\n                                    data-command-args=\'' + t + '\'>修改</button>\n                            <button class="cmd-button"\n                                    data-command="' + p["default"].status[e.state].action + "_DEVICE\"\n                                    data-command-args='" + t + "'>" + i + '</button>\n                            <button class="cmd-button"\n                                    data-command="VIEW_DEVICE"\n                                    data-command-args=\'' + t + "'>查看详情</button>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this),
            this.get("deleteDevice").set("disabled", !0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_manage_sublist_v2"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: "multi",
                        editable: 1,
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        extTableEx: ["operation"],
                        noDataHtml: p["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = f
}),
define("iot/modbus/manage/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default", "common/component/action_category"],
function(exports, module, e, t, i) {
    var a = t["default"](e),
    n = [{
        type: "iot/modbus/manage/Manage",
        path: "/iot/modbus/manage",
        category: t["default"](i)["default"].LIST
    },
    {
        type: "iot/modbus/manage/dialog/Create",
        path: "/iot/modbus/gateway/create"
    },
    {
        type: "iot/modbus/manage/Sub",
        path: "/iot/modbus/manage/sublist"
    },
    {
        type: "iot/modbus/manage/dialog/Createsub",
        path: "/iot/modbus/device/create"
    },
    {
        type: "iot/modbus/manage/dialog/Password",
        path: "/iot/modbus/gateway/password"
    },
    {
        type: "iot/modbus/manage/dialog/Detail",
        path: "/iot/modbus/device/detail"
    }];
    a["default"].registerAction(n),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何网关</br>", "点击左上角按钮立即创建", "</p></div>"].join(""),
        status: {
            ENABLED: {
                text: "在线",
                css: "green",
                action: "DISABLE",
                actionTxt: "禁用"
            },
            OFFLINE: {
                text: "离线",
                css: "grey"
            },
            DISABLED: {
                text: "禁用",
                css: "red",
                action: "ENABLE",
                actionTxt: "恢复"
            }
        },
        notes: {
            NONE: "无",
            ODD: "奇",
            EVEN: "偶"
        }
    }
}),
define("iot/modbus/manage/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("网关创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "网关创建成功！"
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_gateway --\x3e\n<div class="modbus-dialog-form modbus-gateway-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>网关ID：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="code"\n                        data-ui-id="code"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>网关描述：</label>\n                <div class="form-value">\n                    <textarea data-ui-type="TextBox"\n                              data-ui-id="description"\n                              data-ui-name="description"\n                              data-ui-max-length="1000">\n                    </textarea>\n                    <div class="verify">\n                        <input type="checkbox"\n                               data-ui-id="useSsl"\n                               data-ui-name="useSsl"\n                               data-ui-type="CheckBox" />\n                        <label class="test-name">使用加密链接（SSL）</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_gateway_child --\x3e\n\x3c!-- import: TPL_modbus_create_gateway --\x3e\n'
}),
define("iot/modbus/manage/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "../../../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.filterData = function(e) {
            return e.useSsl ? e.useSsl = !0 : e.useSsl = !1,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return r.api.createGateway
            }
        },
        {
            key: "datasource",
            get: function() {
                return {}
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/modbus/manage/dialog/Createsub", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreatesubModel", "./CreatesubView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = "创建";
            this.model.get("item") && (e = "编辑"),
            this.toastMessage = "网关子设备" + e + "成功！"
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field);
            var t = "创建";
            this.model.get("item") && (t = "编辑"),
            this.view.showToast("网关子设备" + t + "失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage/dialog/createsub.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_create_device --\x3e\n<div class="modbus-dialog-form modbus-device-create">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>子设备ID：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="code"\n                         \x3c!-- if: ${editing} --\x3e\n                         data-ui-read-only="true"\n                         \x3c!-- /if --\x3e\n                         data-ui-value="${item.code}"\n                         data-ui-id="code"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>从站(slave)：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="slaveId"\n                         data-ui-value="${item.slaveId}"\n                         data-ui-id="slaveId"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>描述：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="description"\n                         data-ui-value="${item.description}"\n                         data-ui-id="description"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>IP地址：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="address"\n                         data-ui-value="${item.address}"\n                         data-ui-id="address"></div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>端口号：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                         data-ui-name="portNum"\n                         \x3c!-- if: ${item.portNum} --\x3e\n                         data-ui-value="${item.portNum}"\n                         \x3c!-- else --\x3e\n                         data-ui-value="502"\n                         \x3c!-- /if --\x3e\n                         data-ui-id="portNum"></div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_modbus_create_device_child --\x3e\n\x3c!-- import: TPL_modbus_create_device --\x3e\n'
}),
define("iot/modbus/manage/dialog/CreatesubModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e),
            this.submitRequester = this.get("item") ? o.api.editDevice: o.api.createDevice
        }
        return e["default"](n, a),
        n.prototype.filterData = function(e) {
            return e.address = e.address + ":" + e.portNum,
            this.get("item") ? e.uuid = this.get("item").uuid: (e.mode = "tcp", e.gatewayUuid = this.get("uuid")),
            l["default"].omit(e, "portNum")
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    editing: function(e) {
                        return e.has("item")
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/modbus/manage/dialog/CreatesubView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./createsub.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_device"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    code: {
                        width: 220,
                        placeholder: "网关ID必须唯一，且仅支持英文、数字",
                        required: "required",
                        pattern: o.idRegExp
                    },
                    slaveId: {
                        width: 220,
                        required: "required",
                        placeholder: "可输入1-247之间的整数值",
                        pattern: /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-3][0-9]|24[0-7])$/
                    },
                    description: {
                        width: 220,
                        required: "required"
                    },
                    address: {
                        width: 220,
                        required: "required",
                        placeholder: "请输入正确的IP地址，例如：19.220.56.127",
                        pattern: o.ipRegExp
                    },
                    portNum: {
                        width: 80,
                        required: "required",
                        pattern: o.portRegExp
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = s
}),
define("iot/modbus/manage/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_create_gateway"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    code: {
                        width: 220,
                        placeholder: "ID必须唯一，且仅支持英文、数字",
                        required: "required",
                        pattern: o.idRegExp
                    },
                    description: {
                        value: "",
                        placeholder: "请写描述信息",
                        required: "required",
                        width: 220,
                        height: 120
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = s
}),
define("iot/modbus/manage/dialog/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage/dialog/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_device_detail --\x3e\n<div class="modbus-dialog-form modbus-device-detail">\n    \x3c!-- if: ${item.mode} === \'tcp\' --\x3e\n    <div class="row"><span>IP地址：</span>${address}</div>\n    <div class="row"><span>端口：</span>${host}</div>\n    \x3c!-- else: --\x3e\n    <div class="row"><span>串口号：</span>${address}</div>\n    <div class="row"><span>波特率：</span>${item.baud}秒</div>\n    <div class="row"><span>数据位：</span>${item.databits}</div>\n    <div class="row"><span>校验：</span>${item.parity}校验</div>\n    <div class="row"><span>停止位：</span>${item.stopbits}</div>\n    \x3c!-- /if --\x3e\n</div>\n\x3c!-- target: TPL_modbus_device_detail_child --\x3e\n\x3c!-- import: TPL_modbus_device_detail --\x3e\n\n'
}),
define("iot/modbus/manage/dialog/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e);
            var t = this.get("item"),
            r = {};
            l["default"].extend(r, t),
            r.parity = d["default"].notes[r.parity],
            this.set("item", r)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    address: function(e) {
                        return "tcp" === e.get("item").mode ? e.get("item").address.split(":")[0] : e.get("item").address
                    },
                    host: function(e) {
                        return "tcp" === e.get("item").mode ? e.get("item").address.split(":")[1] : ""
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage/dialog/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_device_detail"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/manage/dialog/Password", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./PasswordModel", "./PasswordView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/manage/dialog/password.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_gateway_password --\x3e\n<div class="modbus-dialog-form modbus-gateway-password">\n    <div class="level1">{</div>\n    <div class="level2">"endpoint":"${item.host}",</div>\n    <div class="level2">"topic":"${item.commandTopic}",</div>\n    <div class="level2">"backControlTopic":"${item.backControlTopic}",</div>\n    <div class="level2">"user":"${item.username}",</div>\n    <div class="level2">"password":"${item.password}"</div>\n    <div class="level1">}</div>\n</div>\n\x3c!-- target: TPL_modbus_gateway_password_child --\x3e\n\x3c!-- import: TPL_modbus_gateway_password --\x3e\n'
}),
define("iot/modbus/manage/dialog/PasswordModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a(e) {
            t["default"](this, a),
            i.call(this, e)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/modbus/manage/dialog/PasswordView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./password.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_gateway_password"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/modbus/manage/Manage", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "underscore", "../operations", "./config", "../../events", "../../operations", "./ManageModel", "./ManageView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = n["default"](a),
    f = n["default"](r),
    m = n["default"](o),
    h = n["default"](s),
    b = n["default"](l),
    v = n["default"](d),
    g = n["default"](u),
    y = n["default"](c),
    w = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_GATEWAY", this.create, this),
            this.view.on("DELETE_GATEWAY", this["delete"], this),
            this.view.on("TO_SUBPAGE", this.toSubpage, this),
            this.view.on("VIEW_PASSWORD", this.viewPassword, this),
            this.view.on("RESET_PASSWORD", this.resetPasswordV2, this),
            this.view.on("UPDATE_GATEWAY", this.update, this),
            this.view.on("DEPLOY_MODBUS_SINGLE", this.activateSingle, this),
            this.view.on(b["default"].START_TURNKEY, v["default"].startTurnkey, this),
            this.model.on("change", this.syncModelToView, this)
        },
        n.prototype.syncModelToView = function(e) {
            a.prototype.syncModelToView.call(this, e)
        },
        n.prototype.activateSingle = function(e) {
            var t = this,
            i = this.model,
            a = this.view,
            n = e.args;
            i.activateDeploySingle(n).then(function(e) {
                var i = f["default"].filter(e,
                function(e) {
                    return e.result
                }).length;
                i === e.length ? a.showToast("数据生效成功！") : i > 0 ? a.showToast("数据生效部分成功！", {
                    messageType: "alert"
                }) : a.showToast("数据生效失败！", {
                    messageType: "error"
                }),
                m["default"].activateDeploy.call(t, {
                    parentAction: t,
                    item: e
                })
            }).fail(function() {
                return a.showToast("数据生效失败！", {
                    messageType: "error"
                })
            })
        },
        n.prototype.toSubpage = function(e) {
            this.redirect("/iot/modbus/manage/sublist~" + e.args)
        },
        n.prototype.update = function(e) {
            var t = this.model,
            i = this.view,
            a = this,
            n = e.item.uuid,
            r = h["default"].status[e.item.state].actionTxt,
            o = h["default"].status[e.item.state].action + "D";
            i.waitConfirm({
                title: r + "网关",
                content: r + "网关后，需要点击『配置下发』，将" + r + "指令下发给网关才能生效。是否确认" + r + "该网关？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                t.updateGatewayState(n, o).then(function() {
                    return i.showToast(r + "网关成功！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast(r + "网关失败！", {
                        messageType: "error"
                    })
                })
            })
        },
        n.prototype.viewPassword = function(e) {
            var t = e.item;
            m["default"].viewPassword.call(this, {
                parentAction: this,
                item: t,
                type: "查看"
            })
        },
        n.prototype.resetPassword = function(e) {
            var t = this,
            i = this.model,
            a = this.view;
            i.resetPassword(e.item).then(function(i) {
                e.item.password = i.password,
                a.showToast("密钥重置成功！"),
                m["default"].viewPassword.call(t, {
                    parentAction: t,
                    item: e.item,
                    type: "重置"
                })
            }).fail(function() {
                return a.showToast("密钥重置失败！", {
                    messageType: "error"
                })
            })
        },
        n.prototype.resetPasswordV2 = function(e) {
            var t = this,
            i = this.model,
            a = this.view;
            a.waitConfirm({
                title: "提示",
                content: "重置密钥后，网关连接MQTT的密钥将更改，可能需要重新烧录程序，请谨慎操作。是否重置密钥？",
                width: 600,
                needFoot: !0
            }).done(function() {
                i.resetPassword(e.item).then(function(i) {
                    e.item.password = i.password,
                    a.showToast("密钥重置成功！"),
                    m["default"].viewPassword.call(t, {
                        parentAction: t,
                        item: e.item,
                        type: "重置"
                    })
                }).fail(function() {
                    return a.showToast("密钥重置失败！", {
                        messageType: "error"
                    })
                })
            })
        },
        n.prototype.create = function() {
            var e = this;
            this.model.iotResourceValid().then(function(t) {
                t.valid ? m["default"].createGateway.call(e, {
                    parentAction: e
                }) : m["default"].confirmCreateIotOrder(e.view).then(function() {
                    return e.redirect("#/iot/order/notify")
                })
            })
        },
        n.prototype["delete"] = function() {
            var e = this.view.get("table").getSelectedItems(),
            t = this.model,
            i = this.view,
            a = this;
            i.waitConfirm({
                title: "删除网关",
                content: "是否确认删除？",
                width: 500,
                needFoot: !0
            }).done(function(n) {
                t.deleteGateway(e).then(function() {
                    return i.showToast("删除网关成功！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast("删除网关失败！", {
                        messageType: "error"
                    })
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return g["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return y["default"]
            }
        }]),
        n
    } (p["default"]);
    module.exports = w
}),
define("iot/modbus/manage/manage.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_manage --\x3e\n<div class="modbus-main-wrap modbus-manage main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物解析 - 网关设备管理</span>\n        </p>\n        <div class="list-content">\n            <h2>\n                <span>网关设备管理</span>\n                <a href="#/iot/modbus/landing">查看产品简介&gt;</a>\n                \x3c!-- import: TPL_iot_turnkey_enter --\x3e\n            </h2>\n\n\t\t\t<div class="tip-grey">\n        \t\t为了使厂区网关能正确上传数据到云端， 需要将系统生成的密钥配置到对应的厂区网关中。\n        \t</div>\n            <div class="main-content table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="gatewayCreateBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建网关</button>\n\t                    <button data-ui-type="Button"\n\t                            data-ui-skin="danger"\n\t                            data-ui-id="deleteGateway">删除</button>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/manage/ManageModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/config", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.iotResourceValid = function() {
            return u["default"].api.iotServiceStatus()
        },
        n.prototype.deleteGateway = function(e) {
            var t = [];
            return d["default"].each(e,
            function(e) {
                t.push(e.uuid)
            }),
            s.api.deleteGateway({
                uuid: t
            })
        },
        n.prototype.resetPassword = function(e) {
            return s.api.resetPassword({
                uuid: e.uuid,
                username: e.username,
                principalUuid: e.principalUuid
            })
        },
        n.prototype.updateGatewayState = function(e, t) {
            return s.api.updateGatewayState({
                uuid: e,
                state: t
            })
        },
        n.prototype.activateDeploySingle = function(e) {
            return s.api.activateDeploySingle({
                uuid: e
            })
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {}
            }
        },
        {
            key: "listRequester",
            get: function() {
                return s.api.getGatewayList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: s.pageSize
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/manage/ManageView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./manage.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/timeUtil", "common/util/tableUtil", "./config", "../../events"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](d),
    b = r["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return m["default"].getListEvents({
                "gatewayCreateBtn:click": function(t) {
                    return e.fire("CREATE_GATEWAY", t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "deleteGateway:click": function(t) {
                    return e.fire("DELETE_GATEWAY", t)
                },
                "table:select": this.updateButtonStates,
                "table:change": this.handleSelectorChangeEvent,
                "turnkey:click": function(t) {
                    return e.fire(b["default"].START_TURNKEY, t)
                }
            })
        },
        n.prototype.updateButtonStates = function() {
            var e = this.get("table").getSelectedItems();
            e && e.length > 0 ? this.get("deleteGateway").set("disabled", !1) : this.get("deleteGateway").set("disabled", !0)
        },
        n.prototype.handleSelectorChangeEvent = function(e) {
            if (!0 === e.bubble) {
                var t = e.originalTarget,
                i = t.getValue();
                if (i) {
                    var a = t.get("xRowIndex"),
                    n = e.target.datasource[a];
                    "reset" === i ? this.fire("RESET_PASSWORD", {
                        item: n
                    }) : "update" === i ? this.fire("UPDATE_GATEWAY", {
                        item: n
                    }) : "viewpass" === i && this.fire("VIEW_PASSWORD", {
                        item: n
                    }),
                    t.set("selectedIndex", -1)
                }
            }
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "网关ID",
                field: "code",
                width: 50,
                content: function(e, t) {
                    return e.code
                }
            },
            {
                title: "状态",
                width: 50,
                field: "status",
                content: function(e, t) {
                    return '<span class="status status-' + h["default"].status[e.state].css + '">\n                            ' + h["default"].status[e.state].text + "\n                        </span>"
                }
            },
            {
                title: "网关描述",
                width: 140,
                field: "gatewayDesp",
                content: function(e, t) {
                    return c["default"].escape(e.description)
                }
            },
            {
                title: "子设备",
                width: 30,
                field: "subItem",
                content: function(e, t) {
                    return e.deviceNum
                }
            },
            {
                title: "创建时间",
                width: 90,
                field: "createTime",
                content: function(e, t) {
                    return f["default"].toTime(e.createTime)
                }
            },
            {
                title: "操作",
                width: 180,
                field: "operation",
                content: function(e, t) {
                    var i = c["default"].template('<option value="<%=value%>" <%if(disabled){%>disabled<%}%>><%=name%></option>'),
                    a = [{
                        name: h["default"].status[e.state].actionTxt,
                        value: "update",
                        disabled: !1
                    },
                    {
                        name: "重置密钥",
                        value: "reset",
                        disabled: !1
                    },
                    {
                        name: "查看密钥",
                        value: "viewpass",
                        disabled: !1
                    }],
                    n = "";
                    return c["default"].each(a,
                    function(e) {
                        n += i(e)
                    }),
                    '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="TO_SUBPAGE"\n                                    data-command-args=\'gatewayUuid=' + e.uuid + "&code=" + e.code + "&rawState=" + e.state + '\'>管理子设备</button>\n                            <button class="cmd-button"\n                                    data-command="DEPLOY_MODBUS_SINGLE"\n                                    data-command-args=\'' + e.uuid + '\'>配置下发</button>\n                            <select data-ui-type="Select"\n                                    data-ui-x-event-type="change"\n                                    data-ui-x-event-bubble="true"\n                                    data-ui-x-row-index=\'' + t + '\'\n                                    data-ui-width="85"\n                                    data-ui-selected-index="-1"\n                                    data-ui-empty-text="更多操作">' + n + "</select>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this),
            this.get("deleteGateway").set("disabled", !0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_manage"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: "multi",
                        editable: 1,
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        extTableEx: ["operation"],
                        noDataHtml: h["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = v
}),
define("iot/modbus/manage/Sub", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "./SubModel", "./SubView", "../operations"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_DEVICE", this.create, this),
            this.view.on("DELETE_DEVICE", this["delete"], this),
            this.view.on("MODIFY_DEVICE", this.modify, this),
            this.view.on("ENABLE_DEVICE", this.enable, this),
            this.view.on("DISABLE_DEVICE", this.disable, this),
            this.view.on("VIEW_DEVICE", this.viewDevice, this)
        },
        n.prototype.enable = function(e) {
            var t = this.view.get("table").datasource[e.args],
            i = this.model,
            a = this.view,
            n = this;
            a.waitConfirm({
                title: "恢复子设备",
                content: "是否确认恢复？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                i.updateDeviceState(t.uuid, "ENABLED").then(function() {
                    return a.showToast("恢复子设备成功！")
                }).then(function() {
                    return n.reload()
                }).fail(function() {
                    return a.showToast("恢复子设备失败！")
                })
            })
        },
        n.prototype.disable = function(e) {
            var t = this.view.get("table").datasource[e.args],
            i = this.model,
            a = this.view,
            n = this;
            a.waitConfirm({
                title: "禁用子设备",
                content: "是否确认禁用？",
                width: 500,
                needFoot: !0
            }).done(function(e) {
                i.updateDeviceState(t.uuid, "DISABLED").then(function() {
                    return a.showToast("禁用子设备成功！")
                }).then(function() {
                    return n.reload()
                }).fail(function() {
                    return a.showToast("禁用子设备失败！")
                })
            })
        },
        n.prototype.modify = function(e) {
            var t = this.view.get("table").datasource[e.args];
            c["default"].createDeivceV2.call(this, {
                parentAction: this,
                type: "编辑",
                item: t,
                name: this.model.get("code"),
                uuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype.create = function() {
            c["default"].createDeivceV2.call(this, {
                parentAction: this,
                type: "新建",
                name: this.model.get("code"),
                uuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype.viewDevice = function(e) {
            var t = this.view.get("table").datasource[e.args];
            c["default"].viewDeivce.call(this, {
                parentAction: this,
                type: "查看详情",
                item: t,
                name: this.model.get("code"),
                uuid: this.model.get("gatewayUuid")
            })
        },
        n.prototype["delete"] = function() {
            var e = this.view.get("table").getSelectedItems(),
            t = this.model,
            i = this.view,
            a = this;
            i.waitConfirm({
                title: "删除子设备",
                content: "是否确认删除？",
                width: 500,
                needFoot: !0
            }).done(function(n) {
                t.deleteDevice(e).then(function() {
                    return i.showToast("删除子设备！")
                }).then(function() {
                    return a.reload()
                }).fail(function() {
                    return i.showToast("删除子设备！")
                })
            })
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return u["default"]
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/modbus/manage/sub.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_manage_sublist --\x3e\n<div class="modbus-main-wrap modbus-manage-sublist main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/modbus/manage">物解析 - 网关设备管理</a>\n            <span class="divider">/</span>\n            <span class="active">管理子设备</span>\n        </p>\n\n        <div class="instance-info">\n            <h1>${code}</h1>\n            <span class="status status-${deviceStatus.css}">${deviceStatus.text}</span>\n        </div>\n        <div class="list-content">\n            <div class="table-full-wrap">\n\t        \t<div class="operation-wrap" data-follow-thead="table">\n\t        \t\t<div class="buttons-wrap">\n\t                    <button data-ui-id="deviceCreateBtn"\n\t                            data-ui-type="Button"\n\t                            data-ui-skin="create">新建网关子设备</button>\n\t                    <button data-ui-type="Button"\n\t                            data-ui-skin="danger"\n\t                            data-ui-id="deleteDevice">删除</button>\n\t                </div>\n\t        \t</div>\n\t        \t<div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx"\n                     data-ui-extension-customfields-type="TableCustomFields">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n\t        </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/modbus/manage/SubModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.deleteDevice = function(e) {
            var t = [];
            return d["default"].each(e,
            function(e) {
                t.push(e.uuid)
            }),
            o.api.deleteDevice({
                uuid: t
            })
        },
        n.prototype.updateDeviceState = function(e, t) {
            return o.api.updateDeviceState({
                uuid: e,
                state: t
            })
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    deviceStatus: function(e) {
                        return {
                            css: u["default"].status[e.get("rawState")].css,
                            text: u["default"].status[e.get("rawState")].text
                        }
                    }
                }
            }
        },
        {
            key: "listRequester",
            get: function() {
                return o.api.getGatewaySublist
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: o.pageSize
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/modbus/manage/SubView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./sub.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/tableUtil", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = r["default"](n),
    u = r["default"](o),
    c = r["default"](s),
    p = r["default"](l),
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return c["default"].getListEvents({
                "deviceCreateBtn:click": function(t) {
                    return e.fire("CREATE_DEVICE", t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "deleteDevice:click": function(t) {
                    return e.fire("DELETE_DEVICE", t)
                },
                "table:select": this.updateButtonStates
            })
        },
        n.prototype.updateButtonStates = function() {
            var e = this.get("table").getSelectedItems();
            e && e.length > 0 ? this.get("deleteDevice").set("disabled", !1) : this.get("deleteDevice").set("disabled", !0)
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "子设备ID",
                field: "code",
                width: 80,
                content: function(e, t) {
                    return e.code
                }
            },
            {
                title: "状态",
                field: "code",
                width: 80,
                content: function(e, t) {
                    return '<span class="status status-' + p["default"].status[e.state].css + '">\n                            ' + p["default"].status[e.state].text + "\n                        </span>"
                }
            },
            {
                title: "从站(slave)",
                width: 50,
                field: "status",
                content: function(e, t) {
                    return e.slaveId
                }
            },
            {
                title: "子设备描述",
                width: 200,
                field: "gatewayDesp",
                content: function(e, t) {
                    return d["default"].escape(e.description)
                }
            },
            {
                title: "接入方式",
                width: 50,
                field: "subItem",
                content: function(e, t) {
                    return e.mode.toUpperCase()
                }
            },
            {
                title: "操作",
                width: 170,
                field: "operation",
                content: function(e, t) {
                    var i = p["default"].status[e.state].actionTxt;
                    return '<span class="operations">\n                            <button class="cmd-button"\n                                    data-command="MODIFY_DEVICE"\n                                    data-command-args=\'' + t + '\'>修改</button>\n                            <button class="cmd-button"\n                                    data-command="' + p["default"].status[e.state].action + "_DEVICE\"\n                                    data-command-args='" + t + "'>" + i + '</button>\n                            <button class="cmd-button"\n                                    data-command="VIEW_DEVICE"\n                                    data-command-args=\'' + t + "'>查看详情</button>\n                        </span>"
                }
            }]),
            a.prototype.enterDocument.call(this),
            this.get("deleteDevice").set("disabled", !0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_manage_sublist"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: "multi",
                        editable: 1,
                        sortable: !0,
                        columnResizable: !0,
                        fields: "@tableFields",
                        extTableEx: ["operation"],
                        noDataHtml: p["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = f
}),
define("iot/modbus/operations", ["exports", "module", "underscore", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i) {
    function a(e) {
        var t = e.target,
        i = t.getAction(),
        a = t.getChild("foot").getChild("btnOk"),
        n = t.getChild("foot").getChild("btnCancel"),
        r = i.view.get("form");
        r.on("submitSuccess",
        function() {
            t && t.dispose()
        }),
        r.on("submitError",
        function() {
            return a.enable()
        }),
        i.on("beforesubmit",
        function() {
            return a.disable()
        }),
        i.on("dialog.resize",
        function() {
            return t && t.resize()
        }),
        a.on("click",
        function() {
            return r.validateAndSubmit()
        }),
        n.on("click",
        function() {
            t.fire("cancel"),
            t.dispose()
        }),
        t.resize()
    }
    var n = t["default"](e),
    r = {
        "gateway.delete": {
            msg: "删除网关",
            api: i.api.deleteGateway
        }
    };
    module.exports = {
        handler: function(e, t, i, a, n) {
            var o = r[e];
            if (o && t) {
                i = i || {};
                var s = null;
                if (a) {
                    s = t.get("table").getSelectedItems();
                    for (var l in a) if (a.hasOwnProperty(l)) {
                        for (var d = [], u = 0; u < s.length; ++u) d.push(s[u][a[l]]);
                        i[l] = d.join()
                    }
                }
                o.api(i).then(function() {
                    t.showToast(o.msg + "成功"),
                    t.fire("REFRESH")
                },
                function(e) {
                    var i = s && s.length > 1 ? "部分": "";
                    t.showToast(o.msg + i + "失败"),
                    n && n.call(null, e)
                })
            }
        },
        confirmHandler: function(e, t, i, a, n, r) {
            var o = this;
            i.waitConfirm({
                title: e.title,
                content: e.content,
                width: e.width || 540,
                needFoot: !0
            }).then(function() {
                return o.handler(t, i, a, n, r)
            })
        },
        confirmCreateIotOrder: function(e) {
            return e.waitConfirm({
                title: "提示",
                content: "使用物解析前，请先购买物接入资源：）",
                width: 540,
                okText: "去开通",
                needFoot: !0
            })
        },
        createGateway: function(e) {
            this.view.waitActionDialog({
                title: "新建网关",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/gateway/create",
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        createDeivce: function(e) {
            this.view.waitActionDialog({
                title: e.type + "子设备 (网关" + e.name + ")",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/device/create~uuid=" + e.uuid,
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        createDeivceV2: function(e) {
            this.view.waitActionDialog({
                title: e.type + "子设备 (网关" + e.name + ")",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/device/createv2~uuid=" + e.uuid,
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        viewDeivce: function(e) {
            this.view.waitActionDialog({
                title: e.type,
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/device/detail",
                actionOptions: e
            }).then(function(t) {
                var i = t.target,
                a = i.getChild("foot").getChild("btnOk"),
                n = i.getChild("foot").getChild("btnCancel");
                a.on("click",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e),
                    i && i.dispose()
                }),
                i.on("close",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e)
                }),
                n.on("click",
                function() {
                    i.fire("cancel"),
                    i.dispose()
                }),
                i.resize()
            })
        },
        viewPassword: function(e) {
            this.view.waitActionDialog({
                title: "查看当前密钥",
                width: 700,
                needFoot: !0,
                url: "/iot/modbus/gateway/password",
                actionOptions: e
            }).then(function(t) {
                var i = t.target,
                a = i.getChild("foot").getChild("btnOk"),
                n = i.getChild("foot").getChild("btnCancel");
                n.hide(),
                a.on("click",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e),
                    "重置" === e.type && e.parentAction.reload(),
                    i && i.dispose()
                }),
                i.on("close",
                function() {
                    "重置" === e.type && e.parentAction.reload(),
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e)
                }),
                n.on("click",
                function() {
                    i.fire("cancel"),
                    i.dispose()
                }),
                i.resize()
            })
        },
        viewHowUpload: function(e) {
            this.view.waitActionDialog({
                title: "当前轮询规则：数据上传格式",
                width: 700,
                needFoot: !0,
                url: "/iot/modbus/slave/howUpload",
                actionOptions: e
            }).then(function(t) {
                var i = t.target,
                a = i.getChild("foot").getChild("btnOk"),
                n = i.getChild("foot").getChild("btnCancel");
                n.hide(),
                a.on("click",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e),
                    i && i.dispose()
                }),
                i.on("close",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e)
                }),
                n.on("click",
                function() {
                    i.fire("cancel"),
                    i.dispose()
                }),
                i.resize()
            })
        },
        viewSlaveDetail: function(e) {
            this.view.waitActionDialog({
                title: "轮询详情",
                width: 600,
                needFoot: !0,
                url: "/iot/modbus/slave/detail",
                actionOptions: e
            }).then(function(t) {
                var i = t.target,
                a = i.getChild("foot").getChild("btnOk"),
                n = i.getChild("foot").getChild("btnCancel");
                n.hide(),
                a.on("click",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e),
                    i && i.dispose()
                }),
                i.on("close",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e)
                }),
                n.on("click",
                function() {
                    i.fire("cancel"),
                    i.dispose()
                }),
                i.resize()
            })
        },
        createParseProject: function(e) {
            this.view.waitActionDialog({
                title: "新建解析项目",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/analysis/createProject",
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        editParseProject: function(e) {
            this.view.waitActionDialog({
                title: "编辑解析项目",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/analysis/editProject",
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        createTrantable: function(e) {
            this.view.waitActionDialog({
                title: e.item ? "编辑记录": "新建记录",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/analysis/createTrantable",
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        activateDeploy: function(e) {
            this.view.waitActionDialog({
                title: "数据生效情况",
                width: 600,
                needFoot: !0,
                url: "/iot/modbus/deploy_status",
                actionOptions: e
            }).then(function(t) {
                var i = t.target,
                a = i.getChild("foot").getChild("btnOk"),
                n = i.getChild("foot").getChild("btnCancel");
                n.hide(),
                a.on("click",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e),
                    i && i.dispose()
                }),
                i.on("close",
                function() {
                    e.parentAction.fire("RENDER_AFTER_CONFIRM", e)
                }),
                n.on("click",
                function() {
                    i.fire("cancel"),
                    i.dispose()
                }),
                i.resize()
            })
        },
        createCustomProperty: function(e) {
            this.view.waitActionDialog({
                title: "新建自定义属性",
                width: 540,
                needFoot: !0,
                url: "/iot/modbus/advanced/createproperty",
                actionOptions: e
            }).then(n["default"].bind(a, this))
        },
        JsonToString: function(e) {
            var t = [],
            i = this,
            a = function(e) {
                return "object" == typeof e && null !== e ? i.JsonToString(e) : /^(string|number)$/.test(typeof e) ? "'" + e + "'": e
            };
            for (var n in e) t.push("'" + n + "':" + a(e[n]));
            return "{" + t.join(",") + "}"
        }
    }
}),
define("iot/modbus/overview/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/modbus/overview/Overview",
        path: "/iot/modbus/overview"
    }]);
    module.exports = {}
}),
define("iot/modbus/overview/Overview", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./OverviewModel", "./OverviewView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "modelType",
            get: function() {
                return l["default"]
            }
        },
        {
            key: "viewType",
            get: function() {
                return d["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/modbus/overview/overview.tpl", [],
function() {
    return '\x3c!-- target: TPL_modbus_overview --\x3e\n<div class="modbus-main-wrap modbus-overview main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物解析 - 概览</span>\n        </p>\n        <div class="list-content">\n            <h2>概览</h2>\n            <div class="main-content">\n            \t<div class="notice">\n            \t\t使用物解析服务将通过网关上传的厂区数据，在云端进行灵活配置的解析和计算。可以把工业协议中的二进制数据轻松转化成更为可理解的数据格式，存储在云端。\n            \t</div>\n            \t<div class="section">\n            \t\t<h3>流程说明</h3>\n            \t\t<div class="illustration">\n            \t\t\t<div class="wrapper">\n\t            \t\t\t<div class="point">\n\t            \t\t\t\t<div class="left">\n\t\t            \t\t\t\t<div class="top">\n\t\t            \t\t\t\t\t<div class="num">1</div>\n\t\t            \t\t\t\t\t<div class="text">配置网关连接</div>\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t\t<div class="bottom">\n\t\t            \t\t\t\t\t在云端控制台创建和厂区网关匹配的云网关，并在厂区网关端使用\n\t\t            \t\t\t\t\t<a href="https://github.com/baidu/iot-edge-sdk-for-iot-parser" target="_blank">IoT SDK</a>配置数据接入。\n\t\t            \t\t\t\t</div>\n\t            \t\t\t\t</div>\n\t            \t\t\t\t<div class="right"></div>\n\t            \t\t\t</div>\n\t            \t\t\t<div class="point">\n\t            \t\t\t\t<div class="left">\n\t\t            \t\t\t\t<div class="top">\n\t\t            \t\t\t\t\t<div class="num">2</div>\n\t\t            \t\t\t\t\t<div class="text">检查数据格式</div>\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t\t<div class="bottom">\n\t\t            \t\t\t\t\t确保厂区网关上传的数据符合解析约定格式。\n\t\t            \t\t\t\t\t详见：<a href="https://bce.baidu.com/doc/Parser/index.html" target="_blank">云协议解析文档</a>\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t</div>\n\t            \t\t\t\t<div class="right"></div>\n\t            \t\t\t</div>\n\t            \t\t\t<div class="point">\n\t            \t\t\t\t<div class="left">\n\t\t            \t\t\t\t<div class="top">\n\t\t            \t\t\t\t\t<div class="num">3</div>\n\t\t            \t\t\t\t\t<div class="text">填写解析规则</div>\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t\t<div class="bottom">\n\t\t            \t\t\t\t\t在云端控制台配置解析规则，设置待解析的数据来源，通讯地址表和解析后数据存储位置。\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t</div>\n\t            \t\t\t\t<div class="right"></div>\n\t            \t\t\t</div>\n\t            \t\t\t<div class="point">\n\t            \t\t\t\t<div class="left">\n\t\t            \t\t\t\t<div class="top">\n\t\t            \t\t\t\t\t<div class="num">4</div>\n\t\t            \t\t\t\t\t<div class="text">验证解析结果</div>\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t\t<div class="bottom">\n\t\t            \t\t\t\t\t查看最近的协议解析结果或者错误消息提示，为验证和优化数据解析过程提供参考。\n\t\t            \t\t\t\t</div>\n\t\t            \t\t\t</div>\n\t            \t\t\t\t<div class="right"></div>\n\t            \t\t\t</div>\n\t            \t\t</div>\n            \t\t</div>\n            \t</div>\n            </div>\n        </div>\n    </div>\n</div>'
}),
define("iot/modbus/overview/OverviewModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n) {
    var r = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {},
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {}
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = r
}),
define("iot/modbus/overview/OverviewView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./overview.tpl", "jquery", "babel-runtime/helpers/interop-require-default", "bat-ria/mvc/BaseView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            return {}
        },
        n.prototype.hideInlineLoading = function(e) {
            s["default"]("span[data-key=" + e + "]").hide()
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_modbus_overview"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {}
            }
        }]),
        n
    } (r["default"](o)["default"]);
    module.exports = l
}),
define("iot/operations", ["exports", "module", "./events", "babel-runtime/helpers/interop-require-default", "underscore", "er/Deferred", "esui/lib", "./_public/InputCollection", "./_public/util", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    function l(e) {
        var t = e.target,
        i = t.getAction(),
        a = i.view.get("stepControl"),
        n = t.getChild("foot").getChild("btnLast"),
        r = t.getChild("foot").getChild("btnOk"),
        o = t.getChild("foot").getChild("btnCancel");
        m["default"].addClass(t.getBody().main, "iot-dialog-panel");
        var s = i.view.get("form");
        s.getInputControls = function(e, t) {
            var i = b["default"].getInputControls(s.main, e, t);
            return new h["default"](i)
        },
        s.on("submitSuccess",
        function() {
            t && t.dispose()
        }),
        s.on("submitError",
        function() {
            r.enable(),
            t && t.dispose()
        }),
        i.on("dialog.resize",
        function() {
            return t && t.resize()
        }),
        n.on("click",
        function(e) {
            return a.fire("prev")
        }),
        r.on("click",
        function() {
            return s.validateAndSubmit()
        }),
        o.on("click",
        function() {
            t.fire("cancel"),
            t.dispose()
        }),
        t.resize()
    }
    function d(e) {
        var t = e.target,
        i = t.getAction(),
        a = t.getChild("foot").getChild("btnOk"),
        n = t.getChild("foot").getChild("btnCancel"),
        r = i.view.get("form");
        r.on("submitSuccess",
        function() {
            t && t.dispose()
        }),
        r.on("submitError",
        function() {
            return a.enable()
        }),
        i.on("beforesubmit",
        function() {
            return a.disable()
        }),
        i.on("dialog.resize",
        function() {
            return t && t.resize()
        }),
        a.on("click",
        function() {
            return r.validateAndSubmit()
        }),
        n.on("click",
        function() {
            t.fire("cancel"),
            t.dispose()
        }),
        t.resize()
    }
    function u() {
        var e = this,
        t = new f["default"],
        i = v["storage.check"];
        return i.api().done(function(a) {
            var n = i.error[a.status];
            n ? (e.view.waitConfirm({
                title: i.msg,
                content: n,
                width: 470,
                encode: !1,
                needFoot: !0
            }).done(function() {
                return e.fire(i.action[a.status])
            }), t.reject(a)) : t.resolve()
        }),
        t.promise
    }
    var c = t["default"](e),
    p = t["default"](i),
    f = t["default"](a),
    m = t["default"](n),
    h = t["default"](r),
    b = t["default"](o),
    v = {
        "endpoint.release": {
            msg: "实例释放",
            api: s.api.iotEndpointDelete
        },
        "thing.delete": {
            msg: "删除设备",
            api: s.api.iotThingDelete
        },
        "principal.delete": {
            msg: "删除身份",
            api: s.api.iotPrincipalDelete
        },
        "policy.delete": {
            msg: "删除策略",
            api: s.api.iotPolicyDelete
        },
        "storage.deleteCopy": {
            msg: "删除归档",
            api: s.api.iotStorageCopyDelete
        },
        "storage.delete": {
            msg: "删除存储项",
            api: s.api.iotKafkaDelete
        },
        "storage.check": {
            msg: "提示",
            api: s.api.iotBosCheckStatus,
            error: {
                AVAILABLE: "",
                UNAVAILABLE: "归档以BOS为存储载体，系统检测到您尚未开通BOS，点击 “<b>确定</b>” 进入BOS开通页？",
                INDEBTED: "您已欠费，归档服务暂时无法使用，点击 “<b>确定</b>” 立即充值？"
            },
            action: {
                AVAILABLE: "",
                UNAVAILABLE: "bos.active",
                INDEBTED: "bos.recharge"
            }
        }
    },
    g = ['<div class="btn-last" data-ui="type:Button;id:btnFootLast;childName:btnLast;">上一步</div>', '<div class="btn-next" data-ui="type:Button;id:btnFootOk;childName:btnOk;skin:primary;">下一步</div>', '<div class="btn-cancel" data-ui="type:Button;id:btnFootCancel;childName:btnCancel;">取消</div>'].join("");
    module.exports = {
        handler: function(e, t, i, a, n) {
            var r = v[e];
            if (r && t) {
                i = i || {};
                var o = null;
                if (a) {
                    o = t.get("table").getSelectedItems();
                    for (var s in a) if (a.hasOwnProperty(s)) {
                        for (var l = [], d = 0; d < o.length; ++d) l.push(o[d][a[s]]);
                        i[s] = l.join()
                    }
                }
                r.api(i).then(function() {
                    t.showToast(r.msg + "成功"),
                    t.fire(c["default"].REFRESH)
                },
                function(e) {
                    var i = o && o.length > 1 ? "部分": "";
                    t.showToast(r.msg + i + "失败"),
                    n && n.call(null, e)
                })
            }
        },
        confirmHandler: function(e, t, i, a, n, r) {
            var o = this;
            i.waitConfirm({
                title: e.title,
                content: e.content,
                width: e.width || 540,
                needFoot: !0
            }).then(function() {
                return o.handler(t, i, a, n, r)
            })
        },
        createEndpoint: function(e) {
            this.view.waitActionDialog({
                title: "创建实例",
                width: 540,
                needFoot: !0,
                url: "/iot/endpoint/create",
                actionOptions: e
            }).then(p["default"].bind(d, this))
        },
        createThing: function(e) {
            this.view.waitActionDialog({
                title: "创建设备",
                width: 640,
                needFoot: !0,
                foot: g,
                url: "/iot/thing/create",
                actionOptions: e
            }).then(p["default"].bind(l, this))
        },
        editThing: function(e) {
            this.view.waitActionDialog({
                title: "编辑设备",
                width: 640,
                needFoot: !0,
                foot: g,
                url: "/iot/thing/edit",
                actionOptions: e
            }).then(p["default"].bind(l, this))
        },
        createPrincipal: function(e) {
            this.view.waitActionDialog({
                title: "创建身份",
                width: 580,
                needFoot: !0,
                foot: g,
                url: "/iot/principal/create",
                actionOptions: e
            }).then(p["default"].bind(l, this))
        },
        editPrincipal: function(e) {
            this.view.waitActionDialog({
                title: "编辑身份",
                width: 580,
                needFoot: !0,
                foot: g,
                url: "/iot/principal/edit",
                actionOptions: e
            }).then(p["default"].bind(l, this))
        },
        viewPrincipalResult: function(e) {
            this.view.waitActionDialog({
                title: "查看密钥",
                width: 600,
                needFoot: !0,
                url: "/iot/principal/confirm",
                actionOptions: e
            }).then(function(t) {
                var i = t.target,
                a = i.getChild("foot").getChild("btnOk"),
                n = i.getChild("foot").getChild("btnCancel");
                n.hide(),
                a.on("click",
                function() {
                    e.parentAction.fire(c["default"].RENDER_AFTER_CONFIRM, e),
                    i && i.dispose()
                }),
                i.on("close",
                function() {
                    return e.parentAction.fire(c["default"].RENDER_AFTER_CONFIRM, e)
                }),
                n.on("click",
                function() {
                    i.fire("cancel"),
                    i.dispose()
                }),
                i.resize()
            })
        },
        createPolicy: function(e) {
            this.view.waitActionDialog({
                title: "创建策略",
                width: 560,
                needFoot: !0,
                url: "/iot/policy/create",
                actionOptions: e
            }).then(p["default"].bind(d, this))
        },
        editPolicy: function(e) {
            this.view.waitActionDialog({
                title: "编辑策略",
                width: 560,
                needFoot: !0,
                url: "/iot/policy/edit",
                actionOptions: e
            }).then(p["default"].bind(d, this))
        },
        createStorageCopy: function(e) {
            var t = this;
            u.call(this).done(function() {
                return t.view.waitActionDialog({
                    title: "创建归档",
                    width: 540,
                    needFoot: !0,
                    url: "/iot/storage/copy/create",
                    actionOptions: e
                }).then(p["default"].bind(d, t))
            })
        },
        createStorage: function(e) {
            this.view.waitActionDialog({
                title: "创建存储项",
                width: 540,
                needFoot: !0,
                url: "/iot/storage/create",
                actionOptions: e
            }).then(p["default"].bind(d, this))
        },
        editStorageCopy: function(e) {
            var t = this;
            u.call(this).done(function() {
                return t.view.waitActionDialog({
                    title: "编辑归档",
                    width: 540,
                    needFoot: !0,
                    url: "/iot/storage/edit",
                    actionOptions: e
                }).then(p["default"].bind(d, t))
            })
        },
        editStorage: function(e) {
            this.view.waitActionDialog({
                title: "编辑存储项",
                width: 540,
                needFoot: !0,
                url: "/iot/storage/create",
                actionOptions: e
            }).then(p["default"].bind(d, this))
        },
        startTurnkey: function() {
            var e = this;
            s.api.permissionTurnkey().then(function(t) {
                t.iothub ? t.tsdb ? e.redirect("/iot/turnkey/choose") : e.view.waitAlert({
                    title: "提示",
                    content: "请先开通TSDB服务",
                    width: 320
                }) : e.view.waitAlert({
                    title: "提示",
                    content: "请先开通IoT Hub服务",
                    width: 320
                })
            })
        }
    }
}),
define("iot/order/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/order/Notify",
        path: "/iot/order/initnotify"
    },
    {
        type: "iot/order/NewNotify",
        path: "/iot/order/notify"
    },
    {
        type: "iot/order/Create",
        path: "/iot/order/initcreate"
    },
    {
        type: "iot/order/NewCreate",
        path: "/iot/order/create"
    },
    {
        type: "iot/order/Upgrade",
        path: "/iot/order/upgrade"
    },
    {
        type: "iot/order/UpgradeUnicom",
        path: "/iot/order/upgradeUnicom"
    }]),
    module.exports = {
        saleTip: {
            1 : "注：购买时长至少为3个月",
            2 : "每位用户仅首次下单时可购买试用版；每月仅限前100位用户购买",
            3 : "本月100个1元试用版已售罄，您可选购小型设备版或大型设备版；每位用户仅首次下单时可购买试用版；每月仅限前100位用户购买试用版。",
            4 : "您已购买过1元试用版；每位用户仅首次下单时可购买试用版；每月仅限前100位用户购买试用版。",
            12 : "注：购买10个月赠送2个月"
        }
    }
}),
define("iot/order/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "../_public/util", "./CreateModel", "./CreateView", "../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("PURCHASE_LENGTH_CHANGE", this.updatePrice, this),
            this.view.on("MESSAGE_NUM_CHANGE", this.updatePurchaseLength, this),
            this.view.on("REFRESH", this.refresh, this),
            this.view.on("SUBMIT", this.submitOrder, this)
        },
        n.prototype.refresh = function() {
            this.reload()
        },
        n.prototype.updatePrice = function() {
            var e = {
                messagesNum: this.view.get("messagesNum").getValue(),
                purchaseLength: this.view.get("purchaseLength").getValue()
            };
            this.view.updateBuyBucket(e)
        },
        n.prototype.updatePurchaseLength = function() {
            this.view.messagesNumSelected(this.view.get("messagesNum").getValue())
        },
        n.prototype.submitOrder = function() {
            var e = this,
            t = this.model.getSubmitData(this.view.getFormData());
            this.model.getPrice(t).then(function(i) {
                var a = e.convertFormData2Order(t, i);
                e.view.renderOrderConfig(a, t)
            })
        },
        n.prototype.convertFormData2Order = function(e, t) {
            var i = u["default"].formatMoney(t.unitPrice),
            a = u["default"].formatMoney(t.price);
            return {
                serviceType: "IOT",
                productType: "prepay",
                type: "NEW",
                price: a,
                display: {
                    coupon: f["default"].isShowCoupon(e.messagesNum, e.purchaseLength)
                },
                items: [{
                    serviceType: "IOT",
                    productType: "prepay",
                    count: 1,
                    time: e.purchaseLength,
                    timeUnit: "MONTH",
                    price: a,
                    unitPrice: i,
                    unitPriceShow: "阶梯定价",
                    chargeType: ["cpt2"],
                    configuration: [e.messagesNum + "百万条/月"]
                }]
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return c["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/order/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_hubbus_preorder --\x3e\n<div class="iot-preorder-wrap main-wrap-new">\n\n    \x3c!-- import: TPL_inf_ria_page_breadcrumb --\x3e\n        \x3c!-- block: back_link --\x3e#/iot/endpoint/list\x3c!-- /block --\x3e\n        \x3c!-- block: text_content_wrapper --\x3e\n            ${i18n.创建套餐}\n        \x3c!-- /block --\x3e\n        \x3c!-- block: create_step --\x3e\n            <div data-ui-type="ViewStep"\n                data-ui-id="buyStep"\n                data-ui-current-step="1">\n                <ul>\n                    <li bind-for="buyIot">${i18n.选择计费套餐}</li>\n                    <li bind-for="orderConfirm">${i18n.确认订单}</li>\n                    <li>${i18n.在线支付}</li>\n                    <li>${i18n.支付成功}</li>\n                </ul>\n            </div>\n        \x3c!-- /block --\x3e\n    \x3c!-- /import --\x3e\n    <div class="content-wrap">\n        <div class="create-content create-content-wrapper">\n            <div id="buyIot">\n                <div class="create-main ui-tab-content">\n                    <div class="detail-parts-table">\n                        <form class="create-database-form" data-ui-type="Form" data-ui-id="form">\n                            <div data-ui-id="buyBucket" data-ui-type="BuyBucket"></div>\n                            <dl class="detail-part-1-col detail-create">\n                                <dt>\n                                    <h4><span>物接入配置信息</span></h4>\n                                </dt>\n                                <dd>\x3c!-- import: TPL_common_partial_create_current_region --\x3e</dd>\n                                <dd>\n                                    <label>购买规格：</label>\n                                    <div data-ui-type="Panel"\n                                         data-ui-id="messagesNumPanel"\n                                         class="package-list">\n                                        <div class="detail-cell package">\n                                            <div data-ui-id="messagesNum"\n                                                 data-ui-name="messagesNum"\n                                                 data-ui-datasource="@messagesNum"\n                                                 data-ui-type="Dragger"\n                                                 class="messagesNum">\n                                            </div>\n                                        </div>\n                                        <span class="unit">百万条/月</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                            <dl class="detail-part-1-col detail-create">\n                                <dt>\n                                    <h4><span>购买信息</span></h4>\n                                </dt>\n                                <dd data-ui-type="Panel" data-ui-id="panelPurchaseLength" class="form-row">\n                                    <label>购买时长：</label>\n                                    <div class="form-value">\n                                        <div data-ui-id="purchaseLength" data-ui-name="purchaseLength"\n                                             data-ui-type="RadioSelect" class="ui-radioselect-pl"></div>\n                                    </div>\n                                </dd>\n                            </dl>\n                        </form>\n                        <div class="free-notice"\n                            data-ui-type="ToastLabel"\n                            data-ui-message-type="alert"\n                            tip-message="免费">每月前一百万条免费。如果超过免费额度，我们将会收取相应费用。</div>\n                        \x3c!-- if: !${overdueStatus.pass} --\x3e\n                        <span class="tip-red overdue-notice">\n                            温馨提示：您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                        </span>\n                        \x3c!-- /if --\x3e\n                    </div>\n                </div>\n            </div>\n            <div id="orderConfirm" class="order-confirm-panel">\n                <div data-ui="id:orderAction;type:ActionPanel"></div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/order/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "er/events", "common/region", "../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](l),
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getPrice = function(e) {
            return s.api.getPrice(e, {
                "X-silence": !0
            })
        },
        n.prototype.load = function() {
            return this.get("region") && this.get("region") !== c["default"].getCurrentRegion().id && s.api.setRegion({
                regionId: this.get("region")
            }).then(function() {
                u["default"].fire("region_changed"),
                location.reload()
            }),
            a.prototype.load.call(this)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    purchaseLenDatasource: function(e) {
                        return [{
                            name: "1个月",
                            value: 1
                        },
                        {
                            name: "2",
                            value: 2
                        },
                        {
                            name: "3",
                            value: 3
                        },
                        {
                            name: "4",
                            value: 4
                        },
                        {
                            name: "5",
                            value: 5
                        },
                        {
                            name: "6",
                            value: 6
                        },
                        {
                            name: "7",
                            value: 7
                        },
                        {
                            name: "8",
                            value: 8
                        },
                        {
                            name: "9",
                            value: 9
                        },
                        {
                            name: "1年",
                            value: 12,
                            hoverContent: p["default"].saleTip[12]
                        },
                        {
                            name: "2年",
                            value: 24,
                            disable: !0
                        },
                        {
                            name: "3年",
                            value: 36,
                            disable: !0
                        }]
                    },
                    overdueStatus: function(e) {
                        return s.api.getOverdueStatus()
                    }
                }
            }
        }]),
        n
    } (d["default"]);
    module.exports = f
}),
define("iot/order/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/FormView", "inf-ria/app/brpc", "common/util/moneyUtil", "common/region"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = r["default"](d),
    h = [{
        title: "地域：",
        content: function(e) {
            return m["default"].getCurrentRegion().label
        }
    },
    {
        title: "购买规格：",
        content: function(e) {
            return e.messagesNum ? e.messagesNum + "百万条/月": "-"
        }
    },
    {
        title: "购买时长：",
        content: function(e) {
            if (!e.purchaseLength) return "-";
            if (e.purchaseLength >= 12) {
                return e.purchaseLength / 12 + "年"
            }
            return e.purchaseLength + "个月"
        }
    },
    {
        title: "价格：",
        content: function(e) {
            if (e.loading) return '<span class="loading">努力加载中...请稍候</span>';
            var t = "",
            i = e.discount < 100 ? f["default"].showMoney(e.originalPrice * e.discount / 100) : f["default"].showMoney(e.price);
            if (e.originalPrice !== i) {
                t = '<span class="price">￥' + i + '</span>\n                        <br>\n                        <strike class="original-price">原价：￥' + f["default"].showMoney(e.originalPrice) + "</strike>"
            } else t = '<span class="price">￥' + i + "</span>";
            return t
        }
    }],
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "buyBucket:confirm": function(t) {
                    e.fire("SUBMIT"),
                    t.preventDefault()
                },
                "buyBucket:reset": function(t) {
                    e.fire("REFRESH"),
                    t.preventDefault()
                },
                "messagesNum:change": function(t) {
                    return e.fire("MESSAGE_NUM_CHANGE")
                },
                "purchaseLength:change": function(t) {
                    return e.fire("PURCHASE_LENGTH_CHANGE")
                }
            }
        },
        n.prototype.renderOrderConfig = function(e, t) {
            var i = this.get("orderAction"),
            a = this.get("buyStep"),
            n = {
                order: e,
                config: t
            };
            p["default"].invokeService("billing://order_confirm", i, n).then(function() {
                i.on("action@prevPage",
                function() {
                    a.set("currentStep", 1),
                    i.disposeAction(),
                    i.innerHTML = ""
                }),
                a.set("currentStep", 2)
            })
        },
        n.prototype.updateBuyBucket = function(e) {
            var t = this;
            this.get("buyBucket").setValue({
                loading: !0,
                messagesNum: e.messagesNum,
                purchaseLength: e.purchaseLength,
                productType: "prepay"
            }),
            this.get("buyBucket").disable(),
            this.model.getPrice(e).then(function(i) {
                t.get("buyBucket").setValue({
                    loading: !1,
                    messagesNum: e.messagesNum,
                    purchaseLength: e.purchaseLength,
                    productType: "prepay",
                    price: i.price,
                    originalPrice: i.originalPrice,
                    discount: i.discount
                }),
                t.model.get("overdueStatus").pass ? t.get("buyBucket").enable() : t.get("buyBucket").disable()
            })
        },
        n.prototype.messagesNumSelected = function(e) {
            var t = [];
            1 === e ? (u["default"].each(this.model.get("purchaseLenDatasource"),
            function(e, i) {
                e.value > 3 ? e.disable = !0 : e.disable = !1,
                t.push(e)
            }), this.get("purchaseLength").setProperties({
                selectedIndex: 2
            })) : u["default"].each(this.model.get("purchaseLenDatasource"),
            function(e, i) {
                e.value > 12 ? e.disable = !0 : e.disable = !1,
                t.push(e)
            }),
            this.get("purchaseLength").setProperties({
                datasource: t
            }),
            this.updateBuyBucket({
                messagesNum: e,
                purchaseLength: this.get("purchaseLength").getValue()
            })
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.model.has("free") ? (this.get("messagesNum").setValue(1), this.messagesNumSelected(1)) : (this.get("messagesNum").setValue(2), this.messagesNumSelected(2))
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_hubbus_preorder"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    purchaseLength: {
                        datasource: "@purchaseLenDatasource",
                        selectedIndex: 0
                    },
                    messagesNum: {
                        min: 1,
                        max: 1e3,
                        length: 350,
                        value: 1
                    },
                    buyBucket: {
                        fields: h,
                        disabled: !0,
                        value: {},
                        offsetTop: 0,
                        confirmBtn: {
                            text: "下一步",
                            skin: "skin-primary-button"
                        }
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = b
}),
define("iot/order/NewCreate", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "jquery", "inf-ria/mvc/FormAction", "../_public/util", "./NewCreateModel", "./NewCreateView", "../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](l),
    b = n["default"](d),
    v = n["default"](u),
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("PURCHASE_LENGTH_CHANGE", this.updatePurchaseLength, this),
            this.view.on("MESSAGE_NUM_CHANGE", this.updatePurchaseLength, this),
            this.view.on("RESOURCE_TYPE_CHANGE", this.updateResourceType, this),
            this.view.on("PRICING_PACKAGE_CHANGE", this.updatePricingPackage, this),
            this.view.on("UNICOM_CARDNUM_CHANGE", this.updateUnicomCardNum, this),
            this.view.on("REFRESH", this.refresh, this),
            this.view.on("SUBMIT", this.submitOrder, this),
            this.view.on("CLOSE_ICON", this.closeTip, this),
            this.model.has("free") ? (this.redirectToHub(), this.view.showNormalHub(), this.view.messagesNumSelected(1), this.view.reRenderPricingPackage()) : this.model.has("unicom") ? this.view.initUnicom() : (this.model.has("hub") || this.view.reRenderPricingPackage(), this.redirectToHub(), this.view.showNormalHub(), this.view.get("messagesNum").setValue(2), this.view.messagesNumSelected(2))
        },
        n.prototype.redirectToHub = function() {
            var e = this;
            this.model.iotServiceStatus().then(function(t) {
                if (t.unicom) if (e.model.has("free")) {
                    var i = e.model.get("resourceType").slice(0);
                    i[1].disable = !0,
                    e.view.get("resourceType").setProperties({
                        datasource: i
                    })
                } else e.redirect("/iot/order/create~hub")
            })
        },
        n.prototype.refresh = function() {
            this.reload()
        },
        n.prototype.closeTip = function() {
            p["default"](".guide").addClass("disappear"),
            window.localStorage.setItem("popUnicomGuide", 1)
        },
        n.prototype.updatePurchaseLength = function() {
            var e = this.view.get("messagesNum").getValue(),
            t = this.view.get("resourceType").getValue();
            t = 2 === t ? 4 : 1 === e ? 1 : 2,
            this.view.messagesNumSelected(t)
        },
        n.prototype.updateResourceType = function() {
            var e = this.view.get("buyBucket"),
            t = this.view.get("resourceType").getValue();
            1 === t ? (this.view.showNormalHub(), e.set("fields", this.view.getCommonFields()), this.model.has("free") ? (this.view.get("messagesNum").setValue(1), this.view.messagesNumSelected(1)) : (this.view.get("messagesNum").setValue(2), this.view.get("purchaseLength").setValue(1), this.view.messagesNumSelected(2))) : 2 === t && (e.set("fields", this.view.getUnicomFields()), this.view.getTester() ? (this.view.showNormalUnicom(), this.view.get("pricingPackage").setValue(2), this.view.get("messagesNum").setValue(1), this.view.messagesNumSelected(4, !0)) : (this.view.showUnicom(), this.view.get("pricingPackage").setValue(1), this.view.messagesNumSelected(3)))
        },
        n.prototype.updatePricingPackage = function() {
            1 === this.view.get("pricingPackage").getValue() ? (this.view.showUnicom(), this.view.messagesNumSelected(3)) : (this.view.get("unicomCard").show(), this.view.get("messages").show(), this.view.get("messagesNum").setValue(1), this.view.get("unicomCardNum").setValue(1), this.view.messagesNumSelected(4, !0))
        },
        n.prototype.updateUnicomCardNum = function() {
            var e = this.model.getSubmitData(this.view.getFormData());
            this.view.updateBuyBucket(e)
        },
        n.prototype.getUnicomPostMsg = function(e, t) {
            var i = (e.area.province ? this.view.get("area").getChild("province").getSelectedItem().name: "") + "-" + (e.area.city ? this.view.get("area").getChild("city").getSelectedItem().name: "") + "-" + e.address + "-" + e.area.province + "-" + e.area.city;
            return c["default"].extend(t, {
                consignee: e.consignee,
                company: e.company,
                phone: e.phone,
                address: i
            })
        },
        n.prototype.submitOrder = function() {
            1 === this.view.get("resourceType").getValue() ? this.submitData() : this.view.get("form").validate() && this.submitData()
        },
        n.prototype.submitData = function() {
            var e = this,
            t = this.model.getSubmitData(this.view.getFormData()),
            i = 1 === this.view.get("resourceType").getValue() ? this.view.getCommonFormData(t) : this.view.getUnicomFormData(t);
            this.model.getPrice(i).then(function(a) {
                i = e.getUnicomPostMsg(t, i);
                var n = e.convertFormData2Order(i, a);
                e.view.renderOrderConfig(n, i)
            })
        },
        n.prototype.getConfInfo = function(e) {
            var t = "-";
            if ("COMMON" === e.type) t = [e.messagesNum + "百万条/月"];
            else {
                var i = this.view.get("pricingPackage").getValue();
                i = 1 === i ? "1元试用版": 2 === i ? "小型设备版": "大型设备版";
                var a = e.unicomMessagesNum;
                a < 1 ? a = 100 * a + "万条/月": a += "百万条/月",
                t = ["套餐类型：" + i, "物联网卡数：" + e.unicomCardNum + "张", "购买规格：" + a]
            }
            return t
        },
        n.prototype.convertFormData2Order = function(e, t) {
            var i = m["default"].formatMoney(t.unitPrice),
            a = m["default"].formatMoney(t.price);
            return {
                serviceType: "IOT",
                productType: "prepay",
                type: "NEW",
                price: a,
                display: {
                    coupon: v["default"].isShowCoupon(e.messagesNum, e.purchaseLength)
                },
                items: [{
                    serviceType: "IOT",
                    productType: "prepay",
                    count: 1,
                    time: e.purchaseLength,
                    timeUnit: "MONTH",
                    price: a,
                    unitPrice: i,
                    unitPriceShow: "阶梯定价",
                    chargeType: ["cpt2"],
                    configuration: this.getConfInfo(e)
                }]
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return b["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return h["default"]
            }
        }]),
        n
    } (f["default"]);
    module.exports = g
}),
define("iot/order/newCreate.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_new_hubbus_preorder --\x3e\n<div class="iot-new-preorder-wrap main-wrap-new">\n\n    \x3c!-- import: TPL_inf_ria_page_breadcrumb --\x3e\n        \x3c!-- block: back_link --\x3e#/iot/endpoint/list\x3c!-- /block --\x3e\n        \x3c!-- block: text_content_wrapper --\x3e\n            ${i18n.创建套餐}\n        \x3c!-- /block --\x3e\n        \x3c!-- block: create_step --\x3e\n            <div data-ui-type="ViewStep"\n                data-ui-id="buyStep"\n                data-ui-current-step="1">\n                <ul>\n                    <li bind-for="buyIot">${i18n.选择计费套餐}</li>\n                    <li bind-for="orderConfirm">${i18n.确认订单}</li>\n                    <li>${i18n.在线支付}</li>\n                    <li>${i18n.支付成功}</li>\n                </ul>\n            </div>\n        \x3c!-- /block --\x3e\n    \x3c!-- /import --\x3e\n    <div class="content-wrap">\n        <div class="create-content create-content-wrapper">\n            <div id="buyIot">\n                <div class="create-main ui-tab-content">\n                    <div class="detail-parts-table">\n                        <form class="create-database-form" data-ui-type="Form" data-ui-id="form">\n                            <div data-ui-id="buyBucket" data-ui-type="BuyBucket"></div>\n                            <dl class="detail-part-1-col detail-create config-info">\n                                <dt>\n                                    <h4><span>物接入配置信息</span></h4>\n                                </dt>\n                                <dd class="guide-line">\n                                    <label>资源类型：</label>\n                                    <div class="form-value">\n                                        <div data-ui-id="resourceType"\n                                            data-ui-name="resourceType"\n                                            data-ui-type="RadioSelect"\n                                            class="resource-type">\n                                        </div>\n                                        <span data-ui-type="Tip" class="resource-tip">物接入（SIM版）内含百度云天工和联通合作推出的天工物联网卡，以及定向到天工的物接入消息。详情可见<a href="https://cloud.baidu.com/doc/IOT/ProductDescription.html#.06.09.DD.B5.AB.B2.4F.4C.47.47.10.2D.BE.97.FC.BB">产品文档</a>。</span>\n                                    </div>\n                                    \x3c!-- if: !${resourceType[1].disable} && ${ifGuide} --\x3e\n                                    <div class="ui-radio-block guide">\n                                        <div class="ui-radio-item-hover">新款计费方式，欢迎使用\n                                            <esui-button class="ui-dialog-close-icon" data-ui-id="closeIcon">&nbsp;</esui-button>\n                                        </div>\n                                        <div class="arrow-down"><i></i></div>\n                                    </div>\n                                    \x3c!-- /if --\x3e\n                                </dd>\n                                <dd>\x3c!-- import: TPL_common_partial_create_current_region --\x3e</dd>\n                                <dd data-ui-type="Panel" data-ui-id="unicomChoice">\n                                    <label>套餐类型：</label>\n                                    <div class="form-value">\n                                        <div data-ui-id="pricingPackage"\n                                             data-ui-name="pricingPackage"\n                                             data-ui-type="RadioSelect"\n                                             class="pricing-pakage">\n                                        </div>\n                                    </div>\n                                </dd>\n                                 <dd data-ui-type="Panel" data-ui-id="unicomCard" class="cardNum">\n                                    <label>物联网卡数：</label>\n                                    <div data-ui-type="TextBox"\n                                         data-ui-name="unicomCardNum"\n                                         data-ui-id="unicomCardNum"\n                                         class="unicomCardNum">\n                                    </div>\n                                    <span class="unit">张</span>\n                                </dd>\n                                <dd data-ui-type="Panel" data-ui-id="messages">\n                                    <label>购买规格：</label>\n                                    <div data-ui-type="Panel"\n                                         data-ui-id="messagesNumPanel"\n                                         class="package-list">\n                                        <div class="detail-cell package">\n                                            <div data-ui-id="messagesNum"\n                                                 data-ui-name="messagesNum"\n                                                 data-ui-datasource="@messagesNum"\n                                                 data-ui-type="Dragger"\n                                                 class="messagesNum">\n                                            </div>\n                                        </div>\n                                        <span class="unit">百万条/月</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                            <dl class="detail-part-1-col detail-create">\n                                <dt>\n                                    <h4><span>购买信息</span></h4>\n                                </dt>\n                                <dd data-ui-type="Panel" data-ui-id="panelPurchaseLength" class="form-row">\n                                    <label>购买时长：</label>\n                                    <div class="form-value">\n                                        <div data-ui-id="purchaseLength" data-ui-name="purchaseLength"\n                                             data-ui-type="RadioSelect" class="ui-radioselect-pl"></div>\n                                    </div>\n                                </dd>\n                                <div class="free-notice"\n                                     data-ui-id="freeNotice"\n                                     data-ui-type="ToastLabel"\n                                     data-ui-message-type="alert"\n                                     tip-message="免费">每月前一百万条免费。如果超过免费额度，我们将会收取相应费用。</div>\n                                \x3c!-- if: !${overdueStatus.pass} --\x3e\n                                <span class="tip-red overdue-notice">\n                                    温馨提示：您已欠费!请<a href="/finance/#/finance/account/recharge">充值</a>后购买\n                                </span>\n                                \x3c!-- /if --\x3e\n                            </dl>\n                            <dl class="detail-part-1-col detail-create delivery-info" data-ui-type="Panel" data-ui-id="deliveryInfo">\n                                <dt>\n                                    <h4><span>收货信息</span></h4>\n                                </dt>\n                                <dd class="form-row">\n                                    <label><i>*</i>收货人姓名：</label>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                             data-ui-name="consignee"\n                                             data-ui-id="consignee"></div>\n                                    </div>\n                                </dd>\n                                <dd class="form-row">\n                                    <label><i>*</i>公司名称：</label>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                             data-ui-name="company"\n                                             data-ui-id="company"></div>\n                                    </div>\n                                </dd>\n                                <dd class="form-row">\n                                    <label><i>*</i>联系电话：</label>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                             data-ui-name="phone"\n                                             data-ui-id="phone"></div>\n                                    </div>\n                                </dd>\n                                <dd class="form-row">\n                                    <label><i>*</i>收货地址：</label>\n                                    <div class="form-value region-form-row">\n                                        <div data-ui="id:area;type:RegionSelect;name:area"></div>\n                                        <label data-ui-type="Validity"\n                                            data-ui-id="areaValidity"></label>\n                                    </div>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                            data-ui-name="address"\n                                            data-ui-id="address"\n                                            data-ui-mode="textarea"></div>\n                                    </div>\n                                </dd>\n                                <dd class="tip-grey">\n                                    温馨提示<br/>\n                                    1. 购买物接入（SIM版）套餐后，套餐内的天工物联卡配送物流为<b class="extra">顺丰</b>，付款方式为<b class="extra italic">到付，邮费用户自理（20元左右）。</b><br/>\n                                    2. 物接入（SIM版）套餐内含联通物联网卡，是百度云天工和联通合作推出的天工物联卡，该卡的消息仅支持用于天工的物接入SIM版，同时对于天工产品体系内物管理、物解析、规则引擎目前不支持物接入（SIM版），如需要使用请购买物接入资源。<br/>\n                                    3. 天工物联卡配送、售后、退换货等相关服务均由深圳汉讯信息技术有限公司提供并负责。<br/>\n                                    4. 物接入（SIM版）内含的天工物卡是联通普通物联网SIM卡，若需贴片式工业级SIM卡或插卡式SIM卡请提工单反馈。<br/>\n                                    5. 其他特殊情况请提工单反馈处理。\n                                </dd>\n                            </dl>\n                        </form>\n                    </div>\n                </div>\n            </div>\n            <div id="orderConfirm" class="order-confirm-panel">\n                <div data-ui="id:orderAction;type:ActionPanel"></div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/order/NewCreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "er/events", "common/config", "common/region", "../config", "./config", "../_public/regions"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](d),
    b = n["default"](u),
    v = window.localStorage,
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getPricingPackage = function() {
            return [{
                name: '<span data-index="0">1元试用版</span><span class="free">HOT</span><hr/><p data-index="0">卡数：3张（物联网卡）<br/>消息数：10万条消息/月<br/>消息长度：低于128字节<br/>时长：3个月</p>',
                value: 1,
                hoverContent: h["default"].saleTip[2]
            },
            {
                name: '<span data-index="1">小型设备版</span><hr/><p data-index="1">卡服务费：1元/卡/月<br/>消息数：100万条消息/15元/月<br/>消息长度：低于128字节</p>',
                value: 2
            },
            {
                name: '<span data-index="2">大型设备版</span><hr/><p data-index="2">卡服务费：1元/卡/月<br/>消息数：100万条消息/35元/月<br/>消息长度：低于512字节</p>',
                value: 3
            }]
        },
        n.prototype.iotServiceStatus = function() {
            return f["default"].api.iotServiceStatus()
        },
        n.prototype.getUnicomTester = function() {
            return l.api.getUnicomTester()
        },
        n.prototype.getPrice = function(e) {
            return l.api.getPrice(e, {
                "X-silence": !0
            })
        },
        n.prototype.load = function() {
            return this.get("region") && this.get("region") !== m["default"].getCurrentRegion().id && l.api.setRegion({
                regionId: this.get("region")
            }).then(function() {
                p["default"].fire("region_changed"),
                location.reload()
            }),
            a.prototype.load.call(this)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    purchaseLenDatasource: function(e) {
                        return [{
                            name: "1个月",
                            value: 1
                        },
                        {
                            name: "2",
                            value: 2
                        },
                        {
                            name: "3",
                            value: 3
                        },
                        {
                            name: "4",
                            value: 4
                        },
                        {
                            name: "5",
                            value: 5
                        },
                        {
                            name: "6",
                            value: 6
                        },
                        {
                            name: "7",
                            value: 7
                        },
                        {
                            name: "8",
                            value: 8
                        },
                        {
                            name: "9",
                            value: 9
                        },
                        {
                            name: "1年",
                            value: 12,
                            hoverContent: h["default"].saleTip[12]
                        },
                        {
                            name: "2年",
                            value: 24,
                            disable: !0
                        },
                        {
                            name: "3年",
                            value: 36,
                            disable: !0
                        }]
                    },
                    resourceType: function(e) {
                        var t = [{
                            name: "物接入",
                            value: 1
                        },
                        {
                            name: "物接入（SIM版）",
                            value: 2
                        }];
                        return e.has("unicom") ? t[0].disable = !0 : e.has("hub") && (t[1].disable = !0),
                        t
                    },
                    area: function(e) {
                        return {
                            country: "086",
                            province: "",
                            city: ""
                        }
                    },
                    areaSource: function(e) {
                        return b["default"]
                    },
                    overdueStatus: function(e) {
                        return l.api.getOverdueStatus()
                    },
                    ifGuide: function(e) {
                        return ! v.getItem("popUnicomGuide")
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = g
}),
define("iot/order/NewCreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./newCreate.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/FormView", "inf-ria/app/brpc", "common/util/moneyUtil", "common/region", "../_public/util", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](u),
    g = r["default"](c),
    y = !1,
    w = {
        title: "地域：",
        content: function(e) {
            return b["default"].getCurrentRegion().label
        }
    },
    x = {
        title: "购买规格：",
        content: function(e) {
            return e.messagesNum ? e.messagesNum + "百万条/月": "-"
        }
    },
    T = {
        title: "购买规格：",
        content: function(e) {
            return e.unicomMessagesNum ? e.unicomMessagesNum < 1 ? 100 * e.unicomMessagesNum + "万条/月": e.unicomMessagesNum + "百万条/月": "-"
        }
    },
    _ = {
        title: "购买时长：",
        content: function(e) {
            if (!e.purchaseLength) return "-";
            if (e.purchaseLength >= 12) {
                return e.purchaseLength / 12 + "年"
            }
            return e.purchaseLength + "个月"
        }
    },
    E = {
        title: "套餐类型：",
        content: function(e) {
            return e.pricingPackage ? 2 === e.pricingPackage ? "小型设备版": 3 === e.pricingPackage ? "大型设备版": "1元试用版": "-"
        }
    },
    k = {
        title: "物联网卡数：",
        content: function(e) {
            return e.unicomCardNum ? e.unicomCardNum + "张": "3张"
        }
    },
    S = {
        title: "价格：",
        content: function(e) {
            if (e.loading) return '<span class="loading">努力加载中...请稍候</span>';
            var t = "",
            i = e.discount < 100 ? h["default"].showMoney(e.originalPrice * e.discount / 100) : h["default"].showMoney(e.price);
            if (e.originalPrice !== i) {
                t = '<span class="price">￥' + i + '</span>\n                    <br>\n                    <strike class="original-price">原价：￥' + h["default"].showMoney(e.originalPrice) + "</strike>"
            } else t = '<span class="price">￥' + i + "</span>";
            return t
        }
    },
    C = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "buyBucket:confirm": function(t) {
                    e.fire("SUBMIT"),
                    t.preventDefault()
                },
                "buyBucket:reset": function(t) {
                    e.fire("REFRESH"),
                    t.preventDefault()
                },
                "messagesNum:change": function(t) {
                    return e.fire("MESSAGE_NUM_CHANGE")
                },
                "purchaseLength:change": function(t) {
                    return e.fire("PURCHASE_LENGTH_CHANGE")
                },
                "resourceType:change": function(t) {
                    return e.fire("RESOURCE_TYPE_CHANGE")
                },
                "pricingPackage:change": function(t) {
                    return e.fire("PRICING_PACKAGE_CHANGE")
                },
                "unicomCardNum:input": function(t) {
                    return e.fire("UNICOM_CARDNUM_CHANGE")
                },
                "closeIcon:click": function(t) {
                    return e.fire("CLOSE_ICON", t)
                }
            }
        },
        n.prototype.getUIProperties = function() {
            return {
                resourceType: {
                    datasource: "@resourceType",
                    selectedIndex: 0
                },
                pricingPackage: {
                    datasource: this.model.getPricingPackage(),
                    selectedIndex: 0
                },
                messagesNum: {
                    min: 1,
                    max: 1e3,
                    length: 350,
                    value: 1
                },
                purchaseLength: {
                    datasource: "@purchaseLenDatasource",
                    selectedIndex: 0
                },
                unicomCardNum: {
                    width: 60,
                    placeholder: "1",
                    value: 1,
                    pattern: /^\+?[1-9][0-9]*$/
                },
                consignee: {
                    width: 275,
                    placeholder: "请输入收货人",
                    required: "required"
                },
                company: {
                    width: 275,
                    placeholder: "请输入公司名称",
                    required: "required"
                },
                phone: {
                    width: 275,
                    required: "required",
                    placeholder: "请输入联系电话",
                    pattern: /(^(1(3|4|5|7|8)\d{9})?$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/,
                    patternErrorMessage: "您输入的联系电话格式不正确"
                },
                area: {
                    datasource: "@areaSource",
                    required: !0,
                    value: "@area",
                    validityLabel: "areaValidity",
                    extensions: v["default"].autoValidateExt
                },
                address: {
                    width: 275,
                    height: 58,
                    required: "required",
                    placeholder: "请输入详细收货地址",
                    pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                    patternErrorMessage: "请输入合法的中英文字符"
                },
                buyBucket: {
                    fields: this.getCommonFields(),
                    disabled: !0,
                    value: {},
                    offsetTop: 0,
                    confirmBtn: {
                        text: "下一步",
                        skin: "skin-primary-button"
                    }
                }
            }
        },
        n.prototype.getCommonFields = function() {
            return [w, x, _, S]
        },
        n.prototype.getUnicomFields = function() {
            return [w, E, k, T, _, S]
        },
        n.prototype.getTester = function() {
            return y
        },
        n.prototype.renderOrderConfig = function(e, t) {
            var i = this.get("orderAction"),
            a = this.get("buyStep"),
            n = {
                order: e,
                config: t
            };
            m["default"].invokeService("billing://order_confirm", i, n).then(function() {
                i.on("action@prevPage",
                function() {
                    a.set("currentStep", 1),
                    i.disposeAction(),
                    i.innerHTML = ""
                }),
                a.set("currentStep", 2)
            })
        },
        n.prototype.getCommonFormData = function(e) {
            return {
                messagesNum: e.messagesNum,
                purchaseLength: e.purchaseLength,
                type: "COMMON"
            }
        },
        n.prototype.getUnicomFormData = function(e) {
            var t = e.pricingPackage,
            i = 3,
            a = !0,
            n = 128,
            r = .1;
            return 1 !== t && (a = !1, n = 3 === t ? 512 : n, r = e.messagesNum, i = e.unicomCardNum ? parseInt(e.unicomCardNum, 10) : 1),
            {
                purchaseLength: e.purchaseLength,
                type: "CHINA_UNICOM",
                tester: a,
                unicomCardNum: i,
                unicomMessageByte: n,
                unicomMessagesNum: r
            }
        },
        n.prototype.updateBuyBucket = function(e) {
            var t = this,
            i = 1 === e.resourceType ? this.getCommonFormData(e) : this.getUnicomFormData(e);
            this.get("buyBucket").setValue(p["default"].extend({
                loading: !0,
                productType: "prepay",
                pricingPackage: e.pricingPackage
            },
            i)),
            this.get("buyBucket").disable(),
            this.model.getPrice(i).then(function(a) {
                t.get("buyBucket").setValue(p["default"].extend({
                    loading: !1,
                    productType: "prepay",
                    price: a.price,
                    originalPrice: a.originalPrice,
                    discount: a.discount,
                    pricingPackage: e.pricingPackage
                },
                i)),
                t.model.get("overdueStatus").pass ? t.get("buyBucket").enable() : t.get("buyBucket").disable()
            })
        },
        n.prototype.messagesNumSelected = function(e, t) {
            var i = [];
            p["default"].each(this.model.get("purchaseLenDatasource"),
            function(t, a) {
                t.value > 12 || (1 === e || 3 === e) && t.value > 3 || (3 === e || 4 === e) && t.value < 3 ? t.disable = !0 : t.disable = !1,
                i.push(t)
            }),
            this.get("purchaseLength").setProperties({
                datasource: i
            }),
            (1 === e || 3 === e || t) && this.get("purchaseLength").setProperties({
                selectedIndex: 2
            });
            var a = 3 === e ? .1 : this.get("messagesNum").getValue(),
            n = this.getFormData();
            this.updateBuyBucket(p["default"].extend(n, {
                messagesNum: a
            }))
        },
        n.prototype.initUnicomCommon = function() {
            this.showNormalUnicom(),
            this.get("pricingPackage").setValue(2),
            this.messagesNumSelected(4, !0),
            this.get("buyBucket").setValue(this.getFormData())
        },
        n.prototype.initUnicomTester = function() {
            this.showUnicom(),
            this.messagesNumSelected(3),
            this.get("buyBucket").setValue(this.getFormData())
        },
        n.prototype.reRenderPricingPackage = function(e) {
            var t = this;
            this.model.getUnicomTester().then(function(i) {
                if (i.full || i.boughtBefore) {
                    var a = t.model.getPricingPackage();
                    a[0].disable = !0,
                    a[0].name = '<span data-index="0">1元试用版</span><hr/><p data-index="0">卡数：3张（物联网卡）<br/>消息数：10万条消息/月<br/>消息长度：低于128字节<br/>时长：3个月</p>',
                    i.full && (a[0].hoverContent = g["default"].saleTip[3]),
                    i.boughtBefore && (a[0].hoverContent = g["default"].saleTip[4]),
                    t.get("pricingPackage").setProperties({
                        datasource: a
                    }),
                    y = !0,
                    e && t.initUnicomCommon()
                } else e && t.initUnicomTester()
            })
        },
        n.prototype.initUnicom = function() {
            this.get("resourceType").setValue(2),
            this.get("buyBucket").set("fields", this.getUnicomFields()),
            this.reRenderPricingPackage(!0)
        },
        n.prototype.showNormalHub = function() {
            this.get("unicomChoice").hide(),
            this.get("unicomCard").hide(),
            this.get("deliveryInfo").hide(),
            this.get("messages").show(),
            this.get("freeNotice").show()
        },
        n.prototype.showUnicom = function() {
            this.get("unicomChoice").show(),
            this.get("unicomCard").hide(),
            this.get("deliveryInfo").show(),
            this.get("messages").hide(),
            this.get("freeNotice").hide()
        },
        n.prototype.showNormalUnicom = function() {
            this.get("unicomChoice").show(),
            this.get("unicomCard").show(),
            this.get("deliveryInfo").show(),
            this.get("messages").show(),
            this.get("freeNotice").hide()
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_new_hubbus_preorder"
            }
        }]),
        n
    } (f["default"]);
    module.exports = C
}),
define("iot/order/NewNotify", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./NewNotifyModel", "./NewNotifyView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_FREE", this.createFree, this),
            this.view.on("CREATE", this.createPackage, this),
            this.view.on(u["default"].START_TURNKEY, c["default"].startTurnkey, this)
        },
        n.prototype.createFree = function() {
            this.redirect("/iot/order/create~free")
        },
        n.prototype.createPackage = function() {
            this.redirect("/iot/order/create")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/order/newNotify.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_charge_new_notify --\x3e\n<div class="iot-order-new-notify main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物接入IoT Hub</span>\n        </p>\n        <div class="list-content main-view">\n            \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n            <h2 class="top-tip">\n                <span class="tip-yellow">为保证安全，创建新实例需要实名认证，已经创建的实例仍可以正常使用不受影响。<a href="/qualify/#/qualify/index" target="_blank">立即去认证</a></span>\n            </h2>\n            \x3c!-- /if --\x3e\n            <h2 class="no-bottom-border">物接入简介</h2>\n            <div class="main-content">\n                <div class="description">\n                    物接入（IoT Hub）是一个全托管的云服务，帮助建立设备与云端之间安全可靠的双向连接，以支撑海量设备的数据收集、监控、故障预测等各种物联网场景。\n                </div>\n                <div class="operation-wrap" data-follow-thead="table">\n                    <div class="buttons-wrap">\n                        <button data-ui-id="createPackage"\n                                data-ui-type="Button"\n                                data-ui-skin="create"\n                                \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n                                data-ui-disabled="disabled"\n                                \x3c!-- /if --\x3e>创建计费套餐</button>\n                        <button data-ui-id="createFreePackage" data-ui-type="Button" \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n                                data-ui-disabled="disabled"\n                                \x3c!-- /if --\x3e>立即试用</button>\n                        <button data-ui-id="turnkey"\n                                data-ui-type="Button" \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n                                data-ui-disabled="disabled"\n                                \x3c!-- /if --\x3e>物联网快速应用通道</button>\n                    </div>\n                </div>\n                <div class="line-seperator"></div>\n                <div class="section">\n                    <div class="section-header">\n                        <h2>物接入使用流程</h2>\n                        <a href="https://cloud.baidu.com/doc/IOT/ProductDescription.html?from=productToDoc#.E4.BB.8B.E7.BB.8D" target="_blank">了解更多></a>\n                    </div>\n                    <div class="illustration">\n                        <div class="article">\n                            <div class="pic1"></div>\n                            <div class="title">创建费用套餐</div>\n                            <div class="define">免费套餐/收费套餐</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Pricing.html#Pricing" target="_blank">查看详情></a>\n                        </div>\n                        <div class="article">\n                            <div class="pic2"></div>\n                            <div class="title">创建和配置实例</div>\n                            <div class="define">创建物接入的实例、设备、身份、主题等实例要素</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Quickstart.html#.E5.88.9B.E5.BB.BA.E5.AE.9E.E4.BE.8B" target="_blank">查看详情></a>\n                        </div>\n                        <div class="article">\n                            <div class="pic3"></div>\n                            <div class="title">配置MQTT客户端</div>\n                            <div class="define">设备端配置MQTT客户端</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Quickstart.html#.E9.85.8D.E7.BD.AEMQTT.E5.AE.A2.E6.88.B7.E7.AB.AF" target="_blank">查看详情></a>\n                        </div>\n                        <div class="article">\n                            <div class="pic4"></div>\n                            <div class="title">收发消息</div>\n                            <div class="define">通过PUB、SUB收发消息</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Quickstart.html#.E5.BA.94.E7.94.A8IoT.20Hub.E6.9C.8D.E5.8A.A1" target="_blank">查看详情></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="right-siderbar">\n            <div class="wrapper">\n                <div class="right-siderbar-header">相关产品</div>\n                <div class="product-list">\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-modbus"></i></span>\n                        <a href="https://cloud.baidu.com/product/iot_parser.html" target="_blank">\n                            <div class="title">物解析</div>\n                            <div class="desp">简单快速完成各种设备数据协议解析</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iotdm"></i></span>\n                        <a href="https://cloud.baidu.com/product/iotdm.html" target="_blank">\n                            <div class="title">物管理</div>\n                            <div class="desp">智能、强大的设备管理平台</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-tsdb"></i></span>\n                        <a href="https://cloud.baidu.com/product/tsdb.html" target="_blank">\n                            <div class="title">时序数据库</div>\n                            <div class="desp">存储时间序列数据的高性能数据库</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iotre"></i></span>\n                        <a href="https://cloud.baidu.com/product/re.html" target="_blank">\n                            <div class="title">规则引擎</div>\n                            <div class="desp">灵活定义各种联动规则，与云端服务无缝连接</div>\n                        </a>\n                    </div>\n                </div>\n            </div>\n            <div class="line-seperator"></div>\n            <div class="help">\n                <div class="title">用户指南</div>\n                <a href="https://cloud.baidu.com/doc/IOT/index.html" target="_blank">帮助文档></a>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/order/NewNotifyModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    realName: function() {
                        return r.api.getRealNameStatus()
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/order/NewNotifyView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./newNotify.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "createFreePackage:click": function(t) {
                    return e.fire("CREATE_FREE", t)
                },
                "createPackage:click": function(t) {
                    return e.fire("CREATE", t)
                },
                "turnkey:click": function(t) {
                    return e.fire("START_TURNKEY", t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_charge_new_notify"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/order/Notify", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./NotifyModel", "./NotifyView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("CREATE_FREE", this.createFree, this),
            this.view.on("CREATE", this.createPackage, this),
            this.view.on(u["default"].START_TURNKEY, c["default"].startTurnkey, this)
        },
        n.prototype.createFree = function() {
            this.redirect("/iot/order/create~free")
        },
        n.prototype.createPackage = function() {
            this.redirect("/iot/order/create")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/order/notify.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_charge_notify --\x3e\n<div class="iot-order-notify main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>产品服务</span>\n            <span class="divider">/</span>\n            <span class="active">物接入IoT Hub</span>\n        </p>\n        <div class="list-content main-view">\n            \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n            <h2 class="top-tip">\n                <span class="tip-yellow">为保证安全，创建新实例需要实名认证，已经创建的实例仍可以正常使用不受影响。<a href="/qualify/#/qualify/index" target="_blank">立即去认证</a></span>\n            </h2>\n            \x3c!-- /if --\x3e\n            <h2 class="no-bottom-border">物接入简介</h2>\n            <div class="main-content">\n                <div class="description">\n                    物接入（IoT Hub）是一个全托管的云服务，帮助建立设备与云端之间安全可靠的双向连接，以支撑海量设备的数据收集、监控、故障预测等各种物联网场景。\n                </div>\n                <div class="operation-wrap" data-follow-thead="table">\n                    <div class="buttons-wrap">\n                        <button data-ui-id="createPackage"\n                                data-ui-type="Button"\n                                data-ui-skin="create"\n                                \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n                                data-ui-disabled="disabled"\n                                \x3c!-- /if --\x3e>创建计费套餐</button>\n                        <button data-ui-id="createFreePackage" data-ui-type="Button" \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n                                data-ui-disabled="disabled"\n                                \x3c!-- /if --\x3e>免费试用</button>\n                        <button data-ui-id="turnkey"\n                                data-ui-type="Button" \x3c!-- if: ${realName.status} !== \'PASS\' --\x3e\n                                data-ui-disabled="disabled"\n                                \x3c!-- /if --\x3e>物联网快速应用通道</button>\n                    </div>\n                </div>\n                <div class="line-seperator"></div>\n                <div class="section">\n                    <div class="section-header">\n                        <h2>物接入使用流程</h2>\n                        <a href="https://cloud.baidu.com/doc/IOT/ProductDescription.html?from=productToDoc#.E4.BB.8B.E7.BB.8D" target="_blank">了解更多></a>\n                    </div>\n                    <div class="illustration">\n                        <div class="article">\n                            <div class="pic1"></div>\n                            <div class="title">创建费用套餐</div>\n                            <div class="define">免费套餐/收费套餐</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Pricing.html#Pricing" target="_blank">查看详情></a>\n                        </div>\n                        <div class="article">\n                            <div class="pic2"></div>\n                            <div class="title">创建和配置实例</div>\n                            <div class="define">创建物接入的实例、设备、身份、主题等实例要素</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Quickstart.html#.E5.88.9B.E5.BB.BA.E5.AE.9E.E4.BE.8B" target="_blank">查看详情></a>\n                        </div>\n                        <div class="article">\n                            <div class="pic3"></div>\n                            <div class="title">配置MQTT客户端</div>\n                            <div class="define">设备端配置MQTT客户端</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Quickstart.html#.E9.85.8D.E7.BD.AEMQTT.E5.AE.A2.E6.88.B7.E7.AB.AF" target="_blank">查看详情></a>\n                        </div>\n                        <div class="article">\n                            <div class="pic4"></div>\n                            <div class="title">收发消息</div>\n                            <div class="define">通过PUB、SUB收发消息</div>\n                            <a href="https://cloud.baidu.com/doc/IOT/Quickstart.html#.E5.BA.94.E7.94.A8IoT.20Hub.E6.9C.8D.E5.8A.A1" target="_blank">查看详情></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="right-siderbar">\n            <div class="wrapper">\n                <div class="right-siderbar-header">相关产品</div>\n                <div class="product-list">\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-modbus"></i></span>\n                        <a href="https://cloud.baidu.com/product/iot_parser.html" target="_blank">\n                            <div class="title">物解析</div>\n                            <div class="desp">简单快速完成各种设备数据协议解析</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iotdm"></i></span>\n                        <a href="https://cloud.baidu.com/product/iotdm.html" target="_blank">\n                            <div class="title">物管理</div>\n                            <div class="desp">智能、强大的设备管理平台</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-tsdb"></i></span>\n                        <a href="https://cloud.baidu.com/product/tsdb.html" target="_blank">\n                            <div class="title">时序数据库</div>\n                            <div class="desp">存储时间序列数据的高性能数据库</div>\n                        </a>\n                    </div>\n                    <div class="product">\n                        <span class="icon"><i class="iconfont icon-iotre"></i></span>\n                        <a href="https://cloud.baidu.com/product/re.html" target="_blank">\n                            <div class="title">规则引擎</div>\n                            <div class="desp">灵活定义各种联动规则，与云端服务无缝连接</div>\n                        </a>\n                    </div>\n                </div>\n            </div>\n            <div class="line-seperator"></div>\n            <div class="help">\n                <div class="title">用户指南</div>\n                <a href="https://cloud.baidu.com/doc/IOT/index.html" target="_blank">帮助文档></a>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/order/NotifyModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    realName: function() {
                        return r.api.getRealNameStatus()
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/order/NotifyView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./notify.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "createFreePackage:click": function(t) {
                    return e.fire("CREATE_FREE", t)
                },
                "createPackage:click": function(t) {
                    return e.fire("CREATE", t)
                },
                "turnkey:click": function(t) {
                    return e.fire("START_TURNKEY", t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_charge_notify"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/order/Upgrade", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "../_public/util", "./UpgradeModel", "./UpgradeView", "../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("PURCHASE_LENGTH_CHANGE", this.updatePrice, this),
            this.view.on("MESSAGE_NUM_CHANGE", this.updatePurchaseLength, this),
            this.view.on("REFRESH", this.refresh, this),
            this.view.on("SUBMIT", this.submitOrder, this)
        },
        n.prototype.refresh = function() {
            this.reload()
        },
        n.prototype.updatePrice = function() {
            var e = {
                messagesNum: this.view.get("messagesNum").getValue(),
                purchaseLength: this.view.get("purchaseLength").getValue()
            };
            this.view.updateBuyBucket(e)
        },
        n.prototype.updatePurchaseLength = function() {
            this.view.messagesNumSelected(this.view.get("messagesNum").getValue())
        },
        n.prototype.submitOrder = function() {
            var e = this,
            t = this.model.getSubmitData(this.view.getFormData()),
            i = {
                messagesNum: t.messagesNum,
                iotResourceId: this.model.get("resourceId")
            };
            this.model.getPrice(i).then(function(i) {
                var a = e.convertFormData2Order(t, i),
                n = {
                    messagesNum: t.messagesNum,
                    instanceId: e.model.get("resourceId"),
                    type: "COMMON"
                };
                e.view.renderOrderConfig(a, n)
            })
        },
        n.prototype.convertFormData2Order = function(e, t) {
            var i = u["default"].formatMoney(t.unitPrice),
            a = u["default"].formatMoney(t.price);
            return {
                serviceType: "IOT",
                productType: "prepay",
                type: "RESIZE",
                price: a,
                display: {
                    coupon: f["default"].isShowCoupon(e.messagesNum, e.purchaseLength)
                },
                items: [{
                    serviceType: "IOT",
                    productType: "prepay",
                    count: 1,
                    time: e.purchaseLength,
                    timeUnit: "MONTH",
                    price: a,
                    unitPrice: i,
                    unitPriceShow: "阶梯定价",
                    chargeType: ["cpt2"],
                    configuration: [e.messagesNum + "百万条/月"]
                }]
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return c["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/order/upgrade.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_hubbus_upgrade --\x3e\n<div class="iot-preorder-wrap main-wrap-new">\n\n    \x3c!-- import: TPL_inf_ria_page_breadcrumb --\x3e\n        \x3c!-- block: back_link --\x3e#/iot/endpoint/list\x3c!-- /block --\x3e\n        \x3c!-- block: text_content_wrapper --\x3e\n            ${i18n.配置升级}\n        \x3c!-- /block --\x3e\n        \x3c!-- block: create_step --\x3e\n            <div data-ui-type="ViewStep"\n                data-ui-id="buyStep"\n                data-ui-current-step="1">\n                <ul>\n                    <li bind-for="buyIot">${i18n.升级物接入配置}</li>\n                    <li bind-for="orderConfirm">${i18n.确认订单}</li>\n                    <li>${i18n.在线支付}</li>\n                    <li>${i18n.支付成功}</li>\n                </ul>\n            </div>\n        \x3c!-- /block --\x3e\n    \x3c!-- /import --\x3e\n    <div class="content-wrap">\n        <div class="create-content create-content-wrapper">\n            <div id="buyIot">\n                <div class="create-main ui-tab-content">\n                    <div class="detail-parts-table">\n                        <form class="create-database-form" data-ui-type="Form" data-ui-id="form">\n                            <div data-ui-id="buyBucket" data-ui-type="BuyBucket"></div>\n                            <dl class="detail-part-1-col detail-create">\n                                <dt>\n                                    <h4><span>当前配置</span></h4>\n                                </dt>\n                                <dd>\n                                    <div class="detail-cell">\n                                        <label>支付方式：</label>\n                                        <span class="no-content">\n                                            \x3c!-- if: ${orderDetail.productType} === \'prepay\' --\x3e\n                                            预付费\n                                            \x3c!-- else: --\x3e\n                                            后付费\n                                            \x3c!-- /if --\x3e\n                                        </span>\n                                    </div>\n                                    <div class="detail-cell">\n                                        <label>购买规格：</label>\n                                        <span class="no-content">${orderDetail.messagesNum}百万条/月</span>\n                                    </div>\n                                </dd>\n                                <dd>\n                                    <div class="detail-cell">\n                                        <label>到期时间：</label>\n                                        <span class="no-content">${orderDetail.expireTime}</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                            <dl class="detail-part-1-col detail-create">\n                                <dt>\n                                    <h4><span>购买信息</span></h4>\n                                </dt>\n                                <dd>\n                                    <label>购买规格：</label>\n                                    <div data-ui-type="Panel"\n                                         data-ui-id="messagesNumPanel"\n                                         class="package-list">\n                                        <div class="detail-cell package">\n                                            <div data-ui-id="messagesNum"\n                                                 data-ui-name="messagesNum"\n                                                 data-ui-datasource="@messagesNum"\n                                                 data-ui-type="Dragger"\n                                                 class="messagesNum"></div>\n                                        </div>\n                                        <span class="unit">百万条/月</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                        </form>\n                    </div>\n                </div>\n            </div>\n            <div id="orderConfirm" class="order-confirm-panel">\n                <div data-ui="id:orderAction;type:ActionPanel"></div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/order/UpgradeModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getPrice = function(e) {
            return o.api.getUpgradePrice(e, {
                "X-silence": !0
            })
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    orderDetail: function(e) {
                        return o.api.getPackageDetail().then(function(t) {
                            return t.expireTime = l["default"].toTime(t.expireTime),
                            e.set("resourceId", t.resourceId),
                            e.set("minMessagesNum", t.messagesNum + 1),
                            e.set("maxMessagesNum", o.maxMessagesNum),
                            t
                        })
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/order/UpgradeUnicom", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "underscore", "../_public/util", "./UpgradeUnicomModel", "./UpgradeUnicomView", "../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = 2,
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("PURCHASE_LENGTH_CHANGE", this.updatePrice, this),
            this.view.on("MESSAGE_NUM_CHANGE", this.updatePurchaseLength, this),
            this.view.on("REFRESH", this.refresh, this),
            this.view.on("SUBMIT", this.submitOrder, this),
            this.view.on("PRICING_PACKAGE_CHANGE", this.updatePrice, this),
            this.view.on("UNICOM_CARDNUM_CHANGE", this.updateCardNum, this)
        },
        n.prototype.refresh = function() {
            this.reload()
        },
        n.prototype.updatePurchaseLength = function() {
            this.view.messagesNumSelected(this.view.get("messagesNum").getValue())
        },
        n.prototype.updatePrice = function() {
            var e = this.model.getSubmitData(this.view.getFormData()),
            t = this.view.getPricingPackage(e),
            i = e.unicomCardNum || 0;
            this.view.updateBuyBucket(c["default"].extend(e, {
                pricingPackage: t,
                unicomCardNum: i
            }))
        },
        n.prototype.updateCardNum = function() {
            this.view.get("unicomCardNum").getValue() > 0 ? this.view.get("deliveryInfo").show() : this.view.get("deliveryInfo").hide(),
            this.updatePrice()
        },
        n.prototype.getUnicomPostMsg = function(e, t) {
            var i = (e.area.province ? this.view.get("area").getChild("province").getSelectedItem().name: "") + "-" + (e.area.city ? this.view.get("area").getChild("city").getSelectedItem().name: "") + "-" + e.address + "-" + e.area.province + "-" + e.area.city;
            return c["default"].extend(t, {
                consignee: e.consignee,
                company: e.company,
                phone: e.phone,
                address: i
            })
        },
        n.prototype.submitOrder = function() {
            var e = this;
            this.view.get("form").validate() &&
            function() {
                var t = e.model.getSubmitData(e.view.getFormData()),
                i = e.view.getPricingPackage(t);
                b = i;
                var a = e.view.getUnicomFormData(c["default"].extend(t, {
                    pricingPackage: i
                })),
                n = e.model.get("cardNum") + a.unicomCardNum;
                a = c["default"].extend(a, {
                    unicomCardNum: n
                }),
                e.model.getPrice(a).then(function(i) {
                    a = e.getUnicomPostMsg(t, a);
                    var n = e.convertFormData2Order(a, i),
                    r = c["default"].extend(a, {
                        instanceId: e.model.get("resourceId")
                    });
                    e.view.renderOrderConfig(n, r)
                })
            } ()
        },
        n.prototype.getConfInfo = function(e) {
            var t = 2 === b ? "小型设备版": "大型设备版",
            i = e.unicomMessagesNum + "百万条/月";
            return ["套餐类型：" + t, "物联网卡数：" + e.unicomCardNum + "张", "购买规格：" + i]
        },
        n.prototype.convertFormData2Order = function(e, t) {
            var i = p["default"].formatMoney(t.unitPrice),
            a = p["default"].formatMoney(t.price);
            return {
                serviceType: "IOT",
                productType: "prepay",
                type: "RESIZE",
                price: a,
                display: {
                    coupon: h["default"].isShowCoupon(e.messagesNum, e.purchaseLength)
                },
                items: [{
                    serviceType: "IOT",
                    productType: "prepay",
                    count: 1,
                    time: e.purchaseLength,
                    timeUnit: "MONTH",
                    price: a,
                    unitPrice: i,
                    unitPriceShow: "阶梯定价",
                    chargeType: ["cpt2"],
                    configuration: this.getConfInfo(e)
                }]
            }
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return f["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = v
}),
define("iot/order/upgradeUnicom.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_hubbus_upgrade_unicom --\x3e\n<div class="iot-new-preorder-wrap main-wrap-new iot-upgrade-unicom">\n\n    \x3c!-- import: TPL_inf_ria_page_breadcrumb --\x3e\n        \x3c!-- block: back_link --\x3e#/iot/endpoint/list\x3c!-- /block --\x3e\n        \x3c!-- block: text_content_wrapper --\x3e\n            ${i18n.配置升级}\n        \x3c!-- /block --\x3e\n        \x3c!-- block: create_step --\x3e\n            <div data-ui-type="ViewStep"\n                data-ui-id="buyStep"\n                data-ui-current-step="1">\n                <ul>\n                    <li bind-for="buyIot">${i18n.升级物接入配置}</li>\n                    <li bind-for="orderConfirm">${i18n.确认订单}</li>\n                    <li>${i18n.在线支付}</li>\n                    <li>${i18n.支付成功}</li>\n                </ul>\n            </div>\n        \x3c!-- /block --\x3e\n    \x3c!-- /import --\x3e\n    <div class="content-wrap">\n        <div class="create-content create-content-wrapper">\n            <div id="buyIot">\n                <div class="create-main ui-tab-content">\n                    <div class="detail-parts-table">\n                        <form class="create-database-form" data-ui-type="Form" data-ui-id="form">\n                            <div data-ui-id="buyBucket" data-ui-type="BuyBucket"></div>\n                            <dl class="detail-part-1-col detail-create">\n                                <dt>\n                                    <h4><span>当前配置</span></h4>\n                                </dt>\n                                <dd>\n                                    <div class="detail-cell">\n                                        <label>支付方式：</label>\n                                        <span class="no-content">\n                                            \x3c!-- if: ${orderDetail.productType} === \'prepay\' --\x3e\n                                            预付费\n                                            \x3c!-- else: --\x3e\n                                            后付费\n                                            \x3c!-- /if --\x3e\n                                        </span>\n                                    </div>\n                                    <div class="detail-cell">\n                                        <label>物接入（SIM版）套餐：</label>\n                                        <span class="no-content">${orderDetail.resourceType}</span>\n                                    </div>\n                                </dd>\n                                <dd>\n                                    <div class="detail-cell">\n                                        <label>物联网卡数（已寄送）：</label>\n                                        <span class="no-content">${orderDetail.cardNum}张</span>\n                                    </div>\n                                    <div class="detail-cell">\n                                        <label>购买规格：</label>\n                                        <span class="no-content">${orderDetail.messagesNum}百万条/月</span>\n                                    </div>\n                                </dd>\n                                <dd>\n                                    <div class="detail-cell">\n                                        <label>消息长度：</label>\n                                        <span class="no-content">少于${orderDetail.messageByte}字节/条</span>\n                                    </div>\n                                    <div class="detail-cell">\n                                        <label>到期时间：</label>\n                                        <span class="no-content">${orderDetail.expireTime}</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                            <dl class="detail-part-1-col detail-create config-info">\n                                <dt>\n                                    <h4><span>物接入（SIM版）消息配置</span></h4>\n                                </dt>\n                                \x3c!-- if: ${orderDetail.messageByte} === 128 --\x3e\n                                <dd data-ui-type="Panel" data-ui-id="unicomChoice">\n                                    <label>套餐类型：</label>\n                                    <div class="form-value">\n                                        <div data-ui-id="pricingPackage"\n                                             data-ui-name="pricingPackage"\n                                             data-ui-type="RadioSelect"\n                                             class="pricing-pakage pricing-type">\n                                        </div>\n                                    </div>\n                                </dd>\n                                \x3c!-- /if --\x3e\n                                 <dd class="cardNum">\n                                    <label>物联网卡数（新增）：</label>\n                                    <div data-ui-type="TextBox"\n                                         data-ui-name="unicomCardNum"\n                                         data-ui-id="unicomCardNum"\n                                         class="unicomCardNum">\n                                    </div>\n                                    <span class="unit">张</span>\n                                </dd>\n                                <dd>\n                                    <label>购买规格：</label>\n                                    <div data-ui-type="Panel"\n                                         data-ui-id="messagesNumPanel"\n                                         class="package-list">\n                                        <div class="detail-cell package">\n                                            <div data-ui-id="messagesNum"\n                                                 data-ui-name="messagesNum"\n                                                 data-ui-datasource="@messagesNum"\n                                                 data-ui-type="Dragger"\n                                                 class="messagesNum"></div>\n                                        </div>\n                                        <span class="unit">百万条/月</span>\n                                    </div>\n                                </dd>\n                            </dl>\n                            <dl class="detail-part-1-col detail-create delivery-info" data-ui-type="Panel" data-ui-id="deliveryInfo">\n                                <dt>\n                                    <h4><span>收货信息</span></h4>\n                                </dt>\n                                <dd class="form-row">\n                                    <label><i>*</i>收货人姓名：</label>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                             data-ui-name="consignee"\n                                             data-ui-id="consignee"></div>\n                                    </div>\n                                </dd>\n                                <dd class="form-row">\n                                    <label><i>*</i>公司名称：</label>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                             data-ui-name="company"\n                                             data-ui-id="company"></div>\n                                    </div>\n                                </dd>\n                                <dd class="form-row">\n                                    <label><i>*</i>联系电话：</label>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                             data-ui-name="phone"\n                                             data-ui-id="phone"></div>\n                                    </div>\n                                </dd>\n                                <dd class="form-row">\n                                    <label><i>*</i>收货地址：</label>\n                                    <div class="form-value region-form-row">\n                                        <div data-ui="id:area;type:RegionSelect;name:area"></div>\n                                        <label data-ui-type="Validity"\n                                            data-ui-id="areaValidity"></label>\n                                    </div>\n                                    <div class="form-value">\n                                        <div data-ui-type="TextBox"\n                                            data-ui-name="address"\n                                            data-ui-id="address"\n                                            data-ui-mode="textarea"\n                                            class="address"></div>\n                                    </div>\n                                </dd>\n                                <dd class="tip-grey">\n                                    温馨提示<br/>\n                                    1. 购买物接入（SIM版）套餐后，套餐内的天工物联卡配送物流为<b class="extra">顺丰</b>，付款方式为<b class="extra italic">到付，邮费用户自理（20元左右）。</b><br/>\n                                    2. 物接入（SIM版）套餐内含联通物联网卡，是百度云天工和联通合作推出的天工物联卡，该卡的消息仅支持用于天工的物接入SIM版，同时对于天工产品体系内物管理、物解析、规则引擎目前不支持物接入（SIM版），如需要使用请购买物接入资源。<br/>\n                                    3. 天工物联卡配送、售后、退换货等相关服务均由深圳汉讯信息技术有限公司提供并负责。<br/>\n                                    4. 物接入（SIM版）内含的天工物卡是联通普通物联网SIM卡，若需贴片式工业级SIM卡或插卡式SIM卡请提工单反馈。<br/>\n                                    5. 其他特殊情况请提工单反馈处理。\n                                </dd>\n                            </dl>\n                        </form>\n                    </div>\n                </div>\n            </div>\n            <div id="orderConfirm" class="order-confirm-panel">\n                <div data-ui="id:orderAction;type:ActionPanel"></div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/order/UpgradeUnicomModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config", "../_public/regions"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](s),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getPrice = function(e) {
            return o.api.getUpgradePrice(e, {
                "X-silence": !0
            })
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    orderDetail: function(e) {
                        return o.api.getUnicomDetail().then(function(t) {
                            var i = t.messagesNum < 1 ? 1 : t.messagesNum,
                            a = t.address.split("-");
                            return e.set("area", {
                                country: "086",
                                province: a[3],
                                city: a[4]
                            }),
                            e.set("consignee", t.consignee),
                            e.set("company", t.company),
                            e.set("phone", t.phone),
                            e.set("address", a[2]),
                            t.expireTime = d["default"].toTime(t.expireTime),
                            e.set("resourceId", t.resourceId),
                            e.set("minMessagesNum", i),
                            e.set("maxMessagesNum", o.maxMessagesNum),
                            e.set("cardNum", t.cardNum),
                            t.tester ? (t.resourceType = "1元试用版", e.set("pricing", 1)) : 128 === t.messageByte ? (t.resourceType = "小型设备版", e.set("pricing", 2)) : (t.resourceType = "大型设备版", e.set("pricing", 3)),
                            t
                        })
                    },
                    pricingPackage: function(e) {
                        return [{
                            name: '<span data-index="0">小型设备版</span><hr/><p data-index="0">卡服务费：1元/卡/月<br/>消息数：100万条消息/15元/月<br/>消息长度：低于128字节</p>',
                            value: 2
                        },
                        {
                            name: '<span data-index="1">大型设备版</span><hr/><p data-index="1">卡服务费：1元/卡/月<br/>消息数：100万条消息/35元/月<br/>消息长度：低于512字节</p>',
                            value: 3
                        }]
                    },
                    areaSource: function(e) {
                        return u["default"]
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/order/UpgradeUnicomView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./upgradeUnicom.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/FormView", "inf-ria/app/brpc", "common/util/moneyUtil", "common/region", "../_public/util"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](d),
    b = r["default"](u),
    v = [{
        title: "地域：",
        content: function(e) {
            return h["default"].getCurrentRegion().label
        }
    },
    {
        title: "套餐类型：",
        content: function(e) {
            return e.pricingPackage ? 2 === e.pricingPackage ? "小型设备版": "大型设备版": "-"
        }
    },
    {
        title: "物联网卡数（新增）：",
        content: function(e) {
            return e.unicomCardNum ? e.unicomCardNum + "张": "0张"
        }
    },
    {
        title: "购买规格：",
        content: function(e) {
            return e.unicomMessagesNum ? e.unicomMessagesNum + "百万条/月": "-"
        }
    },
    {
        title: "价格：",
        content: function(e) {
            if (e.loading) return '<span class="loading">努力加载中...请稍候</span>';
            var t = "",
            i = e.discount < 100 ? m["default"].showMoney(e.originalPrice * e.discount / 100) : m["default"].showMoney(e.price);
            if (e.originalPrice !== i) {
                t = '<span class="price">￥' + i + '</span>\n                        <br>\n                        <strike class="original-price">原价：￥' + m["default"].showMoney(e.originalPrice) + "</strike>"
            } else t = '<span class="price">￥' + i + "</span>";
            return t
        }
    }],
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "buyBucket:confirm": function(t) {
                    e.fire("SUBMIT"),
                    t.preventDefault()
                },
                "buyBucket:reset": function(t) {
                    e.fire("REFRESH"),
                    t.preventDefault()
                },
                "messagesNum:change": function(t) {
                    return e.fire("MESSAGE_NUM_CHANGE")
                },
                "pricingPackage:change": function(t) {
                    return e.fire("PRICING_PACKAGE_CHANGE")
                },
                "unicomCardNum:input": function(t) {
                    return e.fire("UNICOM_CARDNUM_CHANGE")
                }
            }
        },
        n.prototype.getUnicomFormData = function(e) {
            var t = 2 === e.pricingPackage ? 128 : 512,
            i = 1 === this.model.get("pricing");
            return {
                iotResourceId: this.model.get("resourceId"),
                type: "CHINA_UNICOM",
                unicomCardNum: parseInt(e.unicomCardNum, 10),
                unicomMessageByte: t,
                unicomMessagesNum: e.messagesNum,
                tester: i
            }
        },
        n.prototype.updateBuyBucket = function(e) {
            var t = this,
            i = {},
            a = this.getUnicomFormData(e);
            this.get("buyBucket").setValue(c["default"].extend({
                loading: !0,
                productType: "prepay",
                pricingPackage: e.pricingPackage
            },
            a)),
            this.get("buyBucket").disable();
            var n = this.model.get("cardNum") + a.unicomCardNum;
            i = c["default"].extend(i, a, {
                unicomCardNum: n
            }),
            this.model.getPrice(i).then(function(i) {
                t.get("buyBucket").setValue(c["default"].extend({
                    loading: !1,
                    productType: "prepay",
                    price: i.price,
                    originalPrice: i.originalPrice,
                    discount: i.discount,
                    pricingPackage: e.pricingPackage
                },
                a)),
                (0 === a.unicomCardNum || !a.unicomCardNum) && e.messagesNum === t.model.get("minMessagesNum") && e.pricingPackage === t.model.get("pricing") || e.messagesNum > t.model.get("maxMessagesNum") ? t.get("buyBucket").disable() : t.get("buyBucket").enable()
            })
        },
        n.prototype.getPricingPackage = function(e) {
            return e.pricingPackage ? e.pricingPackage: 3
        },
        n.prototype.messagesNumSelected = function(e) {
            var t = this.getFormData();
            this.updateBuyBucket({
                messagesNum: e,
                unicomCardNum: t.unicomCardNum,
                pricingPackage: this.getPricingPackage(t)
            })
        },
        n.prototype.renderOrderConfig = function(e, t) {
            var i = this.get("orderAction"),
            a = this.get("buyStep"),
            n = {
                order: e,
                config: t
            };
            f["default"].invokeService("billing://order_confirm", i, n).then(function() {
                i.on("action@prevPage",
                function() {
                    a.set("currentStep", 1),
                    i.disposeAction(),
                    i.innerHTML = ""
                }),
                a.set("currentStep", 2)
            })
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.get("messagesNum").setValue(this.model.get("minMessagesNum")),
            this.messagesNumSelected(this.model.get("minMessagesNum")),
            this.get("deliveryInfo").hide()
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_hubbus_upgrade_unicom"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    pricingPackage: {
                        datasource: "@pricingPackage",
                        selectedIndex: 0
                    },
                    unicomCardNum: {
                        width: 60,
                        placeholder: "0",
                        value: 0,
                        pattern: /^\d+$/
                    },
                    messagesNum: {
                        min: "@minMessagesNum",
                        max: "@maxMessagesNum",
                        length: 350,
                        value: "@minMessagesNum"
                    },
                    consignee: {
                        width: 275,
                        placeholder: "请输入收货人",
                        value: "@consignee",
                        required: "required"
                    },
                    company: {
                        width: 275,
                        placeholder: "请输入公司名称",
                        value: "@company",
                        required: "required"
                    },
                    phone: {
                        width: 275,
                        required: "required",
                        value: "@phone",
                        placeholder: "请输入联系电话",
                        pattern: /(^(1(3|4|5|7|8)\d{9})?$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/,
                        patternErrorMessage: "您输入的联系电话格式不正确"
                    },
                    area: {
                        datasource: "@areaSource",
                        required: !0,
                        value: "@area",
                        validityLabel: "areaValidity",
                        extensions: b["default"].autoValidateExt
                    },
                    address: {
                        width: 275,
                        height: 58,
                        value: "@address",
                        required: "required",
                        placeholder: "请输入详细收货地址",
                        pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                        patternErrorMessage: "请输入合法的中英文字符"
                    },
                    buyBucket: {
                        fields: v,
                        disabled: !0,
                        value: {},
                        offsetTop: 0,
                        confirmBtn: {
                            text: "下一步",
                            skin: "skin-primary-button"
                        }
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = g
}),
define("iot/order/UpgradeView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./upgrade.tpl", "inf-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "inf-ria/app/brpc", "common/util/moneyUtil", "common/region"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = r["default"](n),
    u = r["default"](o),
    c = r["default"](s),
    p = r["default"](l),
    f = [{
        title: "地域：",
        content: function(e) {
            return p["default"].getCurrentRegion().label
        }
    },
    {
        title: "购买规格：",
        content: function(e) {
            return e.messagesNum ? e.messagesNum + "百万条/月": "-"
        }
    },
    {
        title: "价格：",
        content: function(e) {
            if (e.loading) return '<span class="loading">努力加载中...请稍候</span>';
            var t = "",
            i = e.discount < 100 ? c["default"].showMoney(e.originalPrice * e.discount / 100) : c["default"].showMoney(e.price);
            if (e.originalPrice !== i) {
                t = '<span class="price">￥' + i + '</span>\n                        <br>\n                        <strike class="original-price">原价：￥' + c["default"].showMoney(e.originalPrice) + "</strike>"
            } else t = '<span class="price">￥' + i + "</span>";
            return t
        }
    }],
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "buyBucket:confirm": function(t) {
                    e.fire("SUBMIT"),
                    t.preventDefault()
                },
                "buyBucket:reset": function(t) {
                    e.fire("REFRESH"),
                    t.preventDefault()
                },
                "messagesNum:change": function(t) {
                    return e.fire("MESSAGE_NUM_CHANGE")
                }
            }
        },
        n.prototype.updateBuyBucket = function(e) {
            var t = this;
            this.get("buyBucket").setValue({
                loading: !0,
                messagesNum: e.messagesNum,
                productType: "prepay"
            }),
            this.get("buyBucket").disable();
            var i = {
                messagesNum: e.messagesNum,
                iotResourceId: this.model.get("resourceId")
            };
            this.model.getPrice(i).then(function(i) {
                t.get("buyBucket").setValue({
                    loading: !1,
                    messagesNum: e.messagesNum,
                    productType: "prepay",
                    price: i.price,
                    originalPrice: i.originalPrice,
                    discount: i.discount
                }),
                e.messagesNum >= t.model.get("minMessagesNum") && e.messagesNum <= t.model.get("maxMessagesNum") && t.get("buyBucket").enable()
            })
        },
        n.prototype.messagesNumSelected = function(e) {
            this.updateBuyBucket({
                messagesNum: e
            })
        },
        n.prototype.renderOrderConfig = function(e, t) {
            var i = this.get("orderAction"),
            a = this.get("buyStep"),
            n = {
                order: e,
                config: t
            };
            u["default"].invokeService("billing://order_confirm", i, n).then(function() {
                i.on("action@prevPage",
                function() {
                    a.set("currentStep", 1),
                    i.disposeAction(),
                    i.innerHTML = ""
                }),
                a.set("currentStep", 2)
            })
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.get("messagesNum").setValue(this.model.get("minMessagesNum")),
            this.messagesNumSelected(this.model.get("minMessagesNum"))
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_hubbus_upgrade"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    purchaseLength: {
                        datasource: "@purchaseLenDatasource",
                        selectedIndex: 0
                    },
                    messagesNum: {
                        min: "@minMessagesNum",
                        max: "@maxMessagesNum",
                        length: 350,
                        value: "@minMessagesNum"
                    },
                    buyBucket: {
                        fields: f,
                        disabled: !0,
                        value: {},
                        offsetTop: 0,
                        confirmBtn: {
                            text: "下一步",
                            skin: "skin-primary-button"
                        }
                    }
                }
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/policy/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/policy/List",
        path: "/iot/policy/list"
    },
    {
        type: "iot/policy/Detail",
        path: "/iot/policy/detail"
    },
    {
        type: "iot/policy/dialog/Create",
        path: "/iot/policy/create"
    },
    {
        type: "iot/policy/dialog/Edit",
        path: "/iot/policy/edit"
    }]),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何策略</br>", "点击左上角按钮立即创建或联系管理员创建", "</p></div>"].join(""),
        tpl: {
            command: '<span class="operations"><button data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></button></span>',
            topic: '<div class="topic-box"><p class="topic"><label>主题：</label><%- topic %></p><p class="operations"><label>权限：</label><%- operations %></p></div>'
        }
    }
}),
define("iot/policy/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "bat-ria/mvc/BaseAction", "../events", "../operations", "../enum", "./DetailModel", "./DetailView", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = n["default"](a),
    f = n["default"](r),
    m = n["default"](o),
    h = n["default"](s),
    b = n["default"](d),
    v = n["default"](u),
    g = n["default"](c),
    y = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(m["default"].EDIT, this.edit, this),
            this.on(m["default"].POLICY_LOADED, this.reload),
            this.on("entercomplete", this.renderTopics)
        },
        n.prototype.edit = function(e) {
            h["default"].editPolicy.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName"),
                policyName: this.model.get("policyName")
            })
        },
        n.prototype.renderTopics = function(e) {
            var t = [],
            i = this.model.get("basicInfo").topics;
            p["default"].each(i,
            function(e) {
                return t.push(p["default"].template(g["default"].tpl.topic, {
                    topic: e.topic,
                    operations: p["default"].map(e.operations,
                    function(e) {
                        return l.OPERATIONS.getTextFromValue(e)
                    }).join(" | ")
                }))
            }),
            this.view.get("topicBox").setContent(t.join("") || "未绑定主题")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return v["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return b["default"]
            }
        }]),
        n
    } (f["default"]);
    module.exports = y
}),
define("iot/policy/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_policy_detail --\x3e\n<div class="iot-endpoint-detail iot-policy-detail iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <a href="#/iot/policy/list~endpointName=${endpointName}">策略列表</a>\n            <span class="divider">/</span>\n            <span class="active">策略详情</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>\n                策略详情\n                \x3c!-- if: ${subPermission.permission.IotHubManage}--\x3e\n                <span data-ui-type="Button"\n                    data-ui-id="edit"\n                    data-ui-skin="edit">编辑</span>\n                \x3c!-- /if --\x3e\n            </h2>\n            <dl class="detail-content-item">\n                <dt></dt>\n                <dd>\n                    <div class="detail-content-row">\n                        <label>名称：</label>\n                        <div class="detail-content-value">${basicInfo.policyName}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>创建时间：</label>\n                        <div class="detail-content-value">${basicInfo.localTime}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>主题列表：</label>\n                        <div data-ui-type="Panel"\n                            data-ui-id="topicBox"\n                            class="detail-content-value"></div>\n                    </div>\n                </dd>\n            </dl>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/policy/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {
            var e = this.get("basicInfo");
            d["default"].extend(e, {
                localTime: u["default"].toTime(e.createTime)
            }),
            this.set("basicInfo", e)
        },
        t["default"](n, [{
            key: "iotPolicyDetail",
            get: function() {
                return s.api.iotPolicyDetail
            }
        },
        {
            key: "subPermission",
            get: function() {
                return s.api.subPermission
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return e.iotPolicyDetail({
                            endpointName: e.get("endpointName"),
                            policyName: e.get("policyName")
                        })
                    },
                    subPermission: function(e) {
                        return e.subPermission({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/policy/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../events"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = r["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "edit:click": function(t) {
                    return e.fire(l["default"].EDIT, t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_policy_detail"
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/policy/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "esui/lib", "../../events", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = u["default"].g("topicContainer"),
            t = u["default"].g("realContainer");
            this.delegateEvent("add-topic", "click", this.addTopic, t),
            this.delegateEvent("delete-topic", "click", this.deleteTopic, e),
            this.topicInputEvent("input", e),
            this.on("entercomplete", this.view.loadTopicBox, this.view)
        },
        n.prototype.addTopic = function(e) {
            this.view.loadTopicBox(),
            this.fire("dialog.resize")
        },
        n.prototype.deleteTopic = function(e) {
            u["default"].removeNode(e.target.parentNode),
            this.fire("dialog.resize")
        },
        n.prototype.topicInputEvent = function(e, t, i) {
            var a = this;
            u["default"].on(t || document.body, e,
            function(e) {
                var t = u["default"].event.getTarget(e),
                i = t.name.replace("topic", "operations"),
                n = a.view.get(i).getBoxElements()[0];
                t.value.startsWith("$SYS/") ? (n.checked && n.click(), n.disabled = !0) : n.disabled = !1
            })
        },
        n.prototype.delegateEvent = function(e, t, i, a, n) {
            var r = this;
            u["default"].on(a || document.body, t,
            function(a) {
                var o = u["default"].event.getTarget(a),
                s = o.getAttribute("action-type");
                s && s === e && i.call(n || r, {
                    target: o,
                    container: r,
                    eventType: t,
                    originEvent: a
                })
            })
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("策略创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").fire(c["default"].POLICY_LOADED, {
                policyName: this.view.get("policyName").getValue()
            }),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "策略创建成功！"
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/policy/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_policy --\x3e\n<div class="iot-policy-create-dialog iot-dialog-form order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row form-name">\n                <label><i>＊</i>名称：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="policyName"\n                        data-ui-id="policyName"></div>\n                    \x3c!-- import: TPL_iot_name_tip --\x3e\n                </div>\n            </div>\n            <div id="realContainer">\n                <div id="topicContainer" class="topic-list">\n                </div>\n                <div class="operation-line">\n                    <i class="origin"></i>\n                    <i class="iconfont icon-plus" action-type="add-topic"></i>\n                </div>\n            </div>\n            <p class="iot-form-tip">注：点击右侧加（＋）号为本策略绑定更多的主题。</p>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_policy_child --\x3e\n\x3c!-- import: TPL_iot_create_policy --\x3e\n'
}),
define("iot/policy/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "bat-ria/mvc/FormModel", "../../enum", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        n.prototype.filterData = function(e) {
            return this.filterTopicsData(e),
            e
        },
        n.prototype.filterTopicsData = function(e) {
            var t = [],
            i = [],
            a = /[0-9]\d*$/gi,
            n = ["topic", "operations"];
            return l["default"].each(e,
            function(e, t) {
                var r = t.replace(a, "");
                if ( - 1 !== l["default"].indexOf(n, r)) {
                    var o = t.match(a);
                    o && i.push(o[0])
                }
            }),
            i = l["default"].uniq(i),
            l["default"].each(i,
            function(i) {
                var a = {};
                l["default"].each(n,
                function(t) {
                    var n = "" + t + i;
                    a[t] = e[n],
                    delete e[n]
                }),
                t.push(a)
            }),
            e.topics = t,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return s.api.iotPolicyCreate
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    policySource: function(e) {
                        return o.OPERATIONS.toArray()
                    }
                }
            }
        }]),
        n
    } (n["default"](r)["default"]);
    module.exports = d
}),
define("iot/policy/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "esui", "esui/lib", "er/Deferred", "../../enum", "../../config", "../../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p) {
    var f = r["default"](n),
    m = r["default"](o),
    h = r["default"](s),
    b = r["default"](l),
    v = r["default"](d),
    g = 0,
    y = {
        topic: {
            width: 200,
            title: "主题",
            placeholder: "请填写主题，长度1-255",
            required: "required",
            custom: r["default"](p)["default"].isValidTopic,
            customErrorMessage: "主题格式错误"
        },
        operations: {
            title: "权限",
            required: "required",
            value: m["default"].pluck(u.OPERATIONS.toArray(), "value").join()
        }
    },
    w = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.loadTopicBox = function() {
            var e = this,
            t = b["default"].g("topicContainer");
            this.model.set("index", g),
            this.loadTemplate("TPL_iot_policy_fragment", t).done(function(i) {
                h["default"].init(i.box, {
                    viewContext: e.viewContext,
                    properties: e.getTopicBoxProperties(g++)
                }),
                t.scrollTop = t.scrollHeight
            })
        },
        n.prototype.loadTemplate = function(e, t) {
            var i = new v["default"],
            a = this.templateRender(e, this.getTemplateData()),
            n = document.createElement("DIV");
            return n.className = "topic-box",
            n.innerHTML = a,
            t.appendChild(n),
            i.resolve({
                box: n,
                container: t,
                html: a
            }),
            i.promise
        },
        n.prototype.getTopicBoxProperties = function(e) {
            var t = m["default"].deepClone(y);
            return t.operations.datasource = this.model.get("policySource"),
            m["default"].each(t,
            function(i, a) {
                t["" + a + e] = i,
                delete t[a]
            }),
            t
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_policy"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    policyName: {
                        title: "名称",
                        width: 200,
                        placeholder: "请填写名称，长度3-32",
                        required: "required",
                        pattern: c.nameRegExp
                    }
                }
            }
        }]),
        n
    } (f["default"]);
    module.exports = w
}),
define("iot/policy/dialog/Edit", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "bat-ria/mvc/FormAction", "esui/lib", "er/Deferred", "../../events", "./EditModel", "./EditView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](l),
    b = n["default"](d),
    v = n["default"](u),
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = f["default"].g("topicContainer"),
            t = f["default"].g("realContainer");
            this.delegateEvent("add-topic", "click", this.addTopic, t),
            this.delegateEvent("delete-topic", "click", this.deleteTopic, e),
            this.topicInputEvent("input", e),
            this.on("entercomplete", this.getTopics, this)
        },
        n.prototype.topicInputEvent = function(e, t, i) {
            var a = this;
            f["default"].on(t || document.body, e,
            function(e) {
                var t = f["default"].event.getTarget(e),
                i = t.name.replace("topic", "operations"),
                n = a.view.get(i).getBoxElements()[0];
                t.value.startsWith("$SYS/") ? (n.checked && n.click(), n.disabled = !0) : n.disabled = !1
            })
        },
        n.prototype.getTopics = function(e) {
            var t = this,
            i = [],
            a = this.model.get("topics");
            c["default"].each(a,
            function(e) {
                return i.push({
                    func: t.view.loadTopicBox,
                    param: e
                })
            }),
            this.loadSequence(i, this.view).done(function() {
                return t.fire("dialog.resize")
            })
        },
        n.prototype.addTopic = function(e) {
            this.view.loadTopicBox(),
            this.fire("dialog.resize")
        },
        n.prototype.deleteTopic = function(e) {
            f["default"].removeNode(e.target.parentNode),
            this.fire("dialog.resize")
        },
        n.prototype.delegateEvent = function(e, t, i, a, n) {
            var r = this;
            f["default"].on(a || document.body, t,
            function(a) {
                var o = f["default"].event.getTarget(a),
                s = o.getAttribute("action-type");
                s && s === e && i.call(n || r, {
                    target: o,
                    container: r,
                    eventType: t,
                    originEvent: a
                })
            })
        },
        n.prototype.loadSequence = function(e, t) {
            var i = this,
            a = m["default"].resolved();
            return c["default"].each(e,
            function(e) {
                var n = c["default"].bind(e.func, t || i, e.param, e);
                a = a.done(n)
            }),
            a
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("策略编辑失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").fire(h["default"].POLICY_LOADED),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return v["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return b["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "策略编辑成功！"
            }
        }]),
        n
    } (p["default"]);
    module.exports = g
}),
define("iot/policy/dialog/edit.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_edit_policy --\x3e\n<div class="iot-policy-create-dialog iot-dialog-form order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row form-name">\n                <label>名称：</label>\n                <div class="form-value">\n                    <div class="default-txt">${policyName}</div>\n                </div>\n            </div>\n            <div id="realContainer">\n                <div id="topicContainer" class="topic-list">\n                </div>\n                <div class="operation-line">\n                    <i class="origin"></i>\n                    <i class="iconfont icon-plus" action-type="add-topic"></i>\n                </div>\n            </div>\n            <p class="iot-form-tip">注：点击右侧加（＋）号为本策略绑定更多的主题。</p>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_edit_policy_child --\x3e\n\x3c!-- import: TPL_iot_edit_policy --\x3e\n'
}),
define("iot/policy/dialog/EditModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "underscore", "babel-runtime/helpers/interop-require-default", "bat-ria/mvc/FormModel", "../../enum", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName"),
                policyName: this.get("policyName")
            }
        },
        n.prototype.filterData = function(e) {
            return this.filterTopicsData(e),
            e
        },
        n.prototype.filterTopicsData = function(e) {
            var t = [],
            i = [],
            a = /[0-9]\d*$/gi,
            n = ["topic", "operations"];
            return l["default"].each(e,
            function(e, t) {
                var r = t.replace(a, "");
                if ( - 1 !== l["default"].indexOf(n, r)) {
                    var o = t.match(a);
                    o && i.push(o[0])
                }
            }),
            i = l["default"].uniq(i),
            l["default"].each(i,
            function(i) {
                var a = {};
                l["default"].each(n,
                function(t) {
                    var n = "" + t + i;
                    a[t] = e[n],
                    delete e[n]
                }),
                t.push(a)
            }),
            e.topics = t,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return s.api.iotPolicyEdit
            }
        },
        {
            key: "iotPolicyDetail",
            get: function() {
                return s.api.iotPolicyDetail
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    policySource: function(e) {
                        return o.OPERATIONS.toArray()
                    },
                    topics: function(e) {
                        return e.iotPolicyDetail({
                            endpointName: e.get("endpointName"),
                            policyName: e.get("policyName")
                        }).done(function(e) {
                            return e.topics
                        })
                    }
                }
            }
        }]),
        n
    } (n["default"](r)["default"]);
    module.exports = d
}),
define("iot/policy/dialog/EditView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./edit.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "esui", "esui/lib", "er/Deferred", "../../enum", "../../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = 0,
    g = {
        topic: {
            width: 200,
            title: "主题",
            placeholder: "请填写主题，长度1-255",
            required: "required",
            custom: r["default"](c)["default"].isValidTopic,
            customErrorMessage: "主题格式错误"
        },
        operations: {
            title: "权限",
            required: "required",
            value: f["default"].pluck(u.OPERATIONS.toArray(), "value").join()
        }
    },
    y = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.loadTopicBox = function(e) {
            var t = this,
            i = h["default"].g("topicContainer");
            this.model.set("index", v),
            this.loadTemplate("TPL_iot_policy_fragment", i).done(function(a) {
                m["default"].init(a.box, {
                    viewContext: t.viewContext,
                    properties: t.getTopicBoxProperties(v++, e)
                }),
                i.scrollTop = i.scrollHeight
            })
        },
        n.prototype.loadTemplate = function(e, t) {
            var i = new b["default"],
            a = this.templateRender(e, this.getTemplateData()),
            n = document.createElement("DIV");
            return n.className = "topic-box",
            n.innerHTML = a,
            t.appendChild(n),
            i.resolve({
                box: n,
                container: t,
                html: a
            }),
            i.promise
        },
        n.prototype.getTopicBoxProperties = function(e) {
            var t = arguments.length <= 1 || arguments[1] === undefined ? {}: arguments[1],
            i = f["default"].deepClone(g);
            return i.operations.datasource = this.model.get("policySource"),
            f["default"].each(i,
            function(a, n) {
                var r = "" + n + e,
                o = t[n];
                o && (a.value = o.toString()),
                i[r] = a,
                delete i[n]
            }),
            i
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_edit_policy"
            }
        }]),
        n
    } (p["default"]);
    module.exports = y
}),
define("iot/policy/List", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./ListModel", "./ListView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].REFRESH, this.reload, this),
            this.view.on(u["default"].CREATE, this.create, this),
            this.view.on(u["default"].EDIT, this.edit, this),
            this.view.on(u["default"].DELETE, this["delete"], this),
            this.on(u["default"].POLICY_LOADED, this.reload)
        },
        n.prototype.create = function() {
            c["default"].createPolicy.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName")
            })
        },
        n.prototype.edit = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            c["default"].editPolicy.call(this, {
                parentAction: this,
                endpointName: i,
                policyName: a
            })
        },
        n.prototype["delete"] = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            c["default"].confirmHandler({
                title: "删除策略",
                content: "确认删除该策略",
                width: 300
            },
            "policy.delete", this.view, {
                endpointName: i,
                policyName: a
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/policy/list.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_policy_list --\x3e\n<div class="iot-main-wrap iot-thing-list main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">策略列表</span>\n        </p>\n        <div class="list-content">\n            <h2>策略列表</h2>\n            <div class="table-full-wrap">\n                <div class="operation-wrap">\n                    \x3c!-- if: ${subPermission.permission.IotHubManage}--\x3e\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建策略">创建策略</button>\n                    <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="ssl-tip">最多可创建10000个策略，可<a href="http://ticket.bce.baidu.com/#/ticket/create ">提交工单</a>申请更多额度</span>\n                    \x3c!-- /if --\x3e\n                    <span class="ui-group ui-search-group">\n                        <input class="search-box"\n                            data-ui-type="TextBox"\n                            data-ui-id="keyword" />\n                        <button data-ui-type="Button"\n                            data-ui-id="searchBtn"\n                            class="search-button"></button>\n                    </span>\n                </div>\n\n                <div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/policy/ListModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraQuery = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.iotPolicyList
            }
        },
        {
            key: "subPermission",
            get: function() {
                return r.api.subPermission
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    subPermission: function(e) {
                        return e.subPermission({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    }
                }
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/policy/ListView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./list.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/tableUtil", "common/util/timeUtil", "../events", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](d),
    b = r["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return f["default"].getListEvents({
                "create:click": function(t) {
                    return e.fire(h["default"].CREATE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "keyword:enter": function(t) {
                    return e.submitSearch(t)
                },
                "searchBtn:enter": function(t) {
                    return e.submitSearch(t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "策略名称",
                    field: "policyName",
                    content: function(e) {
                        var t = c["default"].escape(e.endpointName),
                        i = c["default"].escape(e.policyName);
                        return '<a href=\n                    "#/iot/policy/detail~endpointName=' + t + "&policyName=" + i + '"\n                    >' + i + "</a>"
                    }
                },
                {
                    title: "主题",
                    field: "topics",
                    content: function(e) {
                        var t = c["default"].pluck(e.topics, "topic");
                        return c["default"].escape(t)
                    }
                },
                {
                    title: "创建时间",
                    field: "createTime",
                    content: function(e) {
                        return m["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 165,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = [];
            return this.model.get("subPermission").permission.IotHubManage && Array.prototype.push.apply(i, [this.getEditHtml(e, t), this.getDeleteHtml(e, t)]),
            i.join("")
        },
        n.prototype.getEditHtml = function(e, t) {
            var i = [e.endpointName, e.policyName].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "编辑",
                command: h["default"].EDIT,
                args: i,
                className: "",
                disabled: ""
            })
        },
        n.prototype.getDeleteHtml = function(e, t) {
            var i = [e.endpointName, e.policyName].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "删除",
                command: h["default"].DELETE,
                args: i,
                className: "",
                disabled: ""
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_policy_list"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    keyword: {
                        width: 220,
                        value: "@keyword",
                        placeholder: "请输入策略名称"
                    },
                    table: {
                        select: !1,
                        editable: 1,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: b["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = v
}),
define("iot/principal/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/principal/List",
        path: "/iot/principal/list"
    },
    {
        type: "iot/principal/Detail",
        path: "/iot/principal/detail"
    },
    {
        type: "iot/principal/dialog/Create",
        path: "/iot/principal/create"
    },
    {
        type: "iot/principal/dialog/Edit",
        path: "/iot/principal/edit"
    },
    {
        type: "iot/principal/dialog/Thing",
        path: "/iot/principal/thing"
    },
    {
        type: "iot/principal/dialog/Principal",
        path: "/iot/principal/principal"
    },
    {
        type: "iot/principal/dialog/Success",
        path: "/iot/principal/success"
    },
    {
        type: "iot/principal/dialog/Confirm",
        path: "/iot/principal/confirm"
    }]),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何身份</br>", "点击左上角按钮立即创建或联系管理员创建", "</p></div>"].join(""),
        tpl: {
            command: '<span class="operations"><button data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></button></span>'
        }
    }
}),
define("iot/principal/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].EDIT, this.edit, this)
        },
        n.prototype.edit = function(e) {
            c["default"].editPrincipal.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName"),
                principalName: this.model.get("principalName")
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/principal/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_principal_detail --\x3e\n<div class="iot-endpoint-detail iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <a href="#/iot/principal/list~endpointName=${endpointName}">身份列表</a>\n            <span class="divider">/</span>\n            <span class="active">身份详情</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>\n                身份详情\n                \x3c!-- if: ${subPermission.permission.IotHubManage}--\x3e\n                <span data-ui-type="Button"\n                    data-ui-id="edit"\n                    data-ui-skin="edit">编辑</span>\n                \x3c!-- /if --\x3e\n            </h2>\n            <dl class="detail-content-item">\n                <dt></dt>\n                <dd>\n                    <div class="detail-content-row">\n                        <label>名称：</label>\n                        <div class="detail-content-value">${basicInfo.principalName}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>创建时间：</label>\n                        <div class="detail-content-value">${basicInfo.localTime}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>绑定策略：</label>\n                        <div class="detail-content-value">\n                            <a href="#/iot/policy/detail~endpointName=${endpointName}&policyName=${basicInfo.policyName}">${basicInfo.policyName}</a>\n                        </div>\n                    </div>\n                </dd>\n            </dl>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/principal/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {
            var e = this.get("basicInfo");
            d["default"].extend(e, {
                localTime: u["default"].toTime(e.createTime)
            }),
            this.set("basicInfo", e)
        },
        t["default"](n, [{
            key: "iotPrincipalDetail",
            get: function() {
                return s.api.iotPrincipalDetail
            }
        },
        {
            key: "subPermission",
            get: function() {
                return s.api.subPermission
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return e.iotPrincipalDetail({
                            endpointName: e.get("endpointName"),
                            principalName: e.get("principalName")
                        })
                    },
                    subPermission: function(e) {
                        return e.subPermission({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/principal/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../events"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = r["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "edit:click": function(t) {
                    return e.fire(l["default"].EDIT, t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_principal_detail"
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/principal/dialog/Confirm", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./ConfirmModel", "./ConfirmView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/principal/dialog/confirm.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_confirm_principal --\x3e\n<div class="iot-dialog-form iot-principal-confirm-dialog order-recharge">\n    <p class="principal-confirm-tip">身份“${principalName}”的密钥生成成功，请妥善保管密钥，你将要使用身份/密钥来连接IoT服务。</p>\n    <div class="password">\n        <label></label>\n        <div>\n            <span>${password}</span>\n            <a data-ui-type="Clipboard"\n                data-ui-id="copyPassword"\n                data-ui-clipboard-text="${password}"\n                class="ui-button skin-primary-button copy-password">点击复制</a>\n        </div>\n    </div>\n    <p class="notice">*请合理保管以上密钥，密钥丢失无法找回，只能重新生成</p>\n</div>\n\x3c!-- target: TPL_iot_confirm_principal_child --\x3e\n\x3c!-- import: TPL_iot_confirm_principal --\x3e\n'
}),
define("iot/principal/dialog/ConfirmModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/principal/dialog/ConfirmView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./confirm.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "copyPassword:aftercopy": function(t) {
                    return e.showToast("复制成功")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_confirm_principal"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/principal/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "underscore", "../../events", "../../_public/util", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(p["default"].PRINCIPAL_CREATED, this.doCreate, this),
            this.view.on(p["default"].BEFORE_CHANGE, this.validateStep, this),
            this.view.on(p["default"].CONFIRM, this.redirectAfterSubmit, this),
            this.on("beforesubmit", this.beforeSubmit),
            this.on("entercomplete", this.renderNextView)
        },
        n.prototype.beforeSubmit = function(e) {
            e.preventDefault(),
            this.renderNextView()
        },
        n.prototype.renderNextView = function() {
            var e = this.view.getFormData(),
            t = this.model.getSubmitData(e);
            this.view.renderNextView({
                parentAction: this,
                formData: t
            })
        },
        n.prototype.checkDuplicate = function(e, t) {
            var i = !0,
            a = this.view.get("form").getInputControls(),
            n = a[0],
            r = a[1];
            return c["default"].contains(c["default"].pluck(n._listData, t), e[t]) && (r.showValidationMessage("invalid", "该名称已存在"), i = !1),
            i
        },
        n.prototype.validateStep = function(e) {
            var t = e.dir,
            i = e.viewStep,
            a = e.formData;
            t && 2 === i && a.policyName && (this.checkDuplicate(a, "policyName") || e.preventDefault())
        },
        n.prototype.doCreate = function(e) {
            var t = this,
            i = this.filterData(e.allConfig);
            this.model.submitRequester(i, {
                "X-silence": !0
            }).done(function(e) {
                t.view.showToast(t.getToastMessage());
                var i = t.view.get("form").main,
                a = f["default"].getUIControls(i, null, "Panel")[0];
                if (e.password) {
                    a.show();
                    var n = f["default"].getUIControls(i, null, "Clipboard")[0];
                    n && n.set("clipboardText", e.password)
                } else a.hide();
                t.view.setFormData(e)
            }).fail(function(e) {
                return t.handleSubmitError(e)
            })
        },
        n.prototype.filterData = function(e) {
            var t = {},
            i = e[0],
            a = e[1],
            n = i.formData,
            r = a.formData,
            o = n.endpointName;
            return r && !r.policy && (t.policy = {
                endpointName: o,
                policyName: r.policyName,
                topics: r.topics
            }),
            t.principal = {
                endpointName: o,
                principalName: n.principalName,
                policyName: r.policy || r.policyName
            },
            t
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("身份创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return h["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "身份创建成功！"
            }
        }]),
        n
    } (u["default"]);
    module.exports = b
}),
define("iot/principal/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_principal --\x3e\n<div class="iot-dialog-form iot-edit-dialog iot-principal-dialog iot-policy-create-dialog order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-row step-form-row">\n            <div data-ui-type="ViewStep"\n                data-ui-id="viewStep"\n                data-ui-current-step="0">\n                <ul>\n                    <li>创建身份</li>\n                    <li>设置策略</li>\n                    <li>配置确认</li>\n                </ul>\n            </div>\n        </div>\n        <div class="form-data-body" data-ui="type:ActionPanel;id:stepControl"></div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_principal_child --\x3e\n\x3c!-- import: TPL_iot_create_principal --\x3e\n'
}),
define("iot/principal/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        n.prototype.filterData = function(e) {
            return this.filterTopicsData(e),
            e
        },
        n.prototype.filterTopicsData = function(e) {
            var t = [],
            i = [],
            a = /[0-9]\d*$/gi,
            n = ["topic", "operations"];
            return l["default"].each(e,
            function(e, t) {
                var r = t.replace(a, "");
                if ( - 1 !== l["default"].indexOf(n, r)) {
                    var o = t.match(a);
                    o && i.push(o[0])
                }
            }),
            i = l["default"].uniq(i),
            l["default"].each(i,
            function(i) {
                var a = {};
                l["default"].each(n,
                function(t) {
                    var n = "" + t + i;
                    a[t] = e[n],
                    delete e[n]
                }),
                t.push(a)
            }),
            e.topics = t,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotPrincipalCreateV2
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/principal/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "er/Deferred", "esui", "jquery", "../../events", "../../_public/util"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](u),
    g = r["default"](c),
    y = [{
        url: "/iot/principal/principal",
        hidden: ["btnFootLast"],
        bodyHeight: 87
    },
    {
        url: "/iot/thing/policy",
        access: function(e) {
            return ! e.policy
        },
        bodyHeight: 87
    },
    {
        url: "/iot/principal/success",
        hidden: ["btnFootLast", "btnFootCancel"],
        bodyHeight: 187
    }],
    w = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "stepControl:prev": function(t) {
                    return e.renderLastView()
                }
            }
        },
        n.prototype.setExtraFormData = function(e) {
            var t = this.get("form"),
            i = g["default"].getUIControls(t.main, null, "Label");
            f["default"].each(i,
            function(t) {
                var i = t.get("for");
                e[i] && t.setText(e[i])
            })
        },
        n.prototype.renderLastView = function(e) {
            var t = this;
            this.renderActionView().done(function(e) {
                var i = e.action.formData;
                t.setFormData(i)
            })
        },
        n.prototype.renderNextView = function(e) {
            var t = this;
            this.renderActionView(e, !0).done(function(e) {
                e.viewStep === y.length ? t.fire(v["default"].PRINCIPAL_CREATED, e) : e.viewStep > y.length && t.fire(v["default"].CONFIRM, e)
            })
        },
        n.prototype.renderActionView = function(e, t) {
            e === undefined && (e = {});
            var i = m["default"].rejected(),
            a = this.get("viewStep").get("currentStep"),
            n = y[a - 1];
            if (!this.fire(v["default"].BEFORE_CHANGE, f["default"].extend(e, {
                dir: t,
                viewStep: a
            })).isDefaultPrevented()) {
                if (t) if (a += 1, n && (n.formData = e.formData), n && f["default"].isFunction(n.access) && !n.access(e.formData)) {
                    var r = y[(a = y.length) - 1];
                    i = this.changeStepView(r, e, a)
                } else {
                    var o = y[a - 1];
                    i = o ? this.changeStepView(o, e, a) : m["default"].resolved({
                        viewStep: a,
                        allConfig: y
                    })
                } else {
                    var s = y[(a -= 1) - 1];
                    e.formData = s.formData,
                    i = this.changeStepView(s, e, a)
                }
                return i
            }
        },
        n.prototype.getDialog = function() {
            var e = this.getContainerElement(),
            t = b["default"](e).parents(".ui-dialog").get(0);
            return h["default"].getControlByDOM(t)
        },
        n.prototype.changeStepView = function(e, t, i) {
            var a = this.get("stepControl"),
            n = this.get("viewStep"),
            r = this.getDialog(),
            o = r.get("body"),
            s = r.get("foot");
            e.bodyHeight && (o.main.style.minHeight = e.bodyHeight + "px"),
            r.resize(),
            f["default"].each(s.children,
            function(t) {
                t[f["default"].contains(e.hidden, t.id) ? "hide": "show"]()
            });
            var l = s.getChild("btnOk");
            return i >= y.length ? l.setContent("确认") : l.setContent("下一步"),
            a.setProperties({
                url: e.url,
                actionOptions: t
            }),
            a.action.done(function() {
                return n.set("currentStep", i),
                {
                    action: e,
                    viewStep: i,
                    allConfig: y,
                    dialog: r
                }
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_principal"
            }
        }]),
        n
    } (p["default"]);
    module.exports = w
}),
define("iot/principal/dialog/Edit", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "underscore", "../../events", "../../_public/util", "./EditModel", "./EditView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(p["default"].PRINCIPAL_CREATED, this.doCreate, this),
            this.view.on(p["default"].BEFORE_CHANGE, this.validateStep, this),
            this.view.on(p["default"].CONFIRM, this.redirectAfterSubmit, this),
            this.on("beforesubmit", this.beforeSubmit),
            this.on("entercomplete", this.renderNextView)
        },
        n.prototype.beforeSubmit = function(e) {
            e.preventDefault(),
            this.renderNextView()
        },
        n.prototype.renderNextView = function() {
            var e = this.view.getFormData(),
            t = this.model.getSubmitData(e);
            this.view.renderNextView({
                parentAction: this,
                formData: t
            })
        },
        n.prototype.checkDuplicate = function(e, t) {
            var i = !0,
            a = this.view.get("form").getInputControls(),
            n = a[0],
            r = a[1];
            return c["default"].contains(c["default"].pluck(n._listData, t), e[t]) && (r.showValidationMessage("invalid", "该名称已存在"), i = !1),
            i
        },
        n.prototype.validateStep = function(e) {
            var t = e.dir,
            i = e.viewStep,
            a = e.formData;
            t && 2 === i && a.policyName && (this.checkDuplicate(a, "policyName") || e.preventDefault())
        },
        n.prototype.doCreate = function(e) {
            var t = this,
            i = this.filterData(e.allConfig);
            this.model.submitRequester(i, {
                "X-silence": !0
            }).done(function(e) {
                t.view.showToast(t.getToastMessage());
                var i = t.view.get("form").main,
                a = f["default"].getUIControls(i, null, "Panel")[0];
                if (e.password) {
                    a.show();
                    var n = f["default"].getUIControls(i, null, "Clipboard")[0];
                    n && n.set("clipboardText", e.password)
                } else a.hide();
                t.view.setFormData(e)
            }).fail(function(e) {
                return t.handleSubmitError(e)
            })
        },
        n.prototype.filterData = function(e) {
            var t = {},
            i = e[0],
            a = e[1],
            n = i.formData,
            r = a.formData,
            o = n.endpointName;
            return r && !r.policy && (t.policy = {
                endpointName: o,
                policyName: r.policyName,
                topics: r.topics
            }),
            t.principal = {
                endpointName: o,
                principalName: n.principalName,
                policyName: r.policy || r.policyName
            },
            t
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("身份编辑失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return h["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "身份编辑成功！"
            }
        }]),
        n
    } (u["default"]);
    module.exports = b
}),
define("iot/principal/dialog/edit.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_edit_principal --\x3e\n<div class="iot-dialog-form iot-edit-dialog iot-principal-dialog iot-policy-create-dialog order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-row step-form-row">\n            <div data-ui-type="ViewStep"\n                data-ui-id="viewStep"\n                data-ui-current-step="0">\n                <ul>\n                    <li>编辑身份</li>\n                    <li>设置策略</li>\n                    <li>配置确认</li>\n                </ul>\n            </div>\n        </div>\n        <div class="form-data-body" data-ui="type:ActionPanel;id:stepControl"></div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_edit_principal_child --\x3e\n\x3c!-- import: TPL_iot_edit_principal --\x3e\n'
}),
define("iot/principal/dialog/EditModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        n.prototype.filterData = function(e) {
            return this.filterTopicsData(e),
            e
        },
        n.prototype.filterTopicsData = function(e) {
            var t = [],
            i = [],
            a = /[0-9]\d*$/gi,
            n = ["topic", "operations"];
            return l["default"].each(e,
            function(e, t) {
                var r = t.replace(a, "");
                if ( - 1 !== l["default"].indexOf(n, r)) {
                    var o = t.match(a);
                    o && i.push(o[0])
                }
            }),
            i = l["default"].uniq(i),
            l["default"].each(i,
            function(i) {
                var a = {};
                l["default"].each(n,
                function(t) {
                    var n = "" + t + i;
                    a[t] = e[n],
                    delete e[n]
                }),
                t.push(a)
            }),
            e.topics = t,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotPrincipalEditV2
            }
        },
        {
            key: "iotPrincipalDetail",
            get: function() {
                return o.api.iotPrincipalDetail
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/principal/dialog/EditView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./edit.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "er/Deferred", "esui", "jquery", "../../events", "../../_public/util"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](u),
    g = r["default"](c),
    y = [{
        url: "/iot/principal/principal",
        hidden: ["btnFootLast"],
        bodyHeight: 87
    },
    {
        url: "/iot/thing/policy",
        access: function(e) {
            return ! e.policy
        },
        bodyHeight: 87
    },
    {
        url: "/iot/principal/success",
        hidden: ["btnFootLast", "btnFootCancel"],
        bodyHeight: 187
    }],
    w = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "stepControl:prev": function(t) {
                    return e.renderLastView()
                }
            }
        },
        n.prototype.setExtraFormData = function(e) {
            var t = this.get("form"),
            i = g["default"].getUIControls(t.main, null, "Label");
            f["default"].each(i,
            function(t) {
                var i = t.get("for");
                e[i] && t.setText(e[i])
            })
        },
        n.prototype.renderLastView = function(e) {
            var t = this;
            this.renderActionView().done(function(e) {
                var i = e.action.formData;
                t.setFormData(i)
            })
        },
        n.prototype.renderNextView = function(e) {
            var t = this;
            this.renderActionView(e, !0).done(function(i) {
                var a = i.viewStep;
                if (a === y.length) t.fire(v["default"].PRINCIPAL_CREATED, i);
                else if (a > y.length) return void t.fire(v["default"].CONFIRM, i);
                var n = e.formData;
                switch (a) {
                case 1:
                    t.setFormData(f["default"].extend({
                        principalName:
                        t.model.get("principalName")
                    },
                    n));
                    break;
                case 2:
                    var r = t.get("form").getInputControls()[0];
                    r.setValue("数据读取中..."),
                    r.setDisabled(!0),
                    t.model.iotPrincipalDetail(f["default"].pick(i.allConfig[0].formData, "endpointName", "principalName"), {
                        "X-silence": !0
                    }).done(function(e) {
                        r.setDisabled(!1),
                        r.setValue(e.policyName, {
                            keyword: ""
                        })
                    })
                }
            })
        },
        n.prototype.renderActionView = function(e, t) {
            e === undefined && (e = {});
            var i = m["default"].rejected(),
            a = this.get("viewStep").get("currentStep"),
            n = y[a - 1];
            if (!this.fire(v["default"].BEFORE_CHANGE, f["default"].extend(e, {
                dir: t,
                viewStep: a
            })).isDefaultPrevented()) {
                if (t) if (a += 1, n && (n.formData = e.formData), n && f["default"].isFunction(n.access) && !n.access(e.formData)) {
                    var r = y[(a = y.length) - 1];
                    i = this.changeStepView(r, e, a)
                } else {
                    var o = y[a - 1];
                    i = o ? this.changeStepView(o, e, a) : m["default"].resolved({
                        viewStep: a,
                        allConfig: y
                    })
                } else {
                    var s = y[(a -= 1) - 1];
                    e.formData = s.formData,
                    i = this.changeStepView(s, e, a)
                }
                return i
            }
        },
        n.prototype.getDialog = function() {
            var e = this.getContainerElement(),
            t = b["default"](e).parents(".ui-dialog").get(0);
            return h["default"].getControlByDOM(t)
        },
        n.prototype.changeStepView = function(e, t, i) {
            var a = this,
            n = this.get("stepControl"),
            r = this.get("viewStep"),
            o = this.getDialog(),
            s = o.get("body"),
            l = o.get("foot");
            e.bodyHeight && (s.main.style.minHeight = e.bodyHeight + "px"),
            o.resize(),
            f["default"].each(l.children,
            function(t) {
                t[f["default"].contains(e.hidden, t.id) ? "hide": "show"]()
            });
            var d = l.getChild("btnOk");
            return i >= y.length ? d.setContent("确认") : d.setContent("下一步"),
            n.setProperties({
                url: e.url,
                actionOptions: t
            }),
            n.action.done(function() {
                if (r.set("currentStep", i), 1 === i) {
                    a.get("form").getInputControls()[0].setReadOnly(!0)
                }
                return {
                    action: e,
                    viewStep: i,
                    allConfig: y,
                    dialog: o
                }
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_edit_principal"
            }
        }]),
        n
    } (p["default"]);
    module.exports = w
}),
define("iot/principal/dialog/Principal", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./PrincipalModel", "./PrincipalView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/principal/dialog/principal.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_principal_principal --\x3e\n<div class="form-row last-form-row">\n    <label><i>＊</i>名称：</label>\n    <div class="form-value">\n        <div data-ui-type="TextBox"\n            data-ui-name="principalName"\n            data-ui-id="principalName"></div>\n        \x3c!-- import: TPL_iot_name_tip --\x3e\n    </div>\n</div>\n\x3c!-- target: TPL_iot_create_principal_principal_child --\x3e\n\x3c!-- import: TPL_iot_create_principal_principal --\x3e\n'
}),
define("iot/principal/dialog/PrincipalModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/principal/dialog/PrincipalView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./principal.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                principalName: {
                    title: "名称",
                    width: 200,
                    required: "required",
                    placeholder: "请填写身份名称，长度3-32",
                    pattern: o.nameRegExp
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_principal_principal"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = s
}),
define("iot/principal/dialog/Success", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./SuccessModel", "./SuccessView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/principal/dialog/success.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_principal_success --\x3e\n<div class="iot-success-confirm">\n    <div class="form-row-group">\n        <div class="form-title">身份</div>\n        <div class="form-row">\n            <label>名称：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="principalName">数据读取中...</label>\n                </div>\n            </div>\n        </div>\n        <div class="form-row" data-ui-type="Panel" data-ui-id="pwdPanel">\n            <label>密钥：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="password">数据读取中...</label>\n                    <a data-ui-type="Clipboard"\n                        data-ui-id="copyPassword"\n                        data-ui-clipboard-text=""\n                        class="ui-button copy-password">复制</a>\n                </div>\n                <p class="warning">请合理保管以上密钥，密钥丢失无法找回，只能重新生成</p>\n            </div>\n        </div>\n    </div>\n    <div class="form-row-group last-form-row-group">\n        <div class="form-title">策略</div>\n        <div class="form-row">\n            <label>名称：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="policyName">-</label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\x3c!-- target: TPL_iot_create_principal_success_child --\x3e\n\x3c!-- import: TPL_iot_create_principal_success --\x3e\n'
}),
define("iot/principal/dialog/SuccessModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/principal/dialog/SuccessView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./success.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "copyPassword:aftercopy": function(t) {
                    return e.showToast("复制成功")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_principal_success"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    pwdPanel: {
                        hidden: !0
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/principal/List", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./ListModel", "./ListView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].REFRESH, this.reload, this),
            this.view.on(u["default"].CREATE, this.create, this),
            this.view.on(u["default"].EDIT, this.edit, this),
            this.view.on(u["default"].DELETE, this["delete"], this),
            this.view.on(u["default"].GEN_PASSWORD, this.getPasswordV2, this),
            this.on(u["default"].PRINCIPAL_LOADED, this.reload)
        },
        n.prototype.create = function() {
            c["default"].createPrincipal.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName")
            })
        },
        n.prototype.edit = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            c["default"].editPrincipal.call(this, {
                parentAction: this,
                endpointName: i,
                principalName: a
            })
        },
        n.prototype["delete"] = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            c["default"].confirmHandler({
                title: "删除身份",
                content: "确认删除该身份",
                width: 300
            },
            "principal.delete", this.view, {
                endpointName: i,
                principalName: a
            })
        },
        n.prototype.getPassword = function(e) {
            var t = this,
            i = e.args.split(","),
            a = i[0],
            n = i[1];
            this.model.iotPrincipalGetPassword({
                endpointName: a,
                principalName: n
            }).done(function(e) {
                return c["default"].viewPrincipalResult.call(t, {
                    parentAction: t,
                    password: e.password,
                    principalName: n
                })
            })
        },
        n.prototype.getPasswordV2 = function(e) {
            var t = this,
            i = e.args.split(","),
            a = i[0],
            n = i[1],
            r = this.model;
            this.view.waitConfirm({
                title: "提示",
                content: "重置密钥后，网关连接MQTT的密钥将更改，可能需要重新烧录程序，请谨慎操作。是否重置密钥？",
                width: 600,
                needFoot: !0
            }).done(function() {
                r.iotPrincipalGetPassword({
                    endpointName: a,
                    principalName: n
                }).then(function(e) {
                    return c["default"].viewPrincipalResult.call(t, {
                        parentAction: t,
                        password: e.password,
                        principalName: n
                    })
                })
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/principal/list.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_principal_list --\x3e\n<div class="iot-main-wrap iot-thing-list main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">身份列表</span>\n        </p>\n        <div class="list-content">\n            <h2>身份列表</h2>\n            <div class="table-full-wrap">\n                <div class="operation-wrap">\n                    \x3c!-- if: ${subPermission.permission.IotHubManage}--\x3e\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建身份">创建身份</button>\n                    <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="ssl-tip">最多可创建10000个身份，可<a href="http://ticket.bce.baidu.com/#/ticket/create ">提交工单</a>申请更多额度</span>\n                    \x3c!-- /if --\x3e\n                    <span class="ui-group ui-search-group">\n                        <input class="search-box"\n                            data-ui-type="TextBox"\n                            data-ui-id="keyword" />\n                        <button data-ui-type="Button"\n                            data-ui-id="searchBtn"\n                            class="search-button"></button>\n                    </span>\n                </div>\n\n                <div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/principal/ListModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraQuery = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.iotPrincipalList
            }
        },
        {
            key: "iotPrincipalGetPassword",
            get: function() {
                return r.api.iotPrincipalGetPassword
            }
        },
        {
            key: "subPermission",
            get: function() {
                return r.api.subPermission
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    subPermission: function(e) {
                        return e.subPermission({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    }
                }
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/principal/ListView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./list.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/tableUtil", "common/util/timeUtil", "../events", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](d),
    b = r["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return f["default"].getListEvents({
                "create:click": function(t) {
                    return e.fire(h["default"].CREATE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "keyword:enter": function(t) {
                    return e.submitSearch(t)
                },
                "searchBtn:enter": function(t) {
                    return e.submitSearch(t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "身份名称",
                    field: "principalName",
                    content: function(e, t) {
                        var i = c["default"].escape(e.endpointName),
                        a = c["default"].escape(e.principalName);
                        return '<a href=\n                    "#/iot/principal/detail~endpointName=' + i + "&principalName=" + a + '"\n                    >' + a + "</a>"
                    }
                },
                {
                    title: "创建时间",
                    field: "createTime",
                    content: function(e, t) {
                        return m["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 200,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = [];
            return this.model.get("subPermission").permission.IotHubManage && Array.prototype.push.apply(i, [this.getEditHtml(e, t), this.getDeleteHtml(e, t), this.getPasswordHtml(e, t)]),
            i.join("")
        },
        n.prototype.getEditHtml = function(e, t) {
            var i = [e.endpointName, e.principalName].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "编辑",
                command: h["default"].EDIT,
                args: i,
                className: "",
                disabled: ""
            })
        },
        n.prototype.getDeleteHtml = function(e, t) {
            var i = [e.endpointName, e.principalName].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "删除",
                command: h["default"].DELETE,
                args: i,
                className: "",
                disabled: ""
            })
        },
        n.prototype.getPasswordHtml = function(e, t) {
            var i = [e.endpointName, e.principalName].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "重置密钥",
                command: h["default"].GEN_PASSWORD,
                args: i,
                className: "",
                disabled: ""
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_principal_list"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    keyword: {
                        width: 220,
                        value: "@keyword",
                        placeholder: "请输入身份名称"
                    },
                    table: {
                        select: !1,
                        editable: 1,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: b["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = v
}),
define("iot/startup", ["exports", "jquery", "babel-runtime/helpers/interop-require-default", "bat-ria/tpl!./common.tpl", "bat-ria/tpl!./modbus/common.tpl", "./_public/SuggestInput", "./_public/RegionSelect", "er/events", "inf-ria/helper", "common/startup", "common/config", "./temp/config", "./config", "./app/manager", "er/locator", "underscore", "common/storage", "common/region"],
function(exports, e, t, i, a, n, r, o, s, l, d, u, c, p, f, m, h, b) {
    function v(e) {
        e.isChildAction || -1 !== location.href.indexOf("#/region/404") || (T["default"].api.iotServiceStatus({},
        {
            "X-silence": !0
        }).then(function(t) {
            var i = e.url.getPath();
            if (t.valid && !t.unicom && g["default"](".endpoint-unicom-stats").addClass("state-hidden"), !t.valid && t.unicom && ("/iot/endpoint/stats" === i || "/iot/endpoint/uStats" === i)) {
                var a = e.url.getQuery();
                w["default"].redirectToModule("iot", "/iot/endpoint/uStats~", a),
                g["default"](".endpoint-stats").addClass("state-hidden"),
                g["default"](".endpoint-unicom-stats").addClass("sidebar-current")
            }
            t.show ? t.valid || t.unicom || -1 !== location.href.indexOf("#/iot/order/") || -1 !== location.href.indexOf("#/iot/modbus/") ? -1 !== location.href.indexOf("#/iot/turnkey/") && _["default"].api.permissionTurnkey({},
            {
                "X-silence": !0
            }).then(function(e) {
                e.iothub && e.tsdb || w["default"].redirectToModule("iot", _["default"].index)
            }) : w["default"].redirectToModule("iot", "/iot/order/notify") : w["default"].redirectToModule("iot", "/iot/temp/error"),
            C["default"].set(P, t.subUser)
        }), C["default"].get(N) || -1 === location.href.indexOf("#/iot/modbus/manage") || (_["default"].api.modbusLandingPage({},
        {
            "X-silence": !0
        }).then(function(t) {
            t && t.isFirst && (e.action.retrieveListPage = S["default"].noop, k["default"].redirect("#/iot/modbus/landing"))
        }), C["default"].set(N, !0)))
    }
    exports.__esModule = !0;
    var g = t["default"](e),
    y = t["default"](o),
    w = t["default"](s),
    x = t["default"](l),
    T = t["default"](d),
    _ = t["default"](c),
    E = t["default"](p),
    k = t["default"](f),
    S = t["default"](m),
    C = t["default"](h),
    N = (t["default"](b), "BCE_IOT_MODBUS_LANDING"),
    P = "BCE_IOT_MODBUS_SUBUSER";
    exports.start = function() {
        y["default"].on("enteraction", v),
        E["default"].start(),
        x["default"].start(_["default"])
    };
    exports.stop = function() {
        y["default"].un("enteraction", v),
        E["default"].dispose()
    }
}),
define("iot/storage/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/storage/List",
        path: "/iot/storage/list"
    },
    {
        type: "iot/storage/Copylist",
        path: "/iot/storage/copylist"
    },
    {
        type: "iot/storage/Detail",
        path: "/iot/storage/detail"
    },
    {
        type: "iot/storage/dialog/Create",
        path: "/iot/storage/copy/create"
    },
    {
        type: "iot/storage/dialog/CreateStorage",
        path: "/iot/storage/create"
    },
    {
        type: "iot/storage/dialog/Edit",
        path: "/iot/storage/edit"
    }]),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何归档</br>", "点击左上角按钮立即创建", "</p></div>"].join(""),
        tpl: {
            command: '<span class="operations"><button data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></button></span>'
        }
    }
}),
define("iot/storage/Copylist", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "inf-ria/helper", "../events", "../operations", "./CopylistModel", "./CopylistView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = n["default"](d),
    h = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(c["default"].REFRESH, this.reload, this),
            this.view.on(c["default"].CREATE, this.create, this),
            this.view.on(c["default"].EDIT, this.edit, this),
            this.view.on(c["default"].DELETE, this["delete"], this),
            this.on(c["default"].POLICY_LOADED, this.reload),
            this.on("bos.active", this.activeBos),
            this.on("bos.recharge", this.rechargeBos)
        },
        n.prototype.create = function() {
            p["default"].createStorageCopy.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName")
            })
        },
        n.prototype.activeBos = function() {
            window.open(r.buildUrl("bos", "/bos/order"))
        },
        n.prototype.rechargeBos = function() {
            window.open(r.buildUrl("finance", "/finance/account/recharge"))
        },
        n.prototype.edit = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1],
            n = t[2],
            r = t[3];
            p["default"].editStorageCopy.call(this, {
                parentAction: this,
                endpointName: i,
                storageName: a,
                topic: n,
                address: r
            })
        },
        n.prototype["delete"] = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            p["default"].confirmHandler({
                title: "删除归档",
                content: "确认删除该归档",
                width: 300
            },
            "storage.deleteCopy", this.view, {
                endpointName: i,
                storageName: a
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return f["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = h
}),
define("iot/storage/copylist.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_storage_copylist --\x3e\n<div class="iot-main-wrap iot-storage-copylist main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">数据存储</span>\n        </p>\n        <div class="instance-info">\n            <h1>${endpointName}的数据存储列表</h1>\n        </div>\n        <div class="detail-content">\n            <ul class="ui-tab-navigator">\n                <li class="ui-tab-item">\n                    <a href="#/iot/storage/list~endpointName=${endpointName}">存储到Kafka</a>\n                </li>\n                <li class="ui-tab-item ui-tab-item-active">\n                    <a href="#/iot/storage/copylist~endpointName=${endpointName}">存储到BOS</a>\n                </li>\n            </ul>\n            <div class="ui-tab-content">\n                <div class="row">\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建归档" >创建归档</button>\n                    <span>\n                        如需存储到TSDB，请通过<a target="_blank" class="create-link" href="/iotre/${search}#/iotre/rule/list">规则引擎</a>来实现。\n                    </span>\n                    <span class="ui-group ui-search-group">\n                        <input class="search-box"\n                            data-ui-type="TextBox"\n                            data-ui-id="keyword" />\n                        <button data-ui-type="Button"\n                            data-ui-id="searchBtn"\n                            class="search-button"></button>\n                    </span>\n                </div>\n                <div class="table-full-wrap">\n                    <div data-ui-type="Table" data-ui-id="table"\n                         data-ui-datasource="@tableData"\n                         data-ui-order-by="@orderBy" data-ui-order="@order"\n                         data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                         data-ui-extension-command-type="Command"\n                         data-ui-extension-tableedit-type="TableEdit"\n                         data-ui-extension-tableex-type="TableEx">\n                    </div>\n                    <div class="ui-row">\n                    \x3c!-- import: listPager --\x3e\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>\n'
}),
define("iot/storage/CopylistModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraQuery = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.iotStorageCopylist
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize
                }
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    search: function() {
                        return location.search
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/storage/CopylistView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./copylist.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/tableUtil", "common/util/timeUtil", "../events", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](d),
    b = r["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return f["default"].getListEvents({
                "create:click": function(t) {
                    return e.fire(h["default"].CREATE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "keyword:enter": function(t) {
                    return e.submitSearch(t)
                },
                "searchBtn:enter": function(t) {
                    return e.submitSearch(t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "名称",
                    field: "storageName",
                    content: function(e, t) {
                        var i = c["default"].escape(e.endpointName),
                        a = c["default"].escape(e.storageName);
                        return '<a href=\n                    "#/iot/storage/detail~endpointName=' + i + "&storageName=" + a + '"\n                    >' + a + "</a>"
                    }
                },
                {
                    title: "主题",
                    field: "topic",
                    content: function(e, t) {
                        return c["default"].escape(e.topic)
                    }
                },
                {
                    title: "存储",
                    field: "address",
                    content: function(e, t) {
                        return c["default"].escape(e.address)
                    }
                },
                {
                    title: "创建时间",
                    field: "createTime",
                    content: function(e, t) {
                        return m["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 110,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = [];
            return Array.prototype.push.apply(i, [this.getEditHtml(e, t), this.getDeleteHtml(e, t)]),
            i.join("")
        },
        n.prototype.getEditHtml = function(e, t) {
            var i = [e.endpointName, e.storageName, e.topic, e.address].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "编辑",
                command: h["default"].EDIT,
                args: i,
                className: "",
                disabled: ""
            })
        },
        n.prototype.getDeleteHtml = function(e, t) {
            var i = [e.endpointName, e.storageName].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "删除",
                command: h["default"].DELETE,
                args: i,
                className: "",
                disabled: ""
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_storage_copylist"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    keyword: {
                        width: 220,
                        value: "@keyword",
                        placeholder: "请输入归档名称"
                    },
                    table: {
                        select: !1,
                        editable: 1,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: b["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = v
}),
define("iot/storage/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].EDIT, this.edit, this)
        },
        n.prototype.edit = function(e) {
            c["default"].editStorageCopy.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName"),
                storageName: this.model.get("storageName"),
                topic: this.model.get("basicInfo").topic,
                address: this.model.get("basicInfo").address
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/storage/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_storage_detail --\x3e\n<div class="iot-endpoint-detail iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <a href="#/iot/storage/list~endpointName=${endpointName}">归档列表</a>\n            <span class="divider">/</span>\n            <span class="active">归档详情</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>\n                归档详情\n                <span data-ui-type="Button"\n                    data-ui-id="edit"\n                    data-ui-skin="edit">编辑</span>\n            </h2>\n            <dl class="detail-content-item">\n                <dt></dt>\n                <dd>\n                    <div class="detail-content-row">\n                        <label>名称：</label>\n                        <div class="detail-content-value">${basicInfo.storageName}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>创建时间：</label>\n                        <div class="detail-content-value">${basicInfo.localTime}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>主题：</label>\n                        <div class="detail-content-value">${basicInfo.topic}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>存储类型：</label>\n                        <div class="detail-content-value">${basicInfo.type}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>存储地址：</label>\n                        <div class="detail-content-value">${basicInfo.address}</div>\n                    </div>\n                </dd>\n            </dl>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/storage/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {
            var e = this.get("basicInfo");
            d["default"].extend(e, {
                localTime: u["default"].toTime(e.createTime)
            }),
            this.set("basicInfo", e)
        },
        t["default"](n, [{
            key: "iotStorageDetail",
            get: function() {
                return s.api.iotStorageDetail
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return e.iotStorageDetail({
                            endpointName: e.get("endpointName"),
                            storageName: e.get("storageName")
                        })
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/storage/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../events"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = r["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "edit:click": function(t) {
                    return e.fire(l["default"].EDIT, t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_storage_detail"
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/storage/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("归档创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "归档创建成功！"
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/storage/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_storage_copy --\x3e\n<div class="iot-dialog-form iot-storage-dialog-form order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>名称：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="storageName"\n                        data-ui-id="storageName"></div>\n                    \x3c!-- import: TPL_iot_name_tip --\x3e\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>主题：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="topic"\n                        data-ui-id="topic"></div>\n                    \x3c!-- import: TPL_iot_topic_tip --\x3e\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>存储：</label>\n                <div class="form-value">\n                    <div data-ui-type="BucketSelect"\n                        data-ui-id="address"\n                        data-ui-name="address"\n                        data-ui-extension-bucketselect-type="BucketSelectEx"></div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_storage_copy_child --\x3e\n\x3c!-- import: TPL_iot_create_storage_copy --\x3e\n'
}),
define("iot/storage/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/region", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName"),
                type: "1",
                location: o.region[0].value
            }
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotStorageCreate
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    getBucketLocations: function() {
                        return function() {
                            return {
                                locations: [l["default"].getCurrentRegion().id]
                            }
                        }
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/storage/dialog/CreateStorage", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./CreateStorageModel", "./CreateStorageView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = this.model.get("kafkaTopic") ? "编辑": "创建";
            this.toastMessage = "存储项" + e + "成功！"
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field);
            var t = this.model.get("kafkaTopic") ? "编辑": "创建";
            this.view.showToast("存储项" + t + "失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/storage/dialog/createStorage.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_storage --\x3e\n<div class="iot-dialog-form iot-storage-dialog-form order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label><i>＊</i>存储类型：</label>\n                <div class="form-value">\n                    <div class="storageType">Kafka</div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>存储主题：</label>\n                <div class="form-value storage-topic">\n                    <esui-select data-ui-id="kafkaTopic" data-ui-width="220"\n                        data-ui-name="kafkaTopic"\n                        data-ui-required="true"\n                        data-ui-value="${kafkaTopic}"\n                        data-ui-datasource="@topicList"></esui-select>\n                    <span class="storage-tip" data-ui-type="Tip"\n                        data-ui-arrow="true">存储到Kafka，需要开通『百度Kafka』服务</span>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>mqtt主题：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-width="220"\n                        data-ui-name="mqttTopic"\n                        data-ui-value="${mqttTopic}"\n                        data-ui-id="mqttTopic"></div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_storage_child --\x3e\n\x3c!-- import: TPL_iot_create_storage --\x3e\n'
}),
define("iot/storage/dialog/CreateStorageModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/region", "underscore", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n(e) {
            i["default"](this, n),
            a.call(this, e),
            this.submitRequester = this.get("kafkaTopic") ? s.api.iotKafkaEdit: s.api.iotKafkaCreate
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return this.get("kafkaTopic") ? {
                kafkaMappingUuid: this.get("uuid")
            }: {
                endpointName: this.get("endpointName")
            }
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    getBucketLocations: function() {
                        return {
                            locations: [d["default"].getCurrentRegion().id]
                        }
                    },
                    topicList: function(e) {
                        return s.api.iotKafkaTopic().then(function(e) {
                            var t = [];
                            return u["default"].each(e,
                            function(e) {
                                t.push({
                                    text: e,
                                    value: e
                                })
                            }),
                            t
                        })
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/storage/dialog/CreateStorageView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./createStorage.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                mqttTopic: {
                    width: 200,
                    title: "主题",
                    placeholder: "请填写主题，长度1-255",
                    required: "required",
                    custom: function(e) {
                        return /^[a-zA-Z0-9_\-+=%~`!@#$\^\&\*:'",.;:<>\/\?\(\)\[\]\{\}\\\|]{1,255}$/.test(e)
                    },
                    customErrorMessage: "主题格式错误"
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_storage"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/storage/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../config", "../../helper"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](s),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                storageName: {
                    title: "名称",
                    width: 200,
                    required: "required",
                    placeholder: "请填写归档名称，长度3-128",
                    pattern: /^(?!-)(?!.*?-$)(?!.*?-{2,}.*?)[a-zA-Z0-9-_]{3,128}$/
                },
                topic: {
                    title: "主题",
                    width: 200,
                    required: "required",
                    placeholder: "请填写归档主题，长度1-255",
                    custom: d["default"].isValidTopic,
                    customErrorMessage: "主题格式错误"
                },
                address: {
                    width: 222,
                    required: "required",
                    requiredErrorMessage: "请选择文件",
                    pattern: /^bos:\/\/.+\/$/,
                    patternErrorMessage: "请选择正确的路径",
                    getBucketList: o.api.iotBosBucketList,
                    getFolderList: o.api.iotBosFolderList,
                    getObjectList: o.api.iotBosObjectList,
                    createBucket: o.api.iotBosCreateBucket,
                    getBucketLocations: "@getBucketLocations",
                    viewtype: "folder",
                    urlPrefix: "bos://",
                    placeholder: "bos://"
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_storage_copy"
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/storage/dialog/Edit", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "./EditModel", "./EditView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("归档编辑失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "归档编辑成功！"
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/storage/dialog/edit.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_edit_storage --\x3e\n<div class="iot-dialog-form iot-storage-dialog-form order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-data-body">\n            <div class="form-row">\n                <label>名称：</label>\n                <div class="form-value">\n                    <div class="default-txt">${storageName}</div>\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>主题：</label>\n                <div class="form-value">\n                    <div data-ui-type="TextBox"\n                        data-ui-name="topic"\n                        data-ui-id="topic"></div>\n                    \x3c!-- import: TPL_iot_topic_tip --\x3e\n                </div>\n            </div>\n            <div class="form-row">\n                <label><i>＊</i>存储：</label>\n                <div class="form-value">\n                    <div data-ui-type="BucketSelect"\n                        data-ui-id="address"\n                        data-ui-name="address"\n                        data-ui-extension-bucketselect-type="BucketSelectEx"></div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_edit_storage_child --\x3e\n\x3c!-- import: TPL_iot_edit_storage --\x3e\n'
}),
define("iot/storage/dialog/EditModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/region", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName"),
                storageName: this.get("storageName"),
                type: "1",
                location: o.region[0].value
            }
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotStorageEdit
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    getBucketLocations: function() {
                        return function() {
                            return {
                                locations: [l["default"].getCurrentRegion().id]
                            }
                        }
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/storage/dialog/EditView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./edit.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "../../config", "../../helper"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](s),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                topic: {
                    title: "主题",
                    value: "@topic",
                    width: 200,
                    required: "required",
                    placeholder: "请填写归档主题，长度1-255",
                    custom: d["default"].isValidTopic,
                    customErrorMessage: "主题格式错误"
                },
                address: {
                    width: 222,
                    value: "@address",
                    required: "required",
                    requiredErrorMessage: "请选择文件",
                    pattern: /^bos:\/\/.+\/$/,
                    patternErrorMessage: "请选择正确的路径",
                    getBucketList: o.api.iotBosBucketList,
                    getFolderList: o.api.iotBosFolderList,
                    getObjectList: o.api.iotBosObjectList,
                    createBucket: o.api.iotBosCreateBucket,
                    getBucketLocations: "@getBucketLocations",
                    viewtype: "folder",
                    urlPrefix: "bos://",
                    placeholder: "bos://"
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_edit_storage"
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/storage/List", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "inf-ria/helper", "../events", "../operations", "./ListModel", "./ListView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = n["default"](d),
    h = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(c["default"].REFRESH, this.reload, this),
            this.view.on(c["default"].CREATE, this.create, this),
            this.view.on(c["default"].EDIT, this.edit, this),
            this.view.on(c["default"].DELETE, this["delete"], this),
            this.on(c["default"].POLICY_LOADED, this.reload),
            this.on("bos.active", this.activeBos),
            this.on("bos.recharge", this.rechargeBos)
        },
        n.prototype.create = function() {
            p["default"].createStorage.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName")
            })
        },
        n.prototype.activeBos = function() {
            window.open(r.buildUrl("bos", "/bos/order"))
        },
        n.prototype.rechargeBos = function() {
            window.open(r.buildUrl("finance", "/finance/account/recharge"))
        },
        n.prototype.edit = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1],
            n = t[2],
            r = t[3];
            p["default"].editStorage.call(this, {
                parentAction: this,
                endpointName: i,
                kafkaTopic: a,
                mqttTopic: n,
                uuid: r
            })
        },
        n.prototype["delete"] = function(e) {
            p["default"].confirmHandler({
                title: "删除存储项",
                content: "确认删除该存储项",
                width: 300
            },
            "storage.delete", this.view, {
                kafkaMappingUuid: e.args
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return f["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = h
}),
define("iot/storage/list.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_storage_list --\x3e\n<div class="iot-main-wrap iot-storage-list main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">数据存储</span>\n        </p>\n        <div class="instance-info">\n            <h1>${endpointName}的数据存储列表</h1>\n        </div>\n        <div class="detail-content">\n            <ul class="ui-tab-navigator">\n                <li class="ui-tab-item ui-tab-item-active">\n                    <a href="#/iot/storage/list~endpointName=${endpointName}">存储到Kafka</a>\n                </li>\n                <li class="ui-tab-item">\n                    <a href="#/iot/storage/copylist~endpointName=${endpointName}">存储到BOS</a>\n                </li>\n            </ul>\n            <div class="ui-tab-content">\n                <div class="row">\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建存储项">创建存储项</button>\n                    <span>\n                        如需存储到TSDB，请通过<a target="_blank" class="create-link" href="/iotre/${search}#/iotre/rule/list">规则引擎</a>来实现。\n                    </span>\n                </div>\n                <div class="table-full-wrap">\n                    <div data-ui-type="Table" data-ui-id="table"\n                         data-ui-datasource="@tableData"\n                         data-ui-order-by="@orderBy" data-ui-order="@order"\n                         data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                         data-ui-extension-command-type="Command"\n                         data-ui-extension-tableedit-type="TableEdit"\n                         data-ui-extension-tableex-type="TableEx">\n                    </div>\n                    <div class="ui-row">\n                    \x3c!-- import: listPager --\x3e\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>\n'
}),
define("iot/storage/ListModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraQuery = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.iotStorageList
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize
                }
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    search: function() {
                        return location.search
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/storage/ListView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./list.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/tableUtil", "common/util/timeUtil", "../events", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = r["default"](n),
    p = r["default"](o),
    f = r["default"](s),
    m = r["default"](l),
    h = r["default"](d),
    b = r["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return f["default"].getListEvents({
                "create:click": function(t) {
                    return e.fire(h["default"].CREATE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "keyword:enter": function(t) {
                    return e.submitSearch(t)
                },
                "searchBtn:enter": function(t) {
                    return e.submitSearch(t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "存储方式",
                    field: "storageType",
                    stable: !0,
                    width: 130,
                    content: function(e, t) {
                        return "kafka"
                    }
                },
                {
                    title: "存储主题",
                    field: "topic",
                    width: 250,
                    content: function(e, t) {
                        return c["default"].escape(e.kafkaTopic)
                    }
                },
                {
                    title: "mqtt主题",
                    stable: !0,
                    width: 200,
                    field: "mqttTopic",
                    content: function(e, t) {
                        return c["default"].escape(e.mqttTopic)
                    }
                },
                {
                    title: "创建时间",
                    stable: !0,
                    width: 200,
                    field: "createTime",
                    content: function(e, t) {
                        return m["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 140,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = [];
            return Array.prototype.push.apply(i, [this.getEditHtml(e, t), this.getDeleteHtml(e, t)]),
            i.join("")
        },
        n.prototype.getEditHtml = function(e, t) {
            var i = [e.endpointName, e.kafkaTopic, e.mqttTopic, e.uuid].join();
            return c["default"].template(b["default"].tpl.command)({
                label: "编辑",
                command: h["default"].EDIT,
                args: i,
                className: "",
                disabled: ""
            })
        },
        n.prototype.getDeleteHtml = function(e, t) {
            var i = e.uuid;
            return c["default"].template(b["default"].tpl.command)({
                label: "删除",
                command: h["default"].DELETE,
                args: i,
                className: "",
                disabled: ""
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_storage_list"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    keyword: {
                        width: 220,
                        value: "@keyword",
                        placeholder: "请输入归档名称"
                    },
                    table: {
                        select: !1,
                        editable: 1,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: b["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (p["default"]);
    module.exports = v
}),
define("iot/temp/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/temp/Error",
        path: "/iot/temp/error"
    }]),
    module.exports = {}
}),
define("iot/temp/Error", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./ErrorModel", "./ErrorView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/temp/error.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_temp_error --\x3e\n<div class="iot-main-wrap iot-temp-error">\n    <div class="content-wrap">\n        为了更好的提供服务，系统于9月29日00:00-02:00进行升级，请稍后访问。\n    </div>\n</div>\n'
}),
define("iot/temp/ErrorModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/temp/ErrorView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./error.tpl", "inf-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_temp_error"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/thing/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/thing/List",
        path: "/iot/thing/list"
    },
    {
        type: "iot/thing/Connection",
        path: "/iot/thing/connection"
    },
    {
        type: "iot/thing/Detail",
        path: "/iot/thing/detail"
    },
    {
        type: "iot/thing/dialog/Create",
        path: "/iot/thing/create"
    },
    {
        type: "iot/thing/dialog/Edit",
        path: "/iot/thing/edit"
    },
    {
        type: "iot/thing/dialog/Thing",
        path: "/iot/thing/thing"
    },
    {
        type: "iot/thing/dialog/Principal",
        path: "/iot/thing/principal"
    },
    {
        type: "iot/thing/dialog/Policy",
        path: "/iot/thing/policy"
    },
    {
        type: "iot/thing/dialog/Success",
        path: "/iot/thing/success"
    },
    {
        type: "iot/thing/dialog/CreateTopic",
        path: "/iot/thing/topic"
    }]),
    module.exports = {
        noDataHtml: ["<div><p>你还没创建任何设备</br>", "点击左上角按钮立即创建或联系管理员创建", "</p></div>"].join(""),
        tpl: {
            command: '<span class="operations"><button data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></button></span>'
        }
    }
}),
define("iot/thing/Connection", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "jquery", "underscore", "common/util/timeUtil", "./ConnectionModel", "./ConnectionView", "../_public/mqttws"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](l),
    b = n["default"](d),
    v = n["default"](u),
    g = function(a) {
        function n() {
            i["default"](this, n),
            a.call(this),
            this.subscriptions = [],
            this.messages = [],
            this.connected = !1
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            var e = this;
            a.prototype.initBehavior.call(this),
            this.view.on("connect", this.connect, this),
            this.view.on("createTopic", this.createTopic, this),
            this.view.on("publish", this.publish, this),
            this.view.on("disconnect", this.disconnect, this);
            f["default"].each(["connection", "publish", "message", "sub"],
            function(t) {
                p["default"]("#" + t + "-toggle").click(function(i) {
                    p["default"](i.target).hasClass("icon-arrow-chevron") ? e.hideContent(t) : e.showContent(t)
                })
            })
        },
        n.prototype.connect = function() {
            var e = this.view.getFormData(),
            t = e.host,
            i = e.clientId,
            a = e.username,
            n = e.password,
            r = e.lwTopic,
            o = e.lwQos,
            s = e.lwMessage,
            l = parseInt(e.port, 10),
            d = parseInt(e.keepAlive, 10),
            u = !!e.cleanSession,
            c = !!e.lastWillRetain;
            this.client = new v["default"].Client(t, l, i),
            this.client.onConnectionLost = f["default"].bind(this.onConnectionLost, this),
            this.client.onMessageArrived = f["default"].bind(this.onMessageArrived, this);
            console.log(e);
            var p = {
                timeout: 3,
                keepAliveInterval: d,
                cleanSession: u,
                useSSL: !0,
                onSuccess: f["default"].bind(this.onConnect, this),
                onFailure: f["default"].bind(this.onFail, this)
            };
            if (a.length > 0 && (p.userName = a), n.length > 0 && (p.password = n), r.length > 0) {
                var m = new v["default"].Message(s);
                m.qos = o,
                m.destinationName = r,
                m.retained = c,
                p.willMessage = m
            }
            try {
                this.client.connect(p)
            } catch(h) {
                this.view.showToast("连接失败", {
                    messageType: "error"
                })
            }
        },
        n.prototype.disconnect = function() {
            this.client.disconnect(),
            this.renderDisconect()
        },
        n.prototype.onConnectionLost = function(e) {
            console.log("onConnectionLost"),
            this.view.showToast("连接断开", {
                messageType: "error"
            }),
            this.renderDisconect()
        },
        n.prototype.onConnect = function() {
            console.log("onConnect"),
            this.client.sublastSubId = 0,
            this.client.meslastSubId = 0,
            this.connected = !0,
            this.hideContent("connection"),
            p["default"]("#connect-wqqt").hide(),
            p["default"]("#disconnect-wqqt").show(),
            p["default"]("#connect-state").show(),
            p["default"]("#disconnect-state").hide()
        },
        n.prototype.renderDisconect = function() {
            this.showContent("connection"),
            p["default"]("#connect-wqqt").show(),
            p["default"]("#disconnect-wqqt").hide(),
            p["default"]("#connect-state").hide(),
            p["default"]("#disconnect-state").show(),
            this.subscriptions = [],
            this.messages = [],
            this.connected = !1,
            p["default"]("#messageInner").html(""),
            p["default"]("#subInner").html("")
        },
        n.prototype.getSubscriptionForTopic = function(e) {
            var t = this.subscriptions;
            for (var i in t) if (t.hasOwnProperty(i) && t[i].topic === e) return t[i]
        },
        n.prototype.onMessageArrived = function(e) {
            console.log("onMessageArrived");
            var t = {
                id: this.client.meslastSubId++,
                topic: e.destinationName,
                retained: e.retained ? "Retained": "",
                qos: e.qos,
                payload: e.payloadString,
                timestamp: m["default"].toTime(new Date)
            },
            i = this.getSubscriptionForTopic(e.destinationName);
            i ? (t.subscriptionId = i.id, t.color = i.color) : (t.subscriptionId = "", t.color = "#eee"),
            this.messages.push(t),
            p["default"]("#messageInner").append(this.view.messageItem(t))
        },
        n.prototype.deleteMesBytopic = function(e) {
            var t = this;
            this.messages.map(function(i, a) {
                i.topic === e.topic && t.messages.splice(a, 1, {})
            }),
            p["default"](".message-" + e.id).remove()
        },
        n.prototype.onFail = function() {
            console.log("onFail"),
            this.view.showToast("连接失败", {
                messageType: "error"
            })
        },
        n.prototype.publish = function() {
            if (this.connected) {
                var e = this.view.get("publishTopic").getValue(),
                t = this.view.get("publishPayload").getValue(),
                i = parseInt(this.view.get("publishQoSInput").getValue(), 10),
                a = this.view.get("publishRetain").checked,
                n = new v["default"].Message(t);
                n.destinationName = e,
                n.qos = i,
                n.retained = a,
                this.client.send(n)
            } else this.view.showToast("请先连接！", {
                messageType: "error"
            })
        },
        n.prototype.hideContent = function(e) {
            p["default"]("." + e + "-main").slideUp(),
            p["default"]("#" + e + "-toggle.arrow-toggle").removeClass("icon-arrow-chevron").addClass("close-icon-arrow-chevron")
        },
        n.prototype.showContent = function(e) {
            p["default"]("." + e + "-main").slideDown(),
            p["default"]("#" + e + "-toggle.arrow-toggle").removeClass("close-icon-arrow-chevron").addClass("icon-arrow-chevron")
        },
        n.prototype.listenCloseSub = function(e) {
            var t = this;
            p["default"]("#subclose-" + e.id).click(function() {
                t.subscriptions.splice(e.id, 1, {}),
                t.deleteMesBytopic(e),
                t.client.unsubscribe(e.topic),
                p["default"]("#sub" + e.id).remove()
            })
        },
        n.prototype.createTopic = function() {
            var e = this;
            this.connected ? this.view.waitActionDialog({
                title: "Add New Topic Subscription",
                width: 440,
                url: "/iot/thing/topic",
                needFoot: !0
            }).then(function(t) {
                var i = t.target,
                a = i.getAction(),
                n = i.getChild("foot").getChild("btnOk"),
                r = i.getChild("foot").getChild("btnCancel");
                n.on("click",
                function() {
                    a.subscribe(function(t) {
                        e.client.subscribe(t.topic, {
                            qos: t.qos
                        });
                        var a = e.client.sublastSubId++;
                        t.id = a,
                        e.subscriptions.push(t),
                        p["default"]("#subInner").append(e.view.subItem(t)),
                        e.listenCloseSub(t),
                        i.dispose()
                    })
                }),
                r.on("click",
                function() {
                    return i.dispose()
                })
            }) : this.view.showToast("请先连接！", {
                messageType: "error"
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return b["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return h["default"]
            }
        }]),
        n
    } (c["default"]);
    module.exports = g
}),
define("iot/thing/connection.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_thing_connection --\x3e\n<div class="iot-thing-connection iot-main-wrap">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <a href="#/iot/thing/list~endpointName=${endpointName}">设备列表</a>\n            <span class="divider">/</span>\n            <span class="active">连接测试</span>\n        </p>\n        <div class="connection-content">\n            <div class="content-head">\n            \t<span id="connection-toggle" class="arrow-toggle icon-arrow-chevron"></span>\n                <h2>步骤1 &nbsp;&nbsp;&nbsp; Connection</h2>\n                <div id="connect-state" class="state" style="display: none;"><span class="point"></span>运行中</div>\n                <div id="disconnect-state" class="state"><span class="point"></span>未连接</div>\n            </div>\n            <div class="content-main connection-main">\n        \t    <form class="form-body" data-ui-type="Form" data-ui-id="form">\n        \t        <table>\n        \t            <tr>\n        \t                <td>\n        \t                    <label><span>*</span>主机名称：</label>\n        \t                </td>\n        \t                <td>\n        \t                    <input data-ui-name="host"\n        \t                    \t   data-ui-id="host"\n        \t                    \t   data-ui-width="253"\n        \t                    \t   data-ui-required-error-message="x"\n                                       data-ui-placeholder="请填写主机名称"\n        \t                    \t   data-ui-required="true"\n        \t                    \t   data-ui-type="TextBox"\n        \t                    \t   data-ui-value="${endpointName}.mqtt.iot.${region}.baidubce.com"/>\n        \t                    <label style="top: 3px"><span>&nbsp;&nbsp;&nbsp;&nbsp;*</span>端口：</label>\n        \t                    <input data-ui-name="port"\n        \t                    \t   data-ui-id="port"\n        \t                    \t   data-ui-width="40"\n                                       data-ui-required-error-message="x"\n                                       data-ui-placeholder="请填写端口号"\n        \t                    \t   data-ui-required="true"\n        \t                    \t   data-ui-type="TextBox"\n        \t                    \t   data-ui-value="8884" />\n        \t                </td>\n        \t                <td>\n        \t                    <label><span>&nbsp;&nbsp;&nbsp;&nbsp;*</span>用户ID：</label>\n        \t                </td>\n        \t                <td colspan="2">\n        \t                    <input data-ui-name="clientId"\n        \t                           data-ui-id="clientId"\n        \t                           data-ui-width="150"\n                                       data-ui-placeholder="请填写客户端ID"\n        \t                           data-ui-required-error-message="x"\n        \t                           data-ui-required="true"\n        \t                           data-ui-type="TextBox"\n        \t                           data-ui-value="@deviceId" />\n        \t                </td>\n        \t            </tr>\n        \t            <tr>\n        \t                <td>\n        \t                    <label><span>*</span>用户名：</label>\n        \t                </td>\n        \t                <td>\n        \t                    <input data-ui-name="username" data-ui-id="username" data-ui-width="140" data-ui-placeholder="请填写用户名称" data-ui-required-error-message="x" data-ui-required="true" data-ui-type="TextBox" data-ui-value="${endpointName}/${thingName}" />\n        \t                    <label style="top: 3px"><span>&nbsp;&nbsp;&nbsp;&nbsp;*</span>身份密钥：</label>\n        \t                    <input data-ui-name="password"\n                                       data-ui-id="password"\n                                       data-ui-width="130"\n                                       data-ui-required-error-message="x"\n                                       data-ui-required="true"\n                                       data-ui-type="TextBox"\n                                       type="password" />\n        \t                </td>\n        \t                <td>\n        \t                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Keep Alive：</label>\n        \t                </td>\n        \t                <td>\n        \t                    <input data-ui-name="keepAlive" data-ui-id="keepAlive" data-ui-width="40" data-ui-required="false" data-ui-type="TextBox" data-ui-value="60" />\n        \t                </td>\n        \t                <td>\n        \t                    <label style="top: 2px">&nbsp;&nbsp;&nbsp;&nbsp;SSL</label>\n        \t                    <input data-ui-name="ssl" data-ui-id="ssl" data-ui-type="CheckBox" data-ui-checked="true" data-ui-disabled="disabled" />\n                                <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="ssl-tip">该测试服务只支持WSS连接</span>\n        \t                    <label style="top: 2px">&nbsp;&nbsp;Clean Session</label>\n        \t                    <input data-ui-name="cleanSession" data-ui-id="cleanSession" data-ui-type="CheckBox" data-ui-checked="true" />\n        \t                </td>\n        \t            </tr>\n        \t            <tr>\n        \t                <td>\n        \t                    <label>Last-Will Topic：</label>\n        \t                </td>\n        \t                <td>\n        \t                    <input data-ui-name="lwTopic" data-ui-id="lwTopic" data-ui-width="382" data-ui-required="false" data-ui-type="TextBox" />\n        \t                </td>\n        \t                <td>\n        \t                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Last-Will QoS：</label>\n        \t                </td>\n        \t                <td>\n        \t                    <span data-ui-type="Select" data-ui-id="lwQos" data-ui-name="lwQos" data-ui-required="true" data-ui-datasource="@lastWillQoS"></span>\n        \t                </td>\n        \t                <td>\n        \t                    <label  style="top: 2px">&nbsp;&nbsp;&nbsp;&nbsp;Last-Will Retain</label>\n        \t                    <input data-ui-name="lastWillRetain" data-ui-id="lastWillRetain" data-ui-type="CheckBox" />\n        \t                </td>\n        \t            </tr>\n        \t            <tr>\n        \t                <td>\n        \t                    <label>Last-Will Messages：</label>\n        \t                </td>\n        \t                <td>\n        \t                    <input data-ui-name="lwMessage" data-ui-id="lwMessage" data-ui-width="382" data-ui-required="false" data-ui-type="TextBox" />\n        \t                </td>\n        \t            </tr>\n        \t        </table>\n        \t        <div class="operation-wrap">\n        \t            <button id="connect-wqqt" data-ui-type="Button" data-ui-skin="primary" data-ui-id="connect">connect</button>\n        \t            <button id="disconnect-wqqt" data-ui-type="Button" data-ui-skin="primary" data-ui-id="disconnect" style="display: none">disconnect</button>\n        \t        </div>\n        \t    </form>\n            </div>\n        </div>\n        <div class="steptwo">\n            <div class="connection-content" >\n                <div class="content-head">\n                \t<span id="publish-toggle" class="arrow-toggle icon-arrow-chevron"></span>\n                    <h2>步骤2 &nbsp;&nbsp;&nbsp; Publish</h2>\n                </div>\n                <div class="content-main publish-main">\n                    <form class="form-body" data-ui-type="Form" data-ui-id="publishForm">\n                        <table>\n                            <tr>\n                                <td>\n                                    <label>Topic：</label>\n                                </td>\n                                <td>\n                                    <input data-ui-name="publishTopic" data-ui-id="publishTopic" data-ui-width="200" data-ui-type="TextBox" />\n                                    <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="topic-tip">请从策略列表中获取有发布权限的主题</span>\n                                    <label style="top: 3px">&nbsp;&nbsp;&nbsp;&nbsp;QoS：</label>\n                                </td>\n                                <td>\n                                    <span data-ui-type="Select" data-ui-id="publishQoSInput" data-ui-name="publishQoSInput" data-ui-required="true" data-ui-datasource="@lastWillQoS"></span>\n                                </td>\n                                <td>\n                                    <label style="top: 2px">&nbsp;&nbsp;&nbsp;&nbsp;Retain</label>\n                                    <input data-ui-name="publishRetain" data-ui-id="publishRetain" data-ui-type="CheckBox" />\n                                </td>\n                            </tr>\n                            <tr>\n                                <td>\n                                    <label>Messages：</label>\n                                </td>\n                                <td colspan="3">\n                                    <textarea data-ui-type="TextBox" data-ui-id="publishPayload" data-ui-name="publishPayload" data-ui-width="420" data-ui-height="80" ></textarea>\n                                </td>\n                            </tr>\n                        </table>\n                        <div class="operation-wrap">\n                            <button data-ui-type="Button" data-ui-skin="primary" data-ui-id="publish">publish</button>\n                            <span class="publish-tip" data-ui-layer-width="160">如果主题没有设置发布权限，会导致连接断开</span>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="connection-content">\n                <div class="content-head">\n                \t<span id="message-toggle" class="arrow-toggle icon-arrow-chevron"></span>\n                    <h2>步骤3 &nbsp;&nbsp;&nbsp; Messages</h2>\n                </div>\n                <div class="message-main">\n                    <ul id="messageInner" class="message-list"></ul>\n                </div>\n            </div>\n        </div>\n        <div class="connection-content" style="float:right;width:36%;">\n            <div class="content-head">\n            \t<span id="sub-toggle" class="arrow-toggle icon-arrow-chevron"></span>\n                <h2>Subscriptions</h2>\n            </div>\n            <div class="content-main sub-main">\n            \t<div class="operation-wrap">\n                \t<button data-ui-type="Button" data-ui-skin="primary" data-ui-id="newTopic">Add New Topic Subscription</button>\n                </div>\n                <ul id="subInner" class="sub-list" data-ui-id="subscriptions"></ul>\n            </div>\n        </div>\n    </div>\n</div>\n\x3c!-- target: TPL_iot_thing_connection_child --\x3e\n\x3c!-- import: TPL_iot_thing_connection --\x3e\n\n\x3c!-- target: TPL_iot_thing_connection_message --\x3e\n<li class="messageline message-${message.subscriptionId}" id="message${message.id}">\n   <div class="message-content-detail">\n     <div class="message-time"> ${message.timestamp} </div>\n     <div class="message-topic">Topic: ${message.topic} </div>\n     <div class="message-qos">Qos: ${message.qos} </div>\n     <div class="message-retained"> ${message.retained}</div>\n   </div>\n   <div class="message-content-message" style="border-left:5px solid ${message.color}">\n       <div class="message-payload "> ${message.payload} </div>\n   </div>\n</li>\n\n\x3c!-- target: TPL_iot_thing_connection_subscription --\x3e\n<li class="subline" id="sub${sub.id}">\n   <div class="content" style="border-left: solid 7px ${sub.color}">\n     <div class="subclose" id="subclose-${sub.id}" data-value="${sub.id}"></div>\n     <div class="qos">Qos: ${sub.qos}</div>\n     <div class="topic">${sub.topic}</div>\n   </div>\n</li>'
}),
define("iot/thing/ConnectionModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "common/region"],
function(exports, module, e, t, i, a, n, r) {
    var o = n["default"](a),
    s = n["default"](r),
    l = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "submitRequest",
            get: function() {
                return ""
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    deviceId: function() {
                        for (var e = "DeviceId-",
                        t = "0123456789abcdefghijklmnopqrstuvwxyz",
                        i = 0; i < 10; ++i) e += t.charAt(Math.floor(Math.random() * t.length));
                        return e
                    },
                    lastWillQoS: function() {
                        return [{
                            text: "0",
                            value: 0
                        },
                        {
                            text: "1",
                            value: 1
                        }]
                    },
                    region: function(e) {
                        var t = s["default"].getCurrentRegion();
                        return t.id
                    }
                }
            }
        }]),
        n
    } (o["default"]);
    module.exports = l
}),
define("iot/thing/ConnectionView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./connection.tpl", "inf-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "etpl"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = r["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.messageItem = function(e) {
            return l["default"].render("TPL_iot_thing_connection_message", {
                message: e
            })
        },
        n.prototype.subItem = function(e) {
            return l["default"].render("TPL_iot_thing_connection_subscription", {
                sub: e
            })
        },
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "connect:click": function(t) {
                    return e.fire("connect")
                },
                "newTopic:click": function(t) {
                    return e.fire("createTopic")
                },
                "publish:click": function(t) {
                    return e.fire("publish")
                },
                "disconnect:click": function(t) {
                    return e.fire("disconnect")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_thing_connection"
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/thing/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].EDIT, this.edit, this)
        },
        n.prototype.edit = function(e) {
            c["default"].editThing.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName"),
                thingName: this.model.get("thingName")
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/thing/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_thing_detail --\x3e\n<div class="iot-endpoint-detail iot-main-wrap main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <a href="#/iot/thing/list~endpointName=${endpointName}">设备列表</a>\n            <span class="divider">/</span>\n            <span class="active">设备详情</span>\n        </p>\n        <div class="detail-content list-content">\n            <h2>\n                设备详情\n                \x3c!-- if: ${subPermission.permission.IotHubManage}--\x3e\n                <span data-ui-type="Button"\n                    data-ui-id="edit"\n                    data-ui-skin="edit">编辑</span>\n                \x3c!-- /if --\x3e\n            </h2>\n            <dl class="detail-content-item">\n                <dt></dt>\n                <dd>\n                    <div class="detail-content-row">\n                        <label>名称：</label>\n                        <div class="detail-content-value">${basicInfo.thingName}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>全名：</label>\n                        <div class="detail-content-value">${basicInfo.endpointName}/${basicInfo.thingName}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>创建时间：</label>\n                        <div class="detail-content-value">${basicInfo.localTime}</div>\n                    </div>\n                    <div class="detail-content-row">\n                        <label>绑定身份：</label>\n                        <div class="detail-content-value">\n                            <a href="#/iot/principal/detail~endpointName=${endpointName}&principalName=${basicInfo.principalName}">${basicInfo.principalName}</a>\n                        </div>\n                    </div>\n                </dd>\n            </dl>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/thing/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/timeUtil", "../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.prepare = function() {
            var e = this.get("basicInfo");
            d["default"].extend(e, {
                localTime: u["default"].toTime(e.createTime)
            }),
            this.set("basicInfo", e)
        },
        t["default"](n, [{
            key: "iotThingDetail",
            get: function() {
                return s.api.iotThingDetail
            }
        },
        {
            key: "subPermission",
            get: function() {
                return s.api.subPermission
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return e.iotThingDetail({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    },
                    subPermission: function(e) {
                        return e.subPermission({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = c
}),
define("iot/thing/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../events"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = r["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "edit:click": function(t) {
                    return e.fire(l["default"].EDIT, t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_thing_detail"
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/thing/dialog/Create", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "underscore", "../../events", "../../_public/util", "./CreateModel", "./CreateView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(p["default"].THING_CREATED, this.doCreate, this),
            this.view.on(p["default"].BEFORE_CHANGE, this.validateStep, this),
            this.view.on(p["default"].CONFIRM, this.redirectAfterSubmit, this),
            this.on("beforesubmit", this.beforeSubmit),
            this.on("entercomplete", this.renderNextView)
        },
        n.prototype.beforeSubmit = function(e) {
            e.preventDefault(),
            this.renderNextView()
        },
        n.prototype.renderNextView = function() {
            var e = this.view.getFormData(),
            t = this.model.getSubmitData(e);
            this.view.renderNextView({
                parentAction: this,
                formData: t
            })
        },
        n.prototype.checkDuplicate = function(e, t) {
            var i = !0,
            a = this.view.get("form").getInputControls(),
            n = a[0],
            r = a[1];
            return c["default"].contains(c["default"].pluck(n._listData, t), e[t]) && (r.showValidationMessage("invalid", "该名称已存在"), i = !1),
            i
        },
        n.prototype.validateStep = function(e) {
            var t = e.dir,
            i = e.viewStep,
            a = e.formData;
            t && (2 === i && a.principalName ? this.checkDuplicate(a, "principalName") || e.preventDefault() : 3 === i && a.policyName && (this.checkDuplicate(a, "policyName") || e.preventDefault()))
        },
        n.prototype.doCreate = function(e) {
            var t = this,
            i = this.filterData(e.allConfig);
            this.model.submitRequester(i, {
                "X-silence": !0
            }).done(function(e) {
                t.view.showToast(t.getToastMessage());
                var i = t.view.get("form").main,
                a = f["default"].getUIControls(i, null, "Panel")[0];
                if (e.password) {
                    a.show();
                    var n = f["default"].getUIControls(i, null, "Clipboard")[0];
                    n && n.set("clipboardText", e.password)
                } else a.hide();
                t.view.setFormData(e)
            }).fail(function(e) {
                return t.handleSubmitError(e)
            })
        },
        n.prototype.filterData = function(e) {
            var t = {},
            i = e[0],
            a = e[1],
            n = e[2],
            r = i.formData,
            o = a.formData,
            s = n.formData,
            l = r.endpointName;
            return s && !s.policy && (t.policy = {
                endpointName: l,
                policyName: s.policyName,
                topics: s.topics
            }),
            o && !o.principal && (t.principal = {
                endpointName: l,
                principalName: o.principalName,
                policyName: s.policy || s.policyName
            }),
            t.thing = {
                endpointName: l,
                thingName: r.thingName,
                principalName: o.principal || o.principalName
            },
            t
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("设备创建失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return h["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "设备创建成功！"
            }
        }]),
        n
    } (u["default"]);
    module.exports = b
}),
define("iot/thing/dialog/create.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_thing --\x3e\n<div class="iot-dialog-form iot-thing-edit iot-policy-create-dialog order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-row step-form-row">\n            <div data-ui-type="ViewStep"\n                data-ui-id="viewStep"\n                data-ui-current-step="0">\n                <ul>\n                    <li>创建设备</li>\n                    <li>设置身份</li>\n                    <li>设置策略</li>\n                    <li>配置确认</li>\n                </ul>\n            </div>\n        </div>\n        <div class="form-data-body" data-ui="type:ActionPanel;id:stepControl"></div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_thing_child --\x3e\n\x3c!-- import: TPL_iot_create_thing --\x3e\n'
}),
define("iot/thing/dialog/CreateModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        n.prototype.filterData = function(e) {
            return this.filterTopicsData(e),
            e
        },
        n.prototype.filterTopicsData = function(e) {
            var t = [],
            i = [],
            a = /[0-9]\d*$/gi,
            n = ["topic", "operations"];
            return l["default"].each(e,
            function(e, t) {
                var r = t.replace(a, "");
                if ( - 1 !== l["default"].indexOf(n, r)) {
                    var o = t.match(a);
                    o && i.push(o[0])
                }
            }),
            i = l["default"].uniq(i),
            l["default"].each(i,
            function(i) {
                var a = {};
                l["default"].each(n,
                function(t) {
                    var n = "" + t + i;
                    a[t] = e[n],
                    delete e[n]
                }),
                t.push(a)
            }),
            e.topics = t,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotThingCreateV2
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/thing/dialog/CreateTopic", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./CreateTopicModel", "./CreateTopicView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.subscribe = function(e) {
            var t = this.getRandomColor(),
            i = parseInt(this.view.get("lastWillQoS").getValue(), 10),
            a = this.view.get("topic").getValue();
            this.websocketclient = this.model.get("client");
            e({
                topic: a,
                qos: i,
                color: t
            })
        },
        n.prototype.getRandomColor = function() {
            return "#" + (16777215 * Math.random() << 0).toString(16)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/thing/dialog/createtopic.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_wqtt_topic --\x3e\n<div class="iot-create-topic">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-group">\n            <div class="form-row form-qos">\n                <label>Qos</label>\n                <div class="form-value">\n                    <select data-ui-id="lastWillQoS"\n                        data-ui-name="lastWillQoS"\n                        data-ui-width="62"\n                        data-ui-type="Select">\n                        <option value="0">0</option>\n                        <option value="1">1</option>\n                    </select>\n                </div>\n            </div>\n            <div class="form-row form-topic">\n                <label>Topic</label>\n                <div class="form-value">\n                    <input data-ui-name="topic"\n                        data-ui-id="topic"\n                        data-ui-width="220"\n                        data-ui-required-error-message="请填写Topic"\n                        data-ui-required="true"\n                        data-ui-type="TextBox"\n                        data-ui-value="testtopic/#" />\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_create_wqtt_topic_child --\x3e\n\x3c!-- import: TPL_iot_create_wqtt_topic --\x3e\n'
}),
define("iot/thing/dialog/CreateTopicModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/thing/dialog/CreateTopicView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./createtopic.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "subscribe:click": function(t) {
                    return e.fire("subscribe")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_wqtt_topic"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    pwdPanel: {
                        hidden: !0
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/thing/dialog/CreateView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./create.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "er/Deferred", "esui", "jquery", "../../events", "../../_public/util"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](u),
    g = r["default"](c),
    y = [{
        url: "/iot/thing/thing",
        hidden: ["btnFootLast"],
        bodyHeight: 137
    },
    {
        url: "/iot/thing/principal",
        access: function(e) {
            return ! e.principal
        },
        bodyHeight: 117
    },
    {
        url: "/iot/thing/policy",
        access: function(e) {
            return ! e.policy
        },
        bodyHeight: 117
    },
    {
        url: "/iot/thing/success",
        hidden: ["btnFootLast", "btnFootCancel"],
        bodyHeight: 265
    }],
    w = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "stepControl:prev": function(t) {
                    return e.renderLastView()
                }
            }
        },
        n.prototype.setExtraFormData = function(e) {
            var t = this.get("form"),
            i = g["default"].getUIControls(t.main, null, "Label");
            f["default"].each(i,
            function(t) {
                var i = t.get("for");
                e[i] && t.setText(e[i])
            })
        },
        n.prototype.renderLastView = function(e) {
            var t = this;
            this.renderActionView().done(function(e) {
                var i = e.action.formData;
                t.setFormData(i)
            })
        },
        n.prototype.renderNextView = function(e) {
            var t = this;
            this.renderActionView(e, !0).done(function(e) {
                e.viewStep === y.length ? t.fire(v["default"].THING_CREATED, e) : e.viewStep > y.length && t.fire(v["default"].CONFIRM, e)
            })
        },
        n.prototype.renderActionView = function(e, t) {
            e === undefined && (e = {});
            var i = m["default"].rejected(),
            a = this.get("viewStep").get("currentStep"),
            n = y[a - 1];
            if (!this.fire(v["default"].BEFORE_CHANGE, f["default"].extend(e, {
                dir: t,
                viewStep: a
            })).isDefaultPrevented()) {
                if (t) if (a += 1, n && (n.formData = e.formData), n && f["default"].isFunction(n.access) && !n.access(e.formData)) {
                    var r = y[(a = y.length) - 1];
                    i = this.changeStepView(r, e, a)
                } else {
                    var o = y[a - 1];
                    i = o ? this.changeStepView(o, e, a) : m["default"].resolved({
                        viewStep: a,
                        allConfig: y
                    })
                } else {
                    var s = y[(a -= 1) - 1];
                    e.formData = s.formData,
                    i = this.changeStepView(s, e, a)
                }
                return i
            }
        },
        n.prototype.getDialog = function() {
            var e = this.getContainerElement(),
            t = b["default"](e).parents(".ui-dialog").get(0);
            return h["default"].getControlByDOM(t)
        },
        n.prototype.changeStepView = function(e, t, i) {
            var a = this.get("stepControl"),
            n = this.get("viewStep"),
            r = this.getDialog(),
            o = r.get("body"),
            s = r.get("foot");
            e.bodyHeight && (o.main.style.minHeight = e.bodyHeight + "px"),
            r.resize(),
            f["default"].each(s.children,
            function(t) {
                t[f["default"].contains(e.hidden, t.id) ? "hide": "show"]()
            });
            var l = s.getChild("btnOk");
            return i >= y.length ? l.setContent("确认") : l.setContent("下一步"),
            a.setProperties({
                url: e.url,
                actionOptions: t
            }),
            a.action.done(function() {
                return n.set("currentStep", i),
                {
                    action: e,
                    viewStep: i,
                    allConfig: y,
                    dialog: r
                }
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_thing"
            }
        }]),
        n
    } (p["default"]);
    module.exports = w
}),
define("iot/thing/dialog/Edit", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "underscore", "../../events", "../../_public/util", "./EditModel", "./EditView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(p["default"].THING_CREATED, this.doCreate, this),
            this.view.on(p["default"].BEFORE_CHANGE, this.validateStep, this),
            this.view.on(p["default"].CONFIRM, this.redirectAfterSubmit, this),
            this.on("beforesubmit", this.beforeSubmit),
            this.on("entercomplete", this.renderNextView)
        },
        n.prototype.beforeSubmit = function(e) {
            e.preventDefault(),
            this.renderNextView()
        },
        n.prototype.renderNextView = function() {
            var e = this.view.getFormData(),
            t = this.model.getSubmitData(e);
            this.view.renderNextView({
                parentAction: this,
                formData: t
            })
        },
        n.prototype.checkDuplicate = function(e, t) {
            var i = !0,
            a = this.view.get("form").getInputControls(),
            n = a[0],
            r = a[1];
            return c["default"].contains(c["default"].pluck(n._listData, t), e[t]) && (r.showValidationMessage("invalid", "该名称已存在"), i = !1),
            i
        },
        n.prototype.validateStep = function(e) {
            var t = e.dir,
            i = e.viewStep,
            a = e.formData;
            t && (2 === i && a.principalName ? this.checkDuplicate(a, "principalName") || e.preventDefault() : 3 === i && a.policyName && (this.checkDuplicate(a, "policyName") || e.preventDefault()))
        },
        n.prototype.doCreate = function(e) {
            var t = this,
            i = this.filterData(e.allConfig);
            this.model.submitRequester(i, {
                "X-silence": !0
            }).done(function(e) {
                t.view.showToast(t.getToastMessage());
                var i = t.view.get("form").main,
                a = f["default"].getUIControls(i, null, "Panel")[0];
                if (e.password) {
                    a.show();
                    var n = f["default"].getUIControls(i, null, "Clipboard")[0];
                    n && n.set("clipboardText", e.password)
                } else a.hide();
                t.view.setFormData(e)
            }).fail(function(e) {
                return t.handleSubmitError(e)
            })
        },
        n.prototype.filterData = function(e) {
            var t = {},
            i = e[0],
            a = e[1],
            n = e[2],
            r = i.formData,
            o = a.formData,
            s = n.formData,
            l = r.endpointName;
            return s && !s.policy && (t.policy = {
                endpointName: l,
                policyName: s.policyName,
                topics: s.topics
            }),
            o && !o.principal && (t.principal = {
                endpointName: l,
                principalName: o.principalName,
                policyName: s.policy || s.policyName
            }),
            t.thing = {
                endpointName: l,
                thingName: r.thingName,
                principalName: o.principal || o.principalName
            },
            t
        },
        n.prototype.handleSubmitError = function(e) {
            e && e.field && this.view.notifyErrors(e.field),
            this.view.showToast("设备编辑失败！"),
            this.view.get("form").fire("submitError")
        },
        n.prototype.redirectAfterSubmit = function(e) {
            this.model.get("parentAction").reload(),
            this.view.get("form").fire("submitSuccess")
        },
        n.prototype.redirectAfterCancel = function() {
            return ! 1
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return h["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return m["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "设备编辑成功！"
            }
        }]),
        n
    } (u["default"]);
    module.exports = b
}),
define("iot/thing/dialog/edit.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_edit_thing --\x3e\n<div class="iot-dialog-form iot-thing-edit iot-edit-dialog iot-policy-create-dialog order-recharge">\n    <form data-ui-type="Form" data-ui-id="form"\n        data-ui-auto-validate="true">\n        <div class="form-row step-form-row">\n            <div data-ui-type="ViewStep"\n                data-ui-id="viewStep"\n                data-ui-current-step="0">\n                <ul>\n                    <li>编辑设备</li>\n                    <li>设置身份</li>\n                    <li>设置策略</li>\n                    <li>配置确认</li>\n                </ul>\n            </div>\n        </div>\n        <div class="form-data-body" data-ui="type:ActionPanel;id:stepControl"></div>\n    </form>\n</div>\n\x3c!-- target: TPL_iot_edit_thing_child --\x3e\n\x3c!-- import: TPL_iot_edit_thing --\x3e'
}),
define("iot/thing/dialog/EditModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "underscore", "../../config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraData = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        n.prototype.filterData = function(e) {
            return this.filterTopicsData(e),
            e
        },
        n.prototype.filterTopicsData = function(e) {
            var t = [],
            i = [],
            a = /[0-9]\d*$/gi,
            n = ["topic", "operations"];
            return l["default"].each(e,
            function(e, t) {
                var r = t.replace(a, "");
                if ( - 1 !== l["default"].indexOf(n, r)) {
                    var o = t.match(a);
                    o && i.push(o[0])
                }
            }),
            i = l["default"].uniq(i),
            l["default"].each(i,
            function(i) {
                var a = {};
                l["default"].each(n,
                function(t) {
                    var n = "" + t + i;
                    a[t] = e[n],
                    delete e[n]
                }),
                t.push(a)
            }),
            e.topics = t,
            e
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return o.api.iotThingEditV2
            }
        },
        {
            key: "iotThingDetail",
            get: function() {
                return o.api.iotThingDetail
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/thing/dialog/EditView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./edit.tpl", "bat-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "underscore", "er/Deferred", "esui", "jquery", "../../events", "../../_public/util"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c) {
    var p = r["default"](n),
    f = r["default"](o),
    m = r["default"](s),
    h = r["default"](l),
    b = r["default"](d),
    v = r["default"](u),
    g = r["default"](c),
    y = [{
        url: "/iot/thing/thing",
        hidden: ["btnFootLast"],
        bodyHeight: 137
    },
    {
        url: "/iot/thing/principal",
        access: function(e) {
            return ! e.principal
        },
        bodyHeight: 87
    },
    {
        url: "/iot/thing/policy",
        access: function(e) {
            return ! e.policy
        },
        bodyHeight: 87
    },
    {
        url: "/iot/thing/success",
        hidden: ["btnFootLast", "btnFootCancel"],
        bodyHeight: 265
    }],
    w = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "stepControl:prev": function(t) {
                    return e.renderLastView()
                }
            }
        },
        n.prototype.setExtraFormData = function(e) {
            var t = this.get("form"),
            i = g["default"].getUIControls(t.main, null, "Label");
            f["default"].each(i,
            function(t) {
                var i = t.get("for");
                e[i] && t.setText(e[i])
            })
        },
        n.prototype.renderLastView = function(e) {
            var t = this;
            this.renderActionView().done(function(e) {
                var i = e.action.formData;
                t.setFormData(i)
            })
        },
        n.prototype.renderNextView = function(e) {
            var t = this;
            this.renderActionView(e, !0).done(function(i) {
                var a = i.viewStep;
                if (a === y.length) t.fire(v["default"].THING_CREATED, i);
                else if (a > y.length) return void t.fire(v["default"].CONFIRM, i);
                var n = e.formData,
                r = t.get("form");
                switch (a) {
                case 1:
                    t.setFormData(f["default"].extend({
                        thingName:
                        t.model.get("thingName")
                    },
                    n));
                    break;
                case 2:
                    var o = r.getInputControls()[0];
                    o.setValue("数据读取中..."),
                    o.setDisabled(!0),
                    t.model.iotThingDetail(f["default"].pick(i.allConfig[0].formData, "endpointName", "thingName"), {
                        "X-silence": !0
                    }).done(function(e) {
                        o.setDisabled(!1),
                        o.setValue(e.principalName, {
                            keyword: ""
                        })
                    })
                }
            })
        },
        n.prototype.renderActionView = function(e, t) {
            e === undefined && (e = {});
            var i = m["default"].rejected(),
            a = this.get("viewStep").get("currentStep"),
            n = y[a - 1];
            if (!this.fire(v["default"].BEFORE_CHANGE, f["default"].extend(e, {
                dir: t,
                viewStep: a
            })).isDefaultPrevented()) {
                if (t) if (a += 1, n && (n.formData = e.formData), n && f["default"].isFunction(n.access) && !n.access(e.formData)) {
                    var r = y[(a = y.length) - 1];
                    i = this.changeStepView(r, e, a)
                } else {
                    var o = y[a - 1];
                    i = o ? this.changeStepView(o, e, a) : m["default"].resolved({
                        viewStep: a,
                        allConfig: y
                    })
                } else {
                    var s = y[(a -= 1) - 1];
                    e.formData = s.formData,
                    i = this.changeStepView(s, e, a)
                }
                return i
            }
        },
        n.prototype.getDialog = function() {
            var e = this.getContainerElement(),
            t = b["default"](e).parents(".ui-dialog").get(0);
            return h["default"].getControlByDOM(t)
        },
        n.prototype.changeStepView = function(e, t, i) {
            var a = this,
            n = this.get("stepControl"),
            r = this.get("viewStep"),
            o = this.getDialog(),
            s = o.get("body"),
            l = o.get("foot");
            e.bodyHeight && (s.main.style.minHeight = e.bodyHeight + "px"),
            o.resize(),
            f["default"].each(l.children,
            function(t) {
                t[f["default"].contains(e.hidden, t.id) ? "hide": "show"]()
            });
            var d = l.getChild("btnOk");
            return i >= y.length ? d.setContent("确认") : d.setContent("下一步"),
            n.setProperties({
                url: e.url,
                actionOptions: t
            }),
            n.action.done(function() {
                if (r.set("currentStep", i), 1 === i) {
                    a.get("form").getInputControls()[0].setReadOnly(!0)
                }
                return {
                    action: e,
                    viewStep: i,
                    allConfig: y,
                    dialog: o
                }
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_edit_thing"
            }
        }]),
        n
    } (p["default"]);
    module.exports = w
}),
define("iot/thing/dialog/Policy", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "esui/lib", "../../_public/util", "../../events", "./PolicyModel", "./PolicyView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = n["default"](a),
    c = n["default"](r),
    p = n["default"](o),
    f = n["default"](s),
    m = n["default"](l),
    h = n["default"](d),
    b = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            var e = this;
            a.prototype.initBehavior.call(this),
            this.view.on(f["default"].CREATE_POLICY,
            function() {
                return e.togglePolicy(!0)
            }),
            this.view.on(f["default"].CANCEL_CREATE_POLICY,
            function() {
                return e.togglePolicy(!1)
            });
            var t = c["default"].g("topicContainer"),
            i = c["default"].g("realContainer");
            this.delegateEvent("add-topic", "click", this.addTopic, i),
            this.delegateEvent("delete-topic", "click", this.deleteTopic, t),
            this.topicInputEvent("input", t),
            this.on("entercomplete", this.enterComplete)
        },
        n.prototype.topicInputEvent = function(e, t, i) {
            var a = this;
            c["default"].on(t || document.body, e,
            function(e) {
                var t = c["default"].event.getTarget(e),
                i = t.name.replace("topic", "operations"),
                n = a.view.get(i).getBoxElements()[0];
                t.value.startsWith("$SYS/") ? (n.checked && n.click(), n.disabled = !0) : n.disabled = !1
            })
        },
        n.prototype.enterComplete = function() {
            var e = this;
            this.view.loadTopicBox().done(function() {
                return e.togglePolicy(!1)
            })
        },
        n.prototype.togglePolicy = function(e) {
            var t = this.view.get("createPanel"),
            i = p["default"].getInputControls(t.main);
            p["default"].setControlsDisabled(i, !e),
            this.view.get("createPanel")[e ? "show": "hide"]()
        },
        n.prototype.addTopic = function(e) {
            this.view.loadTopicBox(),
            this.model.get("parentAction").fire("dialog.resize")
        },
        n.prototype.deleteTopic = function(e) {
            c["default"].removeNode(e.target.parentNode),
            this.model.get("parentAction").fire("dialog.resize")
        },
        n.prototype.delegateEvent = function(e, t, i, a, n) {
            var r = this;
            c["default"].on(a || document.body, t,
            function(a) {
                var o = c["default"].event.getTarget(a),
                s = o.getAttribute("action-type");
                s && s === e && i.call(n || r, {
                    target: o,
                    container: r,
                    eventType: t,
                    originEvent: a
                })
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return h["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return m["default"]
            }
        }]),
        n
    } (u["default"]);
    module.exports = b
}),
define("iot/thing/dialog/policy.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_thing_policy --\x3e\n<div class="form-row last-form-row form-name">\n    <label><i>＊</i>策略：</label>\n    <div class="form-value">\n        <div data-ui="\n            type:SuggestInput;\n            id:policy;\n            name:policy;\n            input-autocomplete:off;\n        "></div>\n    </div>\n</div>\n<div class="form-row intro-form-row">\n    <label></label>\n    <div class="form-value">\n        <p class="intro">为设备选择策略（包括主题和权限），若没有须创建</p>\n    </div>\n</div>\n<div data-ui-type="Panel" data-ui-id="createPanel" class="create-panel">\n    <div class="form-row form-name">\n        <label><i>＊</i>名称：</label>\n        <div class="form-value">\n            <div data-ui-type="TextBox"\n                data-ui-name="policyName"\n                data-ui-id="policyName"></div>\n            \x3c!-- import: TPL_iot_name_tip --\x3e\n        </div>\n    </div>\n    <div id="realContainer">\n        <div id="topicContainer" class="topic-list create-list">\n        </div>\n        <div class="operation-line">\n            <i class="origin"></i>\n            <i class="iconfont icon-plus" action-type="add-topic"></i>\n        </div>\n    </div>\n    <p class="iot-form-tip">注：点击右侧加（＋）号为本策略绑定更多的主题。</p>\n</div>\n\x3c!-- target: TPL_iot_create_thing_policy_child --\x3e\n\x3c!-- import: TPL_iot_create_thing_policy --\x3e\n'
}),
define("iot/thing/dialog/PolicyModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../../enum"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    policySource: function(e) {
                        return r.OPERATIONS.toArray()
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/thing/dialog/PolicyView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./policy.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "underscore", "esui", "esui/lib", "er/Deferred", "../../events", "../../enum", "../../config", "../../helper"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p, f) {
    var m = r["default"](n),
    h = r["default"](o),
    b = r["default"](s),
    v = r["default"](l),
    g = r["default"](d),
    y = r["default"](u),
    w = 0,
    x = {
        topic: {
            width: 200,
            title: "主题",
            disabled: !0,
            placeholder: "请填写主题，长度1-255",
            required: "required",
            custom: r["default"](f)["default"].isValidTopic,
            customErrorMessage: "主题格式错误"
        },
        operations: {
            title: "权限",
            required: "required",
            value: h["default"].pluck(c.OPERATIONS.toArray(), "value").join()
        }
    },
    T = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                policyName: {
                    title: "名称",
                    width: 200,
                    disabled: !0,
                    required: "required",
                    placeholder: "请填写策略名称，长度3-32",
                    pattern: p.nameRegExp
                },
                policy: {
                    width: 222,
                    title: "策略",
                    required: "required",
                    placeholder: "请选择绑定策略",
                    action: p.api.iotPolicySearch,
                    params: {
                        endpointName: this.model.get("formData").endpointName
                    },
                    formatter: function(e, t) {
                        return e.policyName
                    }
                },
                createPanel: {
                    hidden: !0
                }
            }
        },
        n.prototype.getUIEvents = function() {
            return {
                policy: {
                    create: function(e) {
                        this.fire(y["default"].CREATE_POLICY, e)
                    },
                    cancelcreate: function(e) {
                        this.fire(y["default"].CANCEL_CREATE_POLICY, e)
                    }
                }
            }
        },
        n.prototype.loadTopicBox = function() {
            var e = this,
            t = v["default"].g("topicContainer");
            return this.model.set("index", w),
            this.loadTemplate("TPL_iot_policy_fragment", t).done(function(i) {
                b["default"].init(i.box, {
                    viewContext: e.viewContext,
                    properties: e.getTopicBoxProperties(w++)
                }),
                t.scrollTop = t.scrollHeight
            })
        },
        n.prototype.loadTemplate = function(e, t) {
            var i = new g["default"],
            a = this.templateRender(e, this.getTemplateData()),
            n = document.createElement("DIV");
            return n.className = "topic-box",
            n.innerHTML = a,
            t.appendChild(n),
            i.resolve({
                box: n,
                container: t,
                html: a
            }),
            i.promise
        },
        n.prototype.getTopicBoxProperties = function(e) {
            var t = h["default"].deepClone(x);
            return t.topic.disabled = !1,
            t.operations.datasource = this.model.get("policySource"),
            h["default"].each(t,
            function(i, a) {
                t["" + a + e] = i,
                delete t[a]
            }),
            t
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_thing_policy"
            }
        }]),
        n
    } (m["default"]);
    module.exports = T
}),
define("iot/thing/dialog/Principal", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../../_public/util", "../../events", "./PrincipalModel", "./PrincipalView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            var e = this;
            a.prototype.initBehavior.call(this),
            this.view.on(c["default"].CREATE_PRINCIPAL,
            function() {
                return e.togglePrincipal(!0)
            }),
            this.view.on(c["default"].CANCEL_CREATE_PRINCIPAL,
            function() {
                return e.togglePrincipal(!1)
            }),
            this.on("entercomplete", this.enterComplete)
        },
        n.prototype.enterComplete = function() {
            var e = this.view.get("principal"),
            t = this.model.get("formData"); ! t.principal && t.principalName ? (e.updateStatus("creating"), this.togglePrincipal(!0)) : this.togglePrincipal()
        },
        n.prototype.togglePrincipal = function(e) {
            var t = this.view.get("createPanel"),
            i = u["default"].getInputControls(t.main);
            u["default"].setControlsDisabled(i, !e),
            this.view.get("createPanel")[e ? "show": "hide"]()
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/thing/dialog/principal.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_thing_principal --\x3e\n<div class="form-row last-form-row">\n    <label><i>＊</i>身份：</label>\n    <div class="form-value">\n        <div data-ui="\n            type:SuggestInput;\n            id:principal;\n            name:principal;\n            input-autocomplete:off;\n        "></div>\n    </div>\n</div>\n<div class="form-row intro-form-row">\n    <label></label>\n    <div class="form-value">\n        <p class="intro">为设备选择安全访问身份，若没有须创建</p>\n    </div>\n</div>\n<div data-ui-type="Panel" data-ui-id="createPanel" class="create-panel">\n    <div class="form-row">\n        <label><i>＊</i>名称：</label>\n        <div class="form-value">\n            <div data-ui-type="TextBox"\n                data-ui-name="principalName"\n                data-ui-id="principalName"></div>\n            \x3c!-- import: TPL_iot_name_tip --\x3e\n        </div>\n    </div>\n</div>\n\x3c!-- target: TPL_iot_create_thing_principal_child --\x3e\n\x3c!-- import: TPL_iot_create_thing_principal --\x3e\n'
}),
define("iot/thing/dialog/PrincipalModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/thing/dialog/PrincipalView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./principal.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../../events", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                principalName: {
                    title: "名称",
                    width: 200,
                    disabled: !0,
                    required: "required",
                    placeholder: "请填写身份名称，长度3-32",
                    pattern: s.nameRegExp
                },
                principal: {
                    width: 222,
                    title: "身份",
                    required: "required",
                    placeholder: "请选择绑定身份",
                    action: s.api.iotPrincipalSearch,
                    params: {
                        endpointName: this.model.get("formData").endpointName
                    },
                    formatter: function(e, t) {
                        return e.principalName
                    }
                },
                createPanel: {
                    hidden: !0
                }
            }
        },
        n.prototype.getUIEvents = function() {
            return {
                principal: {
                    create: function(e) {
                        this.fire(d["default"].CREATE_PRINCIPAL, e)
                    },
                    cancelcreate: function(e) {
                        this.fire(d["default"].CANCEL_CREATE_PRINCIPAL, e)
                    }
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_thing_principal"
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/thing/dialog/Success", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./SuccessModel", "./SuccessView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/thing/dialog/success.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_thing_success --\x3e\n<div class="iot-success-confirm">\n    <div class="form-row-group">\n        <div class="form-title">设备</div>\n        <div class="form-row">\n            <label>名称：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="thingName">数据读取中...</label>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="form-row-group">\n        <div class="form-title">身份</div>\n        <div class="form-row">\n            <label>名称：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="principalName">数据读取中...</label>\n                </div>\n            </div>\n        </div>\n        <div class="form-row" data-ui-type="Panel" data-ui-id="pwdPanel">\n            <label>密钥：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="password">数据读取中...</label>\n                    <a data-ui-type="Clipboard"\n                        data-ui-id="copyPassword"\n                        data-ui-clipboard-text=""\n                        class="ui-button copy-password">复制</a>\n                </div>\n                <p class="warning">请合理保管以上密钥，密钥丢失无法找回，只能重新生成</p>\n            </div>\n        </div>\n    </div>\n    <div class="form-row-group last-form-row-group">\n        <div class="form-title">策略</div>\n        <div class="form-row">\n            <label>名称：</label>\n            <div class="form-value">\n                <div class="default-txt">\n                    <label data-ui-type="Label" data-ui-for="policyName">-</label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\x3c!-- target: TPL_iot_create_thing_success_child --\x3e\n\x3c!-- import: TPL_iot_create_thing_success --\x3e\n'
}),
define("iot/thing/dialog/SuccessModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/thing/dialog/SuccessView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./success.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "copyPassword:aftercopy": function(t) {
                    return e.showToast("复制成功")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_thing_success"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    pwdPanel: {
                        hidden: !0
                    }
                }
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/thing/dialog/Thing", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../../events", "./ThingModel", "./ThingView"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = n["default"](o),
    c = n["default"](s),
    p = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(d["default"].INPUT, this.syncWithName, this)
        },
        n.prototype.syncWithName = function(e) {
            var t = this.view.get("thingName"),
            i = this.view.get("thingNameLabel"),
            a = t.getValue();
            i.setText(a)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return c["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return u["default"]
            }
        },
        {
            key: "toastMessage",
            get: function() {
                return "设备创建成功！"
            }
        }]),
        n
    } (l["default"]);
    module.exports = p
}),
define("iot/thing/dialog/thing.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_create_thing_thing --\x3e\n<div class="form-row">\n    <label><i>＊</i>名称：</label>\n    <div class="form-value">\n        <div data-ui-type="TextBox"\n            data-ui-id="thingName"\n            data-ui-name="thingName"></div>\n        \x3c!-- import: TPL_iot_name_tip --\x3e\n    </div>\n</div>\n<div class="form-row">\n    <label>全名：</label>\n    <div class="form-value">\n        <div class="default-txt">${formData.endpointName}/<label data-ui-type="Label" data-ui-id="thingNameLabel" data-ui-for="thingName"></label></div>\n    </div>\n</div>\n\x3c!-- target: TPL_iot_create_thing_thing_child --\x3e\n\x3c!-- import: TPL_iot_create_thing_thing --\x3e\n'
}),
define("iot/thing/dialog/ThingModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/class-call-check", "bat-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a) {
    var n = function(i) {
        function a() {
            t["default"](this, a),
            i.apply(this, arguments)
        }
        return e["default"](a, i),
        a
    } (a["default"](i)["default"]);
    module.exports = n
}),
define("iot/thing/dialog/ThingView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./thing.tpl", "bat-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "../../events", "../../config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = r["default"](n),
    d = r["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIProperties = function() {
            return {
                thingName: {
                    width: 200,
                    title: "设备名称",
                    required: "required",
                    placeholder: "请填写设备名称，长度3-32",
                    pattern: s.nameRegExp
                }
            }
        },
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "thingName:input": function(t) {
                    return e.fire(d["default"].INPUT, t)
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_create_thing_thing"
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/thing/List", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "../events", "../operations", "./ListModel", "./ListView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(u["default"].REFRESH, this.reload, this),
            this.view.on(u["default"].CREATE, this.create, this),
            this.view.on(u["default"].EDIT, this.edit, this),
            this.view.on(u["default"].DELETE, this["delete"], this),
            this.view.on(u["default"].EDIT_TABLE_CELL, this.editTableCell, this)
        },
        n.prototype.editTableCell = function(e) {
            var t = this;
            if (this.model.get("subPermission").permission.IotHubManage) {
                var i = this.view.get("table").datasource[e.rowIndex];
                if (e.value !== i.description) {
                    var a = {
                        endpointName: i.endpointName,
                        thingName: i.thingName,
                        description: e.value
                    };
                    this.model.updateDescription(a).then(function() {
                        return t.view.showToast("修改设备描述成功！")
                    }).then(function() {
                        t.view.get("table").setCellText(e.value, e.rowIndex, e.columnIndex),
                        i.description = e.value
                    }).fail(function() {
                        return t.view.showToast("修改设备描述失败！")
                    })
                }
            } else this.view.showToast("没有权限修改！", {
                messageType: "error"
            })
        },
        n.prototype.create = function() {
            c["default"].createThing.call(this, {
                parentAction: this,
                endpointName: this.model.get("endpointName")
            })
        },
        n.prototype.edit = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            c["default"].editThing.call(this, {
                parentAction: this,
                endpointName: i,
                thingName: a
            })
        },
        n.prototype["delete"] = function(e) {
            var t = e.args.split(","),
            i = t[0],
            a = t[1];
            c["default"].confirmHandler({
                title: "删除设备",
                content: "确认删除该设备",
                width: 300
            },
            "thing.delete", this.view, {
                endpointName: i,
                thingName: a
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/thing/list.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_thing_list --\x3e\n<div class="iot-main-wrap iot-thing-list main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb">\n            <span>物联网服务</span>\n            <span class="divider">/</span>\n            <a href="#/iot/endpoint/list">实例列表</a>\n            <span class="divider">/</span>\n            <span class="active">设备列表</span>\n        </p>\n        <div class="list-content">\n            <h2>设备列表</h2>\n            <div class="table-full-wrap">\n                <div class="operation-wrap">\n                    \x3c!-- if: ${subPermission.permission.IotHubManage}--\x3e\n                    <button data-ui-id="create"\n                        data-ui-type="Button"\n                        data-ui-skin="create"\n                        title="创建设备">创建设备</button>\n                    <span data-ui-arrow="false" data-ui-type="Tip" data-ui-layer-width="160" class="ssl-tip">最多可创建10000个设备，可<a href="http://ticket.bce.baidu.com/#/ticket/create ">提交工单</a>申请更多额度</span>\n                    \x3c!-- /if --\x3e\n                    <span class="ui-group ui-search-group">\n                        <input class="search-box"\n                            data-ui-type="TextBox"\n                            data-ui-id="keyword"\n                            data-ui-name="keyword" />\n                        <button data-ui-type="Button"\n                            data-ui-id="searchBtn"\n                            class="search-button"></button>\n                    </span>\n                </div>\n\n                <div data-ui-type="Table" data-ui-id="table"\n                     data-ui-datasource="@tableData"\n                     data-ui-order-by="@orderBy" data-ui-order="@order"\n                     data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                     data-ui-extension-command-type="Command"\n                     data-ui-extension-tableedit-type="TableEdit"\n                     data-ui-extension-tableex-type="TableEx">\n                </div>\n                <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/thing/ListModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getExtraQuery = function() {
            return {
                endpointName: this.get("endpointName")
            }
        },
        n.prototype.updateDescription = function(e) {
            return r.api.updateThingDesp(e)
        },
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.iotThingList
            }
        },
        {
            key: "subPermission",
            get: function() {
                return r.api.subPermission
            }
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize
                }
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    subPermission: function(e) {
                        return e.subPermission({
                            endpointName: e.get("endpointName"),
                            thingName: e.get("thingName")
                        })
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/thing/ListView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./list.tpl", "underscore", "babel-runtime/helpers/interop-require-default", "inf-ria/mvc/ListView", "common/util/timeUtil", "../events", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = r["default"](d),
    h = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "create:click": function(t) {
                    return e.fire(f["default"].CREATE, t)
                },
                "table:command": function(t) {
                    return e.fire(t.name, t)
                },
                "keyword:enter": function(t) {
                    return e.submitSearch(t)
                },
                "searchBtn:click": function(t) {
                    return e.submitSearch(t)
                },
                "table:saveedit": function(t) {
                    return e.fire(f["default"].EDIT_TABLE_CELL, t)
                }
            }
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "设备名称",
                    field: "thingName",
                    content: function(e, t) {
                        var i = u["default"].escape(e.endpointName),
                        a = u["default"].escape(e.thingName);
                        return '<a href=\n                    "#/iot/thing/detail~endpointName=' + i + "&thingName=" + a + '"\n                    >' + a + "</a>"
                    }
                },
                {
                    title: "描述",
                    field: "description",
                    content: "description",
                    editable: 1
                },
                {
                    title: "用户名",
                    field: "wholeName",
                    content: function(e, t) {
                        return u["default"].escape(e.endpointName + "/" + e.thingName)
                    }
                },
                {
                    title: "创建时间",
                    stable: !0,
                    width: 250,
                    field: "createTime",
                    content: function(e, t) {
                        return p["default"].toTime(e.createTime)
                    }
                },
                {
                    title: "操作",
                    stable: !0,
                    width: 170,
                    field: "operation",
                    content: function(t, i) {
                        return e.getAllOpertionsHtml(t, i)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e, t) {
            var i = [];
            return this.model.get("subPermission").permission.IotHubManage ? Array.prototype.push.apply(i, [this.getConnectionTest(e, t), this.getEditHtml(e, t), this.getDeleteHtml(e, t)]) : Array.prototype.push.apply(i, [this.getConnectionTest(e, t)]),
            i.join("")
        },
        n.prototype.getConnectionTest = function(e, t) {
            return '<a class="operations"\n                    href="#/iot/thing/connection~endpointName=' + e.endpointName + "&thingName=" + e.thingName + '"\n                    target="_blank">\n                    <button class="cmd-button">\n                        连接测试\n                    </button>\n                </a>'
        },
        n.prototype.getEditHtml = function(e, t) {
            var i = [e.endpointName, e.thingName].join();
            return u["default"].template(m["default"].tpl.command)({
                label: "编辑",
                command: f["default"].EDIT,
                args: i,
                className: "",
                disabled: ""
            })
        },
        n.prototype.getDeleteHtml = function(e, t) {
            var i = [e.endpointName, e.thingName].join();
            return u["default"].template(m["default"].tpl.command)({
                label: "删除",
                command: f["default"].DELETE,
                args: i,
                className: "",
                disabled: ""
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_thing_list"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    keyword: {
                        width: 220,
                        value: "@keyword",
                        placeholder: "请输入设备名称"
                    },
                    table: {
                        select: !1,
                        editable: 1,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: m["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (c["default"]);
    module.exports = h
}),
define("iot/turnkey/Choose", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./ChooseModel", "./ChooseView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/turnkey/choose.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_turnkey_choose --\x3e\n<div class="iot-main-wrap iot-turnkey-choose main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb"><a href="#/iot/turnkey/choose">天工-快速通道</a></p>\n        <div class="list-content detail-content">\n            <div class="content-header">\n                <h2>天工物联网快速应用通道</h2>\n                <div data-ui-type="ViewStep"\n                        data-ui-id="createStep"\n                        data-ui-current-step="1">\n                    <ul>\n                        <li>选择场景</li>\n                        <li>确认场景</li>\n                        <li>创建工程</li>\n                        \x3c!-- <li>测试</li> --\x3e\n                    </ul>\n                </div>\n            </div>\n            <div class="content-main">\n                <h3 style="margin-top: 15px;">欢迎进入天工物联网快速应用通道</h3>\n                <p style="margin-bottom: 15px;">快速通道旨在提供快捷，一站式的物联网应用搭建通道，通过对应用场景的快速界定，智能地为您制定资源配置方案，由系统自动在后台创建并配置好各项服务，为您省去分割在各个产品控制台的诸多配置工作，大大降低产品的使用门槛和学习技术，帮助您更快更轻松的开启业务新纪元。</p>\n                <a href="#/iot/turnkey/list">进入快速工程列表></a>\n                <h4>目前支持以下场景：</h4>\n                <ul class="scene-list">\n                    <li>\n                        <img src="${images.chooseUrl1}" />\n                        <h4>通用数据采集及监控</h4>\n                        <p>数据收集及监控是物联网最常见的应用场景，设备上装有各种传感器，通过传感器采集到的数据被实时集中存储起来，管理人员可以通过远程对这些数据进行查询、分析、监控，从而迅速掌握设备在过去一段时间及当前的最新状态，大大提高工作效率，及时发现处理各种故障及异常。</p>\n                        <a class="goin" href="#/iot/turnkey/confirm">进入></a>\n                    </li>\n                    <li class="disable">\n                        <img src="${images.chooseUrl2}" />\n                        <h4>工业设备数据采集及监控</h4>\n                        <p>针对工业设备中采用的Modbus协议，设备将采集到的信息通过MQTT/HTTPS/Websocket协议发送到物接入（IoT Hub）,然后通过规则引擎（Rule Engine）将其转换成特定格式，并写入TSDB，最终在TSDB进行数据的图标展现和分析。</p>\n                        <span class="goin">敬请期待</span>\n                    </li>\n                    <li class="disable">\n                        <img src="${images.chooseUrl3}" />\n                        <h4>通用数据采集及反控</h4>\n                        <p>将设备状态通过MQTT/HTTPS/Websocket协议发送到物接入（Iot Hub）,然后通过物管理对其状态进行监控，并从云端发起指令控制设备。</p>\n                        <span class="goin">敬请期待</span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>\n\n\x3c!-- target: TPL_iot_turnkey_choose_child --\x3e\n\x3c!-- import: TPL_iot_turnkey_choose --\x3e\n\n\n\x3c!-- target: TPL_iot_turnkey_choose_step --\x3e\n<div class="iot-turnkey-step">\n    <ul>\n        <li><span>1</span>选择场景</li>\n        <li><span>2</span>确认场景</li>\n        <li><span>3</span>创建工程</li>\n        <li><span>4</span>测试</li>\n    </ul>\n</div>'
}),
define("iot/turnkey/ChooseModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getConfirmTurnkey = function(e) {
            return r.api.confirmTurnkey(e)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    images: function(e) {
                        return {
                            chooseUrl1: require.toUrl("./img/turnkey-begin1.png"),
                            chooseUrl2: require.toUrl("./img/turnkey-begin2.png"),
                            chooseUrl3: require.toUrl("./img/turnkey-begin3.png")
                        }
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/turnkey/ChooseView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./choose.tpl", "inf-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_turnkey_choose"
            }
        }]),
        n
    } (r["default"](n)["default"]);
    module.exports = o
}),
define("iot/turnkey/config", ["exports", "module", "er/controller", "babel-runtime/helpers/interop-require-default"],
function(exports, module, e, t) {
    t["default"](e)["default"].registerAction([{
        type: "iot/turnkey/Choose",
        path: "/iot/turnkey/choose"
    },
    {
        type: "iot/turnkey/Confirm",
        path: "/iot/turnkey/confirm"
    },
    {
        type: "iot/turnkey/ControlRoute",
        path: "/iot/turnkey/detail"
    },
    {
        type: "iot/turnkey/ControlRoute",
        path: "/iot/turnkey/success"
    },
    {
        type: "iot/turnkey/Quicklist",
        path: "/iot/turnkey/list"
    },
    {
        type: "iot/turnkey/Listdetail",
        path: "/iot/turnkey/listdetail"
    }]),
    module.exports = {
        CHOOSE_DATA_KEY: "__CHOOSE_DATA_KEY__",
        CONFIRM_DATA_KEY: "__CONFIRM_DATA_KEY__",
        nameRegExp: /^[0-9a-zA-Z_]{3,40}$/,
        prefixRegExp: /^[0-9a-zA-Z_]{1,40}$/,
        detailNameRegExp: /^(?!-)(?!.*?-$)(?!.*?-{2,}.*?)(?!(?:test|bce|iot|bridge|default)$)[a-zA-Z0-9-_]{3,32}$/,
        noDataHtml: ["<div><p>你还没创建任何工程</br>", '返回<a href="#/iot/turnkey/choose" style="margin-right:0">快速通道</a>立即创建', "</p></div>"].join(""),
        tpl: {
            command: '<a data-command="<%- command %>" data-command-args="<%- args %>" class="cmd-button <%- className %>" <%- disabled %>><%- label %></a>'
        }
    }
}),
define("iot/turnkey/Confirm", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormAction", "babel-runtime/helpers/interop-require-default", "esui/lib", "underscore", "esui/validator/ValidityState", "../_public/storage", "./config", "../_public/util", "./ConfirmModel", "./ConfirmView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u, c, p) {
    var f = n["default"](a),
    m = n["default"](r),
    h = n["default"](o),
    b = n["default"](s),
    v = n["default"](l),
    g = n["default"](u),
    y = n["default"](c),
    w = n["default"](p),
    x = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this);
            var e = m["default"].g("addMetrics"),
            t = m["default"].g("addTags");
            this.delegateEvent("add-new", "click", this.addNewItem, e, "metrics"),
            this.delegateEvent("cancel-new", "click", this.cancelNewItem, e, "metrics"),
            this.delegateEvent("add-new", "click", this.addNewItem, t, "tags"),
            this.delegateEvent("cancel-new", "click", this.cancelNewItem, t, "tags"),
            this.view.on("prevStep", this.prevStep, this),
            this.view.on("check", this.checkName, this),
            this.model.on("numError", this.numError, this),
            this.preView()
        },
        n.prototype.checkName = function(e) {
            var t = this,
            i = this.view.get("name").getValue();
            i && this.model.checkNameTurnkey({
                name: i
            }).then(function(e) {
                if (e.used) {
                    t.model.set("validate", !1),
                    t.view.get("namecheck").show();
                    var i = t.view.get("name"),
                    a = i.getValidationResult();
                    a.addState("invalid", new b["default"](!1, t.validMessage)),
                    i.showValidity(a)
                } else t.model.set("validate", !0),
                t.view.get("namecheck").hide()
            })
        },
        n.prototype.preView = function() {
            var e = v["default"].get(d.CHOOSE_DATA_KEY);
            if (this.model.get("back") && e) {
                var t = e.request,
                i = this.view;
                i.get("name").setValue(t.name),
                i.get("projectType").setValue(t.things.name),
                t.things.shareSecrete || (i.get("projectKey").setValue("0"), i.get("projectNum").setValue(t.things.num)),
                this.addListView("metrics", t.metrics),
                this.addListView("tags", t.tags)
            }
        },
        n.prototype.addListView = function(e, t) {
            var i = this,
            a = this.model.get(e + "list");
            h["default"].each(t,
            function(t) { - 1 === g["default"].indexOf(a, t) && (a.push({
                    text: t,
                    value: t
                }), i.view.get(e).setProperties({
                    datasource: []
                }), i.view.get(e).setProperties({
                    datasource: a
                }))
            }),
            this.view.get(e).setValue(t.join(","))
        },
        n.prototype.addNewItem = function(e, t) {
            var i = e[0].toUpperCase() + e.slice(1),
            a = this.view.get("newItem-add" + i).getValue();
            if (d.nameRegExp.test(a)) {
                var n = this.model.get(e + "list");
                n.push({
                    text: a,
                    value: a
                }),
                this.view.get(e).setProperties({
                    datasource: []
                }),
                this.view.get(e).setProperties({
                    datasource: n
                }),
                m["default"].removeNode(t.target.parentNode.parentNode),
                this.view.showAdd("add" + i)
            }
        },
        n.prototype.cancelNewItem = function(e, t) {
            var i = e[0].toUpperCase() + e.slice(1);
            m["default"].removeNode(t.target.parentNode.parentNode),
            this.view.showAdd("add" + i)
        },
        n.prototype.prevStep = function(e) {
            e.preventDefault(),
            this.redirect("/iot/turnkey/choose")
        },
        n.prototype.numError = function() {
            this.view.get("projectNum").showValidationMessage(!1, "输入1-10的数字")
        },
        n.prototype.handleSubmitResult = function(e) {
            v["default"].set(d.CHOOSE_DATA_KEY, e),
            this.redirect("/iot/turnkey/detail", {
                force: !0
            })
        },
        n.prototype.delegateEvent = function(e, t, i, a, n, r) {
            var o = this;
            m["default"].on(a || document.body, t,
            function(a) {
                var s = m["default"].event.getTarget(a),
                l = s.getAttribute("action-type");
                l && l === e && i.call(r || o, n, {
                    target: s,
                    container: o,
                    eventType: t,
                    originEvent: a
                })
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return w["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return y["default"]
            }
        }]),
        n
    } (f["default"]);
    module.exports = x
}),
define("iot/turnkey/confirm.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_turnkey_confirm --\x3e\n<div class="iot-main-wrap iot-turnkey-confirm main-wrap-new">\n    <div class="content-wrap">\n        <p class="breadcrumb"><a href="#/iot/turnkey/choose">天工-快速通道</a></p>\n        <div class="list-content detail-content">\n            <div class="content-header">\n                <h2>天工物联网快速应用通道</h2>\n                <div data-ui-type="ViewStep"\n                        data-ui-id="createStep"\n                        data-ui-current-step="2">\n                    <ul>\n                        <li>选择场景</li>\n                        <li>确认场景</li>\n                        <li>创建工程</li>\n                        \x3c!-- <li>测试</li> --\x3e\n                    </ul>\n                </div>\n            </div>\n            <div class="content-main">\n                <form class="form-body" data-ui-type="Form" data-ui-id="form" data-ui-auto-validate="true">\n                    <div class="form-row">\n                        <label class="required-label" class="required-label">工程名称: </label>\n                        <input data-ui-type="TextBox"\n                               data-ui-required="true"\n                               data-ui-id="name"\n                               data-ui-name="name"\n                               data-ui-placeholder="请输入工程名称"\n                               data-ui-required-error-message="请填写工程名称"\n                               data-ui-validity-label="validityNameLabel"\n                               data-ui-width="220" class="ui-textbox" />\n                        <span data-ui-type="Tip"\n                               data-ui-content="${tips.name}">\n                        </span>\n                        <span data-ui-type="Label" data-ui-id="namecheck" data-ui-hidden="hidden" class="check-name">该名字已被使用</span>\n                        <label data-ui-type="Validity" data-ui-id="validityNameLabel"></label>\n                    </div>\n                    <div class="form-row num-row">\n                        <label class="required-label" width="100">秘钥设置: </label>\n                        <div data-ui-type="BoxGroup"\n                               data-ui-box-type="radio"\n                               data-ui-datasource="@radiolist"\n                               data-ui-validity-label="validityNumLabel"\n                               data-ui-name="projectKey"\n                               data-ui-id="projectKey" class="BoxGroup"></div>\n                        <input data-ui-type="TextBox"\n                               data-ui-id="projectNum"\n                               data-ui-validity-label="validityNumLabel"\n                               data-ui-name="projectNum"\n                               data-ui-placeholder="1-10"\n                               data-ui-width="50"/>\n                        <label data-ui-type="Validity" data-ui-id="validityNumLabel" width="110"></label>\n                    </div>\n                    <div class="form-row">\n                        <label class="required-label" width="100">设备类型: </label>\n                        <input data-ui-type="TextBox"\n                               data-ui-required="true"\n                               data-ui-id="projectType"\n                               data-ui-name="projectType"\n                               data-ui-placeholder="请输入设备类型"\n                               data-ui-required-error-message="请填写设备类型"\n                               data-ui-validity-label="validityTypeLabel"\n                               data-ui-width="220" />\n                        <span data-ui-type="Tip"\n                                data-ui-content="${tips.name}">\n                        </span>\n                        <label data-ui-type="Validity" data-ui-id="validityTypeLabel"></label>\n                    </div>\n                    <div class="form-row">\n                        <label class="required-label" width="100">采集度量: </label>\n                        <div class="box">\n                          <div data-ui-type="BoxGroup"\n                               data-ui-box-type="checkbox"\n                               data-ui-id="metrics"></div>\n                          <div data-ui-type="Button" data-ui-id="addMetrics">+添加其他</div>\n                          <div id="addMetrics"></div>\n                        </div>\n                    </div>\n                    <div class="form-row">\n                        <label class="required-label" width="100">数据标签: </label>\n                        <div class="box">\n                          <div data-ui-type="BoxGroup"\n                               data-ui-box-type="checkbox"\n                               data-ui-id="tags"></div>\n                          <div data-ui-type="Button" data-ui-id="addTags">+添加其他</div>\n                          <div id="addTags"></div>\n                        </div>\n                    </div>\n                    <div class="form-row form-row-button">\n                        <button data-ui-type="Button"\n                                class="ui-ctrl ui-button"\n                                data-ui-id="prevStep" type="button">上一步</button>\n                        <button class="skin-primary-button ui-ctrl ui-button"\n                                data-ui-id="nextStep" type="submit">下一步</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n\x3c!-- target: TPL_iot_turnkey_confirm_child --\x3e\n\x3c!-- import: TPL_iot_turnkey_confirm --\x3e\n\n\n\x3c!-- target: TPL_iot_turnkey_confirm_add --\x3e\n<div class="confirm-iot">\n  <input data-ui-type="TextBox"\n         data-ui-id="newItem-${key}"\n         data-ui-name="newItem"\n         data-ui-placeholder="请输入添加项"\n         data-ui-pattern="^[0-9a-zA-Z_]{3,40}$"\n         data-ui-width="120" class="ui-textbox" />\n  <div class="button">\n    <span data-ui-type="Button" class="skin-primary-button ui-ctrl ui-button" action-type="add-new">确定</span>\n    <span data-ui-type="Button" class="ui-ctrl ui-button" action-type="cancel-new">取消</span>\n  </div>\n  <span data-ui-type="Tip"\n         data-ui-content="3-40个字符，允许输入数字、字母、“_”"></span>\n</div>'
}),
define("iot/turnkey/ConfirmModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/FormModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = {
        "X-silence": !0
    },
    s = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.validateSubmitData = function(e) {
            var t = this.get("validate");
            e.name && e.things.name || (t = !1);
            if ( !! !parseInt(e.projectKey[0], 10)) {
                var i = parseInt(e.projectNum, 10); (!i || i > 10 || i < 1) && (this.fire("numError"), t = !1)
            }
            return t
        },
        n.prototype.checkNameTurnkey = function(e) {
            return r.api.checkNameTurnkey(e, o)
        },
        t["default"](n, [{
            key: "submitRequester",
            get: function() {
                return r.api.confirmTurnkey
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    radiolist: function() {
                        return [{
                            text: "所有设备共享通讯密码",
                            value: 1
                        },
                        {
                            text: "每个独立设备密钥，请输入设备数量",
                            value: 0
                        }]
                    },
                    tagslist: function() {
                        return [{
                            text: "ID",
                            value: "ID"
                        },
                        {
                            text: "Address",
                            value: "Address"
                        }]
                    },
                    metricslist: function() {
                        return [{
                            text: "Temperature",
                            value: "Temperature"
                        },
                        {
                            text: "Voltage",
                            value: "Voltage"
                        },
                        {
                            text: "Current",
                            value: "Current"
                        },
                        {
                            text: "Frequency",
                            value: "Frequency"
                        },
                        {
                            text: "Humidity",
                            value: "Humidity"
                        }]
                    },
                    tips: function() {
                        return {
                            name: "3-40个字符，允许输入数字、字母、“_”"
                        }
                    },
                    validate: function() {
                        return ! 0
                    }
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = s
}),
define("iot/turnkey/ConfirmView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./confirm.tpl", "inf-ria/mvc/FormView", "babel-runtime/helpers/interop-require-default", "esui", "esui/lib", "er/Deferred", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "prevStep:click": function(t) {
                    return e.fire("prevStep", t)
                },
                "nextStep:click": function(t) {
                    return e.fire("submit", t)
                },
                "addMetrics:click": function(t) {
                    return e.loadAddBox("addMetrics")
                },
                "addTags:click": function(t) {
                    return e.loadAddBox("addTags")
                },
                "name:blur": function(t) {
                    return e.fire("check", t)
                }
            }
        },
        n.prototype.getExtraFormData = function() {
            var e = !!parseInt(this.get("projectKey").getValue(), 10);
            return {
                projectType: "SCADA",
                things: {
                    name: this.get("projectType").getValue(),
                    num: e ? 1 : this.get("projectNum").getValue(),
                    shareSecrete: e
                }
            }
        },
        n.prototype.loadAddBox = function(e) {
            var t = this;
            this.hideAdd(e);
            var i = p["default"].g(e);
            this.loadTemplate("TPL_iot_turnkey_confirm_add", i, e).done(function(e) {
                c["default"].init(e.box, {
                    viewContext: t.viewContext
                })
            })
        },
        n.prototype.loadTemplate = function(e, t, i) {
            var a = new f["default"],
            n = this.templateRender(e, {
                key: i
            }),
            r = document.createElement("DIV");
            return r.className = "add-box",
            r.innerHTML = n,
            t.appendChild(r),
            a.resolve({
                box: r,
                container: t,
                html: n
            }),
            a.promise
        },
        n.prototype.showAdd = function(e) {
            this.get(e).show()
        },
        n.prototype.hideAdd = function(e) {
            this.get(e).hide()
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_turnkey_confirm"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    tags: {
                        required: "required",
                        requiredErrorMessage: "必选项",
                        datasource: "@tagslist",
                        name: "tags"
                    },
                    metrics: {
                        required: "required",
                        requiredErrorMessage: "必选项",
                        datasource: "@metricslist",
                        name: "metrics"
                    },
                    name: {
                        pattern: d.nameRegExp
                    },
                    projectType: {
                        pattern: d.nameRegExp
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/turnkey/ControlRoute", ["exports", "module", "er/locator", "babel-runtime/helpers/interop-require-default", "../_public/storage", "./Detail", "./SuccessInfo", "./Choose", "../config", "./config"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = t["default"](e),
    d = t["default"](i),
    u = t["default"](a),
    c = t["default"](n),
    p = t["default"](r),
    f = t["default"](o);
    module.exports = {
        createRuntimeAction: function() {
            var e = location.hash.slice(1); - 1 !== e.indexOf("~") && (e = e.substr(0, e.indexOf("~")));
            var t = d["default"].get(s.CHOOSE_DATA_KEY),
            i = d["default"].get(s.CONFIRM_DATA_KEY),
            a = null;
            switch (e) {
            case "/iot/turnkey/detail":
                a = t ? new u["default"] : new p["default"];
                break;
            case "/iot/turnkey/success":
                a = i ? new c["default"] : new p["default"];
                break;
            default:
                l["default"].redirect("#" + f["default"].index)
            }
            return a
        }
    }
}),
define("iot/turnkey/Detail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "underscore", "esui/validator/ValidityState", "../_public/storage", "./config", "./DetailModel", "./DetailView"],
function(exports, module, e, t, i, a, n, r, o, s, l, d, u) {
    var c = n["default"](a),
    p = n["default"](r),
    f = n["default"](o),
    m = n["default"](s),
    h = n["default"](d),
    b = n["default"](u),
    v = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("create", this.create, this),
            this.view.on("prevStep", this.prevStep, this),
            this.view.on("prefixsyn", this.prefixSyn, this),
            this.view.on("endpointsyn", this.endpointSyn, this),
            this.view.on("tsdbsyn", this.tsdbChooseSyn, this),
            this.view.on("tsdbinputsyn", this.tsdbInputSyn, this)
        },
        n.prototype.prevStep = function() {
            this.redirect("/iot/turnkey/confirm~back=1")
        },
        n.prototype.endpointSyn = function() {
            var e = this.view.get("thingSelect").getSelectedItem().value;
            this.view.get("thingInput").setValue(e)
        },
        n.prototype.prefixSyn = function() {
            var e = this.model.get("sessionData"),
            t = this.view.get("prefix").getValue(),
            i = e.confirmRuleEngine;
            p["default"].each(i,
            function(e) {
                return e.name = t + e.name.slice(e.name.indexOf("_"))
            }),
            this.view.get("ruleTable").setDatasource(i)
        },
        n.prototype.tsdbChooseSyn = function() {
            var e = this.view.get("tsdbSelect").getSelectedItem();
            this.view.get("tsdbNameInput").setValue(e.value),
            this.view.get("tsdbQuotaInput").setValue(e.quota),
            this.tsdbInputSyn()
        },
        n.prototype.tsdbInputSyn = function() {
            var e = this.view.get("tsdbNameInput").getValue(),
            t = this.model.get("sessionData").confirmRuleEngine;
            p["default"].each(t,
            function(t) {
                return t.dest[0].value = e
            }),
            this.view.get("ruleTable").setDatasource(t)
        },
        n.prototype.alert = function(e, t) {
            this.view.waitAlert({
                title: "提示",
                content: e,
                width: t
            })
        },
        n.prototype.create = function() {
            var e = this,
            t = this.model.get("sessionData"),
            i = this.view.get("confirm").isChecked(),
            a = this.view.get("thingInput").getValue(),
            n = this.view.get("prefix").getValue();
            if (!a) {
                return (o = (r = this.view.get("thingInput")).getValidationResult()).addState("invalid", new f["default"](!1, this.validMessage)),
                r.showValidity(o),
                void this.alert("请输入实例名称", 320)
            }
            if (!n) {
                var r = this.view.get("prefix"),
                o = r.getValidationResult();
                return o.addState("invalid", new f["default"](!1, this.validMessage)),
                r.showValidity(o),
                void this.alert("请输入规则名称", 320)
            }
            if (l.detailNameRegExp.test(a) && l.prefixRegExp.test(n)) if (i) {
                var s = this.view.get("tsdbSelect").getSelectedItem(),
                d = {
                    name: t.request.name,
                    projectType: "SCADA",
                    detail: [{
                        iothub: [{
                            endpoint: a,
                            quota: t.confirmIotHub.quota,
                            things: [{
                                name: t.request.things.name,
                                num: t.request.things.num,
                                shareSecrete: t.request.things.shareSecrete
                            }]
                        }],
                        ruleEngine: [{
                            prefix: n,
                            metrics: t.request.metrics,
                            tags: t.request.tags
                        }],
                        tsdb: [{
                            id: s.id,
                            name: s.name,
                            quota: s.quota
                        }]
                    }]
                };
                this.model.getCreateTurnkey(d).then(function(t) {
                    e.view.addLoading();
                    var i = setInterval(function() {
                        e.model.getDetailTurnkey(t).then(function(t) {
                            "RUNNING" === t.status ? (clearInterval(i), e.view.deleteLoading(), m["default"].set(l.CONFIRM_DATA_KEY, t), e.redirect("/iot/turnkey/success")) : "FAILED" === t.status && (clearInterval(i), e.view.deleteLoading(), e.alert("创建失败：" + t.errorMessage, 420))
                        }).fail(function(t) {
                            clearInterval(i),
                            e.view.deleteLoading(),
                            e.alert("创建失败！", 320)
                        })
                    },
                    1e3)
                })
            } else this.alert("请确认了解并接受上述配置可能产生的费用", 420);
            else this.alert("名称只允许字母，数字和 “_”", 320)
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return b["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return h["default"]
            }
        }]),
        n
    } (c["default"]);
    module.exports = v
}),
define("iot/turnkey/detail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_turnkey_detail --\x3e\n<div class="iot-main-wrap iot-turnkey-detail">\n    <div class="content-wrap">\n        <p class="breadcrumb"><a href="#/iot/turnkey/choose">天工-快速通道</a>  / 通用数据采集及监控</p>\n        <div class="list-content detail-content">\n            <div class="content-header">\n                <h2>天工物联网快速应用通道</h2>\n                <div data-ui-type="ViewStep"\n                        data-ui-id="createStep"\n                        data-ui-current-step="3">\n                    <ul>\n                        <li>选择场景</li>\n                        <li>确认场景</li>\n                        <li>创建工程</li>\n                        \x3c!-- <li>测试</li> --\x3e\n                    </ul>\n                </div>\n            </div>\n            <div class="content-main">\n                <h4>推荐资源配置清单：根据您输入的场景信息，系统自动为您推荐以下产品及资源配置清单。</h4>\n                <p><span class="blue">流程说明: </span>设备将采集到的信息通过MQTT/HTPPS/Websocket协议发送到物接入（Iot Hub）,然后通过规则引擎（Rule Engineer）将其转换成特定格式，并写入TSDB,最终在TSDB进行数据的图标展现和分析</p>\n                <img src="${createImg}" class="create-img" />\n                <div class="detail-parts-table" style="margin: 0;padding: 0;">\n                    <dl class="detail-part-1-col">\n                        <dt>\n                            <h4>设备接入 — 物接入（IoT Hub）</h4>\n                        </dt>\n                        <dd>\n                            <div class="description">\n                                <div data-ui-type="BoxGroup" data-ui-id="thingRadios"\n                                    data-ui-name="thingRadios" data-ui-box-type="radio">\n                                    <ul>\n                                        <li>\n                                            <input type="radio" id="radioC" name="thingRadios" value="write" checked="checked" />\n                                            <label for="radioC">创建新的接入实例</label>\n                                        </li>\n                                        <li>\n                                            <input type="radio" id="radioD" name="thingRadios" value="choose" />\n                                            <label for="radioD">选取现有接入实例&nbsp;\n                                            </label>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <span data-ui-type="Select" data-ui-id="thingSelect" data-ui-name="thingSelect" ></span>\n                                <div data-ui-id="thingDetail" data-ui-type="Panel">\n                                    <span>实例名称：\n                                        <input data-ui-type="TextBox"\n                                               data-ui-name="thingInput"\n                                               data-ui-id="thingInput"\n                                               data-ui-placeholder="请写新实例名称"\n                                               data-ui-width="100" class="edit-input" />\n                                    </span>\n                                    <span>最大收发消息条数：${quota}百万条/月</span>\n                                    <span>参考费用：3.99元/100万条/月（每月前100万条消息免费)&nbsp;&nbsp;&nbsp;<a href="https://cloud.baidu.com/doc/IOT/Pricing.html" target="_blank">查看收费详情</a></span>\n                                </div>\n                            </div>\n                            <div data-ui-type="Table"\n                                 data-ui-id="iotTable">\n                            </div>\n                        </dd>\n                    </dl>\n                    <dl class="detail-part-1-col">\n                        <dt>\n                            <h4>数据处理—规则引擎（Rule Engine）</h4>\n                        </dt>\n                        <dd>\n                            <div class="description">\n                                <span>\n                                    <label>规则名称：</label>\n                                    <input data-ui-type="TextBox"\n                                           data-ui-name="prefix"\n                                           data-ui-id="prefix"\n                                           data-ui-value="${prefix}"\n                                           data-ui-width="120" class="edit-input" />\n                                </span>\n                                <span>参考费用：暂不收费</span>\n                            </div>\n                            <div data-ui-id="ruleTablePanel" data-ui-type="Panel">\n                                <div data-ui-type="Table"\n                                     data-ui-id="ruleTable">\n                                </div>\n                            </div>\n                        </dd>\n                    </dl>\n                    <dl class="detail-part-1-col">\n                        <dt>\n                            <h4>数据存储—数序数据库（TSDB）</h4>\n                        </dt>\n                        <dd>\n                            <div class="description">\n                                <div data-ui-type="BoxGroup" data-ui-id="tsdbRadios"\n                                    data-ui-name="tsdbRadios" data-ui-box-type="radio" data-ui-disabled="disabled">\n                                    <ul>\n                                        <li>\n                                            <input type="radio" id="radioA" name="tsdbRadios" value="write">\n                                            <label for="radioA">创建新的数据库</label>\n                                        </li>\n                                        <li>\n                                            <input type="radio" id="radioB" name="tsdbRadios" value="choose"  checked="checked">\n                                            <label for="radioB">写入现有数据库&nbsp;\n                                            </label>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <span data-ui-type="Select" data-ui-id="tsdbSelect" data-ui-name="tsdbSelect" ></span>\n                                <div data-ui-id="tsdbDetail" data-ui-type="Panel">\n                                    <span>\n                                    <label>数据库名称：</label>\n                                    <input data-ui-type="TextBox"\n                                           data-ui-name="tsdbNameInput"\n                                           data-ui-id="tsdbNameInput"\n                                           data-ui-value="${tsdbName}"\n                                           data-ui-width="100" class="edit-input" />\n                                    </span>\n                                    <span><label>最大写入数据点数：</label>\n                                    <input data-ui-type="TextBox"\n                                           data-ui-name="tsdbQuotaInput"\n                                           data-ui-id="tsdbQuotaInput"\n                                           data-ui-value="${tsdbQuota}"\n                                           data-ui-width="40" class="edit-input tsdb-quota-input" disabled="true"/>百万条/每月</span>\n                                    <span>参考费用：39.99元/100万点/月&nbsp;&nbsp;&nbsp;<a href="https://cloud.baidu.com/doc/TSDB/Pricing.html" target="_blank">查看收费详情</a></span>\n                                </div>\n                            </div>\n                        </dd>\n                    </dl>\n                    <div>\n                        <input data-ui-name="confirm" data-ui-id="confirm" data-ui-type="CheckBox"/>\n                        <span style="top:2px;position: relative;">按配置清单创建工程及资源，了解并接受上述配置可能产生的费用</span>\n                        <div class="form-row-button">\n                            <button data-ui-type="Button"\n                                    class="ui-ctrl ui-button"\n                                    data-ui-id="prevStep">上一步</button>\n                            <button data-ui-type="Button"\n                                    class="skin-primary-button ui-ctrl ui-button"\n                                    data-ui-id="nextStep" type="submit">创建</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'
}),
define("iot/turnkey/DetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "underscore", "../config", "../_public/storage", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](s),
    p = {
        "X-silence": !0
    },
    f = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getCreateTurnkey = function(e) {
            return o.api.createTurnkey(e, p)
        },
        n.prototype.getDetailTurnkey = function(e) {
            return o.api.detailTurnkey(e, p)
        },
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    createImg: function() {
                        return require.toUrl("./img/turnkey-create.png")
                    },
                    sessionData: function(e) {
                        var t = c["default"].get(l.CHOOSE_DATA_KEY),
                        i = t.confirmRuleEngine[0].prefix,
                        a = t.confirmIotHub,
                        n = a.endpoint,
                        r = a.quota,
                        o = t.confirmTsdb,
                        s = o[0],
                        d = s.name,
                        p = s.quota,
                        f = u["default"].map(o,
                        function(e, t) {
                            return {
                                id: e.id,
                                name: e.name,
                                value: e.name,
                                quota: e.quota
                            }
                        }),
                        m = u["default"].map(n,
                        function(e, t) {
                            return {
                                name: e,
                                value: e
                            }
                        });
                        return e.set("prefix", i),
                        e.set("quota", r),
                        e.set("tsdbName", d),
                        e.set("tsdbQuota", p),
                        e.set("tsdbList", f),
                        e.set("endpoints", m),
                        t
                    }
                }
            }
        }]),
        n
    } (d["default"]);
    module.exports = f
}),
define("iot/turnkey/DetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./detail.tpl", "inf-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "bat-ria/ui/loading", "inf-i18n", "underscore", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.showError = function(e) {
            e.target.validityValid || this.showToast("请输入3-40个字符，允许输入数字、字母、“_”", {
                messageType: "error"
            })
        },
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "prevStep:click": function(t) {
                    return e.fire("prevStep")
                },
                "nextStep:click": function(t) {
                    return e.fire("create")
                },
                "tsdbSelect:change": function(t) {
                    return e.fire("tsdbsyn")
                },
                "prefix:change": function(t) {
                    return e.fire("prefixsyn")
                },
                "thingSelect:change": function(t) {
                    return e.fire("endpointsyn")
                },
                "tsdbNameInput:input": function(t) {
                    return e.fire("tsdbinputsyn")
                },
                "tsdbRadios:change": function(t) {
                    if ("choose" === t.target.rawValue[0]) {
                        e.get("tsdbSelect").show();
                        var i = e.get("tsdbSelect").getSelectedItem().value;
                        e.get("tsdbNameInput").setValue(i),
                        e.get("tsdbNameInput").setReadOnly(!0),
                        e.fire("tsdbsyn")
                    } else e.get("tsdbSelect").hide(),
                    e.get("tsdbNameInput").setReadOnly(!1)
                },
                "thingRadios:change": function(t) {
                    if ("choose" === t.target.rawValue[0]) {
                        e.get("thingSelect").show();
                        var i = e.get("thingSelect").getSelectedItem().value;
                        e.get("thingInput").setValue(i),
                        e.get("thingInput").setReadOnly(!0)
                    } else e.get("thingSelect").hide(),
                    e.get("thingInput").setReadOnly(!1),
                    e.get("thingInput").setValue("")
                }
            }
        },
        n.prototype.addLoading = function() {
            c["default"].show(p["default"]("正在初始化，请稍候..."))
        },
        n.prototype.deleteLoading = function() {
            c["default"].hide()
        },
        n.prototype.enterDocument = function() {
            a.prototype.enterDocument.call(this),
            this.get("tsdbSelect").show(),
            this.get("thingSelect").hide(),
            this.get("tsdbNameInput").setReadOnly(!0)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_turnkey_detail"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    iotTable: {
                        datasource: "@sessionData.confirmIotHub.things",
                        fields: [{
                            title: "设备类型/名称",
                            field: "thingName",
                            content: function(e) {
                                return f["default"].escape(e.name)
                            }
                        },
                        {
                            title: "身份",
                            field: "principal",
                            content: function(e) {
                                return f["default"].escape(e.principal)
                            }
                        },
                        {
                            title: "策略",
                            field: "policy",
                            content: function(e) {
                                return f["default"].escape(e.policy)
                            }
                        },
                        {
                            title: "主题",
                            field: "topic",
                            content: function(e) {
                                return f["default"].escape(e.topic)
                            }
                        }]
                    },
                    ruleTable: {
                        datasource: "@sessionData.confirmRuleEngine",
                        fields: [{
                            title: "规则名称",
                            field: "rulename",
                            content: function(e) {
                                return f["default"].escape(e.name)
                            }
                        },
                        {
                            title: "采集度量",
                            field: "metrics",
                            content: function(e) {
                                return f["default"].escape(e.metric)
                            }
                        },
                        {
                            title: "数据源",
                            field: "source",
                            content: function(e) {
                                return f["default"].escape(e.src.topic)
                            }
                        },
                        {
                            title: "数据目的地",
                            field: "dest",
                            content: function(e) {
                                return f["default"].escape(e.dest[0].value)
                            }
                        }]
                    },
                    tsdbSelect: {
                        datasource: "@tsdbList",
                        width: 120
                    },
                    thingSelect: {
                        datasource: "@endpoints",
                        width: 120
                    },
                    thingInput: {
                        pattern: d.detailNameRegExp
                    },
                    prefix: {
                        pattern: d.prefixRegExp
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/turnkey/Listdetail", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "../operations", "../events", "./ListdetailModel", "./ListdetailView"],
function(exports, module, e, t, i, a, n, r, o, s, l) {
    var d = n["default"](a),
    u = n["default"](r),
    c = n["default"](o),
    p = n["default"](s),
    f = n["default"](l),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on(c["default"].GEN_PASSWORD, this.getPasswordV2, this)
        },
        n.prototype.getPasswordV2 = function(e) {
            var t = this,
            i = e.args,
            a = this.model.get("thingName"),
            n = this.model;
            this.view.waitConfirm({
                title: "提示",
                content: "重置密钥后，网关连接MQTT的密钥将更改，可能需要重新烧录程序，请谨慎操作。是否重置密钥？",
                width: 600,
                needFoot: !0
            }).done(function() {
                return n.iotPrincipalGetPassword({
                    endpointName: a,
                    principalName: i
                })
            }).done(function(e) {
                return u["default"].viewPrincipalResult.call(t, {
                    parentAction: t,
                    password: e.password,
                    principalName: i
                })
            })
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return f["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return p["default"]
            }
        }]),
        n
    } (d["default"]);
    module.exports = m
}),
define("iot/turnkey/listdetail.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_turnkey_listdetail --\x3e\n<div class="iot-main-wrap iot-turnkey-listdetail">\n    <div class="content-wrap">\n        <p class="breadcrumb"><a href="#/iot/turnkey/choose">天工-快速通道</a> / <a href="#/iot/turnkey/list">快速工程列表</a> / 工程详情</p>\n        <div class="list-content detail-content">\n            <div class="content-header">\n                <h2>工程详情</h2>\n            </div>\n\n            <div class="content-main">\n                 <div class="detail-parts-table" style="margin: 0;padding: 0;">\n                    <dl class="detail-part-1-col">\n                        <dt>\n                            <h4>基本信息</h4>\n                        </dt>\n                        <dd>\n                            <div class="description">\n                                <span>工程名称：${basicInfo.name}</span>\n                                <span>状态：<em class="status ${statusEnum.kclass}">${statusEnum.text}</em></span>\n                                <span>创建时间：${createTime}</span>\n                            </div>\n                        </dd>\n                    </dl>\n                     <dl class="detail-part-1-col">\n                         <dt>\n                             <h4>设备接入 — 物接入（IoT Hub）</h4>\n                         </dt>\n                         <dd>\n                             <div class="description">\n                                 <span>实例名称：${thingName}&nbsp;&nbsp;&nbsp;&nbsp;<a href="#/iot/thing/list~endpointName=${thingName}" target="_blank">查看详情</a></span>\n                                 <span>最大收发消息条数：${quota}百万条/月</span>\n                             </div>\n                             <div data-ui-type="Button" class="ui-ctrl ui-button" data-ui-width=120 style="display: none;">批量重置并下载密钥</div>\n                             <a data-ui-type="Clipboard" display="none"></a>\n                             <div data-ui-type="Table"\n                                  data-ui-id="iotTable"\n                                  data-ui-extension-command-type="Command"\n                                  data-ui-extension-tableex-type="TableEx">\n                             </div>\n                         </dd>\n                     </dl>\n                     <dl class="detail-part-1-col">\n                         <dt>\n                             <h4>数据处理—规则引擎（Rule Engine）</h4>\n                         </dt>\n                         <dd>\n                             <div data-ui-id="ruleTablePanel" data-ui-type="Panel">\n                                 <div data-ui-type="Table"\n                                      data-ui-id="ruleTable">\n                                 </div>\n                             </div>\n                         </dd>\n                     </dl>\n                     <dl class="detail-part-1-col">\n                         <dt>\n                             <h4>数据存储—数序数据库（TSDB）</h4>\n                         </dt>\n                         <dd>\n                             <div class="description">\n                                 <div data-ui-id="tsdbdetail" data-ui-type="Panel">\n                                     <span>数据库名称：${tsdbName}&nbsp;&nbsp;&nbsp;&nbsp;<a href="/tsdb/${urlUtil}/tsdb/detail/info~databaseId=${tsdbId}&databaseName=${tsdbName}" target="_blank">查看详情</a></span>\n                                     <span>最大写入数据点数：${tsdbQuota}百万点/月</span>\n                                 </div>\n                             </div>\n                         </dd>\n                     </dl>\n                     <div style="display: none;">\n                         <div class="form-row-button">\n                            <button data-ui-type="Button"\n                                    class="skin-primary-button ui-ctrl ui-button"\n                                    data-ui-id="complete">测试</button>\n                            <button data-ui-type="Button"\n                                    class="ui-ctrl ui-button"\n                                    data-ui-id="complete">下载示范代码</button>\n                         </div>\n                     </div>\n                 </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n'
}),
define("iot/turnkey/ListdetailModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "../config", "../enum"],
function(exports, module, e, t, i, a, n, r, o, s) {
    var l = n["default"](a),
    d = n["default"](r),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "iotProjectDetail",
            get: function() {
                return o.api.detailTurnkey
            }
        },
        {
            key: "iotPrincipalGetPassword",
            get: function() {
                return o.api.iotPrincipalGetPassword
            }
        },
        {
            key: "datasource",
            get: function() {
                return {
                    basicInfo: function(e) {
                        return e.iotProjectDetail({
                            uuid: e.get("uuid")
                        }).then(function(t) {
                            var i = s.INS_STATUS.fromValue(t.status);
                            e.set("statusEnum", i);
                            var a = t.detail,
                            n = a.iothub[0],
                            r = n.endpoint,
                            o = n.quota,
                            l = a.ruleEngine[0].name,
                            u = a.tsdb[0],
                            c = u.id,
                            p = u.name,
                            f = u.quota;
                            return e.set("thingName", r),
                            e.set("prefix", l),
                            e.set("quota", o),
                            e.set("tsdbId", c),
                            e.set("tsdbName", p),
                            e.set("tsdbQuota", f),
                            e.set("tsdbQuota", f),
                            e.set("createTime", d["default"].toTime(t.createTime)),
                            t
                        })
                    },
                    urlUtil: function() {
                        return new RegExp(/\?.*?#/).exec(location.href)[0] || "#"
                    }
                }
            }
        }]),
        n
    } (l["default"]);
    module.exports = u
}),
define("iot/turnkey/ListdetailView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./listdetail.tpl", "inf-ria/mvc/ListView", "babel-runtime/helpers/interop-require-default", "underscore", "common/util/tableUtil", "../events", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](l),
    m = r["default"](d),
    h = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return p["default"].getListEvents({
                "copyPassword:aftercopy": function(t) {
                    return e.showToast("复制成功")
                },
                "iotTable:command": function(t) {
                    return e.fire(t.name, t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields",
            function(e) {
                return [{
                    title: "设备类型/名称",
                    field: "thingName",
                    content: function(e) {
                        return c["default"].escape(e.name)
                    }
                },
                {
                    title: "身份",
                    field: "principal",
                    content: function(e) {
                        return c["default"].escape(e.principal)
                    }
                },
                {
                    title: "策略",
                    field: "policy",
                    content: function(e) {
                        return c["default"].escape(e.policy)
                    }
                },
                {
                    title: "主题",
                    field: "topic",
                    content: function(e) {
                        return c["default"].escape(e.topic)
                    }
                },
                {
                    title: "操作",
                    field: "operation",
                    content: function(t) {
                        return e.getAllOpertionsHtml(t)
                    }
                }]
            } (this)),
            a.prototype.enterDocument.call(this)
        },
        n.prototype.getAllOpertionsHtml = function(e) {
            var t = [];
            return Array.prototype.push.apply(t, [this.resetPasswordHtml(e)]),
            t.join("")
        },
        n.prototype.copyPasswordHtml = function(e) {
            return '<a data-ui-type="Clipboard"\n                   data-ui-id="copyPassword"\n                   data-ui-clipboard-text="' + e.password + '"\n                   class="copy-password">复制密钥</a>&nbsp;&nbsp;&nbsp;'
        },
        n.prototype.resetPasswordHtml = function(e) {
            var t = e.principal;
            return c["default"].template(m["default"].tpl.command)({
                label: "重置密钥",
                command: f["default"].GEN_PASSWORD,
                args: t,
                className: "",
                disabled: ""
            })
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_turnkey_listdetail"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    iotTable: {
                        datasource: "@basicInfo.detail.iothub.0.things",
                        columnRenderIndexes: [4],
                        fields: "@tableFields"
                    },
                    ruleTable: {
                        datasource: "@basicInfo.detail.ruleEngine",
                        urlUtil: "@urlUtil",
                        fields: [{
                            title: "规则名称",
                            field: "rulename",
                            content: function(e) {
                                return c["default"].escape(e.name)
                            }
                        },
                        {
                            title: "采集度量",
                            field: "metrics",
                            content: function(e) {
                                return c["default"].escape(e.metric)
                            }
                        },
                        {
                            title: "数据源",
                            field: "source",
                            content: function(e) {
                                return c["default"].escape(e.src.topic)
                            }
                        },
                        {
                            title: "数据目的地",
                            field: "dest",
                            content: function(e) {
                                return c["default"].escape(e.dest[0].value)
                            }
                        },
                        {
                            title: "操作",
                            field: "control",
                            content: function(e) {
                                return '<a href="/iotre/' + this.urlUtil + "/iotre/rule/detail~uuid=" + e.uuid + '" target="_blank">\n                                查看详情</a>'
                            }
                        }]
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = h
}),
define("iot/turnkey/Quicklist", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListAction", "babel-runtime/helpers/interop-require-default", "./QuicklistModel", "./QuicklistView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("download", this.downloadFile, this)
        },
        n.prototype.downloadFile = function(e) {
            var t = "/api/iot/turnkey/project/detail/export/" + e.args;
            window.open(t, "_self")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/turnkey/quicklist.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_turnkey_quicklist --\x3e\n<div class="iot-main-wrap iot-turnkey-quicklist main-wrap-new">\n<div class="content-wrap">\n    <p class="breadcrumb"><a href="#/iot/turnkey/choose">天工-快速通道</a> / 快速应用工程列表</p>\n    <div class="list-content">\n        <h2>快速应用工程列表</h2>\n        <div class="table-full-wrap">\n            <div data-ui-type="Table" data-ui-id="table"\n                 data-ui-datasource="@tableData"\n                 data-ui-order-by="@orderBy" data-ui-order="@order"\n                 data-ui-select="@selectMode" data-ui-extension-tip-type="TableTip"\n                 data-ui-extension-command-type="Command"\n                 data-ui-extension-tableedit-type="TableEdit"\n                 data-ui-extension-tableex-type="TableEx">\n            </div>\n            <div class="ui-row">\n                \x3c!-- import: listPager --\x3e\n            </div>\n        </div>\n    </div>\n</div>\n</div>\n\n\n'
}),
define("iot/turnkey/QuicklistModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/ListModel", "babel-runtime/helpers/interop-require-default", "../config"],
function(exports, module, e, t, i, a, n, r) {
    var o = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "listRequester",
            get: function() {
                return r.api.listTurnkey
            }
        },
        {
            key: "datasource",
            get: function() {}
        },
        {
            key: "defaultArgs",
            get: function() {
                return {
                    order: "desc",
                    orderBy: "createTime",
                    pageSize: r.pageSize
                }
            }
        }]),
        n
    } (n["default"](a)["default"]);
    module.exports = o
}),
define("iot/turnkey/QuicklistView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./quicklist.tpl", "inf-ria/mvc/ListView", "babel-runtime/helpers/interop-require-default", "common/util/timeUtil", "common/util/tableUtil", "../enum", "./config"],
function(exports, module, e, t, i, a, n, r, o, s, l, d) {
    var u = r["default"](n),
    c = r["default"](o),
    p = r["default"](s),
    f = r["default"](d),
    m = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return p["default"].getListEvents({
                "table:command": function(t) {
                    return e.fire(t.name, t)
                }
            })
        },
        n.prototype.enterDocument = function() {
            this.model.set("tableFields", [{
                title: "工程名称",
                field: "projectname",
                content: function(e) {
                    return e.name
                }
            },
            {
                title: "创建时间",
                field: "time",
                content: function(e) {
                    return c["default"].toTime(e.createTime)
                }
            },
            {
                title: "状态",
                field: "status",
                content: function(e) {
                    var t = l.INS_STATUS.fromValue(e.status);
                    return '<span class="status ' + t.kclass + '">' + t.text + "</span>"
                }
            },
            {
                title: "操作",
                field: "principal",
                content: function(e) {
                    return "<a data-command='download'\n                               data-command-args=" + e.uuid + '>下载配置文件</a>\n                            <a href="#" style="display:none">下载示例代码</a>\n                            <a href="#/iot/turnkey/listdetail~uuid=' + e.uuid + '">查看详情</a>'
                }
            }]),
            a.prototype.enterDocument.call(this)
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_turnkey_quicklist"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    table: {
                        select: !1,
                        columnResizable: !0,
                        fields: "@tableFields",
                        noDataHtml: f["default"].noDataHtml
                    }
                }
            }
        }]),
        n
    } (u["default"]);
    module.exports = m
}),
define("iot/turnkey/SuccessInfo", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseAction", "babel-runtime/helpers/interop-require-default", "./SuccessInfoModel", "./SuccessInfoView"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = n["default"](o),
    u = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.initBehavior = function() {
            a.prototype.initBehavior.call(this),
            this.view.on("COMPLETE", this.complete, this)
        },
        n.prototype.complete = function() {
            this.redirect("/iot/turnkey/list")
        },
        t["default"](n, [{
            key: "viewType",
            get: function() {
                return d["default"]
            }
        },
        {
            key: "modelType",
            get: function() {
                return l["default"]
            }
        }]),
        n
    } (s["default"]);
    module.exports = u
}),
define("iot/turnkey/successinfo.tpl", [],
function() {
    return '\x3c!-- target: TPL_iot_turnkey_successinfo --\x3e\n<div class="iot-main-wrap iot-turnkey-successinfo">\n    <div class="content-wrap">\n        <p class="breadcrumb"><a href="#/iot/turnkey/choose">天工-快速通道</a>  / 通用数据采集及监控</p>\n        <div class="list-content detail-content">\n            <div class="content-header">\n                <h2>天工物联网快速应用通道</h2>\n                <div data-ui-type="ViewStep"\n                        data-ui-id="createStep"\n                        data-ui-current-step="3">\n                    <ul>\n                        <li>选择场景</li>\n                        <li>确认场景</li>\n                        <li>创建工程</li>\n                        \x3c!-- <li>测试</li> --\x3e\n                    </ul>\n                </div>\n            </div>\n\n            <div class="content-main">\n                 <div class="tip-green">已为您成功创建并部署下列资源。</div>\n                 <div class="detail-parts-table" style="margin: 0;padding: 0;">\n                     <dl class="detail-part-1-col">\n                         <dt>\n                             <h4>设备接入 — 物接入（IoT Hub）</h4>\n                         </dt>\n                         <dd>\n                             <div class="description">\n                                 <span>实例名称：${thingName}&nbsp;&nbsp;&nbsp;&nbsp;<a href="#/iot/thing/list~endpointName=${thingName}" target="_blank">查看详情</a></span>\n                                 <span>最大收发消息条数：${quota}百万条/月</span>\n                             </div>\n                             <a data-ui-type="Clipboard" display="none"></a>\n                             <div data-ui-type="Table"\n                                  data-ui-id="iotTable"\n                                  data-ui-extension-tableex-type="TableEx">\n                             </div>\n                         </dd>\n                     </dl>\n                     <dl class="detail-part-1-col">\n                         <dt>\n                             <h4>数据处理—规则引擎（Rule Engine）</h4>\n                         </dt>\n                         <dd>\n                             <div data-ui-id="ruleTablePanel" data-ui-type="Panel">\n                                 <div data-ui-type="Table"\n                                      data-ui-id="ruleTable">\n                                 </div>\n                             </div>\n                         </dd>\n                     </dl>\n                     <dl class="detail-part-1-col">\n                         <dt>\n                             <h4>数据存储—数序数据库（TSDB）</h4>\n                         </dt>\n                         <dd>\n                             <div class="description">\n                                 <div data-ui-id="tsdbdetail" data-ui-type="Panel">\n                                     <span>数据库名称：${tsdbName}&nbsp;&nbsp;&nbsp;&nbsp;<a href="/tsdb/${urlUtil}/tsdb/detail/info~databaseId=${tsdbId}&databaseName=${tsdbName}" target="_blank">查看详情</a></span>\n                                     <span>最大写入数据点数：${tsdbQuota}百万点/月</span>\n                                 </div>\n                             </div>\n                         </dd>\n                     </dl>\n                     <div>\n                         <div class="form-row-button">\n                             <button data-ui-type="Button"\n                                     class="skin-primary-button ui-ctrl ui-button"\n                                     data-ui-id="complete">完成</button>\n                         </div>\n                     </div>\n                 </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n'
}),
define("iot/turnkey/SuccessInfoModel", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "inf-ria/mvc/BaseModel", "babel-runtime/helpers/interop-require-default", "../_public/storage", "./config"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = n["default"](a),
    l = n["default"](r),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        t["default"](n, [{
            key: "datasource",
            get: function() {
                return {
                    sessionData: function(e) {
                        var t = l["default"].get(o.CONFIRM_DATA_KEY),
                        i = t.detail,
                        a = i.iothub[0],
                        n = a.endpoint,
                        r = a.quota,
                        s = i.ruleEngine[0].name,
                        d = i.tsdb[0],
                        u = d.id,
                        c = d.name,
                        p = d.quota;
                        return e.set("thingName", n),
                        e.set("prefix", s),
                        e.set("quota", r),
                        e.set("tsdbId", u),
                        e.set("tsdbName", c),
                        e.set("tsdbQuota", p),
                        t
                    },
                    urlUtil: function() {
                        return new RegExp(/\?.*?#/).exec(location.href)[0] || "#"
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
}),
define("iot/turnkey/SuccessInfoView", ["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "bat-ria/tpl!./successinfo.tpl", "inf-ria/mvc/BaseView", "babel-runtime/helpers/interop-require-default", "underscore"],
function(exports, module, e, t, i, a, n, r, o) {
    var s = r["default"](n),
    l = r["default"](o),
    d = function(a) {
        function n() {
            i["default"](this, n),
            a.apply(this, arguments)
        }
        return e["default"](n, a),
        n.prototype.getUIEvents = function() {
            var e = this;
            return {
                "complete:click": function(t) {
                    return e.fire("COMPLETE", t)
                },
                "copyPassword:aftercopy": function(t) {
                    return e.showToast("复制成功")
                }
            }
        },
        t["default"](n, [{
            key: "template",
            get: function() {
                return "TPL_iot_turnkey_successinfo"
            }
        },
        {
            key: "uiProperties",
            get: function() {
                return {
                    iotTable: {
                        quota: "@quota",
                        datasource: "@sessionData.detail.iothub.0.things",
                        columnRenderIndexes: [4],
                        fields: [{
                            title: "设备类型/名称",
                            field: "thingName",
                            content: function(e) {
                                return l["default"].escape(e.name)
                            }
                        },
                        {
                            title: "身份",
                            field: "principal",
                            content: function(e) {
                                return l["default"].escape(e.principal)
                            }
                        },
                        {
                            title: "策略",
                            field: "policy",
                            content: function(e) {
                                return l["default"].escape(e.policy)
                            }
                        },
                        {
                            title: "主题",
                            field: "topic",
                            content: function(e) {
                                return l["default"].escape(e.topic)
                            }
                        },
                        {
                            title: "操作",
                            field: "control",
                            content: function(e) {
                                return '<a data-ui-type="Clipboard"\n                                       data-ui-id="copyPassword"\n                                       data-ui-clipboard-text="' + e.password + '"\n                                       class="copy-password">复制密钥</a>'
                            }
                        }]
                    },
                    ruleTable: {
                        datasource: "@sessionData.detail.ruleEngine",
                        urlUtil: "@urlUtil",
                        fields: [{
                            title: "规则名称",
                            field: "rulename",
                            content: function(e) {
                                return l["default"].escape(e.name)
                            }
                        },
                        {
                            title: "采集度量",
                            field: "metrics",
                            content: function(e) {
                                return l["default"].escape(e.metric)
                            }
                        },
                        {
                            title: "数据源",
                            field: "source",
                            content: function(e) {
                                return l["default"].escape(e.src.topic)
                            }
                        },
                        {
                            title: "数据目的地",
                            field: "dest",
                            content: function(e) {
                                return l["default"].escape(e.dest[0].value)
                            }
                        },
                        {
                            title: "操作",
                            field: "control",
                            content: function(e) {
                                return '<a href="/iotre/' + this.urlUtil + "/iotre/rule/detail~uuid=" + e.uuid + '" target="_blank">\n                                查看详情</a>'
                            }
                        }]
                    }
                }
            }
        }]),
        n
    } (s["default"]);
    module.exports = d
});
//# sourceMappingURL=startup.js.map

