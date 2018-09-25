/**
 * Local Live Compiler Setting (Hanblebars)
 */
module.exports = function ( grunt ) {
    'use strict';

    var rootBase = '',
        templatePath = 'amt-app/src/main/resources/static/*/*/handlebars-templates/hbs/**/';
    
    var fileName = grunt.option('target');
    if( fileName != undefined ){
    	templatePath = 'amt-app/src/main/resources/static/*/*/handlebars-templates/hbs/'+fileName;
    }
	
    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    namespace: function ( filename ) {
                        var result = 'AP.handlebars.';

                        filename.replace(  /\/hbs\/([\w-\/]+)\/[\w-]+.hbs$/, function ( str, folderName ) {
                            result += folderName.replace( /\//g, '.' );
                        });

                        return result;
                    },

                    processName: function ( filePath ) {
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1].split('.')[0];
                    },
					
					processContent: function(src) {
						return src.replace(/\r\n/gi, '\n');
					}
					
                },
				
                files: [{
                    expand: true,
                    cwd: rootBase,
                    src: [templatePath + '*.hbs'],
                    dest: rootBase,
                    rename: function ( dest, src ) {
                        return dest + src.replace( /(\/hbs)\/([\w-\/]+).hbs$/, function ( str, f1, f2 ) {
                                return '/compiled/' + f2 + '.js';
                            });
                    }
                }]
            }
        },

        watch: {
            template: {
                files: [rootBase + templatePath + '*.hbs'],
                tasks: ['changed:handlebars']
            }
        }

    });
	
	

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-changed' );
    grunt.loadNpmTasks( 'grunt-contrib-handlebars' );

	//한번 실행하면 변경된 내용 감시하여 compile (grunt)
	grunt.registerTask( 'default', ['handlebars', 'watch'] );
	//일회성 compile (grunt handlebars-compile)
	grunt.registerTask( 'handlebars-compile', ['handlebars'] );

};