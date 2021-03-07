export class UserInfo {
  //constructor for the "UserInfo" class
  constructor(config) {
    this._name = document.querySelector(config.profileNameSelector);
    this._job = document.querySelector(config.profileJobSelector);
  }

  //upper first letter
  _toUpperCase(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1);;
  }

  //get user info
  getUserInfo() {
    const profile = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return profile;
  }

  //set user info
  setUserInfo(userData) {
    this._name.textContent = this._toUpperCase(userData.name);
    this._job.textContent = this._toUpperCase(userData.job);
  }
}