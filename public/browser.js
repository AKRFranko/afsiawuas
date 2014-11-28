(function($) {
  var icons, mime, search, setup, sort;
  mime = new Mimoza({
    defaultType: 'application/octet-stream',
    preloaded: true
  });
  icons = function() {
    return $('#files > li > a').each(function() {
      var $a, name;
      $a = $(this);
      name = $a.find('.name').text();
      if (/image/.test($a.attr('class'))) {
        $a.css({
          'background-image': "url(" + ($a.attr('href')) + ")"
        });
      } else {
        $a.css({
          'background-image': "url(/_/thumb-" + (encodeURIComponent(name)) + ".png)"
        });
      }
      return $a;
    });
  };
  sort = function() {
    var filelist, options;
    return false;
    options = {
      valueNames: ['name']
    };
    return filelist = new List('files', options);
  };
  search = function() {
    var links, str;
    str = $('#search').va();
    links = $('#files > li > a');
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
    $files = $('#files > li > a');
    return $files.each(function() {
      var $file, data;
      $file = $(this);
      if ($file.text() === '..') {
        return;
      }
      data = {
        url: ("" + location.protocol + "//" + location.host) + $file.attr('href'),
        name: encodeURIComponent($file.find('.name').text()),
        size: $file.find('.size').text()
      };
      data.ext = data.name.replace(/^.+\.(\w{2,4})$/, "$1");
      data.mime = mime.getMimeType(data.ext);
      data.download = [data.mime, data.name, data.url].join(':');
      $file.data(data).attr({
        draggable: 'draggable',
        "class": data.mime.replace(/\//g, '-')
      });
      return $file.on('dragstart', function(proxy) {
        var event;
        event = proxy.originalEvent;
        return event.dataTransfer.setData('DownloadURL', $file.data('download'));
      });
    });
  };
  $(document).on('keyup', '#search', search);
  return $(function() {
    setup();
    return icons();
  });
})(window.jQuery);
