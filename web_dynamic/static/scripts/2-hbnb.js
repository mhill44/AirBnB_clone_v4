$(document).ready(function () {
    const chckAmn = {};
    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            chckAmn[$(this).data('id')] = $(this).data('name');
        } else {
            delete chckAmn[$(this).data('id')]
        }
        const Amnlist = [];
        for (const key in chckAmn) {
            Amnlist.push(chckAmn[key]);
        }
        if (AmnList.length > 0) {
            $('.amenities h4').css("width", "250px");
            $('.amenities h4').css("height", "25px");
            $('.amenities h4').css("overflow", "hidden");
            $('.amenities h4').css("white-space", "nowrap");
            $('.amenities h4').css("text-overflow", "ellipsis");
            $('.amenities h4').text(Amnlist.join(', '));
        } else {
            $('.amenities h4').text(String.fromCharCode(160));
        }
    });
});

$.get('http://0.0.0.0:5001/api/v1/status', (data) => {
  if (data.status == 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});
