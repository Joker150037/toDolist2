let cardBottom = document.querySelector('.card__bottom');
let spans = document.querySelectorAll('span')
let editButton = document.querySelector('.card__edit')

for (i = localStorage.length; i >= 1; i--) {

    let string = localStorage.getItem(i)

    let array = JSON.parse(string)

    cardBottom.innerHTML += `
    <div class="card__box">
    <p>
    ${array[1]}
    </p>
    <span style='display:none'>${array[0]}</span>
    <i class="fa-solid fa-caret-up icon up"></i>
    <i class="fa-solid fa-caret-down icon down"></i>
    <i class="fa-solid fa-pen-to-square icon edit"></i>
    <i class="fa-solid fa-trash icon delete"></i>
    </div>
    `
}

let icon = document.querySelectorAll('.icon');


icon.forEach(item => item.addEventListener('click', function () {

    let cardBox = item.parentNode;
    let up = cardBox.querySelector('.up');
    let down = cardBox.querySelector('.down');
    let edit = cardBox.querySelector('.edit');
    let remove = cardBox.querySelector('.delete');
    let p = cardBox.querySelector('p')
    if (item.classList.contains('down')) {
        cardBox.style.gridTemplateColumns = '9fr 1fr';
        p.style.whiteSpace = 'wrap';
        down.style.display = 'none';
        remove.style.display = 'none';
        edit.style.display = 'none';
        up.style.display = 'block';
    } else if (item.classList.contains('up')) {
        cardBox.style.gridTemplateColumns = '7fr 1fr 1fr 1fr';
        p.style.whiteSpace = 'nowrap';
        down.style.display = 'block';
        remove.style.display = 'block';
        edit.style.display = 'block';
        up.style.display = 'none';
    } else if (item.classList.contains('delete')) {
        cardBottom.removeChild(cardBox)

        let deleteItem = cardBox.querySelector('span');

        let keys = Object.keys(localStorage);
        keys.forEach(item => {
            let string = localStorage.getItem(item);
            let array = JSON.parse(string)
            if (deleteItem.textContent == array[0]) {

                localStorage.removeItem(item)
            }
        });
    } else if (item.classList.contains('edit')) {
        let deleteItem = cardBox.querySelector('span');

        let keys = Object.keys(localStorage);
        keys.forEach(item => {
            let string = localStorage.getItem(item);
            let array = JSON.parse(string)
            if (deleteItem.textContent == array[0]) {
                textArea.value = array[1]
                btn.style.display = 'none';
                editButton.style.display = 'block';
                editButton.addEventListener('click', function () {
                    let id = array[0];
                    let note = textArea.value;
                    let value = [id, note];
                    let josnString = JSON.stringify(value)
                    localStorage.setItem(item, josnString);
                    editButton.style.display = 'none';
                    btn.style.display = 'block'
                    location.reload();
                })
            }

        });
    }
}))

let btn = document.querySelector('.card__btn')
let textArea = document.querySelector('.card__textarea')
btn.addEventListener('click', function () {
    let id = '';
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * 10)
        id += random;
    }
    let array = [];
    array.push(id);
    array.push(textArea.value);
    let text = JSON.stringify(array);
    if (textArea.value != false) {
        localStorage.setItem(localStorage.length + 1, text)
        let firstNode = document.querySelector('.card__box')
        let div = document.createElement('div')
        div.setAttribute('class', 'card__box')
        div.innerHTML = `
        <p>
        ${textArea.value}
        </p>
        <span style='display:none'>${id}</span>
        <i class="fa-solid fa-caret-up icon up"></i>
        <i class="fa-solid fa-caret-down icon down"></i>
        <i class="fa-solid fa-pen-to-square icon edit"></i>
        <i class="fa-solid fa-trash icon delete"></i>
        `;
        cardBottom.insertBefore(div, firstNode)
    }
    location.reload();
})



