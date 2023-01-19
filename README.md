# Fileupload Element 

The fileupload element allows you to upload files to the server, or to an amazon account. It also allows you to upload multiple files at a time, via an ajax upload. If you use this option and you have the maximum number of allowed files set to more than one, then the data for each uploaded file is stored in individual rows in a 'linked' table called, *'originaltable_repeat_elementname'*.

**Contents**
  - [Options](#options)
  - [Display](#display)
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

- `Default image`: Enter the path to a image to display if none currently available

- `Link to file`: Create a link to the file when in the list view. Required if you want to use a lightbox in the table view.

- `Show media in list`: If set to yes then Fabrik will show the media in the list. Depending upon the media type this may be an image, flash, video or a icon representing a document. Select yes if you want the uploaded media to appear in the list view, select no to show the image path. Note this option is overridden if you choose an icon folder for the element. The slideshow option is 'work in progress', only relevant if you are using AJAX uploading with multiple files, and will display a simple slideshow in ist view.

- `Show media in form`: Show previously uploaded media when editing the form. The slideshow option is 'work in progress' and only relevant if you are using AJAX uploading, with multiple images, which will display a simple slideshow in detail view.
          - `No` (will show the image path)
          
          - `Cropped, then thumbnail then 'full sized'` - (If Cropped/Thumbnail not set to be created, then this will show the full sized image
         
          - `Full sized`
          
          - `Slideshow`
    
- `Show image in email`: If set to Yes, an element placeholder in the email body will embed the image(s). If no selected then the image path(s) will be shown.

- `Image lib`: The image library you wish to use to process images with (used when resizing and cropping any uploaded images).

- `Max width`: When uploading images this specifies the maximum width in pixels that that image can be, if the uploaded image is wider than this value the main image is scaled down so that its width is no greater than this value. e.g. 400, leave blank for no resizing.

- `Max height`: When uploading images this specifies the maximum height in pixels that that image can be, if the uploaded image is higher than this value the main image is scaled down so that its height is no greater than this value. e.g. 400, leave blank for no resizing.

- `Image quality %`: A percentage value used when resizing the main image, thumbnails and crop images. 100 = no compression, 0 = maximum compression.
    
- `Title element`: If either 'show media in form' or 'show media in list' selected then the data contained within the title element will be used in the lightbox title.
   
- `Map element`: - Optional - if specified, we will atempt to extract EXIF geo tag information from the image, and set this map element accordingly. Works well in conjuction with the mobile capture feature, for cell phone image capture.
    
- `Restrict lightbox nav`: This option is only applicable to details views.
    If set to yes, then any lightbox navigation will be limited to the element's images.
    If set to no then the lightbox navigation will include all fileupload elements' images which also have this option set to No


