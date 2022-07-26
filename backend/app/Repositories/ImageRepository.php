<?php
namespace App\Repositories;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageRepository
{
    public function image_upload($base64_image, $image_path, $image_name)
    {
        $image_64 = $base64_image;

        $extension = explode(';base64',$image_64);
        $extension = explode('/', $extension[0]);
        $extension = $extension[1];

        $replace = substr($image_64, 0, strpos($image_64, ',')+1);

        $image = str_replace($replace, '', $image_64);
        $image = str_replace(' ', '+', $image);

        $imageName = $image_name.'.'.$extension;

        Storage::disk('public')->put($image_path.'/' .$imageName, base64_decode($image));
        return $image_path.'/'.$imageName;
    }
}
