this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["review-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "	                    	<li class=\"swiper-slide\">\n	                    		<a href=\"javascript:;\" class=\"on\">\n	                    			<img src=\""
    + alias2(alias1((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodReviewTitle : depths[1]), depth0))
    + "\" />\n	                    		</a>\n	                    	</li>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "	              <div class=\"swiper-slide\">\n	                  <img src=\""
    + alias2(alias1((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodReviewTitle : depths[1]), depth0))
    + "\" />\n	              </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<dl>\n						<dt>"
    + alias2(alias1((depth0 != null ? depth0.questionHeader : depth0), depth0))
    + "</dt>\n						<dd><b>"
    + alias2(alias1((depth0 != null ? depth0.responseBodyText : depth0), depth0))
    + "</b></dd>\n					</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "<div class=\"ap_contents slide_review\">\n	<div class=\"pre_wrap pre_rv01\" id=\"wrap\">\n	   <div class=\"pre_top_sec\">\n	\n	         <div class=\"premium_pg_sec\">\n	            <div class=\"swiper-container\">\n	                <ul class=\"swiper-wrapper\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.imgList : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	                </ul>\n	            </div>\n	        </div>\n	   </div>\n	    \n	    <div class=\"pre_swiper_sec\">\n	        <!-- 스와이프 -->\n	          <div class=\"swiper-container\">\n	            <div class=\"swiper-wrapper\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.imgList : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	            </div>\n	            <div class=\"swiper-button-prev\"></div>\n	            <div class=\"swiper-button-next\"></div>\n	          </div>\n	          <!-- // 스와이프 -->\n	          \n	    </div>\n	    \n	    <!-- 리뷰 -->\n	    <div class=\"review_list_sec\">\n			\n			<div class=\"review_header\">\n				<span>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.memberId : stack1), depth0))
    + "</span><span>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.memberLevelName : stack1), depth0))
    + "</span>\n				<span class=\"rating\">\n					<span class=\"mark_star_sm star"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.scope : stack1), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.scope : stack1), depth0))
    + "개</span></span> <!--평점에따라 클래스변경(star0~star5)-->\n					<span class=\"count\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.scope : stack1), depth0))
    + "</span>\n				</span>\n			</div>		<!--// review_header -->\n			\n			<div class=\"review_cont\">  \n				<a href=\"#1\" class=\"product_name\"><em class=\"ellipsis\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.onlineProdName : stack1), depth0))
    + ", "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.prodName : stack1), depth0))
    + "</em><i class=\"ico_arr\"></i></a>\n			\n				<div class=\"ui_table summary\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.surveys : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n				<div class=\"cont\">\n					<!--/* 375 해상도 기준 6줄에 절삭 : 더읽기 클릭시 전체 보임 */-->\n					<p class=\"text\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.prodReviewBodyText : stack1), depth0))
    + "</p>\n				</div>\n			</div>		<!--// review_cont -->\n			\n			<div class=\"review_help_box\">\n				<p class=\"txt\">이 리뷰가 도움이 되셨나요?</p>\n				<a href=\"#1\" class=\"btn_yes\">네</a>\n			</div>\n			\n			<div class=\"btn_review_more\">\n				<a href=\"#none\" class=\"read_more\" title=\"더읽기\"> <i class=\"ico_up\"></i></a>\n				<a href=\"#none\" class=\"read_more_close\" title=\"닫기\"> <i class=\"ico_down\"></i></a>\n			</div>\n	    </div>\n	    <!-- // 리뷰 -->\n	     \n	</div>\n</div>\n\n<!--/* 하단 js등을 실행하는 마지막 영역 */-->\n<th:block ap:fragment=\"layout-endpoint\">\n	<script>\n		   var swiper01 = new Swiper('.premium_pg_sec .swiper-container', {\n				centeredSlides: false,\n				slidesPerView: 'auto',\n				touchRatio: 0.2,\n				slideToClickedSlide: true,\n				loop: false,\n				freeMode: true\n			});\n\n			$(function(){\n				$('.premium_pg_sec ul > li a').click(function(){\n					if($(this).hasClass('on')){\n						$(this).removeClass('on');\n					}else{\n						$('.premium_pg_sec ul > li a').removeClass('on');\n						$(this).addClass('on');\n					}\n				})\n			});\n			  \n			var swiper02 = new Swiper('.pre_swiper_sec .swiper-container', {\n			  slidesPerView : 1,\n			  initialSlide:0,\n			  centeredSlides:true,\n			  pagination: {\n				el: '.pre_swiper_sec .swiper-pagination',\n			  },\n			  navigation: {\n				nextEl: '.swiper-button-next',\n				prevEl: '.swiper-button-prev',\n			  },\n			});\n			  \n		  $(function(){\n			$('.writer_info01').click(function(){\n				if($('.review_list_sec.pre').hasClass('active')){\n					$('.review_list_sec.pre').removeClass('active');\n				}else{\n					$('.review_list_sec.pre').removeClass('active');\n					$('.review_list_sec.pre').addClass('active');\n				}\n			})\n			\n			 // 이미지를 확대해서 볼수 있어요!\n				$(function(){\n					var sj_lpop_timer;\n					if ($(\".img_pop_txt01\").css('display') === 'none') {\n						$(\".img_pop_txt01\").fadeIn('fast');\n						setTimeout(\n							function(){\n								sj_lpop_timer = $(\".img_pop_txt01\").stop(true,true).fadeOut('fast');\n							},1500);\n					} else {\n						$(\".img_pop_txt01\").hide();\n						$(\".img_pop_txt01\").fadeIn('fast');\n						clearTimeout(sj_lpop_timer);\n						setTimeout(\n							function(){\n								sj_lpop_timer = $(\".img_pop_txt01\").stop(true,true).fadeOut('fast');\n							},1500);\n					}\n				});\n		});\n		\n		$(\".review_list_sec .btn_review_more .read_more\").click(function(){\n			$(this).parent().parent(\".review_list_sec\").addClass(\"open\");\n		\n		});\n		$(\".review_list_sec .btn_review_more .read_more_close\").click(function(){\n			\n			$(this).parent().parent(\".review_list_sec\").removeClass(\"open\");\n		\n		});\n	</script>\n</th:block>\n\n</body>\n</html>\n";
},"useData":true,"useDepths":true});