class Firestore {
  constructor() {
    this.firestore = firebase.firestore();
    this.ref = this.firestore.doc('scores/scoreData');
    this.pushScore = this.pushScore.bind(this);
    this.returnScoresList = this.returnScoresList.bind(this);
  }

  pushScore(data) {
    this.ref.set(data);
  }

  returnScoresList() {

  }

}

export default Firestore;
