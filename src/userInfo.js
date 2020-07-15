class UserInfo {
  constructor(name,job) {
    this.name = name ;
    this.job = job; 
    this.nameValue=name.textContent;
    this.jobValue=job.textContent;
  }

  setUserInfo(name, job) {
    this.nameValue = name;
    this.jobValue = job;
  }

  updateUserInfo() {
    this.name.textContent = this.nameValue;
    this.job.textContent = this.jobValue

  }
}