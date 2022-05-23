<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    function getPostsByUser($profileUsername){
        $posts = DB::table('posts')->
        where('username','=',$profileUsername)->
        orderBy('post_id','desc')->get();

        $array = json_decode(json_encode($posts), true); // stdClass to array
        return response()->json($array);
    }

    function getPostById($postId){
        $post = DB::table('posts')->
        where('post_id','=',$postId)->get();

        $array = json_decode(json_encode($post), true); // stdClass to array
        return response()->json($array);
    }

    function uploadPost(Request $request){
        if ($request['username'] != null && $request['name'] != null && $request['description'] != null && $request['file'] != null) {
            DB::insert('insert into posts (username,name,post_desc,project_file) value (?,?,?,?)',[
                $request['username'], 
                $request['name'], 
                $request['description'],
                $request['file']
            ]);
            return response()->json(['success' => true, 'message' => 'El post se ha publicado correctamente!']);
        } else{
            return response()->json(['success' => false, 'message' => 'El post no se ha publicado correctamente, revisa que hayas rellenado todos los campos!']);
        }
    }

    function getPostsBySearch($searchParam){
        $posts = DB::table('posts')->
        where('username','like','%'.$searchParam.'%')->
        orWhere('name','like','%'.$searchParam.'%')->
        orWhere('post_desc','like','%'.$searchParam.'%')->get();

        $array = json_decode(json_encode($posts), true); // stdClass to array
        return response()->json($array);
    }

    function getPosts(){
        $posts = DB::table('posts')->get();

        $array = json_decode(json_encode($posts), true); // stdClass to array
        return response()->json($array);
    }
}
