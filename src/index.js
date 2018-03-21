import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Play', 'To', 'Win'], ' ');

  return element;
}

document.body.appendChild(component());
