
    "use strict";

    var db = module.parent.require('./database'),
        hotswap = module.parent.require('./hotswap');

    var nconf = module.parent.require('nconf'),
        async = module.parent.require('async'),
        mkdirp = module.parent.require('mkdirp'),
        winston = module.parent.require('winston'),
        express = module.parent.require('express');

    var fs = require('fs'),
        path = require('path');


    var Markdown_ext = {
        parse: function(postContent, callback) {
            // this regex could be better
            postContent = postContent
                .replace(/<p>! *([\S\s]*?)<\/p>/gm, '</blockquote><blockquote()><div onclick="if(document.getElementById(\'spoiler\') .style.display==\'none\') {document.getElementById(\'spoiler\') .style.display=\'\'}else{document.getElementById(\'spoiler\') .style.display=\'none\'}"></div><div><p>$1</p></span></blockquote><blockquote()>')
                .replace(/<blockquote><div>\s*<\/blockquote>/g, '');

            callback(null, postContent);
        },
        init: function(params, callback) {
            var that = this;
            var app = params.router,
                middleware = params.middleware;

            app.get('/admin/admin-page', middleware.admin.buildHeader, renderAdmin);
            app.get('/api/admin/admin-page', renderAdmin);

            var SocketAdmin = module.parent.require('./socket.io/admin');
            SocketAdmin.settings.saveMarks = function(socket, data, callback) {
                delete that.cache;

                async.series([
                    async.apply(db.set, 'plugins:markdown-ext', JSON.stringify(data))
                ], callback);
            };

            //this.reloadRoutes(middleware, callback);
        },
        getMarks: function(callback) {
            var that = this;
            if (that.cache) {
                return callback(null, that.cache);
            } else {
                db.get('plugins:markdown-ext', function(err, data) {
                    try {
                        var replacements = JSON.parse(data);

                        if (replacements == null) {
                            replacements = [];
                        }

                        // Eliminate errors in route definition
                        that.cache = replacements;
                        console.log(replacements);

                        callback(null, that.cache);
                    } catch (err) {
                        callback(err);
                    }
                });
            }
        },
		addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/admin-page',
		icon: 'fa-mobile',
		name: 'markdown-ext'
	});

	callback(null, header);
},
        admin: {
            menu: function(custom_header, callback) {
                custom_header.plugins.push({
                    "route": '/admin-page',
                    "icon": 'fa-edit',
                    "name": 'Markdown-ext'
                });

                callback(null, custom_header);
            }
        },
        renderAdmin: function(req, res) {
            getMarks(function(err, data) {
                res.render('admin/custom-pages', {
                    marks: data
                });
            });
        }
    };

    module.exports = Markdown_ext;
