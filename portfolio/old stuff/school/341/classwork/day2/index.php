<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Array Tester</title>
</head>
<body>

<?php
$array1 = array(24,25,26);
$array1[] = 77;
$array1[0] = 33;
for($i = 0; $i<count($array1);$i++){
	echo $array1[$i]."<br/>";
}

$array2 = array('RIT'=>'http://www.rit.edu','Google'=>'http://www.google.com');
$array2['CNN']='http://www.cnn.com';
foreach ($array2 as $v){
	echo "$v<br/>";
}

foreach ($array2 as $k=>$v){
	echo "$k=>$v<br/>";
}

foreach ($array2 as $k=>$v){
	echo "<a href='$v'>$k</a><br/>";
}

$array3 = array(
	'colors' => array('red','green','blue'),
	'shapes' => array('circle','square','triangle')
);

foreach($array3['colors'] as $v) {
	echo "$v"."<br/>";
}

foreach($array3['shapes'] as $v) {
	echo "$v"."<br/>";
}

foreach($array3 as $v) {
	for($k = 0;$k<count($v);$k++){
        echo $v[$k] . "<br />";
	}
}
?>
</body>
</html>