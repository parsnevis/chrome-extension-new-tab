<?php
require("./jdf.php");
require("./hijri.php");
function dd($variable){
    echo '<pre>';
    die(var_dump($variable));
    echo '</pre>';
}

// $cal = ["janurey" => ["1" => [
// "gregorian" => ["date" => "", "event" => []],
// "jalali" => ["date" => "", "event" => []],
// "hijri" => ["date" => "", "event" => []]]]
// ];


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
$cal_types = ["jalali", "gregorian", "hijri"];




$jalali_today = jdate("Y/n/j",'','','','en');
// $gregorian_today = date("Y/m/d");


// $gregorian_today_array = explode('/', $gregorian_today);
// $hijri = new HijriDate( strtotime($gregorian_today) );
// $hijri_date = $hijri->get_year() . "/" . $hijri->get_month() . "/" . $hijri->get_day();
// dd($hijri_date);

// $str_time = jmktime( 0 , 0 , 0 , ($month_key+1) , ($day_key+1) , jdate("Y",'','','','en') );
// $call[$month][$day]['day']['number'] = jdate("w", $str_time,'','','en')+1;
// $call[$month][$day]['day']['name'] = jdate("l", $str_time);


$call = [];
$call['today']['date'] = $jalali_today;
$call['today']['day']['number'] = jdate("w", '', '', '', 'en');
$call['today']['day']['name'] = jdate("l");

// dd($jalali_today);

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
				
				if($cal_type == "jalali")
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


				$str_time = jmktime( 0 , 0 , 0 , ($month_key+1) , ($day_key+1) , jdate("Y",'','','','en') );
				$call[$month][$day]['day']['number'] = jdate("w", $str_time,'','','en')+1;
				$call[$month][$day]['day']['name'] = jdate("l", $str_time);


				$str_time = jmktime( 0 , 0 , 0 , ($month_key+1) , (1) , jdate("Y",'','','','en') );
				$call[$month]['start_day_number'] = jdate("w", $str_time,'','','en')+1;

			}
		}
	}
}

// dd('dd');

$call = json_encode($call);
echo $call;
?>




<script>
var calll = <?php echo $call ?>;
console.log(calll);
</script>



