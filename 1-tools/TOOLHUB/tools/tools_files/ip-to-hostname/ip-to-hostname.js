function findHost() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  var IP = $( '#input-text' ).val();
  var btn = $( '#findHost' );
  var ajax_url = ajax_uri;
  if ( $.trim( url ) != '' && $.trim( IP ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'ip': IP
      },
      beforeSend: function () {
          $( btn ).removeAttr( 'onclick' );
          $( btn ).html( '<span class="icon icon-cog icon-spin"></span> Wait ' );
          $( btn ).attr( 'disabled', true );
          $( btn ).addClass( 'btn-disabled' );
      },

      success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            var loadhost = $( '#ip' ).val();
          var obj = '';
          try {
            obj = $.parseJSON( data )
            if ( "success" in obj ) {
              var e = obj.success;
              $( "#result" ).html( e );
              $( '#r-row' ).removeClass( 'd-none' );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request For Ip ' + loadhost );
              }
              else if ( "danger" in obj ) {
                $( '#r-row' ).addClass( 'd-none' );
                alert( 'Unable To Read IP' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read ip ' + loadhost );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'findHost()' );
            $( btn ).html( 'Find Host' );

          } catch ( error ) {
            record_activity( 'tool_used', t_n, 'Error : Unable to decode response of url ' + loadhost );

          }
        }
      },
      complete: function ( xhr, textStatus ) {
          if ( '' != $.trim( xhr.status ) ) {
            record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
        }
      }
    } );
    } else {
      $( '#r-row' ).addClass( 'd-none' );
  }
}
$( '#ip' ).keypress( function ( e ) {
      if ( e.keyCode == '13' || e.which == '13' ) {
    findHost();
  }

} )