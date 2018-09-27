
// 读取本地文件的内容 兼容多种浏览器

function upload(input, flag) {
    //支持chrome IE10
    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function() {
            console.log(this.result)
            // alert(this.result);

            if(flag == '1') {
                var str = this.result.split('\r\n').join('<br>');
                FileQuestionArr = this.result.split('\r\n');
                document.getElementById("fileQ").innerHTML = str;
            } else {
                var str = this.result.split('\r\n').join('<br>');
                FileAnswerArr = this.result.split('\r\n');
                document.getElementById("fileA").innerHTML = str;
            }
            
        }
        reader.readAsText(file);
    } 
    //支持IE 7 8 9 10
    else if (typeof window.ActiveXObject != 'undefined'){
        var xmlDoc; 
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
        xmlDoc.async = false; 
        xmlDoc.load(input.value); 
        alert(xmlDoc.xml); 
    } 
    //支持FF
    else if (document.implementation && document.implementation.createDocument) { 
        var xmlDoc; 
        xmlDoc = document.implementation.createDocument("", "", null); 
        xmlDoc.async = false; 
        xmlDoc.load(input.value); 
        alert(xmlDoc.xml);
    } else { 
        alert('error'); 
    } 
}

// 生成txt文件，并且可以输出下载

function download(filename, text) { 
    var pom = document.createElement('a'); 
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename); 
    if (document.createEvent) { 
        var event = document.createEvent('MouseEvents'); 
        event.initEvent('click', true, true); 
        pom.dispatchEvent(event); 
    } else { 
        pom.click();
    } 
}
