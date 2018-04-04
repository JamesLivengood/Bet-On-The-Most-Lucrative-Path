class Firestore {
  constructor() {
    this.firestore = firebase.firestore();
    this.ref = this.firestore.collection('scores');
    this.pushScore = this.pushScore.bind(this);
    this.returnScoresList = this.returnScoresList.bind(this);
    this.returnScoresList();
  }

  pushScore(data) {
    let key = Math.floor(Math.random()*1000000000).toString();
    this.ref.doc(key).set(data);
  }

  returnScoresList() {
    // this.ref.get().then((doc)=> {
    //   console.log(doc);
    // });
    let query = this.ref.where('score', '==', '10000');
    // debugger
  }

}

export default Firestore;
