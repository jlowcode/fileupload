# Fileupload Element 

The fileupload element allows you to upload files to the server, or to an amazon account. It also allows you to upload multiple files at a time, via an ajax upload. If you use this option and you have the maximum number of allowed files set to more than one, then the data for each uploaded file is stored in individual rows in a 'linked' table called, *'originaltable_repeat_elementname'*.

## **Contents**
  - [Options](#options)
  - [Display](#display)
  - [Thumbnail](#thumbnail)
  - [Crop](#crop)
  - [Storage](#storage)
  - [Use AJAX upload](#use-ajax-upload)
  - [Downloads](#downloads)
  - [Export](#export)
    - [Example - File rename on upload](#example-file-rename-on-upload)
    - [Example - File upload with full word indexing for search](#example-file-upload-with-full-word-indexing-for-search)
  - [Tips](#tips)

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
    If set to no then the lightbox navigation will include all fileupload elements' images which also have this option set to No.

### Thumbnail

- `Create thumnails`: If set to yes and an image uploaded then a thumbnail image is also created. This image is used in preference to the main image when rendering data in the table, form and detailed views.

- `Image thumbnail from PDF (1st page)`: Creates image thumbnail as preview of PDF file. ATM: 1) only from the 1st page (no choice) 2) needs ImageMagick (with Ghostscript or at least is_callable('exec') should return true).

- `Thumbnail directory`: The directory to store the thumbnail images in.

- `Thumbnail prefix`: The prefix to attach the the thumbnail image name.

- `Thumbnail suffix`: The prefix to attach the the thumbnail image name.
- `Thumbnail width (px)`: When creating the thumbnail this specifies the maximum width in pixels that the thumbnail can be, if the thumbnail is wider than this value the main image is scaled down so that its width is no greater than this value.

- `Thumbnail height (px)`: When creating the thumbnail this specifies the maximum height in pixels that that image can be, if the thumbnail is higher than this value the thumbnail is scaled down so that its height is no greater than this value.

### Crop

 - `Crop`: Enabling the crop option allow for your users to create a cropped version of the file. You MUST use Ajax Upload for cropping to work. Not available in IE8 or lower.

- `Width`: The width of the cropped image.

- `Height`: The cropped image height

- `Cropped window width`

- `Cropped window height`

### Storage

- `Storage type`:
    - `Filesystem`: Your files will be stored on your server.
    - `Amazon s3 (SDK)`: Your files will be stored in Amazon's S3 cloud storage service.
    - `Amazon S3`: Deprecated (uses older, unsupported API).
- `Amazon storage options`: 

- `Amazon s3 access key id`: Get this information when you sign up for an S3 account.

- `Amazon s3 secret key`: Get this information when you sign up for an S3 account.

- `Amazon storage location`: Select the geographical area which is closest to the majority of your users.

- `SSL`: Serve the documents/images over SSL.

- `Encrypt`: Use Amazon's server side AES256 encyption for uploaded files.

-  `Bucket name`: A bucket is Amzon's terminology for a folder, select the name of the bucket you want to store the files in. Has to be unique across all of S3, so something with your domain name in it, like myfiles-mydomain. Don't use periods (myfiles.mydomain) if you want to serve using https. The bucket will be created automatically if it doesn't exist.

- `Include server path`: Use Amazon's server side AES256 encyption for uploaded files.

- `Access`: Set the access level for the uploaded file, note if set to private users will not be able to see/download the file UNLESS you enable the Download Script option above.

- `Skip Exist Check`: Normally when rendering a file link in table or form views we check to see if the file exists. When using s3 storage, this can significantly slow down rendering of the table, by over a second per row. This setting lets you turn that check off.

- `s3 Auth URL`:  If using Private ACL for s3 files, normal URLs will not work. You may optionally provide authenticated links by specifying a number of seconds in this option. This will create s3 links which will work for the number of seconds you specify from the time the table or form is rendered.


**NOTE** - when using Amazon S3, if you see errors about CORS in the browser console, you will need to go to your S3 console and add a CORS policy on your bucket.

### Use AJAX upload

Allows to upload multiple files at a time (and per row). An additional one-to-many database table yourtable_repeat_yourelement will be created when ajax mode is choosen.

**NOTE!** Until a good solution is found the fileupload element in ajax mode doesn't work within any joined group, repeated or not.

- `Use Ajax upload`: Allow for multiple uploads. NOTE that this changes the way Fabrik stores your element data, so changing this selection once you have data in your table will lose any links to existing uploaded content.
    
- `Run times`: Comma separated list of runtimes to use. Possible values: html5,flash,silverlight,browserplus,html4.

- `Drop box width`: Value (px) of the width of the div that shows the list of selected files.
    
- `Drop box height`: Value (px) of the height of the div that shows the list of selected files.

- `Chunk size`: Not working at time of writing (May 2021) (Defines if the file should be uploaded in 'chunks'. Set to 0 to upload the entire file in one go. Otherwise define an integer in Kb.)


### Downloads 

- `Use download script`: If selected, the link to the file will be a download script, forcing the browser to download the file rather than performing the normal MIME type based action. This option overrides other display options like Show Media In Form / Table. If a Title Element is specified, this will be used as the link title, otherwise the filename will be used. You have the option to specify this for the table view, detailed view or for both.
    
- `Open in browser`:  If yes, opens the file in the browser instead of forcing it to be downloaded. NOTE - this will only work for MIME types that browsers understand, like PDF.
    
- `Force Download Script on edit view` - If selected, even on edit view, the download script will be used instead of the link to the file. Thus allowing to protect the download directory with a htaccess file.
   
- `Access element` - OPTIONAL - An element whose value contains the Joomla access level that can download the file. This may often be an access element. If none selected then the download rights are managed by the elements Access and Read only access options.
    
- `No access image`: If the user can't download the file then show this image, located in ./media/com_fabrik/images.
    
- `No access URL`:  A URL that provides a link to a page for users who do not have the correct access level to download the file.
    
- `Access image`: If the user can download the file then show this image, located in ./media/com_fabrik/images. If none selected then the file name is shown.

- `Hit counter` - OPTIONAL - if you have selected one of the Download Script options, you may specify an element on this form to use as a hit counter, which will be incremented whenever the file is downloaded. NOTE - this feature will NOT work with a hit counter element in a joined and/or repeated group!
    
- `Log downloads` - OPTIONAL - if you have selected one of the Download Scripts options, you may enable logging of download to the standard jos_fabrik_logs table.

### Export

- `CSV format`: Determines how to present the fileupload data when exporting to csv:
     - `Relative path`: e.g. images/stories/myimage.jpg (Default).
     - `Full path`: e.g. /var/www/html/images/stories/myimage.jpg
     - `URL`
     - `Raw file stream`: The binary data returned from JFile::read()
     - `Base 64 encoded file stream`: A base64 encoded version of the raw file stream.
- `JSON format`: Same as the CSV format except for when viewing the table data as JSON (Javascript Object Notation);

#### Example: File rename on upload

- This is an example of one way to rename a file on upload (this example assumes Fabrik 3.1+).
    
- In a php form plugin add the following to the onBeforeCalculations event (or a later event):
    
- You can adjust the values to meet your needs - this is just one possible example.

```php
    // use Joomla file utils
    jimport( 'joomla.filesystem.file' );
    // get the original file and split it into parts
    $old = ($formModel->formData['file']);
    $oldParts = pathinfo($old);
    // in this example we're using the id as the new filename
    $sid = $formModel->formData['id'];
    //create the new file (path and name)
    $new = $oldParts['dirname'].'/'.$sid.'.'.$oldParts['extension'];
    // update the file itself
    JFile::move(JPATH_SITE.$old, JPATH_SITE.$new);
    // update the data
    $formModel->updateFormData('file', $new, true);
    // update the db
    $object = new stdClass();
    // Must be a valid primary key value.
    $object->id = $sid;
    // new path + name
    $object->file = $new;
    // Update the data in the db
    $result = JFactory::getDbo()->updateObject('ep_submission', $object, 'id');
  ```

#### Example: File upload with full word indexing for search

Apache Tika is a free utility that will read a variety of document formats and return the text content from them in a variety of formats (text, xml, json, etc). This is a form plug in uses Tika to extract index keywords (text) from a uploaded document. The extracted text will be placed into a textarea element and also updated to the database record. This allows any document type supported by Tika to be indexed using MySQL fulltext indexing.


- Apache Tika is available for free download. You want tika-app.jar for this example.
    
- It requires Java be installed on the server (see Apache Tika site for details).
    
- Experiment at the command line to ensure that tika-app.jar will run using the syntax shown below in the code example below.

- This example uses the Tika runnable jar file to perform the text extraction. There are other integration options.
    
- Use a Fabrik textarea element to store the tika generated text.
    
- Depending in size of text generated by Tika from your documents, you may need to change the column type in MySQL Admin (alter table) to mediumtext, largetext, etc., to accomodate the larger text size.
    
- For filtering and searching based on these fulltext key words, add your element that stores the full text content to the List where this textarea resides and using Lists > Details > Filters, add the textarea to the "Elements" field and set "Search All" to "Yes".
    
- Now, just enter any word from any uploaded document that Tika supports and it will be filtered to just that word.

```php
    /* 11/30/2014 by pastne - based on wiki form plug-in example
  Plug-in to re-read submitted file from disk
  then run it through apache tika to retrieve text of document
  then update the form field and database with the tika
  generated full text.  This will cause the database to
  index based on fulltext indexing. This plug-in fires
  after file upload has landed on disk.
  */
  // import the joomla file system
  jimport( 'joomla.filesystem.file' );
  //grab the filename from the form (my element name is filename)
  $filePath = JPATH_ROOT . ($formModel->formData['filename']);

  //set the full path to the tika-app.jar java run program (this is where I put the jar)
  $tikaAppPath = '/var/www/html/tika-app.jar';

  //build a command command string with expansion
  $command = "((cat '"  . $filePath . "' | java -jar $tikaAppPath --text) 2>&1)";

  //execute the command and capture out to $execOutArray
  $status = exec( $command, $execOutArray );

  //convert the output array  to compact space delimited trimmed string
  $execOut = preg_replace('/\s\s+/', ' ', implode(' ', $execOutArray));

  //grab the database record id
  $sid = $formModel->formData['id'];

  //update the fullText form element with the trimmed Tika text
  $formModel->updateFormData('fullText', $execOut, true);

  // instantiate a new database object
  $object = new stdClass();
  // set the key for the database record to the value of $sid
  $object->id = $sid;
  // set the fullText element of the object to the tika trimmed result
  $object->fullText = $execOut;
  //push the updated object to the database using the Joomla JFactory class (my list name is fmp_msds)
  $result = JFactory::getDbo()->updateObject('fmp_msds', $object, 'id');
```
### Tips

When uploading many files at the same time try turning 'Enable big selects' to Yes. 
