Vue.prototype.hideLoading = function () {
    let dom = document.querySelector('#loadingbar');
    if (!dom) {
        throw new Error('can not find a dom node for the id #loadingbar');
    }
    dom.style.display = 'none';
}