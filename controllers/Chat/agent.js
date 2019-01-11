
module.exports = {
  index: function (req, res, next) {
    var roomID
    var user
    var html
    if (req.param('roomID') && req.param('user') != null) {
      roomID = req.param('roomID')
      user = req.param('user')
      html =
        '<div class="chat-main-header"><a id="gxChatModuleSideNav" href="javascript:void(0)" class="drawer-btn d-block action-btn action-btn d-lg-none mr-2"><i class="zmdi zmdi-comment-text zmdi-hc-lg"></i></a>' +
        '<div class="chat-main-header-info">' +
        '<div class="chat-avatar mr-2">' +
        '<div class="chat-avatar-mode"><img src="images/userAvatar/garry-sobars.jpg" alt="" class="user-avatar size-60"/><span class="chat-mode away"></span></div>' +
        '</div>' +
        '<div class="chat-contact-name">' + user + '</div>' +
        '</div>' +
        '</div>' +
        '<div style="position: relative;" class="chat-list-scroll">' +
        '<div class="chat-main-content">' +
        '</div>' +
        '<div class="old-messages">' +
        '</div>' +
        '<div class="new-messages">' +
        '</div>' +
        '</div>' +
        '<div class="chat-main-footer">' +
        '<div class="d-flex flex-row align-items-center">' +
        '<div class="col">' +
        '<div class="form-group">' +
        '<input type="text" id="inputMessage" placeholder="Type here" class="border-0 form-control chat-textarea" />' +
        '<input type="hidden" value="' + roomID + '" id="roomID" />' +
        '</div>' +
        '</div>' +
        '<div class="chat-sent"><button class="action-btn"><i class="zmdi zmdi-mail-send"></i></button></div>' +
        '</div>' +
        '</div>'
    } else {
      html =
        '<div class="chat-box">' +
        '<div class="chat-box-main">' +
        '<div class="chat-main">' +
        '<div class="chat-list-scroll">' +
        '<div class="loader-view h-100"><i class="zmdi zmdi-comment s-128 text-muted"></i>' +
        '<h1 class="text-muted">Select User to start Chat</h1><a id="gxChatModuleSideNav" href="javascript:void(0)" class="gx-btn gx-flat-btn gx-btn-primary drawer-btn d-block d-lg-none"></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
      roomID = ''
    }

    res.render('agent', { title: 'EagleChat Agent', roomID: roomID, html: html })
  },

  tickets: function (req, res, next) {
    res.render('agent/tickets', { title: 'EagleChat || Tickets' })
  },

  agent: function (req, res, next) {
    res.render('agent/agent', { title: 'EagleChat || Agent' })
  },

  help: function (req, res, next) {
    res.render('agent/help', { title: 'EagleChat || Help' })
  }
}
