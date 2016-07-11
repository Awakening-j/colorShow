window.onload = function() {

	//init
    var __colorshow = localStorage.getItem('__colorshow') || ''
    document.querySelector('#input').value = __colorshow

   	//bindEvent
    document.querySelector('#input').addEventListener('keydown', function(e) {
    	localStorage.setItem('__colorshow', this.value)
        if (e.keyCode == 13) {
            //remove multi comma and start-comma, end comma
            var value = this.value.trim().replace(/,[ ,]+,/, ',').replace(/^,+/, '').replace(/,+$/, '')
            var colors = []
            if (value) {
                //extract rgba
                var rgbaRegex = /rgba\([0-9,\. ]+\)/g
                var rgbaList = value.match(rgbaRegex) || [];
                var colorString = value.replace(/,,/, ',').replace(rgbaRegex, '').replace(/(\[|\]|\'|\")/g, '')
                var _rgbaList_index = 0
                colors = colorString.split(',').map(function(c, i) {
                    c = c.trim()
                    return c === '' ? rgbaList[_rgbaList_index++] : c
                })
            }
            var innerHTML = '';
            colors.forEach(function(color) {
                innerHTML += '<li><span style="background: ' + color + '"></span><label>' + color + '</label></li>';
            });
            document.querySelector('ul').innerHTML = innerHTML;
            e.preventDefault()
        }
    });
    document.querySelector('ul').addEventListener('input', function(e) {
        if (e.target.tagName == 'INPUT') {
            e.target.previousSibling.style.background = e.target.value
        }
    })

    document.querySelector('.website a').addEventListener('click', function(e) {
        chrome.tabs.create({url: this.getAttribute('href')});
     	return false;
    })

    

};