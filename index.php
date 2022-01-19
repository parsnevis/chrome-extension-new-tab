<?php
require("./jdf.php");
require("./hijri.php");
function dd($variable){
    echo '<pre>';
    die(var_dump($variable));
    echo '</pre>';
}

$cal = ["janurey" => ["1" => [
"gregorian" => ["date" => "", "event" => []],
"solar_hijri" => ["date" => "", "event" => []],
"hijri" => ["date" => "", "event" => []]]]
];


$months = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
];

$months = [
'1',
'2',
'3',
'4',
'5',
'6',
'7',
'8',
'9',
'10',
'11',
'12'
];

$days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
$cal_types = ["solar_hijri", "gregorian", "hijri"];

$call = [];
foreach($months as $month_key => $month)
{
	foreach($days as $day_key => $day)
	{
		if(!($month > 6 and $day > 30))
		{
			foreach($cal_types as $cal_type)
			{
				$jalali_date = jdate("Y",'','','','en') . "/" . ($month_key+1) . "/" . ($day_key+1);
				$jalali_date_array = explode("/", $jalali_date);
				$gregorian_date = jalali_to_gregorian($jalali_date_array[0], $jalali_date_array[1], $jalali_date_array[2], "/");
				$hijri = new HijriDate( strtotime($gregorian_date) );
				$hijri_date = $hijri->get_year() . "/" . $hijri->get_month() . "/" . $hijri->get_day();
				
				if($cal_type == "solar_hijri")
				{
					$call[$month][$day][$cal_type]["date"] = $jalali_date;
					$call[$month][$day][$cal_type]["event"] = [];
				}
				
				if($cal_type == "gregorian")
				{
					$call[$month][$day][$cal_type]["date"] = $gregorian_date;
					$call[$month][$day][$cal_type]["event"] = [];
				}
				
				if($cal_type == "hijri")
				{
					$call[$month][$day][$cal_type]["date"] = $hijri_date;
					$call[$month][$day][$cal_type]["event"] = [];
				}

			}
		}
	}
}


$call = json_encode($call);
echo $call;
?>




<script>
var calll = <?php echo $call ?>;
console.log(calll);
</script>



