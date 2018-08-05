var ToastParentDOM = document.querySelector('.toast-container');
class Toast {
    constructor(data = {}) {

        var parent = data.parent || ToastParentDOM || document.querySelector('.toast-container');
        var canClose = (data.canClose == undefined) ? true : data.canClose;

        var self = this;
        var toast = document.createElement('div');
        toast.classList.add('toast');
        toast.classList.add(data.type || 'default');
        toast.style.display = "none";

        var body = document.createElement('p');
        body.classList.add('body');
        body.innerHTML = data.body || "";

        var close = document.createElement('span');
        close.classList.add('close');
        close.innerHTML = "&times;";
        close.addEventListener('click', (e) => self.destroy() );
        close.style.display = canClose ? "block" : "none";


        this.closeDOM = toast.appendChild(close);
        this.bodyDOM = toast.appendChild(body);
        this.toastDOM = parent.appendChild(toast);

        this.parent = parent;
        this.canClose = canClose;
        this.timeout = data.timeout;

        this.animid = null;
        this.timeoutid = null;

        if (this.timeout && this.timeout != 0) this.startTimeout(this.timeout);
    }

    set body(v) { this.bodyDOM.innerHTML = v }
    set canClose(v) { this.closeDOM.style.display = v ? "block" : "none" }
    set type(v) { this.toastDOM.className = "toast " + v }

    get body() { return this.bodyDOM.innerText }
    get canClose() { return this.closeDOM.style.display === "block" }
    get isHidden() { return this.toastDOM.style.display !== "block" }
    get type() { return this.toastDOM.className.trim().substring(6, this.toastDOM.className.trim().length) }

    startTimeout(v) {
        if (this.timeoutid) clearTimeout(this.timeoutid);
        var self = this;
        this.timeoutid = setTimeout(() => { self.destroy(); self.timeoutid = null; }, v);
    }
    stopTimeout() { if (this.timeoutid); clearTimeout(this.timeoutid); this.timeoutid = null; }


    rebuild() { this.destroy(0, true); this.toastDOM = this.parent.appendChild(this.toastDOM); return this; }

    show(spd = 200, next=()=>{}) {

        if (!this.isHidden) return;

        var self = this;
        var toast = this.toastDOM;

        toast.style.opacity = 0;
        toast.style.display = 'block';

        if (this.animid) return;

        this.animid = setInterval(() => {
            if (parseFloat(toast.style.opacity) < 1) toast.style.opacity = parseFloat(toast.style.opacity) + 0.1;
            if (parseFloat(toast.style.opacity) >= 1) {
                toast.style.opacity = 1;
                clearInterval(self.animid);
                self.animid = null;
                next();
            }
        }, (spd || 1) / 10);
        return this;
    }

    hide(spd = 200, next = ()=>{}) {
        if (this.isHidden) return;

        var self = this;
        var toast = this.toastDOM;

        toast.style.opacity = 1;
        toast.style.display = 'block';

        if (this.animid) return;

        this.animid = setInterval(() => {
            if (parseFloat(toast.style.opacity) > 0) toast.style.opacity = parseFloat(toast.style.opacity) - 0.1;
            if (parseFloat(toast.style.opacity) <= 0) {
                toast.style.opacity = 0;
                toast.style.display = 'none';
                clearInterval(self.animid);
                self.animid = null;
                next();
            }
        }, (spd || 1) / 10);
        return this;
    }


    destroy(spd = 200, clean = false) {
        var self = this;
        if (!this.isHidden && !clean) this.hide(spd, () => self.toastDOM.remove() )
        else this.toastDOM.remove();
        return this;
    }

}
