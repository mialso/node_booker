var UI = {
    fragment_create: function (htmlString) {
        var fragment = document.createDocumentFragment();
        var temp = document.createElement('div');
        temp.insertAdjacentHTML('afterbegin', htmlString);
        while (temp.firstChild) {
            fragment.appendChild(temp.firstChild);
        }
        return fragment;
    }
}
