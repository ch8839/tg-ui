module.exports = {
  presets: ['@vue/app'],
  plugins: [
    ['import',
      {
        libraryName: '@nibfe/tra-app-platform-component',
        libraryDirectory: 'dist',
        style: (name) => {
          const libDirIndex = name.lastIndexOf('/')
          const libDir = name.substring(0, libDirIndex)
          const fileName = name.substr(libDirIndex + 1)
          return `${libDir}/theme/${fileName}.css`;
        }
      }
    ],
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
}
