(function($) {
  var icons, mime, search, setup, sort;
  mime = new Mimoza({
    defaultType: 'application/octet-stream',
    preloaded: true
  });
  console.log(mime.getMimeType('ttf'));
  console.log(mime.getMimeType('epub'));
  console.log(mime.getMimeType('pdf'));
  icons = function() {
    return $('#files li > a').each(function() {
      var $a, name;
      $a = $(this);
      name = $a.find('.name').text();
      $a.data('downloadurl', name);
      $a.css({
        'background-image': "url(/_/thumb-" + (encodeURIComponent(name)) + ".png)"
      });
      return $a;
    });
  };
  sort = function() {
    var filelist, options;
    return false;
    options = {
      valueNames: ['name', 'size', 'date']
    };
    return filelist = new List($('#wrapper').get(0), options);
  };
  search = function() {
    var links, str;
    str = $('#search').value;
    links = $('#files').find('a');
    return links.each(function() {
      var $link, text;
      $link = $(this);
      text = $link.text();
      if (text === '..') {
        return;
      }
      if (str.length && ~text.indexOf(str)) {
        return $link.addClass('highlight');
      } else {
        return $link.removeClass('highlight');
      }
    });
  };
  setup = function() {
    var $files;
    $files = $('#files').find('a');
    return $files.each(function() {
      var $file, data;
      $file = $(this);
      if ($file.text() === '..') {
        return;
      }
      data = {
        url: ("" + location.protocol + "//" + location.host) + $file.attr('href'),
        name: $file.find('.name').text(),
        size: $file.find('.size').text()
      };
      data.ext = data.name.replace(/^.+\.(\w{2,4})$/, "$1");
      data.download = [mime.getMimeType(data.ext), data.name, data.url].join(':');
      $file.data(data).attr({
        draggable: 'draggable'
      });
      return $file.on('dragstart', function(proxy) {
        var download, event;
        event = proxy.originalEvent;
        download = $file.data('download');
        return event.dataTransfer.setData('DownloadURL', download);
      });
    });
  };
  $(document).on('keyup', '#search', search);
  return $(function() {
    setup();
    sort();
    return icons();
  });
})(window.jQuery);
