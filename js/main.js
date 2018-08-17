
$(document).ready(function() {

// Clickable divs send you to the page with the data-link attribute assigned to an html page
   $(document).delegate(".panel", "click", function() {
      window.location = $(this).data("link");
   });

// In-page sccroll-to links
   $("a.scroll-link").click(function(event) {
      event.preventDefault();
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top
      }, 400);
   });

// Resets prettyprint after DOM loads
   $('pre').removeClass('prettyprinted');
      prettyPrint();

});
// document ready closes

// Sidenav opens
   function openNav() {
       document.getElementById("mySidenav").style.width = "300px";
       document.getElementById("main").style.marginLeft = "300px";
   }

// Sidenav closes
   function closeNav() {
       document.getElementById("mySidenav").style.width = "0";
       document.getElementById("main").style.marginLeft= "0";
   }

   // Resets prettyprint after DOM loads
   $('#sidenav-button').on("click", openNav);
