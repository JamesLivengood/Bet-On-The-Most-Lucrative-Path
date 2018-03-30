class Database {
  constructor() {
    this.database = firebase.database();
    this.ref = this.database.ref('scores');
    this.pushScore = this.pushScore.bind(this);
    this.returnScoresList = this.returnScoresList.bind(this);
  }

  pushScore(data) {
    this.ref.push(data);
  }

  returnScoresList() {
    this.ref.get().then((doc)=> {
      console.log(doc);
    });
  }

}

export default Database;
