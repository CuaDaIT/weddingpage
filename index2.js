(function ($) {

  "use strict";
  /*------------------------------------------
          = COUNTDOWN CLOCK
      -------------------------------------------*/
  if ($("#clock").length) {
    function timeElapse(date) {
      var current = Date();
      var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
      var days = Math.floor(seconds / (3600 * 24));
      if (days < 10) {
        days = "0" + days;
      }
      seconds = seconds % (3600 * 24);
      var hours = Math.floor(seconds / 3600);
      if (hours < 10) {
        hours = "0" + hours;
      }
      seconds = seconds % 3600;
      var minutes = Math.floor(seconds / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      seconds = seconds % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      var html = '<div class="box"><div>' + days + '</div> <span>' + $('#clock').data('text-day') + '</span></div><div class="box"><div>' + hours + '</div> <span>' + $('#clock').data('text-hour') + '</span> </div><div class="box"><div>' + minutes + '</div> <span>' + $('#clock').data('text-minute') + '</span> </div><div class="box"><div>' + seconds + '</div> <span>' + $('#clock').data('text-second') + '</span></div>';
      $('#clock').html(html);
    }
    var time = $('#clock').data('date');
    $('#clock').countdown(time.replace(/-/g, '/'), function (event) {
      if (event.type == 'stoped') {
        var together = new Date($('#clock').data('date'));
        together.setHours(0);
        together.setMinutes(0);
        together.setSeconds(0);
        together.setMilliseconds(0);
        setInterval(function () {
          timeElapse(together);
        }, 1000);
      } else {
        var $this = $(this).html(event.strftime(''
          + '<div class="box"><div>%D</div> <span>' + $('#clock').data('text-day') + '</span> </div>'
          + '<div class="box"><div>%H</div> <span>' + $('#clock').data('text-hour') + '</span> </div>'
          + '<div class="box"><div>%M</div> <span>' + $('#clock').data('text-minute') + '</span> </div>'
          + '<div class="box"><div>%S</div> <span>' + $('#clock').data('text-second') + '</span> </div>'));
      }
    });
  }

})(window.jQuery);