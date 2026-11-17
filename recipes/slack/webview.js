function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

const SELECTOR_CHANNELS_UNREAD =
  '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)';

module.exports = Dokomo => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll(
      `${SELECTOR_CHANNELS_UNREAD} .p-channel_sidebar__badge, .p-channel_sidebar__link--unread:not([data-sidebar-link-id="Punreads"]):not([data-sidebar-link-id="Pdrafts"]):not([data-sidebar-link-id="Pdms"]):not([data-sidebar-link-id="Ppaid-benefits"])`,
    ).length;
    const allMessages =
      document.querySelectorAll(SELECTOR_CHANNELS_UNREAD).length -
      directMessages;
    Dokomo.setBadge(directMessages, allMessages);
  };

  const getActiveDialogTitle = () => {
    const element = document.querySelector(
      '.p-channel_sidebar__channel--selected .p-channel_sidebar__name',
    );

    Dokomo.setDialogTitle(
      element && element.firstChild ? element.firstChild.textContent : null,
    );
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Dokomo.loop(loopFunc);

  // The team icon probe from upstream is left out: it opens and closes
  // the workspace menu to read an avatar that Dokomo does not show.

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
