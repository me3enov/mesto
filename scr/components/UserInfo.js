export class UserInfo {
  //constructor for the "UserInfo" class
  constructor(config) {
    this._name = document.querySelector(config.profileNameSelector);
    this._job = document.querySelector(config.profileJobSelector);
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
  setUserInfo(profile) {
    this._name.textContent = profile.name;
    this._job.textContent = profile.job;
  }
}