<?php

use Joomla\CMS\Filesystem\File;

defined('JPATH_BASE') or die;

$d   = $displayData;
$ext = File::getExt($d->filename);
?>
    <?php

    echo "<div style=\"vertical-align: middle;\">";

    if (!$d->inFormView) {
        echo "<a href='{$d->file}'>";
    }
    else {
        echo "<a class=\"download-archive fabrik-filetype-{$ext}\" title=\"{$d->caption}\"
	href=\"{$d->file}\" target='_blank'>";
    }

    if ($d->make_pdf_thumb) {
        if (File::exists(JPATH_BASE . '/' . $d->path_thumb_dir . '/' . $d->name_thumb)) {
            ?>
            <img src="<?php echo $d->path_thumb; ?>" alt="<?php if ($d->caption) echo $d->caption; else echo $d->name_thumb; ?>"/>
            <?php
        }
        else if (File::exists(JPATH_BASE . '/' . $d->default_path)) {
            ?>
            <img src="<?php echo COM_FABRIK_LIVESITE . $d->default_path;?>" alt="<?php if ($d->caption) echo $d->caption; else echo 'pdf'; ?>" />
            <?php
        }
        else {
       
		?>
            
            <img src="https://cdn3.iconfinder.com/data/icons/line-icons-set/128/1-02-512.png" alt="<?php if ($d->caption) echo $d->caption; else echo 'pdf'; ?>" style="height: 50px; width: 70px;" />
            <?php
        }
    }
    else {
     /* JEISON - ALTERAÇÃO 30/06/24 */
		// Extrai o valor do campo 'file' do objeto $d e armazena em uma variável
		$file = $d->file;
		
		// Extrai apenas o nome do arquivo do caminho completo
		$fileName = basename($file);
		
		// Usa a função pathinfo para obter o nome e a extensão do arquivo
		$fileInfo = pathinfo($fileName);
		$fileBaseName = $fileInfo['filename'];
		$fileExtension = $fileInfo['extension'];
		
		// Define o comprimento máximo do nome do arquivo (sem extensão)
		$maxLength = 12;
		
		// Trunca o nome do arquivo se ele for mais longo que o comprimento máximo
		if (strlen($fileBaseName) > $maxLength) {
		    $fileBaseName = substr($fileBaseName, 0, $maxLength) . '...';
		}
		
		// Concatena o nome truncado com a extensão
		$truncatedFileName = $fileBaseName . '.' . $fileExtension;
		
		// Concatena o ícone com o nome truncado do arquivo
		echo "<span title='$fileName' style='background: #2d6a6b;color: #fff; font-size: 10px; display: inline-block; min-width: 120px;  border-radius: 4px;text-align: center;'>" . $truncatedFileName."</span>";
		
				
		// end jeison
        ?>
        
        <!-- <img src="https://cdn3.iconfinder.com/data/icons/line-icons-set/128/1-02-512.png" alt="pdf" style="height: 50px; width: 70px;" /> -->
        <?php
    }

    echo "</div>";

    ?>
</a>
