//<script src="https://gist.github.com/tanaikech/bd53b366aedef70e35a35f449c51eced.js"></script>
import fs from "fs";
import { Blob } from "buffer";

let buffer = fs.readFileSync("./your_file_name");


var file = new Blob([buffer], {type: 'text/csv'});
var metadata = {
    'name': 'sampleName', // Filename at Google Drive
    'mimeType': 'text/plain', // mimeType at Google Drive
    'parents': ['### folder ID ###'], // Folder ID at Google Drive
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