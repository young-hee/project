this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["sns-share"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui_sns_share\">\n	<ul class=\"sns_share\">\n		<li>\n			<a href=\"#none\" class=\"share_btn facebook\" data-sns-type=\"facebook\">\n				<span class=\"sr_only\">facebook</span>\n			</a>\n		</li>\n		<li>\n			<a href=\"#none\" class=\"share_btn url\" data-sns-type=\"url\">\n				<input type=\"text\" class=\"url_input\" style=\"display:none;\"/>\n				<span class=\"sr_only\">url</span>\n			</a>\n		</li>\n	</ul>\n</div>";
},"useData":true});