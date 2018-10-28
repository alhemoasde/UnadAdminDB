$(document).ready(function() {

	/** ******************************
	 * Collapse Panels
	 * [data-perform="panel-collapse"]
	 ****************************** **/
	(function($, window, document){
		var panelSelector = '[data-perform="card-collapse"]';

		$(panelSelector).each(function() {
			var $this = $(this),
			parent = $this.closest('.card'),
			wrapper = parent.find('.card-wrapper'),
			collapseOpts = {toggle: false};

			if( ! wrapper.length) {
				wrapper =
				parent.children('.card-heading').nextAll()
				.wrapAll('<div/>')
				.parent()
				.addClass('card-wrapper');
				collapseOpts = {};
			}
			wrapper
			.collapse(collapseOpts)
			.on('hide.bs.collapse', function() {
				$this.children('i').removeClass('fa-minus').addClass('fa-plus');
			})
			.on('show.bs.collapse', function() {
				$this.children('i').removeClass('fa-plus').addClass('fa-minus');
			});
		});
		$(document).on('click', panelSelector, function (e) {
			e.preventDefault();
			var parent = $(this).closest('.card');
			var wrapper = parent.find('.card-wrapper');
			wrapper.collapse('toggle');
		});
	}(jQuery, window, document));
  
  /** ******************************
	 * Remove Panels
	 * [data-perform="panel-dismiss"]
	 ****************************** **/
	(function($, window, document){
		var panelSelector = '[data-perform="card-dismiss"]';
		$(document).on('click', panelSelector, function (e) {
			e.preventDefault();
			var parent = $(this).closest('.card');
			removeElement();

			function removeElement() {
				var col = parent.parent();
				parent.remove();
				col.filter(function() {
					var el = $(this);
					return (el.is('[class*="col-"]') && el.children('*').length === 0);
				}).remove();
			}
		});
	}(jQuery, window, document));
  
});