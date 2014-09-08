<?php

if (isset($_POST["imageData"]))
{
// Get the data
$imageData=$_POST["imageData"];

// Remove the headers (data:,) part.
// A real application should use them according to needs such as to check image type
$filteredData=substr($imageData, strpos($imageData, ",")+1);

// Need to decode before saving since the data we received is already base64 encoded
$unencodedData=base64_decode($filteredData);

// Save file. This example uses a hard coded filename for testing,
// but a real application can specify filename in POST variable
$fp = fopen( realpath(dirname(__FILE__). '/..').'/img/'. $_POST["imageName"], 'wb' );
fwrite( $fp, $unencodedData);
fclose( $fp );
}
?>