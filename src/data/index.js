import $ from 'jquery';

var toArray = function(o){
    var arr = [];

    for(let i in o){
        arr.push(o[i]);
    }

    return arr;
};


export default{
    season(s){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/src/data/bangumi-${s}.json`,
                dataType: 'json'
            }).done((json) => {
                resolve(toArray(json));
            });
        });
    }
};
