/*

    create by Davenchy

    simple lib to make http requests and auto handle them

    - constructor(url : String, method: String);

    - setHeader(key : String, value : String);      // set header

    - setParam(key : String, value : String);     // set param to inject to url

    - setStatus(statusCode : Integer, callback : Function);      // callback when response status code matches

    - json(obj : Object, callback : Function);      // send json request

    - send(body : String, callback : Function);      // send request


    Note:
        status callbacks returned with 1 arg (XMLHTTPRequest.responseText) and XMLHTTPRequest binded
        request callback returned with with XMLHTTPRequest binded

*/

class API {
    constructor(url, method, params) {
        this.url = url || '';
        this.method = method || 'GET';
        this.params = params || {};
        this.headers = {};
        this.status = {};
        this.xhr = null;

        // fix bugs
        if (!this.url.endsWith('/')) this.url += '/';
    }

    setParam(key, value) { this.params[key] = value; return this; }

    setHeader(key, value) { this.headers[key] = value; return this; }

    setStatus(code, cb) { this.status[code] = cb; return this; }

    json(obj = {}, cb = () => {}) {
        obj = JSON.stringify(obj);
        this.setHeader('Content-Type', 'application/json');
        this.send(obj, cb);
    }

    send(body = '', cb = () => {}) {
        var self = this;

        // create new xml http request
        this.xhr = new XMLHttpRequest();

        // setup params
        var params = "";
        Object.keys(this.params).forEach(param => {
            params += encodeURIComponent(param) + '=' + encodeURIComponent(self.params[param]) + '&';
        });
        if (params.length > 0) params.substring(0, params.length - 1);

        // open xhr request
        this.xhr.open(this.method, this.url + params);

        // setup headers
        Object.keys(this.headers).forEach(header => self.xhr.setRequestHeader(header, self.headers[header]) );

        // setup handlers
        this.xhr.onloadend = function () {
            var c = self.status[self.xhr.status];
            if (c != undefined) c.bind(self.xhr)(self.xhr.responseText, self.xhr);
            cb(self.xhr);
        }

        // send request
        this.xhr.send(body);
    }

}
