/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

( function() {
	CKEDITOR.dialog.add( 'codeSnippet', function( editor ) {
		var snippetLangs = editor._.codesnippet.langs,
			lang = editor.lang.codesnippet,
			clientHeight = document.documentElement.clientHeight,
			langSelectItems = [],
			snippetLangId;

		langSelectItems.push( [ editor.lang.common.notSet, '' ] );

		for ( snippetLangId in snippetLangs )
			langSelectItems.push( [ snippetLangs[ snippetLangId ], snippetLangId ] );

		// Size adjustments.
		var size = CKEDITOR.document.getWindow().getViewPaneSize(),
			// Make it maximum 800px wide, but still fully visible in the viewport.
			width = Math.min( size.width - 70, 800 ),
			// Make it use 2/3 of the viewport height.
			height = size.height / 1.5;

		// Low resolution settings.
		if ( clientHeight < 650 ) {
			height = clientHeight - 220;
		}

		return {
			title: lang.title,
			minHeight: 200,
			resizable: CKEDITOR.DIALOG_RESIZE_NONE,
			contents: [ {
					id: 'info',
					elements: [
						{
							id: 'lang',
							type: 'select',
							label: lang.language,
							items: langSelectItems,
							aceLanguage: {
								apache: 'apache_conf',
								bash: 'batchfile',
								coffeescript: 'coffee',
								cpp: 'c_cpp',
								cs: 'csharp',
								css: 'css',
								diff: 'diff',
								html: 'html',
								ini: 'ini',
								java: 'java',
								javascript: 'javascript',
								json: 'json',
								makefile: 'makefile',
								markdown: 'markdown',
								objectivec: 'objectivec',
								perl: 'perl',
								php: 'php',
								python: 'python',
								ruby: 'ruby',
								sql: 'sql',
								vbscript: 'vbscript',
								xml: 'xml'
							},
							setup: function( widget ) {
								if ( widget.ready && widget.data.lang )
									this.setValue( widget.data.lang );

								// The only way to have an empty select value in Firefox is
								// to set a negative selectedIndex.
								if ( CKEDITOR.env.gecko && ( !widget.data.lang || !widget.ready ) )
									this.getInputElement().$.selectedIndex = -1;
							},
							commit: function( widget ) {
								widget.setData( 'lang', this.getValue() );
							},
							onChange: function()
							{
								if ( this.getValue() )
								{
									var aceEditor = document.aceFrame.aceEditor;
									aceEditor.getSession().setMode( 'ace/mode/' + this.aceLanguage[this.getValue()] );
								}
								
								aceEditor.focus();
							}
						},
						{
							type: 'html',
							id: 'code',
							html: '<iframe name="aceFrame" src="' + CKEDITOR.basePath + 'plugins/codesnippet/dialogs/editor.html"></iframe>',
							setup: function( widget ) {
								var aceEditor = document.aceFrame.aceEditor;
								aceEditor.setValue( widget.data.code );
								aceEditor.focus();
							},
							commit: function( widget ) {
								widget.setData( 'code', document.aceFrame.aceEditor.getValue() );
								console.log( this );
							},
							validate: CKEDITOR.dialog.validate.notEmpty( lang.emptySnippetError ),
							style: 'cursor:auto;' +
							'width:' + width + 'px;' +
							'height:' + height + 'px;',
							class: 'cke_source'
						}

					]
				}
			]
		};
	} );
}() );
