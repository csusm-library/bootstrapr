$(document).ready(function() {

   // Clickable divs send you to the page with the data-link attribute assigned to an html page
   $(document).delegate(".panel", "click", function() {
      window.location = $(this).data("link");
   });

   // In-page sccroll-to links
   $("a.scroll-link").click(function(event) {
      event.preventDefault();
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top - 100
      }, 400);
   });

   // Resets prettyprint after DOM loads
   $('pre').removeClass('prettyprinted');
   prettyPrint();

   // When the user scrolls down 20px from the top of the document, show the button
   window.onscroll = function() {
      scrollFunction()
   };

   function scrollFunction() {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
         document.getElementById("topper").style.display = "block";
      } else {
         document.getElementById("topper").style.display = "none";
      }
   }

   // When the user clicks on the button, scroll to the top of the document
   function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
   }

   $("#topper").on("click", function() {
      $("html").animate({
         scrollTop: 0
      }, 400);
   });

   // beautify the code
   function formatFactory(html) {
      function parse(html, tab = 0) {
         var tab;
         var html = $.parseHTML(html);
         var formatHtml = new String();


         function setTabs() {
            var tabs = new String();

            for (i = 0; i < tab; i++) {
               // tabs += '\t';
               tabs += '\t';
            }
            return tabs;
         };


         $.each(html, function(i, el) {
            if (el.nodeName == '#text') {
               if (($(el).text().trim()).length) {
                  formatHtml += setTabs() + $(el).text().trim() + '\n';
               }
            } else {
               var innerHTML = $(el).html().trim();
               $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));


               if ($(el).children().length) {
                  $(el).html('\n' + parse(innerHTML, (tab + 1)) + setTabs());
                  var outerHTML = $(el).prop('outerHTML').trim();
                  formatHtml += setTabs() + outerHTML + '\n';

               } else {
                  var outerHTML = $(el).prop('outerHTML').trim();
                  formatHtml += setTabs() + outerHTML + '\n';
               }
            }
         });

         return formatHtml;
      };

      return parse(html.replace(/(\r\n|\n|\r)/gm, " ").replace(/ +(?= )/g, ''));
   };

   // Prettify / Beautify / indent the code
   $('#beautify').click(function() {
      var beautify = formatFactory($('#simple-code').text());
      $('#simple-code').text(beautify);

      $('pre').removeClass('prettyprinted');
      prettyPrint();

   });

   // Update the preview window after changes to the code well
   $("#update-preview").on("click", function() {
      var modifiedCode = $('#simple-code').text();
      $("#simple-example").html(modifiedCode);
   });

});
// document ready closes
