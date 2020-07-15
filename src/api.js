class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData=(res) => {
    if (res.ok) {
        console.log("OK");
        return res.json();
    }else{
       return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards=() =>{
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    }).then (res => this._getResponseData(res));
  }

  // другие методы работы с API
  getUserInfoLoad=()=> {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    }).then (res => this._getResponseData(res));
  }


  getRenameUser=(name, job)=> {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    }).then (res => this._getResponseData(res));
  }
}

export {Api};



