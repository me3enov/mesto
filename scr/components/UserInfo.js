export class UserInfo {
  //constructor for the "UserInfo" class
  constructor(config) {
    this._name = document.querySelector(config.profileNameSelector);
    this._about = document.querySelector(config.profileAboutSelector);
    this._avatar = document.querySelector(config.profileAvatarSelector)
  }

  //upper first letter
  _toUpperCase(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1);;
  }

  //get user info
  getUserInfo() {
    const profile = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return profile;
  }

  //set user avatar
  setUserAvatar(userData) {
    this._avatar.style.backgroundImage = `url(${userData.avatar})`;
  }

  //set user info
  setUserInfo(userData) {
    this._name.textContent = this._toUpperCase(userData.name);
    this._about.textContent = this._toUpperCase(userData.about);
    this.setUserAvatar(userData);
  }
}