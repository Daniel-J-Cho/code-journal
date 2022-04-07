/* global data */
/* exported data */

var $photoInput = document.querySelector('.photo-input');
var $image = document.querySelector('.image');
var $form = document.querySelector('.form');
var $ul = document.querySelector('.unordered-list');
var $anchor = document.querySelector('.anchor');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $buttonAnchor = document.querySelector('.button-anchor');

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
  $entries.className = 'entries';
  $entryForm.className = 'entry-form hidden';
  var listItem = domTree(newObj);
  $ul.prepend(listItem);
  $buttonAnchor.className = 'button-anchor';
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
      <div class="innerDiv">
        <h2></h2>
        <i></i>
      </div>
      <p></p>
    </div>
  </div>
</li> */

function domTree(entry) {
  var liElem = document.createElement('li');
  var rowDiv = document.createElement('div');
  var firstColDiv = document.createElement('div');
  var imgElem = document.createElement('img');
  var secondColDiv = document.createElement('div');
  var h2Elem = document.createElement('h2');
  var innerDiv = document.createElement('div');
  var pElem = document.createElement('p');
  var editIcon = document.createElement('i');
  liElem.appendChild(rowDiv);
  rowDiv.appendChild(firstColDiv);
  firstColDiv.appendChild(imgElem);
  rowDiv.appendChild(secondColDiv);
  editIcon.className = 'fas fa-pen';
  secondColDiv.appendChild(innerDiv);
  innerDiv.className = 'innerDiv';
  innerDiv.appendChild(h2Elem);
  innerDiv.appendChild(editIcon);
  secondColDiv.appendChild(pElem);
  rowDiv.setAttribute('class', 'row entries');
  firstColDiv.setAttribute('class', 'column-half');
  imgElem.setAttribute('class', 'image');
  secondColDiv.setAttribute('class', 'column-half firstInnerColDiv');
  imgElem.setAttribute('src', entry.photo);
  h2Elem.textContent = entry.title;
  pElem.textContent = entry.notes;
  return liElem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var entry = domTree(data.entries[i]);
    $ul.appendChild(entry);
  }
  if (window.location.hash.slice(1) === $entries.getAttribute('data-view')) {
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
    $buttonAnchor = 'button-anchor';
  } else if (window.location.hash.slice(1) === $entryForm.getAttribute('data-view')) {
    $entryForm.className = 'entry-form';
    $entries.className = 'entries hidden';
  }
});

$anchor.addEventListener('click', function (event) {
  $entries.className = 'entries';
  $entryForm.className = 'entry-form hidden';
  $buttonAnchor = 'button-anchor';
});

$buttonAnchor.addEventListener('click', function (event) {
  $buttonAnchor.className = 'button-anchor hidden';
  $entryForm.className = 'entry-form';
  $entries.className = 'entries hidden';
});
