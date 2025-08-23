<?php

if (!function_exists('splitByWord')) {
    function splitByWord($string, $length = 45)
    {
        $words = explode(' ', $string);
        $lines = [];
        $currentLine = '';

        foreach ($words as $word) {
            if (strlen($currentLine . ' ' . $word) <= $length) {
                $currentLine .= ($currentLine === '' ? '' : ' ') . $word;
            } else {
                $lines[] = $currentLine;
                $currentLine = $word;
            }
        }

        if ($currentLine !== '') {
            $lines[] = $currentLine;
        }

        return $lines;
    }
}
