function displayFiles(input) {
    var fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Clear existing file list

    var files = input.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileName = file.name;
        var fileSize = getFileSize(file.size);
        var listItem = document.createElement('div');
        listItem.textContent = fileName + ' (' + fileSize + ')';
        fileList.appendChild(listItem);
    }
}

function getFileSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}