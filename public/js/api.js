class API {
    constructor(url, method) {
        this.headers = {};
        this.url = url || '';
        this.method = method || 'GET';
        this.xmlHttpRequest = new XMLHttpRequest();
    }

    setHeader(key, value) { this.headers[key] = value; console.log(this.headers); return this; }

    request(body = {}, json = true) {
        var self = this;
        this.xmlHttpRequest.open(this.method, this.url);

        var headers = Object.keys(this.headers);
        headers.forEach(header => self.xmlHttpRequest(header, self.headers[header]) );

        if (json) {
            self.xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
            body = JSON.stringify(body);
        }

        return new Promise((resolve, reject) => {

            self.xmlHttpRequest.onloadend = function () {
                if (self.xmlHttpRequest.status === 200) resolve(self.xmlHttpRequest.responseText, self.xmlHttpRequest);
                else reject(self.xmlHttpRequest.status, self.xmlHttpRequest);
            }

            this.xmlHttpRequest.send(body);

        });
    }
}
