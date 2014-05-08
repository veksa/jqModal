function onLoadjqm( hash ){
	var name = hash.t.className.split(/[\s\!,\.\?]+/g).pop();
	
	$.each( $(hash.t).get(0).attributes, function( index, attr ){
		if( /^data\-autoload\-(.+)$/.test( attr.nodeName ) ){
			var key = attr.nodeName.match(/^data\-autoload\-(.+)$/)[1];
			if( $('.jqmWindow [name="'+key+'"]').is('select') ){
				$('select[name="'+key+'"]').find('#'+$(hash.t).data('autoload-'+key)).attr('selected', 'selected');
			}else if( $('.jqmWindow [name="'+key+'"]').is('input') ){
				$('input[name="'+key+'"]').val( $(hash.t).data('autoload-'+key) ).attr('readonly', 'readonly');
			}else{
				console.log('onLoadjqm: warning, not defined type');
			}
		}
		
		if( /^data\-autoloadhtml\-(.+)$/.test( attr.nodeName ) ){
			var key = attr.nodeName.match(/^data\-autoloadhtml\-(.+)$/)[1];
			$('.jqmWindow .'+key).html( $('.'+$(hash.t).data('autoloadhtml-'+key)).html() );
		}
	});
	
	if( $(hash.t).data('autohide') ){
		$(hash.w).data('autohide', $(hash.t).data('autohide'));
	}
	
	if( $(hash.t).data('scroll') ){
		if( $(hash.w).parent().hasClass('jqmWindowOut') ){
			$(hash.w).parent().show();
		}else{
			$(hash.w).wrap('<div class="jqmWindowOut"></div>');
		}
		$('body').css('overflow', 'hidden').css('paddingRight', '15px');
		
		$('.jqmWindowOut').on('click', function(e){
			if( $( e.toElement ).hasClass('jqmWindowOut') ){
				$(this).find('.jqmClose').click();
			}
		});
	}
	
	hash.w.addClass('show').css({ 'margin-left': '-' + hash.w.width() / 2+'px', 'top': $(document).scrollTop() + ( $(window).height() - hash.w.height() ) / 2 + 'px', 'opacity': 1 });
	setTimeout( function(){ $('body').scrollTop(); }, 300 );
}

function onHide( hash ){
	if( $(hash.w).data('autohide') ){
		eval( $(hash.w).data('autohide') );
	}
	
	if( $(hash.t).data('scroll') ){
		$('.jqmWindowOut').hide();
		$('body').css('overflow', 'scroll').css('paddingRight', '0');
	}
	
	hash.w.css('opacity', 0).hide();
	hash.w.empty();
	hash.o.remove();
	hash.w.removeClass('show');
}
 
// Функция вызова
$.fn.jqmEx = function( options ){
	if( !$(this).length ){
		return this;
	}
	
	$(this).each(function(){
		var _this = $(this);
		var name = _this.data('name');
		var script = "/ajax/form.php";
		$.each( _this.get(0).attributes, function( index, attr ){
			if( /^data\-param\-(.+)$/.test( attr.nodeName ) ){
				var key = attr.nodeName.match(/^data\-param\-(.+)$/)[1];
				if( script == "/ajax/form.php" ){
					script += '?';
				}else{
					script += '&';
				}
				
				script += key + '=' + _this.data('param-'+key);
			}
		});
		
		if( $('.'+name+'_frame').length > 0 ){
			return;
		}
		if( $('.button[data-name="'+name+'"]' ).attr('disabled') != 'disabled' ){
			$('body').find('.'+name+'_frame').remove();
			$('body').append('<div class="'+name+'_frame jqmWindow" style="width: 574px"></div>');
			
			$('.'+name+'_frame').jqm({trigger: '*[data-name="'+name+'"]', onLoad: function( hash ){ onLoadjqm( hash ); }, onHide: function(hash){ onHide( hash ); }, ajax: script });
		}
	});
	
	return this;
}

$(document).ready(function(){
	$('*[data-event="jqm"]').jqmEx();
})