module.exports = function(grunt) {

	// var langOption = grunt.option('lang');   
	// console.log('languge option from gruntfile: '+langOption);	
	grunt.initConfig({

		DevHost: 'http://192.168.72.166:7001/#/',
		QaHost1: 'https://uis-qa1.icsl.net:10446/ui',
		QaHost2: 'https://uis-qa2.icsl.net:10446/ui',
		ApiHost1: 'https://uis-qa1.icsl.net:10446/',
		ApiHost2: 'https://uis-qa2.icsl.net:10446/',

		pkg: grunt.file.readJSON('package.json'),



		lang : grunt.option('lang') || 'en',   

		jshint: {
			files: [
                'Gruntfile.js',
                //'specs/**/*.js', // FIXME: this fails lint
                'table.js',
                //'reporter.js', // FIXME: this fails lint
                '*.conf.js',
            ],
			options: {


				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true

				}
			}

		},
		protractor: {
			options: {
				keepAlive: true,
				configFile: "protractor.conf.js"
			},    // end options

			dev_browserstack : {
				options: {
					configFile:'protractor.browserstack.conf.js',
					debug: false,
					args: {
						baseUrl: '<%= DevHost %>',
						verbose: true,
						params :{
							langOption : '<%= lang %>',
							target : 'remote',
							apiHost : '<%= ApiHost %>'
						}

					}
				}
			},
			qa1_browserstack : {
				options: {
					configFile:'protractor.browserstack.conf.js',
					debug: false,
					args: {
						baseUrl: '<%= QaHost1 %>',
						verbose: true,
						params :{
							langOption : '<%= lang %>',
							target : 'remote',
							apiHost : '<%= ApiHost1 %>'
						}
					}
				}
			},
			qa2_browserstack : {
                options: {
                    configFile:'protractor.browserstack.conf.js',
                    debug: false,
                    args: {
                        baseUrl: '<%= QaHost2 %>',
                        verbose: true,
                        params :{
                            langOption : '<%= lang %>',
                            target : 'remote',
                            apiHost : '<%= ApiHost2 %>'
                        }
                    }
                }
            },
			dev: {
				options: {
					configFile:'protractor.conf.js',

					debug: false,
					args: {
						baseUrl: '<%= DevHost %>',
						verbose: true,
						params :{
							langOption : '<%= lang %>',
							target : 'local',
							apiHost : '<%= ApiHost %>'
						}
					}
				}
			},
			qa1: {
				options: {
					configFile:'protractor.conf.js',
					debug: false,
					args: {
					baseUrl: '<%= QaHost1 %>',
						verbose: false,
						params :{
							langOption : '<%= lang %>',
							target : 'local',
							apiHost : '<%= ApiHost1 %>'
						}
					}
				}
			},
			qa2: {
                options: {
                    configFile:'protractor.conf.js',
                    debug: false,
                    args: {
                    baseUrl: '<%= QaHost2 %>',
                        verbose: false,
                        params :{
                            langOption : '<%= lang %>',
                            target : 'local',
                            apiHost : '<%= ApiHost2 %>'
                        }
                    }
                }
            },
			qa_bamboolocal: {
				options: {
					configFile:'protractor.conf.js',
					debug: false,
					args: {
						
						seleniumAddress: 'http://IEDUB-GWC7262.synchronoss.net:4444/wd/hub',
					baseUrl: '<%= QaHost %>',
						verbose: false,
						params :{
							langOption : '<%= lang %>',
							target : 'local',
							apiHost : '<%= ApiHost %>'
						}
					}
				}
			},
			dev_local: {
				options: {
					configFile:'protractor.conf.js',
					debug: false,
					args: {
					seleniumAddress: 'http://localhost:4444/wd/hub',
					baseUrl: '<%= QaHost %>',
						verbose: false,
						params :{
							langOption : '<%= lang %>',
							target : 'local',
							apiHost : '<%= ApiHost %>'
						}
					}
				}
			},
			qa_local: {
				options: {
					configFile:'protractor.conf.js',
					debug: false,
					args: {
						
						seleniumAddress: 'http://localhost:4444/wd/hub',
					baseUrl: '<%= QaHost %>',
						verbose: false,
						params :{
							langOption : '<%= lang %>',
							target : 'local',
							apiHost : '<%= ApiHost %>'
						}
					}
				}
			},
			dev_bamboolocal: {
				options: {
					configFile:'protractor.conf.js',
					debug: false,
					args: {
					seleniumAddress: 'http://IEDUB-GWC7262.synchronoss.net:4444/wd/hub',
					baseUrl: '<%= QaHost %>',
						verbose: false,
						params :{
							langOption : '<%= lang %>',
							target : 'local',
							apiHost : '<%= ApiHost %>'
						}
					}
				}
			},
			singlerun: {
				options: {
					configFile:'protractor.conf.js',
					debug: false,
					args: {
						baseUrl: '<%= QaHost %>',
						verbose: true,
						params :{
							langOption : '<%= lang %>',
							apiHost : '<%= ApiHost %>'
						}
					}
				}
			},
			auto: {
				keepAlive: true,
				options: {
					args: {
						seleniumPort: 4444
					}  
				} 
			} 
		},  
		shell: {
			options: {
				stdout: true
			},
			npm_install: {
				command: 'npm install'
			},
			selenium_N_chromeDriver_install: {
				command: 'node ./node_modules/protractor/bin/webdriver-manager update'
			}


		}


	});


	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-template');
	// grunt.registerTask('process_conf',['template:process_conf_tpl']);

	grunt.registerTask('install',
			[ 'shell:npm_install', 'shell:selenium_N_chromeDriver_install']);
				
	grunt.registerTask('default', [ 'jshint', 'protractor:singlerun' ]);

	grunt.registerTask('qa1', ['jshint', 'protractor:qa1' ]);
	grunt.registerTask('qa2', ['jshint', 'protractor:qa2' ]);

	grunt.registerTask('dev', ['jshint','protractor:dev' ]);

	grunt.registerTask('qa1browserstack', ['jshint','protractor:qa1_browserstack' ]);
	grunt.registerTask('qa2browserstack', ['jshint','protractor:qa2_browserstack' ]);
	grunt.registerTask('devbrowserstack', ['jshint','protractor:dev_browserstack' ]);
	
	grunt.registerTask('qalocal', ['jshint','protractor:qa_local']);
	grunt.registerTask('devlocal', ['jshint','protractor:dev_local']);
	
	grunt.registerTask('qabamboolocal', ['jshint','protractor:qa_bamboolocal']);
	grunt.registerTask('devbamboolocal', ['jshint','protractor:dev_bamboolocal']);

};
