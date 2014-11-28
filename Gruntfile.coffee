module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    bower_concat:
      vendor:
        dest: 'public/vendor.js'
        # cssDest: 'public/vendor.css'
        mainFiles:
          'mimoza': 'mimoza_browser.js'
    coffee:
      compile:
        options: bare: true
        files: 
          'public/browser.js': 'app/browser.coffee'
          'app/server.js': 'app/server.coffee'
    less:
      compile:
        options: paths: ["app"]
        files: "public/browser.css": "app/browser.less"
  
  # Load plugins
  require('load-grunt-tasks') grunt
  
  grunt.registerTask 'bower', [ 'bower_concat' ]
  # Default task(s).
  grunt.registerTask "default", [ "bower", "coffee", "less" ]
  
  return