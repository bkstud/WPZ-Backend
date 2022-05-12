'use strict';


const RestAPIClient = {
    _onConnectionError(){
        const s1 = "Nie można połączyć się z serverem!";
        alert(s1);
    },
    _onServerError(status, responseText){
        const s1 = "Błąd servera: "+ status;
        alert(s1);
        console.log(s1);
        console.log(responseText);
    },
    _xhrOnLoad(xhr, onsuccess, onclienterror){
        const statusCode = xhr.status;
        const statusCodeCategory = Math.trunc(statusCode/100);
        
        if(statusCodeCategory==2){
            let json_object = null;
            if(statusCode!=204){
                json_object = JSON.parse(xhr.responseText);
            }
            onsuccess(json_object, statusCode);
        }
        else if(statusCodeCategory==4 && onclienterror!=null){
            let json_object = null;
            if(statusCode!=404 && statusCode!=405){
                json_object = JSON.parse(xhr.responseText);
            }
            onclienterror(json_object, statusCode);
        }
        else if(statusCodeCategory==5){
            this._onServerError(statusCode, xhr.responseText);
        }
    },
    _utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent(str)));
    },
    _setCredentialsBasicAuth(xhr, auth){
        if(auth!=null){
            xhr.withCredentials=true;
            xhr.setRequestHeader("Authorization",
            "Basic "+this._utf8_to_b64(auth.username+":"+auth.password));
        }
    },
    _setJsonHeader(xhr){
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    },

    get(url, onsuccess, onclienterror=null, auth=null){
        
        let _this = this;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        
        this._setCredentialsBasicAuth(xhr, auth);
        this._setJsonHeader(xhr);

        xhr.onerror = this._onConnectionError;
        xhr.onload = function(){
            _this._xhrOnLoad(xhr, onsuccess, onclienterror);
        }
        xhr.send();
    },
    post(url, json_in, onsuccess, onclienterror, auth){
        let _this = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        this._setCredentialsBasicAuth(xhr, auth);
        this._setJsonHeader(xhr);

        xhr.onerror = this._onConnectionError;
        xhr.onload = function(){
            _this._xhrOnLoad(xhr, onsuccess, onclienterror);
        }

        if(json_in!=null){
            xhr.send(JSON.stringify(json_in));
        }
        else{
            xhr.send();
        }
    },
    delete(url, onsuccess, onclienterror, auth){
        
        let _this = this;
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", url);
        
        this._setCredentialsBasicAuth(xhr, auth);
        this._setJsonHeader(xhr);

        xhr.onerror = this._onConnectionError;
        xhr.onload = function(){
            _this._xhrOnLoad(xhr, onsuccess, onclienterror);
        }
        xhr.send();
    },
}