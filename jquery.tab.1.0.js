;(function($){
var Tab = function(tab){
  var that = this;
  that.tab = tab;
  //默认配置参数
  that.config = {
    "triggerType":"click",  //用来定义鼠标触发类型，是click还mouseover
    "effect":"default",        //用来定义内容切换效果，是直接切换还是淡入淡出
    "invoke":1,             //默认显示第几个tab
    "auto":false            //用来定义tab是否自动切换，当指定了时间间隔，就表示自动切换，
  }
  //扩展掉默认的配置参数
  if(that.getConfig()){
    $.extend(that.config,that.getConfig());
  }
  //保存Tab标签列表，对应的内容列表
  that.tabItems = that.tab.find("ul.tab-nav li");
  that.content = that.tab.find(".tab-content");
  that.contentItems = that.tab.find(".tab-content .tab-item");
  //保存配置参数
  var config = that.config;

  //
  switch (config.triggerType){
    case "mouseover":
    that.tabItems.bind(config.triggerType,function(){
       that.invoke($(this));
    });
    break;
    default:
    that.tabItems.bind("click",function(){
       that.invoke($(this));
    });
  }

  //自动切换，当配置了时间，就根据配置的时间间隔自动切换

  if(config.auto){
    //定时器
    that.timer = null;
    //计数器
    that.loop = 0;
    that.autoPlay();

    that.tab.hover(function(){
      window.clearInterval(that.timer);
    },function(){
      that.autoPlay();
    });
  }

  //设置默认显示第几个tab
  if (config.invoke > 1) {
    that.invoke(that.tabItems.eq(config.invoke-1));
  }
};

Tab.prototype = {
  //事件驱动函数
  invoke:function(currentTab){
    var me = this;
    var index = currentTab.index();
    //tab选中状态
    currentTab.addClass("active").siblings().removeClass("active");
    //对应内容切换
    var effect = me.config.effect;
    var content = me.content;
    var contentItems = me.contentItems;
    
    switch (effect){
      case "fade":
      contentItems.css({position:"absolute"});//改变元素定位方式
      var currentH=contentItems.eq(index).innerHeight();//当前高度
      content.height(currentH);//改变盒子高度
      contentItems.eq(index).fadeIn().siblings().fadeOut();
      break;
      default:
      contentItems.eq(index).addClass("active").siblings().removeClass("active");

    }
    if (me.config.auto) {
      me.loop = index;
    }

  },

  //自动切换
  autoPlay:function(){
    var me        = this,             
        tabItems  = me.tabItems,    //临时保存tab列表 
        tabLength = tabItems.length,  //tab个数
        config    = me.config;
        me.timer  = window.setInterval(function(){
          me.loop++;
          if (me.loop >= tabLength) {
            me.loop = 0;
          }
          tabItems.eq(me.loop).trigger(config.triggerType);
        },config.auto);

  },


  //获取配置参数
  getConfig:function(){
    //拿一下tab elem节点上的data-config
    var config = this.tab.attr("data-config");
    if(config&&config!=""){
      return $.parseJSON(config);
    }else{
      return null;
    }
  }
};

Tab.init = function(tabs){
  var me = this;
  tabs.each(function(){
    new me($(this));
  });
};

//注册成Jquery方法
$.fn.extend({
  tab:function(){
    this.each(function(){
      new Tab($(this));
    });
    return this;
  }

});

window.Tab = Tab;
})(jQuery);
