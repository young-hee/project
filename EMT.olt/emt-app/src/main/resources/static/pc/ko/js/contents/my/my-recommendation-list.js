/**
 * 추천제품
 */

;(function ( $ ) {
	'use strict';

	var MyRecommendationList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			
			this._setRecommendation();
		},
		
		_setRecommendation: function () {
			var $section = this._$target.find( '.my_tone_recommend' );
			if ( !$section.length ) return;

			AP.api.getRecommendWithSkinTone( {type: 'CS'}, null, false
			).done( function ( result ) {
				var legacyModelCodes;
				console.log(result.CHEEK);
				console.log(result.LIP);
				console.log(result.EYE);
				console.log(result.FACE);
				var data = [result.CHEEK, result.LIP, result.EYE, result.FACE];

				for(var k = 0 ; k < data.length ; k++){
					var fdate = data[k];
					for(var i = 0 ; i < fdate.length ; i++){
						var texture = fdate[i].texture;
						for(var j = 0 ; j < texture.length ; j++){
							if(i == 0 && j == 0 && k == 0){
								legacyModelCodes = texture[j].sap;
							}else{
								legacyModelCodes = legacyModelCodes + ',' + texture[j].sap;
							}
						}
					}
				}
				
				console.log(data);
				console.log(legacyModelCodes);
				AP.api.withLegacyModelCodes(null, {legacyModelCodes:legacyModelCodes}, false
					).done(function ( data ) {
					console.log(data);
					//var html = AP.common.getTemplate( 'my.recommendation-product-list', data );

					//$section.find( '.ix-list-viewport' ).html( html );
					//$section.find( '.slide' ).ixSlideMax();
				}.bind(this));
			}.bind(this)).fail(function ( xhr ) {
				console.log( xhr.errorMessage );
			}.bind(this));
		}
	});

	AP.myRecommendationList = new MyRecommendationList();
})( jQuery );