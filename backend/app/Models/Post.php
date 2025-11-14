<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'visibility',
    ];
    
    public function likedByUsers() {
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function scopeVisibleTo(Builder $query) {
        $authUser = auth()->user();

        //pluck()はコレクションやクエリ結果から特定のカラムだけを取り出す
        // この場合、pluck()の戻り値は Illuminate\Support\Collection
        // 自分がフォローしているuserのID
        $followingIds = $authUser->followings()->pluck('id')->toArray();

        // 自分がフォローされているuserのID
        $followerIds = $authUser->followers()->pluck('id')->toArray();

        // 相互フォローしているID
        $mutualIds = array_intersect($followingIds, $followerIds);
        
        return $query->where(function($q) use ($authUser, $mutualIds) {
            $q->where('posts.visibility', 'PUBLIC')
                ->orwhere(function($q2) use ($authUser, $mutualIds) {
                    $q2->where('posts.visibility', 'FOLLOWERS')
                        ->whereIn('posts.user_id', array_merge($mutualIds, [$authUser->id]));
                });
        });
    }
}
