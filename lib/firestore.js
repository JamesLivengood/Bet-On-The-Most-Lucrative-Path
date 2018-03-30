class Firestore {
  constructor() {
    this.firestore = firebase.firestore();
    this.ref = this.firestore.collection('scores');
    this.pushScore = this.pushScore.bind(this);
    this.returnScoresList = this.returnScoresList.bind(this);
    this.returnScoresList();
  }

  pushScore(data) {
    let key = Math.floor(Math.random()*1000000000);
    this.ref.set({key: data});
  }

  returnScoresList() {
    this.ref.get().then((doc)=> {
      console.log(doc);
    });
  }

}

export default Firestore;
