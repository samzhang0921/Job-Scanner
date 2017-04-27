function callBack(response) {
    var container = document.querySelector('#jobList');
    var jobList = document.createElement("ul");
    var liItems = '';
    for (var i = 0; i < response.length; i++) {

        liItems += '<li class="jumbotron jobs-info"><h3><a target="_blank" href="' + response[i].site + '">' + response[i].title + '</a></h3><div class="clearfix"><ul class="metaData col-md-6"><li class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>' + ' ' + response[i].location + '</li><li class="time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + ' ' + response[i].time + '</li></ul><ul class="metaData col-md-6"><li class="salary"><i class="fa fa-money" aria-hidden="true"></i>' + ' ' + response[i].salary + '</li><li class="applications"><i class="fa fa-users" aria-hidden="true"></i>' + ' ' + response[i].applications + '</li></ul></div><p>' + response[i].description + '</p></li>';
    };
    container.innerHTML = '';
    jobList.innerHTML = liItems;
    container.appendChild(jobList);
};

window.onload = function () {
    var liItems = document.querySelectorAll("#pagination li a");

    for (var i = 0; i < liItems.length; i++) {
        liItems[i].addEventListener("click", function (event) {
            event.preventDefault();
            console.log(this.href);
            fetch(this.href).then(function (response) {
                if (!response.status === 200) {
                    console.err('api call fail');
                } else {
                    return response.json().then(callBack);
                };
            });
        })
    };

}