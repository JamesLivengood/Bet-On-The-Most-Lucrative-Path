<?php

$distance = self::geoDistance($result_oppo->latitude,  $result_oppo->longitude, $result_me->latitude, $result_me->longitude);
        if ($result_me->getDistance() != 0 && ($distance > $result_me->getDistance() || ($result_oppo->getDistance() != 0 && $distance > $result_oppo->getDistance()))) {
            \Log::debug("setting distance is unmatch,".$distance."======".$result_me->setting_distance."------".$result_oppo->setting_distance."-------------------------");
            return false;
        }
        return true;
    }
    public static function geoDistance($lat1, $lon1, $lat2, $lon2, $unit="m")
    {
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtolower($unit);
        if ($unit == "k") {
            return ($miles * 1.609344);
        } else {
            return $miles;
        }
    }
    public function getDistance()
    {
        if ($this->setting_distance == 0) {
            return 0;
        }
        return max($this->setting_distance, config('app.user_distance'));
    }
