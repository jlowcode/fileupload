# Fileupload Element 

O elemento fileupload permite fazer upload de arquivos para o servidor ou para uma conta amazon. Ele também permite que você carregue vários arquivos por vez, por meio de um upload ajax. Se você usar esta opção e tiver o número máximo de arquivos permitidos definido para mais de um, os dados de cada arquivo carregado serão armazenados em linhas individuais em uma tabela 'vinculada' chamada ' originaltable_ repeat_ elementname'.

### Sumário
- [Configurações](#Configurações)
  - [Opções](#opções)
  - [Display]
  - [Thumbnails]
  - [Crop]
  - [Storage]
  - [Ajax uploads]
  - [Downloads]
  - [Exportar]

## Configurações

### Opções

- `Maximum File Size (Kb)`: O tamanho máximo em Kb de qualquer arquivo carregado por este elemento.
- `Device Capture`: Para dispositivos como tablets e telefones celulares, defina o campo de upload de arquivo para acionar a captura de imagens, áudio ou vídeo como um arquivo para upload. **Observação** - o comportamento do dispositivo depende do tipo de dispositivo e do navegador usado e não é garantido.
- `Allowed File Types`: Deixe em branco para os tipos de arquivo padrão do Media Manager do Joomla, caso contrário, forneça uma lista separada por vírgulas - por exemplo, jpg,gif. Este campo é usado para validar os arquivos após o upload e se você NÃO estiver usando captura de dispositivo também para limitar os arquivos que podem ser selecionados.
- `Upload Directory`: A pasta na qual os arquivos enviados podem ser armazenados. Caminho para o diretório de upload (por exemplo, images/stories/). Passado pelo código de substituição, então images/stories/{$my->id} seria substituído pelo id do usuário atual. Outros espaços reservados: {date} e {myql_date} funcionarão, {tablename___element} só funcionará quando não estiver usando uploads de ajax.
- `Email files`: Se definido como sim, os arquivos carregados serão anexados a qualquer email enviado pelo plugin de email do formulário.
- `Obfuscate Filename`: Substituirá o nome do arquivo por caracteres aleatórios.
- `Random filename lengh`: O número de caracteres aleatórios a serem usados quando 'ocultar nome de arquivo' for selecionado (min. 6).
- `If existing image found?`:
    - `Leave original file`: O arquivo recém-carregado não será armazenado no servidor.
    - `Leave original file & increment nwe file's name`: O arquivo original será deixado no servidor e o nome do arquivo recém-carregado será alterado (cada novo nome de arquivo será pré-anexado com o número da versão).
    - `Delete original file`: O arquivo recém-carregado substituirá o existente.
- `Allow subfolder selection`: Se definido como sim, uma lista suspensa aparecerá ao lado do campo do elemento de upload, a partir da qual o usuário pode selecionar em qual subpasta carregar o arquivo.
- `Delete images?`: Se definido como sim, se um registro for excluído de uma tabela Fabrik, os arquivos contidos nesse registro também serão excluídos do servidor. Se definido como não, os arquivos serão deixados no servidor.
- `Exibir Preview`: Se a opção estiver ativada, mostrará o preview da imagem após a inserção.
- `Mostrar imagem no upload`: 
- `Legenda em imagens`: Permite inserir um texto que será usado como legenda da imagem.
- `Ordenação de imagens`:
- `Use WiP`: Use trabalhos em andamento, como certos recursos HTML5 (como exibir novas imagens à medida que são selecionadas no navegador), que podem ou não funcionar em todos os navegadores ou ser totalmente funcionais/testados.
- `Disable Safety Check`: Definir como Sim ignorará a verificação isSafeFile() do Joomla, que verifica nomes suspeitos e possíveis conteúdos do PHP que podem indicar uma tentativa de invasão. Ative esta opção apenas se tiver certeza absoluta de que precisa, por exemplo, se precisar fazer upload de arquivos ZIP contendo PHP e se seu formulário estiver adequadamente protegido contra usuários não autorizados.
- `Clean Filename`: O comportamento padrão para nomes de arquivo é que o Fabrik substitui todos os caracteres não alfanuméricos (AZ, az, 0-9), exceto - e _ por _. Isso evita problemas com sistemas operacionais e sistemas de arquivos que não suportam conjuntos de caracteres multibyte ou não permitem determinados caracteres. Se você precisar usar nomes Unicode, defina como Não, mas lembre-se de que isso pode resultar em nomes de arquivo inutilizáveis.
- `Rename Code`: OPCIONAL - Código PHP para renomear o arquivo carregado. O nome do arquivo original está em $filename. Os dados estão em $formModel->formData, mas NÃO estarão lá se o upload for AJAX. DEVE retornar um nome válido, com a mesma extensão do arquivo carregado. Não anexe nomes de pastas, apenas retorne um nome foo.ext simples.
