;(function($){
  $.fn.tab=function(options){
    var defaults = {
      //各种参数，各种属性
      active:"active",
      tabNav:".tab-nav>li",
      tabContent:".tab-content>div",
      eventType:"click"
    }
    var options = $.extend({},defaults,options);
    this.each(function() {
      //实现功能代码
      var that = $(this);
      that.find(options.tabNav).bind(options.eventType,function(){
        $(this).addClass(options.active).siblings().removeClass(options.active);
        var index = $(this).index();
        that.find(options.tabContent).eq(index).show().siblings().hide();
      });
    });
    return this;
  }
})(jQuery);
