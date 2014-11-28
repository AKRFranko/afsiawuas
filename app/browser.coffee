(($)-> 
  mime = new Mimoza
    defaultType: 'application/octet-stream'
    preloaded: true
  
  icons = ->
    $('#files > li > a').each ->
      $a = $(this)
      name = $a.find('.name').text()
      if /image/.test $a.attr('class') 
        $a.css 'background-image': "url(#{$a.attr('href')})"
      else
        $a.css  'background-image': "url(/_/thumb-#{encodeURIComponent(name)}.png)"
      return $a
      
  sort = ->
    return false
    options = valueNames: [ 'name' ]
    filelist = new List 'files', options
    
  search = ->
    str = $('#search').va()
    links = $('#files > li > a')
    links.each ->
      $link = $( @ )
      text  = $link.text()
      return if text is '..'
      if str.length and ~text.indexOf str
        $link.addClass 'highlight'
      else
        $link.removeClass 'highlight'

  setup = ->
    $files = $('#files > li > a')
    $files.each ->
      $file = $ @
      return if $file.text() is '..'
      data=
        url:  "#{location.protocol}//#{location.host}" + $file.attr('href')
        name: encodeURIComponent($file.find('.name').text())
        size: $file.find('.size').text()  
      data.ext = data.name.replace /^.+\.(\w{2,4})$/, "$1"
      data.mime = mime.getMimeType(data.ext)
      data.download = [ data.mime , data.name, data.url ].join(':')
      $file.data( data ).attr draggable: 'draggable', class: data.mime.replace /\//g, '-'
      $file.on 'dragstart', ( proxy )->
        event = proxy.originalEvent
        event.dataTransfer.setData 'DownloadURL', $file.data 'download'
      
  $( document ).on 'keyup', '#search', search
  $ ->
    setup()
    # sort()
    icons()

)(window.jQuery)