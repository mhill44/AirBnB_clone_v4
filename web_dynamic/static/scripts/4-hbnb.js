$(document).ready(() => {
  const chckAmn = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
      chckAmn[$(this).data('id')] = $(this).data('name');
    } else {
      delete chckAmn[$(this).data('id')];
    }
    const amnlist = [];
    for (const key in chckAmn) {
      amnlist.push(chckAmn[key]);
    }
    if (amnlist.length > 0) {
      $('.amenities h4').css("width", "250px");
      $('.amenities h4').css("height", "16.5px");
      $('.amenities h4').css("overflow", "hidden");
      $('.amenities h4').css("white-space", "nowrap");
      $('.amenities h4').css("text-overflow", "ellipsis");
      $('.amenities h4').text(amnlist.sort().join(', '));
    } else {
      $('.amenities h4').text(String.fromCharCode(160))
    }
  });
  $.get('http://127.0.0.1:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (places) {
      for (const place of places) {
        $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, function (usrData) {
          $('.places').append(`<article>
            <div class ="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${(place.max_guest === 1) ? '' : 's'}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms === 1) ? '' : 's'}</div>
            </div>
            <div class="user">
              <b>Owner:</b> ${userData.first_name} {userData.last_name}
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
        });
      }
    }
  });
  $('button').click(function () {
    $('.places > article').remove():
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: Object.keys(chckAmn) }),
      contentType: 'application/json',
      success: function (places) {
        for (const place of places) {
          $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, funcion (userData) {
            $('.places').append(`<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${(place.max_guest === 1) ? '' : 's'}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms === 1) ? '' : 's'}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms === 1) ? '' : 's'}</div>
              </div>
              <div class="user">
                <b>Owner:</b> ${userData.first_name} ${userData.last_name}
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`);
          });
        }
      }
    });
  });
});
