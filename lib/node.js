

class Node {
  constructor(coords, parent) {
    this.coords = coords;
    this.parent = parent;
    this.x = coords[0];
    this.y = coords[1];
  }

  distance() {
    if (this.parent) {
      if (this.parent === 'root') {
        return 0;
      } else {
      return this.parent.distance() + 1;
      }
    } else {
      return nil;
    }
  }

}

export default Node;
