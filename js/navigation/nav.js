window.ALLEN = window.ALLEN || {};

(function(ALLEN, $){

	var navigation = ALLEN.nav = {
		$body: $('body'),
		$header: $('.header'),
		$footer: $('.footer'),
		$navLinks: $('.header .nav a'),
		$subnav: $('.subnav'),
		$subnavSections: $('.subnav .section'),
		$quickLinks: $('.quick-links'),
		$quickLinksTrigger: $('a[href=#quick-links]'),
		$popoutTriggers: $('.subnav a[data-toggle=show]'),
		$popouts: $('.subnav .popout'),
		$document: $(document),
		$window: $(window),
		quickLinksHidden: true,
		subnavHidden: true,
		minThreshold: 40,
		collapsed: false,
		scrollPosition: 0,
		isTouch: navigator.userAgent.toLowerCase().match(/(ipad|iphone|android)/i) != null,

		init: function() {
			
			setTimeout($.proxy(this.setState, this), 1000);

			this.$quickLinksTrigger.on('click', $.proxy(this.toggleQuickLinks, this));

			this.$navLinks.on('click.nav', $.proxy(this.showSubnavSection, this));
			this.$popoutTriggers.on('click.popout', $.proxy(this.togglePopout, this));

			if(this.isTouch) {
				$('html').addClass('touch');
			}
		},

		watch: function() {
			this.interval = setTimeout($.proxy(this.setState, this), 100);
		},

		halt: function() {
			clearTimeout(this.interval);
		},

		setState: function() {
			var scrollPosition = this.$document.scrollTop();
			if(this.scrollPosition !== scrollPosition) {
				this.hideQuickLinks();
				this.hideSubnav();
				this.scrollPosition = scrollPosition;
				this.maxThreshold = this.maxThreshold || this.$document.height() - this.$window.height();

				if(scrollPosition < this.minThreshold || scrollPosition >= this.maxThreshold) {
					this.$header.removeClass('header-collapsed');
					this.$footer.removeClass('footer-collapsed');
				} else {
					this.$header.addClass('header-collapsed');
					this.$footer.addClass('footer-collapsed');
				}
			}
			
			this.watch();
		},

		/*
			Subnav
		*/

		showSubnav: function() {
			if(!this.isTouch) {
//				this.$navLinks.on('mouseover.nav', $.proxy(this.showSubnavSection, this));
				this.$navLinks.on('mouseclick', $.proxy(this.toggleActiveSubnav, this));


			}
			
			this.$subnav.addClass('show');
			this.$header.addClass('header-override');
			this.$body.one('click', $.proxy(this.hideSubnav, this));
			this.subnavHidden = false;
		},

		hideSubnav: function() {
			if(!this.isTouch) {
//				this.$navLinks.off('mouseover.nav');
				this.$navLinks.off('mouseclick');
				
			}
			this.$subnav.removeClass('show');
			this.$subnavSections.removeClass('show');
			this.$navLinks.removeClass('active-nav');
			this.$header.removeClass('header-override');
			this.hidePopouts();
			this.subnavHidden = true;
		},

		showSubnavSection: function(e) {

			var $source = $(e.target),
					$target = $($source.attr('href'));

			if($target.length != 0) {

				this.$navLinks.removeClass('active-nav');
				$source.addClass('active-nav');
				
				if(this.subnavHidden) {
					this.showSubnav();
				}

				if(this.isTouch && $target.hasClass('show')) {
					this.hideSubnav();
				}

				this.$subnavSections.removeClass('show');
				$target.addClass('show');

				if(!this.quickLinksHidden) {
					this.hideQuickLinks();
				}
			}

			return false;
		},

		toggleActiveSubnav: function(e) {
			var $source = $(e.target),
					$target = $($source.attr('href'));

			if($target.hasClass('show')) {
				this.hideSubnav();
			}
			
			

			return false;
		},
		
		

		/*
			Quicklinks
		*/

		showQuickLinks: function() {
			if(!this.subnavHidden) {
				this.hideSubnav();
			}
			this.$quickLinksTrigger.addClass('active');
			this.$quickLinks.addClass('show');
			this.$footer.addClass('footer-override');
			this.$body.one('click', $.proxy(this.hideQuickLinks, this));
			return this.quickLinksHidden = false;
		},

		hideQuickLinks: function() {
			this.$quickLinksTrigger.removeClass('active');
			this.$quickLinks.removeClass('show');
			this.$footer.removeClass('footer-override');
			return this.quickLinksHidden = true;
		},

		toggleQuickLinks: function(e) {

			if(this.quickLinksHidden)
				this.showQuickLinks();
			else
				this.hideQuickLinks();
			return false;
		},

		/*
			Popout
		*/

		hidePopouts: function() {
			this.$popouts.removeClass('show');
		},

		togglePopout: function(e) {
			var $elem = $(e.target);
			var $target = $elem.data('target');

			if(!$target) {
				$target = $($elem.attr('href'));
				$elem.data('target', $target);
			}

			$target.toggleClass('show');

			// specifically returning false to prevent propagation
			return false;
		}

	};

	navigation.init();

})(ALLEN, jQuery);