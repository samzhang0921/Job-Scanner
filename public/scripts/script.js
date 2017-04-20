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


window.onload = function (){
 var liItems = document.getElementById('pagination').getElementsByTagName("li");

 liItems.click(function(even){
   even.preventDefault();
   alert('kkk');
 })

}
