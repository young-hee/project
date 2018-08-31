this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["category"] = this["AP"]["handlebars"]["display"]["category"] || {};

this["AP"]["handlebars"]["display"]["category"]["popular-brand-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<li class=\"ix-list-item\">\n		<div class=\"brand_box\">\n			<strong class=\"sr_only\">HERA</strong>\n			<div class=\"brand_visual\">\n				<a href=\"#none\">\n					<img src=\"/pc/ko/images/dummy/img_brand_thumb_02.jpg\" alt=\"\">\n				</a>\n			</div>\n			<div class=\"tags_box\">\n				<ul class=\"list_tags\">\n					<li><a href=\"#none\" class=\"hash_tags_md\">#쥬스</a></li>\n					<li><a href=\"#none\" class=\"hash_tags_md\">#바</a></li>\n				</ul>\n				<ul class=\"list_tags\">\n					<li><a href=\"#none\" class=\"hash_tags_md\">#프래그런스</a></li>\n					<li><a href=\"#none\" class=\"hash_tags_md\">#티컬렉션</a></li>\n				</ul>\n			</div>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});