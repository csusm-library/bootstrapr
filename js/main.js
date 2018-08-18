
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

// Back-to-top button

   // When the user scrolls down 20px from the top of the document, show the button
   window.onscroll = function() {scrollFunction()};

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

   $("#topper").on("click", function(){
      $("html").animate({scrollTop: 0}, 400);
   });


});
// document ready closes
