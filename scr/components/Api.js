export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //get user info
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  //get all cards
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  //get all data
  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  //set user info
  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkServerResponse)
  }

  //set user avatar
  setUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkServerResponse)
  }

  //add card
  addCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkServerResponse)
  }

  //remove card
  removeCard(cardData) {
    return fetch(`${this._url}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  //like card
  likeCard(cardData) {
    return fetch(`${this._url}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkServerResponse)
  }

  //unlike card
  unlikeCard(cardData) {
    return fetch(`${this._url}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkServerResponse)
  }

  //check response from server
  _checkServerResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}