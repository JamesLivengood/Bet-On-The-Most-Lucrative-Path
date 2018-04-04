class Database {
  constructor() {
    this.database = firebase.database();
    this.ref = this.database.ref('scores');
    this.pushScore = this.pushScore.bind(this);
    this.returnScoresList = this.returnScoresList.bind(this);
    this.gotData = this.gotData.bind(this);
    this.errData = this.errData.bind(this);
  }

  pushScore(data) {
    this.ref.push(data);
  }

  returnScoresList() {
    // this.ref.get().then((doc)=> {
    //   console.log(doc);
    // });
    this.ref.on('value', this.gotData, this.errData);
  }

  gotData(data) {
    debugger
    // console.log(data.val());
    var scores = data.val();
    var keys = Object.keys(scores);
    debugger
    return keys;
  }

  errData(err) {
    console.log(err);
  }

}

export default Database;
