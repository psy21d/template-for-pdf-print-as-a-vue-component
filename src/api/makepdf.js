import axios from 'axios'


const blobToBase64 = function (blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  })
};


/*
  name
  html
*/
export async function postToServer(data) {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:4500/api/htmlToPdf',
    responseType: 'blob',
    data
  });
  return new Blob([response.data])
}

export async function pdfDownload(data) {
  const blob = await postToServer(data)

  const downloadUrl = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'generate.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function pdfPreview(data) {
  const blob = await postToServer(data)

  const iframe = document.getElementById('iframe-preview')

  const bData = await blobToBase64(blob)
  iframe.setAttribute('src', `data:application/pdf;base64,${bData}`);
  document.body.appendChild(iframe);
}
