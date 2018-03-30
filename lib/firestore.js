class Firestore {
  constructor() {
    this.firestore = firebase.firestore();
    this.ref = this.firestore.doc('scores');
    this.pushScore = this.pushScore.bind(this);
    this.returnScoresList = this.returnScoresList.bind(this);
    this.returnScoresList();
  }

  pushScore(data) {
    this.ref.set(data);
  }

  returnScoresList() {
    this.ref.get().then((doc)=> {
      console.log(doc);
    });
  }

}

export default Firestore;
