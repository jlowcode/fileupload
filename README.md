# Fileupload Element 

The fileupload element allows you to upload files to the server, or to an amazon account. It also allows you to upload multiple files at a time, via an ajax upload. If you use this option and you have the maximum number of allowed files set to more than one, then the data for each uploaded file is stored in individual rows in a 'linked' table called, *'originaltable_repeat_elementname'*.

**Contents**
  - [Options](#options)
  - Display
  - Thumbnail
  - Crop
  - Storage
  - Use AJAX upload
  - Downloads
  - Export
  - Example - File rename on upload
  - Example: File upload with full word indexing for search
  - Tips

### Options

- `Maximum file size`: The maximum file size in Kb of any file uploaded by this element

- `Device Capture`: For devices such as tablets and mobile phones, set the file upload field to trigger capture of pictures, audio or video as a file to upload. Note: The behaviour of the device is dependent on the type of device and the browser used and is not guaranteed.

- `Allowed file types`: Leave blank for Joomla's Media Manager default file types, otherwise provide a comma separated list - e.g. jpg,gif. This field is used to validate the files after upload and if you are NOT using device capture also to limit the files that can be selected.

- `Upload directory`: The folder into which the uploaded files can be stored. Path to upload directory (eg images/stories/). Passed through replacement code, so images/stories/{$my->id} would be replaced with the current user's id. Other placeholders: {date} and {myql_date} will work, {tablename___element} will only work when not using ajax uploads.

- `Email files`: If set to yes then the uploaded files are attached to any email sent by the form's email plug-in.

- `Obfuscate Filename`: Will replace the filename with random characters Length random filename - the number of random characters to use when *'obfuscate filename'* selected (min. 6)

- `If existing image found?`
    - `Leave original file`: The newly uploaded file will not be stored on the server.
    - `Leave original file and increment new file's name`: The original file will be left on the server and the newly uploaded file's name will be amended (each new file name will be pre-pended with the version number).
    - `Delete original file` The newly uploaded file will override the existing one.

- `Allow subfolder selection`: If set to yes then a drop down appears next to the upload element field, from which the user can select which sub folder to upload the file into.

- `Delete images?`: If set to yes, then if a record is deleted from a Fabrik table the files contained within that record are also deleted from the server. If set to no then the files are left on the server.

- `Use WiP`: Use works-in-progress, such as certain HTML5 features (like displaying new images as they are selected in the browser), which may or may not work in all browsers, or be fully functional / tested.

- `Disable Safety Check`: Setting this to Yes will bypass Joomla's isSafeFile() checking, which checks for suspicious naming and potential PHP contents which could indicate a hacking attempt. Only enable this option if you are absolutely sure you need to, for instance if you need to upload ZIP files containing PHP, and that your form is suitably secure from non-authorized users.

- `Clean Filename`: The default behavior for filenames is that Fabrik replaces all non alphanumeric characters (A-Z, a-z, 0-9) except - and _ with _. This prevents problems with OS's and filesystems which don't support multibyte character sets, or disallow certain characters. If you need to use Unicode names, set this to No, but be aware this may result in unusable filenames.

- `Rename Code`: - OPTIONAL - PHP code to rename the uploaded file. Original filename is in $filename. Data is in $formModel->formData, but will NOT be there if AJAX uploading. MUST return a valid name, with the same extension as the uploaded file. Do not prepend folder names, just return a simple foo.ext name.

### Display

- `Default image`: Insira o caminho para uma imagem a ser exibida, se nenhuma estiver disponível no momento.
- `Link to file`: Crie um *link* para o arquivo quando estiver na exibição de lista. Obrigatório se você quiser usar uma caixa de luz na visualização da tabela.
- `Show media in list`: Se definido como sim, o Fabrik mostrará a mídia na lista. Dependendo do tipo de mídia, pode ser uma imagem, flash, vídeo ou um ícone representando um documento.
    Selecione sim se desejar que a mídia carregada apareça na exibição de lista, selecione não para mostrar o caminho da imagem. Observe que esta opção é substituída se você escolher uma pasta de ícones para o elemento. A opção de apresentação de slides é 'trabalho em andamento', relevante apenas se você estiver usando o upload AJAX com vários arquivos e exibirá uma apresentação de slides simples em primeira exibição.
- `Show image in form`: Mostra a mídia carregada anteriormente ao editar o formulário. A opção de apresentação de slides é 'trabalho em andamento' e relevante apenas se você estiver usando o upload AJAX, com várias imagens, que exibirá uma apresentação de slides simples em exibição detalhada.
      - `Não`: Mostrará o caminho da imagem.
      - `Cortado, depois a miniatura e depois 'tamanho completo'`: (Se Cortado/Miniatura não estiver definido para ser criado, isso mostrará a imagem em tamanho real.
      - `Tamanho normal`
      - `Apresentação de slides`
- `Show image in email`: Se definido como Sim, um espaço reservado de elemento no corpo do e-mail incorporará a(s) imagem(ns). Se não for selecionado, o(s) caminho(s) da imagem será(ão) mostrado(s).
- `Image lib`: A biblioteca de imagens que você deseja usar para processar imagens (usada ao redimensionar e recortar qualquer imagem carregada)
- `Max width`: Ao fazer upload de imagens, especifica a largura máxima em pixels que essa imagem pode ter, se a imagem enviada for mais larga que esse valor, a imagem principal será reduzida para que sua largura não seja maior que esse valor. por exemplo, 400, deixe em branco para não redimensionar.
- `Max height`: Ao fazer *upload* de imagens, especifica a altura máxima em pixels que essa imagem pode ter, se a imagem enviada for maior que esse valor, a imagem principal é reduzida para que sua altura não seja maior que esse valor. por exemplo, 400, deixe em branco para não redimensionar.
- `Image quality %`: Um valor percentual usado ao redimensionar a imagem principal, miniaturas e imagens cortadas. 100 = sem compressão, 0 = compressão máxima.
- `Título do Elemento`: Se `Show image in form` ou `Show media in list` for selecionado, os dados contidos no elemento de título serão usados no título do *lightbox*.
- `Map element`: OPCIONAL - se especificado, tentaremos extrair informações de geotag EXIF da imagem e definir esse elemento do mapa de acordo. Funciona bem em conjunto com o recurso de captura móvel, para captura de imagem do celular.
- `Restrict lightbox nav`: Esta opção só é aplicável a exibições de detalhes.
    Se definido como sim, qualquer navegação lightbox será limitada às imagens do elemento.
    Se definido como não, a navegação lightbox incluirá todas as imagens dos elementos de upload de arquivo que também têm essa opção definida como Não

