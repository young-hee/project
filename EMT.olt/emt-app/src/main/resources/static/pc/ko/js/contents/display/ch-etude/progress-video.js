/**
 * Progress Video
 * @events
 * 		complete-section		설정한 구간까지 시청을 완료했을때 전달되는 이벤트
 * EventProperties:
 * 	sectionData		현재구간의 sectionData
 */
;(function ( $ ) {
	'use strict';

	var ProgressVideo = $B.Class.extend({
		//10구간으로 나누어 체크한다.
		SECTION_LENGTH: 10,

		/**
		 * @param {jQueryObject}	$target
		 * @param {Array} 			data	section data, (sectionNo: 0 ~ 9)
		 */
		initialize: function ( $target, data ) {
			this._$video = $( $target );
			this._completSections = new Array( this.SECTION_LENGTH );
			this._activateSections = {};

			if ( data ) {
				this._sections = $B.object.clone( data );
				this._$video.attr( 'data-playing-event', true );
				this._setEvents();
			}

			this._$video.video();
		},

		/** =============== Public Methods =============== */

		/**
		 * 활성화된 section 데이타 배열 반환
		 * @returns {Object}
		 */
		getActivateSections: function () {
			return this._activateSections;
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			//15분에 한번씩 세션연장
			this._sessionTimer = new $B.utils.Timer( (1000 * 60 * 15), 0 )
				.addListener( 'timer', function (e) {
					AP.api.extendSessionTime();
				}.bind(this));

			this._$video.on( 'video-play', function (e) {
				if ( !AP.LOGIN_USER ) {
					this._$video.video( 'stop' );
					AP.login({trigger: true});
				}
			}.bind(this));

			if ( AP.LOGIN_USER ) {
				this._$video.on( 'video-play video-stop', function (e) {
					if ( e.type === 'video-play' ) {
						AP.api.extendSessionTime();
						this._sessionTimer.reset().start();
					} else {
						this._sessionTimer.stop();
					}
				}.bind(this));
			}

			this._$video.on( 'video-playing', function (e) {
				if ( this._between ) {
					this._between.trigger( e.currentTime );
				} else {
					//live 영상에서는 video-ready 시점에는 duration이 0이다.
					this._setSection( e.duration );
				}
			}.bind(this));
		},

		_setSection: function ( duration ) {
			var positions = [],
				sectionLength = this._sections.length;

			for ( var i = 0; i < this.SECTION_LENGTH; ++i ) {
				positions[i] = {
					min: this._getSectionMin( i, duration ),
					max: this._getSectionMax( i, duration ),
					data: {sectionNo: i}
				};

				for ( var j = 0; j < sectionLength; ++j ) {
					var section = this._sections[j];

					if ( section.sectionNo === i ) {
						positions[i] = {
							min: this._getSectionMin( i, duration ),
							max: this._getSectionMax( i, duration ),
							data: section
						};

						break;
					}
				}
			}

			this._between = new $B.utils.Between( positions )
				.addListener( 'activate', this._betweenHandler.bind(this) );
		},

		_betweenHandler: function (e) {
			//하위 구간부터 현재구간까지 모두 true 일때만 true
			if ( this._isCompleteSection(e.data) ) {
				this._completSections[e.data.sectionNo] = 'dispatched';
				this._activateSections[e.data.sectionNo] = e.data;

				this.dispatch( 'complete-section', {
					sectionData: e.data
				});
			} else {
				this._completSections[e.data.sectionNo] = 'view';
			}
		},

		//하위 구간부터 현재구간까지 모두 true 일때만 true
		_isCompleteSection: function ( data ) {
			var result = true,
				idx = data.sectionNo;

			if ( data.couponSn && this._completSections[idx] !== 'dispatched' ) {
				for ( var i = 0; i < idx; ++i ) {
					if ( !this._completSections[i] ) {
						result = false;
						break;
					}
				}
			} else {
				result = false;
			}

			return result;
		},

		_getSectionMin: function ( idx, duration ) {
			return duration / this.SECTION_LENGTH * idx;
		},

		_getSectionMax: function ( idx, duration ) {
			return duration / this.SECTION_LENGTH * ( idx + 1 );
		}

	});

	AP.ProgressVideo = ProgressVideo;
})( jQuery );