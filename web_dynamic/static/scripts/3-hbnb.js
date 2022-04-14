$(document).ready(() => {
    const chckAmn = {};
    $('li input[type="checkbox"]').change(function () {
      if (this.checked) {
        chckAmn[$(this).data('id')] = $(this).data('name');
      } else {
        delete chckAmn[$(this).data('id')];
      }
      const amnlist = [];
      for (const key in chckAmn) {
        amnlist.push(chckAmn[key]);
      }
      $('.amenities h4').text(amnlist.join(', '));
    });
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: '{}',
      contentType: 'application/json',
      success: function (data) {
        for (const place of data) {
          $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, function (usrData) {
            const html = `<article>
    <div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
    <div class="max_guest">${place.max_guest} Guests</div>
    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
    </div>
    <div class="user">
    <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
    </div>
    <div class="description">
    ${place.description}
    </div>
    </article>`;
            $('.places').append(html);
          });
        }
      }
    });
  });