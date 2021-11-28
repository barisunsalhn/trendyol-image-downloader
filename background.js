var bearer =""
var url = "https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll/sr/tablo-x-c1185?prc=0-100&sst=MOST_RATED&pi="
var urlRest = "&storefrontId=1&culture=tr-TR&userGenderId=2&pId=0&scoringAlgorithmId=2&categoryRelevancyEnabled=false&isLegalRequirementConfirmed=false&searchStrategyType=DEFAULT&productStampType=TypeA&searchTestTypeAbValue=A";
//var imageUrl = "https://cdn.dsmcdn.com//ty252/product/media/images/20211120/17/1202061/149045303/1/1_org.jpg";
download();
const images=[];
const urls = [];
const ratingScore= [];
async function download(){
    for (var i =1 ; i < 25 ; i++){
        await login(i)
    }
    for (var i =0 ; i< urls.length; i++){
        await(downloadImage("https://cdn.dsmcdn.com/"+images[i],"trendyol.com"+urls[i],ratingScore[i]))
    }
}



async function login(page){
    const xhr = new XMLHttpRequest()
      //async does not support timeout
    xhr.open('GET',url+ page+ urlRest,true)
    //const json = loginJSON
    xhr.timeout = 15000
    addHeaders(xhr)
    
   // xhr.responseType = "blob";
   return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function receiveResponse() {

        if (this.readyState == 4) {
            if (this.status == 200) {
                var r = JSON.parse(this.response)
                products = r.result.products;
                for (var i =0; i<products.length ; i++){
                   images.push(products[i].images[0]);
                   urls.push( products[i].url) ;
                   ratingScore.push( products[i].ratingScore.totalCount);
                }
                return resolve();
            } else  {
                console.log("failed");
            
            }
        }
    };
   
    xhr.send()
   });

}




async function downloadImage(url,trendyolURL, commentCount){
    const xhr = new XMLHttpRequest()
    xhr.responseType = "blob";
      //async does not support timeout
    xhr.open('GET',url,true)
    //const json = loginJSON
   // xhr.timeout = 15000
    addHeaders(xhr)
    return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function receiveResponse() {

        if (this.readyState == 4) {
            if (this.status == 200) {
                var a = document.createElement("a"),
                url = URL.createObjectURL(this.response);
                a.href = url;
                a.download = trendyolURL + "#" + commentCount +".jpg";
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
                }, 0); 
                return resolve();
            } else  {
                console.log("failed while downloading");
            
            }
        }
    };
   
     xhr.send()
    });


    
}






function addHeaders(xml){
    xml.setRequestHeader("accept", "application/json, text/plain, */*")
    xml.setRequestHeader("authority", "public.trendyol.com")
    xml.setRequestHeader("accept-encoding", "gzip, deflate, br")
	xml.setRequestHeader("accept-Language", "en-US,en;q=0.9")
    xml.setRequestHeader("authorization", "Bearer "+ bearer)
	xml.setRequestHeader("origin", "https://www.trendyol.com")
	xml.setRequestHeader("sec-fetch-dest", "empty")
	xml.setRequestHeader("sec-fetch-mode", "cors")
	xml.setRequestHeader("sec-fetch-site", "same-site")
	xml.setRequestHeader("sec-gpc", "1")
	


	//xml.setRequestHeader("Content-Type", "application/json")
	

	//xml.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")
}
