$(function () {
    bindEvents();
});
function bindEvents() {
    var win = $(window), body = $(document.body);
    body.scrollspy({target: ".icl-docs-sidebar"});
    win.on("load", function () {
        body.scrollspy("refresh")
    });
    $('.icl-docs-container [href="#"]').click(function (evt) {
        evt.preventDefault()
    });
    setTimeout(function () {
        var sidebar = $(".icl-docs-sidebar");
        sidebar.affix({
            offset: {
                top: function () {
                    var top = sidebar.offset().top;
                    // marginTop = parseInt(sidebar.children(0).css("margin-top"), 10),
                    // height = $(".main-header").height();
                    return this.top = top;
                },
                bottom: function () {
                    return this.bottom = $(".icl-docs-footer").outerHeight(!0)
                }
            }
        })
    }, 100);
}