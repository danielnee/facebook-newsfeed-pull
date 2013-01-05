function DataPull() {

    var hasNext = false;
    var nextPage = 0;

    this.GetPosts = function() {
        
        var that = this;
        var fHandleResponse = function(cResponse) {
            console.log(cResponse)
            if (cResponse && typeof cResponse.data != "undefined" && cResponse.data.length > 0)
            {
                for (var i = 0; i < cResponse.data.length; i++)
                {
                    var cPost = cResponse.data[i];

                    if (typeof cPost.message != "undefined" && typeof cPost.from.category == "undefined")
                    {
                        $("#data").append("<p>" + cPost.message + "</p>")
                        
                        if (typeof cPost.comments != "undefined" && cPost.comments.count > 0) {
                            for (var j = 0; j < cPost.comments.count; j++) {
                                console.log(cPost.comments)
                                if (typeof cPost.comments.data[j] != "undefined") {
                                    $("#data").append("<p>" + cPost.comments.data[j].message + "</p>")
                                }
                            }
                        }
                    }
                }
                
                
            }
            
            if (cResponse.paging == undefined) {
                return;
            }
            else {
                hasNext = true;
                nextPage = cResponse.paging.next;
                that.GetPosts();
            }    
        };
        
        
        console.log(hasNext)
        if (!hasNext)
        {
            FB.api('/me/home', {
                //'since':'last week',
                'limit': 100
            }, fHandleResponse);
        }
        else
        {
            $.ajax({
                url: nextPage,
                dataType: "json",
                success: fHandleResponse
            });
        }
    }

};