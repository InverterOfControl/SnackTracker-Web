module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-loopback-sdk-angular');
grunt.loadNpmTasks('grunt-docular');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-bower-concat');
grunt.loadNpmTasks('grunt-ng-annotate');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.initConfig({
  loopback_sdk_angular: {
    services: {
      options: {
        input: './server/server.js',
        output: 'js/lb-services.js'
      }
    }
  },
  docular: {
    groups: [
      {
        groupTitle: 'LoopBack',
        groupId: 'loopback',
        sections: [
          {
            id: 'lbServices',
            title: 'LoopBack Services',
            scripts: [ 'js/lb-services.js' ]
          }
        ]
      }
    ]
  },
  pkg: grunt.file.readJSON('package.json'),
  
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    
    build: {
      src: 'tmp/scripts.concat.js',
      dest: 'build/js/<%= pkg.name %>.min.js'
    },
    bower:{
      src: 'tmp/_bower.js',
      dest: 'build/js/vendor.min.js'
    }
  },
  concat: {
    dist: {
      src: [
        'client/js/**/*.js'
      ],
      dest: 'tmp/scripts.concat.js'
    },
    dev:{
      src: [
        'client/js/**/*.js'
      ],
      dest: 'tmp/scripts.concat.js'
    }
  },
  cssmin: {
     options: {
      keepSpecialComments: 0
    },
    target: {
      files: [{
        expand: true,
        cwd: 'tmp',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css',
        ext: '.min.css'
      }]
      
    }
  },
  bower_concat: {
      all: {
        dest: {
          'js': 'tmp/_bower.js',
          'css': 'tmp/vendor.css'
        },
         mainFiles: {
          'angular-bootstrap': 'ui-bootstrap-csp.css',
          'bootstrap': ['dist/css/bootstrap.css']
        },
        exclude: [
          'jquery'
        ]
      }
},
copy: {
  html:{
    expand: true,
    cwd: 'client',
    src: './**/*.html',
    dest: 'build/'
  },
  bootstrap:{
    expand: true,
    cwd: './bower_components/bootstrap/fonts/',
    src: '*.*',
    dest: 'build/css/fonts/'
  }
},
clean: {
  build: ['build'],
  tmp: ['tmp']
}
  
});

grunt.registerTask('build', [
  //'jshint',
  'loopback_sdk_angular', 'docular', // newly added
  , 'concat', 'uglify']);

grunt.registerTask('dev', [
  'clean:build',
  'clean:tmp',
  'loopback_sdk_angular',
  'concat:dev',
  'bower_concat',
  'uglify:build',
  'uglify:bower',
  'copy:html',
  'copy:bootstrap',
  'cssmin'
  ]);

};

