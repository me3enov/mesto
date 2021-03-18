export class Api {
  constructor(config) {
    this._headers = {
      authorization: config.authorization,
      'Content-Type': 'application/json'
    };
    this._url = config.url;
    this._cardsUrl = config.cardsUrl;
    this._cardsLikesUrl = config.cardsLikesUrl;
    this._userAvatarUrl = config.userAvatarUrl;
    this._userInfoUrl = config.userInfoUrl;
    this._errorText = config.errorText;
  }

  //get user info
  getUserInfo() {
    return fetch(`${this._url}${this._userInfoUrl}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  //get all cards
  getCards() {
    return fetch(`${this._url}${this._cardsUrl}`, {
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
    return fetch(`${this._url}${this._userInfoUrl}`, {
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
    return fetch(`${this._url}${this._userAvatarUrl}`, {
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
    return fetch(`${this._url}${this._cardsUrl}`, {
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
    return fetch(`${this._url}${this._cardsUrl}/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  //like card
  likeCard(cardData) {
    return fetch(`${this._url}${this._cardsLikesUrl}${cardData._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkServerResponse)
  }

  //unlike card
  unlikeCard(cardData) {
    return fetch(`${this._url}${this._cardsLikesUrl}${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkServerResponse)
  }

  //check response from server
  _checkServerResponse(res) {
    if (!res.ok) {
      return Promise.reject(`${this._errorText} ${res.status}`);
    }
    return res.json();
  }
}