
class HDC{
    constructor(el){
        this.canvasElement = el;
        this.canvasContext = this.canvasElement.getContext('2d');

        this.layout();

        this.canvasElement.setAttribute('data-HDC','true');
        this.canvasElement['HDController'] = this;
    }

    layout(){
        if ( !window.hasOwnProperty('devicePixelRatio') ) window['devicePixelRatio'] = 1;

        if ( this.canvasElement.getAttribute('width') === "" ) this.canvasElement.setAttribute('width','500');
        if ( this.canvasElement.getAttribute('height') === "" ) this.canvasElement.setAttribute('height','500');

        this.width = parseInt( this.canvasElement.getAttribute('width') ) * window.devicePixelRatio;
        this.height = parseInt( this.canvasElement.getAttribute('height') ) * window.devicePixelRatio;

        this.canvasElement.width = this.width;
        this.canvasElement.height = this.height;

        this.canvasElement.style.width = (this.width / window.devicePixelRatio) + 'px';
        this.canvasElement.style.height = (this.height / window.devicePixelRatio) + 'px';

        this.canvasContext.setTransform(window.devicePixelRatio,0,0,window.devicePixelRatio,0,0);
    }
}

(function(){
    window['HDCanvasCollection'] = [];
    function upgradeCanvas(c){
        window['HDCanvasCollection'].push( new HDC(c) );
    }
    if ( window.hasOwnProperty('MutationObserver') ){
        new MutationObserver(function() {
            document.querySelectorAll('canvas:not([data-HDC="true"])').forEach(c=>{
                upgradeCanvas(c);
            });
        }).observe( document.body , {childList: true, subtree: true});
    }else{
        document.addEventListener('DOMNodeInserted',(e)=>{
            document.querySelectorAll('canvas:not([data-HDC="true"])').forEach(c=>{
                upgradeCanvas(c);
            })
        });
    }

    document.querySelectorAll('canvas:not([data-HDC="true"])').forEach(c=>{
        upgradeCanvas(c);
    })
})();

