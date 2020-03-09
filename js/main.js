$(document).ready(function() {

  // Clickable divs send you to the page with the data-link attribute assigned to an html page
  $(document).delegate("#interface-elements .panel", "click", function() {
    window.location = $(this).data("link");
  });

  $('#include-navbar').load('../navbar.html');

  // In-page sccroll-to links
  $("a.scroll-link").click(function(event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - 130
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
  $("#beautify").on("click", function() {
    var beautify = formatFactory($('#simple-code').text());
    $('#simple-code').text(beautify);

    $('pre').removeClass('prettyprinted');
    prettyPrint();

  });

  // Prettify / Beautify / indent the code
  $("#beautify-html").on("click", function() {
    var beautifyLocal4 = formatFactory($('#simple-code').text());
    $('#simple-code').text(beautifyLocal4);

    $('pre').removeClass('prettyprinted');
    prettyPrint();

  });

  // Prettify / Beautify / indent the code for the button
  $("#beautify-button").on("click", function() {

    var beautifyLocal1 = formatFactory($('#simple-button-code').text());
    $('#simple-button-code').text(beautifyLocal1);

    $('pre').removeClass('prettyprinted');
    prettyPrint();

  });

  // Prettify / Beautify / indent the code for the modal
  $("#beautify-modal").on("click", function() {
    var beautifyLocal2 = formatFactory($('#simple-modal-code').text());
    $('#simple-modal-code').text(beautifyLocal2);

    $('pre').removeClass('prettyprinted');
    prettyPrint();

  });

  // Prettify / Beautify / indent the code for the selector
  $("#beautify-selector-js").on("click", function() {
    var beautifyLocal3 = formatFactory($('#custom-js-code').text());
    $('#custom-js-code').text(beautifyLocal3);

    $('pre').removeClass('prettyprinted');
    prettyPrint();

  });

  // Update the preview window after changes to the code well
  $("#update-preview").on("click", function() {
    var modifiedCode = $('#simple-code').text();
    $("#simple-example").html(modifiedCode);

    $('pre').removeClass('prettyprinted');
    prettyPrint();

    // popover function
    $('[data-toggle="popover"]').popover();

  });


  // Popovers for the information icons -- this allows multiple popovers per page
  $('[data-toggle="popover"]').popover({
    'container': 'body',
    "animation": true
  });


  // Show feedback on build button clicked
  $("#build-button").on("click", function() {

    // Change button color blue to green
    $("#build-button").removeClass("btn-primary");
    $("#build-button").addClass("btn-success");

    // Replace the cogs icon with a checkmark
    $("#build-button i").removeClass("fa-cogs");
    $("#build-button i").addClass("fa-check");

    // Replace text node with "Built"
    // $('#build-button').contents().last().replaceWith(' Built');

    // Play the sound once -- not used currently
    // $('#pop')[0].play();
    // $('#pop')[0].currentTime = 0;

    // Hide the checkmark after .8 seconds
    setTimeout(function() {

      // Change button color green to blue
      $("#build-button").removeClass("btn-success");
      $("#build-button").addClass("btn-primary");

      // Replace the check icon with cogs
      $("#build-button i").removeClass("fa-check");
      $("#build-button i").addClass("fa-cogs");

      // Replace text node with "Build" again
      // $('#build-button').contents().last().replaceWith(' Build');

    }, 1500);

  });


  $("#dialog-confirm").dialog({
           autoOpen: false,
           resizable: false,
           height: "auto",
           width: 400,
           modal: true,
           buttons: {
             "Cancel": function() {
               $(this).dialog("close");
             },
             "Reset Form": function() {
               // Turns the green checked circles to open empty circles
               window.location.reload(true);
               //
               // // Stop propagation of the event
               // event.stopPropagation();
               // // Close the dialog
               // $("#dialog-confirm").dialog("close");
             }
           }
         });

     $("#clear-form").on("click", function() {

           // Open the dialog box onClick
           $("#dialog-confirm").dialog("open");

           // remove the close button on the modal
           $(".ui-dialog-titlebar-close").remove();
           $(".ui-icon-alert").remove();
           $(".ui-dialog-buttonset button:first-of-type").addClass("btn btn-default");
           $(".ui-dialog-buttonset button:last-of-type").addClass("btn btn-primary");
         });


  // Init the animations package
  AOS.init();

});
// document ready closes
