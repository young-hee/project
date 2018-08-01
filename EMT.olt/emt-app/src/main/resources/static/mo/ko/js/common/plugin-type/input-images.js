/**
 * input images, 여러개의 이미지 첨부
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * IE10~ 부터 지원
		 * @param   {String}  method    ex) $( '.ui_input_images' ).inputImages();
		 *              "clear"         	적용해제
		 *              "extendFormData"	FormData 에 선택된 이미지 파일 리스트를 병합
		 * @returns {jQuery}
		 */
		inputImages: function ( method, value ) {
			var pluginName = 'input-images';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new InputImages($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});



	var InputImages = function ( $target, pluginName ) {
		var _$target = $target,
			_$findInput = _$target.find( 'input:file' ),
			_$result = _$target.find( '.attach' );

		var MAX_LENGTH = 10,
			MAX_MB = 10,//10MB
			MAX_SIZE = MAX_MB * 1024 * 1024;

		var _pluginName = pluginName,
			_isSingle = _$target.data( 'single-input' ),
			_fileUid = 0,
			_files = [];


		/* ==================== Public Methods ==================== */

		/**
		 * FormData 에 선택된 이미지 파일 리스트를 병합
		 * @param {FormData}	formData	formData = new FormData();
		 */
		this.extendFormData = function ( formData ) {
			if ( Object.prototype.toString.call(formData) === '[object FormData]' ) {
				var length = _files.length,
					name = _$findInput.attr( 'name' );

				for ( var i = 0; i < length; ++i ) {
					formData.append( name || 'picture', _files[i].file );
				}
			}
		};

		this.clear = function () {
			_$findInput.off( 'change', fileChangeHandler );
			_$result.off( 'click', '.btn_del.user_attach_img', clickHandler );
			AP.responsiveWidth.removeListener( 'resize', resizeThumbnail );
			plugin.remove( _$target, _pluginName );
		};

		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			var uId = $B.string.unique();
			_$findInput.attr( 'id', uId );
			_$target.find( 'label' ).attr( 'for', uId );

			setEvents();
			resizeThumbnail();
		}

		function setEvents () {
			_$findInput.on( 'change', fileChangeHandler );
			_$result.on( 'click', '.btn_del.user_attach_img', clickHandler );
			AP.responsiveWidth.addListener( 'resize', resizeThumbnail );
		}

		function clickHandler (e) {
			var uId = $( e.currentTarget ).data( 'uid' ),
				length = _files.length;

			$( e.currentTarget ).parent().remove();

			for ( var i = 0; i < length; ++i ) {
				var file = _files[i];

				if ( file.uId === uId ) {
					_files.splice( i, 1 );
					break;
				}
			}
		}

		function fileChangeHandler (e) {
			var files = Array.prototype.slice.call( e.target.files ),
				attachFileLength = _$result.find( 'li:not(.input_file_btn_area)' ).length;

			if ( attachFileLength + files.length <= MAX_LENGTH ) {
				files.every( function ( file ) {
					if ( valid(file) ) {
						var reader = new FileReader();
						reader.onload = function (e) {
							var data = {
								uId: _fileUid++,
								file: file,
								data: e.target.result
							};

							attach( e.target.result, data.uId );
							resizeThumbnail();

							if ( _isSingle ) {
								_files[0] = data;
							} else {
								_files.push( data );
							}
						};

						reader.readAsDataURL( file );
						return true;
					}
				});
			} else {
				AP.modal.alert( '첨부파일은 최대 ' + MAX_LENGTH + '개까지 등록하실 수 있습니다.' );
			}
		}

		function valid ( file ) {
			var result = true;

			//image/png
			if ( !/image\//.test(file.type) ) {
				AP.modal.alert( '이미지 파일만 첨부가 가능합니다.' );
				result = false;
			} else if ( file.size > MAX_SIZE ) {
				AP.modal.alert( '최대 파일 용량은 ' + MAX_MB + 'MB 입니다.' );
				result = false;
			}

			return result;
		}

		function resizeThumbnail () {
			_$result.find( 'li' ).each( function ( idx, el ) {
				var $el = $( el );
				$el.css( 'height', $el.width() );
			});
		}

		function attach ( result, uid ) {
			if ( _isSingle ) {
				_$result.html( '<img src="' + result + '">' );
			} else {
				_$result.append( '<li><img src="' + result + '" style="height:100%"><button type="button" class="btn_del user_attach_img" data-uid="' + uid + '"><span class="sr_only">첨부파일 삭제</span></button></li>' );
			}
		}
	};

})( jQuery, AP.plugin );