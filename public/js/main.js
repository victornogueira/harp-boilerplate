var win         = $(window);
var body        = $('body');
var html        = $('html');
var htmlBody    = $('html, body');
var loadWrapper = body.find('.page-load-wrapper');

var globalPage = {
  init: function() {
    var self = this;

    self.bindUIListeners();
  },

  bindUIListeners: function() {
    var self = this;

    // Update URL bar
    window.onpopstate = function(event) {
      var page = location.pathname.replace('.html','').replace('/','');  

      self.loadPage(page);
    };

    // Ajax links
    body.on('click', '[data-ajax="ajax"]', function(e) {
      var url     = $(this).attr('href');
      var page    = url.replace('.html','');

      self.loadPage(page);
      history.pushState('', 'URL: ' + url, url);

      e.preventDefault();
    });
  },

  loadPage: function(pageName) {
    var self = this;

    if (pageName.length === 0 || pageName == '/') {
      pageName = 'index';
    }

    var url = pageName + '.html';

    TweenMax.set(loadWrapper, {pointerEvents: 'none'});

    // Animate current page out
    TweenMax.to(loadWrapper, 0.4, {opacity: 0,
      onComplete: function() {
        
        loadWrapper.load(url + ' #main', function(html) {
          window.scrollTo(0,0);

          // Remove current contents
          loadWrapper.removeAttr('style');

          if ($('#main').attr('data-script')) {
            $.getScript('js/' + pageName + '-page.js');
          }

          // Init
          body.removeClass(globalPage.currentPage);

          // Animate new page in
          TweenMax.set(loadWrapper, {opacity: 0, pointerEvents: 'auto'});
          TweenMax.to(loadWrapper, 0.4, {opacity: 1, onComplete:
            function() {
              loadWrapper.attr('style',''); 
            }
          }); 

          // Add new page class to body
          body.addClass(pageName);
          globalPage.currentPage = pageName;
        });
      }
    });
  }

};

var utils = {
  modulateValues: function(val1, val1Max, val2Max, multiplier) {
    if (multiplier === undefined) {
      multiplier = 1;
    }

    var modulate = val1 * val2Max / val1Max * multiplier;

    return Math.min(1,Math.max(0,modulate));
  }
};

globalPage.init();