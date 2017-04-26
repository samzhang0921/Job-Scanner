// var links
//
//
// links.on('click', function(){
//   e.preventDefault()
//   var thisLink = this.src;
//   // /link_1 /2
//   // fetch(''){
//   //
//   // }
//
//   var xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = "/api?keyword=fdfds&offset=3&limit=2";
//
// var ul;
// xhr.open(method, url, true);
// xhr.onreadystatechange = function () {
//         if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             xhr.responseText.foreach(function(ele){
//               document.createElement('li', )
//             })
//         }
//     };
// xhr.send();
// })
function callBack(response) {
    var container = document.querySelector('#jobList');
    var jobList = document.createElement("ul");
    // var jobItem = 

    container.innerHTML = '';
    var renderString = '';
    // var renderString = `
    // <div class="row" id="jobList">
    //     <ul>
    //         {{#each response}}
    //         <li class="jumbotron jobs-info">
    //             <h3><a target="_blank" href="{{this.site}}">{{this.title}}</a></h3>
    //             <div class="clearfix">
    //                 <ul class="metaData col-md-6">
    //                     <li class="location"><i class="fa fa-map-marker" aria-hidden="true"></i> {{this.location}}</li>
    //                     <li class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> {{this.time}}
    //                     </li>
    //                 </ul>
    //                 <ul class="metaData col-md-6">
    //                     <li class="salary"><i class="fa fa-money" aria-hidden="true"></i> {{{this.salary}}}</li>
    //                         <li class="applications"><i class="fa fa-users" aria-hidden="true"></i> {{{this.applications}}}
    //                         </li>
    //                 </ul>
    //
    //             </div>
    //
    //             <p>{{{this.description}}}</p>
    //             </li>
    //             {{/each}}
    //     </ul>
    // </div>
    // `;
    container.innerHTML = renderString;
}

window.onload = function (){
 var liItems = document.querySelectorAll("#pagination li a");

 for (var i = 0; i<liItems.length; i++){
     liItems[i].addEventListener("click", function(event){
         event.preventDefault();
         console.log(this.href);
         fetch(this.href).then(function(response){
             if (!response.status === 200) {
                 console.err('api call fail');
             } else {
                 return response.json().then(callBack);
             }
         });
     })
 };

}
