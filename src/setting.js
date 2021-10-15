export default {
  // Hot-Key
  // Support shortcut keys such as ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // The sidebar is collapsed by default
  menu: {
    asideCollapse: false
  },
  // Default page when reading persistent data fails
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: 'HomePage',
          auth: false
        }
      }
    ]
  },
  // Menu search
  search: {
    enable: true
  },
  // Registered subject
  theme: {
    list: [
      {
        title: 'D2admin Classic',
        name: 'd2',
        preview: 'image/theme/d2/preview@2x.png'
      },
      {
        title: 'Violet',
        name: 'violet',
        preview: 'image/theme/violet/preview@2x.png'
      },
      {
        title: 'Simple Lines',
        name: 'line',
        backgroundImage: 'image/theme/line/bg.jpg',
        preview: 'image/theme/line/preview@2x.png'
      },
      {
        title: 'Star',
        name: 'star',
        backgroundImage: 'image/theme/star/bg.jpg',
        preview: 'image/theme/star/preview@2x.png'
      },
      {
        title: 'Tomorrow Night Blue (vsCode)',
        name: 'tomorrow-night-blue',
        preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
      }
    ]
  },
  // Whether to turn on page switching animation by default
  transition: {
    active: true
  }
}
