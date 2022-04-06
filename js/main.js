/* global data */
/* exported data */

var $photoInput = document.querySelector('.photo-input');
var $image = document.querySelector('.image');
var $form = document.querySelector('.form');

$photoInput.addEventListener('input', function (event) {
  var newInput = event.target.value;
  $image.setAttribute('src', newInput);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var newObj = {};
  newObj.title = event.target.elements.title.value;
  newObj.photo = event.target.elements.photo.value;
  newObj.notes = event.target.elements.notes.value;
  newObj.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newObj);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  event.target.reset();
});

/* Structure of domTree
<li>
  <div class="row entries">
    <div class="column-half">
      <img src="some image" class="image">
    </div>
    <div class="column-half">
      <h2></h2>
      <p></p>
    </div>
  </div>
</li> */

function domTree(entry) {
  var liElem = document.createElement('li');
  var innerRowDiv = document.createElement('div');
  var firstColDiv = document.createElement('div');
  var imgElem = document.createElement('img');
  var secondColDiv = document.createElement('div');
  var h2Elem = document.createElement('h2');
  var pElem = document.createElement('p');
  liElem.appendChild(innerRowDiv);
  innerRowDiv.appendChild(firstColDiv);
  firstColDiv.appendChild(imgElem);
  innerRowDiv.appendChild(secondColDiv);
  secondColDiv.appendChild(h2Elem);
  secondColDiv.appendChild(pElem);
  innerRowDiv.setAttribute('class', 'row entries');
  firstColDiv.setAttribute('class', 'column-half');
  imgElem.setAttribute('class', 'image');
  secondColDiv.setAttribute('class', 'column-half');
  imgElem.setAttribute('src', entry.photo);
  h2Elem.textContent = entry.title;
  pElem.textContent = entry.notes;
  return liElem;
}

var $ul = document.querySelector('.unordered-list');

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var entry = domTree(data.entries[i]);
    $ul.appendChild(entry);
  }
});
