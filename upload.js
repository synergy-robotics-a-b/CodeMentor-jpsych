//<script src="https://gist.github.com/tanaikech/bd53b366aedef70e35a35f449c51eced.js"></script>
import fs from "fs";
import { Blob } from "buffer";

let buffer = fs.readFileSync("./your_file_name");//add the csv from local storage here, do not remove the jpsych's save to disk, remove teh code I contributed to teh save disk and open terminal window, to see teh data, if needed.


var file = new Blob([buffer], {type: 'text/csv'});
var metadata = {
    'name': 'sampleName', // Filename at Google Drive//please add teh file name
    'mimeType': 'text/csv', // mimeType at Google Drive
    'parents': ['### folder ID ###'], // Folder ID at Google Drive, please add this data
    /*Navigate to the folder in Google Drive. Copy the Folder ID found in the URL. This is everything       that comes after “folder/” in the URL. For example, if the URL was           
    “https://drive.google.com/drive/folders/1dyUEebJaFnWa3Z4n0BFMVAXQ7mfUH11g”, then the Folder ID 
    would be     “1dyUEebJaFnWa3Z4n0BFMVAXQ7mfUH11g”.*/

    //Google Drive | Help Centerhttps://learn.azuqua.com › connector-reference › googled...

};

var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
var form = new FormData();
form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
form.append('file', file);

var xhr = new XMLHttpRequest();
xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
xhr.responseType = 'json';
xhr.onload = () => {
    console.log(xhr.response.id); // Retrieve uploaded file ID.
};
xhr.send(form);